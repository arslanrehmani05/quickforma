import React, { useState } from "react";
import { Package, Calendar, RefreshCw, BarChart3 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InventoryTurnsDaysSalesCalculator: React.FC = () => {
  const [cogs, setCogs] = useState<number>(450000);
  const [beginningInventory, setBeginningInventory] = useState<number>(75000);
  const [endingInventory, setEndingInventory] = useState<number>(85000);
  const [periodDays, setPeriodDays] = useState<number>(365);

  const handleReset = () => {
    setCogs(450000);
    setBeginningInventory(75000);
    setEndingInventory(85000);
    setPeriodDays(365);
  };

  const avgInventory = (beginningInventory + endingInventory) / 2;
  const turns = avgInventory > 0 ? cogs / avgInventory : 0;
  const dio = turns > 0 ? periodDays / turns : 0;
  const dailyCogs = periodDays > 0 ? cogs / periodDays : 0;

  let velocityRating = "Moderate";
  if (turns >= 8) velocityRating = "High Velocity (Top Quartile)";
  else if (turns >= 4) velocityRating = "Healthy Turnover";
  else velocityRating = "Slow Moving / Overstocked Risk";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Days Inventory Outstanding (DIO) Standalone Solver"
        description="Compute Inventory Turnover Ratio and Days Sales of Inventory (DSI / DIO) to assess cash flow velocity."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Cost of Goods Sold (COGS) ($)"
            value={cogs}
            onChange={(val) => setCogs(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Analysis Period (Days)"
            value={periodDays}
            onChange={(val) => setPeriodDays(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="days"
          />
          <InputField
            label="Beginning Inventory Valuation ($)"
            value={beginningInventory}
            onChange={(val) => setBeginningInventory(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Ending Inventory Valuation ($)"
            value={endingInventory}
            onChange={(val) => setEndingInventory(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Inventory Turns"
          value={`${turns.toFixed(2)}x`}
          subtitle={`Annual velocity`}
          variant="indigo"
        />
        <ResultCard
          title="Days Outstanding (DIO)"
          value={`${dio.toFixed(1)} days`}
          subtitle="Time to sell out"
          variant="light"
        />
        <ResultCard
          title="Average Inventory"
          value={`$${avgInventory.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Capital tied up"
          variant="light"
        />
        <ResultCard
          title="Daily Cost of Sales"
          value={`$${dailyCogs.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={velocityRating}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Operational Interpretation</h4>
        <p className="text-slate-600">
          At an inventory turnover of <strong className="text-slate-800">{turns.toFixed(2)} times</strong> per period, your working capital is converted back into cash every <strong className="text-slate-800">{dio.toFixed(0)} days</strong>. Reducing DIO by just 5 days frees up approximately <strong className="text-slate-800">${(dailyCogs * 5).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> in liquid cash flow.
        </p>
      </div>
    </div>
  );
};
