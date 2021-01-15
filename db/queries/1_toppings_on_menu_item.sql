-- view entire menu
SELECT * FROM menu_items;

-- view specific menu item
SELECT * from menu_items WHERE id = $1;

-- view all toppings
SELECT * FROM toppings;

-- view specific topping
SELECT * from toppings WHERE id = $1;

-- list pizzas in a specific order (no toppings)
SELECT *
FROM order_items
JOIN orders ON orders.id = order_id
WHERE orders.id = 1;

-- count of pizzas in an order
SELECT sum(quantity)
FROM order_items
JOIN orders ON orders.id = order_id
WHERE orders.id = 1;

-- list pizzas , quantity and price in a specific order (no toppings)
SELECT quantity, price, menu_items.name
FROM order_items
JOIN orders ON orders.id = order_id
JOIN menu_items ON menu_item_id = menu_items.id
WHERE orders.id = 2;

-- price of pizzas in an order
SELECT sum(price * quantity)
FROM order_items
JOIN orders ON orders.id = order_id
JOIN menu_items ON menu_item_id = menu_items.id
WHERE orders.id = 2;

-- toppings on a pizza w price
SELECT menu_items.name, toppings.name, topping_categories.price
FROM menu_items
JOIN order_items ON menu_item_id = menu_items.id
JOIN order_item_toppings on order_item_id = order_items.id
JOIN toppings ON topping_id = toppings.id
JOIN topping_categories ON topping_category_id = topping_categories.id
WHERE order_items.id = 1;

-- sum of topping prices on pizza
SELECT sum(topping_categories.price)
FROM menu_items
JOIN order_items ON menu_item_id = menu_items.id
JOIN order_item_toppings on order_item_id = order_items.id
JOIN toppings ON topping_id = toppings.id
JOIN topping_categories ON topping_category_id = topping_categories.id
WHERE order_items.id = 1;

-- sum of topping prices on WHOLE ORDER
SELECT sum(topping_categories.price)
FROM menu_items
JOIN order_items ON menu_item_id = menu_items.id
JOIN orders ON orders.id = order_id
JOIN order_item_toppings on order_item_id = order_items.id
JOIN toppings ON topping_id = toppings.id
JOIN topping_categories ON topping_category_id = topping_categories.id
WHERE orders.id = 1;

SELECT toppings.name
FROM menu_items
LEFT JOIN menu_item_toppings ON menu_items.id = menu_item_id
WHERE menu_items.name LIKE '%Cheese Pizza%';

SELECT quantity, orders.id, menu_items.price, menu_items.name AS pizza_name, sizes.name AS size, order_items.id AS order_id, toppings.name AS topping
    FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN menu_items ON menu_item_id = menu_items.id
    JOIN sizes ON sizes.id = size_id
    JOIN order_item_toppings ON order_item_id = order_items.id
    JOIN toppings ON topping_id = toppings.id
    WHERE orders.id = $1;




/* SELECT toppings.name, topping_categories.price
FROM orders 
JOIN order_items ON topping_categories.id = topping_category_id
WHERE toppings.name NOT IN ( */

SELECT toppings.name, topping_categories.price
FROM toppings 
JOIN topping_categories ON topping_categories.id = topping_category_id
WHERE toppings.name NOT IN (

SELECT toppings.name AS included_toppings
    FROM menu_items
    LEFT JOIN menu_item_toppings ON menu_items.id = menu_item_id
    JOIN toppings ON toppings.id = topping_id
    WHERE menu_items.name LIKE '%Deluxe%'

);

SELECT id, photo_url
FROM menu_items;

