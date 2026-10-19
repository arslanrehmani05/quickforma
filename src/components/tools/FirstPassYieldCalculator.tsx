import React, { useState } from "react";
import { CheckCircle, AlertTriangle, Cpu, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FirstPassYieldCalculator: React.FC = () => {
  const [unitsEntered, setUnitsEntered] = useState<number>(5000);
  const [unitsScrapped, setUnitsScrapped] = useState<number>(125);
  const [unitsReworked, setUnitsReworked] = useState<number>(275);
  const [unitCost, setUnitCost] = useState<number>(45.00);
  const [reworkLaborCost, setReworkLaborCost] = useState<number>(14.50);

  const handleReset = () => {
    setUnitsEntered(5000);
    setUnitsScrapped(125);
    setUnitsReworked(275);
    setUnitCost(45.00);
    setReworkLaborCost(14.50);
  };

  // First Pass Yield (FPY) = (Units Entered - Scrapped - Reworked) / Units Entered
  const goodUnitsWithoutRework = Math.max(0, unitsEntered - unitsScrapped - unitsReworked);
  const fpyPercent = unitsEntered > 0 ? (goodUnitsWithoutRework / unitsEntered) * 100 : 0;

  // Final Overall Yield = (Units Entered - Scrapped) / Units Entered
  const finalGoodUnits = Math.max(0, unitsEntered - unitsScrapped);
  const finalYieldPercent = unitsEntered > 0 ? (finalGoodUnits / unitsEntered) * 100 : 0;

  const scrapLossDollar = unitsScrapped * unitCost;
  const reworkLossDollar = unitsReworked * reworkLaborCost;
  const totalQualityCostLoss = scrapLossDollar + reworkLossDollar;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="First Pass Yield (FPY) & Scrap Loss Solver"
        description="Compute manufacturing First Pass Yield (FPY), rework costs, and scrap rate financial waste."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Production Units Entered"
            value={unitsEntered}
            onChange={(val) => setUnitsEntered(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Units Scrapped / Destroyed"
            value={unitsScrapped}
            onChange={(val) => setUnitsScrapped(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Units Requiring Rework / Repair"
            value={unitsReworked}
            onChange={(val) => setUnitsReworked(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Unit Manufacturing Cost ($)"
            value={unitCost}
            onChange={(val) => setUnitCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Labor Cost per Reworked Unit ($)"
            value={reworkLaborCost}
            onChange={(val) => setReworkLaborCost(Math.max(0, Number(val) || 0))}
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
          title="First Pass Yield (FPY)"
          value={`${fpyPercent.toFixed(1)}%`}
          subtitle="Zero-defect throughput"
          variant="indigo"
        />
        <ResultCard
          title="Total Scrap & Rework Waste"
          value={`$${totalQualityCostLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Cost of poor quality"
          variant="light"
        />
        <ResultCard
          title="Final Shipped Yield"
          value={`${finalYieldPercent.toFixed(1)}%`}
          subtitle="Includes reworked parts"
          variant="light"
        />
        <ResultCard
          title="Direct Scrap Loss"
          value={`$${scrapLossDollar.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${unitsScrapped} scrapped parts`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Quality Management Insight</h4>
        <p className="text-slate-600">
          While final yield appears high at <strong className="text-slate-800">{finalYieldPercent.toFixed(1)}%</strong>, true First Pass Yield is <strong className="text-slate-800">{fpyPercent.toFixed(1)}%</strong>. Masking quality defects through rework costs <strong className="text-slate-800">${reworkLossDollar.toLocaleString()}</strong> in unnecessary shop-floor labor on top of <strong className="text-slate-800">${scrapLossDollar.toLocaleString()}</strong> in discarded raw material.
        </p>
      </div>
    </div>
  );
};
