$(document).ready(function() {

  $("li:first-child").addClass("first");
  $("li:last-child").addClass("last");
  
  $('[href="#"]').attr("href", "javascript:;");
  $('.menu-Bar').click(function() {
      $(this).toggleClass('open');
      $('.menuWrap').toggleClass('open');
      $('body').toggleClass('ovr-hiddn');
      $('body').toggleClass('overflw');
  });

 $('.index-slider').slick({
      dots: true,
      arrows: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
      {
          breakpoint: 825,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              arrows:false
          }
      },
      ]
  });




// cart
  var shoppingCart = (function () {

    cart = [];

    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }

    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
      cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
      loadCart();
    }


    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
    return obj;
  })();


  // Add item
  $('.btn-a').click(function (event) {
    // alert('working');
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });

  // Clear items
  $('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
  });


  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>"
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "</div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = "
        + "<td>" + cartArray[i].total + "</td>"
        + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }

  // Delete item button

  $('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })

  // Item count input
  $('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  displayCart();


// search function
$('#search_field').on('keyup', function() {
  var value = $(this).val();
  var patt = new RegExp(value, "i");

  $('.tab_content').find('.col-lg-3').each(function() {
    var $table = $(this);
    
    if (!($table.find('.featured-item').text().search(patt) >= 0)) {
      $table.not('.featured-item').hide();
    }
    if (($table.find('.col-lg-3').text().search(patt) >= 0)) {
      $(this).show();
      document.getElementById('not_found').style.display = 'none';
    } else {
      document.getElementById("not_found").innerHTML = " Product not found..";
      document.getElementById('not_found').style.display = 'block';
    }
    
  });

  
});

// move to top
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


function onvalue(){
let values = document.forms["form_value"]["fname"].value;
document.getElementById("head_para").innerHTML = values;

if (values == form_values){

}else{
  alert("form Must be fill")
}

return false;
}



// move to top
var btn = $('#button');

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


});

// login_form
function hide_form(){
  document.getElementById("login").style.display="none";
  document.getElementById("sign_up").style.display="block";
}
function hide_form2(){
  document.getElementById("sign_up").style.display="none";
  document.getElementById("login").style.display="block";
}


// form custon validation
function onvalue(){
  let values = document.forms["form_newsletter"]["Subscribe"].value;
  // document.getElementById("newsletter_message").innerHTML = values;
  if (values == ""){
    alert("Filled can't be empty");
    return false;
  }if (values == values){
    alert("Thanks for your Subscribtion");
    return false;
  }
  }

  function onlogin(){
    let values = document.forms["form_login"]["User_Name","Password"].value;
    // document.getElementById("newsletter_message").innerHTML = values;
    if (values == ""){
      alert("Please filled out UserName & Password");
      return false;
    }if (values == values){
      alert("You are WellCome !");
      return false;
    }
    }


    function on_submit(){
      let values = document.forms["form_submit"]["First_name","Last_name","Email_address","Password","Confirm_Password","country"].value;
      // document.getElementById("newsletter_message").innerHTML = values;
      if (values == ""){
        alert("Please filled out Form");
        return false;
      }if (values == values){
        alert("Thank You! Your Profile has been created");
        return false;
      }
      }

      function oncheck(){
        let values = document.forms["form_checkout"]["fname","lname","lemail","ltel","lprovince","lcity","laddress,","lpostcode","payment"].value;
        // document.getElementById("newsletter_message").innerHTML = values;
        if (values == ""){
          alert("Please filled out Form");
          return false;
        }if (values == values){
            window.open("thankyou.html");
          return false;
        }
      }

  