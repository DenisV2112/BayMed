const express = require('express');
const { getAllGuides, getGuidesBySpecialty } = require('../controllers/guideController');

const router = express.Router();

router.get('/', getAllGuides);
router.get('/:specialty', getGuidesBySpecialty);

module.exports = router;
