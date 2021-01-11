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
