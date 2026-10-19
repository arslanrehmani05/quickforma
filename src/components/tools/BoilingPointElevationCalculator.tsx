import React, { useState } from "react";
import { Flame, Droplet, Thermometer } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BoilingPointElevationCalculator: React.FC = () => {
  const [vanTHoffI, setVanTHoffI] = useState<number>(2.0); // e.g. NaCl dissociates into 2 ions
  const [molalityM, setMolalityM] = useState<number>(1.5); // mol/kg solvent
  const [kbConstant, setKbConstant] = useState<number>(0.512); // Water Kb = 0.512 °C kg/mol
  const [kfConstant, setKfConstant] = useState<number>(1.86); // Water Kf = 1.86 °C kg/mol
  const [pureBoilingPoint, setPureBoilingPoint] = useState<number>(100.0);
  const [pureFreezingPoint, setPureFreezingPoint] = useState<number>(0.0);

  // Delta Tb = i * Kb * m
  const deltaTb = vanTHoffI * kbConstant * molalityM;
  // Delta Tf = i * Kf * m
  const deltaTf = vanTHoffI * kfConstant * molalityM;

  const newBoilingPoint = pureBoilingPoint + deltaTb;
  const newFreezingPoint = pureFreezingPoint - deltaTf;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Flame}
            title="Colligative Properties & Boiling / Freezing Point Solver"
            description="Calculate boiling point elevation (ΔTb) and freezing point depression (ΔTf) using molality and van 't Hoff factors."
          />
          <ResetButton onReset={() => {
            setVanTHoffI(2.0); setMolalityM(1.5); setKbConstant(0.512); setKfConstant(1.86);
            setPureBoilingPoint(100.0); setPureFreezingPoint(0.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="van 't Hoff Factor (i)"
            type="number"
            step={0.1}
            value={vanTHoffI}
            onChange={(e) => setVanTHoffI(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Solute Molality m (mol/kg)"
            type="number"
            step={0.1}
            value={molalityM}
            onChange={(e) => setMolalityM(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Ebullioscopic Kb (°C·kg/mol)"
            type="number"
            step={0.01}
            value={kbConstant}
            onChange={(e) => setKbConstant(Number(e.target.value))}
          />
          <InputField
            label="Cryoscopic Kf (°C·kg/mol)"
            type="number"
            step={0.01}
            value={kfConstant}
            onChange={(e) => setKfConstant(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="New Boiling Point"
            value={`${newBoilingPoint.toFixed(2)} °C`}
            subtitle={`+${deltaTb.toFixed(2)} °C elevation`}
          />
          <ResultCard
            variant="light"
            title="New Freezing Point"
            value={`${newFreezingPoint.toFixed(2)} °C`}
            subtitle={`-${deltaTf.toFixed(2)} °C depression`}
          />
          <ResultCard
            variant="light"
            title="Boiling Shift (ΔTb)"
            value={`+${deltaTb.toFixed(3)} °C`}
            subtitle="ΔTb = i · Kb · m"
          />
          <ResultCard
            variant="light"
            title="Freezing Shift (ΔTf)"
            value={`-${deltaTf.toFixed(3)} °C`}
            subtitle="ΔTf = i · Kf · m"
          />
        </div>
      </div>
    </div>
  );
};
