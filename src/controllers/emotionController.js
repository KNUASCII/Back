const emotionService = require('../services/emotionService');

// 사용자의 감정 데이터 조회
exports.getUserEmotion = async (req, res) => {
    try {
        const emotionData = await emotionService.getUserEmotion(req, res);  // JWT 검증 포함
        res.status(200).json({ message: 'Emotion data retrieved successfully', emotionData });
    } catch (error) {
        console.error('Error retrieving emotion data:', error);
        res.status(500).json({ message: 'Failed to retrieve emotion data' });
    }
};

exports.addUserEmotion = async (req, res) => {
    const { userID, emotionData } = req.body;

    console.log(userID);
    const emotion = emotionData.emotionAnalysis;

    try {
        await emotionService.addUserEmotion({ userID, emotionData: emotion });
        res.status(200).json({ message: 'Emotion data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add emotion data' });
    }
};