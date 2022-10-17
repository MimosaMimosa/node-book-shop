const express = require('express');
const router = express.Router();
const { create, index } = require('../controller/book');
const { uploadImage } = require('../utils/upload');

router.get('/', index);
router.post('/', uploadImage, create);

module.exports = router;
