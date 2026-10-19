import React, { useState } from "react";
import { ArrowLeftRight, FlaskConical, Activity } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EquilibriumConstantCalculator: React.FC = () => {
  const [kcConstant, setKcConstant] = useState<number>(4.2e-2);
  const [tempCelsius, setTempCelsius] = useState<number>(25);
  const [deltaNGas, setDeltaNGas] = useState<number>(-1); // e.g. N2(g) + 3H2(g) <=> 2NH3(g) -> 2 - 4 = -2

  const R = 0.08206; // L atm / (mol K)
  const T = tempCelsius + 273.15;

  // Kp = Kc * (RT)^(delta_n)
  const kpConstant = kcConstant * Math.pow(R * T, deltaNGas);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ArrowLeftRight}
            title="Chemical Equilibrium Constant (Kc vs Kp) Converter"
            description="Convert molar concentration equilibrium constants Kc to partial pressure constants Kp: Kp = Kc(RT)^Δn."
          />
          <ResetButton onReset={() => { setKcConstant(4.2e-2); setTempCelsius(25); setDeltaNGas(-1); }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Concentration Constant (Kc)"
            type="number"
            step={0.001}
            value={kcConstant}
            onChange={(e) => setKcConstant(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Temperature (°C)"
            type="number"
            value={tempCelsius}
            onChange={(e) => setTempCelsius(Number(e.target.value))}
          />
          <InputField
            label="Gas Moles Shift (Δn = Moles Prod - React)"
            type="number"
            value={deltaNGas}
            onChange={(e) => setDeltaNGas(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Partial Pressure (Kp)"
            value={kpConstant.toExponential(3)}
            subtitle="Kp = Kc · (R · T)^Δn"
          />
          <ResultCard
            variant="light"
            title="Equilibrium Preference"
            value={kcConstant > 1 ? "Product Favored (K > 1)" : "Reactant Favored (K < 1)"}
            subtitle={kcConstant > 1000 ? "Strongly forward" : kcConstant < 0.001 ? "Minimal reaction" : "Dynamic equilibrium"}
          />
          <ResultCard
            variant="light"
            title="Absolute Temp"
            value={`${T.toFixed(1)} K`}
            subtitle="R = 0.08206 L·atm/(mol·K)"
          />
        </div>
      </div>
    </div>
  );
};
