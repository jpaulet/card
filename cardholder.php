// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
\Stripe\Stripe::setApiKey("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

$cardholder = \Stripe\Issuing\Cardholder::create([
    'name' => 'Jenny Rosen',
    'email' => 'jenny.rosen@example.com',
    'phone_number' => '+18008675309',
    'status' => 'active',
    'type' => 'individual',
    'billing' => [
        'name' => 'Jenny Rosen',
        'address' => [
            'line1' => '1234 Main Street',
            'city' => 'San Francisco',
            'state' => 'CA',
            'postal_code' => '94111',
            'country' => 'US',
        ],
    ],
]);