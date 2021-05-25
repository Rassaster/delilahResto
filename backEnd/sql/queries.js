const sequelize = require("../dataBase/dbConnect");
// SQL INSERT Queries:
const newRegister =  (usuario, nombre_apellido, email, numero_celular, direccion, clave, es_admin) => {
  return sequelize.query("INSERT INTO usuarios(usuario, nombre_apellido, email, numero_celular, direccion, clave, es_admin) VALUES(?, ?, ?, ?, ?, ?, ?)", {
    replacements: [usuario, nombre_apellido, email, numero_celular, direccion, clave, es_admin],
    type: sequelize.QueryTypes.INSERT
  });
};
// Exports:
module.exports = {
  newRegister
}