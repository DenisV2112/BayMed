// Servicio para consumir backend de escalas médicas
const API_URL = "http://localhost:3000/api/scales";

// Obtener lista de escalas
export async function fetchScales() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener escalas");
  return res.json();
}

// Obtener definición JSON de una escala
export async function fetchScaleDefinition(key) {
  const res = await fetch(`${API_URL}/${key}/definition`);
  if (!res.ok) throw new Error("Error al obtener definición");
  return res.json();
}

// Calcular una escala con input del usuario
export async function calculateScale(key, input) {
  const res = await fetch(`${API_URL}/${key}/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Error al calcular escala");
  return res.json();
}
