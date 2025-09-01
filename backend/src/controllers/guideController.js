const Guide = require('../models/Guide');

exports.getAllGuides = async (_req, res) => {
  try {
    const guides = await Guide.find({});
    res.json({ ok: true, data: guides });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

exports.getGuidesBySpecialty = async (req, res) => {
  try {
    const guides = await Guide.find({ specialty: req.params.specialty });
    res.json({ ok: true, data: guides });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
