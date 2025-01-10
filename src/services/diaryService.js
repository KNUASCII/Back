const axios = require('axios');
const db = require('../config/database');

// 다이어리 조회
exports.getUserDiary = async ({ userID }) => {
    try {
        // 사용자 다이어리 조회 SQL
        const sql = `
            SELECT * FROM diary
            WHERE userID = ?
        `;

        // 사용자 데이터 조회
        const [results] = await db.query(sql, [userID]);

        return results;
    } catch (error) {
        console.error('Error during diary retrieval:', error);
        throw new Error('Diary retrieval failed');
    }
};

// 다이어리 생성
exports.createUserDiary = async ({ userID, diaryText }) => {
    try {
      // 감정 분석
      const emotionData = await analyzeDiary(diaryText);

      
  
      // 다이어리 생성 SQL
      const sql = `
        INSERT INTO user_diary (userID, diaryText, emotionData)
        VALUES (?, ?, ?)
      `;
  
      // 다이어리 생성 (감정 분석 결과도 함께 저장)
      await db.query(sql, [userID, diaryText, JSON.stringify(emotionData)]);
  
      return { message: 'Diary created successfully', emotionData };
    } catch (error) {
      console.error('Error during diary creation:', error);
      throw new Error('Diary creation failed');
    }
};

// 다이어리 분석
exports.analyzeDiary = async ({ diaryText }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/openAi/analyze', {
            text: diaryText
        });

        await axios.post('http://localhost:8080/api/emotion/addemotion', {
            emotionData: response.data
        });

        return response.data;
    } catch (error) {
        console.error('Error during diary analysis:', error);
        throw new Error('Diary analysis failed');
    }
};