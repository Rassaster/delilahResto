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
const { createNewOrder, getOrderById } = require("../../middlewares/orders-midwares");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/orders/new. For either Admins or Users:
router.post("/new", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, validateJSONSchema(orderSchema), createNewOrder, (req, res) => {
  if (req.createdOrder.Status === 200) {
    res.status(200).json(req.createdOrder)
  } else if (req.createdOrder.Status === 201) {
    res.status(201).json(req.createdOrder)
  }
});
// -> /delilahResto/orders/orderId::orderId. Just for Admins:
router.get("/orderId::orderId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, getOrderById, (req, res) => {
  res.status(200).json(req.orderById);
  delete req.orderById["OrderFound"];
})
// Exports:
module.exports = router;