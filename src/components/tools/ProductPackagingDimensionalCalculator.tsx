import React, { useState } from "react";
import { Box, Scale, Truck, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ProductPackagingDimensionalCalculator: React.FC = () => {
  const [lengthInches, setLengthInches] = useState<number>(18);
  const [widthInches, setWidthInches] = useState<number>(14);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [actualWeightLbs, setActualWeightLbs] = useState<number>(6.5);
  const [dimDivisor, setDimDivisor] = useState<number>(139); // 139 for UPS/FedEx daily rates, 166 for retail/USPS

  const handleReset = () => {
    setLengthInches(18);
    setWidthInches(14);
    setHeightInches(10);
    setActualWeightLbs(6.5);
    setDimDivisor(139);
  };

  const cubicInches = lengthInches * widthInches * heightInches;
  const dimWeightLbs = dimDivisor > 0 ? cubicInches / dimDivisor : 0;
  const billableWeightLbs = Math.max(actualWeightLbs, dimWeightLbs);
  const isDimBilled = dimWeightLbs > actualWeightLbs;
  const dimensionalPenaltyLbs = Math.max(0, dimWeightLbs - actualWeightLbs);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Box Size & DIM Freight Cost Solver"
        description="Compute Dimensional Weight (DIM), carrier billable weight, and packaging box size optimization savings."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Carrier DIM Divisor</label>
          <select
            value={dimDivisor}
            onChange={(e) => setDimDivisor(Number(e.target.value))}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value={139}>139 — UPS / FedEx Commercial & Daily Rates (Most Common)</option>
            <option value={166}>166 — USPS Priority Mail / Retail Counter Rates</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <InputField
            label="Length (in)"
            value={lengthInches}
            onChange={(val) => setLengthInches(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="in"
          />
          <InputField
            label="Width (in)"
            value={widthInches}
            onChange={(val) => setWidthInches(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="in"
          />
          <InputField
            label="Height (in)"
            value={heightInches}
            onChange={(val) => setHeightInches(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            suffix="in"
          />
          <InputField
            label="Actual Scale Weight"
            value={actualWeightLbs}
            onChange={(val) => setActualWeightLbs(Math.max(0.1, Number(val) || 0))}
            type="number"
            min={0.1}
            suffix="lbs"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Billable Weight"
          value={`${Math.ceil(billableWeightLbs)} lbs`}
          subtitle={isDimBilled ? "Billed by DIM Volume" : "Billed by Actual Weight"}
          variant="indigo"
        />
        <ResultCard
          title="Calculated DIM Weight"
          value={`${dimWeightLbs.toFixed(2)} lbs`}
          subtitle={`Divisor: ${dimDivisor}`}
          variant="light"
        />
        <ResultCard
          title="Packaging Penalty"
          value={`+${dimensionalPenaltyLbs.toFixed(1)} lbs`}
          subtitle={isDimBilled ? "Excess air billed" : "No dimensional penalty"}
          variant="light"
        />
        <ResultCard
          title="Box Volume"
          value={`${cubicInches.toLocaleString()} in³`}
          subtitle={`${(cubicInches / 1728).toFixed(2)} cu ft`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Packaging Optimization Insight</h4>
        <p className="text-slate-600">
          {isDimBilled
            ? `Warning: Your package actual weight is only ${actualWeightLbs} lbs, but you are paying for ${Math.ceil(billableWeightLbs)} lbs due to empty box volume. Shaving just 1 inch off each side drops DIM weight from ${dimWeightLbs.toFixed(1)} lbs down to ${((lengthInches - 1) * (widthInches - 1) * (heightInches - 1) / dimDivisor).toFixed(1)} lbs, saving significant parcel shipping expense.`
            : `Your packaging is dense and efficient. Your actual scale weight exceeds dimensional weight, so no empty air penalty applies.`}
        </p>
      </div>
    </div>
  );
};
