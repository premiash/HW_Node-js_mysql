-- Create a MySQL Database called Bamazon --
CREATE DATABASE bamazon_db;
-- Make it so all of the following code will affect bamazon_db --
USE bamazon_db;
-- Creates the table within bamazon_db --
CREATE TABLE products (
-- item_id (unique id for each product) --
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores) --
product_id INTEGER(10), 
product_name VARCHAR(30),
department_name VARCHAR(30),
price DECIMAL(9, 2),
stock_quantity INTEGER(10),
PRIMARY KEY (product_id)
);



SELECT * FROM products;
-- Populate this database with around 10 different products. --
INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Headphones", "Electronics", "12.50", 50);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Conair Hair Dryer", "Beauty & Health", "11.99", 100);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Colgate Toothpaste", "Beauty & Health", "4.00", 25);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Crayola Construction Paper", "School Supplies", "3.97", 40);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Casio Desktop Calculator", "School Supplies", "8.00", 150);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Bulletin Board set", "School Supplies", "22.89", 20);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Fitbit Flex Wireless Wristband", "Beauty & Health", "62.92", 95);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Echo Dot", "Electronics", "49.99", 30);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Apple iPhone 5S", "Electronics", "174.98", 20);

INSERT INTO products (product_id, product_name, department_name, price, stock_quantity)
VALUES (10, "The Underground Railroad : ", "Books", "16.00", 100);