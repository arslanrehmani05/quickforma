import React, { useState, useMemo } from 'react';
import { Sparkles, DollarSign, Plus, Trash2 } from 'lucide-react';
import { calculateStudentBudget, StudentBudgetItem } from '../../utils/finance/studentFinanceEngine';

export const StudentBudgetPlanner: React.FC = () => {
  const [items, setItems] = useState<StudentBudgetItem[]>([
    { id: '1', name: 'Part-Time Job / Allowance', amount: 1200, type: 'income' },
    { id: '2', name: 'Scholarship / Grant', amount: 400, type: 'income' },
    { id: '3', name: 'Housing / Rent', amount: 650, type: 'expense' },
    { id: '4', name: 'Groceries & Food', amount: 300, type: 'expense' },
    { id: '5', name: 'Books & Supplies', amount: 100, type: 'expense' },
    { id: '6', name: 'Transit & Bus Pass', amount: 80, type: 'expense' },
  ]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), name: 'New Expense', amount: 50, type: 'expense' },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof StudentBudgetItem, value: any) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const result = useMemo(() => {
    return calculateStudentBudget(items);
  }, [items]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Student Budget Planner</h2>
            <p className="text-xs text-slate-500">
              Track monthly student income sources against recurring expenses (tuition, housing, books, food, transit).
            </p>
          </div>
        </div>

        {/* Budget Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Income & Expense Items</h3>
            <button
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Line Item
            </button>
          </div>

          <div className="space-y-2.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 items-center bg-slate-50/60 p-2.5 rounded-2xl border border-slate-200/60"
              >
                <div className="col-span-5 sm:col-span-6">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-600"
                  />
                </div>
                <div className="col-span-3">
                  <select
                    value={item.type}
                    onChange={(e) => updateItem(item.id, 'type', e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2 py-1.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-600"
                  >
                    <option value="income">Income (+)</option>
                    <option value="expense">Expense (-)</option>
                  </select>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <input
                    type="number"
                    min="0"
                    value={item.amount}
                    onChange={(e) => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs sm:text-sm text-slate-900 text-right outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={items.length <= 1}
                    className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Monthly Budget Summary
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Total Income</div>
            <div className="text-3xl font-extrabold text-white font-mono">${result.totalIncome}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Total Expenses</div>
            <div className="text-3xl font-extrabold text-rose-300 font-mono">${result.totalExpense}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Net Monthly Surplus</div>
            <div className={`text-3xl font-extrabold font-mono ${result.netSavings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${result.netSavings}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
