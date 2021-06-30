// Import Server Responses:
const {  okReponse200, createdResponse201, forbiddenResponse401, notAuthorizedResponse403, conflictResponse409, internalServerError500 } = require("../serverResponses");
// Import MYSQL Queries functions:
const { newOrder, newRequiredProduct, selectFromTableWhereFieldIsValue, selectAllFromTable, selectProductsJoinCategories, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries");
// ***************************************** MIDDLEWARES *********************************************
// -createNewOrder:
const createNewOrder = (req, res, next) => {
  try {
  let producsQuantityStr = "";
  let totalOrderCost = 0;
  let orderProductsInfo = {};
  const productsIds = req.body["products"];
  const checkExistanceOfProductsById = async () => {
    let tempProductsArr = [];
    for (i = 0; i < productsIds.length; i++) {
      let product = await selectFromTableWhereFieldIsValue("products", "id_product", productsIds[i]);
      if (product.length === 0) {
        okReponse200["Message"] = "Product not found.";
        okReponse200["Result"] = `The product with id ${req.params.productId} doesn't exist.`;
        okReponse200["ProductFound"] = false;
        req.productById = okReponse200;
        next();
        break;
      } else {
        tempProductsArr.push(product[0]["product_name"]);
        orderProductsInfo[product[0]["product_name"]] = {"id_product" : product[0]["id_product"]};
        orderProductsInfo[product[0]["product_name"]].product_price = product[0].product_price;
      }
    }
    while (tempProductsArr.length > 0) {
      let arr = [];
      arr = tempProductsArr.filter(product => product === tempProductsArr[0]);
      orderProductsInfo[tempProductsArr[0]].amount = arr.length;
      for (j = 0; j < tempProductsArr.length; j++) {
        if (tempProductsArr[j] === arr[0]) {
          if ((tempProductsArr.splice(j, 1)).length !== 0) {
            j--;
          };
        };
      };
    };
    return orderProductsInfo;
  };
  checkExistanceOfProductsById()
    .then(async orderProductsInfo => {
      for (product in orderProductsInfo) {
        totalOrderCost += orderProductsInfo[product]["product_price"] * orderProductsInfo[product]["amount"];
        producsQuantityStr += `${orderProductsInfo[product]["amount"]} x ${product}, `
      }
      producsQuantityStr = producsQuantityStr.slice(0, -2);
      let createdOrder = await newOrder(req.jwtokenDecoded.id_user, producsQuantityStr, totalOrderCost, req.body.id_paying_method);
      let order = {
        id_order: createdOrder[0],
        username: req.jwtokenDecoded.username,
        products: producsQuantityStr,
        total_cost: totalOrderCost
      }
      createdResponse201["Message"] = "Order created successfully.";
      createdResponse201["Result"] = order;
      req.createdOrder = createdResponse201;
      for (product in orderProductsInfo) {
        newRequiredProduct(createdOrder[0], orderProductsInfo[product].id_product, orderProductsInfo[product].amount)
      }
      next();
    });
  } catch (error) {
    internalServerError500["Message"] = "An error has occurred while creating the order.";
    res.send(internalServerError500);
  }
}
// Exports:
module.exports = {
  createNewOrder
}