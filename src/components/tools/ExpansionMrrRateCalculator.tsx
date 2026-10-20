import React, { useState } from "react";
import { TrendingUp, DollarSign, ArrowUpRight, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ExpansionMrrRateCalculator: React.FC = () => {
  const [startingBeginningMrr, setStartingBeginningMrr] = useState<number>(100000);
  const [expansionUpgradeMrr, setExpansionUpgradeMrr] = useState<number>(8500);
  const [crossSellAddonMrr, setCrossSellAddonMrr] = useState<number>(3200);

  const handleReset = () => {
    setStartingBeginningMrr(100000);
    setExpansionUpgradeMrr(8500);
    setCrossSellAddonMrr(3200);
  };

  const totalExpansionMrr = expansionUpgradeMrr + crossSellAddonMrr;
  const expansionMrrRate = startingBeginningMrr > 0 ? (totalExpansionMrr / startingBeginningMrr) * 100 : 0;
  const annualizedExpansionArr = totalExpansionMrr * 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="SaaS Expansion MRR Rate & Upsell Solver"
        description="Track net monthly recurring revenue expansion, subscription tier upgrades, and account cross-sell velocity."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Beginning of Month MRR ($)"
            value={startingBeginningMrr}
            onChange={(val) => setStartingBeginningMrr(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Seat Upgrades / Plan Expansion ($)"
            value={expansionUpgradeMrr}
            onChange={(val) => setExpansionUpgradeMrr(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Add-On / Cross-Sell MRR ($)"
            value={crossSellAddonMrr}
            onChange={(val) => setCrossSellAddonMrr(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Total Monthly Expansion MRR"
            value={`$${totalExpansionMrr.toLocaleString()}`}
            subtitle="Net upsell added to run rate"
            variant="indigo"
          />
          <ResultCard
            title="Monthly Expansion Rate"
            value={`${expansionMrrRate.toFixed(2)}%`}
            subtitle="Percentage of beginning baseline"
            variant="light"
          />
          <ResultCard
            title="Annualized Expansion (ARR)"
            value={`$${annualizedExpansionArr.toLocaleString()}`}
            subtitle="Annualized incremental revenue"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
