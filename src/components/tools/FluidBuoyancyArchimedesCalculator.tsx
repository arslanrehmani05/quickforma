import React, { useState } from "react";
import { Waves, Droplet, ArrowDown, ArrowUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FluidBuoyancyArchimedesCalculator: React.FC = () => {
  const [objectVolumeM3, setObjectVolumeM3] = useState<number>(0.05); // 0.05 m^3
  const [objectDensityKgM3, setObjectDensityKgM3] = useState<number>(750); // Wood (750 kg/m^3)
  const [fluidDensityKgM3, setFluidDensityKgM3] = useState<number>(1000); // Fresh Water (1000 kg/m^3)
  const g = 9.80665; // m/s^2

  const objectMass = objectVolumeM3 * objectDensityKgM3;
  const gravityForce = objectMass * g; // Fg = m * g (Newtons)

  // Submerged ratio
  const submergedRatio = Math.min(1.0, objectDensityKgM3 / Math.max(1, fluidDensityKgM3));
  const displacedVolume = objectVolumeM3 * submergedRatio;
  const buoyantForce = displacedVolume * fluidDensityKgM3 * g; // Fb = rho * V * g

  const netForce = buoyantForce - gravityForce;
  const isFloating = objectDensityKgM3 <= fluidDensityKgM3;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Waves}
            title="Archimedes' Buoyancy Principle & Submerged Volume Solver"
            description="Calculate buoyant force Fb = ρ_fluid · V_disp · g, submerged fraction, and floating equilibrium in fluid mechanics."
          />
          <ResetButton onReset={() => {
            setObjectVolumeM3(0.05); setObjectDensityKgM3(750); setFluidDensityKgM3(1000);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Object Volume (m³)"
            type="number"
            step={0.01}
            value={objectVolumeM3}
            onChange={(e) => setObjectVolumeM3(Number(e.target.value))}
            min={0.0001}
          />
          <InputField
            label="Object Density (kg/m³)"
            type="number"
            step={10}
            value={objectDensityKgM3}
            onChange={(e) => setObjectDensityKgM3(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Fluid Density (kg/m³)"
            type="number"
            step={10}
            value={fluidDensityKgM3}
            onChange={(e) => setFluidDensityKgM3(Number(e.target.value))}
            min={1}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Buoyant Force (Fb)"
            value={`${buoyantForce.toFixed(1)} N`}
            subtitle="Upward force exerted by displaced fluid"
          />
          <ResultCard
            variant="light"
            title="Equilibrium Status"
            value={isFloating ? "Floats on Surface" : "Sinks to Bottom"}
            subtitle={isFloating ? `${(submergedRatio * 100).toFixed(1)}% submerged` : "Object is denser than fluid"}
          />
          <ResultCard
            variant="light"
            title="Object Weight (Fg)"
            value={`${gravityForce.toFixed(1)} N`}
            subtitle={`Mass: ${objectMass.toFixed(2)} kg`}
          />
        </div>
      </div>
    </div>
  );
};
