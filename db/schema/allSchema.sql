DROP TABLE IF EXISTS customers CASCADE; 
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS sizes CASCADE;
DROP TABLE IF EXISTS topping_categories CASCADE;
DROP TABLE IF EXISTS toppings CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS order_item_toppings CASCADE;


CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY NOT NULL,
    restaurant_id INTEGER REFERENCES restaurants(id),
    name VARCHAR(255) NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE, 
  order_date TIMESTAMP NOT NULL DEFAULT NOW()::timestamp,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  pickup_time TIMESTAMP NOT NULL DEFAULT now()::timestamp + interval '30 minutes',
  completed BOOLEAN DEFAULT 'FALSE'
); 

CREATE TABLE sizes (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE topping_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE toppings (
    id SERIAL PRIMARY KEY NOT NULL,
    topping_category_id INTEGER REFERENCES topping_categories(id),
    name VARCHAR(255) NOT NULL
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY NOT NULL,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    size_id INTEGER REFERENCES sizes(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity SMALLINT NOT NULL DEFAULT 1
);

CREATE TABLE order_item_toppings (
    id SERIAL PRIMARY KEY NOT NULL,
    order_item_id INTEGER REFERENCES order_items(id),
    topping_id INTEGER REFERENCES toppings(id) 
);