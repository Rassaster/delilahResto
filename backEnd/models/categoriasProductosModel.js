module.exports = (sequelize, type) => {
  return sequelize.define("Categoria_Productos", {
    id_categoria_de_producto: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_categoria: {
      type: type.ENUM("entrada", "fuerte", "postre", "bebida"),
      allowNull: false
    }
  });
}