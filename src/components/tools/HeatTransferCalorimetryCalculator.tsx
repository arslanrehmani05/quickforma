import React, { useState } from "react";
import { Flame, Thermometer, Droplet } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const HeatTransferCalorimetryCalculator: React.FC = () => {
  // Q = m * c * DeltaT
  const [materialName, setMaterialName] = useState<string>("Liquid Water");
  const [massGrams, setMassGrams] = useState<number>(500); // 500g of water
  const [specificHeat, setSpecificHeat] = useState<number>(4.184); // J/(g·°C) for liquid water
  const [initialTempC, setInitialTempC] = useState<number>(20);
  const [finalTempC, setFinalTempC] = useState<number>(85);

  const isTempPhysicallyValid = initialTempC >= -273.15 && finalTempC >= -273.15;
  const isMassValid = massGrams > 0 && specificHeat > 0;
  const isValid = isTempPhysicallyValid && isMassValid;

  const deltaT = finalTempC - initialTempC;
  const heatJoules = isValid ? massGrams * specificHeat * deltaT : 0;
  const heatKj = heatJoules / 1000;
  const heatCalories = heatJoules / 4.184;

  const handleMaterialChange = (name: string, c: number) => {
    setMaterialName(name);
    setSpecificHeat(c);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Flame}
            title="Heat Transfer & Specific Heat (Q = mcΔT) Calorimetry Tool"
            description="Calculate thermal energy absorption or release Q = mcΔT in Joules, Kilojoules, and calories with thermodynamic phase materials."
          />
          <ResetButton onReset={() => {
            setMaterialName("Liquid Water");
            setMassGrams(500);
            setSpecificHeat(4.184);
            setInitialTempC(20);
            setFinalTempC(85);
          }} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Specific Heat Capacity Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Liquid Water (4.184)", c: 4.184 },
              { name: "Ice (2.09)", c: 2.09 },
              { name: "Steam (2.01)", c: 2.01 },
              { name: "Ethanol (2.44)", c: 2.44 },
              { name: "Aluminum (0.897)", c: 0.897 },
              { name: "Iron / Steel (0.449)", c: 0.449 },
              { name: "Copper (0.385)", c: 0.385 },
            ].map((m) => (
              <button
                key={m.name}
                type="button"
                onClick={() => handleMaterialChange(m.name, m.c)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  specificHeat === m.c
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Substance Mass (grams)"
            type="number"
            min={0.01}
            step="any"
            value={massGrams}
            onChange={(e) => setMassGrams(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Specific Heat c (J/g·°C)"
            type="number"
            min={0.001}
            step="any"
            value={specificHeat}
            onChange={(e) => setSpecificHeat(Math.max(0.001, Number(e.target.value)))}
          />
          <InputField
            label="Initial Temp (°C)"
            type="number"
            min={-273.15}
            step="any"
            value={initialTempC}
            onChange={(e) => setInitialTempC(Number(e.target.value))}
          />
          <InputField
            label="Final Temp (°C)"
            type="number"
            min={-273.15}
            step="any"
            value={finalTempC}
            onChange={(e) => setFinalTempC(Number(e.target.value))}
          />
        </div>

        {!isTempPhysicallyValid && (
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-900 text-xs">
            <strong>Thermodynamic Boundary Alert:</strong> Temperature cannot fall below Absolute Zero (-273.15°C / 0 Kelvin).
          </div>
        )}

        <ResultCard variant="dark" title="Calorimetric Energy Change">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Thermal Energy (Q)</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {isValid ? `${heatKj.toFixed(2)} kJ` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isValid ? `${Math.round(heatJoules).toLocaleString()} Joules` : "Check inputs"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Thermochemical Calories</span>
              <p className="text-4xl font-extrabold text-white mt-1">
                {isValid ? `${(heatCalories / 1000).toFixed(2)} kcal` : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {isValid ? `${Math.round(heatCalories).toLocaleString()} cal` : "Check inputs"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Temperature Shift (ΔT)</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                {isValid ? `${deltaT >= 0 ? '+' : ''}${deltaT.toFixed(1)} °C` : "—"}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">
                {deltaT > 0 ? "Endothermic (Heated)" : deltaT < 0 ? "Exothermic (Cooled)" : "Isothermal (ΔT = 0)"}
              </span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Thermodynamic Direction</span>
              <p className="text-sm font-bold text-slate-200 mt-1">
                {deltaT > 0 ? "Heat Absorbed (Q > 0)" : deltaT < 0 ? "Heat Released (Q < 0)" : "No Heat Flow"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
