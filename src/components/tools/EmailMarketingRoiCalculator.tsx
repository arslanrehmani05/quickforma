import React, { useState } from "react";
import { Mail, DollarSign, TrendingUp, Users } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EmailMarketingRoiCalculator: React.FC = () => {
  const [campaignRevenue, setCampaignRevenue] = useState<number>(14500);
  const [totalEspSoftwareAndCopyCost, setTotalEspSoftwareAndCopyCost] = useState<number>(850);
  const [totalSubscribersSent, setTotalSubscribersSent] = useState<number>(35000);
  const [clicksGenerated, setClicksGenerated] = useState<number>(1400);

  const handleReset = () => {
    setCampaignRevenue(14500);
    setTotalEspSoftwareAndCopyCost(850);
    setTotalSubscribersSent(35000);
    setClicksGenerated(1400);
  };

  const netEmailProfit = campaignRevenue - totalEspSoftwareAndCopyCost;
  const emailRoiPercent = totalEspSoftwareAndCopyCost > 0 ? (netEmailProfit / totalEspSoftwareAndCopyCost) * 100 : 0;
  const revenuePerSubscriber = totalSubscribersSent > 0 ? campaignRevenue / totalSubscribersSent : 0;
  const revenuePerClick = clicksGenerated > 0 ? campaignRevenue / clicksGenerated : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Email Campaign Revenue & Subscriber LTV Solver"
        description="Compute email newsletter marketing ROI, revenue per recipient, and click monetization rates."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Gross Campaign Sales Revenue ($)"
            value={campaignRevenue}
            onChange={(val) => setCampaignRevenue(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Total Campaign Cost (ESP + Copy $)"
            value={totalEspSoftwareAndCopyCost}
            onChange={(val) => setTotalEspSoftwareAndCopyCost(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Total Subscribers Sent"
            value={totalSubscribersSent}
            onChange={(val) => setTotalSubscribersSent(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Total Clicks Generated"
            value={clicksGenerated}
            onChange={(val) => setClicksGenerated(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Email Campaign ROI"
          value={`${emailRoiPercent.toFixed(0)}%`}
          subtitle={`$${(campaignRevenue / (totalEspSoftwareAndCopyCost || 1)).toFixed(1)}x return`}
          variant="indigo"
        />
        <ResultCard
          title="Net Campaign Profit"
          value={`$${netEmailProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="After software & labor"
          variant="light"
        />
        <ResultCard
          title="Revenue / Email Sent"
          value={`$${revenuePerSubscriber.toFixed(2)}`}
          subtitle="Per subscriber in list"
          variant="light"
        />
        <ResultCard
          title="Revenue / Click"
          value={`$${revenuePerClick.toFixed(2)}`}
          subtitle="Per interested clicker"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Email Marketing Benchmark</h4>
        <p className="text-slate-600">
          Generating <strong className="text-slate-800">${(campaignRevenue / (totalEspSoftwareAndCopyCost || 1)).toFixed(1)} for every $1.00 spent</strong> aligns with the direct marketing industry standard of 36:1 to 42:1 email ROI, monetizing each subscriber at <strong className="text-slate-800">${revenuePerSubscriber.toFixed(2)} per send</strong>.
        </p>
      </div>
    </div>
  );
};
