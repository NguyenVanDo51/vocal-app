const express = require('express');
const authController = require('./authController');
const router = express.Router();

router.post('/auth/google', authController.loginWithGoogle);

module.exports = router;
