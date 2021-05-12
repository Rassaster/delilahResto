/*Data Definition Language*/
-- Creación de la DB: 
CREATE DATABASE DelilahResto;
USE DelilahResto;
-- Creación de tablas:
-- *********************************************************
-- Estado pedido (hija de pedidos)
CREATE TABLE Estado_Pedido (
  id_estado_pedido integer  
    NOT NULL
    AUTO_INCREMENT,
  descripcion varchar(20)
    NOT NULL,
  PRIMARY KEY (id_estado_pedido)
);
-- Formas de pago (hija de pedidos)
CREATE TABLE Formas_de_Pago (
  id_formas_de_pago integer
    NOT NULL
    AUTO_INCREMENT,
  descripcion varchar(20)
    NOT NULL,
  PRIMARY KEY (id_formas_de_pago)
);
-- *********************************************************
-- RELACIONES USUARIOS
-- usuarios
CREATE TABLE Usuarios (
  id_usuario integer
    NOT NULL
    AUTO_INCREMENT,
  usuario varchar(30)
    NOT NULL,
  nombre_apellido varchar(60)
    NOT NULL,
  email varchar(60)
    NOT NULL,
  numero_celular varchar(15)
    NOT NULL,
  direccion varchar(150)
    NOT NULL,
  clave varchar(100)
    NOT NULL,
  es_admin boolean
    NOT NULL,
  PRIMARY KEY (id_usuario)
);
-- *********************************************************
-- RELACIONES PRODUCTOS
-- Categorías Productos (hija de productos)
CREATE TABLE Categorias_Productos (
  id_categoria_de_producto integer
    NOT NULL
    AUTO_INCREMENT,
  nombre_categoria varchar(30)
    NOT NULL,
  PRIMARY KEY (id_categoria_de_producto)
);
-- Productos
CREATE TABLE Productos (
  id_producto integer
    NOT NULL
    AUTO_INCREMENT,
  nombre_producto varchar(100)
    NOT NULL,
  id_categoria_de_producto integer
    NOT NULL,
  precio_producto integer
    NOT NULL,
  PRIMARY KEY (id_producto),
  FOREIGN KEY (id_categoria_de_producto) 
    REFERENCES Categorias_Productos (id_categoria_de_producto)
);
-- *********************************************************
-- Pedidos
CREATE TABLE Pedidos (
  id_pedido integer
    NOT NULL 
    AUTO_INCREMENT,
  id_usuario integer
    NOT NULL,
  fecha_pedido timestamp default current_timestamp
    NOT NULL,
  id_estado_pedido integer
    NOT NULL,
  id_formas_de_pago integer
    NOT NULL,
  PRIMARY KEY (id_pedido),
  FOREIGN KEY (id_usuario) 
    REFERENCES Usuarios (id_usuario),
  FOREIGN KEY (id_estado_pedido) 
    REFERENCES Estado_Pedido (id_estado_pedido),
  FOREIGN key (id_formas_de_pago) 
    REFERENCES Formas_de_Pago (id_formas_de_pago)
);
-- *********************************************************
-- Productos Deseados (hija de pedidos y productos)
CREATE TABLE Productos_Deseados (
  id_pedido integer
    NOT NULL,
  id_producto integer
    NOT NULL,
  cantidad_producto integer
    NOT NULL,
  FOREIGN KEY (id_pedido) REFERENCES Pedidos (id_pedido),
  FOREIGN KEY (id_producto) REFERENCES Productos (id_producto)
);
-- *********************************************************
-- Productos Favoritos (hija de usuarios y productos)
CREATE TABLE Productos_Favoritos (
  id_usuario integer
    NOT NULL,
  id_producto integer
    NOT NULL,
  FOREIGN KEY (id_usuario)
    REFERENCES Usuarios (id_usuario),
  FOREIGN KEY (id_producto)
    REFERENCES Productos (id_producto)
);
-- *********************************************************