DROP TABLE IF EXISTS order_item_toppings CASCADE;

CREATE TABLE order_item_toppings (
    id SERIAL PRIMARY KEY NOT NULL,
    order_item_id INTEGER REFERENCES order_items(id),
    topping_id INTEGER REFERENCES toppings(id) 
);