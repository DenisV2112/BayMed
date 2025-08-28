// src/services/calculationEngine/child_pugh.js
// Espera input: encephalopathy ('None'|'Grade I-II'|'Grade III-IV') OR numeric equivalents,
// ascites ('None'|'Mild'|'Moderate'), bilirubin (mg/dL), albumin (g/dL), inr (number)

function pointsFromOption(optionsMap, value) {
  return optionsMap[value] ?? null;
}

async function calculate(input = {}) {
  const breakdown = {};
  let total = 0;

  // encephalopathy
  const encephalopathyMap = { 'None': 1, 'Grade I-II': 2, 'Grade III-IV': 3, 'grado 1-2':2, 'grado 3-4':3 };
  const encKey = input.encephalopathy ?? input.encefalo ?? input.encef;
  const encPts = pointsFromOption(encephalopathyMap, encKey) ?? (typeof encKey === 'number' ? encKey : null);
  breakdown.encephalopathy = { value: encKey, points: encPts }; if (encPts) total += encPts || 0;

  // ascites
  const ascitesMap = { 'None':1, 'Mild':2, 'Moderate to severe':3, 'Leve':2, 'Moderada':3 };
  const ascKey = input.ascites ?? input.asc;
  const ascPts = pointsFromOption(ascitesMap, ascKey) ?? (typeof ascKey === 'number' ? ascKey : null);
  breakdown.ascites = { value: ascKey, points: ascPts }; if (ascPts) total += ascPts || 0;

  // bilirubin ranges
  const bil = input.bilirubin;
  let bilPts = null;
  if (typeof bil === 'number') {
    if (bil <= 2) bilPts = 1;
    else if (bil <= 3) bilPts = 2;
    else bilPts = 3;
  }
  breakdown.bilirubin = { value: bil, points: bilPts }; if (bilPts) total += bilPts || 0;

  // albumin
  const alb = input.albumin;
  let albPts = null;
  if (typeof alb === 'number') {
    if (alb > 3.5) albPts = 1;
    else if (alb >= 2.8) albPts = 2;
    else albPts = 3;
  }
  breakdown.albumin = { value: alb, points: albPts }; if (albPts) total += albPts || 0;

  // INR
  const inr = input.inr;
  let inrPts = null;
  if (typeof inr === 'number') {
    if (inr <= 1.7) inrPts = 1;
    else if (inr <= 2.3) inrPts = 2;
    else inrPts = 3;
  }
  breakdown.inr = { value: inr, points: inrPts }; if (inrPts) total += inrPts || 0;

  // Interpretation
  let interpretation = '';
  if (total <= 6) interpretation = `Class A (score ${total})`;
  else if (total <= 9) interpretation = `Class B (score ${total})`;
  else interpretation = `Class C (score ${total})`;

  return { score: total, breakdown, interpretation };
}

module.exports = { calculate };
