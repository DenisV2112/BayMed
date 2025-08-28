// src/services/calculationEngine/meld.js
// MELD = 3.78 * ln(bilirubin) + 11.2 * ln(INR) + 9.57 * ln(creatinine) + 6.43
// use min value 1.0 for variables before ln to avoid negative infinity

function safeLn(x) {
  const v = (typeof x === 'number' && !isNaN(x)) ? Math.max(1.0, x) : 1.0;
  return Math.log(v);
}

async function calculate(input = {}) {
  const bilirubin = Number(input.serum_bilirubin_mg_dl ?? input.bilirubin ?? 1.0);
  const creatinine = Number(input.serum_creatinine_mg_dl ?? input.creatinine ?? 1.0);
  const INR = Number(input.INR ?? 1.0);

  const meldRaw = 3.78 * safeLn(bilirubin) + 11.2 * safeLn(INR) + 9.57 * safeLn(creatinine) + 6.43;
  const score = Math.round(meldRaw);

  return {
    score,
    breakdown: { bilirubin, creatinine, INR, raw: meldRaw },
    interpretation: `MELD approx = ${score}. Use local transplant policy for prioritization.`
  };
}

module.exports = { calculate };
