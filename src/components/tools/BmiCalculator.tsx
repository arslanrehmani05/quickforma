import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { Activity, AlertCircle } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(154);

  // Math
  let bmi = 0;
  if (unitSystem === 'metric') {
    const heightMeters = heightCm / 100;
    bmi = heightMeters > 0 ? weightKg / (heightMeters * heightMeters) : 0;
  } else {
    const totalInches = heightFt * 12 + heightIn;
    bmi = totalInches > 0 ? (703 * weightLbs) / (totalInches * totalInches) : 0;
  }

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (val < 25.0) return { category: 'Normal weight', color: 'text-emerald-600' };
    if (val < 30.0) return { category: 'Overweight', color: 'text-amber-600' };
    return { category: 'Obesity', color: 'text-rose-600' };
  };

  const result = getBmiCategory(bmi);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <Activity className="w-5 h-5" />
            <span>Body Mass Index (BMI) Calculator</span>
          </div>
          <ResetButton onReset={() => { setUnitSystem('metric'); setHeightCm(175); setWeightKg(70); setHeightFt(5); setHeightIn(9); setWeightLbs(154); }} />
        </div>

        {/* Unit Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`py-2 px-4 text-xs font-bold rounded-lg border ${
              unitSystem === 'metric' ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-200'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`py-2 px-4 text-xs font-bold rounded-lg border ${
              unitSystem === 'imperial' ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-200'
            }`}
          >
            Imperial (ft, in / lbs)
          </button>
        </div>

        {/* Inputs */}
        {unitSystem === 'metric' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Height (Centimeters)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Weight (Kilograms)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Height (Feet)</label>
              <input
                type="number"
                value={heightFt}
                onChange={(e) => setHeightFt(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Height (Inches)</label>
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Weight (Pounds)</label>
              <input
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
              />
            </div>
          </div>
        )}

        {/* Output */}
        <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 text-center">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Your Body Mass Index</span>
          <div className="text-4xl font-black text-black">{bmi.toFixed(1)}</div>
          <div className={`text-sm font-extrabold ${result.color}`}>{result.category}</div>
        </div>

        {/* Medical Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Medical Disclaimer:</strong> This BMI calculator is provided for informational and reference purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
          </span>
        </div>
      </div>
    </div>
  );
};
