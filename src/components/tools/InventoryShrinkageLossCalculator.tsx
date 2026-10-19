import React, { useState } from "react";
import { ShieldAlert, AlertTriangle, TrendingDown, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InventoryShrinkageLossCalculator: React.FC = () => {
  const [recordedBookInventory, setRecordedBookInventory] = useState<number>(285000);
  const [actualPhysicalInventory, setActualPhysicalInventory] = useState<number>(272000);
  const [totalAnnualSales, setTotalAnnualSales] = useState<number>(850000);

  const handleReset = () => {
    setRecordedBookInventory(285000);
    setActualPhysicalInventory(272000);
    setTotalAnnualSales(850000);
  };

  const dollarShrinkage = Math.max(0, recordedBookInventory - actualPhysicalInventory);
  const shrinkagePercentOfSales = totalAnnualSales > 0 ? (dollarShrinkage / totalAnnualSales) * 100 : 0;
  const shrinkagePercentOfInventory = recordedBookInventory > 0 ? (dollarShrinkage / recordedBookInventory) * 100 : 0;
  const dailyLoss = dollarShrinkage / 365;

  let benchmarkStatus = "Normal (< 1.4%)";
  if (shrinkagePercentOfSales > 2.0) benchmarkStatus = "Severe Theft / Spoilage (> 2.0%)";
  else if (shrinkagePercentOfSales > 1.4) benchmarkStatus = "Above National Average (1.4% – 2.0%)";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Retail Inventory Theft & Spoilage Impact"
        description="Calculate inventory shrinkage losses from shoplifting, employee theft, damage, and administrative error."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Book Inventory Balance ($)"
            value={recordedBookInventory}
            onChange={(val) => setRecordedBookInventory(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Physical Count Inventory ($)"
            value={actualPhysicalInventory}
            onChange={(val) => setActualPhysicalInventory(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Total Annual Sales Revenue ($)"
            value={totalAnnualSales}
            onChange={(val) => setTotalAnnualSales(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Shrinkage Dollar Loss"
          value={`$${dollarShrinkage.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Missing inventory value"
          variant="indigo"
        />
        <ResultCard
          title="Shrinkage % of Sales"
          value={`${shrinkagePercentOfSales.toFixed(2)}%`}
          subtitle="NRF benchmark: 1.4%"
          variant="light"
        />
        <ResultCard
          title="Daily Financial Bleed"
          value={`$${dailyLoss.toFixed(2)} / day`}
          subtitle="Loss per calendar day"
          variant="light"
        />
        <ResultCard
          title="Benchmark Rating"
          value={shrinkagePercentOfSales <= 1.4 ? "HEALTHY" : "ELEVATED"}
          subtitle={benchmarkStatus}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Loss Prevention Assessment</h4>
        <p className="text-slate-600">
          According to the National Retail Federation (NRF), average retail shrinkage sits at 1.4% to 1.6% of sales. Your shrinkage rate is <strong className="text-slate-800">{shrinkagePercentOfSales.toFixed(2)}%</strong>. Implementing cycle counts and RFID tagging can recover up to 40% of this annual <strong className="text-slate-800">${dollarShrinkage.toLocaleString()}</strong> loss.
        </p>
      </div>
    </div>
  );
};
