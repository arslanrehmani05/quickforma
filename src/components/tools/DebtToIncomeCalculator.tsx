import React, { useState } from "react";
import { Scale, Home, CreditCard, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DebtToIncomeCalculator: React.FC = () => {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<number>(9000);
  const [housingExpense, setHousingExpense] = useState<number>(2400);
  const [carPayments, setCarPayments] = useState<number>(450);
  const [studentLoans, setStudentLoans] = useState<number>(300);
  const [creditCardMin, setCreditCardMin] = useState<number>(150);
  const [otherDebt, setOtherDebt] = useState<number>(0);

  const totalNonHousingDebt = (carPayments || 0) + (studentLoans || 0) + (creditCardMin || 0) + (otherDebt || 0);
  const totalDebt = (housingExpense || 0) + totalNonHousingDebt;

  const frontEndDti = grossMonthlyIncome > 0 ? ((housingExpense || 0) / grossMonthlyIncome) * 100 : 0;
  const backEndDti = grossMonthlyIncome > 0 ? (totalDebt / grossMonthlyIncome) * 100 : 0;

  const getDtiStatus = () => {
    if (backEndDti <= 36) return { label: "Excellent (Conventional Approved)", color: "text-emerald-400" };
    if (backEndDti <= 43) return { label: "Good (Standard Mortgage Limit)", color: "text-emerald-300" };
    if (backEndDti <= 50) return { label: "Marginal (FHA / High DTI)", color: "text-amber-300" };
    return { label: "High Risk (Unlikely to Qualify)", color: "text-rose-400" };
  };

  const status = getDtiStatus();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Scale}
            title="Debt-to-Income (DTI) Ratio Mortgage Calculator"
            description="Calculate Front-End Housing DTI and Back-End Total DTI ratios used by mortgage lenders and Fannie Mae guidelines."
          />
          <ResetButton onReset={() => {
            setGrossMonthlyIncome(9000);
            setHousingExpense(2400);
            setCarPayments(450);
            setStudentLoans(300);
            setCreditCardMin(150);
            setOtherDebt(0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Gross Pre-Tax Monthly Income ($)" type="number" prefix="$" value={grossMonthlyIncome} onChange={(e) => setGrossMonthlyIncome(Number(e.target.value))} />
            <InputField label="Proposed Monthly Housing Cost (PITI) ($)" type="number" prefix="$" value={housingExpense} onChange={(e) => setHousingExpense(Number(e.target.value))} helpText="Mortgage principal, interest, taxes, and insurance." />
            <InputField label="Monthly Auto / Car Loan Payments ($)" type="number" prefix="$" value={carPayments} onChange={(e) => setCarPayments(Number(e.target.value))} />
            <InputField label="Monthly Student Loan Payments ($)" type="number" prefix="$" value={studentLoans} onChange={(e) => setStudentLoans(Number(e.target.value))} />
            <InputField label="Credit Card Minimum Monthly Payments ($)" type="number" prefix="$" value={creditCardMin} onChange={(e) => setCreditCardMin(Number(e.target.value))} />
            <InputField label="Other Fixed Recurring Monthly Debt ($)" type="number" prefix="$" value={otherDebt} onChange={(e) => setOtherDebt(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Lending DTI Assessment">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Back-End DTI (Total Debt Ratio)</div>
                  <div className="text-4xl font-extrabold text-white">{backEndDti.toFixed(1)}%</div>
                  <div className={`text-xs font-semibold mt-1 ${status.color}`}>{status.label}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Front-End DTI (Housing):</span>
                    <p className="text-indigo-200 font-bold text-base mt-0.5">{frontEndDti.toFixed(1)}%</p>
                    <span className="text-[10px] text-slate-400">Benchmark: &lt; 28%</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Total Monthly Debt:</span>
                    <p className="text-white font-bold text-base mt-0.5">${totalDebt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                    <span className="text-[10px] text-slate-400">Non-housing: ${totalNonHousingDebt}</span>
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
