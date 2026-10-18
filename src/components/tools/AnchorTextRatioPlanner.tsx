import React, { useState } from "react";
import { Link2, Target, AlertCircle, CheckCircle, BarChart3 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AnchorTextRatioPlanner: React.FC = () => {
  const [exactMatchCount, setExactMatchCount] = useState<number>(8);
  const [partialMatchCount, setPartialMatchCount] = useState<number>(24);
  const [brandedCount, setBrandedCount] = useState<number>(55);
  const [nakedUrlCount, setNakedUrlCount] = useState<number>(28);
  const [genericCount, setGenericCount] = useState<number>(15);

  const totalLinks = Math.max(1, exactMatchCount + partialMatchCount + brandedCount + nakedUrlCount + genericCount);

  const exactPct = (exactMatchCount / totalLinks) * 100;
  const partialPct = (partialMatchCount / totalLinks) * 100;
  const brandedPct = (brandedCount / totalLinks) * 100;
  const nakedPct = (nakedUrlCount / totalLinks) * 100;
  const genericPct = (genericCount / totalLinks) * 100;

  const isExactRisky = exactPct > 10;
  const isHealthyProfile = exactPct <= 10 && brandedPct >= 35;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Link2}
            title="SEO Anchor Text Distribution & Risk Auditor"
            description="Plan natural internal and backlink anchor text ratios to prevent search engine algorithmic over-optimization penalties."
          />
          <ResetButton onReset={() => {
            setExactMatchCount(8);
            setPartialMatchCount(24);
            setBrandedCount(55);
            setNakedUrlCount(28);
            setGenericCount(15);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Exact Match (e.g. 'business valuation')"
            type="number"
            value={exactMatchCount}
            onChange={(e) => setExactMatchCount(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Partial / LSI Match (e.g. 'best valuation tool')"
            type="number"
            value={partialMatchCount}
            onChange={(e) => setPartialMatchCount(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Branded Anchors (e.g. 'QuickForma')"
            type="number"
            value={brandedCount}
            onChange={(e) => setBrandedCount(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Naked URL (e.g. 'quickforma.com')"
            type="number"
            value={nakedUrlCount}
            onChange={(e) => setNakedUrlCount(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Generic (e.g. 'click here', 'visit site')"
            type="number"
            value={genericCount}
            onChange={(e) => setGenericCount(Number(e.target.value))}
            min={0}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Total Profile Links"
            value={totalLinks.toLocaleString()}
            subtitle="Aggregated internal + backlink sample"
          />
          <ResultCard
            variant="light"
            title="Branded Ratio"
            value={`${brandedPct.toFixed(1)}%`}
            subtitle="Safe target: 35% - 50%"
          />
          <ResultCard
            variant="light"
            title="Exact Match Ratio"
            value={`${exactPct.toFixed(1)}%`}
            subtitle={isExactRisky ? "Over-optimization risk!" : "Healthy natural tier (<10%)"}
          />
          <ResultCard
            variant="light"
            title="Partial & URL Ratio"
            value={`${(partialPct + nakedPct).toFixed(1)}%`}
            subtitle="Safe topical relevance base"
          />
        </div>

        <div className={`p-4 rounded-2xl border text-sm flex items-start gap-3 ${isHealthyProfile ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"}`}>
          {isHealthyProfile ? (
            <>
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Natural Link Profile Verified:</strong>
                Your exact match ratio is below 10% and branded anchor density dominates, closely mirroring white-hat commercial domain profiles.
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Caution: Algorithmic Over-Optimization Risk:</strong>
                {exactPct > 10
                  ? `Your exact match ratio (${exactPct.toFixed(1)}%) exceeds the safe 10% threshold. Dilute with more branded or naked URLs.`
                  : "Increase branded mentions to reach at least 35% of total inbound anchors."}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
