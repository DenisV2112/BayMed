// src/services/calculationEngine/wells_pe.js
// Input booleans or numeric for hr

async function calculate(input = {}) {
  const breakdown = {};
  let total = 0;

  const dvtSigns = Boolean(input.dvtSigns || input.dvt_symptoms);
  const peMostLikely = Boolean(input.peMostLikely || input.pe_most_likely);
  const hr = Number(input.hr ?? input.heart_rate ?? 0);
  const immobilization = Boolean(input.immobilization);
  const prev = Boolean(input.previous_dvt_pe || input.prevPeDvt);
  const hemoptysis = Boolean(input.hemoptysis);
  const cancer = Boolean(input.cancer);

  breakdown.dvtSigns = { present: dvtSigns, points: dvtSigns ? 3 : 0 }; if (dvtSigns) total += 3;
  breakdown.peMostLikely = { present: peMostLikely, points: peMostLikely ? 3 : 0 }; if (peMostLikely) total += 3;
  const hrPts = hr > 100 ? 1.5 : 0; breakdown.hr = { value: hr, points: hrPts }; total += hrPts;
  breakdown.immobilization = { present: immobilization, points: immobilization ? 1.5 : 0 }; if (immobilization) total += 1.5;
  breakdown.prev = { present: prev, points: prev ? 1.5 : 0 }; if (prev) total += 1.5;
  breakdown.hemoptysis = { present: hemoptysis, points: hemoptysis ? 1 : 0 }; if (hemoptysis) total += hemoptysis ? 1 : 0;
  breakdown.cancer = { present: cancer, points: cancer ? 1 : 0 }; if (cancer) total += cancer ? 1 : 0;

  // Interpretation: use common thresholds (two-tier >4 likely) and three-tier
  let interpretation = '';
  if (total > 4) interpretation = `PE likely (score ${total})`;
  else if (total >= 2) interpretation = `Moderate probability (score ${total})`;
  else interpretation = `Low probability (score ${total})`;

  return { score: total, breakdown, interpretation };
}

module.exports = { calculate };
