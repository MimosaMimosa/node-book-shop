const express = require("express");
const router = express.Router();
const { create, show, index } = require("../../controller/client/user");
const { uploadImage } = require("../../utils/upload");
const { storeRequest } = require("../../validator/user");

router.post("/", storeRequest, uploadImage("upload.users"), create);
router.get("/:id", show);
router.get("/", index);

module.exports = router;
