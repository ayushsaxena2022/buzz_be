const express = require("express");
const router = express.Router();
const registerValidation = require("../middleware/registerValidation.js");
const loginValidation = require("../middleware/loginValidation.js");
const register=require("../controllers/register.js");
const login=require("../controllers/login.js");



router.post("/login", loginValidation, login);
router.post("/register/", registerValidation, register);


module.exports = router;