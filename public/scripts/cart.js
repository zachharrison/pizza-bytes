const createCart = function() {

  // SAVE ITEM TO SESSION STORAGE ON ORDER CLICK
  $('.btn').click(function(e){
    
    if (sessionStorage.cart) {
      cart = JSON.parse(sessionStorage.getItem('cart'));
    } else {
      cart = {};
    }

    if (cart[$(this).attr("value")]) {
      cart[$(this).attr("value")]['quantity'] += 1;
    } else {
      cart[$(this).attr("value")] = { name: $(this).attr("value"), quantity: 1 };
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

  });

  // RETURN CART OBJECT FROM SESSION STORAGE
  cart = sessionStorage.getItem('cart');
  return JSON.parse(cart)
  
};

const myCart = createCart();
// console.log(myCart);

// module.exports = myCart;

// DOCUMENT LOADED
$(document).ready(function() {

  createCart();

});
