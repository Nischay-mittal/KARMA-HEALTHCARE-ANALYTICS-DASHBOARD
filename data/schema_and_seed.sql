CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  city TEXT,
  created_at DATE
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price DECIMAL(10,2)
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER,
  order_date DATE,
  status TEXT --'completed','pending','cancelled'
);

INSERT INTO customers (id,name, email, city, created_at) VALUES
('1','Aarav Sharma','aarav.sharma@example.com','Mumbai','2024-06-10'),
('2','Priya Verma','priya.verma@example.com','Delhi','2024-07-02'),
('3','Rohan Gupta','rohan.gupta@example.com','Bengaluru','2024-08-15'),
('4','Sakshi Mehta','sakshi.mehta@example.com','Kolkata','2024-09-01'),
('5','Vikram Singh','vikram.singh@example.com','Chennai','2024-10-05'),
('6','Neha Kapoor','neha.kapoor@example.com','Pune','2024-11-20'),
('7','Karan Malhotra','karan.malhotra@example.com','Hyderabad','2024-12-12'),
('8','Isha Patel','isha.patel@example.com','Ahmedabad','2025-01-08'),
('9','Aditya Rao','aditya.rao@example.com','Noida','2025-02-14'),
('10','Maya Nair','maya.nair@example.com','Lucknow','2025-03-21');


INSERT INTO products (id,name, category, price) VALUES
('22','Smartphone X12','Electronics',29999.00),
('33','Wireless Headphones Pro','Electronics',7999.00),
('45','Fitness Band F1','Electronics',2499.00),
('56','Bluetooth Speaker S5','Electronics',3499.00),
('67','Laptop LightBook 14','Electronics',54999.00),

('12','Men T-Shirt Regular','Apparel',499.00),
('14','Women Kurta Cotton','Apparel',1299.00),
('31','Sports Shorts','Apparel',799.00),
('78','Sneakers RunFast','Apparel',2999.00),

('19','Ceramic Mug 350ml','Home',249.00),
('23','Cushion Cover 45x45','Home',599.00),
('43','LED Table Lamp','Home',1499.00),

('66','Thriller Novel - "Nightfall"','Books',349.00),
('15','Programming Basics - "CodeStart"','Books',799.00),
('90','Cookbook - "Quick Meals"','Books',499.00);



INSERT INTO orders (id, customer_id, product_id, quantity, order_date, status) VALUES
(1, 3, 33, 2, '2024-01-12', 'completed'),
(2, 7, 45, 1, '2024-01-15', 'pending'),
(3, 1, 56, 4, '2024-01-21', 'completed'),
(4, 9, 12, 3, '2024-02-01', 'cancelled'),
(5, 5, 23, 2, '2024-02-05', 'completed'),
(6, 2, 78, 1, '2024-02-12', 'pending'),
(7, 10, 90, 5, '2024-02-14', 'completed'),
(8, 4, 19, 3, '2024-03-03', 'completed'),
(9, 6, 43, 2, '2024-03-08', 'pending'),
(10, 8, 66, 1, '2024-03-11', 'completed'),
(11, 1, 15, 4, '2024-03-19', 'cancelled'),
(12, 3, 45, 2, '2024-04-02', 'completed'),
(13, 7, 33, 5, '2024-04-04', 'pending'),
(14, 4, 22, 1, '2024-04-07', 'completed'),
(15, 9, 31, 3, '2024-04-12', 'completed'),
(16, 2, 19, 2, '2024-04-20', 'pending'),
(17, 6, 23, 1, '2024-04-29', 'completed'),
(18, 8, 14, 5, '2024-05-01', 'cancelled'),
(19, 5, 67, 4, '2024-05-05', 'completed'),
(20, 10, 78, 2, '2024-05-09', 'pending'),
(21, 3, 90, 3, '2024-05-15', 'completed'),
(22, 7, 66, 5, '2024-05-20', 'completed'),
(23, 1, 43, 2, '2024-06-01', 'pending'),
(24, 9, 45, 1, '2024-06-03', 'completed'),
(25, 4, 12, 4, '2024-06-07', 'cancelled'),
(26, 2, 23, 2, '2024-06-09', 'completed'),
(27, 6, 31, 3, '2024-06-12', 'completed'),
(28, 8, 19, 2, '2024-06-19', 'pending'),
(29, 10, 33, 1, '2024-06-22', 'completed'),
(30, 5, 78, 4, '2024-07-01', 'completed'),
(31, 3, 67, 3, '2024-07-05', 'pending'),
(32, 7, 14, 1, '2024-07-08', 'completed'),
(33, 1, 43, 5, '2024-07-14', 'completed'),
(34, 9, 90, 2, '2024-07-18', 'pending'),
(35, 4, 22, 3, '2024-07-19', 'completed'),
(36, 2, 56, 4, '2024-07-23', 'cancelled'),
(37, 6, 45, 1, '2024-07-29', 'completed'),
(38, 8, 31, 2, '2024-08-02', 'completed'),
(39, 10, 12, 4, '2024-08-05', 'pending'),
(40, 5, 23, 2, '2024-08-09', 'completed'),
(41, 3, 66, 3, '2024-08-16', 'completed'),
(42, 7, 78, 5, '2024-08-19', 'pending'),
(43, 1, 19, 1, '2024-08-23', 'completed'),
(44, 9, 33, 4, '2024-08-29', 'cancelled'),
(45, 4, 56, 3, '2024-09-03', 'completed'),
(46, 2, 14, 5, '2024-09-06', 'completed'),
(47, 6, 67, 2, '2024-09-11', 'pending'),
(48, 8, 45, 3, '2024-09-15', 'completed'),
(49, 10, 90, 1, '2024-09-21', 'completed'),
(50, 5, 23, 4, '2024-09-30', 'completed');