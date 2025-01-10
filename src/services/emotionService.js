const jwt = require('../config/jwt'); // jwt.js 경로
const db = require('../config/database');

exports.getUserEmotion = async (req, res) => {
    try {
        // 클라이언트에서 토큰을 헤더에서 추출
        const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>" 형식
        
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        // 토큰 검증
        const decoded = jwt.verifyToken(token); // verifyToken 함수 호출

        // 검증된 토큰에서 userID 추출
        const userID = decoded.userID;

        // 감정 데이터를 가져오는 SQL 쿼리
        const sql = `
            SELECT emotion_data
            FROM user_emotion
            WHERE userId = ?
        `;
        const [result] = await db.query(sql, [userID]);

        if (result.length === 0) {
            throw new Error('User emotion data not found');
        }

        // 감정 데이터 가져오기
        const emotionData = result[0].emotion_data;

        // 감정 데이터를 split하여 배열로 변환
        const emotions = emotionData.split(',').map(emotion => emotion.trim()).filter(Boolean); // 공백 제거

        // 각 감정의 개수를 세기 위한 객체
        const emotionCount = {
            기쁨: 0,
            슬픔: 0,
            분노: 0,
            불안: 0,
            무기력: 0
        };

        // 감정 데이터를 순회하면서 카운트
        emotions.forEach(emotion => {
            if (emotionCount.hasOwnProperty(emotion)) {
                emotionCount[emotion]++;
            }
        });

        return emotionCount; // 각 감정의 갯수가 담긴 객체 반환
    } catch (error) {
        console.error('Error fetching user emotion data:', error);
        throw new Error('Failed to retrieve user emotion data');
    }
};

exports.addUserEmotion = async ({ userID, emotionData }) => {
    try {
        console.log(userID, emotionData);

        // 기존 감정 데이터를 가져오는 SQL 쿼리
        const sqlSelect = `
            SELECT emotion_data
            FROM user_emotion
            WHERE userId = ?
        `;
        const [result] = await db.query(sqlSelect, [userID]); // userID를 body에서 가져옴

        // 감정 데이터를 업데이트할 준비
        let newEmotionData = emotionData;

        if (result.length > 0) {
            // 기존 감정 데이터가 있다면, 새 감정을 추가
            newEmotionData = result[0].emotion_data + emotionData + ', ';  // 기존 감정 뒤에 새로운 감정 추가
        }

        // 감정 데이터를 업데이트하는 SQL 쿼리
        const sqlUpdate = `
            INSERT INTO user_emotion (userId, emotion_data)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE emotion_data = VALUES(emotion_data)
        `;

        // 데이터 삽입/업데이트
        await db.query(sqlUpdate, [userID, newEmotionData]);

        console.log({ message: 'Emotion data added successfully' });
    } catch (error) {
        console.error('Error adding emotion data:', error);
        console.log({ message: 'Failed to add emotion data' });
    }
};
