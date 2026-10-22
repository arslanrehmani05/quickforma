import React from 'react';
import { SubcategoryItem } from '../../data/categories';

interface SubcategoryPillsProps {
  subcategories: readonly SubcategoryItem[];
  selectedSubcategory: string;
  onSelectSubcategory: (id: string) => void;
}

export const SubcategoryPills: React.FC<SubcategoryPillsProps> = ({
  subcategories,
  selectedSubcategory,
  onSelectSubcategory,
}) => {
  if (subcategories.length <= 1) return null;

  return (
    <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto scrollbar-none pb-2 pt-1 px-2 no-scrollbar animate-in fade-in duration-200">
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 shrink-0 hidden sm:inline">
        Task:
      </span>
      {subcategories.map((sub) => {
        const isSelected = selectedSubcategory === sub.id;
        return (
          <button
            key={sub.id}
            onClick={() => onSelectSubcategory(sub.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
              isSelected
                ? 'bg-indigo-600 text-white font-semibold shadow-xs shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/70'
            }`}
          >
            <span>{sub.name}</span>
            {sub.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {sub.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
