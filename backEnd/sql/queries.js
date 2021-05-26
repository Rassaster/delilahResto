// Requiring Data Base connection's module from dbConnect.js:
const sequelize = require("../dataBase/dbConnect");
// ***** SQL INSERT QUERIES *****
// INSERT create new user in Users:
const newUser =  (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin) => {
  return sequelize.query("INSERT INTO users(username, fullname, email, cellphone_number, delivery_address, user_password, salt,  is_admin) VALUES(?, ?, ?, ?, ?, SHA2(?, 224), ?, ?)", {
    replacements: [username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin],
    type: sequelize.QueryTypes.INSERT
  });
};
// ***** SQL INSERT QUERIES *****
// SELECT * FROM usuarios WHERE usuario = ?
const findUser = (searchedUser) => {
  return sequelize.query("SELECT * FROM users WHERE user = ?", {
    replacements: [searchedUser],
    type: sequelize.QueryTypes.SELECT
  });
};
// Exports:
module.exports = {
  newUser,
  findUser
}