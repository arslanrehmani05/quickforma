import React, { useState } from "react";
import { Orbit, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GravitationalForceCalculator: React.FC = () => {
  const G = 6.6743e-11;

  const [m1, setM1] = useState<number>(5.972e24);
  const [m2, setM2] = useState<number>(7.348e22);
  const [distanceKm, setDistanceKm] = useState<number>(384400);

  const mass1 = Math.max(0, Number(m1) || 0);
  const mass2 = Math.max(0, Number(m2) || 0);
  const distKm = Math.max(0.001, Number(distanceKm) || 0.001);

  const distanceMeters = distKm * 1000;
  const forceNewtons = (G * mass1 * mass2) / (distanceMeters * distanceMeters);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Orbit}
            title="Newton's Law of Universal Gravitation Calculator"
            description="Calculate gravitational attractive force F = G(m₁m₂)/r² between celestial bodies or objects with scientific notation support."
          />
          <ResetButton onReset={() => {
            setM1(5.972e24);
            setM2(7.348e22);
            setDistanceKm(384400);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Mass 1 (kg, scientific allowed)"
            type="number"
            step="any"
            value={m1}
            onChange={(e) => setM1(Number(e.target.value))}
          />
          <InputField
            label="Mass 2 (kg, scientific allowed)"
            type="number"
            step="any"
            value={m2}
            onChange={(e) => setM2(Number(e.target.value))}
          />
          <InputField
            label="Separation Distance (kilometers)"
            type="number"
            min={0.001}
            step="any"
            value={distanceKm}
            onChange={(e) => setDistanceKm(Math.max(0.001, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Gravitational Attraction">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Gravitational Force (F)</span>
              <p className="text-3xl font-mono font-extrabold text-emerald-400 mt-2">{forceNewtons.toExponential(4)} N</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Newtons of force</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Acceleration on Mass 2</span>
              <p className="text-3xl font-mono font-extrabold text-white mt-2">
                {mass2 > 0 ? (forceNewtons / mass2).toExponential(4) : "0"} m/s²
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">a = F / m₂</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Gravitational Constant</span>
              <p className="text-xs font-mono text-slate-200 mt-2">G = 6.6743 × 10⁻¹¹ N·m²/kg²</p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
