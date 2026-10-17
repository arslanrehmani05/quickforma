import React, { useState } from "react";
import { Megaphone, TrendingUp, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ReturnOnAdSpendRoas: React.FC = () => {
  const [adSpend, setAdSpend] = useState<number>(8500);
  const [revenue, setRevenue] = useState<number>(34000);
  const [grossMargin, setGrossMargin] = useState<number>(65); // 65% product margin

  const spend = adSpend || 0;
  const rev = revenue || 0;
  const margin = (grossMargin || 0) / 100;

  const roasMultiplier = spend > 0 ? rev / spend : 0;
  const roasPercent = roasMultiplier * 100;

  // Break-even ROAS = 1 / Gross Margin
  const breakEvenRoas = margin > 0 ? 1 / margin : 0;
  const breakEvenRoasPct = breakEvenRoas * 100;

  // Net Profit from Ad Campaign = (Revenue * Gross Margin) - Ad Spend
  const netAdProfit = (rev * margin) - spend;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Megaphone}
            title="Google, Meta, TikTok Ad Spend ROAS & Break-Even"
            description="Calculate Return on Ad Spend (ROAS) multiple, break-even threshold, and net profit contribution after product margins."
          />
          <ResetButton onReset={() => {
            setAdSpend(8500);
            setRevenue(34000);
            setGrossMargin(65);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Advertising Spend ($)" type="number" prefix="$" value={adSpend} onChange={(e) => setAdSpend(Number(e.target.value))} />
            <InputField label="Total Attributed Sales Revenue ($)" type="number" prefix="$" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
            <InputField label="Product Gross Profit Margin (%)" type="number" suffix="%" value={grossMargin} onChange={(e) => setGrossMargin(Number(e.target.value))} helpText="Cost of goods percentage remaining after manufacturing." />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Advertising ROAS Health">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Campaign ROAS Multiple</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    {roasMultiplier.toFixed(2)}x ({roasPercent.toFixed(0)}%)
                  </div>
                  <p className="text-xs text-slate-400">
                    Break-Even ROAS: <strong className="text-white">{breakEvenRoas.toFixed(2)}x</strong> ({breakEvenRoasPct.toFixed(0)}%) based on {grossMargin}% margin.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Net Campaign Profit</span>
                    <span className={`text-base font-bold font-mono ${netAdProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      ${Math.round(netAdProfit).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Gross Profit Generated</span>
                    <span className="text-base font-bold text-white font-mono">${Math.round(rev * margin).toLocaleString()}</span>
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
