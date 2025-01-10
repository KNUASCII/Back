const express = require('express');
const diaryController = require('../controllers/diaryController');

const router = express.Router();

router.get('/getDiary', diaryController.getUserDiary);
router.post('/newDiary', diaryController.createUserDiary);

module.exports = router;
