// Import uuid.v4() from uuid package to create a random UUUI(Universally Unique ID):
const { v4: uuidv4 } = require('uuid');
// Import pbkdf2Sync from crypto to create Derived Key:
const { pbkdf2Sync } = require('crypto');
const { newUser, selectFromTableWhereFieldIsValue, selectAllFromTable } = require("../sql/queries"); 
// *************************************************************************************************
// *************************************************************************************************
// **************************************** MIDDLEWARES ********************************************
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Check if the email is already register:
const checkEmailRegistration =  async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await selectFromTableWhereFieldIsValue("users", "email", email);
    if (user.length === 0) {
      next();
    } else {
      let message = `The email ${email} is already registered. Please enter a new email.`;
      res.status(409).send(message);
    }
  } catch {
    const error = new Error();
    error.name = "Checking email existance error."
    error.message = "An error has occurred while checking if the email is already registered.";
    error.status = 500;
    res.send(error);
  }
}
// Check if the username is available:
const usernameAvailability = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await selectFromTableWhereFieldIsValue("users", "username", username);
    if (user.length === 0) {
      next();
    } else {
      let message = `The desired username (${username}) is not available. Please choose another one.`;
      res.status(409).send(message);
    }
  } catch {
    const error = new Error();
    error.name = "Checking username availability error."
    error.message = "An error has occurred while checking the availability of the desired username.";
    error.status = 500;
    res.send(error);
  }
}
// Check if the user exists with the email:
const userExistanceCheck =  async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await selectFromTableWhereFieldIsValue("users", "email", email);
    if (user.length === 0) {
      let message = `The email "${email}" has not been registered yet.`
      res.status(404).send(message);
    } else {
      req.userInfo = user;
      next();
    }
  } catch {
    const error = new Error();
    error.name = "Checking user existance error."
    error.message = "An error has occurred while checking the existance of the user.";
    error.status = 500;
    res.send(error);
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
    res.send(error);
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
    req.createdUser = createdUser;
    next()
  } catch (error) {
    const errorResponse = {
      ErrorMessage: error.parent.sqlMessage,
      ErrorDescription: "Please review the API Documentation in relation to the JSON format expected",
      ReceivedQueryJSON: req.body
    };
    res.status(400).send(errorResponse);
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Verify Password
const verifyPassword = (req, res, next) => {
  try {
    const submittedPassword = req.body.user_password;
    const storedSalt = req.userInfo[0].salt;
    let hashedSubmittedPasswordBuffer = pbkdf2Sync(submittedPassword, storedSalt, 100000, 32, 'sha512');
    let hashedSubmittedPasswordHex = hashedSubmittedPasswordBuffer.toString('hex'); 
    const storedHashedPassword = req.userInfo[0].user_password;
    if (hashedSubmittedPasswordHex !== storedHashedPassword) {
      const message = "Incorrect password or email."
      res.status(401).send(message)
    } else {
      next()
    }
  } catch {
    const error = new Error();
    error.name = "Authentication error."
    error.message = "An error has occurred in the authentication process.";
    error.status = 500;
    res.send(error);
  }
}
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
    res.send(error);
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Admin: Get user by id | Client: Get self user by "i":
const getUserById = async (req, res, next) => {
  try {
    let user;
    // Determine user's credentials to execute the search:
    if ((!req.adminCredentials) && (req.params.userId === "i")) {
      user = await selectFromTableWhereFieldIsValue("users", "id_user", req.jwtokenDecoded["id_user"]);
    } else if ((req.adminCredentials) && (req.params.userId === "i")) { 
      user = await selectFromTableWhereFieldIsValue("users", "id_user", req.jwtokenDecoded["id_user"]);
    } else if (req.adminCredentials) {
      user = await selectFromTableWhereFieldIsValue("users", "id_user", req.params.userId);
    } else {
      const notAuthorizedResponse = {
        message: "The user is not authorized to complete this request. Only an Administrator has the authorization."
      };
      res.status(401).json(notAuthorizedResponse);
    };
    // Validate if the user and prepare the appropiate response:
    if (user.length === 0) {
      const userNotFoundResponse = {
        result: "User not found.",
        message: `The user with id ${req.params.userId} doesn't exist.`
      };
      req.userById = userNotFoundResponse;
    } else {
      req.userById = user;
      delete req.userById[0].id_user;
      delete req.userById[0].user_password;
      delete req.userById[0].salt;
    };
    next();
  } catch {
    const error = new Error();
    error.name = "Finding user by ID error."
    error.message = "An error has occurred while searching for the user by ID.";
    error.status = 500;
    res.send(error);
  }
} 
// -getAllUsers
// -getUserByEmail
// -getUserByUsername
// -updateUserById
// -deleteUserById

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
  userExistanceCheck,
  verifyPassword,
  checkAdminCredentials,
  getUserById
}
