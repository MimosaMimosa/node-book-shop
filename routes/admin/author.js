const { Router } = require("express");
const { index } = require("../../controller/admin/author");
const router = Router();

router.get("/", index);

module.exports = router;
