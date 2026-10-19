import React, { useState } from "react";
import { Tag, DollarSign, Calendar, ShoppingBag } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EtsyListingRenewalCalculator: React.FC = () => {
  const [activeListings, setActiveListings] = useState<number>(150);
  const [monthlySalesUnits, setMonthlySalesUnits] = useState<number>(85);
  const [monthlyGrossRevenue, setMonthlyGrossRevenue] = useState<number>(3800);

  const handleReset = () => {
    setActiveListings(150);
    setMonthlySalesUnits(85);
    setMonthlyGrossRevenue(3800);
  };

  // Etsy Listing fees:
  // $0.20 per listing for 4 months (or $0.05/month per active listing on average)
  // Plus $0.20 auto-renewal every time an item sells from a multi-quantity listing
  const listingExpirationFeeMonthly = (activeListings * 0.20) / 4;
  const autoRenewalSaleFeeMonthly = monthlySalesUnits * 0.20;
  const totalMonthlyListingFees = listingExpirationFeeMonthly + autoRenewalSaleFeeMonthly;
  const annualizedListingCost = totalMonthlyListingFees * 12;
  const listingFeePercentOfRevenue = monthlyGrossRevenue > 0 ? (totalMonthlyListingFees / monthlyGrossRevenue) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Etsy Listing Fee & Auto-Renewal Expense"
        description="Compute 4-month listing expirations, multi-quantity sales auto-renewals, and annual catalog overhead on Etsy."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Active Shop Listings"
            value={activeListings}
            onChange={(val) => setActiveListings(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Monthly Items Sold (Auto-Renewals)"
            value={monthlySalesUnits}
            onChange={(val) => setMonthlySalesUnits(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Estimated Monthly Gross Sales ($)"
            value={monthlyGrossRevenue}
            onChange={(val) => setMonthlyGrossRevenue(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Monthly Listing Fees"
          value={`$${totalMonthlyListingFees.toFixed(2)}`}
          subtitle="Fixed catalog cost"
          variant="indigo"
        />
        <ResultCard
          title="Annualized Listing Fees"
          value={`$${annualizedListingCost.toFixed(2)}`}
          subtitle="12-month overhead"
          variant="light"
        />
        <ResultCard
          title="Fee % of Revenue"
          value={`${listingFeePercentOfRevenue.toFixed(2)}%`}
          subtitle="Catalog cost burden"
          variant="light"
        />
        <ResultCard
          title="Sales Auto-Renewals"
          value={`$${autoRenewalSaleFeeMonthly.toFixed(2)}`}
          subtitle={`${monthlySalesUnits} sales x $0.20`}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Etsy Fee Optimization</h4>
        <p className="text-slate-600">
          Etsy charges $0.20 when creating/renewing every 4 months ($${listingExpirationFeeMonthly.toFixed(2)}/mo) plus an additional $0.20 each time a quantity item sells ($${autoRenewalSaleFeeMonthly.toFixed(2)}/mo). Retiring non-performing listings with 0 views saves $0.60 per item annually.
        </p>
      </div>
    </div>
  );
};
