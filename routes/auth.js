const express = require('express');
const router = express.Router();
const { login } = require('../controller/auth/auth');

router.post('/login', login);

module.exports = router;
