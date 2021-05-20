const Sequelize = require("sequelize");
const mysql = require("mysql2");
const {DIALECT_DB, USER_DB, PASS_DB, HOST_DB, PORT_DB, NAME_DB} = require("../config")
// Importe de Modelos de Base de Datos:
const categoriaProductosModel = require("../models/categoriasProductosModel")
const productosModel = require("../models/productosModel");
const usuariosModel = require("../models/usuariosModel");


const initializeDB = async () => {
  try {
    // Iniciar conexión a mysql:
    let con = mysql.createConnection({
      host: HOST_DB,
      user: USER_DB,
      password: PASS_DB
    });
    con.connect((err) => {
      if (err) {
        console.log("Ha habido un error en tu conexión a MySQL", err)
        return err;
      } else {
        console.log("Te has conectado exitosamente a MySQL.");
      };
      // Creación de Base de Datos:
      try {
        con.query(`CREATE DATABASE IF NOT EXISTS ${NAME_DB}`, (err, result) => {
          if (err) {
          return err;
          } else {
            console.log(`Se ha creado y establecido conexión exitosamente a la base de  datos: ${NAME_DB}.`);
            console.log(result);
          }
        });
      } catch (err) {
        console.log("Ha habido un error: ", err)
      }
    });
  } catch (err) {
    console.log("Ha habido un error:", err);
    return err;
  };
};

const createModels = async () => {
  try {
    // Conexión a Base de Datos
    const sequelize = new Sequelize(NAME_DB, USER_DB, PASS_DB, { dialect: DIALECT_DB });
    // Creación de Tablas:
    const CategoriaProductos = categoriaProductosModel(sequelize, Sequelize);
    const Productos = productosModel(sequelize, Sequelize);
    const Users = usuariosModel(sequelize, Sequelize);

    // CategoriaProductos.belongsTo(Productos);
    // Productos.hasMany(CategoriaProductos);

    sequelize.sync({force: false})
      .then(()=> {
        console.log('Las tablas han sido sincronizadas exitosamente.')
      });
    // Exportar modelos de tablas:
    module.exports = {
      CategoriaProductos,
      Users,
      Productos
    };
  } catch (err) {
    console.log("Ha habido un error:", err);
    return err;
  };
}


initializeDB()
  .then(res => {
    createModels();
  })