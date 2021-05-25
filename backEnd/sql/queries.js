// Requiring Data Base connection's module from dbConnect.js:
const sequelize = require("../dataBase/dbConnect");
// SQL INSERT Queries:
const newRegister =  (usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin) => {
  return sequelize.query("INSERT INTO usuarios(usuario, nombre_apellido, email, numero_celular, direccion, clave, salt,  es_admin) VALUES(?, ?, ?, ?, ?, SHA2(?, 224), ?, ?)", {
    replacements: [usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin],
    type: sequelize.QueryTypes.INSERT
  });
};
// Exports:
module.exports = {
  newRegister
}