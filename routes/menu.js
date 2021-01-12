/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require("express");
const router = express.Router();
const { helpers } = require("../db/query-scripts/queryMethods.js");
<<<<<<< HEAD
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

=======
/* const { menuBuilder } = require("../db/query-scripts/menu-queries.js"); */
>>>>>>> b2e8079f3151e380a8304fc39f14fb23fed8e2f3

module.exports = (db) => {
  // main menu, shows pizzas with details
  router.get("/", (req, res) => {
    res.render("menu", menuBuilder());
    db.query(helpers.getMenu2pt0())
      .then((data) => {
        const result = menuBuilder(data.rows);
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
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

    const id = generateRandomId();
    // const templateVars = { id, cart: req.session.cart };
    
    req.session['pizza'] = req.body.myBtn
    
    const templateVars = { pizzaName: req.session.pizza }
    

    console.log('This is the req.session.pizza ', req.session.pizza);
    // console.log('This is the req.body.test ', req.body.myBtn);
    res.render('cart', templateVars);
    
  });

  return router;
}



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
