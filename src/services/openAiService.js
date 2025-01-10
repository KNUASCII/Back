require('dotenv').config();
const axios = require('axios');

// OpenAI API 호출 함수
exports.analyzeEmotion = async (diaryText) => {
  try {
    // OpenAI API 엔드포인트와 API 키 설정
    const apiKey = process.env.OPENAI_API_KEY;
    const apiEndpoint = 'https://api.openai.com/v1/completions';  // GPT-3 또는 GPT-4 모델 사용

    // OpenAI API 요청 데이터
    const response = await axios.post(apiEndpoint, {
      model: "text-davinci-003", // O1 - mini로 변경 필요
      prompt: `Analyze the following diary text and determine the overall emotion or sentiment:\n\n${diaryText}`,
      max_tokens: 150,
      temperature: 0.7,
      n: 1,
      stop: null
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // 응답에서 감정 분석 결과 반환
    const analysis = response.data.choices[0].text.trim();
    return analysis;
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    throw new Error('Failed to analyze text with OpenAI API');
  }
};
