const { Router } = require("express");
const { index, store, destroy } = require("../../controller/admin/book");
const { uploadImage } = require("../../utils/upload");
const { storeRequest } = require("../../Validator/book");
const router = Router();

router.get("/", index);
router.post("/", storeRequest, uploadImage("upload.images"), store);
router.delete("/:id", destroy);

module.exports = router;
