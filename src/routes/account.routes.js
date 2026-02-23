const express = require("express");
const validateUser = require("../middleware/auth.middleware");

const router = express.Router();

router.use(validateUser);

router.get("/",getAccountDetails);
router.post("/",createAccount);
router.put("/",updateAccount),
router.delete("/",deleteAccount);

module.exports = router;