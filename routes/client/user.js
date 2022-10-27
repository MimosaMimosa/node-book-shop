const express = require('express');
const router = express.Router();
const { create, show, index } = require('../../controller/client/User');
const { uploadImage } = require('../../utils/upload');
const { storeRequest } = require('../../Validator/user');

router.post('/', storeRequest, uploadImage('upload/users/'), create);
router.get('/:id', show);
router.get('/', index);

module.exports = router;
