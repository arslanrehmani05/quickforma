import React, { useState } from "react";
import { TrendingUp, DollarSign, Target, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const RoasCalculator: React.FC = () => {
  const [adSpend, setAdSpend] = useState<number>(5000);
  const [adRevenue, setAdRevenue] = useState<number>(22500);
  const [grossMarginPct, setGrossMarginPct] = useState<number>(65);
  const [otherMarketingSpend, setOtherMarketingSpend] = useState<number>(1000);

  const handleReset = () => {
    setAdSpend(5000);
    setAdRevenue(22500);
    setGrossMarginPct(65);
    setOtherMarketingSpend(1000);
  };

  const roas = adSpend > 0 ? adRevenue / adSpend : 0;
  const roasPct = roas * 100;
  const breakEvenRoas = grossMarginPct > 0 ? 100 / grossMarginPct : 0;
  const totalMarketingSpend = adSpend + otherMarketingSpend;
  const blendedMeros = totalMarketingSpend > 0 ? adRevenue / totalMarketingSpend : 0;
  const grossProfit = adRevenue * (grossMarginPct / 100);
  const netContribution = grossProfit - totalMarketingSpend;
  const poas = adSpend > 0 ? (grossProfit / adSpend) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="ROAS & Blended Marketing Return Calculator"
        description="Compute Return on Ad Spend, Breakeven ROAS, POAS (Profit on Ad Spend), and blended marketing efficiency."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Direct Ad Spend ($)"
            value={adSpend}
            onChange={(val) => setAdSpend(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Revenue Generated from Ads ($)"
            value={adRevenue}
            onChange={(val) => setAdRevenue(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Product Gross Margin (%)"
            value={grossMarginPct}
            onChange={(val) => setGrossMarginPct(Math.min(100, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={100}
            suffix="%"
          />
          <InputField
            label="Additional Marketing / Agency Fees ($)"
            value={otherMarketingSpend}
            onChange={(val) => setOtherMarketingSpend(Math.max(0, Number(val) || 0))}
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
          title="Direct ROAS"
          value={`${roas.toFixed(2)}x`}
          subtitle={`${roasPct.toFixed(0)}% return`}
          variant="indigo"
        />
        <ResultCard
          title="Breakeven ROAS"
          value={`${breakEvenRoas.toFixed(2)}x`}
          subtitle={roas >= breakEvenRoas ? "Campaign Profitable" : "Operating at Loss"}
          variant="light"
        />
        <ResultCard
          title="Blended MER"
          value={`${blendedMeros.toFixed(2)}x`}
          subtitle="Revenue / Total Spend"
          variant="light"
        />
        <ResultCard
          title="Net Profit Contribution"
          value={`$${netContribution.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle={`POAS: ${poas.toFixed(2)}x gross profit`}
          variant={netContribution >= 0 ? "light" : "light"}
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Campaign Health Metrics</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-slate-600">
          <div>
            <span className="font-medium text-slate-700">Gross Profit:</span> ${grossProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div>
            <span className="font-medium text-slate-700">Total Marketing:</span> ${totalMarketingSpend.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div>
            <span className="font-medium text-slate-700">Profit Margin After Ads:</span> {adRevenue > 0 ? ((netContribution / adRevenue) * 100).toFixed(1) : "0"}%
          </div>
        </div>
      </div>
    </div>
  );
};
