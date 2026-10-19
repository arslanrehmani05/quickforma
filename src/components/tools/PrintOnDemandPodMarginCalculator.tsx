import React, { useState } from "react";
import { Shirt, DollarSign, Percent, ShoppingBag } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PrintOnDemandPodMarginCalculator: React.FC = () => {
  const [sellingPrice, setSellingPrice] = useState<number>(29.99);
  const [shippingCharged, setShippingCharged] = useState<number>(4.99);
  const [podBaseCost, setPodBaseCost] = useState<number>(13.50); // Blank item + printing
  const [podShippingCost, setPodShippingCost] = useState<number>(4.99);
  const [platformFeePercent, setPlatformFeePercent] = useState<number>(9.5); // e.g. Etsy + Payment

  const handleReset = () => {
    setSellingPrice(29.99);
    setShippingCharged(4.99);
    setPodBaseCost(13.50);
    setPodShippingCost(4.99);
    setPlatformFeePercent(9.5);
  };

  const totalRevenue = sellingPrice + shippingCharged;
  const platformFees = totalRevenue * (platformFeePercent / 100);
  const totalPodCosts = podBaseCost + podShippingCost;
  const netProfit = totalRevenue - totalPodCosts - platformFees;
  const netMarginPercent = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  const returnOnCost = totalPodCosts > 0 ? (netProfit / totalPodCosts) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Printify / Printful Merch Profit Margin Solver"
        description="Calculate Print-on-Demand (POD) net profit per sale, marketplace fees, blank costs, and breakeven pricing."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Retail Sale Price ($)"
            value={sellingPrice}
            onChange={(val) => setSellingPrice(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Shipping Charged to Buyer ($)"
            value={shippingCharged}
            onChange={(val) => setShippingCharged(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="POD Item Base Cost ($)"
            value={podBaseCost}
            onChange={(val) => setPodBaseCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="POD Fulfillment Shipping Cost ($)"
            value={podShippingCost}
            onChange={(val) => setPodShippingCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Etsy / Shopify Platform & Gateway Fee (%)"
            value={platformFeePercent}
            onChange={(val) => setPlatformFeePercent(Math.min(50, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={50}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Profit / Sale"
          value={`$${netProfit.toFixed(2)}`}
          subtitle="Cash take-home"
          variant="indigo"
        />
        <ResultCard
          title="Net Profit Margin"
          value={`${netMarginPercent.toFixed(1)}%`}
          subtitle="Of total order value"
          variant="light"
        />
        <ResultCard
          title="Platform Deductions"
          value={`-$${platformFees.toFixed(2)}`}
          subtitle={`${platformFeePercent}% fees`}
          variant="light"
        />
        <ResultCard
          title="Return on POD Cost"
          value={`${returnOnCost.toFixed(0)}%`}
          subtitle="ROI on base cost"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Merchandise Economics</h4>
        <p className="text-slate-600">
          On an order total of <strong className="text-slate-800">${totalRevenue.toFixed(2)}</strong>, your production costs absorb <strong className="text-slate-800">${totalPodCosts.toFixed(2)}</strong> and platform fees deduct <strong className="text-slate-800">${platformFees.toFixed(2)}</strong>, leaving <strong className="text-slate-800">${netProfit.toFixed(2)}</strong> in clean profit without holding any physical inventory.
        </p>
      </div>
    </div>
  );
};
