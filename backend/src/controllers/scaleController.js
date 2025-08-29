// src/controllers/scaleController.js
const fs = require("fs");
const path = require("path");
const Scale = require("../models/Scale");

// --- util: normalizar claves (APACHE-II, apache_ii, ApacheII -> APACHEII)
const normalize = (s) => String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

// --- cargar engines dinámicamente
const engines = {};
(() => {
  try {
    const enginesDir = path.join(__dirname, "../services/calculationEngine");
    for (const file of fs.readdirSync(enginesDir)) {
      if (!file.toLowerCase().endsWith(".js")) continue;
      const mod = require(path.join(enginesDir, file));
      const base = file.replace(/\.js$/i, "");
      engines[normalize(base)] = mod; // p.ej. APACHE_II.js -> APACHEII
    }
  } catch (_) {
    // si no existe la carpeta en dev, ignorar
  }
})();

// --- helpers de puntuación
function pointsForOption(field, selected) {
  if (!field || !field.options) {
    // fallback: puntos fijos del campo si están definidos
    return Number(field?.points ?? 0) || 0;
  }
  const sel = String(selected);
  const opt = (field.options || []).find((o) => {
    const oid = o?.id ?? o?.value ?? o?.label ?? o;
    return String(oid) === sel;
  });
  const p = Number(opt?.points ?? opt?.value ?? 0);
  return Number.isFinite(p) ? p : 0;
}

function interpretFromRanges(interpretation, score) {
  const ranges = interpretation?.ranges || [];
  const hit = ranges.find((r) => {
    const min = typeof r.min === "number" ? r.min : -Infinity;
    const max = typeof r.max === "number" ? r.max : Infinity;
    return score >= min && score <= max;
  });
  return hit ? (hit.meaning || hit.description || "") : "";
}

// --- endpoints
exports.getAllScales = async (_req, res) => {
  try {
    const scales = await Scale.find({});
    res.json({ ok: true, data: scales });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

exports.getScaleByKey = async (req, res) => {
  try {
    const scale = await Scale.findOne({ key: req.params.key });
    if (!scale) return res.status(404).json({ ok: false, error: "Escala no encontrada" });
    res.json({ ok: true, data: scale });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

exports.calculateScale = async (req, res) => {
  try {
    const scale = await Scale.findOne({ key: req.params.key });
    if (!scale) return res.status(404).json({ ok: false, error: "Escala no encontrada" });

    const inputs = req.body || {};

    // 1) Si hay engine dedicado, úsalo
    const engine = engines[normalize(scale.key)];
    if (engine && typeof engine.calculate === "function") {
      const result = await engine.calculate(inputs);
      return res.json({ ok: true, data: result });
    }

    // 2) Cálculo genérico
    let score = 0;
    let interpretation = "";

    if (scale.type === "categorical") {
      for (const field of (scale.fields || [])) {
        const name = field.id || field.name;
        const val = inputs[name];
        if (val == null || val === "") continue;

        if (Array.isArray(val)) {
          for (const v of val) score += pointsForOption(field, v);
        } else {
          score += pointsForOption(field, val);
        }
      }

      // interpretación: preferir ranges; si no, por sexo (como ya tenías)
      if (scale.interpretation?.ranges?.length) {
        interpretation = interpretFromRanges(scale.interpretation, score);
      } else if (scale.interpretation) {
        const sex = inputs.sex || "male";
        const interp = scale.interpretation[sex];
        if (interp) {
          for (const k in interp) {
            if (k.startsWith("≥")) {
              const min = parseInt(k.replace("≥", ""), 10);
              if (score >= min) interpretation = interp[k];
            } else if (parseInt(k, 10) === score) {
              interpretation = interp[k];
            }
          }
        }
      }

    } else if (scale.type === "table_based") {
      for (const field of (scale.fields || [])) {
        const name = field.id || field.name;
        const val = inputs[name];
        if (val == null || val === "") continue;

        // si hay opciones con puntos, usarlo; si no, sumar el numérico tal cual
        if (field.options && field.options.length) {
          score += pointsForOption(field, val);
        } else {
          const n = Number(val);
          if (!Number.isNaN(n)) score += n;
        }
      }

      if (scale.interpretation?.ranges?.length) {
        interpretation = interpretFromRanges(scale.interpretation, score);
      }
    }

    return res.json({ ok: true, data: { score, interpretation } });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
