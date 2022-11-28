const express = require("express");
const router = express.Router();
const {
	index,
	randomAuthors,
} = require("../../controller/client/author");

router.get("/", index);
router.get("/samples", randomAuthors);

module.exports = router;
