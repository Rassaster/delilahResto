// Requiring Data Base connection's module from dbConnect.js:
const sequelize = require("../dataBase/dbConnect");
// ***** SQL INSERT QUERIES *****
// INSERT create new user in Users:
const newUser =  (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin) => {
  return sequelize.query("INSERT INTO users(username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", {
    replacements: [username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin],
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
// SELECT p.id_product, p.product_name, pc.category_name, p.product_price FROM Products AS p JOIN Products_Categories as pc ON p.id_product_category=pc.id_product_category;
const selectProductsJoinCategories = () => {
  return sequelize.query("SELECT p.id_product, p.product_name, pc.category_name, p.product_price FROM Products AS p JOIN Products_Categories as pc ON p.id_product_category=pc.id_product_category ORDER BY p.id_product", {
    type: sequelize.QueryTypes.SELECT
  });
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
  selectFromTableWhereFieldIsValue,
  selectAllFromTable,
  selectProductsJoinCategories,
  updateTableRegisterWhereIdIsValue,
  deleteTableRegisterWhereIdIsValue
}