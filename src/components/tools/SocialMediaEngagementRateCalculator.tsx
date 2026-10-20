import React, { useState } from "react";
import { Activity, Heart, MessageSquare, Share2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SocialMediaEngagementRateCalculator: React.FC = () => {
  const [totalFollowers, setTotalFollowers] = useState<number>(45000);
  const [totalLikes, setTotalLikes] = useState<number>(1800);
  const [totalComments, setTotalComments] = useState<number>(320);
  const [totalSharesSaves, setTotalSharesSaves] = useState<number>(410);
  const [postsSampled, setPostsSampled] = useState<number>(10);

  const handleReset = () => {
    setTotalFollowers(45000);
    setTotalLikes(1800);
    setTotalComments(320);
    setTotalSharesSaves(410);
    setPostsSampled(10);
  };

  const totalInteractions = totalLikes + totalComments + totalSharesSaves;
  const interactionsPerPost = postsSampled > 0 ? totalInteractions / postsSampled : 0;
  // ER by Followers = (Average Interactions per Post / Total Followers) * 100
  const engagementRateFollowers = totalFollowers > 0 ? (interactionsPerPost / totalFollowers) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Social Media Engagement Rate Solver"
        description="Compute audited engagement benchmarks across Instagram, LinkedIn, YouTube, and TikTok brand channels."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Account Followers"
            value={totalFollowers}
            onChange={(val) => setTotalFollowers(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Number of Posts Sampled"
            value={postsSampled}
            onChange={(val) => setPostsSampled(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Cumulative Likes Across Posts"
            value={totalLikes}
            onChange={(val) => setTotalLikes(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Cumulative Comments"
            value={totalComments}
            onChange={(val) => setTotalComments(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Cumulative Shares & Saves"
            value={totalSharesSaves}
            onChange={(val) => setTotalSharesSaves(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Total Interactions"
            value={totalInteractions.toLocaleString()}
            subtitle={`Average ${interactionsPerPost.toFixed(1)} interactions/post`}
            variant="light"
          />
          <ResultCard
            title="Engagement Rate (by Followers)"
            value={`${engagementRateFollowers.toFixed(2)}%`}
            subtitle={engagementRateFollowers >= 2.5 ? "Above industry benchmark" : "Average brand benchmark"}
            variant="light"
          />
          <ResultCard
            title="Amplification Ratio"
            value={`${((totalSharesSaves / Math.max(1, totalInteractions)) * 100).toFixed(1)}%`}
            subtitle="Percentage of shares and bookmarks"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
