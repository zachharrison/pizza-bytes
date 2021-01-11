-- Currently have 4 orders so need order items for 4 orders

INSERT INTO order_items (order_id, size_id, quantity, menu_item_id)
VALUES (1, 3, 1, 1),
(1, 2, 1, 2), 
(2, 3, 2, 1),
(3, 2, 1, 3),
(3, 2, 1, 4), 
(4, 1, 3, 1), 
(4, 2, 2, 2);