import React, { useState } from "react";
import { Percent, DollarSign, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GrossMarginStandaloneCalculator: React.FC = () => {
  const [sellingPrice, setSellingPrice] = useState<number>(150);
  const [costOfGoodsSold, setCostOfGoodsSold] = useState<number>(65);
  const [targetMargin, setTargetMargin] = useState<number>(60);

  const grossProfit = Math.max(0, (sellingPrice || 0) - (costOfGoodsSold || 0));
  const grossMarginPercent = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const markupPercent = costOfGoodsSold > 0 ? (grossProfit / costOfGoodsSold) * 100 : 0;

  // Target price calculation
  const targetSellingPrice = targetMargin < 100 ? (costOfGoodsSold || 0) / (1 - targetMargin / 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Percent}
            title="Gross Margin Percentage Standalone Calculator"
            description="Calculate gross profit margin percentage, markup equivalent, and required price points for target margins."
          />
          <ResetButton onReset={() => {
            setSellingPrice(150);
            setCostOfGoodsSold(65);
            setTargetMargin(60);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Selling Price per Unit ($)" type="number" prefix="$" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} />
            <InputField label="Cost of Goods Sold (COGS) per Unit ($)" type="number" prefix="$" value={costOfGoodsSold} onChange={(e) => setCostOfGoodsSold(Number(e.target.value))} />
            <InputField label="Target Desired Gross Margin (%)" type="number" suffix="%" value={targetMargin} onChange={(e) => setTargetMargin(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Profitability Margin">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Gross Profit Margin</div>
                  <div className="text-4xl font-extrabold text-white">{grossMarginPercent.toFixed(1)}%</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    Gross Profit: <span className="font-bold text-white">${grossProfit.toFixed(2)}/unit</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Equivalent Markup:</span>
                    <p className="text-emerald-300 font-bold text-sm mt-0.5">{markupPercent.toFixed(1)}%</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-slate-400">Target Price for {targetMargin}% Margin:</span>
                    <p className="text-indigo-200 font-bold text-sm mt-0.5">${targetSellingPrice.toFixed(2)}</p>
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
