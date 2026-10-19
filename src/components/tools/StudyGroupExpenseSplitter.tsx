import React, { useState } from "react";
import { Users, DollarSign, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface ExpenseItem {
  description: string;
  amount: number;
}

export const StudyGroupExpenseSplitter: React.FC = () => {
  const [groupMembersCount, setGroupMembersCount] = useState<number>(4);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { description: "Shared Textbook / Course Reader", amount: 120 },
    { description: "Study Room & Whiteboard Supplies", amount: 35 },
    { description: "Software Team License (Figma / GitHub)", amount: 48 },
    { description: "Shared Study Session Food / Snacks", amount: 56 }
  ]);

  const totalExpense = expenses.reduce((acc, curr) => acc + Math.max(0, curr.amount), 0);
  const safeMembers = Math.max(1, groupMembersCount);
  const costPerPerson = (totalExpense / safeMembers).toFixed(2);

  const addExpense = () => {
    setExpenses([...expenses, { description: "Poster Board & Printing", amount: 25 }]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Users}
            title="Student Study Group & Project Expense Splitter"
            description="Reconcile shared course supplies, team software subscriptions, and textbook costs evenly across project members."
          />
          <ResetButton onReset={() => {
            setGroupMembersCount(4);
            setExpenses([
              { description: "Shared Textbook / Course Reader", amount: 120 },
              { description: "Study Room & Whiteboard Supplies", amount: 35 },
              { description: "Software Team License (Figma / GitHub)", amount: 48 },
              { description: "Shared Study Session Food / Snacks", amount: 56 }
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Total Group Members"
            type="number"
            value={groupMembersCount}
            onChange={(e) => setGroupMembersCount(Number(e.target.value))}
            min={1}
            max={20}
          />
          <ResultCard
            variant="light"
            title="Total Group Bill"
            value={`$${totalExpense.toFixed(2)}`}
            subtitle="Aggregated team expenses"
          />
          <ResultCard
            variant="light"
            title="Cost Per Student"
            value={`$${costPerPerson}`}
            subtitle={`Split evenly across ${safeMembers} peers`}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Shared Itemized Expenses</h3>
            <button
              type="button"
              onClick={addExpense}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
            >
              Add Expense
            </button>
          </div>

          <div className="space-y-2">
            {expenses.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const next = [...expenses];
                    next[idx].description = e.target.value;
                    setExpenses(next);
                  }}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-medium"
                />
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => {
                      const next = [...expenses];
                      next[idx].amount = Number(e.target.value);
                      setExpenses(next);
                    }}
                    className="w-20 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-indigo-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setExpenses(expenses.filter((_, i) => i !== idx))}
                  className="p-1.5 text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
