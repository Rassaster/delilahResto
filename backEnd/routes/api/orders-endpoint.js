const router = require("express").Router();
// Requiring JSON schemas:
const { orderSchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const { jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Security/Credentials middlewares:
const { checkAdminCredentials, justAdminGate } = require("../../middlewares/users-midwares");
// CRUD middlewares:
const { createNewOrder } = require("../../middlewares/orders-midwares");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/orders/new. For either Admins or Users:
router.post("/new", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, validateJSONSchema(orderSchema), (req, res) => {
  res.status(200).json(req.body)
});
// Exports:
module.exports = router;