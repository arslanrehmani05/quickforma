import React, { useState } from "react";
import { Activity, Volume2, MoveRight } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const DopplerEffectCalculator: React.FC = () => {
  const [sourceFrequency, setSourceFrequency] = useState<number>(440); // 440 Hz
  const [waveSpeed, setWaveSpeed] = useState<number>(343); // Speed of sound in air m/s
  const [sourceVelocity, setSourceVelocity] = useState<number>(30); // 30 m/s (~67 mph)
  const [isApproaching, setIsApproaching] = useState<boolean>(true);

  // f' = f * (v / (v -+ vs))
  const effectiveV = waveSpeed;
  const observedFreq = isApproaching
    ? sourceFrequency * (effectiveV / Math.max(1, effectiveV - sourceVelocity))
    : sourceFrequency * (effectiveV / (effectiveV + sourceVelocity));

  const pitchShiftPct = (((observedFreq - sourceFrequency) / sourceFrequency) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Volume2}
            title="Acoustic Doppler Wave Frequency Shift Solver"
            description="Calculate perceived frequency f' and pitch change when sound sources approach or recede from stationary observers."
          />
          <ResetButton onReset={() => {
            setSourceFrequency(440); setWaveSpeed(343); setSourceVelocity(30); setIsApproaching(true);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Source Frequency f (Hz)"
            type="number"
            value={sourceFrequency}
            onChange={(e) => setSourceFrequency(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Wave Speed v (m/s in air)"
            type="number"
            value={waveSpeed}
            onChange={(e) => setWaveSpeed(Number(e.target.value))}
            min={10}
          />
          <InputField
            label="Source Velocity v_s (m/s)"
            type="number"
            value={sourceVelocity}
            onChange={(e) => setSourceVelocity(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">Source Motion Direction:</span>
          <div className="inline-flex rounded-xl p-1 bg-white border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsApproaching(true)}
              className={`px-4 py-1.5 rounded-lg transition-colors ${isApproaching ? "bg-indigo-600 text-white" : "text-slate-600"}`}
            >
              Approaching Observer (Higher Pitch)
            </button>
            <button
              type="button"
              onClick={() => setIsApproaching(false)}
              className={`px-4 py-1.5 rounded-lg transition-colors ${!isApproaching ? "bg-indigo-600 text-white" : "text-slate-600"}`}
            >
              Receding Away (Lower Pitch)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Observed Frequency (f')"
            value={`${observedFreq.toFixed(1)} Hz`}
            subtitle={isApproaching ? "Compressed wavefronts" : "Stretched wavefronts"}
          />
          <ResultCard
            variant="light"
            title="Pitch Frequency Shift"
            value={`${parseFloat(pitchShiftPct) >= 0 ? `+${pitchShiftPct}` : pitchShiftPct}%`}
            subtitle="Relative perceptual change"
          />
          <ResultCard
            variant="light"
            title="Mach Number"
            value={(sourceVelocity / waveSpeed).toFixed(3)}
            subtitle="Ratio of source speed to sound speed"
          />
        </div>
      </div>
    </div>
  );
};
