// src/services/calculationEngine/charlson.js
// Suma simple de puntos según items (según tu JSON de charlson)
const mapping = {
  myocardial_infarction: 1,
  congestive_heart_failure: 1,
  peripheral_vascular_disease: 1,
  cerebrovascular_disease: 1,
  dementia: 1,
  chronic_pulmonary_disease: 1,
  connective_tissue_disease: 1,
  peptic_ulcer: 1,
  mild_liver_disease: 1,
  diabetes: 1,
  diabetes_end_organ: 2,
  hemiplegia: 2,
  moderate_severe_renal: 2,
  any_tumor: 2,
  leukemia: 2,
  lymphoma: 2,
  moderate_severe_liver: 3,
  metastatic_solid_tumor: 6,
  aids: 6
};

async function calculate(input = {}) {
  let total = 0;
  const breakdown = {};
  for (const key of Object.keys(mapping)) {
    const present = Boolean(input[key]);
    const pts = present ? mapping[key] : 0;
    breakdown[key] = { present, points: pts };
    total += pts;
  }

  return {
    score: total,
    breakdown,
    interpretation: `Charlson index = ${total}. Use tablas para estimar mortalidad a 1/10 años.`
  };
}

module.exports = { calculate };
