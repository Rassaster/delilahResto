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
const getUserByEmail = (searchedUserEmail) => {
  return sequelize.query("SELECT * FROM users WHERE email = ?", {
    replacements: [searchedUserEmail],
    type: sequelize.QueryTypes.SELECT
  });
};
const getUserByUsername = (searchedUserUsername) => {
  return sequelize.query("SELECT * FROM users WHERE username = ?", {
    replacements: [searchedUserUsername],
    type: sequelize.QueryTypes.SELECT
  });
};

const getAllUsers = () => {
  return sequelize.query("SELECT * FROM users", {type: sequelize.QueryTypes.SELECT})
};
const getUserById = (userId) => {
  return sequelize.query("SELECT * FROM users WHERE id = ?", {
    replacements: [userId],
    type: sequelize.QueryTypes.SELECT
  })
};
const getAllProducts = () => {
  return sequelize.query("SELECT * FROM products", {type: sequelize.QueryTypes.SELECT})
};
const getProductByName = (productName) => {
  return sequelize.query("SELECT * FROM products WHERE product_name = ?", {
    replacements: [productName],
    type: sequelize.QueryTypes.SELECT
  })
};
const getProductById = (productId) => {
  return sequelize.query("SELECT * FROM products WHERE id_product = ?", {
    replacements: [productId],
    type: sequelize.QueryTypes.SELECT
  })
};
const getAllOrders = () => {};
const getOrderById = () => {};


// Exports:
module.exports = {
  newUser,
  getUserByEmail,
  getUserByUsername
}