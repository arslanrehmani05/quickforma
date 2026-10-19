import React, { useState } from "react";
import { AlertCircle, CreditCard, ShieldX, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ChargebackFeeLossCalculator: React.FC = () => {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(3500);
  const [monthlyChargebacks, setMonthlyChargebacks] = useState<number>(24);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(75);
  const [bankFeePerDispute, setBankFeePerDispute] = useState<number>(20);
  const [cogsPercentage, setCogsPercentage] = useState<number>(40);

  const handleReset = () => {
    setMonthlyOrders(3500);
    setMonthlyChargebacks(24);
    setAvgOrderValue(75);
    setBankFeePerDispute(20);
    setCogsPercentage(40);
  };

  const chargebackRatio = monthlyOrders > 0 ? (monthlyChargebacks / monthlyOrders) * 100 : 0;
  const directBankFees = monthlyChargebacks * bankFeePerDispute;
  const lostProductCost = monthlyChargebacks * avgOrderValue * (cogsPercentage / 100);
  const lostRevenue = monthlyChargebacks * avgOrderValue;
  const totalFinancialLoss = directBankFees + lostProductCost + (lostRevenue - lostProductCost);
  const annualizedLoss = totalFinancialLoss * 12;

  let riskTier = "Low / Standard (< 0.65%)";
  let riskColor = "text-emerald-700";
  if (chargebackRatio >= 0.9) {
    riskTier = "EXCESSIVE / VISA MONITORING RISK (> 0.9%)";
    riskColor = "text-rose-700";
  } else if (chargebackRatio >= 0.65) {
    riskTier = "Warning Threshold (0.65% – 0.9%)";
    riskColor = "text-amber-700";
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Merchant Chargeback Ratio & Fine Risk Solver"
        description="Determine your Visa / Mastercard dispute ratio, merchant account risk status, and total chargeback leakage."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Monthly Completed Orders"
            value={monthlyOrders}
            onChange={(val) => setMonthlyOrders(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Monthly Chargebacks Received"
            value={monthlyChargebacks}
            onChange={(val) => setMonthlyChargebacks(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Average Order Value ($)"
            value={avgOrderValue}
            onChange={(val) => setAvgOrderValue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Processor Dispute Fee ($)"
            value={bankFeePerDispute}
            onChange={(val) => setBankFeePerDispute(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Product Cost of Goods (COGS %)"
            value={cogsPercentage}
            onChange={(val) => setCogsPercentage(Math.min(100, Math.max(0, Number(val) || 0)))}
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
          title="Chargeback Ratio"
          value={`${chargebackRatio.toFixed(2)}%`}
          subtitle="Disputes / Total Sales"
          variant="indigo"
        />
        <ResultCard
          title="Monthly Total Loss"
          value={`$${totalFinancialLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`$${directBankFees} in bank fees`}
          variant="light"
        />
        <ResultCard
          title="Annualized Loss"
          value={`$${annualizedLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Projected 12 months"
          variant="light"
        />
        <ResultCard
          title="Threshold Level"
          value={chargebackRatio < 0.9 ? "SAFE" : "HIGH RISK"}
          subtitle="Visa/Mastercard 0.90% cap"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Card Network Compliance Status</h4>
        <p className="text-slate-600">
          Your current chargeback ratio is <strong className="text-slate-800">{chargebackRatio.toFixed(2)}%</strong>. Status: <strong className={riskColor}>{riskTier}</strong>. Visa VROL and Mastercard ECP program thresholds penalize merchants who exceed 0.90% (or 100 monthly disputes) with fines of $50–$100 per additional dispute and potential merchant account termination.
        </p>
      </div>
    </div>
  );
};
