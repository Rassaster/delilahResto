// Requiring "Router" object from "Express":
const router = require("express").Router();
const { userExistanceCheck, verifyPassword } = require("../../middlewares/users");
const { jwtokenGenerator } = require("../../middlewares/jwtoken");
// -> /delilahResto/login (either as User or Admin):
router.post("/login", userExistanceCheck, verifyPassword, jwtokenGenerator, (req, res) => {
  const succesResponse = {
    sucessMessage : "You have successfully logged in.",
    token : req.jwtoken
  }
  res.status(201).json(succesResponse)
})
// Exports:
module.exports = router;