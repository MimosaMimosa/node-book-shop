const express = require('express');
const router = express.Router();
const { create } = require('../controller/book');
const { uploadImage } = require('../utils/upload');

router.post('/', uploadImage, create);

module.exports = router;
