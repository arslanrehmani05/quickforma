import React, { useState, useMemo } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { calculateOhmsLaw } from '../../utils/science/physicsEngine';

export const OhmsLawElectricalCalculator: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(12);
  const [current, setCurrent] = useState<number>(2);
  const [resistance, setResistance] = useState<number>(0);

  const result = useMemo(() => {
    try {
      return calculateOhmsLaw(voltage, current, resistance);
    } catch (err: any) {
      return { voltage: 0, current: 0, resistance: 0, power_W: 0 };
    }
  }, [voltage, current, resistance]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Ohm's Law & Circuit Calculator</h2>
            <p className="text-xs text-slate-500">
              Solve voltage ($V = IR$), electrical current ($I$), resistance ($R$), and power ($P = VI$).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Voltage ($V$ in Volts)</label>
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current ($I$ in Amperes)</label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Resistance ($R$ in Ohms $\Omega$)</label>
            <input
              type="number"
              value={resistance}
              onChange={(e) => setResistance(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Circuit Parameters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Voltage ($V$)</div>
            <div className="text-2xl font-extrabold text-white font-mono">{result.voltage} V</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Current ($I$)</div>
            <div className="text-2xl font-extrabold text-indigo-300 font-mono">{result.current} A</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Resistance ($R$)</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{result.resistance} $\Omega$</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Power ($P$)</div>
            <div className="text-2xl font-extrabold text-amber-300 font-mono">{result.power_W} W</div>
          </div>
        </div>
      </div>
    </div>
  );
};
