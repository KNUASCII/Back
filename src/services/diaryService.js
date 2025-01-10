const axios = require('axios');
const db = require('../config/database');

exports.analyzeDiary = async ({ userID, diaryText }) => {
    try {
        // diaryText가 객체라면 문자열로 변환
        if (typeof diaryText !== 'string') {
            diaryText = JSON.stringify(diaryText);
        }

        const response = await axios.post('http://localhost:8080/api/openAi/analyze', {
            text: diaryText // 문자열로 변환된 diaryText 전송
        });

        // 감정 데이터 API로 전송
        await axios.post('http://localhost:8080/api/emotion/addemotion', {
            userID: userID,
            emotionData: response.data
        });

        console.log('Diary analysis:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error during diary analysis:', error);

        // 에러 메시지 개선
        const errorMessage = error.response ? error.response.data : error.message;
        throw new Error(`Diary analysis failed: ${errorMessage}`);
    }
};

// 다이어리 생성
exports.createUserDiary = async ({ userID, diaryText }) => {
    try {
        // 감정 분석
        const emotionData = await exports.analyzeDiary(userID, diaryText);  // analyzeDiary 함수 호출

        console.log('Emotion data:', emotionData);

        // 다이어리 생성 SQL
        const sql = `
            INSERT INTO user_diary (userID, diaryText, emotionData)
            VALUES (?, ?, ?)
        `;
    
        // 다이어리 생성 (감정 분석 결과도 함께 저장)
        const results = await db.query(sql, [userID, diaryText, JSON.stringify(emotionData)]);
        
        console.log('Diary created:', results);

        return { message: 'Diary created successfully', emotionData };
    } catch (error) {
        console.error('Error during diary creation:', error);
        throw new Error('Diary creation failed');
    }
};
