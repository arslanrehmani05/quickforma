import React, { useState } from "react";
import { TrendingUp, DollarSign, Award, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const StockOptionExerciseCalculator: React.FC = () => {
  const [vestedOptionsCount, setVestedOptionsCount] = useState<number>(10000);
  const [strikePrice, setStrikePrice] = useState<number>(2.50);
  const [fairMarketValueFmv, setFairMarketValueFmv] = useState<number>(14.00);

  const handleReset = () => {
    setVestedOptionsCount(10000);
    setStrikePrice(2.50);
    setFairMarketValueFmv(14.00);
  };

  const totalExerciseCost = vestedOptionsCount * strikePrice;
  const totalFairMarketValue = vestedOptionsCount * fairMarketValueFmv;
  const grossPreTaxSpread = Math.max(0, totalFairMarketValue - totalExerciseCost);
  // Estimated AMT or income tax on spread (~28% AMT illustrative rate)
  const estimatedAmtTaxLiability = grossPreTaxSpread * 0.28;
  const netEquityGain = grossPreTaxSpread - estimatedAmtTaxLiability;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Employee Stock Option (ISO/NSO) Strike & Tax Solver"
        description="Calculate cost to exercise vested startup stock options, Fair Market Value (FMV) spread, and estimated AMT tax liability."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Vested Options to Exercise"
            value={vestedOptionsCount}
            onChange={(val) => setVestedOptionsCount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Option Grant Strike Price ($)"
            value={strikePrice}
            onChange={(val) => setStrikePrice(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            step={0.1}
            prefix="$"
          />
          <InputField
            label="Current 409A / FMV ($)"
            value={fairMarketValueFmv}
            onChange={(val) => setFairMarketValueFmv(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            step={0.5}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Exercise Cash Required"
            value={`$${totalExerciseCost.toLocaleString()}`}
            subtitle="Out-of-pocket strike price purchase"
            variant="light"
          />
          <ResultCard
            title="Pre-Tax Spread Value"
            value={`$${grossPreTaxSpread.toLocaleString()}`}
            subtitle="FMV minus exercise cost"
            variant="indigo"
          />
          <ResultCard
            title="Estimated 28% AMT Tax"
            value={`-$${estimatedAmtTaxLiability.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Alternative Minimum Tax on spread"
            variant="light"
          />
          <ResultCard
            title="Net Paper Gain"
            value={`$${netEquityGain.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Net equity value after tax buffer"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
