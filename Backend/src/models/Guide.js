// src/models/Guides.js
const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
  specialty: { type: String, required: true }, // cardiología, neurología...
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true }, // texto largo
  image: { type: String, required: false }, // nombre del archivo (ej: heart.png)
}, { timestamps: true });

module.exports = mongoose.model('Guide', GuideSchema);
