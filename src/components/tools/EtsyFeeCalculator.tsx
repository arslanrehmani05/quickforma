import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { ShoppingCart } from 'lucide-react';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';

export const EtsyFeeCalculator: React.FC = () => {
  const [listingPrice, setListingPrice] = useState<number>(45);
  const [shippingCharged, setShippingCharged] = useState<number>(5);
  const [itemCost, setItemCost] = useState<number>(12);
  const [useOffsiteAds, setUseOffsiteAds] = useState<boolean>(false);

  // Etsy Fee structure:
  // Listing Fee: $0.20
  // Transaction Fee: 6.5% of (Price + Shipping)
  // Payment Processing Fee: 3.0% + $0.25 (US standard)
  // Offsite Ads Fee: 15% optional
  const listingFee = 0.20;
  const totalChargeable = listingPrice + shippingCharged;
  const transactionFee = totalChargeable * 0.065;
  const processingFee = (totalChargeable * 0.03) + 0.25;
  const offsiteAdsFee = useOffsiteAds ? totalChargeable * 0.15 : 0;

  const totalEtsyFees = listingFee + transactionFee + processingFee + offsiteAdsFee;
  const netProfit = Math.max(0, totalChargeable - totalEtsyFees - itemCost);
  const marginPct = totalChargeable > 0 ? (netProfit / totalChargeable) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <ShoppingCart className="w-5 h-5" />
            <span>Etsy Fee & Profit Calculator</span>
          </div>
          <ResetButton onReset={() => { setListingPrice(45); setShippingCharged(5); setItemCost(12); setUseOffsiteAds(false); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Item Listing Price ($)</label>
            <input
              type="number"
              value={listingPrice}
              onChange={(e) => setListingPrice(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Shipping Charged ($)</label>
            <input
              type="number"
              value={shippingCharged}
              onChange={(e) => setShippingCharged(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Item Cost of Goods / COGS ($)</label>
            <input
              type="number"
              value={itemCost}
              onChange={(e) => setItemCost(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
            <input
              type="checkbox"
              checked={useOffsiteAds}
              onChange={(e) => setUseOffsiteAds(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
            />
            <span>Attributed to Etsy Offsite Ads (+15% fee)</span>
          </label>
        </div>

        {/* Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
          <div className="p-4 bg-black text-white rounded-xl space-y-1 shadow-sm">
            <span className="text-xs font-semibold text-zinc-300">Net Profit</span>
            <div className="text-2xl font-extrabold">${netProfit.toFixed(2)}</div>
            <span className="text-[11px] text-zinc-400 font-mono">{marginPct.toFixed(1)}% profit margin</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Total Etsy Fees</span>
            <div className="text-xl font-bold text-zinc-900">${totalEtsyFees.toFixed(2)}</div>
            <span className="text-[11px] text-zinc-500 font-mono">6.5% txn + 3% payment + $0.45</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Gross Revenue</span>
            <div className="text-xl font-bold text-zinc-900">${totalChargeable.toFixed(2)}</div>
            <span className="text-[11px] text-zinc-500 font-mono">Price + shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
};
