import React, { useState } from "react";
import { TrendingDown, DollarSign, Calendar, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InflationPurchasingPowerCalculator: React.FC = () => {
  const [startingCashAmount, setStartingCashAmount] = useState<number>(50000);
  const [annualInflationRate, setAnnualInflationRate] = useState<number>(3.2); // 3.2% CPI
  const [yearsElapsed, setYearsElapsed] = useState<number>(15);

  const handleReset = () => {
    setStartingCashAmount(50000);
    setAnnualInflationRate(3.2);
    setYearsElapsed(15);
  };

  const r = annualInflationRate / 100;
  // Future purchasing power: Amount / (1+r)^t
  const futurePurchasingPower = startingCashAmount / Math.pow(1 + r, yearsElapsed);
  const purchasingPowerLost = startingCashAmount - futurePurchasingPower;
  const percentageValueLost = (purchasingPowerLost / startingCashAmount) * 100;
  // Equivalent nominal dollars needed in future: Amount * (1+r)^t
  const futureNominalEquivalent = startingCashAmount * Math.pow(1 + r, yearsElapsed);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Inflation Purchasing Power Loss & Future Value Solver"
        description="Quantify cash erosion over time, real purchasing power loss, and future dollar equivalents under compound inflation."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Initial Cash Amount ($)"
            value={startingCashAmount}
            onChange={(val) => setStartingCashAmount(Math.max(10, Number(val) || 0))}
            type="number"
            min={10}
            prefix="$"
          />
          <InputField
            label="Annual Inflation Rate (CPI %)"
            value={annualInflationRate}
            onChange={(val) => setAnnualInflationRate(Math.min(25, Math.max(0.1, Number(val) || 0)))}
            type="number"
            min={0.1}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Time Horizon (Years)"
            value={yearsElapsed}
            onChange={(val) => setYearsElapsed(Math.min(60, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={60}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Real Future Purchasing Power"
            value={`$${futurePurchasingPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`In today's equivalent goods`}
            variant="light"
          />
          <ResultCard
            title="Purchasing Power Eroded"
            value={`-${percentageValueLost.toFixed(1)}%`}
            subtitle={`$${purchasingPowerLost.toLocaleString(undefined, { maximumFractionDigits: 0 })} in real value lost`}
            variant="light"
          />
          <ResultCard
            title="Equivalent Future Dollars"
            value={`$${futureNominalEquivalent.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle={`Needed to buy what $${startingCashAmount.toLocaleString()} buys today`}
            variant="light"
          />
          <ResultCard
            title="Rule of 72 Halving Time"
            value={`${(72 / annualInflationRate).toFixed(1)} years`}
            subtitle="Time until money loses half its value"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
