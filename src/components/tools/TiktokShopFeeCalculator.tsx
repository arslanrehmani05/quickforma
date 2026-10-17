import React, { useState } from "react";
import { Video, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const TiktokShopFeeCalculator: React.FC = () => {
  const [productPrice, setProductPrice] = useState<number>(45);
  const [shippingFeePaid, setShippingFeePaid] = useState<number>(4.99);
  const [cogs, setCogs] = useState<number>(12);
  const [fulfillmentCost, setFulfillmentCost] = useState<number>(5.5);
  const [affiliateRate, setAffiliateRate] = useState<number>(15); // 15% creator commission
  const [platformFeeRate, setPlatformFeeRate] = useState<number>(6); // 6% TikTok referral fee

  const totalPaidByCustomer = (productPrice || 0) + (shippingFeePaid || 0);
  const tiktokPlatformFee = (totalPaidByCustomer * ((platformFeeRate || 0) / 100)) + 0.30;
  const affiliatePayout = (productPrice || 0) * ((affiliateRate || 0) / 100);
  const totalDeductions = tiktokPlatformFee + affiliatePayout + (cogs || 0) + (fulfillmentCost || 0);

  const netSellerProfit = totalPaidByCustomer - totalDeductions;
  const netMargin = totalPaidByCustomer > 0 ? (netSellerProfit / totalPaidByCustomer) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Video}
            title="TikTok Shop Commission & Creator Affiliate Margin"
            description="Model TikTok Shop merchant platform commissions, creator affiliate payouts, and net product margins."
          />
          <ResetButton onReset={() => {
            setProductPrice(45);
            setShippingFeePaid(4.99);
            setCogs(12);
            setFulfillmentCost(5.5);
            setAffiliateRate(15);
            setPlatformFeeRate(6);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Selling Price ($)" type="number" prefix="$" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} />
              <InputField label="Customer Shipping ($)" type="number" prefix="$" value={shippingFeePaid} onChange={(e) => setShippingFeePaid(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Unit Product COGS ($)" type="number" prefix="$" value={cogs} onChange={(e) => setCogs(Number(e.target.value))} />
              <InputField label="Fulfillment & Packaging ($)" type="number" prefix="$" value={fulfillmentCost} onChange={(e) => setFulfillmentCost(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Creator Affiliate Commission (%)" type="number" suffix="%" value={affiliateRate} onChange={(e) => setAffiliateRate(Number(e.target.value))} />
              <InputField label="TikTok Shop Referral Fee (%)" type="number" suffix="%" value={platformFeeRate} onChange={(e) => setPlatformFeeRate(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="TikTok Order Net Margin">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Merchant Net Profit per Order</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${netSellerProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    ${netSellerProfit.toFixed(2)}
                  </div>
                  <p className="text-xs text-slate-400">
                    Net Margin: <strong className="text-white">{netMargin.toFixed(1)}%</strong> of gross cart revenue.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">TikTok Platform Fee</span>
                    <span className="text-base font-bold text-white">${tiktokPlatformFee.toFixed(2)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Creator Affiliate Fee</span>
                    <span className="text-base font-bold text-white">${affiliatePayout.toFixed(2)}</span>
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
