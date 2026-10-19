import React, { useState } from "react";
import { RotateCw, Compass, Activity } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TorqueRotationalMotionCalculator: React.FC = () => {
  const [leverArmR, setLeverArmR] = useState<number>(0.45); // meters
  const [appliedForceF, setAppliedForceF] = useState<number>(120); // Newtons
  const [angleDegrees, setAngleDegrees] = useState<number>(90); // 90 deg = perpendicular
  const [momentOfInertiaI, setMomentOfInertiaI] = useState<number>(0.80); // kg m^2

  // Torque tau = r * F * sin(theta)
  const angleRad = (angleDegrees * Math.PI) / 180;
  const torque = leverArmR * appliedForceF * Math.sin(angleRad);
  // Angular acceleration alpha = tau / I
  const safeI = Math.max(0.0001, momentOfInertiaI);
  const angularAccel = torque / safeI;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={RotateCw}
            title="Torque, Moment of Inertia & Angular Acceleration Solver"
            description="Calculate torque τ = rF sin(θ) and resulting angular acceleration α = τ / I in rotational mechanics."
          />
          <ResetButton onReset={() => {
            setLeverArmR(0.45); setAppliedForceF(120); setAngleDegrees(90); setMomentOfInertiaI(0.80);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Lever Arm Radius r (meters)"
            type="number"
            step={0.01}
            value={leverArmR}
            onChange={(e) => setLeverArmR(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Applied Force F (Newtons)"
            type="number"
            step={1}
            value={appliedForceF}
            onChange={(e) => setAppliedForceF(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Force Angle θ (degrees)"
            type="number"
            value={angleDegrees}
            onChange={(e) => setAngleDegrees(Number(e.target.value))}
            min={0}
            max={180}
          />
          <InputField
            label="Moment of Inertia I (kg·m²)"
            type="number"
            step={0.05}
            value={momentOfInertiaI}
            onChange={(e) => setMomentOfInertiaI(Number(e.target.value))}
            min={0.001}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Generated Torque (τ)"
            value={`${torque.toFixed(2)} N·m`}
            subtitle="τ = r · F · sin(θ)"
          />
          <ResultCard
            variant="light"
            title="Angular Acceleration (α)"
            value={`${angularAccel.toFixed(2)} rad/s²`}
            subtitle="α = τ / I"
          />
          <ResultCard
            variant="light"
            title="Mechanical Leverage"
            value={`${(torque / Math.max(1, appliedForceF)).toFixed(3)} m`}
            subtitle="Effective perpendicular lever arm"
          />
        </div>
      </div>
    </div>
  );
};
