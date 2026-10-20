import React, { useState } from "react";
import { Building, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PropertyManagementFeeCalculator: React.FC = () => {
  const [monthlyRent, setMonthlyRent] = useState<number>(3200);
  const [managementFeePercent, setManagementFeePercent] = useState<number>(8.0); // 8% standard monthly
  const [tenantPlacementFee, setTenantPlacementFee] = useState<number>(1200); // Once per lease
  const [annualMaintenanceMarkup, setAnnualMaintenanceMarkup] = useState<number>(350); // 10% markup on repairs

  const handleReset = () => {
    setMonthlyRent(3200);
    setManagementFeePercent(8.0);
    setTenantPlacementFee(1200);
    setAnnualMaintenanceMarkup(350);
  };

  const grossAnnualRent = monthlyRent * 12;
  const monthlyManagementFee = monthlyRent * (managementFeePercent / 100);
  const annualOngoingManagementFees = monthlyManagementFee * 12;
  const totalAnnualManagementCosts = annualOngoingManagementFees + tenantPlacementFee + annualMaintenanceMarkup;
  const netAnnualPayoutToOwner = grossAnnualRent - totalAnnualManagementCosts;
  const effectiveFeePercent = grossAnnualRent > 0 ? (totalAnnualManagementCosts / grossAnnualRent) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Monthly Property Manager Fee & Net Payout"
        description="Compute residential and commercial property management fees, leasing commissions, and net rental disbursements."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Monthly Rent Collected ($)"
            value={monthlyRent}
            onChange={(val) => setMonthlyRent(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Ongoing Management Fee (%)"
            value={managementFeePercent}
            onChange={(val) => setManagementFeePercent(Math.min(25, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={25}
            step={0.5}
            suffix="%"
          />
          <InputField
            label="Tenant Placement / Leasing Fee ($/yr)"
            value={tenantPlacementFee}
            onChange={(val) => setTenantPlacementFee(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Maintenance Contractor Surcharges ($/yr)"
            value={annualMaintenanceMarkup}
            onChange={(val) => setAnnualMaintenanceMarkup(Math.max(0, Number(val) || 0))}
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
          title="Monthly Ongoing Fee"
          value={`$${monthlyManagementFee.toFixed(2)}/mo`}
          subtitle={`${managementFeePercent}% of collected rent`}
          variant="indigo"
        />
        <ResultCard
          title="Net Monthly Disbursement"
          value={`$${(monthlyRent - monthlyManagementFee).toFixed(2)}`}
          subtitle="Direct deposit to owner"
          variant="light"
        />
        <ResultCard
          title="Total Annual Manager Cost"
          value={`$${totalAnnualManagementCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${effectiveFeePercent.toFixed(1)}% effective take`}
          variant="light"
        />
        <ResultCard
          title="Net Annual Owner Payout"
          value={`$${netAnnualPayoutToOwner.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Net cash to property owner"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Property Management Cost Breakdown</h4>
        <p className="text-slate-600">
          While the base contract quotes {managementFeePercent}% ($${monthlyManagementFee.toFixed(2)}/mo), factoring in placement fees ($${tenantPlacementFee}) and repair coordination markups raises your true annual management burden to <strong className="text-slate-800">${totalAnnualManagementCosts.toLocaleString()} ({effectiveFeePercent.toFixed(1)}% of gross rent)</strong>.
        </p>
      </div>
    </div>
  );
};
