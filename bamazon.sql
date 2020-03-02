-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect animals_db --
USE bamazon_db;


-- Creates the table "people" within animals_db --
CREATE TABLE products (

  item_id INT NOT NULL AUTO_INCREMENT,
  
  product_name VARCHAR (100) NOT NULL,
  
  department_name VARCHAR(100) NOT NULL,
  
  price INTEGER(10) NOT NULL,
  
  stock_quantity INTEGER(10) NOT NULL,
  
  PRIMARY KEY(item_id)
  
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hair Dryer", "Beauty", 30, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dish Soap", "Kitchen", 5, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Bathroom", 12, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow", "Bedroom", 30, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sheets", "Bedroom", 50, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cups", "Kitchen", 15, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 60, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Eletronics", 100, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nail Polish", "Beauty", 4, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Bathroom", 10, 30);


ALTER TABLE products ADD COLUMN product_sales DECIMAL(7,2) DEFAULT '0.00';
