const express = require('express');
const diaryController = require('../controllers/diaryController');  // Controller import

const router = express.Router();

// POST /api/diary/analyze - 다이어리 감정 분석
router.post('/diary/analyze', diaryController.analyzeDiaryEmotion);

module.exports = router;