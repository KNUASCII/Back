const jwt = require('../config/jwt');  // 토큰 관련 함수가 있는 파일에서 가져옴

// 토큰 검증 및 userID 추출 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Authorization: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    // 토큰 검증 및 userID 추출
    const decoded = jwt.verifyToken(token);
    req.userID = decoded.userID;  // 토큰에서 userID를 추출하여 req.userID에 저장

    next();  // 다음 미들웨어 또는 요청 핸들러로 넘어감
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;