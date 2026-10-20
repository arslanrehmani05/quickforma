import React, { useState } from "react";
import { Share2, Users, TrendingUp, Sparkles } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ViralKFactorCalculator: React.FC = () => {
  const [currentUsers, setCurrentUsers] = useState<number>(5000);
  const [invitesSentPerUser, setInvitesSentPerUser] = useState<number>(4.2);
  const [inviteConversionPercent, setInviteConversionPercent] = useState<number>(18);

  const handleReset = () => {
    setCurrentUsers(5000);
    setInvitesSentPerUser(4.2);
    setInviteConversionPercent(18);
  };

  // K-Factor = Invites per user * Conversion rate
  const kFactor = invitesSentPerUser * (inviteConversionPercent / 100);
  const newViralUsersCycle1 = Math.round(currentUsers * kFactor);
  const isExponential = kFactor > 1.0;
  // Viral Multiplier = 1 / (1 - K) when K < 1
  const viralMultiplier = kFactor < 1 ? 1 / (1 - kFactor) : Infinity;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Viral Coefficient K-Factor & Referral Loop Solver"
        description="Compute product viral growth K-factors, referral loop multipliers, and exponential expansion thresholds."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Current Active User Base"
            value={currentUsers}
            onChange={(val) => setCurrentUsers(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Average Invites Sent per User (i)"
            value={invitesSentPerUser}
            onChange={(val) => setInvitesSentPerUser(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            step={0.1}
          />
          <InputField
            label="Invite Acceptance Rate (%)"
            value={inviteConversionPercent}
            onChange={(val) => setInviteConversionPercent(Math.min(100, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={100}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Viral Coefficient (K)"
          value={`${kFactor.toFixed(2)}`}
          subtitle={isExponential ? "Self-Sustaining Virality (K > 1.0)" : "Viral Assist (K < 1.0)"}
          variant="indigo"
        />
        <ResultCard
          title="Cycle 1 Viral Users"
          value={`+${newViralUsersCycle1.toLocaleString()}`}
          subtitle="Free organic acquisition"
          variant="light"
        />
        <ResultCard
          title="Viral Multiplier"
          value={isExponential ? "∞ (Infinite)" : `${viralMultiplier.toFixed(2)}x`}
          subtitle="Lifetime organic boost"
          variant="light"
        />
        <ResultCard
          title="Growth State"
          value={isExponential ? "EXPONENTIAL" : "DECAYING ASSIST"}
          subtitle={isExponential ? "K > 1.0 threshold met" : "Supplement with paid ads"}
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Viral Growth Mechanics</h4>
        <p className="text-slate-600">
          A viral coefficient of <strong className="text-slate-800">K = {kFactor.toFixed(2)}</strong> means {isExponential ? "every user recruits more than 1 new user, creating self-sustaining exponential growth with zero ad spend." : "every user brings in " + kFactor.toFixed(2) + " new users, multiplying paid marketing efficacy by " + viralMultiplier.toFixed(2) + "x."}
        </p>
      </div>
    </div>
  );
};
