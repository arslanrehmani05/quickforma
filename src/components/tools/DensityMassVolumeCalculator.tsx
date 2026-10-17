import React, { useState } from "react";
import { FlaskConical, Scale } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DensityMassVolumeCalculator: React.FC = () => {
  const [mode, setMode] = useState<"density" | "mass" | "volume">("density");
  const [mass, setMass] = useState<number>(250); // grams
  const [volume, setVolume] = useState<number>(50); // cm^3
  const [density, setDensity] = useState<number>(5); // g/cm^3

  const m = mass || 0;
  const v = volume || 0;
  const d = density || 0;

  const calculatedDensity = v > 0 ? m / v : 0;
  const calculatedMass = d * v;
  const calculatedVolume = d > 0 ? m / d : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FlaskConical}
            title="Density, Mass & Volume Chemistry Solver"
            description="Solve for density, mass, or volume with instant formula recalculation (ρ = m / V)."
          />
          <ResetButton onReset={() => {
            setMode("density");
            setMass(250);
            setVolume(50);
            setDensity(5);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["density", "mass", "volume"] as const).map((mKey) => (
                <button
                  key={mKey}
                  onClick={() => setMode(mKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    mode === mKey ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Find {mKey}
                </button>
              ))}
            </div>

            {mode !== "mass" && (
              <InputField label="Mass (grams, g)" type="number" value={mass} onChange={(e) => setMass(Number(e.target.value))} />
            )}
            {mode !== "volume" && (
              <InputField label="Volume (cubic cm, cm³ or mL)" type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
            )}
            {mode !== "density" && (
              <InputField label="Density (g/cm³)" type="number" value={density} onChange={(e) => setDensity(Number(e.target.value))} />
            )}
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Solved Parameter Output">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Calculated {mode.toUpperCase()}
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    {mode === "density" && `${calculatedDensity.toFixed(3)} g/cm³`}
                    {mode === "mass" && `${calculatedMass.toFixed(3)} grams`}
                    {mode === "volume" && `${calculatedVolume.toFixed(3)} cm³`}
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {mode === "density" && `ρ = ${m}g / ${v}cm³`}
                    {mode === "mass" && `m = ${d}g/cm³ × ${v}cm³`}
                    {mode === "volume" && `V = ${m}g / ${d}g/cm³`}
                  </p>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
