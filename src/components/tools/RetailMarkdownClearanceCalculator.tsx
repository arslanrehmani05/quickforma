import React, { useState } from "react";
import { Tag, DollarSign, Percent, TrendingDown } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RetailMarkdownClearanceCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number>(89.00);
  const [costOfGoods, setCostOfGoods] = useState<number>(32.00);
  const [markdownPercent, setMarkdownPercent] = useState<number>(40);
  const [clearanceUnits, setClearanceUnits] = useState<number>(250);

  const handleReset = () => {
    setOriginalPrice(89.00);
    setCostOfGoods(32.00);
    setMarkdownPercent(40);
    setClearanceUnits(250);
  };

  const clearancePrice = originalPrice * (1 - markdownPercent / 100);
  const grossProfitPerUnit = clearancePrice - costOfGoods;
  const clearanceMarginPercent = clearancePrice > 0 ? (grossProfitPerUnit / clearancePrice) * 100 : 0;
  const totalCashRecovered = clearancePrice * clearanceUnits;
  const totalProfitOrLoss = grossProfitPerUnit * clearanceUnits;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Clearance Discount & Liquidation Recovery"
        description="Compute retail markdown clearance sale prices, inventory liquidation cash recovery, and gross margin impact."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Original Retail Price ($)"
            value={originalPrice}
            onChange={(val) => setOriginalPrice(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            prefix="$"
          />
          <InputField
            label="Unit Cost of Goods (COGS) ($)"
            value={costOfGoods}
            onChange={(val) => setCostOfGoods(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Clearance Markdown Discount (%)"
            value={markdownPercent}
            onChange={(val) => setMarkdownPercent(Math.min(99, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={99}
            suffix="%"
          />
          <InputField
            label="Clearance Inventory Quantity"
            value={clearanceUnits}
            onChange={(val) => setClearanceUnits(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Clearance Ticket Price"
          value={`$${clearancePrice.toFixed(2)}`}
          subtitle={`${markdownPercent}% off original`}
          variant="indigo"
        />
        <ResultCard
          title="Profit / Loss Per Unit"
          value={`${grossProfitPerUnit >= 0 ? "+" : ""}$${grossProfitPerUnit.toFixed(2)}`}
          subtitle={`${clearanceMarginPercent.toFixed(1)}% margin`}
          variant="light"
        />
        <ResultCard
          title="Cash Capital Recovered"
          value={`$${totalCashRecovered.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Liquidation revenue"
          variant="light"
        />
        <ResultCard
          title="Total Margin Contribution"
          value={`${totalProfitOrLoss >= 0 ? "+" : ""}$${totalProfitOrLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={totalProfitOrLoss >= 0 ? "Above cost recovery" : "Operating loss on stock"}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Liquidation Breakeven</h4>
        <p className="text-slate-600">
          Your cost breakeven markdown limit is <strong className="text-slate-800">{((1 - (costOfGoods / originalPrice)) * 100).toFixed(1)}%</strong>. Liquidating at {markdownPercent}% preserves a gross profit of <strong className="text-slate-800">${grossProfitPerUnit.toFixed(2)}</strong> per unit while liberating <strong className="text-slate-800">${totalCashRecovered.toLocaleString()}</strong> in liquid working capital.
        </p>
      </div>
    </div>
  );
};
