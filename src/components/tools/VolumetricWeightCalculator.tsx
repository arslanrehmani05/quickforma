import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { Truck, Box } from 'lucide-react';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';

export const VolumetricWeightCalculator: React.FC = () => {
  const [lengthCm, setLengthCm] = useState<number>(50);
  const [widthCm, setWidthCm] = useState<number>(40);
  const [heightCm, setHeightCm] = useState<number>(30);
  const [actualWeightKg, setActualWeightKg] = useState<number>(6);
  const [dimFactor, setDimFactor] = useState<number>(5000); // Standard IATA volumetric divisor (5000 cm³/kg)

  // Math: Volumetric Weight = (L * W * H) / DimFactor
  const cubicVolumeCm3 = lengthCm * widthCm * heightCm;
  const volumetricWeightKg = dimFactor > 0 ? cubicVolumeCm3 / dimFactor : 0;
  const billableWeightKg = Math.max(actualWeightKg, volumetricWeightKg);
  const isDimWeightCharged = volumetricWeightKg > actualWeightKg;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <Truck className="w-5 h-5" />
            <span>Volumetric Weight & Billable Freight Calculator</span>
          </div>
          <ResetButton onReset={() => { setLengthCm(50); setWidthCm(40); setHeightCm(30); setActualWeightKg(6); setDimFactor(5000); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Length (cm)</label>
            <input
              type="number"
              value={lengthCm}
              onChange={(e) => setLengthCm(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Width (cm)</label>
            <input
              type="number"
              value={widthCm}
              onChange={(e) => setWidthCm(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Height (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Actual Scale Weight (kg)</label>
            <input
              type="number"
              value={actualWeightKg}
              onChange={(e) => setActualWeightKg(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>
        </div>

        {/* Carrier Divisor */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Carrier DIM Factor / Divisor</label>
          <select
            value={dimFactor}
            onChange={(e) => setDimFactor(Number(e.target.value))}
            className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold cursor-pointer"
          >
            <option value={5000}>IATA Air Freight International (5,000 cm³/kg)</option>
            <option value={4000}>Courier / Express Cargo (4,000 cm³/kg)</option>
            <option value={6000}>Domestic Sea / Ground Freight (6,000 cm³/kg)</option>
          </select>
        </div>

        {/* Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
          <div className="p-4 bg-black text-white rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-zinc-300">Carrier Billable Weight</span>
            <div className="text-2xl font-extrabold">{billableWeightKg.toFixed(2)} kg</div>
            <span className="text-[11px] text-zinc-400 font-mono">
              {isDimWeightCharged ? 'Charged on Volumetric Weight' : 'Charged on Actual Weight'}
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Volumetric Weight</span>
            <div className="text-xl font-bold text-zinc-900">{volumetricWeightKg.toFixed(2)} kg</div>
            <span className="text-[11px] text-zinc-500 font-mono">{cubicVolumeCm3.toLocaleString()} cm³ volume</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Actual Scale Weight</span>
            <div className="text-xl font-bold text-zinc-900">{actualWeightKg.toFixed(2)} kg</div>
            <span className="text-[11px] text-zinc-500 font-mono">Physical package weight</span>
          </div>
        </div>
      </div>

      <ToolSeoWrapper
        toolName="Volumetric Weight Freight Calculator"
        category="operations"
        toolId="volumetric-weight-calculator"
      />
    </div>
  );
};
