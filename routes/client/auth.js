const express = require("express");
const router = express.Router();
const { login } = require("../../controller/auth/auth");
const { verifyToken } = require("../../middleware/auth");
const { loginRequest } = require("../../Validator/auth");

router.post("/login", loginRequest, verifyToken, login);

module.exports = router;
