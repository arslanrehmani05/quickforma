import React, { useState } from "react";
import { Flame, Atom, FlaskConical, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CombustionAnalysisCalculator: React.FC = () => {
  const [sampleMassGrams, setSampleMassGrams] = useState<number>(2.50);
  const [co2ProducedGrams, setCo2ProducedGrams] = useState<number>(5.50);
  const [h2oProducedGrams, setH2oProducedGrams] = useState<number>(2.25);

  // Carbon mass = CO2 mass * (12.011 / 44.01)
  const massC = Math.max(0, co2ProducedGrams * (12.011 / 44.01));
  // Hydrogen mass = H2O mass * (2.016 / 18.015)
  const massH = Math.max(0, h2oProducedGrams * (2.016 / 18.015));
  // Oxygen mass = Sample - (C + H)
  const massO = Math.max(0, sampleMassGrams - (massC + massH));

  // Moles
  const molesC = massC / 12.011;
  const molesH = massH / 1.008;
  const molesO = massO / 16.00;

  const minMoles = Math.max(0.0001, Math.min(molesC, molesH, molesO > 0.001 ? molesO : Infinity));

  const ratioC = (molesC / minMoles).toFixed(2);
  const ratioH = (molesH / minMoles).toFixed(2);
  const ratioO = molesO > 0.001 ? (molesO / minMoles).toFixed(2) : "0.00";

  const formulaStr = molesO > 0.001
    ? `C_${Math.round(parseFloat(ratioC))} H_${Math.round(parseFloat(ratioH))} O_${Math.round(parseFloat(ratioO))}`
    : `C_${Math.round(parseFloat(ratioC))} H_${Math.round(parseFloat(ratioH))}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Flame}
            title="Hydrocarbon Combustion Analysis Empirical Formula Solver"
            description="Determine empirical formulas (CxHyOz) from combustion chamber masses of CO2 and H2O reaction products."
          />
          <ResetButton onReset={() => {
            setSampleMassGrams(2.50); setCo2ProducedGrams(5.50); setH2oProducedGrams(2.25);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Total Sample Mass (g)"
            type="number"
            step={0.01}
            value={sampleMassGrams}
            onChange={(e) => setSampleMassGrams(Number(e.target.value))}
            min={0.01}
          />
          <InputField
            label="CO₂ Produced (g)"
            type="number"
            step={0.01}
            value={co2ProducedGrams}
            onChange={(e) => setCo2ProducedGrams(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="H₂O Produced (g)"
            type="number"
            step={0.01}
            value={h2oProducedGrams}
            onChange={(e) => setH2oProducedGrams(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Empirical Formula"
            value={formulaStr}
            subtitle="Normalized integer molar ratio"
          />
          <ResultCard
            variant="light"
            title="Carbon Mass %"
            value={`${((massC / sampleMassGrams) * 100).toFixed(1)}%`}
            subtitle={`${massC.toFixed(3)}g Carbon (${molesC.toFixed(3)} mol)`}
          />
          <ResultCard
            variant="light"
            title="Hydrogen Mass %"
            value={`${((massH / sampleMassGrams) * 100).toFixed(1)}%`}
            subtitle={`${massH.toFixed(3)}g Hydrogen (${molesH.toFixed(3)} mol)`}
          />
        </div>
      </div>
    </div>
  );
};
