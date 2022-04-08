const express = require("express");
const router = express.Router();
const userValidation = require("../middleware/userValidation.js");
const loginValidation = require("../middleware/loginValidation.js");
const register=require("../controllers/auth/register.js");
const login=require("../controllers/auth/login.js");

router.post("/login", loginValidation, login);
router.post("/register/", userValidation, register);


module.exports = router;
