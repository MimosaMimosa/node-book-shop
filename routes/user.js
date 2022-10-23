const express = require('express');
const router = express.Router();
const { create } = require('../controller/user');
const { uploadImage } = require('../utils/upload');

router.post('/', uploadImage('upload/users/'), create);

module.exports = router;
