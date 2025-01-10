const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const diaryRoutes = require('./diary');
const emtionRoutes = require('./emotion');
const openAiRoutes = require('./openAi');

// Auth Routes
router.use('/auth', authRoutes);

// Diary Routes
router.use('/diary', diaryRoutes);

// OpenAi Routes
router.use('/openAi', openAiRoutes);

// Emotion Routes
router.use('/emotion', emtionRoutes);

module.exports = router;