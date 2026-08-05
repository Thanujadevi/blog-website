import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Flame, Clock, Award, BookOpen, PenSquare, TrendingUp, Users, CheckCircle2 
} from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import CategoryCard from '../components/CategoryCard';
import { useArticles } from '../context/ArticleContext';
import { useAuth } from '../context/AuthContext';
import { TOP_CONTRIBUTORS } from '../data/mockArticles';

const Home = () => {
  const navigate = useNavigate();
  const { articles, categories, getRandomArticle } = useArticles();
  const { user } = useAuth();

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const trendingArticles = articles.filter(a => a.trending).slice(0, 3);
  const latestArticles = articles.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Glow Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-500/10 via-sky-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200/80 dark:border-brand-800/80 text-brand-700 dark:text-brand-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-500 animate-pulse" />
                <span>Micro-Learning Platform for Curious Minds</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Learn Something New in <span className="gradient-text">One Minute</span> or Less.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Discover concise, 250-word educational articles across Tech, Science, AI, History, and Productivity. Read fast, gain insights, and share your knowledge with a global community.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigate('/explore')}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4" /> Start Learning Now
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/publish')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-md hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-300"
                >
                  <PenSquare className="w-4 h-4 text-brand-500" /> Write an Article
                </button>
              </div>

              {/* Mini Social Proof */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Bite-sized Articles
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" /> ⏱️ Guaranteed 1-Min Read
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" /> 🔥 Streak Tracking
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-brand-500/10 space-y-5 animate-float">
                
                {/* Floating Top Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Today's 1-Min Highlight
                  </span>
                  <span className="text-xs font-semibold text-slate-400">#MicroLearn</span>
                </div>

                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-white bg-brand-600 px-2.5 py-0.5 rounded-md">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {featuredArticle.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredArticle.author.avatar}
                      alt={featuredArticle.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {featuredArticle.author.name}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/article/${featuredArticle.id}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-600 text-white font-semibold text-xs hover:bg-brand-500 transition-colors"
                  >
                    Read in 60s →
                  </button>
                </div>

              </div>

              {/* Decorative Blur Circles */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* TODAY'S FEATURED LEARN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 text-white p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-brand-400">
            <Clock className="w-64 h-64" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 inline-block">
                🌟 Article of the Day
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {featuredArticle.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                <span>By {featuredArticle.author.name}</span>
                <span>•</span>
                <span>⏱️ 1 Min Read ({featuredArticle.wordCount} words)</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigate(`/article/${featuredArticle.id}`)}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs shadow-lg transition-all"
                >
                  Read Featured Article Now
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 h-56 rounded-2xl overflow-hidden shadow-xl border border-white/10">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Trending 1-Min Reads
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Most liked and read micro-articles this week.
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Explore Popular Categories
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pick a topic and master new concepts in under 60 seconds.
            </p>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* LATEST ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Latest Micro Articles
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Freshly published community knowledge.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* TOP CONTRIBUTORS LEADERBOARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Top Community Contributors
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Celebrating authors sharing high-impact 1-minute knowledge.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_CONTRIBUTORS.map((author, index) => (
              <div
                key={author.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50"
              >
                <div className="relative">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/30"
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-[10px] flex items-center justify-center">
                    #{index + 1}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{author.name}</h4>
                  <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 block">
                    {author.badge}
                  </span>
                  <p className="text-[11px] text-slate-400">
                    {author.articlesCount} articles • {author.totalLikes} likes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
