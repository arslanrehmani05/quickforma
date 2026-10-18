import React, { useState } from "react";
import { Image, CheckCircle, AlertTriangle, Sparkles, FileText } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AltTextAccessibilityChecker: React.FC = () => {
  const sampleAlt = "Chart showing quarterly EBITDA profit margin growth comparing fiscal year 2025 against 2026";
  const [altText, setAltText] = useState<string>(sampleAlt);
  const [imageType, setImageType] = useState<"informative" | "decorative" | "functional">("informative");

  const charLength = altText.trim().length;
  const wordCount = altText.trim() ? altText.trim().split(/\s+/).length : 0;

  // WCAG Accessibility Checks
  const hasRedundantPrefix = /^(image of|picture of|photo of|graphic of)/i.test(altText.trim());
  const hasFileExtension = /\.(jpg|png|jpeg|webp|gif|svg)$/i.test(altText.trim());
  const isTooShort = imageType === "informative" && charLength < 15;
  const isTooLong = charLength > 125;

  let score = 100;
  if (hasRedundantPrefix) score -= 25;
  if (hasFileExtension) score -= 35;
  if (isTooShort) score -= 30;
  if (isTooLong) score -= 20;
  score = Math.max(0, score);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Image}
            title="Image Alt Text WCAG Accessibility Auditor"
            description="Audit image alt text descriptions against WCAG 2.1 AA accessibility guidelines, screen reader usability, and character benchmarks."
          />
          <ResetButton onReset={() => {
            setAltText(sampleAlt);
            setImageType("informative");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Image Alt Text to Audit</label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
              placeholder="e.g. Screenshot of the QuickForma EBITDA dashboard..."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Context Classification</label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium"
            >
              <option value="informative">Informative (Conveys data/meaning)</option>
              <option value="functional">Functional (Button/Link action)</option>
              <option value="decorative">Decorative (Should be alt="")</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Accessibility Score"
            value={`${score} / 100`}
            subtitle={score >= 80 ? "WCAG 2.1 Compliant" : "Needs Refinement"}
          />
          <ResultCard
            variant="light"
            title="Character Count"
            value={charLength.toString()}
            subtitle="Optimal range: 30 - 125 chars"
          />
          <ResultCard
            variant="light"
            title="Total Words"
            value={wordCount.toString()}
            subtitle="Concise description"
          />
          <ResultCard
            variant="light"
            title="Redundant Phrases"
            value={hasRedundantPrefix ? "Detected" : "Clean"}
            subtitle={hasRedundantPrefix ? "Remove 'image of...'" : "No redundant prefixes"}
          />
        </div>

        <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2">WCAG 2.1 Audit Checklist</h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              {!hasRedundantPrefix ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
              <span className={hasRedundantPrefix ? "text-amber-800 font-semibold" : "text-slate-600"}>
                Avoids redundant phrasing like "image of" or "photo of" (screen readers already announce images)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!hasFileExtension ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-600" />
              )}
              <span className={hasFileExtension ? "text-red-800 font-semibold" : "text-slate-600"}>
                Does not use raw filenames (e.g. "IMG_0042.jpg")
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!isTooLong ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
              <span className={isTooLong ? "text-amber-800 font-semibold" : "text-slate-600"}>
                Under 125 characters to prevent screen reader pagination fatigue
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
