// Requiring NPM Libraries:
const Sequelize = require("sequelize");
const mysql = require("mysql2");
// Requiring Environment Variables from congif.js:
const {DIALECT_DB, USER_DB, PASS_DB, PORT_DB, HOST_DB, NAME_DB} = require("../config");
// Creating the link to the Data Base based on the Environment Variables:
const sequelize = new Sequelize(`${DIALECT_DB}://${USER_DB}:${PASS_DB}@${HOST_DB}:${PORT_DB}/${NAME_DB}`);
// Connecting to the Data Base and logging in console the success/failure of the process:
sequelize.authenticate()
  .then(()=>{
    console.log(`Te has conectado con la Base de Datos: ${NAME_DB}.`);
  })
  .catch(err => {
    console.log("Ha habido un error de conexión con la Base de Datos:", err);
  })
// Exports:
module.exports = sequelize;