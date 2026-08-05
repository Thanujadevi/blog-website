import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shuffle, Home, ArrowLeft } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';
import { useToast } from '../context/ToastContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { getRandomArticle } = useArticles();
  const { addToast } = useToast();

  const handleRandomClick = () => {
    const randomArt = getRandomArticle();
    if (randomArt) {
      addToast(`🎲 Redirected to 1-minute read: "${randomArt.title.substring(0, 25)}..."`, 'info');
      navigate(`/article/${randomArt.id}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="text-8xl font-black font-display gradient-text">
        404
      </div>
      <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
        Oops! Page Not Found
      </h1>
      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
        The page you are looking for doesn't exist or was moved. Why not take 60 seconds to read a random article instead?
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20"
        >
          <Home className="w-4 h-4" /> Go to Home
        </Link>
        <button
          onClick={handleRandomClick}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <Shuffle className="w-4 h-4 text-amber-500" /> Read a Random Article
        </button>
      </div>
    </div>
  );
};

export default NotFound;
