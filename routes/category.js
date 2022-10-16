const express = require('express');
const router = express.Router();
const { create } = require('../controller/category');

router.post('/', create);

module.exports = router;
