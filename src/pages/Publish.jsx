import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PenSquare, Save, Send, Image as ImageIcon, Tag, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
];

const Publish = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draftId');

  const { user, loginAsDemoUser } = useAuth();
  const { categories, drafts, publishArticle, saveDraft, deleteDraft } = useArticles();
  const { addToast } = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Programming');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0]);
  const [tagsInput, setTagsInput] = useState('');
  const [content, setContent] = useState('');

  // Load draft if resuming
  useEffect(() => {
    if (draftId && drafts.length > 0) {
      const existingDraft = drafts.find(d => d.id === draftId);
      if (existingDraft) {
        setTitle(existingDraft.title || '');
        setCategory(existingDraft.category || 'Programming');
        setCoverImage(existingDraft.coverImage || PRESET_COVERS[0]);
        setTagsInput((existingDraft.tags || []).join(', '));
        setContent(existingDraft.content || '');
      }
    }
  }, [draftId, drafts]);

  // Live word counter & 1-min read calculation
  const words = content.trim() ? content.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  // Standard reading speed is ~200-250 wpm. For 1 minute, ideal target is 200-300 words.
  const estimatedReadTime = wordCount === 0 ? '0 min' : wordCount <= 300 ? '1 min read ⏱️' : `${Math.ceil(wordCount / 230)} min read`;

  const handleSaveDraft = () => {
    if (!user) {
      addToast('Please log in to save drafts!', 'warning');
      return;
    }
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const draft = saveDraft({
      id: draftId || null,
      title,
      category,
      coverImage,
      tags,
      content
    });
    addToast('Draft saved successfully! You can resume it anytime.', 'success');
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!user) {
      addToast('Please log in to publish articles!', 'warning');
      return;
    }

    if (!title.trim() || title.length < 5) {
      addToast('Please enter a descriptive article title (at least 5 characters).', 'warning');
      return;
    }

    if (wordCount < 50) {
      addToast('Article content is too short! Write at least 50 words.', 'warning');
      return;
    }

    if (wordCount > 400) {
      addToast('Keep your article concise for a 1-minute read! Try trimming under 300 words.', 'warning');
      return;
    }

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const newArticle = publishArticle(
      {
        title,
        category,
        coverImage,
        tags: tags.length ? tags : ['MicroLearning'],
        content
      },
      user
    );

    if (draftId) {
      deleteDraft(draftId);
    }

    addToast('🎉 Article published successfully!', 'success');
    navigate(`/article/${newArticle.id}`);
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-950 flex items-center justify-center mx-auto text-brand-500 text-3xl">
          🔒
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Authentication Required to Write Articles
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          One Minute Learn allows registered community members to write and publish 1-minute micro-articles. Please log in or create an account to get started.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20"
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold mb-2">
            <PenSquare className="w-3.5 h-3.5" /> Micro-Writing Editor
          </div>
          <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
            Publish a <span className="gradient-text">1-Minute</span> Article
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-500 hover:to-sky-400 text-white font-bold text-xs shadow-lg shadow-brand-500/20 transition-all"
          >
            <Send className="w-4 h-4" /> Publish Now
          </button>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handlePublish} className="space-y-6">
        
        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Article Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Why JavaScript Event Loop Doesn't Freeze Your Browser"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            required
          />
        </div>

        {/* Category & Tags Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="JavaScript, Frontend, WebDev"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>
        </div>

        {/* Cover Image Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Cover Image URL / Preset Selection
          </label>
          <input
            type="url"
            placeholder="Paste custom image URL or pick below..."
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/50 mb-3"
          />

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {PRESET_COVERS.map((imgUrl, i) => (
              <div
                key={i}
                onClick={() => setCoverImage(imgUrl)}
                className={`relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  coverImage === imgUrl ? 'border-brand-500 ring-2 ring-brand-500/40 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Preset ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Word Count Indicator Banner */}
        <div className="p-4 rounded-2xl bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-800 dark:text-brand-300">
            <Clock className="w-4 h-4 text-brand-500" />
            <span>Target: 250–300 words for optimal 1-minute read</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className={wordCount >= 200 && wordCount <= 350 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}>
              Word Count: {wordCount} words
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-brand-600 text-white text-[10px]">
              {estimatedReadTime}
            </span>
          </div>
        </div>

        {/* Article Content Text Area */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Article Content (250–300 words limit) *
          </label>
          <textarea
            rows={12}
            placeholder="Write your concise, high-impact article here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            required
          />
        </div>

      </form>
    </div>
  );
};

export default Publish;
