const express = require("express");
const router = express.Router();
const {
	create,
	index,
	randomAuthors,
} = require("../../controller/client/author");
const { uploadImage } = require("../../utils/upload");
const { storeRequest } = require("../../validator/author");

router.get("/", index);
router.post("/", storeRequest, uploadImage("upload/authors/"), create);
router.get("/samples", randomAuthors);

module.exports = router;
