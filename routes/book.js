const express = require("express");
const router = express.Router();
const { create, index, show } = require("../controller/book");
const { verifyToken } = require("../middleware/auth");
const { uploadImage } = require("../utils/upload");
const { storeRequest } = require("../Validator/book");

router.get("/", index);
router.post("/", storeRequest, uploadImage("upload/images/"), create);
router.get("/:id", verifyToken, show);

module.exports = router;
