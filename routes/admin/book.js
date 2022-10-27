const {Router} = require('express');
const { index } = require('../../controller/admin/book');
const router = Router();

router.get('/',index)


module.exports = router;