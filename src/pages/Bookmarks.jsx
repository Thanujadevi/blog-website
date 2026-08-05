import React from 'react';
import { Link } from 'react-router-dom';
import { BookMarked } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticleContext';

const Bookmarks = () => {
  const { articles, bookmarks } = useArticles();
  const bookmarkedArticles = articles.filter(a => bookmarks.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <BookMarked className="w-7 h-7 text-indigo-500" /> Saved Bookmarks ({bookmarkedArticles.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">Quick access to your saved 1-minute reads.</p>
      </div>

      {bookmarkedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <p className="text-sm text-slate-500">No saved bookmarks yet.</p>
          <Link to="/explore" className="inline-block px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs">
            Browse Explore Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
