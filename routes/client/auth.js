const express = require("express");
const router = express.Router();
const { login, isLogin } = require("../../controller/client/auth");
const { verifyToken } = require("../../middleware/auth");
const { loginRequest } = require("../../validator/auth");

router.post("/login", loginRequest, login);
router.post("/is-login", verifyToken, isLogin);

module.exports = router;
