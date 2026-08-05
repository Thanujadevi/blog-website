import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Flame, BookMarked, FileText, PenSquare, Clock, Heart, 
  Trash2, Edit3, Shield, Calendar, Sparkles, CheckCircle2 
} from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticleContext';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, loginAsDemoUser } = useAuth();
  const { articles, drafts, bookmarks, deleteArticle, deleteDraft } = useArticles();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('published'); // published, bookmarks, drafts, history
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(user ? user.bio : '');

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-950 flex items-center justify-center mx-auto text-brand-500 text-3xl">
          👤
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Profile Access</h2>
        <p className="text-xs text-slate-500">Please log in or sign up to view your learning streak, published articles, drafts, and saved bookmarks.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/login?tab=signup')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/explore')}
            className="px-5 py-2.5 rounded-xl bg-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white font-semibold text-xs"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

  const myArticles = articles.filter(a => a.author.name === user.name || a.author.id === user.id);
  const myBookmarks = articles.filter(a => bookmarks.includes(a.id));
  const totalLikesReceived = myArticles.reduce((acc, a) => acc + (a.likes || 0), 0);

  const handleSaveBio = () => {
    updateProfile({ bio: bioInput });
    setIsEditingBio(false);
    addToast('Profile bio updated!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-brand-500/30 shadow-lg"
          />

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <span className="px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-bold uppercase">
                {user.role === 'admin' ? '🛡️ Admin' : '👤 Micro Learner'}
              </span>
            </div>

            {isEditingBio ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-300 dark:border-slate-700"
                />
                <button
                  onClick={handleSaveBio}
                  className="px-3 py-1.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <p className="text-xs text-slate-600 dark:text-slate-400">{user.bio}</p>
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="text-slate-400 hover:text-brand-500 text-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Joined {user.joinedDate || '2026-01-15'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-bold text-rose-500">
                <Flame className="w-4 h-4 fill-rose-500" /> {user.streak || 1} Day Streak
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/publish')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20"
          >
            <PenSquare className="w-4 h-4" /> New Article
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
            <span className="text-2xl font-black text-brand-600 dark:text-brand-400 block">{myArticles.length}</span>
            <span className="text-xs font-medium text-slate-500">Published</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
            <span className="text-2xl font-black text-rose-500 block">{totalLikesReceived}</span>
            <span className="text-xs font-medium text-slate-500">Likes Received</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
            <span className="text-2xl font-black text-indigo-500 block">{myBookmarks.length}</span>
            <span className="text-xs font-medium text-slate-500">Bookmarks</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
            <span className="text-2xl font-black text-amber-500 block">{drafts.length}</span>
            <span className="text-xs font-medium text-slate-500">Saved Drafts</span>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('published')}
          className={`pb-3 transition-all ${
            activeTab === 'published'
              ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          My Published ({myArticles.length})
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-3 transition-all ${
            activeTab === 'bookmarks'
              ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Bookmarks ({myBookmarks.length})
        </button>

        <button
          onClick={() => setActiveTab('drafts')}
          className={`pb-3 transition-all ${
            activeTab === 'drafts'
              ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Drafts ({drafts.length})
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 transition-all ${
            activeTab === 'history'
              ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Reading History ({(user.readingHistory || []).length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'published' && (
        myArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myArticles.map(article => (
              <div key={article.id} className="relative group">
                <ArticleCard article={article} />
                <button
                  onClick={() => {
                    deleteArticle(article.id);
                    addToast('Article deleted', 'info');
                  }}
                  className="absolute top-6 right-6 p-2 rounded-lg bg-rose-600 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">
            You haven't published any 1-minute articles yet. <Link to="/publish" className="text-brand-600 font-bold underline">Write one now!</Link>
          </div>
        )
      )}

      {activeTab === 'bookmarks' && (
        myBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookmarks.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">
            No saved bookmarks yet. Browse <Link to="/explore" className="text-brand-600 font-bold underline">Explore</Link> to save articles!
          </div>
        )
      )}

      {activeTab === 'drafts' && (
        drafts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {drafts.map(draft => (
              <div
                key={draft.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                      Draft • {draft.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Updated {new Date(draft.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{draft.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{draft.content || 'Empty draft...'}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => navigate(`/publish?draftId=${draft.id}`)}
                    className="px-4 py-1.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
                  >
                    Resume Editing
                  </button>
                  <button
                    onClick={() => {
                      deleteDraft(draft.id);
                      addToast('Draft deleted', 'info');
                    }}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">
            No saved drafts.
          </div>
        )
      )}

      {activeTab === 'history' && (
        <div className="space-y-3">
          {(user.readingHistory || []).map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/article/${item.articleId}`)}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-brand-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</span>
              </div>
              <span className="text-[10px] text-slate-400">
                {new Date(item.readAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Profile;
