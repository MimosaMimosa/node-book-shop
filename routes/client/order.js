const { Router } = require("express");
const { store, index, show } = require("../../controller/client/order");
const { verifyToken } = require("../../middleware/auth");
const { storeRequest } = require("../../validator/order");

const router = Router();

router.post("/", verifyToken, storeRequest, store);
router.get("/", index);
router.get("/:id", show);

module.exports = router;
