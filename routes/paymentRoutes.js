const express = require('express');
const router = express.Router();
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent aa
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
