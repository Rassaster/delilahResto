// Import Server Responses:
const {  okReponse200, createdResponse201, forbiddenResponse401, notAuthorizedResponse403, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newProduct, selectFromTableWhereFieldIsValue, selectAllFromTable, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// -createNewProduct
const createNewProduct = async (req, res, next) => {
  try {
    const { product_name, id_product_category, product_price } = req.body;
    const createdProduct = await newProduct(product_name, id_product_category, product_price); 
    createdResponse201["Message"] = "Product created successfully.";
    const newCreatedProduct = {
      id_product: createdProduct[0],
      product_name: req.body.product_name,
      id_product_category: req.body.id_product_category,
      product_price: req.body.product_price
    }
    createdResponse201["Result"] = newCreatedProduct;
    req.productCreation = createdResponse201;
    next()
  } catch {
    internalServerError500["Message"] = error.parent.sqlMessage;
    internalServerError500["Description"] = "Please review the API Documentation in relation to the JSON format expected.";
    internalServerError500["ReceivedQueryJSON"] = req.body;
    res.send(internalServerError500);
    delete internalServerError500["Description"];
    delete internalServerError500["ReceivedQueryJSON"];
  }
}
// -getProductByName
const getProductByName = (req, res, next) => {}
// -getProductById
const getProductById = (req, res, next) => {}
// -getAllProducts
const getAllProducts = (req, res, next) => {}
// -updateProductById
const updateProductById = (req, res, next) => {}
// -deleteProductById
const deleteProductById = (req, res, next) => {}
// Exports:
module.exports = {
  createNewProduct,
  getProductByName,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById
}