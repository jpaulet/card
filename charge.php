<?php
require('./lib/init.php');

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
\Stripe\Stripe::setApiKey("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
$token = $_POST['stripeToken'];
$charge = \Stripe\Charge::create([
    'amount' => 5000,
    'currency' => 'usd',
    'description' => 'Personalized Card Service',
    'source' => $token,
]);

?>
