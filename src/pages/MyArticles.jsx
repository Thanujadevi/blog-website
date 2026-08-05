import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Plus, Trash2 } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticleContext';
import { useToast } from '../context/ToastContext';

const MyArticles = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { articles, deleteArticle } = useArticles();
  const { addToast } = useToast();

  const myArticles = user ? articles.filter(a => a.author.name === user.name || a.author.id === user.id) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
            My Published Articles
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage all your 1-minute contributions.</p>
        </div>
        <button
          onClick={() => navigate('/publish')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-md"
        >
          <Plus className="w-4 h-4" /> Create Article
        </button>
      </div>

      {myArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myArticles.map(article => (
            <div key={article.id} className="relative group">
              <ArticleCard article={article} />
              <button
                onClick={() => {
                  deleteArticle(article.id);
                  addToast('Article deleted', 'info');
                }}
                className="absolute top-6 right-6 p-2 rounded-lg bg-rose-600 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20"
                title="Delete article"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <p className="text-sm text-slate-500">You haven't published any articles yet.</p>
          <button
            onClick={() => navigate('/publish')}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
          >
            Publish Your First 1-Min Article
          </button>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
