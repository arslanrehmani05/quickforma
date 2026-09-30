import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SprintHistoryItem } from '../../types/mind';

interface SprintReviewPanelProps {
  history: SprintHistoryItem[];
}

export const SprintReviewPanel: React.FC<SprintReviewPanelProps> = ({ history }) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  if (!history || history.length === 0) return null;

  const correctItems = history.filter((item) => item.isCorrect);
  const incorrectItems = history.filter((item) => !item.isCorrect);

  const displayedItems =
    filter === 'incorrect' ? incorrectItems : filter === 'correct' ? correctItems : history;

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 text-left max-w-4xl mx-auto mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            Sprint Solutions & Review
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Itemized breakdown of all {history.length} questions answered during this sprint
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/60 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-extrabold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All ({history.length})
          </button>
          <button
            onClick={() => setFilter('incorrect')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              filter === 'incorrect'
                ? 'bg-rose-600 text-white shadow-xs font-extrabold'
                : 'text-rose-600 hover:bg-rose-50'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" /> Incorrect ({incorrectItems.length})
          </button>
          <button
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Correct ({correctItems.length})
          </button>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
        {displayedItems.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm italic">
            No questions match the selected filter tab.
          </div>
        ) : (
          displayedItems.map((item, idx) => {
            const isExpanded = !!expandedItems[item.id];
            return (
              <div
                key={item.id || idx}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  item.isCorrect
                    ? 'bg-emerald-50/30 border-emerald-200/80'
                    : 'bg-rose-50/30 border-rose-200/80'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-wider font-extrabold">
                    Question #{item.id}
                  </span>
                  {item.isCorrect ? (
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-extrabold border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct
                    </span>
                  ) : (
                    <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-extrabold border border-rose-200">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" /> Incorrect
                    </span>
                  )}
                </div>

                {/* Question Prompt */}
                <div className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">
                  {item.prompt}
                </div>

                {/* Answers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/70 flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Your Answer:</span>
                    <span
                      className={`font-extrabold ${
                        item.isCorrect ? 'text-emerald-700' : 'text-rose-600 line-through'
                      }`}
                    >
                      {item.userAnswer || 'No response'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/70 flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Correct Answer:</span>
                    <span className="font-extrabold text-emerald-700">{item.correctAnswer}</span>
                  </div>
                </div>

                {/* Collapsible Solution Toggle Button & Box */}
                {item.explanation && (
                  <div className="pt-1">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1 focus:outline-none"
                    >
                      {isExpanded ? (
                        <>
                          Hide Solution & Explanation <ChevronUp className="w-3.5 h-3.5 text-indigo-500" />
                        </>
                      ) : (
                        <>
                          View Solution & Explanation <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-950 leading-relaxed animate-in fade-in duration-150">
                        <span className="font-extrabold text-indigo-700 uppercase tracking-wider block text-[10px] mb-0.5">
                          How To Solve:
                        </span>
                        {item.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
