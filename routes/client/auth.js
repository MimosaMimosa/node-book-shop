const express = require("express");
const router = express.Router();
const { login } = require("../../controller/client/auth");
const { loginRequest } = require("../../validator/auth");

router.post("/login", loginRequest, login);

module.exports = router;
