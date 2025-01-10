const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const emtionRoutes = require('./emtion');

// Auth Routes
router.use('/auth', authRoutes);

// Emotion Routes
router.use('/emtion', emtionRoutes);

module.exports = router;