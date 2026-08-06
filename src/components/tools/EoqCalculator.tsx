import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { Box, TrendingUp } from 'lucide-react';

export const EoqCalculator: React.FC = () => {
  const [annualDemand, setAnnualDemand] = useState<number>(10000); // D
  const [orderCost, setOrderCost] = useState<number>(50);          // S (Setup/Ordering cost per order)
  const [holdingCost, setHoldingCost] = useState<number>(2.50);     // H (Holding/Carrying cost per unit per year)

  // EOQ = sqrt((2 * D * S) / H)
  const eoq = holdingCost > 0 ? Math.sqrt((2 * annualDemand * orderCost) / holdingCost) : 0;
  const totalOrders = eoq > 0 ? annualDemand / eoq : 0;
  const annualOrderingCost = totalOrders * orderCost;
  const annualHoldingCost = (eoq / 2) * holdingCost;
  const totalInventoryCost = annualOrderingCost + annualHoldingCost;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <Box className="w-5 h-5" />
            <span>Economic Order Quantity (EOQ) Calculator</span>
          </div>
          <ResetButton onReset={() => { setAnnualDemand(10000); setOrderCost(50); setHoldingCost(2.50); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Annual Product Demand (Units / Year)
            </label>
            <input
              type="number"
              value={annualDemand}
              onChange={(e) => setAnnualDemand(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Fixed Ordering / Setup Cost per Order ($)
            </label>
            <input
              type="number"
              value={orderCost}
              onChange={(e) => setOrderCost(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Holding Cost per Unit / Year ($)
            </label>
            <input
              type="number"
              value={holdingCost}
              onChange={(e) => setHoldingCost(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>
        </div>

        {/* Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
          <div className="p-4 bg-black text-white rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-zinc-300">Optimal Order Quantity (EOQ)</span>
            <div className="text-2xl font-extrabold">{Math.round(eoq).toLocaleString()} Units</div>
            <span className="text-[11px] text-zinc-400 font-mono">Minimizes total inventory cost</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Orders per Year</span>
            <div className="text-xl font-bold text-zinc-900">{totalOrders.toFixed(1)} Orders</div>
            <span className="text-[11px] text-zinc-500 font-mono">Every {(365 / Math.max(1, totalOrders)).toFixed(0)} days</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Total Annual Cost</span>
            <div className="text-xl font-bold text-zinc-900">${totalInventoryCost.toFixed(2)}</div>
            <span className="text-[11px] text-zinc-500 font-mono">${annualOrderingCost.toFixed(0)} order + ${annualHoldingCost.toFixed(0)} hold</span>
          </div>
        </div>
      </div>
    </div>
  );
};
