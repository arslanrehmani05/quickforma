import React, { useState } from "react";
import { TrendingUp, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RoceCalculator: React.FC = () => {
  const [ebit, setEbit] = useState<number>(450000); // Operating Profit (EBIT)
  const [totalAssets, setTotalAssets] = useState<number>(3200000);
  const [currentLiabilities, setCurrentLiabilities] = useState<number>(700000);

  const safeEbit = Number(ebit);
  const safeAssets = Math.max(0, totalAssets);
  const safeLiabilities = Math.max(0, currentLiabilities);

  // Capital Employed = Total Assets - Current Liabilities
  const capitalEmployed = Math.max(0.01, safeAssets - safeLiabilities);

  // ROCE = EBIT / Capital Employed
  const rocePct = (safeEbit / capitalEmployed) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Return on Capital Employed (ROCE) Calculator"
            description="Assess overall profitability and capital efficiency: ROCE = EBIT / (Total Assets - Current Liabilities)."
          />
          <ResetButton onReset={() => {
            setEbit(450000);
            setTotalAssets(3200000);
            setCurrentLiabilities(700000);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Operating Profit (EBIT) ($)"
            type="number"
            step={25000}
            value={ebit}
            onChange={(e) => setEbit(Number(e.target.value))}
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
            label="Current Liabilities ($)"
            type="number"
            min={0}
            step={25000}
            value={currentLiabilities}
            onChange={(e) => setCurrentLiabilities(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Capital Return Profile">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">ROCE Percentage</span>
              <p className={`text-4xl font-extrabold mt-2 ${rocePct >= 15 ? "text-emerald-400" : rocePct >= 8 ? "text-white" : "text-rose-400"}`}>
                {rocePct.toFixed(2)}%
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Operating return on employed funds</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Capital Employed</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">${Math.round(capitalEmployed).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Assets minus short-term debts</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Quality Benchmark</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {rocePct >= 20 ? "Superb Capital Efficiency (>20%)" : rocePct >= 12 ? "Healthy Commercial Return" : "Sub-Par Capital Yield"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
