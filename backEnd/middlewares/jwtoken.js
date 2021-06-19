const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const jwtokenGenerator = (req, res, next) => {
  try {
    delete req.userInfo[0].id_user;
    delete req.userInfo[0].user_password;
    delete req.userInfo[0].salt;
    delete req.userInfo[0].cellphone_number;
    delete req.userInfo[0].delivery_address;
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
  const verification = jwt.verify(jwTokenAccess, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.json(err);
    }
    if (decoded) {
      req.jwtokenDecoded = decoded;
      next();
    }
  })
}

module.exports = {
  jwtokenGenerator,
  jwtokenExtraction,
  jwtokenVerification
}