/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const router = express.Router();
const { helpers } = require("../db/query-scripts/queryMethods.js");
const { menuBuilder } = require("../db/query-scripts/menu-queries.js");
const { generateRandomId } = require('../generateRandomId');
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieSession(
  // { name: 'session', keys: 'somestring', cart: {}},
  { name: 'session', keys: ["some secret here"], maxAge: 24 * 60 * 60 * 1000 }
));
app.use(function(req, res, next){
  res.locals.cart = req.session.cart;
  next();
});


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

    db.query(helpers.getMenu2pt0())
      .then((data) => {
        const templateVars = {
          result: menuBuilder(data.rows),
        };
        res.render("menu", templateVars);
        console.log('===================>', templateVars);
        for (const pizza in templateVars.result) {
          console.log('pizza----->', pizza);

        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.message });
      });
  });
  /*   router.get("/", (req, res) => {
      db.query(helpers.getMenu())
        .then((data) => {
          const result = data.rows;
          res.render("menu", { result });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: err.message });
        });
    }); */

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

    // const pizzaId = generateRandomId();
    // const templateVars = { id, cart: req.session.cart };


    // if (req.session) {

    //   cartId = req.session["cartId"];

    // } else {

    //   cartId = generateRandomId();
    //   req.session['cartId'] = cartId

    // }

    // req.session['cartId'] ?
    // req.session['cartId'] = cartId :
    pizzaId = generateRandomId()
    req.session['pizzaId'] = pizzaId;

    const pizza = {
      id: pizzaId,
      name: req.body.pizza,
      size: "small",
      toppings: []
    }

    if (req.session['cartId']) {

      req.session['cartId'] = cartId;
      pizzas.push(pizza)
      console.log('TRUUUUUUUE');
      const cart = req.session['cart'];

    } else {

      cart = {};

      cartId = generateRandomId();
      req.session['cartId'] = cartId

      req.session['pizza'] = req.body.pizza;
      req.session['pizzaId'] = generateRandomId();

      cart[cartId] = {};

      pizzas = [];
      pizzas.push(pizza);
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

    console.log('This is the cart ', cart);
    console.log('This is the pizzas ', pizzas);
    // templateVars[cartId]['pizzas'] = [];
    // templateVars[cartId]['pizzas'].push(pizza);
    // stringifyed = JSON.stringify(templateVars)
    // console.log('This is the data', stringifyed);

    // for (const prop in templateVars) {
      //   console.log('This is the cart id ', templateVars[cartId]);
      //   console.log('This is the pizzas array ', templateVars[cartId]['pizzas']);
      //   templateVars[cartId]['pizzas'].forEach(element => console.log('This is every pizza in the array ', element));


      // }



      res.render('cart', req.session.cart, pizzas);

  });

    return router;
  }

  /*

  This is the cart id  { pizzas:
    [ { id: 'e8r3qX',
    name: 'Classic Cheese Pizza',
    size: 'small',
    toppings: [] } ] }
    This is the pizzas array  [ { id: 'e8r3qX',
    name: 'Classic Cheese Pizza',
    size: 'small',
    toppings: [] } ]
    This is every pizza in the array  { id: 'e8r3qX',
    name: 'Classic Cheese Pizza',
    size: 'small',
    toppings: [] }



    */
   // req.session['pizza'] = req.body.pizza;
   //     req.session['pizzaId'] = generateRandomId();
   //     req.session['cartId'] = generateRandomId();
   //     const cartId = req.session['cartId'];
   //     const pizzaId = req.session['pizzaId'];
   //     cartId = {}
   //     templateVars[cartId] = {};
   //     templateVars[cartId]['pizzas'] = [];
   //       const pizza = {
     //       id: pizzaId,
     //       name: req.body.pizza,
     //       size: "small",
     //       toppings: []
     //     }
     //     templateVars[cartId]['pizzas'].push(pizza)
     // This is the templateVars  { cartId: { pizzas: [ [Object] ] } }=



     // randomCartId: {
   //   pizzas : [
   //     {
   //       id: randomPizzaId,
   //       name: pepperoni,
   //       size: small,
   //       toppings: ['pepperoni', 'mozzarella'],
   //     },
   //   ]
   // }




// req.session["cart"]["pizzas"]
// req.session["user_id"] = id;
// res.redirect("/urls");

// { name: 1, keys: 'somestring', cart: { } }

// cartRandomID {
//   pizzaRandomID {
//     name: cheese pizza,
//     size: lg,
//     toppings: [feta, sausuage]
//   },
//   pizzaRandomID {
//     etc
//   }

// }


// cart {
//   unique_cart_id: {
//     pizzas : [
//     {
//       name: pepperoni,
//       size: small,
//       mozzarella: true,
//       chedder: false,
//       feta: false,
//       pepperoni: true,
//     },
//       { //options 2
//         name: custom
//       }
//     ]
//   }
// }

// randomCartId: {
//   pizzas : [
//     {
//       id: randomPizzaId,
//       name: pepperoni,
//       size: small,
//       toppings: ['pepperoni', 'mozzarella'],
//     },
//   ]
// }
