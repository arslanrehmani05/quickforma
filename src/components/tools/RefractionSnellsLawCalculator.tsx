import React, { useState } from "react";
import { Compass, Sparkles, Orbit } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RefractionSnellsLawCalculator: React.FC = () => {
  const [indexN1, setIndexN1] = useState<number>(1.0003); // Air n1
  const [indexN2, setIndexN2] = useState<number>(1.333); // Water n2
  const [incidentAngleDeg, setIncidentAngleDeg] = useState<number>(30); // 30 deg

  const theta1Rad = (incidentAngleDeg * Math.PI) / 180;
  // Snell's Law: n1 * sin(theta1) = n2 * sin(theta2)
  // sin(theta2) = (n1 * sin(theta1)) / n2
  const sinTheta2 = (indexN1 * Math.sin(theta1Rad)) / indexN2;

  const isTir = sinTheta2 > 1.0; // Total internal reflection
  const theta2Deg = isTir ? 0 : (Math.asin(sinTheta2) * 180) / Math.PI;

  // Critical angle theta_c = asin(n2 / n1) when n1 > n2
  const hasCriticalAngle = indexN1 > indexN2;
  const criticalAngleDeg = hasCriticalAngle ? (Math.asin(indexN2 / indexN1) * 180) / Math.PI : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Compass}
            title="Snell's Law of Refraction & Critical Angle Solver"
            description="Calculate light refraction angles n₁ sin(θ₁) = n₂ sin(θ₂) and Total Internal Reflection (TIR) thresholds."
          />
          <ResetButton onReset={() => {
            setIndexN1(1.0003); setIndexN2(1.333); setIncidentAngleDeg(30);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Medium 1 Index (n₁)"
            type="number"
            step={0.01}
            value={indexN1}
            onChange={(e) => setIndexN1(Number(e.target.value))}
            min={1.0}
          />
          <InputField
            label="Medium 2 Index (n₂)"
            type="number"
            step={0.01}
            value={indexN2}
            onChange={(e) => setIndexN2(Number(e.target.value))}
            min={1.0}
          />
          <InputField
            label="Incident Angle θ₁ (°)"
            type="number"
            step={1}
            value={incidentAngleDeg}
            onChange={(e) => setIncidentAngleDeg(Number(e.target.value))}
            min={0}
            max={90}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Refracted Angle (θ₂)"
            value={isTir ? "Total Internal Reflection" : `${theta2Deg.toFixed(2)}°`}
            subtitle={isTir ? "Light cannot enter Medium 2 (100% reflected)" : "Measured from surface normal"}
          />
          <ResultCard
            variant="light"
            title="Critical Angle (θc)"
            value={hasCriticalAngle ? `${criticalAngleDeg.toFixed(2)}°` : "None (n₁ ≤ n₂)"}
            subtitle={hasCriticalAngle ? "Threshold for Total Reflection" : "Light bends toward normal"}
          />
          <ResultCard
            variant="light"
            title="Optical Density"
            value={indexN2 > indexN1 ? "Bends Toward Normal" : "Bends Away from Normal"}
            subtitle={`Speed ratio: ${(indexN1 / indexN2).toFixed(3)}x`}
          />
        </div>
      </div>
    </div>
  );
};
