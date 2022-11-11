const { Router } = require("express");
const {
	index,
	store,
	destroy,
	show,
	update,
} = require("../../controller/admin/book");
const { uploadImage } = require("../../utils/upload");
const { storeRequest, updateRequest } = require("../../Validator/book");
const router = Router();

router.get("/", index);
router.get("/:id", show);
router.post("/:id", updateRequest, uploadImage("upload.images"), update);
router.post("/", storeRequest, uploadImage("upload.images"), store);
router.delete("/:id", destroy);

module.exports = router;
