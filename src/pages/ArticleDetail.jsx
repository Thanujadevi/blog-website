import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Heart, Bookmark, Share2, Clock, Calendar, MessageSquare, ArrowLeft, 
  Send, Trash2, Sparkles, Copy, Check 
} from 'lucide-react';
import ReadingProgressBar from '../components/ReadingProgressBar';
import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticleContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles, likedArticles, bookmarks, toggleLike, toggleBookmark, addComment, deleteComment } = useArticles();
  const { user, recordReadArticle } = useAuth();
  const { addToast } = useToast();

  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);

  const article = articles.find(a => a.id === id);

  // Track article read for daily learning streak when page opens
  useEffect(() => {
    if (article && user) {
      recordReadArticle(article.id, article.title);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Article Not Found</h2>
        <p className="text-xs text-slate-500">The 1-minute article you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/explore')}
          className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const isLiked = likedArticles.includes(article.id);
  const isBookmarked = bookmarks.includes(article.id);

  const handleLike = () => {
    if (!user) {
      addToast('Please login to like articles!', 'warning');
      return;
    }
    const liked = toggleLike(article.id);
    addToast(liked ? 'Liked article ❤️' : 'Unliked article', 'info');
  };

  const handleBookmark = () => {
    if (!user) {
      addToast('Please login to bookmark articles!', 'warning');
      return;
    }
    const bookmarked = toggleBookmark(article.id);
    addToast(bookmarked ? 'Saved to bookmarks 🔖' : 'Removed from bookmarks', 'info');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    addToast('Link copied to clipboard! 🔗', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please login to leave a comment!', 'warning');
      return;
    }
    if (!commentText.trim()) return;

    addComment(article.id, commentText.trim(), user);
    addToast('Comment added!', 'success');
    setCommentText('');
  };

  const relatedArticles = articles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              {article.category}
            </span>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> ⏱️ 1 Min Read ({article.wordCount} words)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>

          {/* Author Details & Date */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/30"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                }}
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{article.author.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>Published {new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Main Content Body */}
        <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base leading-relaxed space-y-6">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs font-semibold text-slate-400">Tags:</span>
          {article.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Toolbar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isLiked
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
              <span>{article.likes} Likes</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isBookmarked
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-500'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* COMMENTS SECTION */}
        <section className="pt-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-500" />
              Community Discussion ({(article.comments || []).length})
            </h3>
          </div>

          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <div className="flex gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-1 space-y-2">
                  <textarea
                    rows={3}
                    placeholder="Share your thoughts on this 1-minute read..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 text-center text-xs text-slate-500">
              Please <Link to="/login" className="text-brand-600 font-bold underline">log in</Link> to join the discussion.
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4 pt-2">
            {(article.comments || []).map(comment => (
              <div
                key={comment.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">{comment.userName}</h5>
                      <span className="text-[10px] text-slate-400">
                        {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {(user?.role === 'admin' || user?.name === comment.userName) && (
                    <button
                      onClick={() => {
                        deleteComment(article.id, comment.id);
                        addToast('Comment deleted', 'info');
                      }}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 pl-9">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <section className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Related 1-Minute Reads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
};

export default ArticleDetail;
