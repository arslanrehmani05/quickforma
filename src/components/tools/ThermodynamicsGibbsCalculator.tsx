import React, { useState } from "react";
import { Flame, Compass, Activity, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ThermodynamicsGibbsCalculator: React.FC = () => {
  const [deltaH, setDeltaH] = useState<number>(-92.2);
  const [deltaS, setDeltaS] = useState<number>(-198.7);
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25);

  const tC = Math.max(-273.15, Number(temperatureCelsius) || 0);
  const tempKelvin = tC + 273.15;

  const dH = Number(deltaH) || 0;
  const dS = Number(deltaS) || 0;

  // deltaG = deltaH - T * (deltaS / 1000) (in kJ/mol)
  const deltaG = dH - tempKelvin * (dS / 1000);

  // Equilibrium crossover temperature where deltaG = 0: T_eq = deltaH / (deltaS / 1000)
  const tEqKelvin = dS !== 0 ? (dH / (dS / 1000)) : null;
  const isSpontaneous = deltaG < 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Flame}
            title="Gibbs Free Energy (ΔG) & Spontaneity Solver"
            description="Calculate Gibbs Free Energy ΔG = ΔH - TΔS and determine reaction thermodynamic spontaneity and crossover temperature with absolute zero guards."
          />
          <ResetButton onReset={() => {
            setDeltaH(-92.2);
            setDeltaS(-198.7);
            setTemperatureCelsius(25);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Enthalpy Change (ΔH in kJ/mol)"
            type="number"
            step="any"
            value={deltaH}
            onChange={(e) => setDeltaH(Number(e.target.value))}
          />
          <InputField
            label="Entropy Change (ΔS in J/(mol·K))"
            type="number"
            step="any"
            value={deltaS}
            onChange={(e) => setDeltaS(Number(e.target.value))}
          />
          <InputField
            label="Temperature (°C ≥ -273.15)"
            type="number"
            min={-273.15}
            step="any"
            value={temperatureCelsius}
            onChange={(e) => setTemperatureCelsius(Math.max(-273.15, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Thermodynamic Equilibrium State">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Gibbs Free Energy (ΔG)</span>
              <p className={`text-4xl font-extrabold mt-1 ${isSpontaneous ? "text-emerald-400" : "text-rose-400"}`}>
                {deltaG.toFixed(1)} kJ/mol
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">T = {tempKelvin.toFixed(1)} K</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Reaction Spontaneity</span>
              <p className={`text-2xl font-bold mt-2 ${isSpontaneous ? "text-emerald-300" : "text-amber-300"}`}>
                {isSpontaneous ? "Spontaneous (Forward)" : "Non-Spontaneous"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isSpontaneous ? "ΔG < 0 (Exergonic)" : "ΔG > 0 (Endergonic)"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Crossover Temperature</span>
              <p className="text-2xl font-bold text-indigo-300 mt-2">
                {tEqKelvin && tEqKelvin > 0 ? `${(tEqKelvin - 273.15).toFixed(1)} °C` : "None"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">
                {tEqKelvin && tEqKelvin > 0 ? `${tEqKelvin.toFixed(1)} K` : "All temperatures"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Driving Force</span>
              <p className="text-xs font-semibold text-slate-200 mt-1">
                {dH < 0 && dS > 0 ? "Enthalpy & Entropy Favored" :
                 dH < 0 ? "Enthalpy Driven (Spontaneous at Low T)" :
                 dS > 0 ? "Entropy Driven (Spontaneous at High T)" : "Thermodynamically Unfavored"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
