import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenSquare, Trash2 } from 'lucide-react';
import { useArticles } from '../context/ArticleContext';
import { useToast } from '../context/ToastContext';

const Drafts = () => {
  const navigate = useNavigate();
  const { drafts, deleteDraft } = useArticles();
  const { addToast } = useToast();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
          <PenSquare className="w-7 h-7 text-amber-500" /> My Unfinished Drafts ({drafts.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">Resume writing your draft micro-articles.</p>
      </div>

      {drafts.length > 0 ? (
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
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <p className="text-sm text-slate-500">You have no saved drafts.</p>
          <button
            onClick={() => navigate('/publish')}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
          >
            Start a New Draft
          </button>
        </div>
      )}
    </div>
  );
};

export default Drafts;
