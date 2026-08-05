import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Cpu, Atom, Smartphone, Landmark, HeartPulse, Zap, TrendingUp, Rocket, Globe, BookOpen
} from 'lucide-react';

const iconMap = {
  Code, Cpu, Atom, Smartphone, Landmark, HeartPulse, Zap, TrendingUp, Rocket, Globe
};

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const IconComponent = iconMap[category.icon] || BookOpen;

  return (
    <div
      onClick={() => navigate(`/categories?category=${category.name}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
    >
      {/* Background Gradient Accent on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      <div className="relative z-10 flex items-center justify-between">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md shadow-brand-500/10 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
          {category.count} Articles
        </span>
      </div>

      <div className="mt-4 relative z-10">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Explore concise 1-minute reads in {category.name}.
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
