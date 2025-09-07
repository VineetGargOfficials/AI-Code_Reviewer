const express = require('express');
const aiController = require('../controllers/ai.controller');

const router = express.Router();

// GET /ai/get-response?prompt=your-text
router.post('/get-review', aiController.getReview);

module.exports = router;
