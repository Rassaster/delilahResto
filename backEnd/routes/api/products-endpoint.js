const router = require("express").Router();
// Requiring JSON schemas:
const { productSchema } = require("../../schema/schemas");
// ******************** MIDDLEWARES ******************** //
// Schema middlewares:
const { validateJSONSchema } = require("../../middlewares/JSONvalidation");
// JWT middlewares:
const { jwtokenExtraction, jwtokenVerification } = require("../../middlewares/jwtoken");
// Security/Credentials middlewares:
const { checkAdminCredentials, justAdminGate } = require("../../middlewares/users-midwares");
// CRUD middlewares:
const { createNewProduct, getProductById, getProductByName, getAllProducts } = require("../../middlewares/products-midwares");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/products/create Create new product. Just admin:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, validateJSONSchema(productSchema), createNewProduct, (req, res) => {
  if (req.productCreation["Status"] === 201) {
    res.status(201).json(req.productCreation)
  };
});
// -> /delilahResto/products/productId:productId. Just Admin:
router.get("/productId::productId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, getProductById, (req, res) =>{
  res.status(200).json(req.productById);
  delete req.productById["ProductFound"];
});
// -> /delilahResto/products/productName:productName. Just Admin:
router.get("/productName::productName", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, getProductByName, (req, res) => {
  res.status(200).json(req.productByName);
});
// -> /delilahResto/products/allProducts. For both Admins and Users.
router.get("/allProducts", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getAllProducts, (req, res) => {
  res.status(200).json(req.getAllProducts);
});
// Update product by Id:
// Delete product by Id:

// Exports:
module.exports = router;