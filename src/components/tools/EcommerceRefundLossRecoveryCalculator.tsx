import React, { useState } from "react";
import { RotateCcw, DollarSign, RefreshCw, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EcommerceRefundLossRecoveryCalculator: React.FC = () => {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(2400);
  const [returnRatePercent, setReturnRatePercent] = useState<number>(14);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(85.00);
  const [returnShippingAndLabor, setReturnShippingAndLabor] = useState<number>(12.00);
  const [secondaryRecoveryPercent, setSecondaryRecoveryPercent] = useState<number>(45); // Outlet / Open-box resale %

  const handleReset = () => {
    setMonthlyOrders(2400);
    setReturnRatePercent(14);
    setAverageOrderValue(85.00);
    setReturnShippingAndLabor(12.00);
    setSecondaryRecoveryPercent(45);
  };

  const returnedUnits = monthlyOrders * (returnRatePercent / 100);
  const grossRefundRevenueLost = returnedUnits * averageOrderValue;
  const reverseLogisticsCost = returnedUnits * returnShippingAndLabor;
  const secondaryMarketCashRecovered = returnedUnits * averageOrderValue * (secondaryRecoveryPercent / 100);
  const netReturnLoss = (grossRefundRevenueLost + reverseLogisticsCost) - secondaryMarketCashRecovered;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Return Logistics & Restocking Net Recovery"
        description="Compute secondary market liquidations, open-box recoveries, and net reverse logistics deficits from customer returns."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Monthly Total Orders"
            value={monthlyOrders}
            onChange={(val) => setMonthlyOrders(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Customer Return Rate (%)"
            value={returnRatePercent}
            onChange={(val) => setReturnRatePercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Average Order Value ($)"
            value={averageOrderValue}
            onChange={(val) => setAverageOrderValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Reverse Shipping & Labor ($/return)"
            value={returnShippingAndLabor}
            onChange={(val) => setReturnShippingAndLabor(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Secondary / Refurbished Resale Rate (%)"
            value={secondaryRecoveryPercent}
            onChange={(val) => setSecondaryRecoveryPercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Monthly Return Loss"
          value={`$${netReturnLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="After liquidation recovery"
          variant="indigo"
        />
        <ResultCard
          title="Recovered Liquid Cash"
          value={`+$${secondaryMarketCashRecovered.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="From open-box resale"
          variant="light"
        />
        <ResultCard
          title="Reverse Logistics Expense"
          value={`-$${reverseLogisticsCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Shipping + restocking fees"
          variant="light"
        />
        <ResultCard
          title="Monthly Returned Units"
          value={`${Math.round(returnedUnits)} items`}
          subtitle={`${returnRatePercent}% return rate`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Reverse Logistics Optimization</h4>
        <p className="text-slate-600">
          Secondary market resale recoups <strong className="text-slate-800">${secondaryMarketCashRecovered.toLocaleString()}</strong> every month, offsetting <strong className="text-slate-800">{((secondaryMarketCashRecovered / (grossRefundRevenueLost || 1)) * 100).toFixed(0)}%</strong> of gross refund value. Reducing return rate from {returnRatePercent}% to {(returnRatePercent - 2).toFixed(0)}% would preserve an additional <strong className="text-slate-800">${(monthlyOrders * 0.02 * (averageOrderValue + returnShippingAndLabor)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> monthly.
        </p>
      </div>
    </div>
  );
};
