import React, { useState } from "react";
import { Flame, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BurnMultipleCalculator: React.FC = () => {
  const [netCashBurnPeriod, setNetCashBurnPeriod] = useState<number>(350000);
  const [netNewArrAdded, setNetNewArrAdded] = useState<number>(280000);

  const handleReset = () => {
    setNetCashBurnPeriod(350000);
    setNetNewArrAdded(280000);
  };

  // Burn Multiple = Net Burn / Net New ARR
  const burnMultiple = netNewArrAdded > 0 ? netCashBurnPeriod / netNewArrAdded : 99;
  const capitalEfficiencyTier =
    burnMultiple < 1.0 ? "Amazing (<1.0x)" :
    burnMultiple <= 1.5 ? "Good (1.0x - 1.5x)" :
    burnMultiple <= 2.0 ? "Maniac / Suspect (1.5x - 2.0x)" : "Poor (>2.0x)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Startup Capital Efficiency Burn Multiple Solver"
        description="Compute venture capital capital efficiency (Burn Multiple = Net Cash Burn / Net New ARR generated)."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Net Cash Burn in Period ($)"
            value={netCashBurnPeriod}
            onChange={(val) => setNetCashBurnPeriod(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Net New ARR Added in Period ($)"
            value={netNewArrAdded}
            onChange={(val) => setNetNewArrAdded(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Burn Multiple"
            value={`${burnMultiple.toFixed(2)}x`}
            subtitle={`$${burnMultiple.toFixed(2)} burned per $1 of ARR created`}
            variant="light"
          />
          <ResultCard
            title="Efficiency Rating"
            value={capitalEfficiencyTier}
            subtitle="David Sacks VC benchmark index"
            variant="light"
          />
          <ResultCard
            title="Capital Productivity"
            value={`$${(netNewArrAdded / netCashBurnPeriod).toFixed(2)} ARR / $ burned`}
            subtitle="New recurring revenue yield per dollar"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
