import React, { useState } from "react";
import { PieChart, DollarSign, ShieldAlert, CheckCircle2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const Budget503020Calculator: React.FC = () => {
  const [netIncome, setNetIncome] = useState<number>(6000);
  const [actualNeeds, setActualNeeds] = useState<number>(3200);
  const [actualWants, setActualWants] = useState<number>(1600);
  const [actualSavings, setActualSavings] = useState<number>(1200);

  const targetNeeds = (netIncome || 0) * 0.5;
  const targetWants = (netIncome || 0) * 0.3;
  const targetSavings = (netIncome || 0) * 0.2;

  const diffNeeds = targetNeeds - (actualNeeds || 0);
  const diffWants = targetWants - (actualWants || 0);
  const diffSavings = (actualSavings || 0) - targetSavings;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={PieChart}
            title="50/30/20 Rule Budget & Savings Calculator"
            description="Divide your monthly take-home income into 50% Needs, 30% Wants, and 20% Savings or Debt payoff targets."
          />
          <ResetButton onReset={() => {
            setNetIncome(6000);
            setActualNeeds(3200);
            setActualWants(1600);
            setActualSavings(1200);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Monthly Take-Home (Net) Income ($)"
              type="number"
              prefix="$"
              value={netIncome}
              onChange={(e) => setNetIncome(Number(e.target.value))}
              helpText="After-tax income deposited into your bank account."
            />
            <InputField
              label="Actual Monthly Needs Spending ($)"
              type="number"
              prefix="$"
              value={actualNeeds}
              onChange={(e) => setActualNeeds(Number(e.target.value))}
              helpText="Rent/mortgage, groceries, utilities, basic transit, minimum debt."
            />
            <InputField
              label="Actual Monthly Wants Spending ($)"
              type="number"
              prefix="$"
              value={actualWants}
              onChange={(e) => setActualWants(Number(e.target.value))}
              helpText="Dining out, travel, entertainment, hobbies, streaming subscriptions."
            />
            <InputField
              label="Actual Monthly Savings & Extra Debt Repayment ($)"
              type="number"
              prefix="$"
              value={actualSavings}
              onChange={(e) => setActualSavings(Number(e.target.value))}
              helpText="Emergency fund, 401k/IRA, brokerage, extra principal debt payments."
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="50/30/20 Target Allocation">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] text-indigo-200 uppercase font-bold">50% Needs</span>
                    <p className="text-xl font-extrabold text-white mt-1">${targetNeeds.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <span className={`text-[10px] font-semibold mt-1 block ${diffNeeds >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {diffNeeds >= 0 ? `Under by $${diffNeeds.toFixed(0)}` : `Over by $${Math.abs(diffNeeds).toFixed(0)}`}
                    </span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] text-indigo-200 uppercase font-bold">30% Wants</span>
                    <p className="text-xl font-extrabold text-white mt-1">${targetWants.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <span className={`text-[10px] font-semibold mt-1 block ${diffWants >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {diffWants >= 0 ? `Under by $${diffWants.toFixed(0)}` : `Over by $${Math.abs(diffWants).toFixed(0)}`}
                    </span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] text-indigo-200 uppercase font-bold">20% Savings</span>
                    <p className="text-xl font-extrabold text-white mt-1">${targetSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <span className={`text-[10px] font-semibold mt-1 block ${diffSavings >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                      {diffSavings >= 0 ? `+ $${diffSavings.toFixed(0)} ahead` : `$${Math.abs(diffSavings).toFixed(0)} short`}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Needs Percentage:</span>
                    <span className="font-bold text-white">{netIncome > 0 ? ((actualNeeds / netIncome) * 100).toFixed(1) : 0}% (Target: 50%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wants Percentage:</span>
                    <span className="font-bold text-white">{netIncome > 0 ? ((actualWants / netIncome) * 100).toFixed(1) : 0}% (Target: 30%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Savings Rate:</span>
                    <span className="font-bold text-emerald-400">{netIncome > 0 ? ((actualSavings / netIncome) * 100).toFixed(1) : 0}% (Target: 20%)</span>
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
