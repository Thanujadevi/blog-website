import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Zap, Users, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          Our Philosophy
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-display text-slate-900 dark:text-white">
          Knowledge Belongs in <span className="gradient-text">1-Minute</span> Fits
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          In an era of information overload, One Minute Learn turns micro-moments into powerful daily learning habits.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-500 flex items-center justify-center text-xl font-bold">
            ⏱️
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Concise 250-Word Standard</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every article is strict to 250-300 words—focused on a single core takeaway without unnecessary fluff.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-500 flex items-center justify-center text-xl font-bold">
            🔥
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Daily Learning Habits</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our daily streak system incentivizes users to expand their minds every single day, even during a quick coffee break.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center text-xl font-bold">
            🌐
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Community Driven</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Anyone can publish articles and share their expertise in code, AI, space, productivity, and science with learners worldwide.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-600 p-8 sm:p-12 text-white text-center space-y-4 shadow-2xl">
        <h2 className="text-3xl font-extrabold font-display">Ready to Start Micro-Learning?</h2>
        <p className="text-sm text-brand-100 max-w-xl mx-auto">
          Join thousands of global learners reading 1-minute articles every day.
        </p>
        <button
          onClick={() => navigate('/explore')}
          className="px-6 py-3 rounded-xl bg-white text-brand-600 font-bold text-xs shadow-lg hover:bg-brand-50 transition-colors"
        >
          Explore All Articles Now →
        </button>
      </div>

    </div>
  );
};

export default About;
