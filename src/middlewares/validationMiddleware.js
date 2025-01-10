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
  body('userAge')
    .isInt({ min: 0, max: 150 }).withMessage('UserAge must be a valid age between 0 and 150')
    .notEmpty().withMessage('UserAge is required'),
  body('phone')
    .matches(/^\d{1,15}$/).withMessage('Phone must be a numeric string of up to 15 digits')
    .notEmpty().withMessage('Phone is required'),
  body('university')
    .isString().withMessage('University must be a string')
    .notEmpty().withMessage('University is required'),
  body('studentId')
    .isNumeric().withMessage('StudentId must be a numeric value')
    .isLength({ min: 1, max: 10 }).withMessage('StudentId must be between 1 and 10 digits long')
    .notEmpty().withMessage('StudentId is required'),
  body('department')
    .isString().withMessage('Department must be a string')
    .isLength({ max: 100 }).withMessage('Department must not exceed 100 characters')
    .notEmpty().withMessage('Department is required'),
  body('grade')
    .isInt({ min: 1, max: 4 }).withMessage('Grade must be an integer between 1 and 4')
    .notEmpty().withMessage('Grade is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .notEmpty().withMessage('Password is required'),
];

// 인증 코드 요청 입력 검증
exports.validatePhoneInput = [
  body('phone')
    .matches(/^\d{1,15}$/).withMessage('Phone must be a numeric string of up to 15 digits')
    .notEmpty().withMessage('Phone is required'),
];
