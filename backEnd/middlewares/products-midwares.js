// Import Server Responses:
const {  okReponse200, createdResponse201, forbiddenResponse401, notAuthorizedResponse403, conflictResponse409, internalServerError500 } = require("../serverResponses")
// Import MYSQL Queries functions:
const { newProduct, selectFromTableWhereFieldIsValue, selectAllFromTable, selectProductsJoinCategories, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries"); 
// ***************************************** MIDDLEWARES *********************************************
// -createNewProduct:
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
// -getProductById:
const getProductById = async (req, res, next) => {
  try {
    const product = await selectFromTableWhereFieldIsValue("products", "id_product", req.params.productId)
    if (product.length === 0) {
      okReponse200["Message"] = "Product not found.";
      okReponse200["Result"] = `The product with id ${req.params.productId} doesn't exist.`;
      okReponse200["ProductFound"] = false;
      req.productById = okReponse200;
    } else {
      req.productFound = product;
      okReponse200["Message"] = "Product found.";
      okReponse200["Result"] = req.productFound;
      okReponse200["ProductFound"] = true;
      req.productById = okReponse200;
    };
    next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the product by ID.";
    res.send(internalServerError500)
  }
}
// -getProductByName:
const getProductByName = async (req, res, next) => {
  try {
    const product = await selectFromTableWhereFieldIsValue("products", "product_name", req.params.productName);
    if (product.length === 0) {
      okReponse200["Message"] = "Product not found.";
      okReponse200["Result"] = `The product '${req.params.productName}' doesn't exist.`;
      okReponse200["ProductFound"] = false;
      req.productByName = okReponse200;
    } else {
      req.productFound = product;
      okReponse200["Message"] = "Product found.";
      okReponse200["Result"] = req.productFound;
      okReponse200["ProductFound"] = true;
      req.productByName = okReponse200;
    }
    next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the product by it's name.";
    res.send(internalServerError500)
  }
}
// -getAllProducts (JOIN with Products_Categories):
const getAllProducts = async (req, res, next) => {
  try {
    const productsList = await selectProductsJoinCategories();
    okReponse200["Message"] = "List of all registered users obtained.";
    okReponse200["Result"] = productsList;
    req.getAllProducts = okReponse200
    next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered products.";
    res.send(internalServerError500);
  }
}
// -updateProductById
const updateProductById = async (req, res, next) => {
  try {
    // If product is NOT found, doesn't exist, the operation is stoped:
    if (!req.productById["ProductFound"]) {
      okReponse200["Message"] = "Product not found.";
      okReponse200["Result"] = `The product with id ${req.params.productId} doesn't exist, therefore,there is no information to be updated. Please proceed to the product creation endopoint.`;
      okReponse200["ProductFound"] = false;
      req.updateProductByID = okReponse200;
    }
    // If the product IS found, the UPDATE query is executed:
    if (req.productById["ProductFound"]) {
      // The UPDATE query returns an array. 
      const product = await updateTableRegisterWhereIdIsValue("products", req.body, "id_product", req.params.productId);
      // // If array[1] === 0 -> No information was updated.
      if (product[1] === 0) {
        conflictResponse409["Message"] = "No information was updated.";
        conflictResponse409["Result"] = `The information of the product with id ${req.params.productId} did not suffer any changes. The data that was sent matches exactly with the one already registered.`;
        conflictResponse409["ProductUpdated"] = false;
        req.updateProductByID = conflictResponse409;
        // // If array[1] === 1 -> Changes have been received and updated.
      } else if (product[1] === 1) {
        okReponse200["Message"] = "Product information updated with success.";
        okReponse200["Result"] = req.body;
        okReponse200["ProductUpdated"] = true;
        req.updateProductByID = okReponse200;
      }
    }
    next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while updating the product's information by id.";
    res.send(internalServerError500);
  }
};
// -deleteProductById
const deleteProductById = (req, res, next) => {
  try {
    if (!req.productById["ProductFound"]) {
      okReponse200["Message"] = "Product not found.";
      okReponse200["Result"] = `The product with id ${req.params.productId} doesn't exist, therefore no deletion can be done.`;
      okReponse200["ProductDeleted"] = false;
      req.productDeletion = okReponse200;
    } else if (req.productById["ProductFound"]) {
      const deleteProduct = deleteTableRegisterWhereIdIsValue("products", "id_product", req.params.productId);
      okReponse200["ProductDeleted"] = true;
      req.productDeletion = okReponse200;
    }
    next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while deleting the product by id.";
    res.send(internalServerError500);
  };
};
// Exports:
module.exports = {
  createNewProduct,
  getProductById,
  getProductByName,
  getAllProducts,
  updateProductById,
  deleteProductById
}