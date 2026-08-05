import React, { useState } from 'react';
import { Mail, MessageSquare, Send, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast('Please fill out all fields.', 'warning');
      return;
    }
    addToast('Thank you! Your message has been sent to our support team.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'Why are articles limited to 250–300 words?',
      a: 'The average adult reading speed is approximately 230–250 words per minute. Limiting articles to ~250 words guarantees a true 1-minute read time.'
    },
    {
      q: 'How does the Daily Learning Streak work?',
      a: 'Every day you open and read at least one article on the platform, your streak counter increments by 1 day! Missing a day resets the streak.'
    },
    {
      q: 'Can anyone publish an article on One Minute Learn?',
      a: 'Yes! Registered users can publish concise 1-minute educational articles on any approved category.'
    },
    {
      q: 'Is One Minute Learn completely free to use?',
      a: 'Yes, 100% free for both readers and authors worldwide.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Have questions, feedback, or need help with your author profile? Send us a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="How can we help you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>

        {/* FAQs */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-500" /> Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex justify-between items-center font-bold text-xs text-slate-900 dark:text-white">
                  <span>{faq.q}</span>
                  <span className="text-brand-500">{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && (
                  <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;
