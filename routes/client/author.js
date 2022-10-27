const express = require("express");
const router = express.Router();
const { create, index } = require("../../controller/author");
const { uploadImage } = require("../../utils/upload");
const { storeRequest } = require("../../Validator/author");

router.get("/", index);
router.post("/", storeRequest, uploadImage("upload/authors/"), create);

module.exports = router;
