// src/services/calculationEngine/wells_dvt.js
// Input booleans mapping similar to JSON keys

async function calculate(input = {}) {
  const map = {
    activeCancer: 1,
    paralysis: 1,
    bedridden: 1,
    tenderness: 1,
    swelling: 1,
    calf: 1,
    pitting: 1,
    collateral: 1,
    altDiagnosis: -2
  };

  let total = 0;
  const breakdown = {};
  for (const k of Object.keys(map)) {
    const present = Boolean(input[k]);
    const pts = present ? map[k] : 0;
    breakdown[k] = { present, points: pts };
    total += pts;
  }

  let interpretation = '';
  if (total >= 3) interpretation = 'High probability of DVT';
  else if (total >= 1) interpretation = 'Moderate probability';
  else interpretation = 'Low probability';

  return { score: total, breakdown, interpretation };
}

module.exports = { calculate };
