const { validationResult } = require('express-validator');
const authService = require('../services/authService');

// 회원가입
exports.register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userID, password, userName, birthday } = req.body;

    try {
        const result = await authService.registerUser({ 
            userID,
            password,
            userName,
            birthday
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

// 로그인
exports.login = async (req, res) => {
    const { userID, password } = req.body;

    try {
        const response = await authService.loginUser({ userID, password });

         // 로그인 성공 시 200 상태 코드로 응답
        res.status(200).json(response);
    } catch (error) {
        console.error('Login error:', error);
        // 에러 메시지 수정
        res.status(400).json({ error: 'Login failed', details: error.message });
    }
};

exports.changePassword = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;
    
    // 로그인된 사용자 ID
    const userId = req.user.id;

    try {
        // 비밀번호 변경 서비스 호출
        const result = await authService.changeUserPassword(userId, currentPassword, newPassword)

        res.status(200).json(result);
    } catch (error) {
        console.error('Error changing password:', error);
        return res.status(400).json({ errors: errors.array() })
    }
};