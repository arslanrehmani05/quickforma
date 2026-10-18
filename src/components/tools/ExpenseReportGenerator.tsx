import React, { useState } from "react";
import { Receipt, Printer, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

interface ExpenseItem {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

export const ExpenseReportGenerator: React.FC = () => {
  const [employeeName, setEmployeeName] = useState("Marcus Vance");
  const [department, setDepartment] = useState("Product & Design");
  const [managerName, setManagerName] = useState("Elena Rostova");
  const [reportDate, setReportDate] = useState("2026-10-18");

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: "1", date: "2026-10-12", category: "Travel", description: "Flight: SFO to JFK Client Workshop", amount: 485.50 },
    { id: "2", date: "2026-10-13", category: "Meals", description: "Team Dinner with Stakeholders", amount: 164.20 },
    { id: "3", date: "2026-10-14", category: "Transit", description: "Airport Taxi & Subways", amount: 62.00 },
  ]);

  const addExpense = () => {
    setExpenses([...expenses, { id: Date.now().toString(), date: "2026-10-15", category: "General", description: "Business Expense", amount: 50 }]);
  };

  const removeExpense = (id: string) => {
    if (expenses.length > 1) setExpenses(expenses.filter((e) => e.id !== id));
  };

  const updateExpense = (id: string, field: keyof ExpenseItem, val: any) => {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };

  const totalExpenseAmount = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Receipt}
            title="Employee Expense Reimbursement Report Sheet"
            description="Itemize travel, client entertainment, lodging, and software expenditures for corporate expense reimbursement."
          />
          <ResetButton onReset={() => {
            setEmployeeName("Marcus Vance");
            setDepartment("Product & Design");
            setManagerName("Elena Rostova");
            setExpenses([
              { id: "1", date: "2026-10-12", category: "Travel", description: "Flight: SFO to JFK Client Workshop", amount: 485.50 },
              { id: "2", date: "2026-10-13", category: "Meals", description: "Team Dinner with Stakeholders", amount: 164.20 },
              { id: "3", date: "2026-10-14", category: "Transit", description: "Airport Taxi & Subways", amount: 62.00 },
            ]);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Employee Name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
          <InputField label="Department / Cost Center" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <InputField label="Approving Manager" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
          <InputField label="Submission Date" type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} />
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Itemized Expenses</h3>
            <Button size="sm" variant="secondary" onClick={addExpense} className="flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Expense
            </Button>
          </div>

          <div className="space-y-2">
            {expenses.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-3">
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => updateExpense(item.id, "date", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => updateExpense(item.id, "category", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateExpense(item.id, "description", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.01"
                    value={item.amount}
                    onChange={(e) => updateExpense(item.id, "amount", Number(e.target.value))}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeExpense(item.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Total Reimbursement Claim:</span>
            <p className="text-2xl font-extrabold text-emerald-400">
              ${totalExpenseAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <Button variant="primary" onClick={() => window.print()} className="flex items-center gap-1.5">
            <Printer className="w-4 h-4" /> Print Reimbursement Report
          </Button>
        </div>
      </div>
    </div>
  );
};
