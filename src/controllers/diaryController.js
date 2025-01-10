const diaryService = require('../services/diaryService');

// 다이어리 조회
exports.getUserDiary = async (req, res) => {
  const { userID } = req;

  try {
    const diaries = await diaryService.getUserDiary({ userID });

    res.status(200).json({ message: 'Diary retrieved successfully', diaries });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve diaries' });
  }
};

// 다이어리 생성
exports.createUserDiary = async (req, res) => {
  const { userID } = req;
  const { diaryText } = req.body;

  try {
    const { message, emotionData } = await diaryService.createUserDiary({ userID, diaryText });
    res.status(201).json({ message, emotionData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create diary' });
  }
};
