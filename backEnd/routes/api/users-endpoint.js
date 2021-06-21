const router = require("express").Router();
// Requiring middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
const { checkEmailRegistration, usernameAvailability, hashPassword, createNewUser } = require("../../middlewares/users-midwares");
const { userExistanceCheck, verifyPassword } = require("../../middlewares/users-midwares");
const { checkAdminCredentials, getUserById, getAllUsers } = require("../../middlewares/users-midwares");
const { jwtokenGenerator, jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Requiring JSON schemas:
const {registerSchema, loginSchema} = require("../../schema/schemas");
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
router.post("/login", validateJSONSchema(loginSchema), userExistanceCheck, verifyPassword, jwtokenGenerator, (req, res) => {
  const succesResponse = {
    SucessMessage : "You have successfully logged in.",
    Token : req.jwtoken
  }
  res.status(201).json(succesResponse)
});
router.get("/:userId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getUserById, (req, res) => {
  const successResponse = {
    SuccessMessage: "User found.",
    UserData: req.userById
  }
  res.status(200).json(successResponse);
})
router.get("/getAll/registered", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getAllUsers, (req, res) => {
  console.log("ALLALLLALLLALL")
  const successResponse = {
    SuccessMessage: "List of all registered users found.",
    UserData: req.usersRegister
  }
  res.status(200).json(successResponse);
});
module.exports = router;
