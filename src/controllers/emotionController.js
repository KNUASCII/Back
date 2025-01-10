const emotionService = require('../services/emotionService');

// 사용자의 감정 갯수 조회
exports.getUserEmotion = async (req, res) => {
    const { userID } = req;

    try {
        const emotionData = await emotionService.getUserEmotion({ userID });

        res.status(200).json({ message: 'Emotion data retrieved successfully', emotionData });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve emotion data' });
    }
};

// 사용자의 감정 데이터 추가
exports.addUserEmotion = async (req, res) => {
    const { userID } = req;
    const { emotionData } = req.body;

    try {
        await emotionService.addUserEmotion({ userID, emotionData });

        res.status(200).json({ message: 'Emotion data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add emotion data' });
    }
}