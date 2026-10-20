import React, { useState } from "react";
import { TrendingUp, DollarSign, Calendar, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CompoundAnnualGrowthRateCagr: React.FC = () => {
  const [beginningValue, setBeginningValue] = useState<number>(250000);
  const [endingValue, setEndingValue] = useState<number>(1200000);
  const [numberOfYears, setNumberOfYears] = useState<number>(5);

  const handleReset = () => {
    setBeginningValue(250000);
    setEndingValue(1200000);
    setNumberOfYears(5);
  };

  // CAGR = (Ending Value / Beginning Value)^(1 / Years) - 1
  const cagrPercent = (beginningValue > 0 && endingValue > 0 && numberOfYears > 0)
    ? (Math.pow(endingValue / beginningValue, 1 / numberOfYears) - 1) * 100
    : 0;
  const totalGrowthPercent = beginningValue > 0 ? ((endingValue - beginningValue) / beginningValue) * 100 : 0;
  const totalGainDollar = endingValue - beginningValue;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Compound Annual Growth Rate (CAGR) Solver"
        description="Calculate smoothed annual growth rates across revenue, portfolio investments, and corporate earnings."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Initial / Beginning Value ($)"
            value={beginningValue}
            onChange={(val) => setBeginningValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Final / Ending Value ($)"
            value={endingValue}
            onChange={(val) => setEndingValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Time Elapsed (Years)"
            value={numberOfYears}
            onChange={(val) => setNumberOfYears(Math.min(50, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            step={0.5}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Compound Annual Growth Rate (CAGR)"
            value={`${cagrPercent.toFixed(2)}%`}
            subtitle="Annualized compound trajectory"
            variant="indigo"
          />
          <ResultCard
            title="Total Absolute Growth"
            value={`+${totalGrowthPercent.toFixed(1)}%`}
            subtitle={`$${totalGainDollar.toLocaleString()} total expansion`}
            variant="light"
          />
          <ResultCard
            title="Expansion Multiple"
            value={`${(endingValue / Math.max(1, beginningValue)).toFixed(2)}x`}
            subtitle="Total capital growth multiple"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
