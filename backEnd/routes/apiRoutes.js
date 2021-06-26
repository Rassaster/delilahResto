// Requiring "Router" object from "Express":
const router = require("express").Router();
const apiUsers = require("./api/users-endpoint");
const apiProducts = require("./api/products-endpoint");

router.use("/users", apiUsers);
router.use("/products", apiProducts);
// router.use("/orders", apiUser);
// router.use("/favorites", apiUser);
// Exports:
module.exports = router;