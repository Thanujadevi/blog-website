import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Bookmark, Clock, ArrowUpRight, MessageCircle } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const { toggleLike, toggleBookmark, likedArticles, bookmarks } = useArticles();
  const { user } = useAuth();
  const { addToast } = useToast();

  const isLiked = likedArticles.includes(article.id);
  const isBookmarked = bookmarks.includes(article.id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!user) {
      addToast('Please login to like articles!', 'warning');
      return;
    }
    const newLikedState = toggleLike(article.id);
    addToast(newLikedState ? 'Liked article ❤️' : 'Unliked article', 'info');
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (!user) {
      addToast('Please login to bookmark articles!', 'warning');
      return;
    }
    const newBookmarkedState = toggleBookmark(article.id);
    addToast(newBookmarkedState ? 'Article saved to bookmarks 🔖' : 'Removed from bookmarks', 'info');
  };

  return (
    <div
      onClick={() => navigate(`/article/${article.id}`)}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 dark:hover:shadow-brand-500/20 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Cover Image & Badges */}
        <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-900/80 text-white backdrop-blur-md">
              {article.category}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-brand-500 text-white shadow-md flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 1 Min Read
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        {/* Author info */}
        <div className="flex items-center gap-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
            }}
          />
          <div>
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {article.author.name}
            </h4>
            <span className="text-[10px] text-slate-400 block">
              {new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            aria-label="Like article"
            className={`flex items-center gap-1 text-xs transition-colors p-1.5 rounded-lg ${
              isLiked ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'text-slate-400 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
            <span>{article.likes}</span>
          </button>

          <button
            onClick={handleBookmark}
            aria-label="Bookmark article"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isBookmarked ? 'text-brand-500 bg-brand-50 dark:bg-brand-950/40' : 'text-slate-400 hover:text-brand-500'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-brand-500' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
