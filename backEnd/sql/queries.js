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
// 
// Exports:
module.exports = {
  newUser,
  selectFromTableWhereFieldIsValue,
  selectAllFromTable,
}