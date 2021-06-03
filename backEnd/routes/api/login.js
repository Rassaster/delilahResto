// Requiring "Router" object from "Express":
const router = require("express").Router();
const { userExistanceCheck, verifyPassword } = require("../../middlewares/users")
// -> /delilahResto/login (either as User or Admin):
router.post("/login", userExistanceCheck, verifyPassword,  (req, res) => {
  console.log(req.userInfo);
  res.json(req.userInfo);
})
// Exports:
module.exports = router;