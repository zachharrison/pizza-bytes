INSERT INTO customers (name, email, phone_number)
VALUES ('Alice', 'alice@gmail.com', '250-580-7961'),
('Natasha', 'natasha@gmail.com', '778-877-8963'),
('Adam', 'adam.tranquilla@gmail.com', '403-710-5087'),
('Zach', 'zach@gmail.com', '250-765-4321');

INSERT INTO restaurants (name, email, password, phone_number)
VALUES ('Pizza Bytes', 'pizzabytes@gmail.com', 'password', '100-101-0101');

INSERT INTO menu_items (restaurant_id, name, photo_url, price)
VALUES (
  1,
  'Build Your Own',
  './public/img/Pizza-Toss.png',
  500
),
(
  1,
  'Classic Cheese Pizza',
  './public/img/cheese.png',
  1000
),
(
  1,
  'Pepperoni Pizza',
  './public/img/pepperoni.png',
  1000
),
(
  1,
  'Deluxe Pizza',
  './public/img/deluxe.png',
  1000
),
(
  1,
  'Vegetarian Pizza',
  './public/img/veg.png',
  1000
),
(
  1,
  'Meat Lovers Pizza',
  './public/img/meat-lovers.png',
  1000
),
(
  1,
  'Hawaiian Pizza',
  './public/img/hawaiian.png',
  1000
),
(
  1,
  'BBQ Chicken Pizza',
  './public/img/bbq-chicken.png',
  1000
);


INSERT INTO orders (restaurant_id, customer_id, completed)
VALUES (1, 2, FALSE);

INSERT INTO orders (restaurant_id, order_date, customer_id, pickup_time, completed)
VALUES (1, '2021-01-07 19:03:11.242422', 1, '2021-01-07 19:33:11.242422', TRUE),
(1, '2021-01-08 19:03:11.242422', 1, '2021-01-08 19:33:11.242422', TRUE),
(1, '2021-01-09 20:03:11.242422', 1, '2021-01-09 20:33:11.242422', FALSE),
(1, '2021-01-06 19:03:11.242422', 3, '2021-01-06 19:33:11.242422', TRUE),
(1, '2021-01-07 19:03:11.242422', 4, '2021-01-07 19:33:11.242422', TRUE);

INSERT INTO sizes (name, price)
VALUES ('byte', 0),
('megabyte', 400),
('gigabyte', 700);

INSERT INTO topping_categories (name, price)
VALUES ('Cheeses', 200),
('Meats', 150),
('Veggies', 125);

INSERT INTO toppings (topping_category_id, name)
VALUES (1, 'Mozzarella'),
(1, 'Cheddar'),
(1, 'Feta'),
(2, 'Pepperoni'),
(2, 'Bacon'),
(2, 'Ham'),
(2, 'Chicken'),
(2, 'Italian Sausage'),
(3, 'Green Pepper'),
(3, 'Banana Peppers'),
(3, 'Mushrooms'),
(3, 'Black Olives'),
(3, 'Red Onion'),
(3, 'Pineapple'),
(3, 'Tomato');

INSERT INTO menu_item_toppings (menu_item_id, topping_id )
VALUES
(1, NULL),
(2,1),
(3,1),
(3,4),
(4,1),
(4,4),
(4,9),
(4,11),
(4,12),
(5,1),
(5,9),
(5,11),
(5,12),
(5,13),
(5,15),
(6,1),
(6,6),
(6,14),
(7,1),
(7,2),
(7,7),
(7,13);

-- Currently have 4 orders so need order items for 4 orders

INSERT INTO order_items (order_id, size_id, quantity, menu_item_id)
VALUES (1, 3, 1, 1),
(1, 2, 1, 2),
(2, 3, 2, 1),
(3, 2, 1, 3),
(3, 2, 1, 4),
(4, 1, 3, 1),
(4, 2, 2, 2);

-- 7 order items total to add potential toppings to
INSERT INTO order_item_toppings (topping_id, order_item_id)
VALUES (3, 1),
(14, 1),
(12, 1),
(1, 2),
(4, 2),
(9, 2),
(5, 3),
(9, 3),
(10, 4),
(12, 5),
(1, 5),
(4, 6),
(9, 6),
(5, 6),
(9, 7),
(10, 7);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
