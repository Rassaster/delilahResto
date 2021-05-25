/* Data Manipulation Language */
USE DelilahResto;
-- Datos iniciales en tabla: Estado_Pedido
INSERT INTO Estado_Pedido (descripcion) VALUES ("Nuevo");
INSERT INTO Estado_Pedido (descripcion) VALUES ("Confirmado");
INSERT INTO Estado_Pedido (descripcion) VALUES ("Preparando");
INSERT INTO Estado_Pedido (descripcion) VALUES ("Enviando");
INSERT INTO Estado_Pedido (descripcion) VALUES ("Cancelado");
INSERT INTO Estado_Pedido (descripcion) VALUES ("Entregado");
-- Datos iniciales en tabla: Formas_de_Pago
INSERT INTO Formas_de_Pago (descripcion) VALUES ("Efectivo");
INSERT INTO Formas_de_Pago (descripcion) VALUES ("PayPal");
INSERT INTO Formas_de_Pago (descripcion) VALUES ("Débito/Crédito");
INSERT INTO Formas_de_Pago (descripcion) VALUES ("Datafono");
-- Datos iniciales en tabla: Categorias_Productos
INSERT INTO Categorias_Productos (nombre_categoria) VALUES ("Entrada");
INSERT INTO Categorias_Productos (nombre_categoria) VALUES ("Fuerte");
INSERT INTO Categorias_Productos (nombre_categoria) VALUES ("Postre");
INSERT INTO Categorias_Productos (nombre_categoria) VALUES ("Bebida");
-- Datos iniciales en tabla: Productos
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Nachos con queso", 1, 15000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Empanadas de carne", 1, 14000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Empanadas de pollo", 1, 12000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Deditos de queso", 1, 14000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Patacones con suero", 1, 15000);

INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Hamburguesa sencilla", 2, 20000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Hamburguesa doble", 2, 26000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Hamburguesa vegetariana", 2, 280000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Papas en casco", 2, 15000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Papas criollas", 2, 14000);

INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Cheesecake de oreo", 3, 18000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Cheesecake de limón", 3, 18000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Cheesecake de frutos rojos", 3, 18000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Brownie con helado", 3, 20000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Galleta de chocolate", 3, 16000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Galleta de macadamia", 3, 16000);

INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Coca Cola", 4, 6000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Colombiana", 4, 6000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Limonada", 4, 8000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Jugo de Naranja", 4, 10000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Malteada de chocolate", 4, 14000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Malteada de vainilla", 4, 14000);
INSERT INTO Productos (nombre_producto, id_categoria_de_producto, precio_producto)
  VALUES ("Malteada de fresa", 4, 14000);

-- Datos iniciales en tabla: Usuarios
INSERT INTO Usuarios (usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin)
  VALUES ("juan93", "Juan Rassa", "jr93@gmail.com", "3112889834", "Calle 122 # 23 - 32", "claveBase", "salt1234", "verdadero");
INSERT INTO Usuarios (usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin)
  VALUES ("andreaLo", "Andrea Lorta", "andreaL@gmail.com", "3142345565", "Carrera 10 # 2 - 4", "claveBase", "salt1234", "falso");
INSERT INTO Usuarios (usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin)
  VALUES ("sof88", "Sofia Ricaurte", "sofiaR@gmail.com", "3117667877", "Calle 45 # 11 -23", "claveBase", "salt1234", "verdadero");
INSERT INTO Usuarios (usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin)
  VALUES ("jjSala", "Jaime Salazar", "jjs@gmailcom", "3208665456", "Calle 88 # 55 - 29", "claveBase", "salt1234", "falso");
INSERT INTO Usuarios (usuario, nombre_apellido, email, numero_celular, direccion, clave, salt, es_admin)
  VALUES ("mariDuch", "Mariana Vargas", "duch@gmail.com", "3224995644", "Carrera 102 # 20 - 12", "claveBase", "salt1234", "falso");
-- Datos iniciales en tabla: Pedidos
INSERT INTO Pedidos (id_usuario, id_estado_pedido, id_formas_de_pago) VALUES (2, 3, 1);
INSERT INTO Pedidos (id_usuario, id_estado_pedido, id_formas_de_pago) VALUES (3, 1, 1);
INSERT INTO Pedidos (id_usuario, id_estado_pedido, id_formas_de_pago) VALUES (4, 2, 4);
INSERT INTO Pedidos (id_usuario, id_estado_pedido, id_formas_de_pago) VALUES (1, 4, 4);
-- Datos iniciales en tabla: Productos Deseados
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (1, 2, 1);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (1, 10, 2);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (1, 20, 2);

INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (2, 4, 2);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (2, 8, 3);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (2, 16, 3);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (2, 21, 3);

INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (3, 3, 2);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (3, 11, 2);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (3, 14, 2);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (3, 17, 2);

  INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (4, 8, 3);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (4, 13, 3);
INSERT INTO Productos_Deseados (id_pedido, id_producto, cantidad_producto)
  VALUES (4, 18, 3);
-- Datos iniciales en tabla: Productos Favoritos
INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (1, 11);
INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (1, 8);

INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (2, 12);
INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (2, 4);
INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (2, 20);

INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (4, 1);
INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (4, 10);
INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (4, 14);
INSERT INTO Productos_Favoritos (id_usuario, id_producto)
  VALUES (4, 22);
