import React, { useState } from "react";
import { Radio, DollarSign, Users, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PodcastAdCpmCalculator: React.FC = () => {
  const [episodeDownloads, setEpisodeDownloads] = useState<number>(35000);
  const [adPlacementType, setAdPlacementType] = useState<string>("midroll"); // preroll, midroll, postroll
  const [cpmRate, setCpmRate] = useState<number>(25); // $25 CPM
  const [episodesPurchased, setEpisodesPurchased] = useState<number>(4);

  const handleReset = () => {
    setEpisodeDownloads(35000);
    setAdPlacementType("midroll");
    setCpmRate(25);
    setEpisodesPurchased(4);
  };

  const costPerEpisode = (episodeDownloads / 1000) * cpmRate;
  const totalCampaignCost = costPerEpisode * episodesPurchased;
  const totalImpressionsDelivered = episodeDownloads * episodesPurchased;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Podcast Advertising Spot CPM & Campaign Solver"
        description="Estimate pre-roll, mid-roll, and host-read podcast sponsorship budgets based on 30-day download averages."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Average Downloads per Episode (30-day)"
            value={episodeDownloads}
            onChange={(val) => setEpisodeDownloads(Math.max(100, Number(val) || 0))}
            type="number"
            min={100}
          />
          <InputField
            label="Agreed Spot CPM ($ per 1,000 DLs)"
            value={cpmRate}
            onChange={(val) => setCpmRate(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Number of Episodes Booked"
            value={episodesPurchased}
            onChange={(val) => setEpisodesPurchased(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Spot Cost per Episode"
            value={`$${costPerEpisode.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle="Single podcast episode rate"
            variant="light"
          />
          <ResultCard
            title="Total Campaign Budget"
            value={`$${totalCampaignCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle={`Across ${episodesPurchased} booked episodes`}
            variant="indigo"
          />
          <ResultCard
            title="Gross Listener Reach"
            value={totalImpressionsDelivered.toLocaleString()}
            subtitle="Estimated cumulative audio impressions"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
