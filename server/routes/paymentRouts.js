const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = (app) => {
  app.post('/api/stripe', authMiddleware, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credit',
      source: req.body.token.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.json(user);
  });
};
