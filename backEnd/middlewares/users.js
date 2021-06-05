// Import uuid.v4() from uuid package to create a random UUUI(Universally Unique ID):
const { v4: uuidv4 } = require('uuid');
// Import pbkdf2Sync from crypto to create Derived Key:
const { pbkdf2Sync } = require('crypto');
const { getUserByEmail, getUserByUsername } = require("../sql/queries"); 
// Check if the username is available:
const usernameAvailability = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await getUserByUsername(username);
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
// Check if the email is already register:
const checkEmailRegistration =  async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
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
// Check if the user exists with the email:
const userExistanceCheck =  async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
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

// Exports:
module.exports = {
  checkEmailRegistration,
  usernameAvailability,
  userExistanceCheck,
  hashPassword,
  verifyPassword
}