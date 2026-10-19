import React, { useState } from "react";
import { Clock, Activity, RotateCw } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PendulumHarmonicMotionCalculator: React.FC = () => {
  const [pendulumLengthL, setPendulumLengthL] = useState<number>(1.2); // meters
  const [gravityG, setGravityG] = useState<number>(9.80665); // m/s^2 Earth

  const safeL = Math.max(0.01, pendulumLengthL);
  const safeG = Math.max(0.1, gravityG);

  // Period T = 2 * pi * sqrt(L / g)
  const periodT = 2 * Math.PI * Math.sqrt(safeL / safeG);
  const frequencyHz = 1 / periodT;
  const angularFreqOmega = Math.sqrt(safeG / safeL);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Clock}
            title="Simple Pendulum Harmonic Motion & Period Solver"
            description="Calculate pendulum oscillation period T = 2π√(L/g), cyclic frequency, and angular frequency under local gravity."
          />
          <ResetButton onReset={() => { setPendulumLengthL(1.2); setGravityG(9.80665); }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Pendulum Length L (meters)"
            type="number"
            step={0.05}
            value={pendulumLengthL}
            onChange={(e) => setPendulumLengthL(Number(e.target.value))}
            min={0.01}
          />
          <InputField
            label="Gravitational Acceleration g (m/s²)"
            type="number"
            step={0.01}
            value={gravityG}
            onChange={(e) => setGravityG(Number(e.target.value))}
            min={0.1}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Oscillation Period (T)"
            value={`${periodT.toFixed(3)} seconds`}
            subtitle="Time per complete back-and-forth swing"
          />
          <ResultCard
            variant="light"
            title="Frequency (f)"
            value={`${frequencyHz.toFixed(3)} Hz`}
            subtitle="Swings per second (1/T)"
          />
          <ResultCard
            variant="light"
            title="Angular Frequency (ω)"
            value={`${angularFreqOmega.toFixed(3)} rad/s`}
            subtitle="ω = √(g / L)"
          />
        </div>
      </div>
    </div>
  );
};
