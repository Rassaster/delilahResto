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
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn : "2min"})
    req.jwtoken = token;
    next()
  } catch {
    const error = new Error();
    error.name = "Token generation error."
    error.message = "An error has occurred while the jwt was being created.";
    error.status = 500;
    res.send(error);
  }
}
const jwtokenVerification = (req, res, next) => {
    const token = req.jwtoken
    const verification = jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json(err);
      }
      if (decoded) {
        console.log(decoded)
        next();
      }
    })
}

module.exports = {
  jwtokenGenerator,
  jwtokenVerification
}