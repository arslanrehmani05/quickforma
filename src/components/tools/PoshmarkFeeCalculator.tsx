import React, { useState } from "react";
import { ShoppingBag, Tag, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PoshmarkFeeCalculator: React.FC = () => {
  const [salePrice, setSalePrice] = useState<number>(38.0);
  const [itemCost, setItemCost] = useState<number>(12.0);
  const [sellerShippingDiscount, setSellerShippingDiscount] = useState<number>(2.02); // Standard closet shipping discount offer

  // Poshmark Fee Schedule:
  // Under $15: Flat fee of $2.95
  // $15 and above: 20% commission fee
  const poshmarkFee = salePrice < 15 ? 2.95 : salePrice * 0.20;
  const netPayout = Math.max(0, salePrice - poshmarkFee - sellerShippingDiscount);
  const netProfit = netPayout - itemCost;
  const profitMarginPct = salePrice > 0 ? ((netProfit / salePrice) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Tag}
            title="Poshmark Seller Commission Fee & Net Profit Calculator"
            description="Calculate Poshmark's 20% commission (or $2.95 flat fee under $15), shipping discounts, and net take-home profit."
          />
          <ResetButton onReset={() => {
            setSalePrice(38.0); setItemCost(12.0); setSellerShippingDiscount(2.02);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Listing Sale Price ($)"
            type="number"
            step={0.5}
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Original Item Cost COGS ($)"
            type="number"
            step={0.5}
            value={itemCost}
            onChange={(e) => setItemCost(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Seller Shipping Discount ($)"
            type="number"
            step={0.01}
            value={sellerShippingDiscount}
            onChange={(e) => setSellerShippingDiscount(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Net Take-Home Profit"
            value={`$${netProfit.toFixed(2)}`}
            subtitle={`Net profit margin: ${profitMarginPct}%`}
          />
          <ResultCard
            variant="light"
            title="Poshmark Commission"
            value={`$${poshmarkFee.toFixed(2)}`}
            subtitle={salePrice < 15 ? "Flat $2.95 fee (<$15)" : "Standard 20% platform commission"}
          />
          <ResultCard
            variant="light"
            title="Poshmark Net Deposit"
            value={`$${netPayout.toFixed(2)}`}
            subtitle="Credited directly to Poshmark balance"
          />
        </div>
      </div>
    </div>
  );
};
