const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
// Middlewares:
const jwtokenGenerator = (req, res, next) => {
  try {
    const payload = req.userInfo[0];
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn : "20min"})
    req.jwtoken = token;
    next()
  } catch {
    const error = new Error();
    error.name = "Token generation error.";
    error.message = "An error has occurred while the jwt was being created.";
    error.status = 500;
    res.send(error);
  }
}
const jwtokenExtraction = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization.split(" ");
    const extractedJWT = authorizationHeader[1];
    req.extractJWT = extractedJWT;
    next();
  } catch {
    const error = new Error();
    error.name = "Token extraction error.";
    error.message = "An error has occurred while extracting the JWToken from the headers. Please verify that the authorization token is included in the headers.";
    error.status = 500;
    res.send(error);
  }
}
const jwtokenVerification = (req, res, next) => {
  const jwTokenAccess = req.extractJWT;
  jwt.verify(jwTokenAccess, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.json(err);
    }
    if (decoded) {
      delete decoded.user_password;
      delete decoded.salt;
      req.jwtokenDecoded = decoded;
      next();
    }
  })
}
// Exports:
module.exports = {
  jwtokenGenerator,
  jwtokenExtraction,
  jwtokenVerification
}