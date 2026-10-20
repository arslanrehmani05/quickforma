import React, { useState } from "react";
import { Zap, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SaasQuickRatioCalculator: React.FC = () => {
  const [newMrr, setNewMrr] = useState<number>(18000);
  const [expansionMrr, setExpansionMrr] = useState<number>(7500);
  const [churnedMrr, setChurnedMrr] = useState<number>(4200);
  const [contractionMrr, setContractionMrr] = useState<number>(1800);

  const handleReset = () => {
    setNewMrr(18000);
    setExpansionMrr(7500);
    setChurnedMrr(4200);
    setContractionMrr(1800);
  };

  const totalMrrGained = newMrr + expansionMrr;
  const totalMrrLost = churnedMrr + contractionMrr;
  // SaaS Quick Ratio = (New MRR + Expansion MRR) / (Churned MRR + Contraction MRR)
  const quickRatio = totalMrrLost > 0 ? totalMrrGained / totalMrrLost : totalMrrGained > 0 ? 99 : 0;
  const netMrrGrowth = totalMrrGained - totalMrrLost;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="SaaS Quick Ratio Growth vs Churn Health Solver"
        description="Benchmark SaaS revenue growth efficiency against revenue leakage (Quick Ratio = Gained MRR / Lost MRR)."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="New Customer MRR ($)"
            value={newMrr}
            onChange={(val) => setNewMrr(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Expansion / Upsell MRR ($)"
            value={expansionMrr}
            onChange={(val) => setExpansionMrr(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Churned / Canceled MRR ($)"
            value={churnedMrr}
            onChange={(val) => setChurnedMrr(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Contraction / Downgrade MRR ($)"
            value={contractionMrr}
            onChange={(val) => setContractionMrr(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="SaaS Quick Ratio"
            value={`${quickRatio.toFixed(2)}x`}
            subtitle={quickRatio >= 4 ? "Top-tier SaaS growth (>4.0x)" : quickRatio >= 2 ? "Healthy growth (2.0x-4.0x)" : "Underperforming (<2.0x)"}
            variant="light"
          />
          <ResultCard
            title="Net MRR Growth"
            value={`+$${netMrrGrowth.toLocaleString()}`}
            subtitle="Gained MRR minus lost MRR"
            variant="indigo"
          />
          <ResultCard
            title="Total Revenue Gained"
            value={`$${totalMrrGained.toLocaleString()}`}
            subtitle="New + expansion monthly income"
            variant="light"
          />
          <ResultCard
            title="Total Revenue Lost"
            value={`-$${totalMrrLost.toLocaleString()}`}
            subtitle="Churn + contraction monthly drain"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
