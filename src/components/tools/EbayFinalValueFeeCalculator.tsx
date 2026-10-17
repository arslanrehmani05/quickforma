import React, { useState } from "react";
import { ShoppingBag, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EbayFinalValueFeeCalculator: React.FC = () => {
  const [itemPrice, setItemPrice] = useState<number>(85);
  const [shippingCharged, setShippingCharged] = useState<number>(10);
  const [itemCost, setItemCost] = useState<number>(30);
  const [actualShippingCost, setActualShippingCost] = useState<number>(8.5);
  const [promotedRate, setPromotedRate] = useState<number>(3); // 3%
  const [isTopRated, setIsTopRated] = useState<boolean>(true); // 10% discount on FVF

  const totalOrderPaid = (itemPrice || 0) + (shippingCharged || 0);
  // Standard eBay FVF: 13.25% up to $7,500 + $0.30 per order
  const baseFvfRate = 0.1325;
  let finalValueFee = (totalOrderPaid * baseFvfRate) + 0.30;
  if (isTopRated) {
    finalValueFee *= 0.90; // 10% top-rated plus discount
  }

  const promotedFee = totalOrderPaid * ((promotedRate || 0) / 100);
  const totalEbayFees = finalValueFee + promotedFee;

  const totalSellerCosts = (itemCost || 0) + (actualShippingCost || 0) + totalEbayFees;
  const netProfit = totalOrderPaid - totalSellerCosts;
  const netMargin = totalOrderPaid > 0 ? (netProfit / totalOrderPaid) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShoppingBag}
            title="eBay Seller Fee & Store Subscription Profit"
            description="Calculate eBay Final Value Fees (FVF), promoted ad fees, and clean seller take-home profit margins."
          />
          <ResetButton onReset={() => {
            setItemPrice(85);
            setShippingCharged(10);
            setItemCost(30);
            setActualShippingCost(8.5);
            setPromotedRate(3);
            setIsTopRated(true);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Item Selling Price ($)" type="number" prefix="$" value={itemPrice} onChange={(e) => setItemPrice(Number(e.target.value))} />
              <InputField label="Shipping Charged to Buyer ($)" type="number" prefix="$" value={shippingCharged} onChange={(e) => setShippingCharged(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Product Cost (COGS) ($)" type="number" prefix="$" value={itemCost} onChange={(e) => setItemCost(Number(e.target.value))} />
              <InputField label="Actual Shipping & Label ($)" type="number" prefix="$" value={actualShippingCost} onChange={(e) => setActualShippingCost(Number(e.target.value))} />
            </div>
            <InputField label="Promoted Listings Ad Rate (%)" type="number" suffix="%" value={promotedRate} onChange={(e) => setPromotedRate(Number(e.target.value))} />
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="topRatedCheck"
                checked={isTopRated}
                onChange={(e) => setIsTopRated(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
              />
              <label htmlFor="topRatedCheck" className="text-xs font-semibold text-slate-700">Top Rated Plus Seller (10% discount on FVF)</label>
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="eBay Sale Economics">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Net Take-Home Profit</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${netProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    ${netProfit.toFixed(2)}
                  </div>
                  <p className="text-xs text-slate-400">
                    Net Profit Margin: <strong className="text-white">{netMargin.toFixed(1)}%</strong> of buyer payment (${totalOrderPaid.toFixed(2)}).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Total eBay Fees</span>
                    <span className="text-base font-bold text-white">${totalEbayFees.toFixed(2)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Final Value Fee (FVF)</span>
                    <span className="text-base font-bold text-white">${finalValueFee.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
