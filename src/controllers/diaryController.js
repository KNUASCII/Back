const diaryService = require('../services/diaryService');

// 다이어리 조회
exports.getUserDiary = async (req, res) => {
  try {
    const diaries = await diaryService.getUserDiary(req, res);  // req, res를 전달하여 서비스에서 JWT 처리
    res.status(200).json({ message: 'Diary retrieved successfully', diaries });
  } catch (error) {
    console.error('Error retrieving diaries:', error);
    res.status(500).json({ message: 'Failed to retrieve diaries' });
  }
};

// 다이어리 생성
exports.createUserDiary = async (req, res) => {
  try {
    const { diaryText } = req.body;
    const { message, emotionData } = await diaryService.createUserDiary(req, res, diaryText);
    res.status(201).json({ message, emotionData });
  } catch (error) {
    console.error('Error creating diary:', error);
    res.status(500).json({ message: 'Failed to create diary' });
  }
};