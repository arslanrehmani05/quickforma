import React, { useState } from "react";
import { Compass, MoveRight } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ProjectileMotionCalculator: React.FC = () => {
  const [velocity, setVelocity] = useState<number>(25); // m/s
  const [angleDeg, setAngleDeg] = useState<number>(45); // degrees
  const [initialHeight, setInitialHeight] = useState<number>(0); // meters
  const g = 9.80665; // m/s^2

  const thetaRad = ((angleDeg || 0) * Math.PI) / 180;
  const v0x = (velocity || 0) * Math.cos(thetaRad);
  const v0y = (velocity || 0) * Math.sin(thetaRad);
  const h0 = initialHeight || 0;

  // Time of flight: v0y + sqrt(v0y^2 + 2*g*h0) / g
  const timeOfFlight = (v0y + Math.sqrt(Math.pow(v0y, 2) + 2 * g * h0)) / g;
  const maxRange = v0x * timeOfFlight;
  const maxHeight = h0 + Math.pow(v0y, 2) / (2 * g);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Compass}
            title="2D Trajectory, Range & Max Height Solver"
            description="Calculate kinematics trajectory, flight time, maximum apogee height, and range distance for 2D projectiles."
          />
          <ResetButton onReset={() => {
            setVelocity(25);
            setAngleDeg(45);
            setInitialHeight(0);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Initial Launch Velocity (m/s)" type="number" suffix="m/s" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} />
            <InputField label="Launch Angle (degrees)" type="number" suffix="°" value={angleDeg} onChange={(e) => setAngleDeg(Number(e.target.value))} />
            <InputField label="Initial Height Above Ground (m)" type="number" suffix="m" value={initialHeight} onChange={(e) => setInitialHeight(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Trajectory Kinematics Output">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block font-sans uppercase">Horizontal Range</span>
                    <div className="text-3xl font-extrabold text-emerald-400">{maxRange.toFixed(2)} m</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[11px] text-slate-400 block font-sans uppercase">Peak Apogee Height</span>
                    <div className="text-3xl font-extrabold text-white">{maxHeight.toFixed(2)} m</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Total Flight Time</span>
                    <span className="text-base font-bold text-white">{timeOfFlight.toFixed(2)} s</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-sans">Initial Vx / Vy</span>
                    <span className="text-xs font-bold text-slate-300 block">{v0x.toFixed(1)} / {v0y.toFixed(1)} m/s</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
