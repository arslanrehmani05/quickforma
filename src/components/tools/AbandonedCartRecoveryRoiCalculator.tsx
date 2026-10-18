import React, { useState } from "react";
import { ShoppingCart, RefreshCw, Mail, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AbandonedCartRecoveryRoiCalculator: React.FC = () => {
  const [monthlyCheckoutsInitiated, setMonthlyCheckoutsInitiated] = useState<number>(1200);
  const [cartAbandonmentRatePct, setCartAbandonmentRatePct] = useState<number>(70); // Industry standard ~70%
  const [averageOrderValue, setAverageOrderValue] = useState<number>(75);
  const [recoveryEmailSuccessRatePct, setRecoveryEmailSuccessRatePct] = useState<number>(8.5); // Klaviyo benchmark ~8-10%
  const [smsEmailSoftwareMonthlyCost, setSmsEmailSoftwareMonthlyCost] = useState<number>(150);

  const safeCheckouts = Math.max(0, monthlyCheckoutsInitiated);
  const safeAbandonment = Math.min(100, Math.max(0, cartAbandonmentRatePct));
  const safeRecoveryRate = Math.min(100, Math.max(0, recoveryEmailSuccessRatePct));
  const safeAov = Math.max(0, averageOrderValue);
  const safeCost = Math.max(0, smsEmailSoftwareMonthlyCost);

  const abandonedCheckouts = safeCheckouts * (safeAbandonment / 100);
  const recoveredOrders = abandonedCheckouts * (safeRecoveryRate / 100);
  const recoveredGrossRevenue = recoveredOrders * safeAov;
  const netRecoveredRevenue = recoveredGrossRevenue - safeCost;
  const recoveryRoiMultiplier = safeCost > 0 ? recoveredGrossRevenue / safeCost : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShoppingCart}
            title="Abandoned Cart Recovery Flow ROI Calculator"
            description="Estimate monthly recovered revenue and software ROI from Klaviyo / Omnisend automated abandoned cart email and SMS flows."
          />
          <ResetButton onReset={() => {
            setMonthlyCheckoutsInitiated(1200);
            setCartAbandonmentRatePct(70);
            setAverageOrderValue(75);
            setRecoveryEmailSuccessRatePct(8.5);
            setSmsEmailSoftwareMonthlyCost(150);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <InputField
            label="Monthly Checkouts"
            type="number"
            min={1}
            value={monthlyCheckoutsInitiated}
            onChange={(e) => setMonthlyCheckoutsInitiated(Math.max(1, Number(e.target.value)))}
          />
          <InputField
            label="Abandonment Rate (%)"
            type="number"
            min={1}
            max={99}
            value={cartAbandonmentRatePct}
            onChange={(e) => setCartAbandonmentRatePct(Number(e.target.value))}
          />
          <InputField
            label="Average Order ($)"
            type="number"
            min={1}
            value={averageOrderValue}
            onChange={(e) => setAverageOrderValue(Number(e.target.value))}
          />
          <InputField
            label="Recovery Win Rate (%)"
            type="number"
            min={0.1}
            max={50}
            step={0.5}
            value={recoveryEmailSuccessRatePct}
            onChange={(e) => setRecoveryEmailSuccessRatePct(Number(e.target.value))}
          />
          <InputField
            label="Email/SMS Tool Cost ($)"
            type="number"
            min={0}
            value={smsEmailSoftwareMonthlyCost}
            onChange={(e) => setSmsEmailSoftwareMonthlyCost(Number(e.target.value))}
          />
        </div>

        <ResultCard variant="dark" title="Monthly Recovered Revenue Projection">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Recovered Revenue</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                ${Math.round(recoveredGrossRevenue).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">/ month in saved orders</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Saved Orders</span>
              <p className="text-4xl font-extrabold text-white mt-1">{Math.round(recoveredOrders)}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">from {Math.round(abandonedCheckouts)} abandoned</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Annualized Saved ARR</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">
                ${Math.round(recoveredGrossRevenue * 12).toLocaleString()}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Full-year run rate</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Email Stack ROI</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{recoveryRoiMultiplier.toFixed(1)}×</p>
              <span className="text-[11px] text-slate-300 mt-1 block">${Math.round(netRecoveredRevenue).toLocaleString()} net profit</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
