// Import uuid.v4() from uuid package to create a random UUUI(Universally Unique ID):
const { v4: uuidv4 } = require('uuid');
// Import pbkdf2Sync from crypto to create Derived Key:
const { pbkdf2Sync } = require('crypto');
const { newUser, selectFromTableWhereFieldIsValue, selectAllFromTable, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
const {  okReponse200, createdResponse201, forbiddenResponse401, notAuthorizedResponse403, conflictResponse409 } = require("../serverResponses")
// ***************************************** MIDDLEWARES *********************************************
// Check if the email is already register:
const checkEmailRegistration =  async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await selectFromTableWhereFieldIsValue("users", "email", email);
    if ((user.length === 0) || (user[0]["email"] === email)) {
      next();
    } else {
      console.log(user[0]["email"])
      conflictResponse409["Message"] = `The email '${email}' is already registered. Please enter a new email.`;
      res.status(409).json(conflictResponse409);
    }
  } catch {
    const error = new Error();
    error.name = "Checking email existance error."
    error.message = "An error has occurred while checking if the email is already registered.";
    error.status = 500;
    ress.send(error);
  }
}
// Check if the username is available:
const usernameAvailability = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await selectFromTableWhereFieldIsValue("users", "username", username);
    if ((user.length === 0) || user[0]["username"] === username) {
      next();
    } else if (user[0]["username"] === username) {
      next();
    } else {
      conflictResponse409["Message"] = `The desired username (${username}) is not available. Please choose another one.`;
      res.status(409).json(conflictResponse409);
    }
  } catch {
    const error = new Error();
    error.name = "Checking username availability error."
    error.message = "An error has occurred while checking the availability of the desired username.";
    error.status = 500;
    res.status(500).send(error);
  }
}
// Generate Hashed Password:
const hashPassword = (req, res, next) => {
  try {
    const { user_password } = req.body;
    let uuidSalt = uuidv4();
    let hashedPasswordBuffer = pbkdf2Sync(user_password, uuidSalt, 100000, 32, 'sha512');
    let hashedPasswordHex = hashedPasswordBuffer.toString('hex');
    req.derivedKey = {hashedPasswordHex, uuidSalt}
    next();
  } catch {
    const error = new Error();
    error.name = "Hash Process Error."
    error.message = "An error has occurred while hashing the user's password.";
    error.status = 500;
    res.status(500).send(error);
  }
};
// Register a new user:
const createNewUser = async (req,res, next) => {
  try {
    const {hashedPasswordHex, uuidSalt} = req.derivedKey;
    const {username, fullname, email, cellphone_number, delivery_address, is_admin} = req.body;
    const newRegister = await newUser(username, fullname, email, cellphone_number, delivery_address, hashedPasswordHex, uuidSalt, is_admin);
    const createdUser = {
      username: req.body.username,
      email: req.body.email,
      cellphone_number: req.body.cellphone_number,
      is_admin: req.body.is_admin,
      user_id: newRegister[0]
    }
    createdResponse201["Message"] = "User created successfully."
    createdResponse201["Result"] = createdUser
    req.userCreation = createdResponse201;
    next()
  } catch (error) {
    const errorResponse = {
      ErrorMessage: error.parent.sqlMessage,
      ErrorDescription: "Please review the API Documentation in relation to the JSON format expected",
      ReceivedQueryJSON: req.body
    };
    res.status(500).send(errorResponse);
    return;
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Check if the user exists with the email:
const userExistanceCheckByEmailLogin =  async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await selectFromTableWhereFieldIsValue("users", "email", email);
    if (user.length === 0) {
      okReponse200["Message"] = "No registered user."
      okReponse200["Result"] = `The email '${email}' has not been registered yet. Please proceed to register in our system as a new user.`;
      res.status(200).json(okReponse200);
      console.log(user)
      return;
    } else {
      req.userInfo = user;
      next();
    }
  } catch {
    const error = new Error();
    error.name = "Checking user existance error."
    error.message = "An error has occurred while checking the existance of the user.";
    error.status = 500;
    res.status(500).send(error);
  }
}
// Verify Password
const verifyPassword = (req, res, next) => {
  try {
    const submittedPassword = req.body.user_password;
    const storedSalt = req.userInfo[0].salt;
    let hashedSubmittedPasswordBuffer = pbkdf2Sync(submittedPassword, storedSalt, 100000, 32, 'sha512');
    let hashedSubmittedPasswordHex = hashedSubmittedPasswordBuffer.toString('hex'); 
    const storedHashedPassword = req.userInfo[0].user_password;
    if (hashedSubmittedPasswordHex !== storedHashedPassword) {
      forbiddenResponse401["Message"] = "Incorrect password or email.";
      res.status(401).send(forbiddenResponse401)
      return;
    } else {
      okReponse200["Message"] = "User successfully authenticated.";
      delete okReponse200["Result"];
      req.userAuthentication = okReponse200;
      next()
    }
  } catch {
    const error = new Error();
    error.name = "Authentication error."
    error.message = "An error has occurred in the authentication process.";
    error.status = 500;
    res.status(500).send(error);
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Check if the user has Admin credentials:
const checkAdminCredentials = (req, res, next) => {
  try {
    if (req.jwtokenDecoded["is_admin"] === "T") {
      req.adminCredentials = true;
      next();
    };
    if (req.jwtokenDecoded["is_admin"] !== "T") {
      req.adminCredentials = false;
      next();
    };
  } catch {
    const error = new Error();
    error.name = "Credentials verification error."
    error.message = "An error has occurred while verifying the user's credentials.";
    error.status = 500;
    res.status(500).send(error);
  }
}
// Just Admin Gate:
const justAdminGate = (req, res, next) => {
  try {
    if (req.adminCredentials === true) {
      next();
    } else {
      res.status(403).json(notAuthorizedResponse403)
    }
  } catch {
    const error = new Error();
    error.name = "Admin verification error."
    error.message = "An error has occurred while verifying if the user has Admin credentials.";
    error.status = 500;
    res.status(500).send(error);
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Admin: Get user by id | Client: Get self user by "i":
const getUserById = async (req, res, next) => {
  try {
    let user;
    // Evaluate user's credentials to execute the search:
    if ((!req.adminCredentials || req.adminCredentials) && (req.params.userId === "i")) {
      user = await selectFromTableWhereFieldIsValue("users", "id_user", req.jwtokenDecoded["id_user"]);
    } else if (req.adminCredentials) {
      user = await selectFromTableWhereFieldIsValue("users", "id_user", req.params.userId);
    } else {
      req.userById = notAuthorizedResponse403;
      next();
      return;
    };
    // Validate if the user exists and prepare the appropiate response:
    if (user.length === 0) {
      okReponse200["Message"] = "User not found.";
      okReponse200["Result"] = `The user with id ${req.params.userId} doesn't exist.`;
      okReponse200["UserFound"] = false;
      req.userById = okReponse200;
    } else {
      req.userFound = user;
      delete req.userFound[0].id_user;
      delete req.userFound[0].user_password;
      delete req.userFound[0].salt;
      okReponse200["Message"] = "User found.";
      okReponse200["Result"] = req.userFound;
      okReponse200["UserFound"] = true;
      req.userById = okReponse200;
    };
    next();
  } catch {
    const error = new Error();
    error.name = "Finding user by ID error."
    error.message = "An error has occurred while searching for the user by ID.";
    error.status = 500;
    res.status(500).send(error);
  }
} 
// Just Admin: Get the list of all of the registered users:
const getAllUsers = async (req, res, next) => {
  try {
    let users;
    if (req.adminCredentials) {
      users = await selectAllFromTable("users");
      okReponse200["Message"] = "List of all registered users obtained.";
      okReponse200["Result"] = users;
      req.getAllUsers = okReponse200;
    } else if (!req.adminCredentials) {
      req.getAllUsers = notAuthorizedResponse403;
    }
    next()
  } catch {
    const error = new Error();
    error.name = "Getting all the registered users error."
    error.message = "An error has occurred while obtaining all the registered users.";
    error.status = 500;
    res.status(500).send(error);
  }
}
// Just Admin: Get user by username:
const getUserByUsername = async (req, res, next) => {
  try {
    let user;
    if (req.adminCredentials) {
      user = await selectFromTableWhereFieldIsValue("users", "username", req.body["username"]);
      if (user.length === 0) {
        okReponse200["Message"] = "User not found."
        okReponse200["Result"] = `A user with the username '${req.body["username"]}' doesn't exist.`
        req.getUserByUsername = okReponse200;
      } else {
        okReponse200["Message"] = "User found."
        okReponse200["Result"] = user;
        req.getUserByUsername = okReponse200;
      }
    } else if (!req.adminCredentials) {
      req.getUserByUsername = notAuthorizedResponse403;
    }
    next();
  } catch {
    const error = new Error();
    error.name = "Getting user by username error."
    error.message = "An error has occurred while obtaining the register by username.";
    error.status = 500;
    res.status(500).send(error);
  }
}
// Just Admin: Get user by email:
const getUserByEmail = async (req, res, next) => {
  try {
    let user;
    if (req.adminCredentials) {
      user = await selectFromTableWhereFieldIsValue("users", "email", req.body["email"]);
      if (user.length === 0) {
        okReponse200["Message"] = "User not found."
        okReponse200["Result"] = `A user with the email '${req.body["email"]}' doesn't exist.`
        req.getUserByEmail = okReponse200;
      } else {
        okReponse200["Message"] = "User found."
        okReponse200["Result"] = user;
        req.getUserByEmail = okReponse200;
      }
    } else if (!req.adminCredentials) {
      req.getUserByEmail = notAuthorizedResponse403;
    }
    next();
  } catch {
    const error = new Error();
    error.name = "Getting user by username error."
    error.message = "An error has occurred while obtaining the register by username.";
    error.status = 500;
    res.status(500).send(error);
  }
}
// Just Admin: Update any user by Id.
const updateUserById = async (req, res, next) => {
  try {
    // If user is NOT found, doesn't exist, the operation is stoped:
    if (!req.userById["UserFound"]) {
      okReponse200["Message"] = "User not found.";
      okReponse200["Result"] = `The user with id ${req.params.userId} doesn't exist, therefore,there   is no information to be updated. Please proceed to the register endopoint.`;
      okReponse200["UserUpdated"] = false;
      req.updateUserById = okReponse200;
    }
    // If the user IS found, the UPDATE query is executed:
    if (req.userById["UserFound"]) {
      // The UPDATE query returns an array. 
      const user = await updateTableRegisterWhereIdIsValue("users", req.body, "id_user", req.params.userId);
      // // If array[1] === 0 -> No information was updated.
      if (user[1] === 0) {
        conflictResponse409["Message"] = "No information was updated.";
        conflictResponse409["Result"] = `The information of the user with id ${req.params.userId} did not suffer any changes. The data that was sent matches exactly with the one already registered.`;
        conflictResponse409["UserUpdated"] = false;
        req.updateUserById = conflictResponse409;
        // // If array[1] === 1 -> Changes have been received and updated.
      } else if (user[1] === 1) {
        okReponse200["Message"] = "User information updated with success.";
        okReponse200["Result"] = req.body;
        okReponse200["UserUpdated"] = true;
        req.updateUserById = okReponse200;
      }
    }
  } catch {
    const error = new Error();
    error.name = "Updating user by id error."
    error.message = "An error has occurred while updating the user information by id.";
    error.status = 500;
    res.status(500).send(error);
  }
  next()
}
// Just Admin: Delete any user by Id.
const deleteUserById = (req, res, next) => {
  if (!req.userById["UserFound"]) {
    okReponse200["Message"] = "User not found.";
    okReponse200["Result"] = `The user with id ${req.params.userId} doesn't exist, therefore no deletion can be done.`;
    okReponse200["UserDeleted"] = false;
    req.userDeletion = okReponse200;
  } else if (req.userById["UserFound"]) {
    const deleteUser = deleteTableRegisterWhereIdIsValue("users", "id_user", req.params.userId);
    okReponse200["UserDeleted"] = true;
    req.userDeletion = okReponse200;
  }
  next();
}

// -createNewProduct
// -getProductByName
// -getProductById
// -getAllProducts
// -updateProductById
// -deleteProductById

// -createNewOrder
// -getOrderById
// -getAllOrders
// -updateOrderById
// -deleteOrderById
// Exports:
module.exports = {
  checkEmailRegistration,
  usernameAvailability,
  hashPassword,
  createNewUser,
  // 
  userExistanceCheckByEmailLogin,
  verifyPassword,
  // 
  checkAdminCredentials,
  justAdminGate,
  getUserById,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  updateUserById,
  deleteUserById
}
