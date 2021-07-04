// Requiring Data Base connection's module from dbConnect.js:
const sequelize = require("../dataBase/dbConnect");
// ***** SQL INSERT QUERIES *****
// INSERT create new user in Users:
const newUser =  (register_date, username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin) => {
  return sequelize.query("INSERT INTO users(register_date, username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", {
    replacements: [register_date ,username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create new product in Products:
const newProduct =  (product_name, id_product_category, product_price) => {
  return sequelize.query("INSERT INTO products(product_name, id_product_category, product_price) VALUES(?, ?, ?)", {
    replacements: [product_name, id_product_category, product_price],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create new order in Orders:
const newOrder =  (last_update_date, id_user, products, totalOrderCost, id_paying_method) => {
  return sequelize.query("INSERT INTO orders(last_update_date, id_user, products, total_cost, id_paying_method) VALUES(?, ?, ?, ?, ?)", {
    replacements: [last_update_date, id_user, products, totalOrderCost, id_paying_method],
    type: sequelize.QueryTypes.INSERT
  });
};
// INSERT create register in required_products:
const newRequiredProduct =  (id_order, id_product, product_quantity) => {
  return sequelize.query("INSERT INTO required_products(id_order, id_product, product_quantity) VALUES(?, ?, ?)", {
    replacements: [id_order, id_product, product_quantity],
    type: sequelize.QueryTypes.INSERT
  });
};
// ***** SQL SELECT QUERIES *****
// SELECT * FROM ("table");
const selectAllFromTable = (table) => {
  return sequelize.query(`SELECT * FROM ${table}`, {
    type: sequelize.QueryTypes.SELECT
  });
}
// SELECT * FROM ("table") WHERE ("field") = ?;
const selectFromTableWhereFieldIsValue = (table, field, value) => {
  return sequelize.query(`SELECT * FROM ${table} WHERE ${field} = ?`, {
    replacements: [value],
    type: sequelize.QueryTypes.SELECT
  });
};
// SELECT p.id_product, p.product_name, pc.category_name, p.product_price FROM Products AS p JOIN Products_Categories as pc ON p.id_product_category=pc.id_product_categoryORDER BY p.id_product;
const selectProductsJoinCategories = () => {
  return sequelize.query("SELECT p.id_product, p.product_name, pc.category_name, p.product_price FROM Products AS p JOIN Products_Categories as pc ON p.id_product_category=pc.id_product_category ORDER BY p.id_product", {
    type: sequelize.QueryTypes.SELECT
  });
};
const selectAllOrdersJoined = () => {
  return sequelize.query("SELECT o.id_order, u.username, o.last_update_date, os.status_description, o.products, pm.method_description, o.total_cost FROM Orders as o JOIN Users as u ON o.id_user = u.id_user JOIN Orders_Status as os ON o.id_order_status = os.id_order_status JOIN Paying_Methods as pm ON o.id_paying_method = pm.id_paying_method ORDER BY o.id_order;", {type: sequelize.QueryTypes.SELECT})
};
const selectAllOrdersJoinedByUserId = (userId) => {
  return sequelize.query("SELECT o.id_order, u.username, o.last_update_date, os.status_description, o.products, pm.method_description, o.total_cost FROM Orders as o JOIN Users as u ON o.id_user = u.id_user JOIN Orders_Status as os ON o.id_order_status = os.id_order_status JOIN Paying_Methods as pm ON o.id_paying_method = pm.id_paying_method WHERE o.id_user = ? ORDER BY o.id_order;", {
    replacements: [ userId ],
    type: sequelize.QueryTypes.SELECT
  })
};
// ***** SQL UPDATE QUERIES ***** 
const updateTableRegisterWhereIdIsValue = (table, updatedJsonData, field, value) => {
  let obj = updatedJsonData;
  let tempArray = [];
  for (let key in obj) {
    tempArray.push(`${key} = '${obj[key]}'`);
  } 
  let sqlSetStatement =tempArray.join(", ")
  return sequelize.query(`UPDATE ${table} SET ${sqlSetStatement} WHERE ${field} = ?`, {
    replacements: [value],
    type: sequelize.QueryTypes.UPDATE
  })
}
// ***** SQL DELETE QUERIES ***** 
const deleteTableRegisterWhereIdIsValue = (table, field, value) => {
  return sequelize.query(`DELETE FROM ${table} WHERE ${field} = ?`, {
    replacements : [value],
    type: sequelize.QueryTypes.DELETE
  })
}
// Exports:
module.exports = {
  newUser,
  newProduct,
  newOrder,
  newRequiredProduct,
  selectFromTableWhereFieldIsValue,
  selectAllFromTable,
  selectProductsJoinCategories,
  selectAllOrdersJoined,
  selectAllOrdersJoinedByUserId,
  updateTableRegisterWhereIdIsValue,
  deleteTableRegisterWhereIdIsValue
}