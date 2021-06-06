// Requiring "Router" object from "Express":
const router = require("express").Router();
const apiUser = require("./api/user");

router.use("/user", apiUser);
// Exports:
module.exports = router;