import React, { useState } from "react";
import { TrendingUp, DollarSign, Percent, BarChart3, HelpCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ContributionMarginCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(50000);
  const [variableCosts, setVariableCosts] = useState<number>(22000);
  const [fixedCosts, setFixedCosts] = useState<number>(15000);
  const [unitsSold, setUnitsSold] = useState<number>(1000);

  const cmDollars = Math.max(0, (revenue || 0) - (variableCosts || 0));
  const cmRatio = revenue > 0 ? (cmDollars / revenue) * 100 : 0;
  const breakEvenRevenue = cmRatio > 0 ? (fixedCosts || 0) / (cmRatio / 100) : 0;
  
  const cmPerUnit = unitsSold > 0 ? cmDollars / unitsSold : 0;
  const breakEvenUnits = cmPerUnit > 0 ? (fixedCosts || 0) / cmPerUnit : 0;
  const netOperatingProfit = cmDollars - (fixedCosts || 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Contribution Margin & Ratio Calculator"
            description="Calculate dollar contribution margin, margin ratio percentage, break-even sales volume, and operating leverage."
          />
          <ResetButton onReset={() => {
            setRevenue(50000);
            setVariableCosts(22000);
            setFixedCosts(15000);
            setUnitsSold(1000);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Total Sales Revenue ($)"
              type="number"
              prefix="$"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              helpText="Gross sales income generated across the period."
            />
            <InputField
              label="Total Variable Costs ($)"
              type="number"
              prefix="$"
              value={variableCosts}
              onChange={(e) => setVariableCosts(Number(e.target.value))}
              helpText="Direct materials, direct labor, packaging, merchant fees."
            />
            <InputField
              label="Total Fixed Overhead Costs ($)"
              type="number"
              prefix="$"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              helpText="Rent, salaries, insurance, software, and equipment depreciation."
            />
            <InputField
              label="Total Units Sold"
              type="number"
              value={unitsSold}
              onChange={(e) => setUnitsSold(Number(e.target.value))}
              helpText="Total product units or billable project deliverables delivered."
            />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Margin & Profit Analysis">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Contribution Margin Ratio</div>
                  <div className="text-4xl font-extrabold text-white">{cmRatio.toFixed(1)}%</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    ${(cmRatio / 100).toFixed(2)} of every revenue dollar covers fixed costs and profit
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] text-slate-400 font-medium">Contribution Margin ($)</div>
                    <div className="text-lg font-bold text-white mt-0.5">${cmDollars.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] text-slate-400 font-medium">Net Operating Profit ($)</div>
                    <div className={`text-lg font-bold mt-0.5 ${netOperatingProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      ${netOperatingProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] text-slate-400 font-medium">Break-Even Revenue</div>
                    <div className="text-lg font-bold text-indigo-300 mt-0.5">${breakEvenRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                  </div>
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-[11px] text-slate-400 font-medium">Break-Even Units</div>
                    <div className="text-lg font-bold text-indigo-300 mt-0.5">{Math.ceil(breakEvenUnits).toLocaleString()} units</div>
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
