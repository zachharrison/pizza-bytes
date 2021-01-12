const createCart = function() {

  $('#add-btn').click(function(e){
    console.log('New Item added to the cart!!!');

    console.log($(this).parent().val());
    // const selectedPizza = 

    // sessionStorage.setItem('Pizza', )

  });

};



/************************************************************
                    DOCUMENT LOADED
*************************************************************/
$(document).ready(function() {

  createCart();

});