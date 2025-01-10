const express = require('express');
const diaryController = require('../controllers/diaryController');

const router = express.Router();

// GET /api/diary - 다이어리 조회
router.get('/userDiary', diaryController.getUserDiary);

// POST /api/diary - 다이어리 작성
router.post('/newDiary', diaryController.createUserDiary);

module.exports = router;