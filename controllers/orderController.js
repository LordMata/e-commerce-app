const { format } = require('date-fns');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res, next) => {
  const { userId, cartItems } = req.body;

  const orderDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  
  try {
    const order = await createOrder(userId, cartItems, orderDate);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const processPayment = async (req, res, next) => {
    const { amount, token } = req.body; 
  
    try {
      const charge = await stripe.charges.create({
        amount: amount * 100, 
        currency: 'usd',
        source: token,
        description: 'Order payment',
      });
  
      res.status(201).json({ success: true, charge });
    } catch (error) {
      next(error);
    }
  };

  // TODO: /api/orders/pay endpoint