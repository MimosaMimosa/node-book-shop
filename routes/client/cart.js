const { Router } = require("express");
const {
	store,
	index,
	destroyProduct,
} = require("../../controller/client/cart");
const { verifyToken } = require("../../middleware/auth");

const router = Router();

router.post("/", verifyToken, store);
router.get("/", verifyToken, index);
router.delete("/product/:id", verifyToken, destroyProduct);

module.exports = router;
