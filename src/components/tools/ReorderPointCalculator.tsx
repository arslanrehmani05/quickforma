import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { AlertTriangle, PackageCheck } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const ReorderPointCalculator: React.FC = () => {
  const [dailyUsage, setDailyUsage] = useState<number>(50);       // Average daily sales/usage rate
  const [leadTimeDays, setLeadTimeDays] = useState<number>(14);   // Supplier delivery lead time in days
  const [safetyStock, setSafetyStock] = useState<number>(200);    // Buffer stock held for supply spikes

  // Reorder Point (ROP) = (Daily Usage * Lead Time) + Safety Stock
  const leadTimeDemand = dailyUsage * leadTimeDays;
  const reorderPoint = leadTimeDemand + safetyStock;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <PackageCheck className="w-5 h-5" />
            <span>Reorder Point (ROP) Calculator</span>
          </div>
          <ResetButton onReset={() => { setDailyUsage(50); setLeadTimeDays(14); setSafetyStock(200); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Average Daily Sales / Usage (Units)
            </label>
            <input
              type="number"
              value={dailyUsage}
              onChange={(e) => setDailyUsage(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Supplier Lead Time (Days)
            </label>
            <input
              type="number"
              value={leadTimeDays}
              onChange={(e) => setLeadTimeDays(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Safety Stock Buffer (Units)
            </label>
            <input
              type="number"
              value={safetyStock}
              onChange={(e) => setSafetyStock(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>
        </div>

        {/* Output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
          <div className="p-5 bg-black text-white rounded-xl space-y-2 shadow-sm">
            <span className="text-xs font-bold text-zinc-300 ">Reorder Trigger Level</span>
            <div className="text-3xl font-extrabold">{reorderPoint.toLocaleString()} Units</div>
            <p className="text-xs text-zinc-400">Place a new supplier PO as soon as stock drops to this level.</p>
          </div>

          <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-zinc-700 ">Inventory Breakdown</span>
            <div className="text-sm font-semibold text-zinc-900">
              <span className="text-zinc-500">Lead Time Consumption:</span> {leadTimeDemand.toLocaleString()} units
            </div>
            <div className="text-sm font-semibold text-zinc-900">
              <span className="text-zinc-500">Buffer Safety Stock:</span> {safetyStock.toLocaleString()} units
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
