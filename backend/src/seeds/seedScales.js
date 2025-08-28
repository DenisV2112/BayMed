// backend/src/seeds/seedScales.js
require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Scale = require("../models/Scale");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/medapp";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB");

    const dirPath = path.join(__dirname, "../services/calculationEngine");
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".json"));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw);

      await Scale.findOneAndUpdate({ key: data.key }, data, { upsert: true, new: true });
      console.log(`📥 Loaded scale: ${data.name}`);
    }

    console.log("✅ All scales loaded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    process.exit(1);
  }
}

seed();
