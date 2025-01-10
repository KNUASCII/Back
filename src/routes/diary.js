const express = require('express');
const authenticateToken = require('../middlewares/jwtMiddleware');
const diaryController = require('../controllers/diaryController');

const router = express.Router();

// 다이어리 조회 라우터
router.get('/getUserDiary', authenticateToken, diaryController.getUserDiary);

// 다이어리 생성 라우터
router.post('/newDiary', authenticateToken, diaryController.createUserDiary);


module.exports = router;
