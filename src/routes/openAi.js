const express = require('express');
const openAiService = require('../services/openAiService');

const router = express.Router();

// 백엔드 사용
// POST /api/openAi/analyze - 다이어리 감정 분석
router.post('/analyze', openAiService.analyzeEmotion);

module.exports = router;