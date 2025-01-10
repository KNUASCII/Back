const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const diaryRoutes = require('./diary');
const emotionRoutes = require('./emotion');
const openAiRoutes = require('./openAi');

// Auth Routes
router.use('/auth', authRoutes);

// Diary Routes
router.use('/diary', diaryRoutes);

// Emotion Routes
router.use('/emotion', emotionRoutes);

// OpenAi Routes
router.use('/openAi', openAiRoutes);

module.exports = router;