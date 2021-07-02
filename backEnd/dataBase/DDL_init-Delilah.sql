/*Data Definition Language*/
-- Creating DB:
CREATE DATABASE DelilahResto;
USE DelilahResto;
-- Creating tables:
-- *********************************************************
-- Orders Status (child of Orders)
CREATE TABLE Orders_Status (
  id_order_status integer  
    NOT NULL
    AUTO_INCREMENT,
  status_description varchar(20)
    NOT NULL,
  PRIMARY KEY (id_order_status)
);
-- Paying Methods (child of Orders)
CREATE TABLE Paying_Methods (
  id_paying_method integer
    NOT NULL
    AUTO_INCREMENT,
  method_description varchar(20)
    NOT NULL,
  PRIMARY KEY (id_paying_method)
);
-- *********************************************************
-- USERS RELATIONS
-- Users
CREATE TABLE Users (
  id_user integer
    NOT NULL
    AUTO_INCREMENT,
  register_date datetime
    NOT NULL,
  username varchar(30)
    NOT NULL,
  fullname varchar(60)
    NOT NULL,
  email varchar(60)
    NOT NULL,
  cellphone_number varchar(15)
    NOT NULL,
  delivery_address varchar(150)
    NOT NULL,
  user_password varchar(100)
    NOT NULL,
  salt varchar(100)
    NOT NULL,
  is_admin enum("T", "F")
    NOT NULL,
  PRIMARY KEY (id_user)
);
-- *********************************************************
-- PRODUCTS RELATIONS
-- Products Categories (child of Products)
CREATE TABLE Products_Categories (
  id_product_category integer
    NOT NULL
    AUTO_INCREMENT,
  category_name varchar(30)
    NOT NULL,
  PRIMARY KEY (id_product_category)
);
-- Products
CREATE TABLE Products (
  id_product integer
    NOT NULL
    AUTO_INCREMENT,
  product_name varchar(100)
    NOT NULL,
  id_product_category integer
    NOT NULL,
  product_price integer
    NOT NULL,
  PRIMARY KEY (id_product),
  FOREIGN KEY (id_product_category) 
    REFERENCES Products_Categories (id_product_category)
);
-- *********************************************************
-- Orders
CREATE TABLE Orders (
  id_order integer
    NOT NULL 
    AUTO_INCREMENT,
  last_update_date datetime
    NOT NULL,
  id_user integer
    NOT NULL,
  id_order_status integer default 1
    NOT NULL,
  id_paying_method integer
    NOT NULL,
  products varchar(500)
    NOT NULL,
  total_cost integer
    NOT NULL,
  PRIMARY KEY (id_order),
  FOREIGN KEY (id_user) 
    REFERENCES Users (id_user),
  FOREIGN KEY (id_order_status) 
    REFERENCES Orders_Status (id_order_status),
  FOREIGN key (id_paying_method) 
    REFERENCES Paying_Methods (id_paying_method)
);
-- *********************************************************
-- Required Products (child of Orders and Products)
CREATE TABLE Required_Products (
  id_order integer
    NOT NULL,
  id_product integer
    NOT NULL,
  product_quantity integer
    NOT NULL,
  FOREIGN KEY (id_order) REFERENCES Orders (id_order) ON DELETE CASCADE,
  FOREIGN KEY (id_product) REFERENCES Products (id_product)
);
-- *********************************************************