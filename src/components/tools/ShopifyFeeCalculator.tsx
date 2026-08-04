import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { ShoppingBag, DollarSign } from 'lucide-react';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';
import { SHOPIFY_FEE_SEO } from '../../data/sampleToolSeoData';

export const ShopifyFeeCalculator: React.FC = () => {
  const [revenue, setRevenue] = useState<number>(5000);
  const [orders, setOrders] = useState<number>(100);
  const [plan, setPlan] = useState<'basic' | 'shopify' | 'advanced'>('shopify');
  const [useShopifyPayments, setUseShopifyPayments] = useState<boolean>(true);

  // Plan rates
  const PLAN_RATES = {
    basic: { monthlyFee: 39, creditCardRate: 0.029, fixedFee: 0.30, thirdPartyFee: 0.02 },
    shopify: { monthlyFee: 105, creditCardRate: 0.026, fixedFee: 0.30, thirdPartyFee: 0.01 },
    advanced: { monthlyFee: 399, creditCardRate: 0.024, fixedFee: 0.30, thirdPartyFee: 0.006 },
  };

  const currentPlan = PLAN_RATES[plan];

  // Fee calculation
  const monthlyPlanFee = currentPlan.monthlyFee;
  const processingFee = (revenue * currentPlan.creditCardRate) + (orders * currentPlan.fixedFee);
  const thirdPartyFee = useShopifyPayments ? 0 : (revenue * currentPlan.thirdPartyFee);
  const totalFees = monthlyPlanFee + processingFee + thirdPartyFee;
  const netRevenue = Math.max(0, revenue - totalFees);
  const effectiveFeePercentage = revenue > 0 ? (totalFees / revenue) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <ShoppingBag className="w-5 h-5" />
            <span>Shopify Fee Calculator</span>
          </div>
          <ResetButton onReset={() => { setRevenue(5000); setOrders(100); setPlan('shopify'); setUseShopifyPayments(true); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Monthly Sales Revenue ($)
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Monthly Orders Count
            </label>
            <input
              type="number"
              value={orders}
              onChange={(e) => setOrders(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>
        </div>

        {/* Plan Selector */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Shopify Plan Tier
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'basic', label: 'Basic ($39/mo)' },
              { id: 'shopify', label: 'Shopify ($105/mo)' },
              { id: 'advanced', label: 'Advanced ($399/mo)' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPlan(p.id as any)}
                className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                  plan === p.id ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Gateway */}
        <div className="flex items-center gap-3 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
            <input
              type="checkbox"
              checked={useShopifyPayments}
              onChange={(e) => setUseShopifyPayments(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
            />
            <span>Using Shopify Payments (Waives 3rd Party Gateway Fees)</span>
          </label>
        </div>

        {/* Breakdown Output */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Total Shopify Fees</span>
            <div className="text-xl font-extrabold text-black">${totalFees.toFixed(2)}</div>
            <span className="text-[11px] text-zinc-500 font-mono">{effectiveFeePercentage.toFixed(2)}% of sales</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Net Take-Home Revenue</span>
            <div className="text-xl font-extrabold text-black">${netRevenue.toFixed(2)}</div>
            <span className="text-[11px] text-zinc-500 font-mono">After all transaction fees</span>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
            <span className="text-xs font-semibold text-zinc-500">Processing Fee Breakdown</span>
            <div className="text-sm font-bold text-zinc-900">${processingFee.toFixed(2)} Card Fees</div>
            <span className="text-[11px] text-zinc-500 font-mono">${monthlyPlanFee}/mo plan fee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
