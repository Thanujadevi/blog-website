import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, BookMarked, FileText, PenSquare, Trash2, Edit3, Calendar, Check, X,
  Camera, Upload, Link as LinkIcon
} from 'lucide-react';
import ArticleCard from '../components/ArticleCard';
import { useAuth, SIMPLE_DEFAULT_AVATAR } from '../context/AuthContext';
import { useArticles } from '../context/ArticleContext';
import { useToast } from '../context/ToastContext';
import { PRESET_AVATARS } from '../data/presetAvatars';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, loginAsDemoUser } = useAuth();
  const { articles, drafts, bookmarks, deleteArticle, deleteDraft } = useArticles();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('published'); // published, bookmarks, drafts
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(user ? user.bio : '');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-950 flex items-center justify-center mx-auto text-brand-600 dark:text-brand-400">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">User Profile</h2>
          <p className="text-xs text-slate-500">Log in to view your profile, manage your published articles, saved bookmarks, and drafts.</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => loginAsDemoUser()}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-sm transition-colors"
          >
            Log In as Demo User
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const myArticles = articles.filter(a => a.author.name === user.name || a.author.id === user.id);
  const myBookmarks = articles.filter(a => bookmarks.includes(a.id));

  const handleSaveBio = () => {
    updateProfile({ bio: bioInput });
    setIsEditingBio(false);
    addToast('Bio updated successfully', 'success');
  };

  const handleSelectAvatar = (newAvatarUrl) => {
    updateProfile({ avatar: newAvatarUrl });
    setIsAvatarModalOpen(false);
    addToast('Profile picture updated & saved!', 'success');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addToast('Please select an image smaller than 2MB', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSelectAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomUrlSubmit = (e) => {
    e.preventDefault();
    if (customAvatarUrl.trim()) {
      handleSelectAvatar(customAvatarUrl.trim());
      setCustomAvatarUrl('');
    }
  };

  const avatarFallback = SIMPLE_DEFAULT_AVATAR;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Simple Profile Header Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          
          {/* Profile Picture with Camera Icon Overlay */}
          <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
            <img
              src={user.avatar || avatarFallback}
              alt={user.name}
              onError={(e) => { e.target.onerror = null; e.target.src = avatarFallback; }}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-brand-500/20 shadow-sm group-hover:opacity-90 transition-all"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-brand-600 text-white shadow-md hover:bg-brand-500 transition-colors"
              title="Change Profile Picture"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
                {user.role === 'admin' ? 'Admin' : 'Member'}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>

            {/* Bio section */}
            {isEditingBio ? (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  placeholder="Enter your bio..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <button
                  onClick={handleSaveBio}
                  className="p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-500 transition-colors"
                  title="Save bio"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition-colors"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "{user.bio || 'No bio added yet.'}"
                </p>
                <button
                  onClick={() => {
                    setBioInput(user.bio || '');
                    setIsEditingBio(true);
                  }}
                  className="text-slate-400 hover:text-brand-500 p-0.5 transition-colors"
                  title="Edit bio"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-slate-400 pt-1">
              <Calendar className="w-3 h-3" />
              <span>Joined {user.joinedDate || '2026-01-15'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-brand-500" /> Change Pic
            </button>

            <button
              onClick={() => navigate('/publish')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-sm transition-colors"
            >
              <PenSquare className="w-3.5 h-3.5" /> New Article
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center">
            <span className="text-xl font-bold text-slate-900 dark:text-white block">{myArticles.length}</span>
            <span className="text-[11px] text-slate-500">Published</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center">
            <span className="text-xl font-bold text-slate-900 dark:text-white block">{myBookmarks.length}</span>
            <span className="text-[11px] text-slate-500">Bookmarks</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center">
            <span className="text-xl font-bold text-slate-900 dark:text-white block">{drafts.length}</span>
            <span className="text-[11px] text-slate-500">Drafts</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('published')}
          className={`pb-2.5 transition-colors flex items-center gap-1.5 ${
            activeTab === 'published'
              ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>My Articles ({myArticles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-2.5 transition-colors flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>Bookmarks ({myBookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('drafts')}
          className={`pb-2.5 transition-colors flex items-center gap-1.5 ${
            activeTab === 'drafts'
              ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 font-bold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <PenSquare className="w-3.5 h-3.5" />
          <span>Drafts ({drafts.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'published' && (
        myArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myArticles.map(article => (
              <div key={article.id} className="relative group">
                <ArticleCard article={article} />
                <button
                  onClick={() => {
                    deleteArticle(article.id);
                    addToast('Article deleted', 'info');
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-rose-600 text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete article"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">
            No published articles yet. <Link to="/publish" className="text-brand-600 font-semibold underline">Write your first article</Link>
          </div>
        )
      )}

      {activeTab === 'bookmarks' && (
        myBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myBookmarks.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-xs">
            No bookmarks saved yet. Browse <Link to="/explore" className="text-brand-600 font-semibold underline">Explore</Link> to save articles.
          </div>
        )
      )}

      {activeTab === 'drafts' && (
        drafts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {drafts.map(draft => (
              <div
                key={draft.id}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                      {draft.category || 'General'}
                    </span>
                    <span className="text-slate-400">
                      Draft
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{draft.title || 'Untitled Draft'}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{draft.content || 'No content yet...'}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => navigate(`/publish?draftId=${draft.id}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors"
                  >
                    Resume Editing
                  </button>
                  <button
                    onClick={() => {
                      deleteDraft(draft.id);
                      addToast('Draft deleted', 'info');
                    }}
                    className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                    title="Delete draft"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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

      {/* Change Profile Picture Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Choose Profile Picture</h3>
                <p className="text-xs text-slate-500">Select a preset avatar, upload a file, or enter an image URL.</p>
              </div>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preset Avatars */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Preset Avatars</h4>
              <div className="grid grid-cols-5 gap-3 max-h-48 overflow-y-auto p-1">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectAvatar(preset.url)}
                    className={`relative p-1 rounded-full border-2 transition-all hover:scale-105 ${
                      user.avatar === preset.url
                        ? 'border-brand-600 ring-2 ring-brand-500/30'
                        : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Local File */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Upload Image</h4>
              <label className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-brand-500 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors">
                <Upload className="w-4 h-4 text-brand-500" />
                <span>Upload picture from device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image URL Input */}
            <form onSubmit={handleCustomUrlSubmit} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">Paste Image URL</h4>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-colors"
                >
                  Set URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;


