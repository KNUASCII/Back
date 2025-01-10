const express = require('express');
const emotionController = require('../controllers/emotionController');

const router = express.Router();

router.get('/userEmotion', emotionController.getUserEmotion);  // 인증을 서비스에서 처리
router.post('/addEmotion', emotionController.addUserEmotion);  // 인증을 서비스에서 처리

module.exports = router;
