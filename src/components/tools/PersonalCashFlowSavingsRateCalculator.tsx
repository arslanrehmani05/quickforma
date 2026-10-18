import React, { useState } from "react";
import { Wallet, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PersonalCashFlowSavingsRateCalculator: React.FC = () => {
  const [takeHomeIncome, setTakeHomeIncome] = useState<number>(7500);
  const [housing, setHousing] = useState<number>(2400);
  const [groceries, setGroceries] = useState<number>(850);
  const [transportation, setTransportation] = useState<number>(650);
  const [utilities, setUtilities] = useState<number>(350);
  const [lifestyle, setLifestyle] = useState<number>(950);
  const [debtPayments, setDebtPayments] = useState<number>(450);

  const totalExpenses = (housing || 0) + (groceries || 0) + (transportation || 0) + (utilities || 0) + (lifestyle || 0) + (debtPayments || 0);
  const netSurplus = (takeHomeIncome || 0) - totalExpenses;
  const savingsRate = takeHomeIncome > 0 ? (netSurplus / takeHomeIncome) * 100 : 0;
  const annualSurplus = netSurplus * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Wallet}
            title="Personal Cash Flow & Monthly Savings Rate Calculator"
            description="Analyze monthly household cash inflows, fixed living costs, discretionary spending, net monthly surplus, and true savings rate."
          />
          <ResetButton onReset={() => {
            setTakeHomeIncome(7500);
            setHousing(2400);
            setGroceries(850);
            setTransportation(650);
            setUtilities(350);
            setLifestyle(950);
            setDebtPayments(450);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Monthly Take-Home Income ($)" type="number" prefix="$" value={takeHomeIncome} onChange={(e) => setTakeHomeIncome(Number(e.target.value))} />
            <InputField label="Housing (Rent / Mortgage & Taxes) ($)" type="number" prefix="$" value={housing} onChange={(e) => setHousing(Number(e.target.value))} />
            <InputField label="Food & Groceries ($)" type="number" prefix="$" value={groceries} onChange={(e) => setGroceries(Number(e.target.value))} />
            <InputField label="Transportation (Car, Gas, Transit) ($)" type="number" prefix="$" value={transportation} onChange={(e) => setTransportation(Number(e.target.value))} />
            <InputField label="Utilities, Internet & Phone ($)" type="number" prefix="$" value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} />
            <InputField label="Discretionary & Entertainment ($)" type="number" prefix="$" value={lifestyle} onChange={(e) => setLifestyle(Number(e.target.value))} />
            <InputField label="Debt Service / Student Loans ($)" type="number" prefix="$" value={debtPayments} onChange={(e) => setDebtPayments(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Cash Flow & Savings Position">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Net Monthly Surplus</div>
                  <div className={`text-4xl font-extrabold ${netSurplus >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    ${netSurplus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Personal Savings Rate: <span className="font-bold text-white">{savingsRate.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Monthly Expenses:</span>
                    <p className="text-white font-bold text-sm mt-0.5">${totalExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Annual Net Capital Added:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">${annualSurplus.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Housing Expense Ratio:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{takeHomeIncome > 0 ? ((housing / takeHomeIncome) * 100).toFixed(1) : 0}%</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Debt Burden Ratio:</span>
                    <p className="text-white font-bold text-sm mt-0.5">{takeHomeIncome > 0 ? ((debtPayments / takeHomeIncome) * 100).toFixed(1) : 0}%</p>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
