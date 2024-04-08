const stripe = require('stripe')('sk_test_51OyxV3CgxQYZeBXvwUFEAFd1Zt2mWRJD7bGB1jhPExltXBjgDejNzyO6YOoUd2LccN9eorFUgYxntaWhjr6T2EzH00ZmCJzNES');

export const paymentbystripe = async (req:any, res:any) => {
  try {
    const { subtotal } = req.body; // Assuming subtotalValue is sent in the request body
    if (isNaN(subtotal)) {
      throw new Error('Subtotal value is not a valid number');
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: subtotal * 100, // Convert subtotal to cents
      currency: 'usd',
      description: 'Payment for products', // You can modify the description accordingly
      metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret


    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};
