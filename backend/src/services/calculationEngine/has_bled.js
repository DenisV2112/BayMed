// src/services/calculationEngine/has_bled.js
// Espera booleanos en input: hypertension, renal_disease, liver_disease, stroke_history, bleeding_history, labile_inr, elderly (>65), drugs, alcohol

async function calculate(input = {}) {
  const keys = ['hypertension','renal_disease','liver_disease','stroke_history','bleeding_history','labile_inr','elderly','drugs','alcohol'];
  const breakdown = {};
  let total = 0;
  for (const k of keys) {
    const present = Boolean(input[k]);
    const pts = present ? 1 : 0;
    breakdown[k] = { present, points: pts };
    total += pts;
  }
  let interpretation = '';
  if (total <= 1) interpretation = 'Low risk';
  else if (total === 2) interpretation = 'Moderate risk';
  else interpretation = 'High risk of bleeding';
  return { score: total, breakdown, interpretation };
}

module.exports = { calculate };
