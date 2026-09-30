import React, { useState, useMemo } from 'react';
import { Sparkles, Activity } from 'lucide-react';
import { calculateWaveProperties } from '../../utils/science/physicsEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const WaveFrequencySpeedCalculator: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(500); // 500 Hz
  const [wavelength, setWavelength] = useState<number>(0.686); // 0.686 m
  const [speed, setSpeed] = useState<number>(343); // 343 m/s sound speed

  const result = useMemo(() => {
    try {
      return calculateWaveProperties(frequency, wavelength, undefined);
    } catch (err: any) {
      return { frequency: 0, wavelength: 0, speed: 0, period: 0, photonEnergy_J: 0 };
    }
  }, [frequency, wavelength]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Wave, Frequency & Light Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate wave speed ($v = f \lambda$), period ($T = 1/f$), and photon energy ($E = hf$).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Frequency ($f$ in Hz)</label>
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Wavelength ($\lambda$ in meters)</label>
            <input
              type="number"
              value={wavelength}
              onChange={(e) => setWavelength(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold  text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Wave Parameters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Wave Speed ($v = f\lambda$)</div>
            <div className="text-3xl font-extrabold text-white font-mono">{result.speed} m/s</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Period ($T = 1/f$)</div>
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">{result.period} s</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Photon Energy ($E = hf$)</div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-1">{result.photonEnergy_J.toExponential(3)} J</div>
          </div>
        </div>
      </div>
    </div>
  );
};
