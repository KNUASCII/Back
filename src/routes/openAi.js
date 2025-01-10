const express = require('express');
const diaryController = require('../controllers/diaryController');

const router = express.Router();

// 백엔드 사용
// POST /api/diary/analyze - 다이어리 감정 분석
router.post('/diary/analyze', diaryController.analyzeDiaryEmotion);

module.exports = router;