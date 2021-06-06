const router = require("express").Router();
// Requiring middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
const { checkEmailRegistration, usernameAvailability, hashPassword, createNewUser } = require("../../middlewares/users");
const { userExistanceCheck, verifyPassword } = require("../../middlewares/users");
const { jwtokenGenerator } = require("../../middlewares/jwtoken");
// Requiring JSON schemas:
const {registerSchema} = require("../../schema/schemas");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/user/register (either as User or Admin):
router.post("/register", validateJSONSchema(registerSchema), checkEmailRegistration, usernameAvailability, hashPassword, createNewUser, (req, res) => {
  const successResponse = {
    SuccessMessage: "User created successfully.",
    CreatedUser : req.createdUser
  }
  res.status(201).json(successResponse)
});
// -> /delilahResto/user/login (either as User or Admin):
router.post("/login", userExistanceCheck, verifyPassword, jwtokenGenerator, (req, res) => {
  const succesResponse = {
    SucessMessage : "You have successfully logged in.",
    Token : req.jwtoken
  }
  res.status(201).json(succesResponse)
})
module.exports = router;