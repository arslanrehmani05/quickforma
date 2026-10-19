import React, { useState } from "react";
import { ShoppingBag, CreditCard, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const KlarnaAfterpayFeeCalculator: React.FC = () => {
  const [provider, setProvider] = useState<string>("klarna");
  const [orderValue, setOrderValue] = useState<number>(140);
  const [monthlyVolume, setMonthlyVolume] = useState<number>(25000);
  const [productCost, setProductCost] = useState<number>(45);

  const handleReset = () => {
    setProvider("klarna");
    setOrderValue(140);
    setMonthlyVolume(25000);
    setProductCost(45);
  };

  // Standard rates: Klarna 5.99% + $0.30, Afterpay 6.0% + $0.30, Affirm 5.99%, Sezzle 6.0% + $0.30
  const providerRates: Record<string, { name: string; pct: number; fixed: number }> = {
    klarna: { name: "Klarna Merchant Fee", pct: 5.99, fixed: 0.30 },
    afterpay: { name: "Afterpay Merchant Fee", pct: 6.00, fixed: 0.30 },
    affirm: { name: "Affirm Merchant Fee", pct: 5.99, fixed: 0.00 },
    sezzle: { name: "Sezzle Merchant Fee", pct: 6.00, fixed: 0.30 }
  };

  const selected = providerRates[provider] || providerRates["klarna"];
  const feePerOrder = (orderValue * (selected.pct / 100)) + selected.fixed;
  const netPayout = Math.max(0, orderValue - feePerOrder);
  const effectiveFeePercent = orderValue > 0 ? (feePerOrder / orderValue) * 100 : 0;
  const netProfitPerOrder = netPayout - productCost;
  const netMarginPercent = orderValue > 0 ? (netProfitPerOrder / orderValue) * 100 : 0;

  const estimatedMonthlyOrders = orderValue > 0 ? monthlyVolume / orderValue : 0;
  const totalMonthlyFees = estimatedMonthlyOrders * feePerOrder;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Buy Now Pay Later (BNPL) Merchant Fee Solver"
        description="Compute exact transaction fees, effective processing rates, and net margins across Klarna, Afterpay, and Affirm."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">BNPL Provider</label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value="klarna">Klarna (5.99% + $0.30)</option>
            <option value="afterpay">Afterpay (6.00% + $0.30)</option>
            <option value="affirm">Affirm (5.99% flat)</option>
            <option value="sezzle">Sezzle (6.00% + $0.30)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Average Order Value ($)"
            value={orderValue}
            onChange={(val) => setOrderValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Product Cost / COGS ($)"
            value={productCost}
            onChange={(val) => setProductCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Estimated Monthly BNPL Volume ($)"
            value={monthlyVolume}
            onChange={(val) => setMonthlyVolume(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Fee Per Order"
          value={`$${feePerOrder.toFixed(2)}`}
          subtitle={`${effectiveFeePercent.toFixed(2)}% effective`}
          variant="indigo"
        />
        <ResultCard
          title="Net Payout Received"
          value={`$${netPayout.toFixed(2)}`}
          subtitle="Deposit into bank"
          variant="light"
        />
        <ResultCard
          title="Net Profit Per Unit"
          value={`$${netProfitPerOrder.toFixed(2)}`}
          subtitle={`${netMarginPercent.toFixed(1)}% margin`}
          variant="light"
        />
        <ResultCard
          title="Monthly Total Fees"
          value={`$${totalMonthlyFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${Math.round(estimatedMonthlyOrders)} orders/mo`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">BNPL Conversion Economics</h4>
        <p className="text-slate-600">
          BNPL providers take ~6% compared to standard credit card processing (~2.9% + $0.30). However, industry studies show BNPL increases Average Order Value (AOV) by 20–45% and cart conversion by 15–25%, making the higher fee profitable if incremental sales offset the ~3% fee spread.
        </p>
      </div>
    </div>
  );
};
