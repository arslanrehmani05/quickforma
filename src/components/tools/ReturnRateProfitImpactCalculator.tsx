import React, { useState } from "react";
import { RotateCcw, AlertTriangle, TrendingDown, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ReturnRateProfitImpactCalculator: React.FC = () => {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(1200);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(65.0);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(55.0); // 55%
  const [returnRatePct, setReturnRatePct] = useState<number>(14.0); // 14% return rate
  const [twoWayShippingCost, setTwoWayShippingCost] = useState<number>(11.50); // outbound + return label
  const [restockingLossPerReturn, setRestockingLossPerReturn] = useState<number>(4.00); // inspection, repackaging, damage

  const totalMonthlyRevenue = monthlyOrders * averageOrderValue;
  const totalUnitsReturned = Math.round(monthlyOrders * (returnRatePct / 100));

  // Direct return costs: shipping loss + inspection/restock loss
  const returnFulfillmentLoss = totalUnitsReturned * (twoWayShippingCost + restockingLossPerReturn);
  // Gross profit lost from reversed revenue
  const lostGrossProfit = totalUnitsReturned * averageOrderValue * (grossMarginPct / 100);

  const totalMonthlyReturnLoss = returnFulfillmentLoss + lostGrossProfit;
  const revenueLossPct = totalMonthlyRevenue > 0 ? ((totalMonthlyReturnLoss / totalMonthlyRevenue) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={RotateCcw}
            title="Ecommerce Customer Return Rate & Margin Loss Solver"
            description="Quantify total bottom-line profit erosion from return logistics, two-way shipping labels, and unsellable inventory."
          />
          <ResetButton onReset={() => {
            setMonthlyOrders(1200); setAverageOrderValue(65.0); setGrossMarginPct(55.0);
            setReturnRatePct(14.0); setTwoWayShippingCost(11.50); setRestockingLossPerReturn(4.00);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Monthly Order Volume"
            type="number"
            value={monthlyOrders}
            onChange={(e) => setMonthlyOrders(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Average Order Value ($)"
            type="number"
            step={0.5}
            value={averageOrderValue}
            onChange={(e) => setAverageOrderValue(Number(e.target.value))}
            min={1}
          />
          <InputField
            label="Gross Product Margin %"
            type="number"
            value={grossMarginPct}
            onChange={(e) => setGrossMarginPct(Number(e.target.value))}
            min={1}
            max={100}
          />
          <InputField
            label="Customer Return Rate %"
            type="number"
            step={0.5}
            value={returnRatePct}
            onChange={(e) => setReturnRatePct(Number(e.target.value))}
            min={0}
            max={50}
          />
          <InputField
            label="Two-Way Shipping Cost / Return ($)"
            type="number"
            step={0.5}
            value={twoWayShippingCost}
            onChange={(e) => setTwoWayShippingCost(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Restocking / Damage Loss ($)"
            type="number"
            step={0.5}
            value={restockingLossPerReturn}
            onChange={(e) => setRestockingLossPerReturn(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Total Monthly Profit Loss"
            value={`$${Math.round(totalMonthlyReturnLoss).toLocaleString()}`}
            subtitle={`${revenueLossPct}% of gross sales eroded by returns`}
          />
          <ResultCard
            variant="light"
            title="Monthly Returns Handled"
            value={`${totalUnitsReturned.toLocaleString()} units`}
            subtitle={`Based on ${returnRatePct}% return rate`}
          />
          <ResultCard
            variant="light"
            title="Annualized Erosion"
            value={`$${Math.round(totalMonthlyReturnLoss * 12).toLocaleString()}`}
            subtitle="Annual bottom-line EBITDA drain"
          />
        </div>
      </div>
    </div>
  );
};
