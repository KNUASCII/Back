const jwt = require('jsonwebtoken');

// JWT 비밀키 및 기본 설정
const JWT_SECRET = 'main_secret';
const JWT_EXPIRES_IN = '24h';

// 토큰 생성 함수
exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// 토큰 검증 함수
exports.verifyToken = (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      } else {
        throw new Error('Token verification failed');
      }
    }
};

// 토큰 디코드 함수 (유효성 검증 없이 디코드만)
exports.decodeToken = (token) => {
  return jwt.decode(token);
};