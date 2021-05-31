// Requiring "Router" object from "Express":
const router = require("express").Router();
const { findUser } = require("../../sql/queries");
// Middlewares
const userExist =  async (req, res, next) => {
  const { username } = req.body;
  const user = await findUser(username);
  if (user.length === 0) {
    let message = `The user "${username}" doesn't exist.`
    res.status(404).send(message);
  } else {
    next();
  }
}
const getUserInfo = async (req, res, next) => {
  const { username } = req.body;
  const user = await findUser(username);
  req.userInfo = user;
  next();
}


// -> /delilahResto/login (either as User or Admin):
router.post("/login", userExist, getUserInfo, (req, res) => {
  // const { username, user_password } = req.body;
  console.log(req.userInfo);
  res.json(req.userInfo);
})









// Exports:
module.exports = router;