import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Users, FileText, Heart, Plus, Trash2, BarChart2, Layers, AlertTriangle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticleContext';
import { useToast } from '../context/ToastContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, role, loginAsAdmin } = useAuth();
  const { articles, categories, deleteArticle, addCategory, deleteCategory } = useArticles();
  const { addToast } = useToast();

  const [newCatName, setNewCatName] = useState('');

  if (role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-950 flex items-center justify-center mx-auto text-purple-600 text-3xl">
          🛡️
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
          Admin Access Required
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          This dashboard allows community admins to moderate articles, manage categories, and inspect platform metrics.
        </p>
        <button
          onClick={() => {
            loginAsAdmin();
            addToast('Switched to Demo Admin Mode!', 'success');
          }}
          className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20"
        >
          🛡️ Login as Demo Admin
        </button>
      </div>
    );
  }

  const totalLikes = articles.reduce((acc, a) => acc + (a.likes || 0), 0);

  const handleAddCat = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim());
    addToast(`Added new category: "${newCatName}"`, 'success');
    setNewCatName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4" /> Moderator Console
          </div>
          <h1 className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
        </div>

        <span className="text-xs font-semibold text-slate-400">
          Logged in as <strong>{user.name}</strong>
        </span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-brand-500">
            <FileText className="w-6 h-6" />
            <span className="text-xs font-bold bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded">Live</span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">{articles.length}</span>
          <span className="text-xs font-medium text-slate-500">Published 1-Min Articles</span>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-purple-500">
            <Users className="w-6 h-6" />
            <span className="text-xs font-bold bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded">+12 today</span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">1,480</span>
          <span className="text-xs font-medium text-slate-500">Registered Micro-Learners</span>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-rose-500">
            <Heart className="w-6 h-6" />
            <span className="text-xs font-bold bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">Active</span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">{totalLikes}</span>
          <span className="text-xs font-medium text-slate-500">Total Community Likes</span>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <div className="flex justify-between items-center text-emerald-500">
            <Layers className="w-6 h-6" />
            <span className="text-xs font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">Topics</span>
          </div>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">{categories.length}</span>
          <span className="text-xs font-medium text-slate-500">Active Categories</span>
        </div>
      </div>

      {/* Moderation Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Content Moderation (Articles Table)</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3">Article Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Author</th>
                <th className="p-3">Published Date</th>
                <th className="p-3">Likes</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {articles.map(article => (
                <tr key={article.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                    {article.title}
                  </td>
                  <td className="p-3">{article.category}</td>
                  <td className="p-3">{article.author.name}</td>
                  <td className="p-3">{new Date(article.publishedAt).toLocaleDateString()}</td>
                  <td className="p-3 font-bold text-rose-500">❤️ {article.likes}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        deleteArticle(article.id);
                        addToast('Article removed by Admin', 'info');
                      }}
                      className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Management */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Category Management</h3>

        <form onSubmit={handleAddCat} className="flex gap-3 max-w-md">
          <input
            type="text"
            placeholder="New Category Name (e.g. Cybersecurity)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
          <button type="submit" className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold">
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map(cat => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              {cat.name}
              <button
                onClick={() => {
                  deleteCategory(cat.id);
                  addToast(`Deleted category ${cat.name}`, 'info');
                }}
                className="text-slate-400 hover:text-rose-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
