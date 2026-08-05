import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4 animate-pulse space-y-4"
          >
            <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
            <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <div className="space-y-1">
                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
      <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
      <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
    </div>
  );
};

export default SkeletonLoader;
