/* Data Manipulation Language */
USE DelilahResto;
-- Initial data in table: Order_Status
INSERT INTO Order_Status (descripcion) VALUES ("New");
INSERT INTO Order_Status (descripcion) VALUES ("Confirmed");
INSERT INTO Order_Status (descripcion) VALUES ("Preparing");
INSERT INTO Order_Status (descripcion) VALUES ("On the way");
INSERT INTO Order_Status (descripcion) VALUES ("Cancelled");
INSERT INTO Order_Status (descripcion) VALUES ("Delivered");
-- Initial data in table: Paying_Methods
INSERT INTO Paying_Methods (descripcion) VALUES ("Cash");
INSERT INTO Paying_Methods (descripcion) VALUES ("PayPal");
INSERT INTO Paying_Methods (descripcion) VALUES ("Debit/Credit");
INSERT INTO Paying_Methods (descripcion) VALUES ("Dataphone");
-- Initial data in table: Products_Categories
INSERT INTO Products_Categories (nombre_categoria) VALUES ("Entry");
INSERT INTO Products_Categories (nombre_categoria) VALUES ("Main");
INSERT INTO Products_Categories (nombre_categoria) VALUES ("Dessert");
INSERT INTO Products_Categories (nombre_categoria) VALUES ("Drink");
-- Initial data in table: Products
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Nachos con queso", 1, 15000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Empanadas de carne", 1, 14000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Empanadas de pollo", 1, 12000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Deditos de queso", 1, 14000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Patacones con suero", 1, 15000);

INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Hamburguesa sencilla", 2, 20000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Hamburguesa doble", 2, 26000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Hamburguesa vegetariana", 2, 280000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Papas en casco", 2, 15000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Papas criollas", 2, 14000);

INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Cheesecake de oreo", 3, 18000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Cheesecake de limón", 3, 18000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Cheesecake de frutos rojos", 3, 18000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Brownie con helado", 3, 20000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Galleta de chocolate", 3, 16000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Galleta de macadamia", 3, 16000);

INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Coca Cola", 4, 6000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Colombiana", 4, 6000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Limonada", 4, 8000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Jugo de Naranja", 4, 10000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Malteada de chocolate", 4, 14000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Malteada de vainilla", 4, 14000);
INSERT INTO Products (product_name, id_product_category, product_price)
  VALUES ("Malteada de fresa", 4, 14000);

-- Initial data in table: Users
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("juan93", "Juan Rassa", "jr93@gmail.com", "3112889834", "Calle 122 # 23 - 32", "321", "salt1234", "verdadero");
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("andreaLo", "Andrea Lorta", "andreaL@gmail.com", "3142345565", "Carrera 10 # 2 - 4", "321", "salt1234", "falso");
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("sof88", "Sofia Ricaurte", "sofiaR@gmail.com", "3117667877", "Calle 45 # 11 -23", "321", "salt1234", "verdadero");
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("jjSala", "Jaime Salazar", "jjs@gmailcom", "3208665456", "Calle 88 # 55 - 29", "321", "salt1234", "falso");
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("mariDuch", "Mariana Vargas", "duch@gmail.com", "3224995644", "Carrera 102 # 20 - 12", "321", "salt1234", "falso");
-- Initial data in table: Orders
INSERT INTO Orders (id_username, id_Order_Status, id_Paying_Methods) VALUES (2, 3, 1);
INSERT INTO Orders (id_username, id_Order_Status, id_Paying_Methods) VALUES (3, 1, 1);
INSERT INTO Orders (id_username, id_Order_Status, id_Paying_Methods) VALUES (4, 2, 4);
INSERT INTO Orders (id_username, id_Order_Status, id_Paying_Methods) VALUES (1, 4, 4);
-- Initial data in table: Desired Products
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (1, 2, 1);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (1, 10, 2);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (1, 20, 2);

INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (2, 4, 2);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (2, 8, 3);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (2, 16, 3);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (2, 21, 3);

INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (3, 3, 2);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (3, 11, 2);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (3, 14, 2);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (3, 17, 2);

  INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (4, 8, 3);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (4, 13, 3);
INSERT INTO Desired_Products (id_order, id_product, product_quantity)
  VALUES (4, 18, 3);
-- Initial data in table:  Favorite Products
INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (1, 11);
INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (1, 8);

INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (2, 12);
INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (2, 4);
INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (2, 20);

INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (4, 1);
INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (4, 10);
INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (4, 14);
INSERT INTO Favorite_Products (id_username, id_product)
  VALUES (4, 22);
