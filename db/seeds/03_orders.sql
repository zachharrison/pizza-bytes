INSERT INTO orders (restaurant_id, customer_id, completed)
VALUES (1, 2, FALSE);

INSERT INTO orders (restaurant_id, order_date, customer_id, pickup_time, completed)
VALUES (1, '2021-01-09 19:03:11.242422', 1, '2021-01-09 19:33:11.242422', TRUE),
(1, '2021-01-08 19:03:11.242422', 1, '2021-01-08 19:33:11.242422', TRUE),
(1, '2021-01-09 20:03:11.242422', 1, '2021-01-09 20:33:11.242422', FALSE);

