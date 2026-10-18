import React, { useState } from "react";
import { GitBranch, Percent, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DupontAnalysisCalculator: React.FC = () => {
  const [netIncome, setNetIncome] = useState<number>(350000);
  const [salesRevenue, setSalesRevenue] = useState<number>(2800000);
  const [averageAssets, setAverageAssets] = useState<number>(2000000);
  const [averageEquity, setAverageEquity] = useState<number>(1100000);

  const safeSales = Math.max(0.01, salesRevenue);
  const safeAssets = Math.max(0.01, averageAssets);
  const safeEquity = Math.max(0.01, averageEquity);

  // 3-Step DuPont Equation:
  // ROE = Net Profit Margin * Asset Turnover * Equity Multiplier
  const netProfitMargin = (netIncome / safeSales) * 100;
  const assetTurnover = safeSales / safeAssets;
  const equityMultiplier = safeAssets / safeEquity;
  const roePct = (netProfitMargin / 100) * assetTurnover * equityMultiplier * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GitBranch}
            title="DuPont Analysis (3-Step Return on Equity Decomposition) Calculator"
            description="Decompose Return on Equity (ROE) into Operating Efficiency (Net Margin), Asset Efficiency (Turnover), and Financial Leverage (Equity Multiplier)."
          />
          <ResetButton onReset={() => {
            setNetIncome(350000);
            setSalesRevenue(2800000);
            setAverageAssets(2000000);
            setAverageEquity(1100000);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Net Income ($)"
            type="number"
            step={25000}
            value={netIncome}
            onChange={(e) => setNetIncome(Number(e.target.value))}
          />
          <InputField
            label="Sales Revenue ($)"
            type="number"
            min={1}
            step={50000}
            value={salesRevenue}
            onChange={(e) => setSalesRevenue(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Average Total Assets ($)"
            type="number"
            min={1}
            step={50000}
            value={averageAssets}
            onChange={(e) => setAverageAssets(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Average Equity ($)"
            type="number"
            min={1}
            step={25000}
            value={averageEquity}
            onChange={(e) => setAverageEquity(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="DuPont 3-Factor ROE Breakdown">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total ROE</span>
              <p className={`text-4xl font-extrabold mt-2 ${roePct >= 15 ? "text-emerald-400" : "text-white"}`}>
                {roePct.toFixed(2)}%
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Return on Equity</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">1. Net Margin</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">{netProfitMargin.toFixed(1)}%</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Operating efficiency</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">2. Asset Turnover</span>
              <p className="text-3xl font-extrabold text-amber-300 mt-2">{assetTurnover.toFixed(2)}×</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Asset deployment speed</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">3. Equity Multiplier</span>
              <p className="text-2xl font-mono font-bold text-slate-200 mt-2">{equityMultiplier.toFixed(2)}×</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Financial leverage</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
