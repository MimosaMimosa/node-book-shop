const express = require('express');
const router = express.Router();
const { create, index } = require('../../controller/client/category');

router.get('/',index)
router.post('/', create);

module.exports = router;
