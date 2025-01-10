const openAiService = require('../services/openAiService');  // openAiService import

// 다이어리 감정 분석
exports.analyzeDiaryEmotion = async (req, res) => {
  const { text } = req.body;  // 클라이언트로부터 다이어리 텍스트 받아옴

  try {
    // OpenAI 감정 분석 함수 호출
    const analysis = await openAiService.analyzeEmotion(text);
    
    // 분석 결과를 응답으로 전송
    return res.status(200).json({ emotionAnalysis: analysis });
  } catch (error) {
    console.error('Error during emotion analysis:', error);
    return res.status(500).json({ message: 'Emotion analysis failed' });
  }
};
