/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const router = express.Router();
const { helpers } = require("../db/query-scripts/queryMethods.js");
const { generateRandomId } = require('../generateRandomId');
const bodyParser = require("body-parser");
// const cookieSession = require('cookie-session');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieSession(
//   // { name: 'session', keys: 'somestring', cart: {}},
//   { name: 'session', keys: ["some secret here"], maxAge: 24 * 60 * 60 * 1000 }
// ));
// app.use(function(req, res, next){
//   res.locals.cart = req.session.cart;
//   next();
// });


module.exports = (db) => {
  // main menu, shows pizzas with details
  // router.get("/", (req, res) => {
  //   res.render("menu", menuBuilder());
  //   db.query(helpers.getMenu2pt0())
  //     .then((data) => {
  //       const result = menuBuilder(data.rows);
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // });

  router.get("/", (req, res) => {
    db.query(helpers.getMenu())
      .then((data) => {
        const result = data.rows;
        res.render("menu", { result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });

  // shows the 'selected' menu item and options INSERT into orders
  router.get("/edit", (req, res) => {
    res.render("edit");
    db.query(`SELECT * FROM toppings;`)
      .then((data) => {
        const result = data.rows;
        res.json({ result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  // see and remove orders item
  // option to edit => get'/edit'
  router.get("/cart", (req, res) => {
    db.query(helpers.getPizzasInOrder(), ["1"])
      .then((data) => {
        const result = data.rows;
        console.log("result: pizza orders", result);
        res.render("cart", { result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });
  // checkout confirmation
  router.get("/checkout", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const result = data.rows;
        res.render("checkout", { result });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  // option to chng_quantity/remove => post'/cart'
  // router.post("/cart", (req, res) => {
  //   db.query(`SELECT * FROM order_items;`)
  //     .then((data) => {
  //       const id = generateRandomId();
  //       const result = data.rows;
  //       const templateVars = { result, id, cart: req.session.cart };
  //       console.log(req.session.cart)
  //       // res.json({ result });
  //       res.json({ result });
  //       res.render('cart', templateVars);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.post("/cart", (req, res) => {

    // req.session['cartId'] ? 
    // req.session['cartId'] = cartId :
    // pizzaId = generateRandomId()
    // req.session['pizzaId'] = pizzaId;

    pizzas = [];

    const pizza = {
      id: pizzaId,
      name: req.body.pizza,
      size: "small",
      toppings: []
    }

    pizzas.push(pizza);

    if (req.session.cartId) {
      console.log('trueeeeee')
      cartId = req.session['cartId'];
      // pizzas.push(pizza)
      // console.log('TRUUUUUUUE');
      // // const cart = {} 
      // cart[req.session['cartId']] = {};

    } else {

      console.log('no cart')
      cartId = generateRandomId();
      req.session['cartId'] = cartId

      // const cart = {};
      // req.session.cart = cart;

    
      // req.session['pizza'] = req.body.pizza;
      // req.session['pizzaId'] = generateRandomId();
    
      // cart[cartId] = {};

      // pizzas = [];
      // pizzas.push(pizza);
    }

    // cartId = generateRandomId();
    // req.session['cartId'] = cartId
    
    // req.session['pizza'] = req.body.pizza;
    // req.session['pizzaId'] = generateRandomId();
    
    // pizzaId = generateRandomId()
    // req.session['pizzaId'] = pizzaId;
    
    
    // pizza = {
    //   id: pizzaId,
    //   name: req.body.pizza,
    //   size: "small",
    //   toppings: []
    // }
    
    // const cart = {};
    // cart[cartId] = {};

    // pizzas = [];
    // pizzas.push(pizza);

    // console.log('This is the cart ', req.session.cart);
    // console.log('This is the pizzas ', pizzas);


    // templateVars[cartId]['pizzas'] = [];
    // templateVars[cartId]['pizzas'].push(pizza);
    // stringifyed = JSON.stringify(templateVars)
    // console.log('This is the data', stringifyed);
      
      
      
      // res.render('cart', req.session.cart, pizzas);
      
  });
    
    return router;
  }
  
  /* 
  
