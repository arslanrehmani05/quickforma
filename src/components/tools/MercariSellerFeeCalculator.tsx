import React, { useState } from "react";
import { ShoppingBag, DollarSign, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MercariSellerFeeCalculator: React.FC = () => {
  const [salePrice, setSalePrice] = useState<number>(45.0);
  const [itemCost, setItemCost] = useState<number>(18.0);
  const [shippingPaidBySeller, setShippingPaidBySeller] = useState<number>(4.99);
  const [directDepositFee, setDirectDepositFee] = useState<number>(2.0); // $2 ACH withdrawal fee

  // Mercari eliminated traditional 10% selling fees in 2024, but charges $2 cash-out fees
  const grossProceeds = Math.max(0, salePrice - shippingPaidBySeller);
  const netEarnings = Math.max(0, grossProceeds - directDepositFee - itemCost);
  const netMarginPct = salePrice > 0 ? ((netEarnings / salePrice) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShoppingBag}
            title="Mercari Marketplace Seller Fee & Payout Solver"
            description="Calculate net payout, seller shipping label deductions, and bank direct deposit fees on Mercari."
          />
          <ResetButton onReset={() => {
            setSalePrice(45.0); setItemCost(18.0); setShippingPaidBySeller(4.99); setDirectDepositFee(2.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Listing Sale Price ($)"
            type="number"
            step={0.5}
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Item Inventory Cost ($)"
            type="number"
            step={0.5}
            value={itemCost}
            onChange={(e) => setItemCost(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Seller Shipping Prepaid ($)"
            type="number"
            step={0.1}
            value={shippingPaidBySeller}
            onChange={(e) => setShippingPaidBySeller(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="ACH Direct Deposit Fee ($)"
            type="number"
            step={0.5}
            value={directDepositFee}
            onChange={(e) => setDirectDepositFee(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Net Take-Home Profit"
            value={`$${netEarnings.toFixed(2)}`}
            subtitle={`Net margin: ${netMarginPct}%`}
          />
          <ResultCard
            variant="light"
            title="Mercari Payout Balance"
            value={`$${(grossProceeds - directDepositFee).toFixed(2)}`}
            subtitle="Before subtracting original product cost"
          />
          <ResultCard
            variant="light"
            title="Total Selling Overhead"
            value={`$${(shippingPaidBySeller + directDepositFee).toFixed(2)}`}
            subtitle="Prepaid shipping + bank transfer"
          />
        </div>
      </div>
    </div>
  );
};
