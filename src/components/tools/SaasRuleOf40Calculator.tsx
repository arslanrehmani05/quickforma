import React, { useState } from "react";
import { Award, Percent, TrendingUp, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SaasRuleOf40Calculator: React.FC = () => {
  const [growthRate, setGrowthRate] = useState<number>(32);
  const [profitMargin, setProfitMargin] = useState<number>(14);

  const ruleOf40Score = (growthRate || 0) + (profitMargin || 0);

  const getTier = () => {
    if (ruleOf40Score >= 50) return { label: "Elite Tier (> 50% Top Decile SaaS)", color: "text-emerald-400" };
    if (ruleOf40Score >= 40) return { label: "Healthy (Meets Rule of 40 Benchmark)", color: "text-emerald-300" };
    if (ruleOf40Score >= 20) return { label: "Lagging (< 40% Growth vs Burn Drag)", color: "text-amber-300" };
    return { label: "Distressed (Sub-scale or Severe Cash Burn)", color: "text-rose-400" };
  };

  const status = getTier();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Award}
            title="SaaS Rule of 40 Benchmark Calculator"
            description="Benchmark subscription software performance by summing YoY revenue growth rate and free cash flow or EBITDA margin."
          />
          <ResetButton onReset={() => {
            setGrowthRate(32);
            setProfitMargin(14);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Year-over-Year (YoY) Revenue Growth Rate (%)" type="number" suffix="%" value={growthRate} onChange={(e) => setGrowthRate(Number(e.target.value))} />
            <InputField label="Profitability Margin (FCF % or EBITDA %) (%)" type="number" suffix="%" value={profitMargin} onChange={(e) => setProfitMargin(Number(e.target.value))} helpText="Can be negative for high-growth venture companies." />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Rule of 40 Standing">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Rule of 40 Score</div>
                  <div className="text-5xl font-extrabold text-white">{ruleOf40Score.toFixed(1)}%</div>
                  <div className={`text-xs font-semibold mt-1 ${status.color}`}>{status.label}</div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Revenue Growth Component:</span>
                    <span className="font-bold text-white">{growthRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profitability Margin Component:</span>
                    <span className="font-bold text-white">{profitMargin}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valuation Multiple Premium:</span>
                    <span className="font-bold text-emerald-300">{ruleOf40Score >= 40 ? "Top Quartile ARR Multiples (8x-15x)" : "Discounted Multiples (< 5x)"}</span>
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
