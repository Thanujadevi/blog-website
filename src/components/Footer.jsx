import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter, Linkedin, Heart, Sparkles, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address!', 'warning');
      return;
    }
    addToast('🎉 Subscribed successfully! You will receive weekly 1-minute learning digests.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-sky-400 flex items-center justify-center text-white font-bold text-lg">
                ⏱️
              </div>
              <span className="text-xl font-extrabold font-display text-white tracking-tight">
                One Minute <span className="text-brand-400">Learn</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering global minds through concise, 1-minute educational articles. Read, learn, and contribute to a world of fast micro-learning.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Home Page</Link></li>
              <li><Link to="/explore" className="hover:text-brand-400 transition-colors">Explore All Articles</Link></li>
              <li><Link to="/categories" className="hover:text-brand-400 transition-colors">Browse Categories</Link></li>
              <li><Link to="/publish" className="hover:text-brand-400 transition-colors">Write an Article</Link></li>
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">About One Minute Learn</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/categories?category=Programming" className="hover:text-brand-400 transition-colors">Programming & Code</Link></li>
              <li><Link to="/categories?category=Artificial Intelligence" className="hover:text-brand-400 transition-colors">Artificial Intelligence</Link></li>
              <li><Link to="/categories?category=Productivity" className="hover:text-brand-400 transition-colors">Productivity & Habits</Link></li>
              <li><Link to="/categories?category=Science" className="hover:text-brand-400 transition-colors">Science & Discovery</Link></li>
              <li><Link to="/categories?category=Space" className="hover:text-brand-400 transition-colors">Space & Universe</Link></li>
              <li><Link to="/categories?category=Health" className="hover:text-brand-400 transition-colors">Health & Neuroscience</Link></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Weekly Digest</h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get 5 hand-picked 1-minute articles delivered to your inbox every Monday.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-500/20 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Subscribe Now
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} One Minute Learn. Designed for micro-learners worldwide.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
