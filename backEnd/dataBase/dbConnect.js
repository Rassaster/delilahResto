const Sequelize = require("sequelize");
const mysql = require("mysql2");
const {DIALECT_DB, USER_DB, PASS_DB, PORT_DB, HOST_DB, NAME_DB} = require("../config")
const sequelize = new Sequelize(`${DIALECT_DB}://${USER_DB}:${PASS_DB}@${HOST_DB}:${PORT_DB}/${NAME_DB}`);

sequelize.authenticate()
  .then(()=>{
    console.log("Te has conectado con la Base de Datos:");
  })
  .catch(err => {
    console.log("Ha habido un error de conexión con la Base de Datos:", err);
  })

module.exports = sequelize;