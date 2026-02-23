const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/* POST /api/auth/signup */
router.post("/signup",authController.signUpController);

/* POST /api/auth/signin */
router.post("/signin",authController.signInController);



module.exports = router;