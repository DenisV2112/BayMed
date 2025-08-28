// src/services/calculationEngine/glasgow.js
function safeNumber(v) {
  if (v === null || typeof v === 'undefined') return 0;
  return Number(v) || 0;
}

async function calculate(input = {}) {
  // Espera input: { eye:1-4, verbal:1-5, motor:1-6 } (o los nombres alternativos)
  const eye = safeNumber(input.eye ?? input.ocular ?? input.eye_opening);
  const verbal = safeNumber(input.verbal ?? input.verbal_response);
  const motor = safeNumber(input.motor ?? input.motor_response);

  const total = eye + verbal + motor;

  let interpretation = '';
  if (total <= 8) interpretation = 'Coma grave (GCS ≤ 8)';
  else if (total <= 12) interpretation = 'Lesión moderada (GCS 9–12)';
  else interpretation = 'Lesión leve / normal (GCS 13–15)';

  return {
    score: total,
    breakdown: { eye, verbal, motor },
    interpretation
  };
}

module.exports = { calculate };
