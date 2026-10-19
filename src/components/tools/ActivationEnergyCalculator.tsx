import React, { useState } from "react";
import { Zap, Activity, Flame } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ActivationEnergyCalculator: React.FC = () => {
  const [t1Celsius, setT1Celsius] = useState<number>(25); // 298.15 K
  const [k1Rate, setK1Rate] = useState<number>(0.024);
  const [t2Celsius, setT2Celsius] = useState<number>(45); // 318.15 K
  const [k2Rate, setK2Rate] = useState<number>(0.096);

  const R = 8.314462; // Gas constant J / (mol K)

  const T1 = t1Celsius + 273.15;
  const T2 = t2Celsius + 273.15;

  // Arrhenius equation: ln(k2 / k1) = -(Ea / R) * (1/T2 - 1/T1)
  // Ea = - R * ln(k2 / k1) / (1/T2 - 1/T1)
  const lnRatio = Math.log(k2Rate / Math.max(0.000001, k1Rate));
  const invDiff = (1 / T2) - (1 / T1);
  const eaJoules = invDiff !== 0 ? (-R * lnRatio) / invDiff : 0;
  const eaKj = (eaJoules / 1000).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Zap}
            title="Arrhenius Equation & Activation Energy (Ea) Solver"
            description="Calculate reaction activation energy Ea from two temperature-dependent kinetic rate constants k1 and k2."
          />
          <ResetButton onReset={() => {
            setT1Celsius(25); setK1Rate(0.024); setT2Celsius(45); setK2Rate(0.096);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Temperature T1 (°C)"
            type="number"
            value={t1Celsius}
            onChange={(e) => setT1Celsius(Number(e.target.value))}
          />
          <InputField
            label="Rate Constant k1"
            type="number"
            step={0.001}
            value={k1Rate}
            onChange={(e) => setK1Rate(Number(e.target.value))}
            min={0.000001}
          />
          <InputField
            label="Temperature T2 (°C)"
            type="number"
            value={t2Celsius}
            onChange={(e) => setT2Celsius(Number(e.target.value))}
          />
          <InputField
            label="Rate Constant k2"
            type="number"
            step={0.001}
            value={k2Rate}
            onChange={(e) => setK2Rate(Number(e.target.value))}
            min={0.000001}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Activation Energy (Ea)"
            value={`${eaKj} kJ/mol`}
            subtitle="Arrhenius kinetic barrier"
          />
          <ResultCard
            variant="light"
            title="Rate Acceleration"
            value={`${(k2Rate / Math.max(0.000001, k1Rate)).toFixed(2)}x`}
            subtitle={`Speedup over ${t2Celsius - t1Celsius}°C temperature rise`}
          />
          <ResultCard
            variant="light"
            title="Absolute Temperatures"
            value={`${T1.toFixed(1)}K → ${T2.toFixed(1)}K`}
            subtitle="Kelvin thermodynamic scale"
          />
        </div>
      </div>
    </div>
  );
};
