// Import Server Responses:
const {  okReponse200, createdResponse201, forbiddenResponse401, notAuthorizedResponse403, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newProduct, selectFromTableWhereFieldIsValue, selectAllFromTable, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// -createNewProduct
const createNewProduct = (req, res, next) => {}
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