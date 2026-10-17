import React, { useState } from "react";
import { Receipt, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EcommerceNetProfitMarginCalculator: React.FC = () => {
  const [grossSales, setGrossSales] = useState<number>(75000);
  const [cogs, setCogs] = useState<number>(24000);
  const [adSpend, setAdSpend] = useState<number>(18000);
  const [shippingFulfillment, setShippingFulfillment] = useState<number>(9500);
  const [merchantFeeRate, setMerchantFeeRate] = useState<number>(2.9); // 2.9% + $0.30
  const [monthlySoftwareOverhead, setMonthlySoftwareOverhead] = useState<number>(1800);

  const paymentFees = ((grossSales || 0) * ((merchantFeeRate || 0) / 100));
  const totalOperatingCosts = (cogs || 0) + (adSpend || 0) + (shippingFulfillment || 0) + paymentFees + (monthlySoftwareOverhead || 0);

  const grossProfit = (grossSales || 0) - (cogs || 0);
  const grossMargin = (grossSales || 0) > 0 ? (grossProfit / grossSales) * 100 : 0;

  const netProfit = (grossSales || 0) - totalOperatingCosts;
  const netMargin = (grossSales || 0) > 0 ? (netProfit / grossSales) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Receipt}
            title="All-in Ecommerce Store P&L Profit Solver"
            description="Calculate net ecommerce take-home profit after product COGS, paid ads, shipping, payment fees, and software."
          />
          <ResetButton onReset={() => {
            setGrossSales(75000);
            setCogs(24000);
            setAdSpend(18000);
            setShippingFulfillment(9500);
            setMerchantFeeRate(2.9);
            setMonthlySoftwareOverhead(1800);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Monthly Gross Store Revenue ($)" type="number" prefix="$" value={grossSales} onChange={(e) => setGrossSales(Number(e.target.value))} />
            <InputField label="Total Product Landed COGS ($)" type="number" prefix="$" value={cogs} onChange={(e) => setCogs(Number(e.target.value))} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Paid Ads / Marketing ($)" type="number" prefix="$" value={adSpend} onChange={(e) => setAdSpend(Number(e.target.value))} />
              <InputField label="Shipping & Pick-Pack ($)" type="number" prefix="$" value={shippingFulfillment} onChange={(e) => setShippingFulfillment(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Payment Processor Fee (%)" type="number" suffix="%" value={merchantFeeRate} onChange={(e) => setMerchantFeeRate(Number(e.target.value))} />
              <InputField label="Shopify & App Subscriptions ($)" type="number" prefix="$" value={monthlySoftwareOverhead} onChange={(e) => setMonthlySoftwareOverhead(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Monthly P&L Net Earnings">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">All-In Net Operating Profit</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${netProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    ${netProfit.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-xs text-slate-400">
                    Net Profit Margin: <strong className="text-white">{netMargin.toFixed(1)}%</strong>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Gross Product Margin</span>
                    <span className="text-base font-bold text-white">{grossMargin.toFixed(1)}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Payment Processor Fees</span>
                    <span className="text-base font-bold text-white">${paymentFees.toFixed(0)}</span>
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
