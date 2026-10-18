import React, { useState } from "react";
import { ShieldCheck, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SolvencyRatioCalculator: React.FC = () => {
  const [totalDebt, setTotalDebt] = useState<number>(850000);
  const [totalShareholdersEquity, setTotalShareholdersEquity] = useState<number>(1200000);
  const [totalAssets, setTotalAssets] = useState<number>(2400000);
  const [annualEbit, setAnnualEbit] = useState<number>(320000);
  const [annualInterestExpense, setAnnualInterestExpense] = useState<number>(55000);

  const safeDebt = Math.max(0, totalDebt);
  const safeEquity = Math.max(0, totalShareholdersEquity);
  const safeAssets = Math.max(0, totalAssets);
  const safeEbit = Number(annualEbit);
  const safeInterest = Math.max(0, annualInterestExpense);

  // Debt-to-Equity = Total Debt / Total Equity
  const debtToEquity = safeEquity > 0 ? safeDebt / safeEquity : 0;
  
  // Debt-to-Assets = Total Debt / Total Assets
  const debtToAssets = safeAssets > 0 ? safeDebt / safeAssets : 0;

  // Interest Coverage Ratio (TIE) = EBIT / Interest Expense
  const interestCoverage = safeInterest > 0 ? safeEbit / safeInterest : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShieldCheck}
            title="Corporate Solvency Ratios (Debt-to-Equity & Interest Coverage) Calculator"
            description="Assess long-term balance sheet leverage and debt service resilience: D/E ratio, Debt-to-Assets, and Times Interest Earned (TIE)."
          />
          <ResetButton onReset={() => {
            setTotalDebt(850000);
            setTotalShareholdersEquity(1200000);
            setTotalAssets(2400000);
            setAnnualEbit(320000);
            setAnnualInterestExpense(55000);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <InputField
            label="Total Debt ($)"
            type="number"
            min={0}
            step={25000}
            value={totalDebt}
            onChange={(e) => setTotalDebt(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Stockholders Equity ($)"
            type="number"
            min={0}
            step={25000}
            value={totalShareholdersEquity}
            onChange={(e) => setTotalShareholdersEquity(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Total Assets ($)"
            type="number"
            min={0}
            step={50000}
            value={totalAssets}
            onChange={(e) => setTotalAssets(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Annual EBIT ($)"
            type="number"
            step={10000}
            value={annualEbit}
            onChange={(e) => setAnnualEbit(Number(e.target.value))}
          />
          <InputField
            label="Annual Interest ($)"
            type="number"
            min={0}
            step={5000}
            value={annualInterestExpense}
            onChange={(e) => setAnnualInterestExpense(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Solvency & Leverage Risk Profile">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Debt-to-Equity (D/E)</span>
              <p className={`text-4xl font-extrabold mt-2 ${debtToEquity <= 1.5 ? "text-emerald-400" : debtToEquity <= 2.5 ? "text-amber-300" : "text-rose-400"}`}>
                {debtToEquity.toFixed(2)}×
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Leverage ratio</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Interest Coverage (TIE)</span>
              <p className={`text-3xl font-extrabold mt-2 ${interestCoverage >= 3.0 ? "text-white" : "text-rose-400"}`}>
                {interestCoverage.toFixed(2)}×
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">EBIT / Interest Expense</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Debt Ratio</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">{(debtToAssets * 100).toFixed(1)}%</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Debt / Total Assets</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Financial Safety</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {interestCoverage >= 3.0 && debtToEquity <= 2.0 ? "Low Solvency Risk (Investment Grade)" : "High Leverage Risk"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
