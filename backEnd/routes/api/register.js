// Requiring "Router" object from "Express":
const router = require("express").Router();
// Requiring SQL-Sequelize queries commands:
const { newRegister } = require("../../sql/queries");
// ******************** ENDPOINTS ******************** //
// -> /delilahResto/register/newUser (either as User or Admin):
router.post("/newUser", (req, res) => {
  const {usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin} = req.body;
  newRegister(usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin)
    .then(result => {
      let successResponse = {
        SuccessDescription: "El usuario se ha creado con éxito",
        UsuarioCreado: req.body,
        idUsuarioCreado: result[0]
      };
      res.status(201).json(successResponse);
    })
    .catch(err => {
      let errorResponse = {
        ErrorMessage: err.parent.sqlMessage,
        ErrorDescription: "Revisar documentación sobre cómo se debe estructurar el formato JSON en relación a la Columna indicada en ErrorMessage.",
        InformacionEnviada: req.body
      };
      res.status(400).send(errorResponse); 
    })
});
module.exports = router;