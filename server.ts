import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Stripe with the same version as your dashboard
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia',
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Webhook endpoint: MUST be defined before express.json()
  app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('❌ Webhook Secret is missing in your .env file!');
      return res.status(400).send('Webhook secret not configured');
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);
    } catch (err: any) {
      console.error(`⚠️  Webhook Signature Verification Failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`✅ Webhook Event Verified: ${event.type}`);

    try {
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const pi = event.data.object as Stripe.PaymentIntent;
          console.log(`💰 [Success] One-time payment for ${pi.amount/100} ${pi.currency.toUpperCase()}`);
          break;
        }
        case 'invoice.payment_succeeded': {
          const invoice = event.data.object as any;
          console.log(`📈 [Success] Subscription renewal for ${invoice.customer_email}`);
          // Update customer status to 'Active' in your DB here
          break;
        }
        case 'invoice.payment_failed': {
          const invoice = event.data.object as any;
          console.error(`🚨 [Failed] Payment for ${invoice.customer_email}`);
          // Send reminder email or deactivate status
          break;
        }
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          console.log(`🗑️ [Cancelled] Subscription ${subscription.id}`);
          break;
        }
      }
    } catch (err: any) {
      console.error('Error processing event logic:', err);
    }

    res.json({ received: true });
  });

  app.use(express.json());

  // Exchange rates for the frontend
  app.get('/api/exchange-rate', (req, res) => {
    const rates: Record<string, number> = {
      'USD': 1.35,  
      'EUR': 1.45,  
      'GBP': 1.70,  
      'CAD': 1.00
    };
    res.json({ rates, base: 'CAD' });
  });

  // Unified Donation Endpoint
  app.post('/api/donate', async (req, res) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: 'Stripe Secret Key is missing.' });
    }

    try {
      const { amount, frequency, currency, firstName, lastName, email } = req.body;

      // Basic validation
      if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
      if (!email) return res.status(400).json({ error: 'Email is required' });

      // 1. Get or Create Customer
      const customers = await stripe.customers.list({ email, limit: 1 });
      let customer = customers.data[0];
      if (!customer) {
        customer = await stripe.customers.create({
          email,
          name: `${firstName} ${lastName}`.trim(),
          metadata: { firstName, lastName }
        });
      }

      // 2. Branch logic based on frequency
      if (frequency === 'One Time') {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          currency: currency.toLowerCase(),
          customer: customer.id,
          receipt_email: email,
          metadata: { frequency, firstName, lastName },
          setup_future_usage: 'off_session', // Optional: save card for later
        });

        return res.json({ 
          clientSecret: paymentIntent.client_secret, 
          type: 'payment' 
        });
      } else {
        // Recurring: Monthly or Yearly
        
        // 1. Dynamic Product/Price Setup
        // In a real prod environment, you'd likely use fixed Price IDs
        let product;
        const products = await stripe.products.list({ limit: 100 });
        product = products.data.find(p => p.name === 'Donation');
        if (!product) {
          product = await stripe.products.create({ name: 'Donation' });
        }

        const price = await stripe.prices.create({
          unit_amount: Math.round(amount * 100),
          currency: currency.toLowerCase(),
          recurring: { interval: frequency === 'Monthly' ? 'month' : 'year' },
          product: product.id,
        });

        // 2. Create Subscription
        // payment_behavior: 'default_incomplete' ensures we get a PaymentIntent to confirm on the frontend
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: price.id }],
          payment_behavior: 'default_incomplete',
          payment_settings: { save_default_payment_method: 'on_subscription' },
          expand: ['latest_invoice.payment_intent'],
          metadata: { frequency, firstName, lastName },
        });

        const invoice = subscription.latest_invoice as any;
        const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent;

        if (!paymentIntent) {
          throw new Error('Could not create payment intent for subscription');
        }

        return res.json({ 
          clientSecret: paymentIntent.client_secret, 
          subscriptionId: subscription.id,
          type: 'subscription' 
        });
      }
    } catch (error: any) {
      console.error('Stripe /api/donate error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Serve Frontend
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
