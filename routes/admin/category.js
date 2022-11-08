const { Router } = require("express");
const {
	index,
	show,
	destroy,
	store,
} = require("../../controller/admin/category");
const router = Router();

router.get("/", index);
router.get("/:id", show);

router.post("/", store);    
router.delete("/:id", destroy);

module.exports = router;
