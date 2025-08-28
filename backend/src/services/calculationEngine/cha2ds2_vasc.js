// src/services/calculationEngine/cha2ds2_vasc.js
// Input booleans: congestiveHF, hypertension, age75, diabetes, strokeTIA, vascular, age65_74, sexFemale

async function calculate(input = {}) {
  const map = {
    congestiveHF: 1,
    hypertension: 1,
    age75: 2,
    diabetes: 1,
    strokeTIA: 2,
    vascular: 1,
    age65_74: 1,
    sexFemale: 1
  };
  let total = 0;
  const breakdown = {};
  for (const k of Object.keys(map)) {
    const present = Boolean(input[k]);
    breakdown[k] = { present, points: present ? map[k] : 0 };
    if (present) total += map[k];
  }

  let interpretation = '';
  if (total === 0) interpretation = 'Low risk';
  else if (total === 1) interpretation = 'Intermediate risk';
  else interpretation = 'High risk - anticoagulation usually recommended';

  return { score: total, breakdown, interpretation };
}

module.exports = { calculate };
