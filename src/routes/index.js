const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const diaryRoutes = require('./diary');
const emtionRoutes = require('./emtion');
const openAiRoutes = require('./openAi');

// Auth Routes
router.use('/auth', authRoutes);

// Diary Routes
router.use('/diary', diaryRoutes);

// OpenAi Routes
router.use('/openai', openAiRoutes);

// Emotion Routes
router.use('/emtion', emtionRoutes);

module.exports = router;