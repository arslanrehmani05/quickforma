import React, { useState } from "react";
import { Zap, Layers, Activity } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ElectrolysisFaradayCalculator: React.FC = () => {
  const [currentAmps, setCurrentAmps] = useState<number>(5.0); // 5 Amps
  const [timeMinutes, setTimeMinutes] = useState<number>(30); // 30 minutes
  const [molarMass, setMolarMass] = useState<number>(63.55); // Copper (Cu) = 63.55 g/mol
  const [valencyZ, setValencyZ] = useState<number>(2); // Cu2+ -> 2 electrons

  const F = 96485.33; // Faraday constant C / mol e-
  const timeSeconds = Math.max(0, timeMinutes * 60);
  const totalChargeQ = currentAmps * timeSeconds; // Q = I * t (Coulombs)

  // Mass m = (Q * M) / (z * F)
  const massGrams = (totalChargeQ * molarMass) / (valencyZ * F);
  const molesElectrons = totalChargeQ / F;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Zap}
            title="Faraday's Law of Electrolysis & Electroplating Solver"
            description="Calculate electrodeposited metal mass, electric charge Q, and Faraday electron yields from current and duration."
          />
          <ResetButton onReset={() => {
            setCurrentAmps(5.0); setTimeMinutes(30); setMolarMass(63.55); setValencyZ(2);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Current (Amperes)"
            type="number"
            step={0.1}
            value={currentAmps}
            onChange={(e) => setCurrentAmps(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Duration (Minutes)"
            type="number"
            step={1}
            value={timeMinutes}
            onChange={(e) => setTimeMinutes(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Molar Mass M (g/mol)"
            type="number"
            step={0.1}
            value={molarMass}
            onChange={(e) => setMolarMass(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Electrons Transferred (z)"
            type="number"
            value={valencyZ}
            onChange={(e) => setValencyZ(Number(e.target.value))}
            min={1}
            max={6}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Plated Metal Mass"
            value={`${massGrams.toFixed(3)} grams`}
            subtitle="m = (I · t · M) / (z · F)"
          />
          <ResultCard
            variant="light"
            title="Total Charge (Q)"
            value={`${totalChargeQ.toLocaleString()} Coulombs`}
            subtitle="Q = I · t (Amps × Seconds)"
          />
          <ResultCard
            variant="light"
            title="Electrons Transferred"
            value={`${molesElectrons.toFixed(3)} moles e⁻`}
            subtitle="F = 96,485 Coulombs / mol"
          />
        </div>
      </div>
    </div>
  );
};
