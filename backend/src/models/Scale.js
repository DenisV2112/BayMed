// src/models/Scale.js
const mongoose = require('mongoose');

const ScaleSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true, // Ej: "APACHE_II"
  },
  name: {
    type: String,
    required: true, // Ej: "Acute Physiology and Chronic Health Evaluation II"
  },
  description: {
    type: String,
    required: true,
  },
  definition: {
    type: Object, // Aquí va TODO el JSON clínico de la escala
    required: true,
  },
}, {
  timestamps: true, // Crea createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Scale', ScaleSchema);
