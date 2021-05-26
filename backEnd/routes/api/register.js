// Requiring "Router" object from "Express":
const router = require("express").Router();
// Requiring SQL-Sequelize queries commands:
const { newUser } = require("../../sql/queries");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/register/register (either as User or Admin):
router.post("/register", (req, res) => {
  const {username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin} = req.body;
  newUser(username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
    .then(result => {
      let successResponse = {
        SuccessMessage: "User created successfully.",
        CreatedUser: req.body,
        id_CreatedUser: result[0]
      };
      res.status(201).json(successResponse);
    })
    .catch(err => {
      let errorResponse = {
        ErrorMessage: err.parent.sqlMessage,
        ErrorDescription: "Please review the API Documentation in relation to the JSON format expected.",
        ReceivedJSON: req.body
      };
      res.status(400).send(errorResponse); 
    })
});
module.exports = router;