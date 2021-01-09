DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE, 
  order_date TIMESTAMP NOT NULL DEFAULT NOW()::timestamp,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  pickup_time TIMESTAMP NOT NULL DEFAULT now()::timestamp + interval '30 minutes',
  completed BOOLEAN DEFAULT 'FALSE'
); 


