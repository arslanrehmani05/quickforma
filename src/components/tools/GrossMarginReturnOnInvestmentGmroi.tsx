import React, { useState } from "react";
import { ShoppingBag, DollarSign, Percent, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GrossMarginReturnOnInvestmentGmroi: React.FC = () => {
  const [annualGrossSales, setAnnualGrossSales] = useState<number>(650000);
  const [grossProfitDollar, setGrossProfitDollar] = useState<number>(312000);
  const [averageInventoryAtCost, setAverageInventoryAtCost] = useState<number>(95000);

  const handleReset = () => {
    setAnnualGrossSales(650000);
    setGrossProfitDollar(312000);
    setAverageInventoryAtCost(95000);
  };

  // GMROI = Gross Margin $ / Average Inventory at Cost
  const gmroiRatio = averageInventoryAtCost > 0 ? grossProfitDollar / averageInventoryAtCost : 0;
  const gmroiPercentage = gmroiRatio * 100;
  const grossMarginPercent = annualGrossSales > 0 ? (grossProfitDollar / annualGrossSales) * 100 : 0;
  const inventoryTurnover = (annualGrossSales - grossProfitDollar) / Math.max(1, averageInventoryAtCost);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Retail Inventory Gross Margin Return on Investment (GMROI) Solver"
        description="Assess retail merchandise profitability and inventory productivity (GMROI = Gross Margin Dollars / Average Inventory Cost)."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Annual Gross Sales ($)"
            value={annualGrossSales}
            onChange={(val) => setAnnualGrossSales(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Gross Margin Dollars ($)"
            value={grossProfitDollar}
            onChange={(val) => setGrossProfitDollar(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Average Inventory at Cost ($)"
            value={averageInventoryAtCost}
            onChange={(val) => setAverageInventoryAtCost(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="GMROI Multiple"
            value={`${gmroiRatio.toFixed(2)}x`}
            subtitle={`$${gmroiRatio.toFixed(2)} margin per $1 inventory cost`}
            variant="light"
          />
          <ResultCard
            title="GMROI Percentage"
            value={`${gmroiPercentage.toFixed(0)}%`}
            subtitle="Annual gross margin return"
            variant="indigo"
          />
          <ResultCard
            title="Gross Margin %"
            value={`${grossMarginPercent.toFixed(1)}%`}
            subtitle="Margin on retail selling price"
            variant="light"
          />
          <ResultCard
            title="Inventory Turns"
            value={`${inventoryTurnover.toFixed(1)}x / yr`}
            subtitle="COGS / Average Inventory Cost"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
