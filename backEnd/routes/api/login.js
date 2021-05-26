// Requiring "Router" object from "Express":
const router = require("express").Router();
const { findUser } = require("../../sql/queries");
// -> /delilahResto/login (either as User or Admin):
router.post("/login", (req, res) => {
  const { username, user_password } = req.body;
})

// Exports:
module.exports = router;