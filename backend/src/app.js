// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const scaleRoutes = require('./routes/scaleRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' }));

// Rutas
app.use('/api/scales', scaleRoutes);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'MedApp Backend - API de escalas' });
});

module.exports = app;
