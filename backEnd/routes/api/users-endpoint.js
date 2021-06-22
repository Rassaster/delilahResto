const router = require("express").Router();
// Requiring middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
const { checkEmailRegistration, usernameAvailability, hashPassword, createNewUser } = require("../../middlewares/users-midwares");
const { userExistanceCheck, verifyPassword } = require("../../middlewares/users-midwares");
const { jwtokenGenerator, jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
const { checkAdminCredentials, getUserById, getAllUsers, getUserByUsername, getUserByEmail } = require("../../middlewares/users-midwares");
// Requiring JSON schemas:
const {registerSchema, loginSchema} = require("../../schema/schemas");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/users/register (either as User or Admin):
router.post("/register", validateJSONSchema(registerSchema), checkEmailRegistration, usernameAvailability, hashPassword, createNewUser, (req, res) => {
  if (req.userCreation["Status"] === 201) {
    res.status(201).json(req.userCreation)
  }
});
// -> /delilahResto/users/login (either as User or Admin):
router.post("/login", validateJSONSchema(loginSchema), userExistanceCheck, verifyPassword, jwtokenGenerator, (req, res) => {
  if (req.userAuthentication["Status"] === 200) {
    req.userAuthentication["Token"] = req.jwtoken;
    res.status(200).json(req.userAuthentication);
    delete req.userAuthentication["Token"];
  }
});
// -> /delilahResto/users/byID:userId -> Admin: Get user by id | Client: Get self user by "i":
router.get("/byID:userId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getUserById, (req, res) => {
  if (req.userById["Status"] === 403) {
    res.status(403).json(req.userById);
  } else if (req.userById["Status"] === 200) {
    res.status(200).json(req.userById);
  }
})
// -> /delilahResto/users/allRegistered -> Just Admin: Get the list of all of the registered users:
router.get("/allRegistered", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getAllUsers, (req, res) => {
  if (req.getAllUsers["Status"] === 403) {
    res.status(403).json(req.getAllUsers);
  } else if (req.getAllUsers["Status"] === 200) {
    res.status(200).json(req.getAllUsers);
  }
});
// -> /delilahResto/users/byUsername -> Just Admin: Get user by username:
router.get("/byUsername", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getUserByUsername, (req, res) => {
  if (req.getUserByUsername["Status"] === 403) {
    res.status(403).json(req.getUserByUsername);
  } else if (req.getUserByUsername["Status"] === 200) {
    res.status(200).json(req.getUserByUsername);
  }
});
// -> /delilahResto/users/byEmail -> Just Admin: Get user by email:
router.get("/byEmail", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getUserByEmail, (req, res) => {
  if (req.getUserByEmail["Status"] === 403) {
    res.status(403).json(req.getUserByEmail);
  } else if (req.getUserByEmail["Status"] === 200) {
    res.status(200).json(req.getUserByEmail);
  }
});
// -> /delilahResto/users/byId:userid -> Just Admin: Delete user by id:

// Exports:
module.exports = router;
