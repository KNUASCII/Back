const { body } = require('express-validator');

// 회원가입 입력 검증
exports.validateAuthInput = [
  body('userID')
    .isAlphanumeric().withMessage('UserID must contain only letters and numbers')
    .isLength({ min: 5, max: 20 }).withMessage('UserID must be between 5 and 20 characters long')
    .notEmpty().withMessage('UserID is required'),
  body('userName')
    .isString().withMessage('UserName must be a string')
    .isLength({ min: 2, max: 50 }).withMessage('UserName must be between 2 and 50 characters long')
    .notEmpty().withMessage('UserName is required'),
  body('birthday')
    .matches(/^\d{6}$/).withMessage('Birthday must be a 6-digit numeric string (YYMMDD format)')
    .notEmpty().withMessage('Birthday is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required'),
];
