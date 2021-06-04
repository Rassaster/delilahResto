const router = require("express").Router();
// Requiring middlewares:
const { checkEmailRegistration, usernameAvailability, hashPassword } = require("../../middlewares/users");
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// Requiring SQL-Sequelize queries commands:
const { newUser } = require("../../sql/queries");
// Requirin JSON schemas:
const {registerSchema} = require("../../schema/schemas");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/register/register (either as User or Admin):
router.post("/register", validateJSONSchema(registerSchema), checkEmailRegistration, usernameAvailability, hashPassword, async (req, res) => {
  try {
    const {hashedPasswordHex, uuidSalt} = req.derivedKey;
    const {username, fullname, email, cellphone_number, delivery_address, is_admin} = req.body;
    const newRegister = await newUser(username, fullname, email, cellphone_number, delivery_address, hashedPasswordHex, uuidSalt, is_admin);
    const successResponse = {
      SuccessMessage: "User created successfully.",
      CreatedUser: {
        username: req.body.username,
        email: req.body.email,
        cellphone_number: req.body.cellphone_number,
        is_admin: req.body.is_admin,
        user_id: newRegister[0]
      }
    }
    res.status(201).json(successResponse)
  } catch (error) {
    const errorResponse = {
      ErrorMessage: error.parent.sqlMessage,
      ErrorDescription: "Please review the API Documentation in relation to the JSON format expected",
      ReceivedQueryJSON: req.body
    };
    res.status(400).send(errorResponse);
  }
});
module.exports = router;