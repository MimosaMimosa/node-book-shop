const express = require("express");
const router = express.Router();
const { login } = require("../../controller/auth/auth");
const { loginRequest } = require("../../Validator/auth");

router.post("/login", loginRequest, login);

module.exports = router;
