const express = require("express");
const router = express.Router();
const { index, show, search } = require("../../controller/client/book");

router.get("/", index);
router.get("/:id", show);
router.get("/search/queries", search);

module.exports = router;
