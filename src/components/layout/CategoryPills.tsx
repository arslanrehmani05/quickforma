import React from 'react';
import { CategoryItem } from '../../data/categories';

interface CategoryPillsProps {
  categories: readonly CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none pb-2 pt-1 px-2 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
            selectedCategory === cat.id
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-[1.02]'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <span>{cat.name}</span>
          {cat.count !== undefined && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                selectedCategory === cat.id
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {cat.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
