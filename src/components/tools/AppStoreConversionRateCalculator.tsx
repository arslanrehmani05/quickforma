import React, { useState } from "react";
import { Smartphone, Download, Eye, TrendingUp } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AppStoreConversionRateCalculator: React.FC = () => {
  const [storeImpressions, setStoreImpressions] = useState<number>(65000);
  const [productPageViews, setProductPageViews] = useState<number>(14500);
  const [appInstalls, setAppInstalls] = useState<number>(3800);

  const handleReset = () => {
    setStoreImpressions(65000);
    setProductPageViews(14500);
    setAppInstalls(3800);
  };

  const impressionToViewRate = storeImpressions > 0 ? (productPageViews / storeImpressions) * 100 : 0;
  const viewToInstallRate = productPageViews > 0 ? (appInstalls / productPageViews) * 100 : 0;
  const impressionToInstallRate = storeImpressions > 0 ? (appInstalls / storeImpressions) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="App Store (ASO) Impression to Install Rate Solver"
        description="Analyze Apple App Store and Google Play listing performance, page view click-throughs, and download conversion rates."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Search & Browse Impressions"
            value={storeImpressions}
            onChange={(val) => setStoreImpressions(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Product Page Views (Listing Taps)"
            value={productPageViews}
            onChange={(val) => setProductPageViews(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Total App Downloads / Installs"
            value={appInstalls}
            onChange={(val) => setAppInstalls(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Impression-to-Page CTR"
            value={`${impressionToViewRate.toFixed(2)}%`}
            subtitle="Icon & title click-through rate"
            variant="light"
          />
          <ResultCard
            title="Page View to Install Rate"
            value={`${viewToInstallRate.toFixed(2)}%`}
            subtitle="Screenshots & copy conversion"
            variant="light"
          />
          <ResultCard
            title="Overall Impression-to-Install"
            value={`${impressionToInstallRate.toFixed(2)}%`}
            subtitle="Direct conversion efficiency"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
