## Pizza Bytes

This repository contains a food ordering site was completed as a midterm project while attending Lighthouse Labs

Project by

- Adam Tranquilla - https://github.com/AdamTranquilla
- Natasha Colusso - https://github.com/NColusso
- Zach Harrison - https://github.com/zachharrison

Each member of the group worked on all aspects - front end, back-end, as well as the database.

## Features include

### Customer Facing

- A menu page for a customer that populates menu items and their price, as well as any default toppings that are included on a pizza
- When a pizza is added to the cart, taken to a secondary page with default toppings pre-selected, allowing you to add additional or remove defaults
- A cart page that will update the price based on the toppings that a user chooses and their price (defualt toppings wil not be calculated, since they are included)
- A checkout page with a price summary and fields for name, email and phone number, and will receive a text message notification upon checkout that your order will be ready in 30 minutes
- Finally you are proceeded to a success page that thanks you for your order!

### Client Facing

- After going through the login page, you can see your menu which gives you the option to edit existing menu items, updating their photo URL, name, description and price.
- An orders page where you can see a list of any orders
- Ability to click on a specific order or customer to get specific details

## Screenshots

!["Screenshot of home page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/home-page.png?raw=true)

!["Screenshot of menu page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/menu-page.png?raw=true)

!["Screenshot of the edit page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/edit-page.png?raw=true)

!["Screenshot of the cart page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/cart-page.png?raw=true)

!["Screenshot of the checkout page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/checkout-page.png?raw=true)

!["Screenshot of checked out page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/tyvm-page.png?raw=true)

!["Screenshot of restaurant login page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/rest-login-page2.png?raw=true)

!["Screenshot of menu editor page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/rest-menu-item-edit.png?raw=true)

!["Screenshot of all orders page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/rest-orders-page.png?raw=true)

!["Screenshot of an order page"](https://github.com/AdamTranquilla/Food-Pick-up-Ordering/blob/master/public/img/rest-single-order.png?raw=true)

## Getting Started

1. Create the `.env` by using `.env.example` (twilio information is user specific, so this function may need to be commented out)
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

5. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

6. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- ejs
- Twilio
- Express
- cookie-parser
