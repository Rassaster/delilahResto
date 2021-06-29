const router = require("express").Router();
// Requiring JSON schemas:
const { orderSchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //

// ******************** ENDPOINTS ******************** //
// -> /delilahResto/orders/new. For either Admins or Users:
router.post("/new", (req, res) => {

});
// Exports:
module.exports = router;