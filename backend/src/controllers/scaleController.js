// src/controllers/scaleController.js
const Scale = require('../models/Scale');

// Obtener todas las escalas
exports.getAllScales = async (req, res) => {
  try {
    const scales = await Scale.find({});
    res.json({ ok: true, data: scales });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// Obtener una escala por su key
exports.getScaleByKey = async (req, res) => {
  try {
    const scale = await Scale.findOne({ key: req.params.key });
    if (!scale) return res.status(404).json({ ok: false, error: 'Escala no encontrada' });
    res.json({ ok: true, data: scale });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// Calcular resultado de una escala
exports.calculateScale = async (req, res) => {
  try {
    const scale = await Scale.findOne({ key: req.params.key });
    if (!scale) return res.status(404).json({ ok: false, error: 'Escala no encontrada' });

    const inputs = req.body;
    let score = 0;
    let interpretation = '';

    if (scale.type === 'categorical') {
      // Suma puntos de campos seleccionados
      scale.fields.forEach(field => {
        const value = inputs[field.name];
        if (value) score += field.points || 0;
      });

      // Interpretación por sexo si existe
      if (scale.interpretation) {
        const sex = inputs.sex || 'male';
        const interp = scale.interpretation[sex];
        if (interp) {
          for (const key in interp) {
            if (key.startsWith('≥')) {
              const min = parseInt(key.replace('≥',''));
              if (score >= min) interpretation = interp[key];
            } else if (parseInt(key) === score) {
              interpretation = interp[key];
            }
          }
        }
      }

    } else if (scale.type === 'table_based') {
      // Suma de valores numéricos
      scale.fields.forEach(field => {
        const value = inputs[field.id];
        if (value != null) score += Number(value);
      });

      // Interpretación según rangos
      if (scale.interpretation && scale.interpretation.ranges) {
        const range = scale.interpretation.ranges.find(r => score >= r.min && score <= r.max);
        if (range) interpretation = range.meaning;
      }
    }

    res.json({ ok: true, data: { score, interpretation } });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
