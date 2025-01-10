const express = require('express');
const openController = require('../controllers/openAiController');

const router = express.Router();

// 백엔드 사용
// POST /api/openAi/analyze - 다이어리 감정 분석
router.post('/analyze', openController.analyzeDiaryEmotion);

module.exports = router;