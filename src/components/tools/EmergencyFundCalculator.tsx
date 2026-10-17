import React, { useState } from "react";
import { PiggyBank, ShieldCheck, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EmergencyFundCalculator: React.FC = () => {
  const [rentOrMortgage, setRentOrMortgage] = useState<number>(2200);
  const [groceries, setGroceries] = useState<number>(700);
  const [utilities, setUtilities] = useState<number>(350);
  const [insuranceAndHealth, setInsuranceAndHealth] = useState<number>(450);
  const [debtPayments, setDebtPayments] = useState<number>(400);
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number>(14000);

  const monthlyEssentialTotal = (rentOrMortgage || 0) + (groceries || 0) + (utilities || 0) + (insuranceAndHealth || 0) + (debtPayments || 0);
  const targetFund = monthlyEssentialTotal * (targetMonths || 6);
  const shortfall = Math.max(0, targetFund - (currentSavings || 0));
  const monthsCovered = monthlyEssentialTotal > 0 ? (currentSavings || 0) / monthlyEssentialTotal : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={PiggyBank}
            title="3-to-6 Month Household Expense Reserve Solver"
            description="Calculate your household target emergency cash fund based on essential monthly living expenses."
          />
          <ResetButton onReset={() => {
            setRentOrMortgage(2200);
            setGroceries(700);
            setUtilities(350);
            setInsuranceAndHealth(450);
            setDebtPayments(400);
            setTargetMonths(6);
            setCurrentSavings(14000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Monthly Essential Expenses ($)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Housing (Rent / Mortgage)" type="number" prefix="$" value={rentOrMortgage} onChange={(e) => setRentOrMortgage(Number(e.target.value))} />
              <InputField label="Groceries & Food" type="number" prefix="$" value={groceries} onChange={(e) => setGroceries(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Utilities & Internet" type="number" prefix="$" value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} />
              <InputField label="Insurance & Healthcare" type="number" prefix="$" value={insuranceAndHealth} onChange={(e) => setInsuranceAndHealth(Number(e.target.value))} />
            </div>
            <InputField label="Minimum Debt & Car Payments" type="number" prefix="$" value={debtPayments} onChange={(e) => setDebtPayments(Number(e.target.value))} />

            <h3 className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100">Fund Goals & Current Balance</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Horizon (Months)</label>
                <select
                  value={targetMonths}
                  onChange={(e) => setTargetMonths(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  <option value={3}>3 Months (Dual Income / Low Risk)</option>
                  <option value={6}>6 Months (Standard Household)</option>
                  <option value={9}>9 Months (Freelancer / Contractor)</option>
                  <option value={12}>12 Months (Single Income / Business Owner)</option>
                </select>
              </div>
              <InputField label="Current Cash Savings ($)" type="number" prefix="$" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Emergency Reserve Status">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Target Fund Size ({targetMonths} Months)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                    ${targetFund.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Monthly Burn Rate: <strong className="text-white">${monthlyEssentialTotal.toLocaleString()}/month</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Months Covered Now</span>
                    <span className="text-base font-bold text-emerald-400">{monthsCovered.toFixed(1)} Months</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Remaining Savings Gap</span>
                    <span className={`text-base font-bold ${shortfall === 0 ? "text-emerald-400" : "text-amber-400"}`}>
                      {shortfall === 0 ? "Fully Funded" : `$${shortfall.toLocaleString()}`}
                    </span>
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
