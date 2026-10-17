import React, { useState } from "react";
import { MousePointerClick, Eye, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ClickThroughRateCtrCalculator: React.FC = () => {
  const [impressions, setImpressions] = useState<number>(450000);
  const [clicks, setClicks] = useState<number>(9450);
  const [totalCost, setTotalCost] = useState<number>(4200);

  const imp = impressions || 0;
  const clk = clicks || 0;
  const cost = totalCost || 0;

  const ctr = imp > 0 ? (clk / imp) * 100 : 0;
  const cpc = clk > 0 ? cost / clk : 0;
  const cpm = imp > 0 ? (cost / imp) * 1000 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={MousePointerClick}
            title="Impressions & Clicks CTR Percentage Solver"
            description="Calculate advertising Click-Through Rate (CTR), Cost Per Click (CPC), and Effective Cost Per Mille (CPM)."
          />
          <ResetButton onReset={() => {
            setImpressions(450000);
            setClicks(9450);
            setTotalCost(4200);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Ad Impressions" type="number" value={impressions} onChange={(e) => setImpressions(Number(e.target.value))} />
            <InputField label="Total Ad Clicks" type="number" value={clicks} onChange={(e) => setClicks(Number(e.target.value))} />
            <InputField label="Total Campaign Ad Cost ($)" type="number" prefix="$" value={totalCost} onChange={(e) => setTotalCost(Number(e.target.value))} helpText="Optional to compute CPC and CPM metrics." />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Engagement & Efficiency">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Click-Through Rate (CTR)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    {ctr.toFixed(2)}%
                  </div>
                  <p className="text-xs text-slate-400">
                    Average search ads benchmark: 2.5% – 5.0% | Display ads: 0.3% – 0.8%
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Cost Per Click (CPC)</span>
                    <span className="text-base font-bold text-white">${cpc.toFixed(2)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Cost Per Mille (CPM)</span>
                    <span className="text-base font-bold text-white">${cpm.toFixed(2)}</span>
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
