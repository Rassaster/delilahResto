// Requiring "Router" object from "Express":
const router = require("express").Router();
const apiRegister = require("./api/register");

router.use("/register", apiRegister)
// Exports:
module.exports = router;