import React, { useState } from "react";
import { Sparkles, DollarSign, Users, Heart } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const InfluencerMarketingRoiCalculator: React.FC = () => {
  const [sponsorshipFee, setSponsorshipFee] = useState<number>(2500);
  const [followerCount, setFollowerCount] = useState<number>(85000);
  const [totalLikesAndComments, setTotalLikesAndComments] = useState<number>(3400);
  const [attributedSalesRevenue, setAttributedSalesRevenue] = useState<number>(7800);
  const [freeProductCost, setFreeProductCost] = useState<number>(150);

  const handleReset = () => {
    setSponsorshipFee(2500);
    setFollowerCount(85000);
    setTotalLikesAndComments(3400);
    setAttributedSalesRevenue(7800);
    setFreeProductCost(150);
  };

  const totalCollaborationCost = sponsorshipFee + freeProductCost;
  const engagementRatePercent = followerCount > 0 ? (totalLikesAndComments / followerCount) * 100 : 0;
  const costPerEngagement = totalLikesAndComments > 0 ? totalCollaborationCost / totalLikesAndComments : 0;
  const directRoas = totalCollaborationCost > 0 ? attributedSalesRevenue / totalCollaborationCost : 0;
  const netCampaignProfit = attributedSalesRevenue - totalCollaborationCost;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Sponsored Post Engagement Rate & ROI Solver"
        description="Compute influencer sponsored collaboration engagement rates, Cost Per Engagement (CPE), and direct trackable ROAS."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Influencer Sponsorship Fee ($)"
            value={sponsorshipFee}
            onChange={(val) => setSponsorshipFee(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Influencer Follower Count"
            value={followerCount}
            onChange={(val) => setFollowerCount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Total Likes + Comments + Shares"
            value={totalLikesAndComments}
            onChange={(val) => setTotalLikesAndComments(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Trackable Promo Code Revenue ($)"
            value={attributedSalesRevenue}
            onChange={(val) => setAttributedSalesRevenue(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Gifted Product / Shipping Cost ($)"
            value={freeProductCost}
            onChange={(val) => setFreeProductCost(Math.max(0, Number(val) || 0))}
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
          title="Campaign Direct ROAS"
          value={`${directRoas.toFixed(2)}x`}
          subtitle="Revenue / total spend"
          variant="indigo"
        />
        <ResultCard
          title="Engagement Rate"
          value={`${engagementRatePercent.toFixed(2)}%`}
          subtitle="Industry benchmark: 1.5% - 3%"
          variant="light"
        />
        <ResultCard
          title="Cost Per Engagement"
          value={`$${costPerEngagement.toFixed(2)}`}
          subtitle="Per like, share, comment"
          variant="light"
        />
        <ResultCard
          title="Net Campaign Profit"
          value={`+$${netCampaignProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="After influencer fees"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Creator Collaboration Performance</h4>
        <p className="text-slate-600">
          The creator achieved a <strong className="text-slate-800">{engagementRatePercent.toFixed(2)}% engagement rate</strong> with a Cost Per Engagement of ${costPerEngagement.toFixed(2)}. The campaign delivered a <strong className="text-slate-800">{directRoas.toFixed(2)}x direct return</strong>, netting <strong className="text-slate-800">${netCampaignProfit.toLocaleString()}</strong> in profit plus permanent brand impression equity.
        </p>
      </div>
    </div>
  );
};
