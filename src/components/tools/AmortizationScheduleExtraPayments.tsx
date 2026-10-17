import React, { useState } from "react";
import { Calendar, DollarSign, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AmortizationScheduleExtraPayments: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(400000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(300);

  const calculateAmortization = () => {
    const P = loanAmount || 0;
    const r = ((interestRate || 0) / 100) / 12;
    const n = (loanTermYears || 30) * 12;
    if (P <= 0 || r <= 0 || n <= 0) return null;

    const baseMonthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const standardTotalInterest = (baseMonthlyPayment * n) - P;

    // Accelerated schedule with extra payment
    let balance = P;
    let acceleratedInterest = 0;
    let monthsPaid = 0;
    const acceleratedPayment = baseMonthlyPayment + (extraMonthlyPayment || 0);

    while (balance > 0 && monthsPaid < n) {
      monthsPaid++;
      const interestForMonth = balance * r;
      acceleratedInterest += interestForMonth;
      const principalForMonth = Math.min(balance, acceleratedPayment - interestForMonth);
      balance -= principalForMonth;
    }

    const monthsSaved = Math.max(0, n - monthsPaid);
    const interestSaved = Math.max(0, standardTotalInterest - acceleratedInterest);

    return {
      baseMonthlyPayment,
      standardTotalInterest,
      monthsSaved,
      yearsSaved: (monthsSaved / 12).toFixed(1),
      interestSaved,
      payoffYears: (monthsPaid / 12).toFixed(1),
    };
  };

  const res = calculateAmortization();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Calendar}
            title="Mortgage Payoff Acceleration & Interest Saved"
            description="Calculate how extra monthly principal payments reduce your mortgage payoff timeline and save thousands in interest."
          />
          <ResetButton onReset={() => {
            setLoanAmount(400000);
            setInterestRate(6.5);
            setLoanTermYears(30);
            setExtraMonthlyPayment(300);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Original Mortgage Principal ($)" type="number" prefix="$" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Interest Rate (%)" type="number" suffix="%" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
              <InputField label="Loan Term (Years)" type="number" suffix="yrs" value={loanTermYears} onChange={(e) => setLoanTermYears(Number(e.target.value))} />
            </div>
            <InputField
              label="Extra Monthly Principal Payment ($)"
              type="number"
              prefix="$"
              value={extraMonthlyPayment}
              onChange={(e) => setExtraMonthlyPayment(Number(e.target.value))}
              helpText="Additional amount applied directly to principal reduction each month."
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Accelerated Payoff Impact">
              {res ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total Interest Dollars Saved</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                      ${Math.round(res.interestSaved).toLocaleString()}
                    </div>
                    <p className="text-xs text-slate-400">
                      Loan paid off in <strong className="text-white">{res.payoffYears} years</strong> instead of {loanTermYears} years ({res.yearsSaved} years early).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] text-slate-400 block">Base Monthly Payment</span>
                      <span className="text-base font-bold text-white">${Math.round(res.baseMonthlyPayment).toLocaleString()}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] text-slate-400 block">Months Shaved Off Term</span>
                      <span className="text-base font-bold text-emerald-400">{res.monthsSaved} Months</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
