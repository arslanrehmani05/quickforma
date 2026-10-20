import React, { useState } from "react";
import { Repeat, DollarSign, TrendingDown, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SubscriptionCostAnalyzer: React.FC = () => {
  const [streamingEntertainmentMonthly, setStreamingEntertainmentMonthly] = useState<number>(68);
  const [softwareSaaSCloudMonthly, setSoftwareSaaSCloudMonthly] = useState<number>(145);
  const [fitnessGymMonthly, setFitnessGymMonthly] = useState<number>(85);
  const [miscellaneousServicesMonthly, setMiscellaneousServicesMonthly] = useState<number>(55);

  const handleReset = () => {
    setStreamingEntertainmentMonthly(68);
    setSoftwareSaaSCloudMonthly(145);
    setFitnessGymMonthly(85);
    setMiscellaneousServicesMonthly(55);
  };

  const totalMonthlySubscriptions = streamingEntertainmentMonthly + softwareSaaSCloudMonthly + fitnessGymMonthly + miscellaneousServicesMonthly;
  const totalAnnualSubscriptionCost = totalMonthlySubscriptions * 12;
  // 10-year opportunity cost if invested at 7% compound interest
  const tenYearInvestedOpportunityCost = (totalMonthlySubscriptions * 12) * ((Math.pow(1.07, 10) - 1) / 0.07);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Monthly Recurring Subscription & SaaS Waste Tracker"
        description="Audit recurring monthly memberships, cloud software subscriptions, and calculate 10-year investment opportunity costs."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Streaming / Media ($/mo)"
            value={streamingEntertainmentMonthly}
            onChange={(val) => setStreamingEntertainmentMonthly(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Software & SaaS ($/mo)"
            value={softwareSaaSCloudMonthly}
            onChange={(val) => setSoftwareSaaSCloudMonthly(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Gym & Fitness ($/mo)"
            value={fitnessGymMonthly}
            onChange={(val) => setFitnessGymMonthly(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Other Subscriptions ($/mo)"
            value={miscellaneousServicesMonthly}
            onChange={(val) => setMiscellaneousServicesMonthly(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Monthly Recurring Drain"
            value={`$${totalMonthlySubscriptions.toFixed(2)}/mo`}
            subtitle="Monthly automated outflow"
            variant="light"
          />
          <ResultCard
            title="Annual Cost"
            value={`$${totalAnnualSubscriptionCost.toLocaleString()}/yr`}
            subtitle="Annual automated subscription fees"
            variant="light"
          />
          <ResultCard
            title="10-Year Opportunity Cost"
            value={`$${tenYearInvestedOpportunityCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="If invested in S&P 500 at 7% return"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
