import React, { useState } from "react";
import { Target, DollarSign, Award, Users } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EventSponsorshipRoiCalculator: React.FC = () => {
  const [sponsorshipFee, setSponsorshipFee] = useState<number>(15000);
  const [boothTravelTravelCost, setBoothTravelCost] = useState<number>(8500);
  const [badgeScansCollected, setBadgeScansCollected] = useState<number>(220);
  const [qualifiedOpportunityRate, setQualifiedOpportunityRate] = useState<number>(20); // 20%
  const [averageDealMargin, setAverageDealMargin] = useState<number>(12000);
  const [dealCloseRate, setDealCloseRate] = useState<number>(25); // 25%

  const handleReset = () => {
    setSponsorshipFee(15000);
    setBoothTravelCost(8500);
    setBadgeScansCollected(220);
    setQualifiedOpportunityRate(20);
    setAverageDealMargin(12000);
    setDealCloseRate(25);
  };

  const totalEventCost = sponsorshipFee + boothTravelTravelCost;
  const qualifiedLeads = badgeScansCollected * (qualifiedOpportunityRate / 100);
  const closedDeals = qualifiedLeads * (dealCloseRate / 100);
  const grossMarginGenerated = closedDeals * averageDealMargin;
  const netProfit = grossMarginGenerated - totalEventCost;
  const eventRoi = totalEventCost > 0 ? (netProfit / totalEventCost) * 100 : 0;
  const costPerQualifiedLead = qualifiedLeads > 0 ? totalEventCost / qualifiedLeads : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Trade Show & Event Sponsorship ROI Solver"
        description="Quantify commercial conference presence, booth buildout costs, lead scans, and sales pipeline return."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Sponsorship / Space Fee ($)"
            value={sponsorshipFee}
            onChange={(val) => setSponsorshipFee(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Booth, Collateral & Travel ($)"
            value={boothTravelTravelCost}
            onChange={(val) => setBoothTravelCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Badge Scans / Business Cards"
            value={badgeScansCollected}
            onChange={(val) => setBadgeScansCollected(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Opportunity Qualification Rate (%)"
            value={qualifiedOpportunityRate}
            onChange={(val) => setQualifiedOpportunityRate(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Qualified Opportunity Win Rate (%)"
            value={dealCloseRate}
            onChange={(val) => setDealCloseRate(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
          <InputField
            label="Average Deal Gross Margin ($)"
            value={averageDealMargin}
            onChange={(val) => setAverageDealMargin(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Total Event Outlay"
            value={`$${totalEventCost.toLocaleString()}`}
            subtitle="Fees, travel, and logistics"
            variant="light"
          />
          <ResultCard
            title="Cost per SQL"
            value={`$${costPerQualifiedLead.toFixed(0)}`}
            subtitle={`${qualifiedLeads.toFixed(0)} qualified opportunities`}
            variant="light"
          />
          <ResultCard
            title="Closed Deals Margin"
            value={`$${grossMarginGenerated.toLocaleString()}`}
            subtitle={`${closedDeals.toFixed(1)} closed customer accounts`}
            variant="indigo"
          />
          <ResultCard
            title="Event Sponsorship ROI"
            value={`${eventRoi.toFixed(1)}%`}
            subtitle={`Net outcome: $${netProfit.toLocaleString()}`}
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
