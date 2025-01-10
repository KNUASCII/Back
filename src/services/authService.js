const bcrypt = require('bcryptjs');
const db = require('../config/database');
const jwt = require('../config/jwt');

// 회원가입
exports.registerUser = async ({ userID, password, userName, birthday }) => {
  try {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 데이터 저장
    const userSql = `
      INSERT INTO users (userID, password, userName, birthday) 
      VALUES (?, ?, ?, ?)
    `;
    await db.query(userSql, [userID, hashedPassword, userName, birthday]);

    // JWT 토큰 생성
    const token = jwt.generateToken({ userID, userName });

    return { message: 'User registered successfully', token };
  } catch (error) {
    console.error('Error during registration:', error);
    throw new Error('Registration failed');
  }
};

// 로그인
exports.loginUser = async ({ userID, password }) => {
  try {
    const sql = 'SELECT * FROM users WHERE userID = ?';
    const [results] = await db.query(sql, [userID]);

    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // JWT 토큰 생성
        const token = jwt.generateToken({ userID: user.userID, userName: user.userName });
        return { message: 'Login successful', token, user };
      }
    }

    throw new Error('Invalid credentials');
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};

// 비밀번호 변경 - 유저가 설정에서 바꾸는 과정
exports.changeUserPassword = async (userID, currentPassword, newPassword) => {
  try {
    const sql = 'SELECT * FROM users WHERE userID = ?';
    const [results] = await db.query(sql, [userID]);

    if (results.length === 0) {
      throw new Error('User not found');
    }

    const user = results[0];
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      throw new Error('Invalid current password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const changePasswordSql = 'UPDATE users SET password = ? WHERE userID = ?';
    await db.query(changePasswordSql, [hashedPassword, userID]);

    // JWT 토큰 재발급
    const token = jwt.generateToken({ userID: user.userID, userName: user.userName });

    return { message: 'Password changed successfully', token };
  } catch (error) {
    console.error('Error changing password:', error);
    throw new Error('Failed to change password');
  }
};
