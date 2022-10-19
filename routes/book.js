const express = require('express');
const router = express.Router();
const { create, index, show } = require('../controller/book');
const { uploadImage } = require('../utils/upload');

router.get('/', index);
router.get('/:id', show);
router.post('/', uploadImage, create);

module.exports = router;
