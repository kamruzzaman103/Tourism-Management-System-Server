const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51RSk1kQa5zhTgXmMkyFiy9bce2y8a9FkG8YZuJD1k2btQWcIbckr9XJJDOCsscAMrziYelmA2dbeL7cK3AcDHKor00gSYmeDWk');

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    payment_method_types: ['card']
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
