const express = require('express');
const {
  getAllScales,
  getScaleByKey,
  calculateScale
} = require('../controllers/scaleController');

const router = express.Router();

// Devuelve todas las escalas
router.get('/', getAllScales);

// Devuelve los detalles de una escala específica
router.get('/:key', getScaleByKey);

// Calcula el resultado de una escala con los inputs del usuario
router.post('/:key/calculate', calculateScale);

module.exports = router;
