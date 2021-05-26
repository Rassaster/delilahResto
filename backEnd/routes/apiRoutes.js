// Requiring "Router" object from "Express":
const router = require("express").Router();
const apiRegister = require("./api/register");
const apiLogin = require("./api/login");

router.use("/user", apiRegister)
router.use("/user", apiLogin)
// Exports:
module.exports = router;