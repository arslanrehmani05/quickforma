import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, Gauge, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DefectDensityPpmCalculator: React.FC = () => {
  const [totalDefectsFound, setTotalDefectsFound] = useState<number>(14);
  const [unitsProduced, setUnitsProduced] = useState<number>(25000);
  const [opportunitiesPerUnit, setOpportunitiesPerUnit] = useState<number>(8); // solder joints, welds, inspection points

  const handleReset = () => {
    setTotalDefectsFound(14);
    setUnitsProduced(25000);
    setOpportunitiesPerUnit(8);
  };

  // Defects Per Million Opportunities (DPMO) = (Defects / (Units * Opportunities)) * 1,000,000
  const totalOpportunities = unitsProduced * opportunitiesPerUnit;
  const dpmo = totalOpportunities > 0 ? (totalDefectsFound / totalOpportunities) * 1000000 : 0;
  // Parts Per Million (PPM on unit basis) = (Defects / Units) * 1,000,000
  const ppmUnits = unitsProduced > 0 ? (totalDefectsFound / unitsProduced) * 1000000 : 0;
  const yieldPercent = unitsProduced > 0 ? ((unitsProduced - totalDefectsFound) / unitsProduced) * 100 : 0;

  // Approximate Sigma level based on DPMO with 1.5 sigma shift
  let sigmaLevel = "3.8σ";
  if (dpmo <= 3.4) sigmaLevel = "6.0σ (Six Sigma Standard)";
  else if (dpmo <= 233) sigmaLevel = "5.0σ";
  else if (dpmo <= 6210) sigmaLevel = "4.0σ";
  else if (dpmo <= 66807) sigmaLevel = "3.0σ";
  else sigmaLevel = "2.0σ or below";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Parts Per Million (PPM) Quality Defect Solver"
        description="Compute manufacturing defect density, Defects Per Million Opportunities (DPMO), and equivalent Sigma levels."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Defects Identified"
            value={totalDefectsFound}
            onChange={(val) => setTotalDefectsFound(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Total Production Units Inspected"
            value={unitsProduced}
            onChange={(val) => setUnitsProduced(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Defect Opportunities per Unit"
            value={opportunitiesPerUnit}
            onChange={(val) => setOpportunitiesPerUnit(Math.max(1, Number(val) || 0))}
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
          title="DPMO (Defects / Million)"
          value={dpmo.toFixed(1)}
          subtitle="Per million opportunities"
          variant="indigo"
        />
        <ResultCard
          title="Equivalent Sigma Level"
          value={sigmaLevel}
          subtitle="With standard 1.5σ shift"
          variant="light"
        />
        <ResultCard
          title="Unit PPM Defect Rate"
          value={`${ppmUnits.toFixed(0)} PPM`}
          subtitle="Parts per million finished units"
          variant="light"
        />
        <ResultCard
          title="Process Quality Yield"
          value={`${yieldPercent.toFixed(3)}%`}
          subtitle="First-time good yield"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Quality Benchmark</h4>
        <p className="text-slate-600">
          At <strong className="text-slate-800">{dpmo.toFixed(1)} DPMO</strong> across {totalOpportunities.toLocaleString()} inspection points, your process achieves an estimated <strong className="text-slate-800">{sigmaLevel}</strong> quality rating, placing it well above commercial consumer electronics industry baselines.
        </p>
      </div>
    </div>
  );
};
