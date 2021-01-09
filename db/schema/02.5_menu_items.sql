DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY NOT NULL,
    restaurant_id INTEGER REFERENCES restaurants(id),
    name VARCHAR(255) NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL
);