// Import Server Responses:
const {  okReponse200, createdResponse201, forbiddenResponse401, notAuthorizedResponse403, conflictResponse409, internalServerError500 } = require("../serverResponses");
// Import MYSQL Queries functions:
const { newProduct, selectFromTableWhereFieldIsValue, selectAllFromTable, selectProductsJoinCategories, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries");
// ***************************************** MIDDLEWARES *********************************************
// -createNewOrder:
const createNewOrder = (req, res, next) => {
try {
  res.status(200).send("YOU ARE IN")
} catch {
  
}
}
// Exports:
module.exports = {
  createNewOrder
}