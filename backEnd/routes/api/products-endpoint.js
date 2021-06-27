const router = require("express").Router();
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const {jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// User middlewares
const { checkAdminCredentials, justAdminGate } = require("../../middlewares/users-midwares");
// Products middlewares:
const { createNewProduct, getProductById } = require("../../middlewares/products-midwares");
// Requiring JSON schemas:
const { productSchema } = require("../../schema/schemas");
// ******************** ENDPOINTS ******************** //
// Create new product. Just admin.
router.post("/", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, validateJSONSchema(productSchema), createNewProduct, (req, res) => {
  if (req.productCreation["Status"] === 201) {
    res.status(201).json(req.productCreation)
  };
});
// Search product by Id. Just admin.
router.get("/productId:productId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, getProductById, (req, res) =>{
  res.status(200).json(req.productById);
  delete req.productById["ProductFound"];
});
// Exports:
module.exports = router;