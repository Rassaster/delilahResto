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
const { createNewOrder, getOrderById, getAllOrders, deleteOrderById } = require("../../middlewares/orders-midwares");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/orders/new. For either Admins or Users:
router.post("/new", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, validateJSONSchema(orderSchema), createNewOrder, (req, res) => {
  if (req.createdOrder.Status === 200) {
    res.status(200).json(req.createdOrder);
  } else if (req.createdOrder.Status === 201) {
    res.status(201).json(req.createdOrder);
  };
});
// -> /delilahResto/orders/orderId::orderId. Just for Admins:
router.get("/orderId::orderId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, getOrderById, (req, res) => {
  res.status(200).json(req.orderById);
  delete req.orderById["OrderFound"];
});
// -> /delilahResto/orders/allOrders:
//// Admins can access all system's orders, while Users just to their own orders:
router.get("/allOrders", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getAllOrders, (req, res) => {
  res.status(200).json(req.getAllOrders);
});
// -> /delilahResto/orders/deleteOrderById::orderId. Just Admin.
router.delete("/deleteOrderById::orderId",jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, getOrderById, deleteOrderById, (req, res) => {
  if (!req.orderDeletion["OrderDeleted"]) {
    res.status(200).json(req.orderDeletion);
  } else {
    res.status(204).json("");
  };
  delete req.orderById["OrderFound"]
  delete req.orderDeletion["OrderDeleted"];
});

// Exports:
module.exports = router;