import React, { useState } from "react";
import { ShoppingBag, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const WalmartMarketplaceFeeCalculator: React.FC = () => {
  const [salePrice, setSalePrice] = useState<number>(45.00);
  const [shippingCharged, setShippingCharged] = useState<number>(0.00);
  const [itemCost, setItemCost] = useState<number>(14.50);
  const [category, setCategory] = useState<string>("apparel");
  const [wfsFulfillmentFee, setWfsFulfillmentFee] = useState<number>(4.25); // Walmart Fulfillment Services fee

  const safeSalePrice = Math.max(0, salePrice);
  const safeShipping = Math.max(0, shippingCharged);
  const safeCost = Math.max(0, itemCost);
  const safeWfs = Math.max(0, wfsFulfillmentFee);

  const totalRevenue = safeSalePrice + safeShipping;

  // Walmart Category Referral Fee Logic (with tiered rules where applicable)
  const calculateReferralFee = (rev: number, cat: string) => {
    if (rev <= 0) return { fee: 0, effectiveRate: 0 };
    switch (cat) {
      case "electronics":
        return { fee: rev * 0.08, effectiveRate: 8 };
      case "computers":
        return { fee: rev * 0.06, effectiveRate: 6 };
      case "auto":
        return { fee: rev * 0.12, effectiveRate: 12 };
      case "beauty_tiered":
        // 8% for items <= $10, 15% for items > $10
        if (rev <= 10) return { fee: rev * 0.08, effectiveRate: 8 };
        return { fee: 10 * 0.08 + (rev - 10) * 0.15, effectiveRate: ((10 * 0.08 + (rev - 10) * 0.15) / rev) * 100 };
      case "grocery_tiered":
        // 8% for items <= $15, 15% for items > $15
        if (rev <= 15) return { fee: rev * 0.08, effectiveRate: 8 };
        return { fee: 15 * 0.08 + (rev - 15) * 0.15, effectiveRate: ((15 * 0.08 + (rev - 15) * 0.15) / rev) * 100 };
      case "apparel":
      default:
        return { fee: rev * 0.15, effectiveRate: 15 };
    }
  };

  const { fee: referralFee, effectiveRate } = calculateReferralFee(totalRevenue, category);
  const totalFees = referralFee + safeWfs;
  const netProfit = totalRevenue - safeCost - totalFees;
  const netMarginPct = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  const roiPct = safeCost > 0 ? (netProfit / safeCost) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShoppingBag}
            title="Walmart Marketplace Fee & WFS Net Profit Calculator"
            description="Calculate Walmart referral fees (6%-15%), WFS fulfillment deductions, net operating margin, and unit ROI."
          />
          <ResetButton onReset={() => {
            setSalePrice(45.00);
            setShippingCharged(0.00);
            setItemCost(14.50);
            setCategory("apparel");
            setWfsFulfillmentFee(4.25);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <InputField
            label="Listing Price ($)"
            type="number"
            min={0}
            step="0.01"
            value={salePrice}
            onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Shipping Charged ($)"
            type="number"
            min={0}
            step="0.01"
            value={shippingCharged}
            onChange={(e) => setShippingCharged(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Landed COGS ($)"
            type="number"
            min={0}
            step="0.01"
            value={itemCost}
            onChange={(e) => setItemCost(Math.max(0, Number(e.target.value)))}
          />
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Referral Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs font-semibold px-2 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value="apparel">Apparel & Accessories (15%)</option>
              <option value="electronics">Consumer Electronics (8%)</option>
              <option value="computers">Personal Computers (6%)</option>
              <option value="auto">Automotive & Powersports (12%)</option>
              <option value="beauty_tiered">Beauty / Personal Care (8% &lt;=$10, 15% &gt;$10)</option>
              <option value="grocery_tiered">Grocery (8% &lt;=$15, 15% &gt;$15)</option>
            </select>
          </div>
          <InputField
            label="WFS / Postage Fee ($)"
            type="number"
            min={0}
            step="0.01"
            value={wfsFulfillmentFee}
            onChange={(e) => setWfsFulfillmentFee(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Unit Economics Breakdown">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Profit / Unit</span>
              <p className={`text-4xl font-extrabold mt-1 ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${netProfit.toFixed(2)}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">After all Walmart deductions</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Profit Margin</span>
              <p className="text-4xl font-extrabold text-white mt-1">{netMarginPct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Net profit / total revenue</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Walmart Fees</span>
              <p className="text-4xl font-extrabold text-amber-300 mt-1">${totalFees.toFixed(2)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Ref (${referralFee.toFixed(2)}) + WFS (${wfsFulfillmentFee.toFixed(2)})</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Return on Investment</span>
              <p className="text-2xl font-bold text-indigo-300 mt-1">{roiPct.toFixed(1)}% ROI</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Profit / Inventory COGS</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
