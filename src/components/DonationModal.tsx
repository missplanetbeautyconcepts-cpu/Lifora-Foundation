import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, CreditCard, CheckCircle2, Globe } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useDonation } from '@/context/DonationContext';

// Access Stripe Publishable Key
const STRIPE_KEY = (import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_KEY ? loadStripe(STRIPE_KEY) : null;

type Frequency = 'One Time' | 'Monthly' | 'Yearly';
type Currency = 'CAD' | 'USD' | 'EUR' | 'GBP';

interface DonationFormProps {
  frequency: Frequency;
  setFrequency: (f: Frequency) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  amount: number;
  setAmount: (a: number) => void;
  customAmount: string;
  setCustomAmount: (a: string) => void;
  firstName: string;
  setFirstName: (n: string) => void;
  lastName: string;
  setLastName: (n: string) => void;
  email: string;
  setEmail: (e: string) => void;
  exchangeRates: Record<string, number>;
}

function DonationFormInner({ 
  frequency, setFrequency,
  currency, setCurrency,
  amount, setAmount,
  customAmount, setCustomAmount,
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  exchangeRates 
}: DonationFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { closeModal } = useDonation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const presets = [10, 20, 50, 100, 200, 500];
  const finalAmount = customAmount ? parseFloat(customAmount) : amount;
  const cadEquivalent = currency === 'CAD' ? finalAmount : finalAmount * (exchangeRates[currency] || 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // 1. Validate form fields via Stripe Elements
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'Verification failed');
      setLoading(false);
      return;
    }

    try {
      // 2. Create Intent on Server
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: finalAmount,
          frequency, 
          currency,
          firstName,
          lastName,
          email
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // 3. Confirm Payment
      // confirmPayment works for both One-Time and Subscription (via latest_invoice)
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/impact`,
          payment_method_data: {
            billing_details: {
              name: `${firstName} ${lastName}`.trim(),
              email: email,
            },
          },
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
      } else {
        // Success handling
        // Note: Full verification happens via Webhooks asynchronously
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 px-6 animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="bg-mao-gold/20 p-4 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-mao-gold" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-mao-dark mb-4">Support Received!</h2>
        <p className="text-mao-body text-lg mb-8 max-w-md mx-auto">
          Your donation of {currency} {finalAmount.toFixed(2)} will directly help someone in need find hope and stability.
        </p>
        <button 
          onClick={closeModal}
          className="w-full max-w-xs py-4 bg-mao-dark text-white rounded-xl font-bold hover:bg-mao-blue transition-all"
        >
          Return to Site
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh] overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-thin scrollbar-thumb-gray-200">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-mao-dark leading-tight">
            Empower Lives with Every Gift
          </h2>
          <p className="text-mao-body text-sm md:text-base leading-relaxed">
            Your contribution provides immediate relief and pathways to sustainable independence for those in need.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold w-fit border border-green-100">
            <Lock className="w-3.5 h-3.5" />
            Secure Payment via Stripe
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-mao-dark uppercase tracking-wide">Frequency</label>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {(['One Time', 'Monthly', 'Yearly'] as Frequency[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                      frequency === f 
                        ? 'bg-white text-mao-dark shadow-sm' 
                        : 'text-gray-500 hover:text-mao-dark'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {presets.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-3 rounded-lg font-bold text-sm transition-all border ${
                    !customAmount && amount === amt 
                      ? 'bg-mao-blue border-mao-blue text-white' 
                      : 'border-gray-200 text-gray-600 hover:border-mao-blue hover:text-mao-blue bg-white'
                  }`}
                >
                  {currency} {amt}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(0);
                    }}
                    className="w-full p-3 pl-12 bg-white border border-gray-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-mao-blue/20 outline-none transition-all"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">{currency}</span>
                </div>
                
                <div className="relative w-28">
                  <select 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold appearance-none cursor-pointer outline-none pl-8"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as Currency)}
                  >
                    <option value="CAD">CAD</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              {currency !== 'CAD' && (
                <p className="text-[10px] text-gray-400 font-medium">
                  Approx. CA${cadEquivalent.toFixed(2)} (1 {currency} = CA${exchangeRates[currency]?.toFixed(2)})
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <label className="text-sm font-bold text-mao-dark uppercase tracking-wide">Donor Information</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="text"
              placeholder="First Name *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mao-blue/20 outline-none bg-white"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mao-blue/20 outline-none bg-white"
            />
          </div>
          <input
            required
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mao-blue/20 outline-none bg-white"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-mao-dark uppercase tracking-wide">Payment Details</label>
            <CreditCard className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
            <PaymentElement />
          </div>

          {(frequency !== 'One Time') && (
            <p className="text-[10px] text-gray-400 italic">
              Recurring payments will be billed automatically until cancelled.
            </p>
          )}
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100 md:w-80 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-mao-dark uppercase tracking-wider">Summary</h4>
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Amount</span>
              <span className="font-bold text-mao-dark">{currency} {finalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Cycle</span>
              <span className="font-bold text-mao-dark">{frequency}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
              <span className="font-bold text-mao-dark">Donation</span>
              <span className="font-bold text-mao-blue text-lg">{currency} {finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {error && <p className="text-[10px] text-red-500 font-medium text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !stripe || finalAmount <= 0 || !firstName || !email}
            className="w-full py-4 bg-mao-dark text-white rounded-xl font-bold text-sm hover:bg-mao-gold hover:text-mao-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Processing...' : `Give ${currency} ${finalAmount.toFixed(2)}`}
          </button>
        </div>
      </div>
    </form>
  );
}

export default function DonationModal() {
  const { isModalOpen, closeModal } = useDonation();
  
  const [frequency, setFrequency] = useState<Frequency>('Monthly');
  const [currency, setCurrency] = useState<Currency>('CAD');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ CAD: 1 });
  const [amount, setAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('/api/exchange-rate')
      .then(res => res.json())
      .then(data => setExchangeRates(data.rates))
      .catch(err => console.error("Exchange fetch error", err));
  }, []);

  if (!isModalOpen) return null;

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;
  const cadEquivalent = currency === 'CAD' ? finalAmount : finalAmount * (exchangeRates[currency] || 1);

  if (!STRIPE_KEY) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-mao-dark/60 backdrop-blur-sm" onClick={closeModal} />
        <div className="relative bg-white p-10 text-center space-y-6 rounded-2xl z-10 max-w-sm">
          <Lock className="w-16 h-16 text-amber-500 mx-auto" />
          <h3 className="text-xl font-bold">Stripe Key Required</h3>
          <p className="text-sm">Configure VITE_STRIPE_PUBLISHABLE_KEY to enable donations.</p>
          <button onClick={closeModal} className="w-full py-3 bg-mao-dark text-white rounded-lg font-bold">Close</button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-mao-dark/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            <Elements 
                stripe={stripePromise} 
                options={{ 
                    mode: frequency === 'One Time' ? 'payment' : 'subscription',
                    amount: Math.round(finalAmount * 100) || 1000, 
                    currency: currency.toLowerCase(),
                    appearance: { theme: 'stripe' },
                }}
            >
              <DonationFormInner 
                frequency={frequency} setFrequency={setFrequency}
                currency={currency} setCurrency={setCurrency}
                amount={amount} setAmount={setAmount}
                customAmount={customAmount} setCustomAmount={setCustomAmount}
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                email={email} setEmail={setEmail}
                exchangeRates={exchangeRates}
              />
            </Elements>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

