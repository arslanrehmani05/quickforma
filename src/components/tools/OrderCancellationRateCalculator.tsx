import React, { useState } from "react";
import { XCircle, AlertTriangle, ShieldCheck, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const OrderCancellationRateCalculator: React.FC = () => {
  const [totalOrdersPlaced, setTotalOrdersPlaced] = useState<number>(4500);
  const [sellerCancelled, setSellerCancelled] = useState<number>(48); // Out of stock / pricing error
  const [buyerCancelled, setBuyerCancelled] = useState<number>(95); // Buyer changed mind
  const [avgOrderValue, setAvgOrderValue] = useState<number>(68.00);

  const handleReset = () => {
    setTotalOrdersPlaced(4500);
    setSellerCancelled(48);
    setBuyerCancelled(95);
    setAvgOrderValue(68.00);
  };

  const sellerCancellationRate = totalOrdersPlaced > 0 ? (sellerCancelled / totalOrdersPlaced) * 100 : 0;
  const totalCancellationRate = totalOrdersPlaced > 0 ? ((sellerCancelled + buyerCancelled) / totalOrdersPlaced) * 100 : 0;
  const lostGrossRevenue = (sellerCancelled + buyerCancelled) * avgOrderValue;
  // Non-refundable payment processor fixed fees: Stripe/Shopify keeps fixed ~0.30 per cancelled card authorization
  const nonRefundableFeesWasted = (sellerCancelled + buyerCancelled) * 0.30;

  // Amazon Pre-Fulfillment Cancellation Rate threshold is 2.5% strictly on seller-fault cancellations
  const isAmazonCompliant = sellerCancellationRate < 2.5;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Order Defect Rate & Cancellation Risk Solver"
        description="Calculate pre-fulfillment order cancellation rates against Amazon / Walmart seller performance SLAs."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Total Orders Received"
            value={totalOrdersPlaced}
            onChange={(val) => setTotalOrdersPlaced(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
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
            label="Seller-Initiated Cancellations (Out-of-Stock)"
            value={sellerCancelled}
            onChange={(val) => setSellerCancelled(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Buyer-Requested Cancellations"
            value={buyerCancelled}
            onChange={(val) => setBuyerCancelled(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Seller Cancel Rate"
          value={`${sellerCancellationRate.toFixed(2)}%`}
          subtitle="Amazon threshold: < 2.50%"
          variant="indigo"
        />
        <ResultCard
          title="Account Health SLA"
          value={isAmazonCompliant ? "COMPLIANT" : "SUSPENSION RISK"}
          subtitle={isAmazonCompliant ? "Below 2.5% policy limit" : "Exceeds Amazon 2.5% max"}
          variant="light"
        />
        <ResultCard
          title="Lost Gross Revenue"
          value={`$${lostGrossRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${sellerCancelled + buyerCancelled} cancelled sales`}
          variant="light"
        />
        <ResultCard
          title="Processor Fees Lost"
          value={`-$${nonRefundableFeesWasted.toFixed(2)}`}
          subtitle="Unreturned card swipe fees"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Marketplace Risk Assessment</h4>
        <p className="text-slate-600">
          Your seller-fault cancellation rate is <strong className="text-slate-800">{sellerCancellationRate.toFixed(2)}%</strong>. {isAmazonCompliant ? "Your metrics are healthy and protect buy-box eligibility." : "Warning: Seller cancellations exceed 2.5%, putting your account under pre-fulfillment cancellation review."}
        </p>
      </div>
    </div>
  );
};
