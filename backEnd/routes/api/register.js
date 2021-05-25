// Requiring "Router" object from "Express":
const router = require("express").Router();
const sequelize = require("../../dataBase/dbConnect");
const registerSchema = require("./../../schema/schemas");
// ******************** ENDPOINTS ******************** //
// Register (either as User or Admin):
router.post("/newUser", async (req, res) => {
  const {usuario, nombre_apellido, email, numero_celular, direccion, clave, es_admin} = req.body;
  newRegister(usuario, nombre_apellido, email, numero_celular, direccion, clave, es_admin)
    .then(result => {
        successResponse = {
          SuccessDescription: "El usuario se ha creado con éxito",
          UsuarioCreado: req.body,
          idUsuarioCreado: result[0]
        };
        res.status(200).json(successResponse);
    })
    .catch(err => {
      let errorResponse = {
        ErrorMessage: err.parent.sqlMessage,
        errorDescription: " Revisar documentación sobre cómo se debe estructurar el formato JSON en relación a a lo indicado en ErrorMessage.",
        InformacionEnviada: req.body
      };
      res.status(400).send(errorResponse); 
    })
});

const newRegister = async (usuario, nombre_apellido, email, numero_celular, direccion, clave, es_admin) => {
  return sequelize.query("INSERT INTO usuarios(usuario, nombre_apellido, email, numero_celular, direccion, clave, es_admin) VALUES(?, ?, ?, ?, ?, ?, ?)", {
    replacements: [usuario, nombre_apellido, email, numero_celular, direccion, clave, es_admin],
    type: sequelize.QueryTypes.INSERT
  });
}

module.exports = router;