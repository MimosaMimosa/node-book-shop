const {Router} = require('express');
const router = Router();
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

router.get(/(upload).*/, (req, res) => {
	return res.sendFile(appDir + '/' + req.url);
});

module.exports = router;
