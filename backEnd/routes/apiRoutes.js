// Requiring "Router" object from "Express":
const router = require("express").Router();
const apiUser = require("./api/user");

router.use("/users", apiUser);
// router.use("/products", apiUser);
// router.use("/orders", apiUser);
// router.use("/favorites", apiUser);
// Exports:
module.exports = router;