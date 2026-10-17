import React, { useState } from "react";
import { Split, CheckCircle2, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AbTestSignificanceCalculator: React.FC = () => {
  const [controlVisitors, setControlVisitors] = useState<number>(5000);
  const [controlConversions, setControlConversions] = useState<number>(200);
  const [variantVisitors, setVariantVisitors] = useState<number>(5000);
  const [variantConversions, setVariantConversions] = useState<number>(260);

  const crA = (controlVisitors || 0) > 0 ? ((controlConversions || 0) / controlVisitors) * 100 : 0;
  const crB = (variantVisitors || 0) > 0 ? ((variantConversions || 0) / variantVisitors) * 100 : 0;
  const lift = crA > 0 ? ((crB - crA) / crA) * 100 : 0;

  // Two-sample Z-test for proportions
  const pA = (controlConversions || 0) / (controlVisitors || 1);
  const pB = (variantConversions || 0) / (variantVisitors || 1);
  const pPool = ((controlConversions || 0) + (variantConversions || 0)) / ((controlVisitors || 1) + (variantVisitors || 1));
  const sePool = Math.sqrt(pPool * (1 - pPool) * (1 / (controlVisitors || 1) + 1 / (variantVisitors || 1)));

  const zScore = sePool > 0 ? Math.abs(pB - pA) / sePool : 0;

  // Approximate normal CDF p-value
  const isSignificant95 = zScore >= 1.96;
  const isSignificant99 = zScore >= 2.576;
  const confidence = isSignificant99 ? "99%+" : isSignificant95 ? "95%" : "<90%";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Split}
            title="Statistical Significance & Confidence Level Solver"
            description="Evaluate conversion rate lift and verify if A/B split test results achieve 95% statistical significance."
          />
          <ResetButton onReset={() => {
            setControlVisitors(5000);
            setControlConversions(200);
            setVariantVisitors(5000);
            setVariantConversions(260);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Control (Variant A)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Visitors (A)" type="number" value={controlVisitors} onChange={(e) => setControlVisitors(Number(e.target.value))} />
              <InputField label="Conversions (A)" type="number" value={controlConversions} onChange={(e) => setControlConversions(Number(e.target.value))} />
            </div>

            <h3 className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100">Variant (Variant B)</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Visitors (B)" type="number" value={variantVisitors} onChange={(e) => setVariantVisitors(Number(e.target.value))} />
              <InputField label="Conversions (B)" type="number" value={variantConversions} onChange={(e) => setVariantConversions(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="A/B Split Test Significance">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Conversion Lift</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${lift >= 0 ? "text-emerald-400" : "text-rose-400"} font-mono`}>
                    {lift >= 0 ? "+" : ""}{lift.toFixed(1)}% Lift
                  </div>
                  <p className="text-xs text-slate-400">
                    Control: {crA.toFixed(2)}% CR vs Variant: {crB.toFixed(2)}% CR
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Significance (P &lt; 0.05)</span>
                    <span className={`text-sm font-bold block ${isSignificant95 ? "text-emerald-400" : "text-amber-400"}`}>
                      {isSignificant95 ? "Statistically Significant" : "Not Yet Significant"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Confidence Level</span>
                    <span className="text-base font-bold text-white font-mono">{confidence}</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
