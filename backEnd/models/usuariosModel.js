module.exports = (sequelize, type) => {
  return sequelize.define("Usuario", {
    id_usuario: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usuario: {
      type: type.STRING,
      allowNull: false
    },
    nombre_apellido: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      allowNull: false
    },
    numeroCelular: {
      type: type.STRING,
      allowNull: false
    },
    direccion: {
      type: type.STRING,
      allowNull: false
    },
    contraseña: {
      type: type.STRING,
      allowNull: false
    },
    es_admin: {
      type: type.BOOLEAN,
      allowNull: false
    }
  })
}