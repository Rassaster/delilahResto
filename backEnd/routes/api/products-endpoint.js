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
const { createNewProduct, getProductById, getProductByName, getAllProducts, updateProductById, deleteProductById } = require("../../middlewares/products-midwares");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/products/create Create new product. Just admin:
router.post("/create", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, validateJSONSchema(productSchema), createNewProduct, (req, res) => {
  if (req.productCreation["Status"] === 201) {
    res.status(201).json(req.productCreation)
  };
});
// -> /delilahResto/products/productId:productId. Just Admin:
router.get("/productId::productId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getProductById, (req, res) =>{
  res.status(200).json(req.productById);
  delete req.productById["ProductFound"];
});
// -> /delilahResto/products/productName:productName. Just Admin:
router.get("/productName::productName", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getProductByName, (req, res) => {
  res.status(200).json(req.productByName);
  delete req.productById["ProductFound"];
});
// -> /delilahResto/products/allProducts. For both Admins and Users.
router.get("/allProducts", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, getAllProducts, (req, res) => {
  res.status(200).json(req.getAllProducts);
  delete req.productById["ProductFound"];
});
// Update product by Id:
// -> /delilahResto/products/updateProductId::productId. Just Admin:
router.put("/updateProductId::productId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, getProductById, validateJSONSchema(productSchema), updateProductById, (req, res) => {
  if (!req.updateProductByID["ProductFound"]) {
    res.status(200).json(req.updateProductByID);
  } else if (!req.updateProductByID["ProductUpdated"]) {
    res.status(409).json(req.updateProductByID);
  } else if (req.updateProductByID["ProductUpdated"]) {
    res.status(204).json(req.updateProductByID);
  };
  delete req.productById["ProductFound"];
  delete req.updateProductByID["ProductUpdated"];
});
// -> /delilahResto/products/deleteProductId::productId. Just Admin:
router.delete("/deleteProductId::productId", jwtokenExtraction, jwtokenVerification, checkAdminCredentials, justAdminGate, getProductById, deleteProductById, (req, res) => {
  if (!req.productDeletion["ProductDeleted"]) {
    res.status(200).json(req.productDeletion);
  } else {
    res.status(204).send("");
  };
  delete req.productById["ProductFound"];
  delete req.productDeletion["ProductDeleted"];
});

// Exports:
module.exports = router;