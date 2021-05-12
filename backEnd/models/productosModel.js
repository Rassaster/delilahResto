module.exports = (sequelize, type) => {
  return sequelize.define("Producto", {
    id_producto: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_producto: {
      type: type.STRING,
      allowNull: false
    },
    id_categoria_producto: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: "Categoria_Productos",
        key: "id_categoria_de_producto"
      } 
    },
    precio_producto: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}