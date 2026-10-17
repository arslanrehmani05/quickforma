import React, { useState } from "react";
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EcommerceConversionRateCalculator: React.FC = () => {
  const [visitors, setVisitors] = useState<number>(35000);
  const [orders, setOrders] = useState<number>(875);
  const [aov, setAov] = useState<number>(68);

  const conversionRate = (visitors || 0) > 0 ? ((orders || 0) / visitors) * 100 : 0;
  const grossRevenue = (orders || 0) * (aov || 0);
  const revenuePerVisitor = (visitors || 0) > 0 ? grossRevenue / visitors : 0;

  // Potential revenue at +0.5% higher CR
  const improvedCr = conversionRate + 0.5;
  const improvedOrders = (visitors || 0) * (improvedCr / 100);
  const improvedRevenue = improvedOrders * (aov || 0);
  const revenueLift = improvedRevenue - grossRevenue;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={TrendingUp}
            title="Store Visitor to Purchase Conversion Solver"
            description="Calculate ecommerce checkout conversion rates, revenue per visitor (RPV), and revenue expansion upside."
          />
          <ResetButton onReset={() => {
            setVisitors(35000);
            setOrders(875);
            setAov(68);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField label="Total Online Store Sessions / Visitors" type="number" value={visitors} onChange={(e) => setVisitors(Number(e.target.value))} />
            <InputField label="Total Completed Orders / Transactions" type="number" value={orders} onChange={(e) => setOrders(Number(e.target.value))} />
            <InputField label="Average Order Value (AOV) ($)" type="number" prefix="$" value={aov} onChange={(e) => setAov(Number(e.target.value))} />
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Conversion Funnel Efficiency">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">E-Commerce Conversion Rate</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                    {conversionRate.toFixed(2)}%
                  </div>
                  <p className="text-xs text-slate-400">
                    Benchmark: Average ecommerce store CR ranges between 1.8% – 3.2%.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Revenue per Visitor (RPV)</span>
                    <span className="text-base font-bold text-white">${revenuePerVisitor.toFixed(2)}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Gross Sales Revenue</span>
                    <span className="text-base font-bold text-white">${grossRevenue.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2 p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
                    <span className="text-[11px] text-indigo-300 block font-semibold">+0.5% Conversion Lift Opportunity</span>
                    <span className="text-sm font-bold text-white block mt-0.5">
                      +${Math.round(revenueLift).toLocaleString()} additional monthly revenue
                    </span>
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
