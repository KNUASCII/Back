const express = require('express');
const emtionController = require('../controllers/emotionController');

const router = express.Router();

// GET /api/emtion - 사용자의 감정 분석
router.get('/userEmotion', emtionController.getUserEmotion);

// 백엔드 전용
// POST /api/emtion - 사용자의 감정 데이터 추가
router.post('/addEmotion', emtionController.addUserEmotion);

module.exports = router;