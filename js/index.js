/*
$('.input-cart-number').on('keyup change', function(){
  $t = $(this);
  
  if ($t.val().length > 3) {
    $t.next().focus();
  }
  
  var card_number = '';
  $('.input-cart-number').each(function(){
    card_number += $(this).val() + ' ';
    if ($(this).val().length == 4) {
      $(this).next().focus();
    }
  })
  
  $('.credit-card-box .number').html(card_number);
});
*/

$('#card-holder').on('keyup change', function(){
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-holder').on('keyup change', function(){
  $t = $(this);
  $('.credit-card-box .card-holder div').html($t.val());
});

$('#card-expiration-month, #card-expiration-year').change(function(){
  m = $('#card-expiration-month option').index($('#card-expiration-month option:selected'));
  m = (m < 10) ? '0' + m : m;
  y = $('#card-expiration-year').val().substr(2,2);
  $('.card-expiration-date div').html(m + '/' + y);
})

$('#card-ccv').on('focus', function(){
  $('.credit-card-box').addClass('hover');
}).on('blur', function(){
  $('.credit-card-box').removeClass('hover');
}).on('keyup change', function(){
  $('.ccv div').html($(this).val());
});

$('.card-brand-input').on('click',function(){
  $t = $(this);
  img = $t.siblings('img').clone();
  $('.logo').html(img);
});

/*--------------------
CodePen Tile Preview
--------------------*/
setTimeout(function(){
  $('#card-ccv').focus().delay(1000).queue(function(){
    $(this).blur().dequeue();
  });
}, 500);

$('.bg-picker-input').click(function(){
  elem = $(this).attr('id');
  $('.bg-picker').hide();
  $('.'+elem).show();
});

$('.plain-color').click(function(){
  color_txt = $(this).val();
  color = $('.colorPicker label.'+color_txt).css('background-color');
  $('.credit-card-box .front, .credit-card-box .back').css('background',color);
});


/* Image upload */
var loadFile = function(event) {
  var reader = new FileReader();
  reader.onload = function(){
    var output = document.getElementById('img-preview');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};

$('.bg-image').click(function(){
  $('.credit-card-box .front::before').css('background','none');
  $('.credit-card-box .back::before').css('background','none');
  $('.bg-image-div').toggle();
});

/* Currency */
function updateSymbol(e){
  var selected = $(".currency-selector option:selected");
  $(".currency-symbol").text(selected.data("symbol"))
  $(".currency-amount").prop("placeholder", selected.data("placeholder"))
  $('.currency-addon-fixed').text(selected.text())
}

$(".currency-selector").on("change", updateSymbol)

updateSymbol()



/* Stripe */

// Create a Stripe client.
var stripe = Stripe('pk_test_OMQPZa6KHK9Vezj2gtCkdGkW');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      // stripeTokenHandler(result.token);

      var data = JSON.stringify( $("#payment-form").serializeArray() );
      console.log(data);      
      console.log($("#payment-form").serializeArray()); 
      data.token = result.token;
      console.log(data);      

      $.post( "charge.php", data );
    }
  });
});

/* End stripe payment */