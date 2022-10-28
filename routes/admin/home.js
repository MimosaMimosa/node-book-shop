const {Router} = require('express');
const { index } = require('../../controller/admin/home');
const router = Router();

router.get('/',index)


module.exports = router;