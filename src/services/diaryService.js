const axios = require('axios');
const db = require('../config/database');
const jwt = require('../config/jwt');

// 다이어리 조회
exports.getUserDiary = async (req, res) => {
    try {
        // 토큰 추출 및 검증
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        // 토큰 검증 및 userId 추출
        const decoded = jwt.verifyToken(token);
        const userId = decoded.userID;

        // 사용자 다이어리 조회 SQL
        const sql = `
            SELECT * FROM user_diary
            WHERE userId = ?
        `;

        // 사용자 데이터 조회
        const [results] = await db.query(sql, [userId]);
        return results;
    } catch (error) {
        console.error('Error during diary retrieval:', error);
        throw new Error('Diary retrieval failed');
    }
};

// 다이어리 생성
exports.createUserDiary = async (req, res, diaryText) => {
    try {
        // 토큰 추출 및 검증
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        // 토큰 검증 및 userId 추출
        const decoded = jwt.verifyToken(token);
        const userId = decoded.userID;

        // 감정 분석
        const emotionData = await exports.analyzeDiary({ userId, diaryText });
        
        console.log('emotionData', emotionData);
        
        // 다이어리 생성 SQL
        const sql = `
            INSERT INTO user_diary (userId, diaryText, emotionData)
            VALUES (?, ?, ?)
        `;

        // 다이어리 생성 (감정 분석 결과도 함께 저장)
        await db.query(sql, [userId, diaryText, JSON.stringify(emotionData)]);

        return { message: 'Diary created successfully', emotionData };
    } catch (error) {
        console.error('Error during diary creation:', error);
        throw new Error('Diary creation failed');
    }
};

// 다이어리 분석
exports.analyzeDiary = async ({ userId, diaryText }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/openAi/analyze', {
            text: diaryText
        });

        await axios.post('http://localhost:8080/api/emotion/addEmotion', {
            userID: userId,
            emotionData: response.data
        });

        return response.data;
    } catch (error) {
        console.error('Error during diary analysis:', error);

        const errorMessage = error.response ? error.response.data : error.message;
        throw new Error(`Diary analysis failed: ${errorMessage}`);
    }
};