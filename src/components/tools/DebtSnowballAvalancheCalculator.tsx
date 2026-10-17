import React, { useState } from "react";
import { CreditCard, DollarSign, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DebtSnowballAvalancheCalculator: React.FC = () => {
  const [totalDebtBalance, setTotalDebtBalance] = useState<number>(28500);
  const [avgApr, setAvgApr] = useState<number>(19.5);
  const [minimumPayment, setMinimumPayment] = useState<number>(750);
  const [extraPayment, setExtraPayment] = useState<number>(350);

  const totalMonthly = (minimumPayment || 0) + (extraPayment || 0);
  const monthlyRate = ((avgApr || 0) / 100) / 12;

  // Simulate payoff with extra payments
  let balance = totalDebtBalance || 0;
  let totalInterestPaid = 0;
  let months = 0;

  while (balance > 0 && months < 360) {
    months++;
    const interest = balance * monthlyRate;
    totalInterestPaid += interest;
    const principal = Math.min(balance, totalMonthly - interest);
    if (principal <= 0) break; // Negative amortization guard
    balance -= principal;
  }

  // Base simulation without extra payment
  let baseBalance = totalDebtBalance || 0;
  let baseInterest = 0;
  let baseMonths = 0;
  while (baseBalance > 0 && baseMonths < 360) {
    baseMonths++;
    const interest = baseBalance * monthlyRate;
    baseInterest += interest;
    const principal = Math.min(baseBalance, (minimumPayment || 0) - interest);
    if (principal <= 0) break;
    baseBalance -= principal;
  }

  const interestSaved = Math.max(0, baseInterest - totalInterestPaid);
  const monthsSaved = Math.max(0, baseMonths - months);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={CreditCard}
            title="Credit Card & Debt Acceleration Payoff"
            description="Compare accelerated debt repayment schedules, payoff timelines, and total interest saved."
          />
          <ResetButton onReset={() => {
            setTotalDebtBalance(28500);
            setAvgApr(19.5);
            setMinimumPayment(750);
            setExtraPayment(350);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Consolidated Debt Balance ($)" type="number" prefix="$" value={totalDebtBalance} onChange={(e) => setTotalDebtBalance(Number(e.target.value))} />
            <InputField label="Average Annual Percentage Rate (APR %)" type="number" suffix="%" value={avgApr} onChange={(e) => setAvgApr(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Current Minimum Payment ($)" type="number" prefix="$" value={minimumPayment} onChange={(e) => setMinimumPayment(Number(e.target.value))} />
              <InputField label="Extra Monthly Payoff Cash ($)" type="number" prefix="$" value={extraPayment} onChange={(e) => setExtraPayment(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Accelerated Payoff Timeline">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total Interest Dollars Saved</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    ${Math.round(interestSaved).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Debt-free in <strong className="text-white">{months} months</strong> ({(months / 12).toFixed(1)} years), saving {monthsSaved} months off debt.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Total Monthly Budget</span>
                    <span className="text-base font-bold text-white">${totalMonthly.toLocaleString()}/mo</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Total Interest Paid</span>
                    <span className="text-base font-bold text-white">${Math.round(totalInterestPaid).toLocaleString()}</span>
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
