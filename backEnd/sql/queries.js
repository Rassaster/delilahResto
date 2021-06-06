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
// ***** SQL SELECT QUERIES *****
// SELECT * FROM usuarios WHERE usuario = ?
const selectUserByEmail = (searchedUserEmail) => {
  return sequelize.query("SELECT * FROM users WHERE email = ?", {
    replacements: [searchedUserEmail],
    type: sequelize.QueryTypes.SELECT
  });
};
const selectUserByUsername = (searchedUserUsername) => {
  return sequelize.query("SELECT * FROM users WHERE username = ?", {
    replacements: [searchedUserUsername],
    type: sequelize.QueryTypes.SELECT
  });
};
const selectAllUsers = () => {
  return sequelize.query("SELECT * FROM users", {type: sequelize.QueryTypes.SELECT});
};
const selectUserById = (userId) => {
  return sequelize.query("SELECT * FROM users WHERE id_user = ?", {
    replacements: [userId],
    type: sequelize.QueryTypes.SELECT
  });
};
const selectAllProducts = () => {
  return sequelize.query("SELECT * FROM products", {type: sequelize.QueryTypes.SELECT});
};
const selectProductByName = (productName) => {
  return sequelize.query("SELECT * FROM products WHERE product_name = ?", {
    replacements: [productName],
    type: sequelize.QueryTypes.SELECT
  });
};
const selectProductById = (productId) => {
  return sequelize.query("SELECT * FROM products WHERE id_product = ?", {
    replacements: [productId],
    type: sequelize.QueryTypes.SELECT
  });
};
const selectAllOrders = () => {
  return sequelize.query("SELECT * FROM orders", {type: sequelize.QueryTypes.SELECT});
};
const selectOrderById = (orderId) => {
  return sequelize.query("SELECT * FROM orders WHERE id_order = ?", {
    replacements: [orderId],
    type: sequelize.QueryTypes.SELECT
  });
};


// Exports:
module.exports = {
  newUser,
  selectUserByEmail,
  selectUserByUsername,
  selectAllUsers,
  selectUserById,
  selectAllProducts,
  selectProductByName,
  selectProductById,
  selectAllOrders,
  selectOrderById
}