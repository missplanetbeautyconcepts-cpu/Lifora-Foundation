/// <reference types="vite/client" />
import React, { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactFormSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('volunteer');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // EmailJS Keys from environment
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const isConfigured = !!(serviceId && templateId && publicKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const templateParams = {
      from_name: name,
      from_email: email,
      phone_number: phone,
      contact_reason: reason,
      message_content: message,
    };

    try {
      if (isConfigured) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        // Fallback simulation mode
        console.info(
          "EmailJS is not fully configured (Variables needed: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY). Simulating successful form submission."
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setSubmitted(true);
    } catch (error: any) {
      console.error('EmailJS submission failure:', error);
      setErrorMessage(
        error?.text || error?.message || 'Failed to submit message through EmailJS. Please check your credentials.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-mao-cream" id="contact-form">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection>
          <div className="bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
            {/* Design accents */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-mao-blue via-mao-blue-hover to-mao-gold" />
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 space-y-6 max-w-lg mx-auto"
                >
                  <div className="w-18 h-18 rounded-full bg-green-50 flex items-center justify-center text-green-500 border border-green-100 mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-mao-dark">Thank You, {name}!</h3>
                    <p className="text-sm text-mao-muted leading-relaxed">
                      Your request regarding <span className="font-bold text-mao-blue text-xs uppercase bg-mao-blue/5 px-2.5 py-1 rounded-md">{reason}</span> support has been logged. Our coordinators will review your details and reach out to you via <span className="font-medium text-mao-dark">{email}</span> or phone shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setReason('volunteer');
                      setMessage('');
                    }}
                    className="px-8 py-3 bg-mao-blue hover:bg-mao-blue-hover text-white text-xs font-bold rounded-xl transition-all shadow-md transform active:scale-95 duration-200 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SectionHeader
                    title="Get in Touch"
                    subtitle="Have a question, want to volunteer, or discuss a strategic partnership? Fill out the details below."
                    centered
                  />

                  <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-bold text-mao-dark uppercase tracking-wider">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/15 outline-none text-sm transition-all text-mao-dark"
                          placeholder="E.g. John Doe"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-bold text-mao-dark uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/15 outline-none text-sm transition-all text-mao-dark"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-bold text-mao-dark uppercase tracking-wider">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/15 outline-none text-sm transition-all text-mao-dark"
                          placeholder="E.g. +1 (555) 000-0000"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-bold text-mao-dark uppercase tracking-wider">Reason for Contact</label>
                        <select
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/15 outline-none text-sm font-medium transition-all text-mao-dark cursor-pointer appearance-none"
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23111827\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                        >
                          <option value="volunteer">Volunteer</option>
                          <option value="support">Support</option>
                          <option value="enquiry">Enquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-xs font-bold text-mao-dark uppercase tracking-wider">Your Message / Additional Notes (Optional)</label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/15 outline-none text-sm transition-all h-32 resize-none text-mao-dark"
                        placeholder="Tell us more about how we can collaborate..."
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-left text-red-600 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Submitting Failed</p>
                          <p className="text-xs opacity-90">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 space-y-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-mao-blue text-white font-bold text-base rounded-xl shadow-md shadow-mao-blue/10 hover:shadow-lg hover:shadow-mao-blue/15 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      {/* Subtle status indicator */}
                      <div className="flex justify-center">
                        {isConfigured ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Live EmailJS Mode Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-amber-50/50 text-amber-700 border border-amber-100/60">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                            EmailJS Simulation Mode (Requires environment variables)
                          </span>
                        )}
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
