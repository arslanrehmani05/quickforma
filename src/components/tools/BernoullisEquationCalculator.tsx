import React, { useState } from "react";
import { Wind, Gauge, Activity } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BernoullisEquationCalculator: React.FC = () => {
  const [fluidDensity, setFluidDensity] = useState<number>(1000); // Water kg/m^3
  const [upstreamPressureP1, setUpstreamPressureP1] = useState<number>(200000); // 200 kPa
  const [upstreamVelocityV1, setUpstreamVelocityV1] = useState<number>(2.0); // 2 m/s
  const [pipeDiameterD1, setPipeDiameterD1] = useState<number>(0.10); // 10 cm
  const [pipeDiameterD2, setPipeDiameterD2] = useState<number>(0.05); // 5 cm constriction

  // Continuity equation: A1 * v1 = A2 * v2
  // Area proportional to d^2 => v2 = v1 * (d1 / d2)^2
  const safeD2 = Math.max(0.001, pipeDiameterD2);
  const velocityV2 = upstreamVelocityV1 * Math.pow(pipeDiameterD1 / safeD2, 2);

  // Bernoulli horizontal flow (h1 = h2): P1 + 0.5 * rho * v1^2 = P2 + 0.5 * rho * v2^2
  // P2 = P1 + 0.5 * rho * (v1^2 - v2^2)
  const pressureP2 = upstreamPressureP1 + 0.5 * fluidDensity * (Math.pow(upstreamVelocityV1, 2) - Math.pow(velocityV2, 2));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Wind}
            title="Bernoulli's Principle & Venturi Flow Velocity Solver"
            description="Calculate downstream fluid pressure drop P2 and flow acceleration through pipe constrictions via Bernoulli & continuity."
          />
          <ResetButton onReset={() => {
            setFluidDensity(1000); setUpstreamPressureP1(200000);
            setUpstreamVelocityV1(2.0); setPipeDiameterD1(0.10); setPipeDiameterD2(0.05);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Fluid Density ρ (kg/m³)"
            type="number"
            value={fluidDensity}
            onChange={(e) => setFluidDensity(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Inlet Pressure P1 (Pascals)"
            type="number"
            value={upstreamPressureP1}
            onChange={(e) => setUpstreamPressureP1(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Inlet Velocity v1 (m/s)"
            type="number"
            step={0.1}
            value={upstreamVelocityV1}
            onChange={(e) => setUpstreamVelocityV1(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Inlet Diameter D1 (m)"
            type="number"
            step={0.01}
            value={pipeDiameterD1}
            onChange={(e) => setPipeDiameterD1(Number(e.target.value))}
            min={0.001}
          />
          <InputField
            label="Constriction Diameter D2 (m)"
            type="number"
            step={0.01}
            value={pipeDiameterD2}
            onChange={(e) => setPipeDiameterD2(Number(e.target.value))}
            min={0.001}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Constriction Velocity (v2)"
            value={`${velocityV2.toFixed(2)} m/s`}
            subtitle={`Speedup: ${(velocityV2 / Math.max(0.001, upstreamVelocityV1)).toFixed(1)}x faster`}
          />
          <ResultCard
            variant="light"
            title="Venturi Pressure (P2)"
            value={`${(pressureP2 / 1000).toFixed(1)} kPa`}
            subtitle={`Pressure change: ${((pressureP2 - upstreamPressureP1) / 1000).toFixed(1)} kPa`}
          />
          <ResultCard
            variant="light"
            title="Dynamic Pressure (q2)"
            value={`${(0.5 * fluidDensity * velocityV2 * velocityV2 / 1000).toFixed(1)} kPa`}
            subtitle="½ · ρ · v₂²"
          />
        </div>
      </div>
    </div>
  );
};
