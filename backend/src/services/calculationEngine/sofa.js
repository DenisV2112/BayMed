// src/services/calculationEngine/sofa.js
// Implementación práctica y conservadora: usa valores clave del input.
// input esperado (puede incluir): paO2_fio2, platelets, bilirubin, map, vasopressors (object), gcs, creatinine, urine

function scoreRespiratory(paO2_fio2) {
  if (paO2_fio2 === null || paO2_fio2 === undefined) return null;
  if (paO2_fio2 <= 100) return 4;
  if (paO2_fio2 <= 200) return 3;
  if (paO2_fio2 <= 300) return 2;
  if (paO2_fio2 <= 400) return 1;
  return 0;
}
function scoreCoagulation(platelets) {
  if (platelets === null || platelets === undefined) return null;
  if (platelets < 20) return 4;
  if (platelets < 50) return 3;
  if (platelets < 100) return 2;
  if (platelets < 150) return 1;
  return 0;
}
function scoreLiver(bilirubin) {
  if (bilirubin === null || bilirubin === undefined) return null;
  if (bilirubin >= 12) return 4;
  if (bilirubin >= 6) return 3;
  if (bilirubin >= 2) return 2;
  if (bilirubin >= 1.2) return 1;
  return 0;
}
function scoreCV(map, vasopressors) {
  // vasopressors: object { dopamine, norepinephrine, dobutamine } with doses if given
  if (vasopressors && typeof vasopressors === 'object') {
    const norepi = vasopressors.norepinephrine ?? 0;
    const dopamine = vasopressors.dopamine ?? 0;
    // approximate thresholds from SOFA:
    if (dopamine > 15 || norepi > 0.1) return 4;
    if ((dopamine >= 5 && dopamine <= 15) || (vasopressors.dobutamine && vasopressors.dobutamine > 0)) return 2;
    if (dopamine > 0 || norepi > 0) return 1;
  }
  if (typeof map === 'number') {
    if (map < 70) return 1; // mild
    return 0;
  }
  return null;
}
function scoreNeuro(gcs) {
  if (gcs === null || gcs === undefined) return null;
  if (gcs < 6) return 4;
  if (gcs < 9) return 3;
  if (gcs < 12) return 2;
  if (gcs < 14) return 1;
  return 0;
}
function scoreRenal(creatinine, urine) {
  if (creatinine === null || creatinine === undefined) return null;
  if (creatinine >= 5 || (urine !== undefined && urine < 200)) return 4;
  if (creatinine >= 3.5) return 3;
  if (creatinine >= 2.0) return 2;
  if (creatinine >= 1.2) return 1;
  return 0;
}

async function calculate(input = {}) {
  const paO2_fio2 = input.paO2_fio2 ?? input.paO2_fio2;
  const platelets = input.platelets ?? input.plt;
  const bilirubin = input.bilirubin;
  const map = input.map ?? input.mean_arterial_pressure;
  const vasopressors = input.vasopressors ?? input.vaso;
  const gcs = input.gcs;
  const creatinine = input.creatinine;
  const urine = input.urine_output;

  const breakdown = {};
  let total = 0;

  const sResp = scoreRespiratory(paO2_fio2);
  breakdown.respiratory = { value: paO2_fio2, points: sResp }; if (sResp) total += sResp || 0;
  const sCoag = scoreCoagulation(platelets);
  breakdown.coagulation = { value: platelets, points: sCoag }; if (sCoag) total += sCoag || 0;
  const sLiver = scoreLiver(bilirubin);
  breakdown.liver = { value: bilirubin, points: sLiver }; if (sLiver) total += sLiver || 0;
  const sCV = scoreCV(map, vasopressors);
  breakdown.cardiovascular = { value: { map, vasopressors }, points: sCV }; if (sCV) total += sCV || 0;
  const sNeuro = scoreNeuro(gcs);
  breakdown.neurologic = { value: gcs, points: sNeuro }; if (sNeuro) total += sNeuro || 0;
  const sRenal = scoreRenal(creatinine, urine);
  breakdown.renal = { value: { creatinine, urine }, points: sRenal }; if (sRenal) total += sRenal || 0;

  return {
    score: total,
    breakdown,
    interpretation: `SOFA total = ${total}. Score range 0–24; incremento se asocia a mayor mortalidad.`
  };
}

module.exports = { calculate };
