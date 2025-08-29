import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/places", async (req, res) => {
  const { lat, lon, type } = req.body;

  if (!lat || !lon || !type) {
    return res.status(400).json({ error: "lat, lon y type son requeridos" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Eres un asistente médico. Devuelve ${type} cercanos en formato JSON, con nombre y dirección.`
          },
          {
            role: "user",
            content: `Estoy en la latitud ${lat}, longitud ${lon}. Dame 3 ${type} cercanos con este formato: [{"name":"Lugar X","address":"Calle Y"}]`
          }
        ]
      })
    });

    const data = await response.json();

    let places = [];
    const answer = data.choices?.[0]?.message?.content?.trim();

    if (answer) {
      try {
        const jsonMatch = answer.match(/\[.*\]/s);
        if (jsonMatch) {
          places = JSON.parse(jsonMatch[0]);
        } else {
          places = [{ name: answer, address: "No address found" }];
        }
      } catch (e) {
        console.error("❌ Error parseando respuesta:", e.message);
        places = [{ name: answer, address: "Parse error" }];
      }
    }

    res.json({ places });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error consultando ${type}` });
  }
});

app.listen(3000, () => console.log("🚀 Backend corriendo en http://localhost:3000"));
