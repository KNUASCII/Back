const axios = require('axios');
const { OPEN_API_KEY } = require('../config/oepnAPI');

exports.analyzeEmotion = async (diaryText) => {
  try {
    // OpenAI API 호출
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an emotion classifier. Your job is to classify the following text into one of these five emotions: Joy, Sadness, Anger, Anxiety, Lethargy. If the text does not match any of these emotions, please respond with "Cannot classify."`
          },
          {
            role: "user",
            content: `Classify the following text into one of these emotions: Joy, Sadness, Anger, Anxiety, Lethargy. Text: "${diaryText}"`
          }
        ],
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPEN_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 응답 처리
    if (response.status === 200) {
      const emotion = response.data.choices[0]?.message?.content?.trim();

      console.log("OpenAI Response:", emotion); // 디버깅용 로그

      const validEmotions = ["Joy", "Sadness", "Anger", "Anxiety", "Lethargy"];
      if (validEmotions.includes(emotion)) {
        return emotion; // 유효한 감정을 반환
      } else {
        console.warn("Invalid emotion received. Returning 'Cannot classify.'");
        return "Cannot classify"; // 유효하지 않은 응답 처리
      }
    } else {
      throw new Error(`API responded with status code: ${response.status}`);
    }
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    throw new Error(`Failed to analyze emotion: ${error.message}`);
  }
};
