import React, { useState } from "react";
import { ShieldAlert, DollarSign, Tag, CheckCircle2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MinimumAdvertisedPriceMapCalculator: React.FC = () => {
  const [msrp, setMsrp] = useState<number>(199.99);
  const [wholesaleCost, setWholesaleCost] = useState<number>(95.00);
  const [mapDiscountPercent, setMapDiscountPercent] = useState<number>(15);
  const [currentListedPrice, setCurrentListedPrice] = useState<number>(165.00);

  const handleReset = () => {
    setMsrp(199.99);
    setWholesaleCost(95.00);
    setMapDiscountPercent(15);
    setCurrentListedPrice(165.00);
  };

  const minimumAdvertisedPrice = msrp * (1 - mapDiscountPercent / 100);
  const isCompliant = currentListedPrice >= minimumAdvertisedPrice - 0.009;
  const violationAmount = isCompliant ? 0 : minimumAdvertisedPrice - currentListedPrice;
  const resellerMarginAtMap = minimumAdvertisedPrice > 0 ? ((minimumAdvertisedPrice - wholesaleCost) / minimumAdvertisedPrice) * 100 : 0;
  const currentMargin = currentListedPrice > 0 ? ((currentListedPrice - wholesaleCost) / currentListedPrice) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="MAP Pricing & Authorized Reseller Margin"
        description="Enforce Minimum Advertised Price (MAP) policies, monitor reseller compliance, and calculate retail profit margins."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Manufacturer Suggested Retail (MSRP) ($)"
            value={msrp}
            onChange={(val) => setMsrp(Math.max(0.01, Number(val) || 0))}
            type="number"
            min={0.01}
            prefix="$"
          />
          <InputField
            label="Wholesale Dealer Cost ($)"
            value={wholesaleCost}
            onChange={(val) => setWholesaleCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Max Allowed MAP Discount from MSRP (%)"
            value={mapDiscountPercent}
            onChange={(val) => setMapDiscountPercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Current Reseller Listed Price ($)"
            value={currentListedPrice}
            onChange={(val) => setCurrentListedPrice(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Floor MAP Price"
          value={`$${minimumAdvertisedPrice.toFixed(2)}`}
          subtitle={`${mapDiscountPercent}% below MSRP`}
          variant="indigo"
        />
        <ResultCard
          title="Policy Status"
          value={isCompliant ? "COMPLIANT" : "VIOLATION"}
          subtitle={isCompliant ? "Meets brand policy" : `$${violationAmount.toFixed(2)} undercut`}
          variant="light"
        />
        <ResultCard
          title="Margin at MAP Floor"
          value={`${resellerMarginAtMap.toFixed(1)}%`}
          subtitle={`$${(minimumAdvertisedPrice - wholesaleCost).toFixed(2)} profit/unit`}
          variant="light"
        />
        <ResultCard
          title="Current Listed Margin"
          value={`${currentMargin.toFixed(1)}%`}
          subtitle={`$${(currentListedPrice - wholesaleCost).toFixed(2)} profit/unit`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Brand Governance Insight</h4>
        <p className="text-slate-600">
          {isCompliant
            ? `The reseller's listing of $${currentListedPrice.toFixed(2)} respects your brand floor policy of $${minimumAdvertisedPrice.toFixed(2)} and protects wholesale distribution integrity.`
            : `Warning: This listing undercuts your minimum floor by $${violationAmount.toFixed(2)} (${((violationAmount / minimumAdvertisedPrice) * 100).toFixed(1)}%). Issue a standard MAP enforcement notice or restrict buy-box inventory replenishment.`}
        </p>
      </div>
    </div>
  );
};
