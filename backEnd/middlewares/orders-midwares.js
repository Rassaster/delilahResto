// Import Server Responses:
const {  okReponse200, createdResponse201, forbiddenResponse401, notAuthorizedResponse403, conflictResponse409, internalServerError500 } = require("../serverResponses");
// Import MYSQL Queries functions:
const { newOrder, newRequiredProduct, selectFromTableWhereFieldIsValue, selectAllFromTable, selectProductsJoinCategories, updateTableRegisterWhereIdIsValue, deleteTableRegisterWhereIdIsValue } = require("../sql/queries");
// ***************************************** MIDDLEWARES *********************************************
// -createNewOrder:
const createNewOrder = (req, res, next) => {
  try {
  let producsQuantityStr = ""; //->Variable that holds the products that will be stored in Orders table.
  let totalOrderCost = 0; //->Value of the order's total cost that will be stored in Orders table.
  let orderProductsInfo = {}; //->Object that will hold product name, price, and quantity.
  const productsIds = req.body["products"]; //->Ids of each product in the order.
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // **checkExistanceOfProductsById():**
  ////++1. Checks that all of the required product's IDs exists in the data base.++
  //////++1.1 If not found, configures a 200 status message response.++
  //////++1.2 If found, the operation continues.++
  ////++2. Gets the name and price for each product's ID. Stores the info in an object.++
  ////++3. Determines the required quantity of each product. Creates a new property in prev. object.++
  ////-->  Returns an object with the orderProductsInfo{} and the state of notFoundFlag (T/F)
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  const checkExistanceOfProductsById = async () => {
    let tempProductsArr = [];
    let notFoundFlag = false; //->Variable for knowing when a product ID doesn't exist.
    // *Loop to determine if each product by id exists:*
    for (i = 0; i < productsIds.length; i++) {
      let product = await selectFromTableWhereFieldIsValue("products", "id_product", productsIds[i]);
      // **1. Not found:**
      if (product.length === 0) {
        notFoundFlag = true;
        okReponse200["Message"] = "Product not found.";
        okReponse200["Result"] = `The product with id ${productsIds[i]} doesn't exist. Therefore, the Order was not created.`;
        okReponse200["orderFound"] = false;
        req.createdOrder = okReponse200;
      } else {
        // **2. If found:**
        ////++2.1.Product's name is pushed to a temporal array. Bassically, id is replaced by name:++
        tempProductsArr.push(product[0]["product_name"]);
        ////++2.2.Product's price  required quantity are stored in an object that stores all the products.++
        orderProductsInfo[product[0]["product_name"]] = {"id_product" : product[0]["id_product"]};
        orderProductsInfo[product[0]["product_name"]].product_price = product[0].product_price;
      };
    };
    // **3. While loop that counts the quantity required of each product:**
    ////++When the array is empty, it means that all of the order's products have been counted:++
    while (tempProductsArr.length > 0) {
      let arr = []; //->Transition array in which each product's name is filtered and temporary stored.
      // **Each product's name is filtered and stored in the transition array:**
      arr = tempProductsArr.filter(product => product === tempProductsArr[0]);
      // **New property is created to store the product's quantity in orderProductsInfo{}:**
      //// ++The product's quantity is obtained from the length of the transition array.++
      //// ++The transition array holds the number of repetitions of each product in the order:++
      orderProductsInfo[tempProductsArr[0]].quantity = arr.length;
      // **For loop that "cleans" each product that has already been counted:**
      for (j = 0; j < tempProductsArr.length; j++) {
        if (tempProductsArr[j] === arr[0]) {
          tempProductsArr.splice(j, 1);
        };
      };
    };
    return result = {"orderProductsInfo" : orderProductsInfo, "notFoundFlag": notFoundFlag};
  };
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // *After the promise is fullfiled:**
    ////++1. Checks if any id in the request was not found by evaluating notFoundFlag's value.++
    //////++1.1 If true, returns next() to continue to the next middleware.++
    //////++1.2 If false, continues with the INSERTION process.++
    ////++2. Calculates the order's total cost from the info stored in orderProductsInfo{}.++
    ////++3. Concatenates the products required and quantities in a string ("<quantity> x <product>").++
    ////++4 INSERT the new order register in Orders table.++
    //////++4.1 id_user: Obtained from the info given by the decoded jwToken.++
    //////++4.2 products: Refers to the variable producsQuantityStr (concatenated string of products).++
    //////++4.3 total_cost: Refers to the variable totalOrderCost.++
    //////++4.4 id_paying_method: Obtained from the incoming request body.++
    //////++4.5 Configures the a successful 201 status response..++
    ////++5 INSERT the new products (each one is a new register) in Requested_Products table.++
    //////++5.1 id:order: Obtained the returned array by the INSERT function on Orders (sequelize).++
    //////++5.2 id:product: Obtained from the iteration over each product in orderProductsInfo{}.++
    //////++5.3 product_quantity: Obtained from the iteration over products in orderProductsInfo{}.++
    ////-->  Returns next().
    ////////////////////////////////////////////////////////////////////////////////////////////////////
  checkExistanceOfProductsById()
    .then(async orderProductsInfo => {
      // **1. If statement that evaluates the notFoundFlags' value to determine how to proceed.**
      if (orderProductsInfo.notFoundFlag) {
        return next();
      } else {
      // **2-3. Iteration process over orderProductsInfo{}: calculate total cost and products string:**
      for (product in orderProductsInfo.orderProductsInfo) {
        totalOrderCost += orderProductsInfo.orderProductsInfo[product]["product_price"] * orderProductsInfo.orderProductsInfo[product]["quantity"];
        producsQuantityStr += `${orderProductsInfo.orderProductsInfo[product]["quantity"]} x ${product}, `;
      };
      producsQuantityStr = producsQuantityStr.slice(0, -2);
      // **4. INSERT order into Order table:**
      let createdOrder = await newOrder(req.jwtokenDecoded.id_user, producsQuantityStr, totalOrderCost, req.body.id_paying_method);
      // **4.5 Configuration of status 201 response:**
      let order = {
        id_order: createdOrder[0],
        username: req.jwtokenDecoded.username,
        products: producsQuantityStr,
        total_cost: totalOrderCost
      };
      createdResponse201["Message"] = "Order created successfully.";
      createdResponse201["Result"] = order;
      req.createdOrder = createdResponse201;
      // **5 INSERT required products into Required_Products table:**
      for (product in orderProductsInfo.orderProductsInfo) {
        newRequiredProduct(createdOrder[0], orderProductsInfo.orderProductsInfo[product].id_product, orderProductsInfo.orderProductsInfo[product].quantity);
      };
    };
    return next();
    });
  } catch (error) {
    internalServerError500["Message"] = "An error has occurred while creating the order.";
    res.send(internalServerError500);
  };
};
// -getOrderById
const getOrderById = async (req, res, next) => {
  try {
    const order = await selectFromTableWhereFieldIsValue("orders", "id_order", req.params.orderId);
    if (order.length === 0) {
      okReponse200["Message"] = "Order not found.";
      okReponse200["Result"] = `The order with id ${req.params.orderId} doesn't exist.`;
      okReponse200["OrderFound"] = false;
      req.orderById = okReponse200;
    } else {
      req.orderById = order;
      okReponse200["Message"] = "Order found.";
      okReponse200["Result"] = req.orderById;
      okReponse200["OrderFound"] = true;
      req.orderById = okReponse200;
    };
    return next();
  } catch {
    internalServerError500["Message"] = "An error has occurred while searching for the order by ID.";
    res.status(500).send(internalServerError500);
  };
};
// -getAllOrders
const getAllOrders = async (req, res, next) => {
  try {
    let orders;
    if (req.adminCredentials) {
      orders = await selectAllFromTable("orders");
      okReponse200["Message"] = "List of all the orders obtained.";
      okReponse200["Result"] = orders;
      req.getAllOrders = okReponse200;
    } else if (!req.adminCredentials) {
      orders = await selectFromTableWhereFieldIsValue("orders", "id_user", req.jwtokenDecoded.id_user);
      okReponse200["Message"] = `List of the orders from the user ${req.jwtokenDecoded.username} obtained.`;
      okReponse200["Result"] = orders;
      req.getAllOrders = okReponse200;
    };
    return next();
  } catch (err) {
    console.log(err)
    internalServerError500["Message"] = "An error has occurred while obtaining all the registered users.";
    res.status(500).send(internalServerError500);
  };
};
// -updateOrderStatusById
const updateOrderStatusById = (req, res, next) => {};
// -deleteOrderById
const deleteOrderById = (req, res, next) => {
  try {
    if (!req.orderById["OrderFound"]) {
      okReponse200["Message"] = "Order not found.";
      okReponse200["Result"] = `The order with id ${req.params.orderId} doesn't exist, therefore no deletion can be done.`;
      okReponse200["OrderDeleted"] = false;
      req.orderDeletion = okReponse200;
    } else if (req.orderById["OrderFound"]) {
      const deleteOrder = deleteTableRegisterWhereIdIsValue("orders", "id_order", req.params.orderId);
      okReponse200["OrderDeleted"] = true;
      req.orderDeletion = okReponse200;
    };
    return next();
  } catch (err) {
    console.log(err);
    internalServerError500["Message"] = "An error has occurred while deleting the user by id.";
    res.status(500).send(internalServerError500);
  };
};
// Exports:
module.exports = {
  createNewOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatusById,
  deleteOrderById
}