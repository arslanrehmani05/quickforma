import React, { useState } from "react";
import { Sparkles, DollarSign, TrendingUp, Gauge } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SaasMagicNumberCalculator: React.FC = () => {
  const [currentQuarterArr, setCurrentQuarterArr] = useState<number>(3200000);
  const [priorQuarterArr, setPriorQuarterArr] = useState<number>(2750000);
  const [priorQuarterSmExpense, setPriorQuarterSmExpense] = useState<number>(450000);

  const netNewArr = (currentQuarterArr || 0) - (priorQuarterArr || 0);
  const magicNumber = (priorQuarterSmExpense || 0) > 0 ? (netNewArr * 4) / (priorQuarterSmExpense * 4) : 0; // standard: (Q_n ARR - Q_n-1 ARR) / S&M_n-1 or quarterly rev diff * 4 / S&M
  // Standard SaaS formula: [ (Quarterly Revenue_Q - Quarterly Revenue_Q-1) * 4 ] / S&M_Q-1
  // If inputs are ARR: (ARR_Q - ARR_Q-1) / S&M_Annualized or Net New ARR / S&M_Q-1
  const standardMagicNumber = (priorQuarterSmExpense || 0) > 0 ? netNewArr / priorQuarterSmExpense : 0;

  const getEfficiencyTier = () => {
    if (standardMagicNumber > 1.0) return { label: "Hyper-Efficient (Pour gas on Sales & Marketing)", color: "text-emerald-400" };
    if (standardMagicNumber >= 0.75) return { label: "Efficient (Healthy Unit Economics)", color: "text-emerald-300" };
    return { label: "Inefficient / High Burn (Fix Funnel / Churn)", color: "text-rose-400" };
  };

  const status = getEfficiencyTier();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Sparkles}
            title="SaaS Magic Number & Go-to-Market Efficiency Solver"
            description="Evaluate sales and marketing efficiency by comparing net new ARR created against prior quarter GTM spend."
          />
          <ResetButton onReset={() => {
            setCurrentQuarterArr(3200000);
            setPriorQuarterArr(2750000);
            setPriorQuarterSmExpense(450000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Current Quarter Ending ARR ($)" type="number" prefix="$" value={currentQuarterArr} onChange={(e) => setCurrentQuarterArr(Number(e.target.value))} />
            <InputField label="Prior Quarter Ending ARR ($)" type="number" prefix="$" value={priorQuarterArr} onChange={(e) => setPriorQuarterArr(Number(e.target.value))} />
            <InputField label="Prior Quarter Sales & Marketing (S&M) Spend ($)" type="number" prefix="$" value={priorQuarterSmExpense} onChange={(e) => setPriorQuarterSmExpense(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="GTM Efficiency Metric">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">SaaS Magic Number</div>
                  <div className="text-4xl font-extrabold text-white">{standardMagicNumber.toFixed(2)}x</div>
                  <div className={`text-xs font-semibold mt-1 ${status.color}`}>{status.label}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Net New ARR Generated:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">${netNewArr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">CAC Payback Implied:</span>
                    <p className="text-white font-bold text-sm mt-0.5">
                      {standardMagicNumber > 0 ? `${(12 / standardMagicNumber).toFixed(1)} Months` : "N/A"}
                    </p>
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
