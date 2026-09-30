import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { Gauge } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const OeeCalculator: React.FC = () => {
  const [plannedTimeHours, setPlannedTimeHours] = useState<number>(8); // Planned Operating Time
  const [downtimeHours, setDowntimeHours] = useState<number>(0.8);      // Unplanned Downtime
  const [idealCycleTimeSec, setIdealCycleTimeSec] = useState<number>(30); // Target seconds per unit
  const [totalUnitsProduced, setTotalUnitsProduced] = useState<number>(800);
  const [defectiveUnits, setDefectiveUnits] = useState<number>(24);

  // Math:
  const operatingTimeHours = Math.max(0, plannedTimeHours - downtimeHours);
  const availabilityPct = plannedTimeHours > 0 ? (operatingTimeHours / plannedTimeHours) * 100 : 0;

  // Performance = (Total Units * Ideal Cycle Time in Hours) / Operating Time
  const idealHoursForTotalUnits = (totalUnitsProduced * idealCycleTimeSec) / 3600;
  const performancePct = operatingTimeHours > 0 ? Math.min(100, (idealHoursForTotalUnits / operatingTimeHours) * 100) : 0;

  // Quality = (Good Units / Total Units)
  const goodUnits = Math.max(0, totalUnitsProduced - defectiveUnits);
  const qualityPct = totalUnitsProduced > 0 ? (goodUnits / totalUnitsProduced) * 100 : 0;

  // OEE = (Availability * Performance * Quality) / 10000
  const oeePct = (availabilityPct * performancePct * qualityPct) / 10000;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <Gauge className="w-5 h-5" />
            <span>Overall Equipment Effectiveness (OEE) Calculator</span>
          </div>
          <ResetButton onReset={() => { setPlannedTimeHours(8); setDowntimeHours(0.8); setIdealCycleTimeSec(30); setTotalUnitsProduced(800); setDefectiveUnits(24); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Planned Shift Time (Hours)
            </label>
            <input
              type="number"
              value={plannedTimeHours}
              onChange={(e) => setPlannedTimeHours(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Unplanned Downtime (Hours)
            </label>
            <input
              type="number"
              value={downtimeHours}
              onChange={(e) => setDowntimeHours(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Target Ideal Cycle Time (Sec / Unit)
            </label>
            <input
              type="number"
              value={idealCycleTimeSec}
              onChange={(e) => setIdealCycleTimeSec(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Total Units Produced
            </label>
            <input
              type="number"
              value={totalUnitsProduced}
              onChange={(e) => setTotalUnitsProduced(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Defective / Rejected Units
            </label>
            <input
              type="number"
              value={defectiveUnits}
              onChange={(e) => setDefectiveUnits(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>
        </div>

        {/* Output */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-100">
          <div className="p-4 bg-black text-white rounded-xl space-y-1 shadow-sm sm:col-span-1">
            <span className="text-xs font-semibold text-zinc-300">OEE Score</span>
            <div className="text-3xl font-extrabold">{oeePct.toFixed(1)}%</div>
            <span className="text-[11px] text-zinc-400 font-mono">World Class Target: 85%</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Availability</span>
            <div className="text-xl font-bold text-zinc-900">{availabilityPct.toFixed(1)}%</div>
            <span className="text-[11px] text-zinc-500 font-mono">{operatingTimeHours.toFixed(1)}h operating</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Performance</span>
            <div className="text-xl font-bold text-zinc-900">{performancePct.toFixed(1)}%</div>
            <span className="text-[11px] text-zinc-500 font-mono">Speed efficiency</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Quality Rate</span>
            <div className="text-xl font-bold text-zinc-900">{qualityPct.toFixed(1)}%</div>
            <span className="text-[11px] text-zinc-500 font-mono">{goodUnits} good units</span>
          </div>
        </div>
      </div>
    </div>
  );
};
