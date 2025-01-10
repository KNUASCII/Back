const db = require('../config/database');

exports.getUserEmotion = async ({ userID }) => {
    try {
        // 감정 데이터를 가져오는 SQL 쿼리
        const sql = `
            SELECT emotion_data
            FROM user_emotion
            WHERE userId = ?
        `;

        const [result] = await db.query(sql, [userID]);

        console.log(result);

        if (result.length === 0) {
            console.warn(`No emotion data found for userId: ${userID}`);
            return []; // 빈 배열 반환
        }

        // 각 감정의 개수를 세기 위한 객체
        const emotionCount = {
            기쁨: 0,
            슬픔: 0,
            분노: 0,
            불안: 0,
            무기력: 0
        };

        // 결과를 순회하면서 감정 데이터를 split하여 카운트
        result.forEach(row => {
            const emotions = row.emotion_data.split(',').map(emotion => emotion.trim()).filter(Boolean);
            emotions.forEach(emotion => {
                if (emotionCount.hasOwnProperty(emotion)) {
                    emotionCount[emotion]++;
                }
            });
        });

        // 객체를 배열로 변환
        const emotionArray = Object.entries(emotionCount).map(([emotion, count]) => ({ emotion, count }));

        return emotionArray; // 각 감정의 갯수가 담긴 배열 반환
    } catch (error) {
        console.error('Error fetching user emotion data:', error);
        throw new Error('Failed to retrieve user emotion data');
    }
};

exports.addUserEmotion = async ({ userID, emotionData }) => {
    try {
        // 감정 데이터를 업데이트하는 SQL 쿼리
        const sqlUpdate = `
            INSERT INTO user_emotion (userId, emotion_data)
            VALUES (?, ?)`;

        // 데이터 삽입/업데이트
        await db.query(sqlUpdate, [userID, emotionData]);

        console.log('Emotion data added successfully');
    } catch (error) {
        console.error('Error adding emotion data:', error);
        throw new Error('Failed to add emotion data');
    }
};
