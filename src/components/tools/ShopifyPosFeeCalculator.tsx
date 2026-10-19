import React, { useState } from "react";
import { Store, CreditCard, DollarSign, Calculator } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ShopifyPosFeeCalculator: React.FC = () => {
  const [monthlyRetailSales, setMonthlyRetailSales] = useState<number>(35000);
  const [avgTicketSize, setAvgTicketSize] = useState<number>(55.00);
  const [planTier, setPlanTier] = useState<string>("shopify"); // basic 2.7%, shopify 2.5%, advanced 2.4%
  const [posProCount, setPosProCount] = useState<number>(1); // $89/mo per location

  const handleReset = () => {
    setMonthlyRetailSales(35000);
    setAvgTicketSize(55.00);
    setPlanTier("shopify");
    setPosProCount(1);
  };

  const planRates: Record<string, { name: string; rate: number }> = {
    basic: { name: "Basic Shopify", rate: 2.7 },
    shopify: { name: "Shopify Plan", rate: 2.5 },
    advanced: { name: "Advanced Shopify", rate: 2.4 }
  };

  const selectedPlan = planRates[planTier] || planRates["shopify"];
  const transactionCount = avgTicketSize > 0 ? monthlyRetailSales / avgTicketSize : 0;
  const processingFees = monthlyRetailSales * (selectedPlan.rate / 100);
  const posSoftwareFee = posProCount * 89;
  const totalMonthlyCost = processingFees + posSoftwareFee;
  const effectiveFeePercent = monthlyRetailSales > 0 ? (totalMonthlyCost / monthlyRetailSales) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Shopify POS In-Person Card Rate Solver"
        description="Calculate retail in-person card processing charges, POS Pro software subscriptions, and hardware terminal costs."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Shopify Account Plan</label>
          <select
            value={planTier}
            onChange={(e) => setPlanTier(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value="basic">Basic Shopify (2.7% In-Person Card Rate)</option>
            <option value="shopify">Shopify Plan (2.5% In-Person Card Rate)</option>
            <option value="advanced">Advanced Shopify (2.4% In-Person Card Rate)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Monthly Retail POS Sales ($)"
            value={monthlyRetailSales}
            onChange={(val) => setMonthlyRetailSales(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Average Ticket / Receipt ($)"
            value={avgTicketSize}
            onChange={(val) => setAvgTicketSize(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="POS Pro Locations ($89/location/mo)"
            value={posProCount}
            onChange={(val) => setPosProCount(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Total Monthly POS Cost"
          value={`$${totalMonthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${effectiveFeePercent.toFixed(2)}% effective`}
          variant="indigo"
        />
        <ResultCard
          title="Card Swipe Fees"
          value={`$${processingFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${selectedPlan.rate}% swipe fee`}
          variant="light"
        />
        <ResultCard
          title="POS Pro Software"
          value={`$${posSoftwareFee}/mo`}
          subtitle={`${posProCount} store location(s)`}
          variant="light"
        />
        <ResultCard
          title="Take-Home Net Sales"
          value={`$${(monthlyRetailSales - totalMonthlyCost).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Deposited in bank"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Plan Upgrade Optimization</h4>
        <p className="text-slate-600">
          Upgrading from Basic (2.7%) to Shopify Plan (2.5%) saves <strong className="text-slate-800">0.20%</strong> ($${(monthlyRetailSales * 0.002).toFixed(2)}/mo). On ${monthlyRetailSales.toLocaleString()} in retail volume, upgrading covers the higher base plan cost entirely through card rate savings.
        </p>
      </div>
    </div>
  );
};
