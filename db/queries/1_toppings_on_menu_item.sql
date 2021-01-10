SELECT menu_items.name, toppings.name FROM toppings
JOIN order_item_toppings ON toppings.id = topping_id
JOIN order_items ON order_items.id = order_item_id
WHERE order_items.id = 1;
