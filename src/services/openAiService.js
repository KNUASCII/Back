const axios = require('axios');
const { OPEN_API_KEY } = require('../config/oepnAPI');
// 감정 분석 함수
exports.analyzeEmotion = async (text) => {
  try {
    // OpenAI API 호출
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o",  // 모델 선택 (gpt-4 사용)
        messages: [
          {
            role: "system",
            content: `
              당신은 감정 분류기입니다. 주어진 텍스트를 보고 다음 다섯 가지 감정 중 가장 적합한 하나를 선택하세요: 기쁨, 슬픔, 분노, 불안, 무기력.
              
              감정 분류의 기준은 다음과 같습니다:
              
              1. **기쁨**: 텍스트가 긍정적이고 즐거운 감정을 나타내는 경우입니다. 예를 들어:
                  - "오늘 하루는 정말 행복하고 뿌듯한 하루였어!"
                  - "친구들과 함께 시간을 보내며 웃고 떠들었어, 정말 즐거운 날이었어."
                  - "이번 주말은 정말 기분이 좋았어. 나가서 새로운 것을 경험했어."
              
              2. **슬픔**: 텍스트가 슬프거나 우울한 감정을 나타내는 경우입니다. 예를 들어:
                  - "오늘은 모든 것이 너무 우울하고 힘들었어."
                  - "혼자 있는 시간이 너무 외로워서 괴로웠어."
                  - "사람들과의 관계에서 상처받고 너무 슬퍼."
              
              3. **분노**: 텍스트에서 분노나 강한 불만이 드러나는 경우입니다. 예를 들어:
                  - "내가 그렇게 열심히 했는데 왜 결과가 이렇게 나왔는지 이해할 수 없어!"
                  - "다시 말해도 듣지 않는 사람들 때문에 너무 화가 나."
                  - "오늘 일이 너무 짜증나, 왜 이렇게 일이 꼬이는지 모르겠어."
              
              4. **불안**: 텍스트에서 불확실성이나 걱정, 불편함이 나타나는 경우입니다. 예를 들어:
                  - "앞으로 일어날 일이 너무 걱정돼, 어떻게 될지 모르겠어."
                  - "이번 시험이 너무 불안해서 잠을 잘 수가 없어."
                  - "모든 일이 잘될지 몰라서 계속 마음이 불안해."
              
              5. **무기력**: 텍스트에서 피곤하거나 의욕이 없는 상태를 나타내는 경우입니다. 예를 들어:
                  - "하루 종일 아무것도 할 힘이 없었어."
                  - "오늘은 정말 아무것도 하기 싫어서 침대에서 일어나기 힘들었어."
                  - "아무리 쉬어도 피곤하고 지치기만 해. 그냥 아무것도 할 수가 없어."
      
              만약 텍스트가 매우 긍정적이면 '기쁨', 매우 부정적이면 '슬픔', 중간 정도의 감정이면 그에 맞는 감정을 골라주세요.
            `
          },
          {
            role: "user",
            content: `다음 텍스트를 읽고 가장 적합한 감정을 하나 골라주세요: 기쁨, 슬픔, 분노, 불안, 무기력. 텍스트: "${text}"`
          }
        ],
        max_tokens: 50,
        temperature: 0.7
      },    
      {
        headers: {
          'Authorization': `Bearer ${OPEN_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 응답 처리
    if (response.status === 200) {
      const emotion = response.data.choices[0]?.message?.content?.trim();
      console.log("OpenAI Response:", emotion);  // 디버깅용 로그

      const validEmotions = ["기쁨", "슬픔", "분노", "불안", "무기력"];
      if (validEmotions.includes(emotion)) {
        return emotion;  // 유효한 감정을 반환
      } else {
        console.warn("Invalid emotion received. Returning 'Cannot classify.'");
        return "Cannot classify";  // 유효하지 않은 응답 처리
      }
    } else {
      throw new Error(`API responded with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    throw new Error('Failed to analyze text with OpenAI API');
  }
};
