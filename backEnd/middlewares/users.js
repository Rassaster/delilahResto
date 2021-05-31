// Import uuid.v4() from uuid package to create a random UUUI(Universally Unique ID):
const { v4: uuidv4 } = require('uuid');
// Import pbkdf2Sync from crypto to create Derived Key
const { pbkdf2Sync } = require('crypto');

// Validate JSON Schema
// Check if the user exists with the email:
// Chech if the username is available:
// Generate Hashed Password:
const hashPassword = (req, res, next) => {
  try {
    const { user_password } = req.body;
    let uuidSalt = uuidv4();
    let hashedPasswordBuffer = pbkdf2Sync(user_password, uuidSalt, 100000, 32, 'sha512');
    let hashedPasswordHex = hashedPasswordBuffer.toString('hex');
    req.derivedKey = {hashedPasswordHex, uuidSalt}
    next();
  } catch  {
    const error = new Error();
    error.name = "Hash Process Error."
    error.message = "An error has occurred while hashing the user's password.";
    error.status = 500;
    res.send(error);
  }
};
// Verify Password
module.exports = {
  hashPassword
}