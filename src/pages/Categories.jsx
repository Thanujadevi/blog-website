import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticleContext';
import { Layers } from 'lucide-react';

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, articles } = useArticles();
  
  const selectedCategoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(selectedCategoryParam || null);

  useEffect(() => {
    setActiveCategory(searchParams.get('category'));
  }, [searchParams]);

  const filteredArticles = activeCategory
    ? articles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase())
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold">
          <Layers className="w-3.5 h-3.5" /> Topic Knowledge Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
          Browse All <span className="gradient-text">Categories</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Pick your topic of interest and dive straight into 1-minute micro-articles.
        </p>
      </div>

      {/* Categories Visual Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* If a category is selected via URL search params, show filtered list */}
      {activeCategory && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Articles in <span className="text-brand-600 dark:text-brand-400">{activeCategory}</span> ({filteredArticles.length})
            </h2>
            <button
              onClick={() => setSearchParams({})}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Clear Selection ✕
            </button>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500">No articles available in this category yet. Be the first to publish one!</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Categories;
