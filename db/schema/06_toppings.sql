DROP TABLE IF EXISTS toppings;

CREATE TABLE toppings (
    id SERIAL PRIMARY KEY NOT NULL,
    topping_category_id INTEGER REFERENCES topping_categories(id),
    name VARCHAR(255) NOT NULL,
    menu_item_id INTEGER REFERENCES menu_items(id)
);
