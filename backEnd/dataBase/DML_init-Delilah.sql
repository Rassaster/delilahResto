/* Data Manipulation Language */
USE DelilahResto;
-- Initial data in table: Order_Status
INSERT INTO Orders_Status (status_description) VALUES ("New");
INSERT INTO Orders_Status (status_description) VALUES ("Confirmed");
INSERT INTO Orders_Status (status_description) VALUES ("Preparing");
INSERT INTO Orders_Status (status_description) VALUES ("On the way");
INSERT INTO Orders_Status (status_description) VALUES ("Cancelled");
INSERT INTO Orders_Status (status_description) VALUES ("Delivered");
-- Initial data in table: Paying_Methods
INSERT INTO Paying_Methods (method_description) VALUES ("Cash");
INSERT INTO Paying_Methods (method_description) VALUES ("PayPal");
INSERT INTO Paying_Methods (method_description) VALUES ("Debit/Credit");
INSERT INTO Paying_Methods (method_description) VALUES ("Dataphone");
-- Initial data in table: Products_Categories
INSERT INTO Products_Categories (category_name) VALUES ("Entry");
INSERT INTO Products_Categories (category_name) VALUES ("Main");
INSERT INTO Products_Categories (category_name) VALUES ("Dessert");
INSERT INTO Products_Categories (category_name) VALUES ("Drink");
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
  VALUES ("juan93", "Juan Rassa", "jr93@gmail.com", "3112889834", "Calle 122 # 23 - 32", "321", "salt1234", "T");
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("andreaLo", "Andrea Lorta", "andreaL@gmail.com", "3142345565", "Carrera 10 # 2 - 4", "321", "salt1234", "F");
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("sof88", "Sofia Ricaurte", "sofiaR@gmail.com", "3117667877", "Calle 45 # 11 -23", "321", "salt1234", "T");
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("jjSala", "Jaime Salazar", "jjs@gmailcom", "3208665456", "Calle 88 # 55 - 29", "321", "salt1234", "F");
INSERT INTO Users (username, fullname, email, cellphone_number, delivery_address, user_password, salt, is_admin)
  VALUES ("mariDuch", "Mariana Vargas", "duch@gmail.com", "3224995644", "Carrera 102 # 20 - 12", "321", "salt1234", "F");
