import React, { useState } from "react";
import { RotateCcw, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ReStockingFeeCalculator: React.FC = () => {
  const [itemPrice, setItemPrice] = useState<number>(180.00);
  const [restockingFeePercent, setRestockingFeePercent] = useState<number>(15);
  const [returnShippingCost, setReturnShippingCost] = useState<number>(12.50);
  const [inspectionLaborCost, setInspectionLaborCost] = useState<number>(7.50);
  const [customerPaidReturnShipping, setCustomerPaidReturnShipping] = useState<boolean>(false);

  const handleReset = () => {
    setItemPrice(180.00);
    setRestockingFeePercent(15);
    setReturnShippingCost(12.50);
    setInspectionLaborCost(7.50);
    setCustomerPaidReturnShipping(false);
  };

  const restockingFeeAmount = itemPrice * (restockingFeePercent / 100);
  const customerRefundAmount = Math.max(0, itemPrice - restockingFeeAmount);
  const merchantHandlingExpense = inspectionLaborCost + (customerPaidReturnShipping ? 0 : returnShippingCost);
  const netMerchantRecovery = restockingFeeAmount - merchantHandlingExpense;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Customer Refund Restocking Fee & Net Loss"
        description="Compute ecommerce return restocking fees, net customer refunds, and merchant reverse logistics cost recovery."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
          <input
            type="checkbox"
            id="shippingPaid"
            checked={customerPaidReturnShipping}
            onChange={(e) => setCustomerPaidReturnShipping(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded"
          />
          <label htmlFor="shippingPaid" className="text-xs font-semibold text-slate-800 cursor-pointer">
            Customer pays return shipping label (Merchant incurs $0 return shipping)
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Original Item Retail Price ($)"
            value={itemPrice}
            onChange={(val) => setItemPrice(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            prefix="$"
          />
          <InputField
            label="Restocking Fee Policy (%)"
            value={restockingFeePercent}
            onChange={(val) => setRestockingFeePercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Return Shipping Label Cost ($)"
            value={returnShippingCost}
            onChange={(val) => setReturnShippingCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Inspection, Testing & Repackaging Labor ($)"
            value={inspectionLaborCost}
            onChange={(val) => setInspectionLaborCost(Math.max(0, Number(val) || 0))}
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
          title="Customer Net Refund"
          value={`$${customerRefundAmount.toFixed(2)}`}
          subtitle="Issued back to card"
          variant="indigo"
        />
        <ResultCard
          title="Restocking Fee Retained"
          value={`$${restockingFeeAmount.toFixed(2)}`}
          subtitle={`${restockingFeePercent}% policy deduction`}
          variant="light"
        />
        <ResultCard
          title="Reverse Logistics Cost"
          value={`-$${merchantHandlingExpense.toFixed(2)}`}
          subtitle="Shipping + inspection"
          variant="light"
        />
        <ResultCard
          title="Net Merchant Recovery"
          value={`${netMerchantRecovery >= 0 ? "+" : ""}$${netMerchantRecovery.toFixed(2)}`}
          subtitle={netMerchantRecovery >= 0 ? "Cost fully covered" : "Unrecovered processing loss"}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Return Policy Impact</h4>
        <p className="text-slate-600">
          Deducting a {restockingFeePercent}% restocking fee ($${restockingFeeAmount.toFixed(2)}) allows your business to offset <strong className="text-slate-800">${merchantHandlingExpense.toFixed(2)}</strong> in actual reverse logistics expenses, leaving a net outcome of <strong className="text-slate-800">${netMerchantRecovery.toFixed(2)}</strong> while returning <strong className="text-slate-800">${customerRefundAmount.toFixed(2)}</strong> to the customer.
        </p>
      </div>
    </div>
  );
};
