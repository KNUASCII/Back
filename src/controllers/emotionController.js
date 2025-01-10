const emotionService = require('../services/emotionService');
const jwt = require('jsonwebtoken');

// 사용자의 감정 데이터 조회
exports.getUserEmotion = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Bearer 토큰에서 JWT 추출
    let userID;

    try {
        const decoded = jwt.verify(token, 'main_secret'); // JWT 검증
        userID = decoded.userID; // 디코딩된 토큰에서 userID 추출
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const emotionData = await emotionService.getUserEmotion({ userID }); // 추출한 userID 사용
        res.status(200).json({ message: 'Emotion data retrieved successfully', emotionData });
    } catch (error) {
        console.error('Error retrieving emotion data:', error);
        res.status(500).json({ message: 'Failed to retrieve emotion data' });
    }
};

exports.addUserEmotion = async (req, res) => {
    const { userID, emotionData } = req.body;

    const emotion = emotionData.emotionAnalysis;

    try {
        await emotionService.addUserEmotion({ userID, emotionData: emotion });
        res.status(200).json({ message: 'Emotion data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add emotion data' });
    }
};