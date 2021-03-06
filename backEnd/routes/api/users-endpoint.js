const router = require("express").Router();
// Requiring JSON schemas:
const {registerSchema, loginSchema, updateUserSchema} = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// Security/Credentials middlewares:
const { hashPassword, verifyPassword, checkUserPermissions, justAdminGate, } = require("../../middlewares/users-midwares");
// Users validation middlewares:
const { checkEmailRegistration, usernameAvailability, userExistanceCheckByEmailLogin } = require("../../middlewares/users-midwares");
// JWT middlewares:
const { jwtokenGenerator, jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// CRUD middlewares:
const { createNewUser, getUserById, getAllUsers, getUserByUsername, getUserByEmail, updateUserById, deleteUserById } = require("../../middlewares/users-midwares");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/users/register (either as User or Admin):
router.post("/register", validateJSONSchema(registerSchema), checkEmailRegistration, usernameAvailability, hashPassword, createNewUser, (req, res) => {
  if (req.userCreation["Status"] === 201) {
    res.status(201).json(req.userCreation);
  };
});
// -> /delilahResto/users/login (either as User or Admin):
router.post("/login", validateJSONSchema(loginSchema), userExistanceCheckByEmailLogin, verifyPassword, jwtokenGenerator, (req, res) => {
  if (req.userAuthentication["Status"] === 200) {
    req.userAuthentication["Token"] = req.jwtoken;
    res.status(200).json(req.userAuthentication);
    delete req.userAuthentication["Token"];
  };
});
// -> /delilahResto/users/allRegistered -> Just Admin: Get the list of all of the registered users:
router.get("/allRegistered", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getAllUsers, (req, res) => {
  if (req.getAllUsers["Status"] === 401) {
    res.status(401).json(req.getAllUsers);
  } else if (req.getAllUsers["Status"] === 200) {
    res.status(200).json(req.getAllUsers);
  };
});
// -> /delilahResto/users/byID::userId 
// Admin: Get user by id | Client or Admin: Get self user by "i":
router.get("/byId::userId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getUserById, (req, res) => {
  if (req.userById["Status"] === 401) {
    res.status(401).json(req.userById);
  } else if (req.userById["Status"] === 200) {
    res.status(200).json(req.userById);
  };
  delete req.userById["UserFound"];
});
// -> /delilahResto/users/byUsername::username -> Just Admin: Get user by username:
router.get("/byUsername::username", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getUserByUsername, (req, res) => {
  if (req.getUserByUsername["Status"] === 401) {
    res.status(401).json(req.getUserByUsername);
  } else if (req.getUserByUsername["Status"] === 200) {
    res.status(200).json(req.getUserByUsername);
  };
});
// -> /delilahResto/users/byEmail -> Just Admin: Get user by email:
router.get("/byEmail::email", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getUserByEmail, (req, res) => {
  if (req.getUserByEmail["Status"] === 401) {
    res.status(401).json(req.getUserByEmail);
  } else if (req.getUserByEmail["Status"] === 200) {
    res.status(200).json(req.getUserByEmail);
  };
});
// -> /delilahResto/users/byId::userid.
// Just Admin: Update user by id | Client or Admin: Update self user by "i":
router.put("/update::userId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, getUserById, validateJSONSchema(updateUserSchema), checkEmailRegistration, usernameAvailability, hashPassword, updateUserById, (req, res) => {
  if (!req.updateUserById["UserFound"]){
    res.status(200).json(req.updateUserById);
  } else if (!req.updateUserById["UserUpdated"]) {
    res.status(409).json(req.updateUserById);
  } else if (req.updateUserById["UserUpdated"]) {
    res.status(204).json(req.updateUserById);
  };
  delete req.userById["UserFound"];
  delete req.updateUserById["UserUpdated"];
});
// -> /delilahResto/users/deleteUser::userid -> Just Admin: Delete user by id:
router.delete("/deleteUser::userId", jwtokenExtraction, jwtokenVerification, checkUserPermissions, justAdminGate, getUserById, deleteUserById, (req, res,) => {
  if (!req.userDeletion["UserDeleted"]) {
    res.status(200).json(req.userDeletion);
  } else {
    res.status(204).send("");
  };
  delete req.userDeletion["UserDeleted"];
  delete req.userById["UserFound"];
});
// Exports:
module.exports = router;
