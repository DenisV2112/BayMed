// src/services/calculationEngine/apacheII.js
const fs = require('fs');
const path = require('path');

function pointsFromTable(table, value) {
  for (const row of table) {
    if (row.formula && typeof row.formula === 'string') {
      // fórmula simple: "15 - value" -> evitar eval inseguro: soportamos solo "15 - value"
      if (row.formula.includes('15 - value')) {
        return 15 - value;
      }
    } else if (typeof row.min !== 'undefined' || typeof row.max !== 'undefined') {
      const min = (typeof row.min === 'number') ? row.min : -Infinity;
      const max = (typeof row.max === 'number') ? row.max : Infinity;
      if (value >= min && value <= max) return row.points || 0;
    }
  }
  return 0;
}

async function calculate(input = {}) {
  // Esta implementación espera el JSON con scoring definido (ya lo tienes en clinicalSpec).
  // Calcula sumando puntos por campo según scoring en el JSON si existe.
  try {
    const jsonPath = path.join(__dirname, 'apacheII.json');
    let definition = {};
    if (fs.existsSync(jsonPath)) {
      definition = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    }

    const result = { breakdown: {}, score: 0, interpretation: null };

    const scoring = (definition && definition.scoring) ? definition.scoring : {};

    // Para cada campo definido en scoring, calcula puntos
    for (const key of Object.keys(scoring)) {
      const table = scoring[key];
      const value = input[key];
      if (typeof value === 'undefined' || value === null) {
        result.breakdown[key] = { value: null, points: null, note: 'missing' };
        continue;
      }
      const pts = pointsFromTable(table, value);
      result.breakdown[key] = { value, points: pts };
      result.score += (typeof pts === 'number') ? pts : 0;
    }

    // Añadir interpretación desde JSON si existe
    if (definition.interpretation && definition.interpretation.ranges) {
      const ranges = definition.interpretation.ranges;
      for (const r of ranges) {
        const min = (typeof r.min === 'number') ? r.min : -Infinity;
        const max = (typeof r.max === 'number') ? r.max : Infinity;
        if (result.score >= min && result.score <= max) {
          result.interpretation = r.meaning || r.description || null;
          break;
        }
      }
    }

    if (!result.interpretation) {
      result.interpretation = `APACHE II Score = ${result.score}`;
    }

    return result;
  } catch (err) {
    return { error: err.message || String(err) };
  }
}

module.exports = { calculate };
