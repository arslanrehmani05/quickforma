import React, { useState } from "react";
import { Building, DollarSign, Calculator, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GrossRentMultiplierGrm: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(450000);
  const [monthlyGrossRent, setMonthlyGrossRent] = useState<number>(4200);
  const [targetMarketGrm, setTargetMarketGrm] = useState<number>(8.5); // Area benchmark GRM

  const handleReset = () => {
    setPropertyPrice(450000);
    setMonthlyGrossRent(4200);
    setTargetMarketGrm(8.5);
  };

  const annualGrossRent = monthlyGrossRent * 12;
  const calculatedGrm = annualGrossRent > 0 ? propertyPrice / annualGrossRent : 0;
  const benchmarkFairMarketValue = annualGrossRent * targetMarketGrm;
  const valuationSpread = benchmarkFairMarketValue - propertyPrice;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Gross Rent Multiplier & Property Valuation Solver"
        description="Compute real estate Gross Rent Multiplier (GRM), fair market valuations, and rental income property comparisons."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Property Asking / Purchase Price ($)"
            value={propertyPrice}
            onChange={(val) => setPropertyPrice(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Total Monthly Scheduled Rent ($)"
            value={monthlyGrossRent}
            onChange={(val) => setMonthlyGrossRent(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Neighborhood Benchmark GRM"
            value={targetMarketGrm}
            onChange={(val) => setTargetMarketGrm(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            step={0.1}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Calculated Property GRM"
          value={`${calculatedGrm.toFixed(2)}x`}
          subtitle="Price / Annual Gross Rent"
          variant="indigo"
        />
        <ResultCard
          title="Benchmark Fair Value"
          value={`$${benchmarkFairMarketValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`At ${targetMarketGrm}x market GRM`}
          variant="light"
        />
        <ResultCard
          title="Valuation Spread"
          value={`${valuationSpread >= 0 ? "+" : ""}$${valuationSpread.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={valuationSpread >= 0 ? "Undervalued / Discount" : "Priced at Premium"}
          variant="light"
        />
        <ResultCard
          title="Annual Gross Rent"
          value={`$${annualGrossRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`$${monthlyGrossRent.toLocaleString()} monthly`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Real Estate Valuation Insight</h4>
        <p className="text-slate-600">
          Lower GRM numbers indicate higher relative rental income per dollar invested. At a GRM of <strong className="text-slate-800">{calculatedGrm.toFixed(2)}x</strong> compared to the neighborhood benchmark of {targetMarketGrm}x, this property is {calculatedGrm <= targetMarketGrm ? "an attractive cash-flow deal priced below standard market multiples." : "trading at an above-average multiple, requiring low operating expenses to justify the purchase price."}
        </p>
      </div>
    </div>
  );
};
