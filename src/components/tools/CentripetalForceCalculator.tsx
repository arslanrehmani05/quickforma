import React, { useState } from "react";
import { RotateCw, Activity, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CentripetalForceCalculator: React.FC = () => {
  const [massKg, setMassKg] = useState<number>(1200);
  const [velocityMps, setVelocityMps] = useState<number>(20);
  const [radiusMeters, setRadiusMeters] = useState<number>(50);

  const mass = Math.max(0.01, Number(massKg) || 0.01);
  const velocity = Math.max(0, Number(velocityMps) || 0);
  const radius = Math.max(0.1, Number(radiusMeters) || 0.1);

  // a_c = v^2 / r
  const centripetalAcceleration = (velocity * velocity) / radius;
  // F_c = m * a_c
  const centripetalForce = mass * centripetalAcceleration;
  // g-force = a_c / 9.80665
  const gForce = centripetalAcceleration / 9.80665;
  // Angular velocity omega = v / r (rad/s)
  const angularVelocity = velocity / radius;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={RotateCw}
            title="Centripetal Force & Radial Acceleration Calculator"
            description="Calculate inward centripetal force Fc = mv²/r, radial acceleration ac = v²/r, lateral g-force, and angular velocity."
          />
          <ResetButton onReset={() => {
            setMassKg(1200);
            setVelocityMps(20);
            setRadiusMeters(50);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Object Mass (kg)"
            type="number"
            min={0.01}
            step="any"
            value={massKg}
            onChange={(e) => setMassKg(Math.max(0.01, Number(e.target.value)))}
          />
          <InputField
            label="Linear Velocity (m/s)"
            type="number"
            min={0}
            step="any"
            value={velocityMps}
            onChange={(e) => setVelocityMps(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Curvature Radius (meters)"
            type="number"
            min={0.1}
            step="any"
            value={radiusMeters}
            onChange={(e) => setRadiusMeters(Math.max(0.1, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Circular Dynamics Output">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Centripetal Force (F_c)</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{Math.round(centripetalForce).toLocaleString()} N</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Inward force</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Radial Accel (a_c)</span>
              <p className="text-4xl font-extrabold text-white mt-1">{centripetalAcceleration.toFixed(2)} m/s²</p>
              <span className="text-[11px] text-slate-300 mt-1 block">v² / r</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Lateral G-Force</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">{gForce.toFixed(2)} g</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Earth gravity multiple</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Angular Velocity (ω)</span>
              <p className="text-2xl font-mono font-bold text-slate-200 mt-1">{angularVelocity.toFixed(2)} rad/s</p>
              <span className="text-[11px] text-slate-300 mt-1 block">v / r</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
