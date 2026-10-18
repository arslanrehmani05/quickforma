import React, { useState } from "react";
import { Search, Monitor, Smartphone, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const MetaDescriptionLengthTool: React.FC = () => {
  const [title, setTitle] = useState("Free Business Financial Calculators & Utilities | QuickForma");
  const [metaDesc, setMetaDesc] = useState("Execute 100% client-side financial formulas, runway calculators, markup analyzers, and document generators with zero API costs.");

  // Pixel measurement: Google uses Arial 20px for Title and Arial 14px for Snippets
  const measurePixelWidth = (text: string, font: string): number => {
    if (typeof document !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = font;
        return Math.round(ctx.measureText(text).width);
      }
    }
    // Fallback proportional character approximation
    return text.length * (font.includes("20px") ? 10.5 : 7.2);
  };

  const titlePx = measurePixelWidth(title, "20px Arial");
  const descPx = measurePixelWidth(metaDesc, "14px Arial");

  const titleLimitPx = 600; // Google desktop title cutoff ~600px
  const descLimitPx = 960; // Google desktop snippet cutoff ~960px
  const mobileDescLimitPx = 680; // Google mobile snippet cutoff ~680px

  const titleChars = title.length;
  const descChars = metaDesc.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Search}
            title="Google SERP Pixel Width & Meta Description Tool"
            description="Measure exact pixel widths (Arial 20px / 14px) and character counts to prevent title and description truncation on Google Search."
          />
          <ResetButton onReset={() => {
            setTitle("Free Business Financial Calculators & Utilities | QuickForma");
            setMetaDesc("Execute 100% client-side financial formulas, runway calculators, markup analyzers, and document generators with zero API costs.");
          }} />
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">SEO Page Title</span>
              <span className={titlePx > titleLimitPx ? "text-rose-600 font-bold" : "text-slate-500"}>
                {titlePx} px / {titleLimitPx} px max ({titleChars} chars)
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white"
            />
            {/* Visual Pixel Budget Meter */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${titlePx > titleLimitPx ? "bg-rose-500" : titlePx > 540 ? "bg-amber-400" : "bg-emerald-500"}`}
                style={{ width: `${Math.min(100, (titlePx / titleLimitPx) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Meta Description</span>
              <span className={descPx > descLimitPx ? "text-rose-600 font-bold" : "text-slate-500"}>
                {descPx} px / {descLimitPx} px max ({descChars} chars)
              </span>
            </div>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-600 focus:bg-white"
            />
            {/* Visual Pixel Budget Meter */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full ${descPx > descLimitPx ? "bg-rose-500" : descPx > 860 ? "bg-amber-400" : "bg-emerald-500"}`}
                style={{ width: `${Math.min(100, (descPx / descLimitPx) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Info className="w-3.5 h-3.5 text-indigo-600" /> Pixel Measurement vs Character Count
          </div>
          <p>
            Google measures search snippet boundaries in <strong>pixels</strong>, not character counts. Wide characters (like 'W', 'M', or uppercase letters) consume significantly more pixel width than narrow characters ('l', 'i', 't'). Desktop titles truncate at ~600px; descriptions truncate at ~960px desktop and ~680px mobile.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Monitor className="w-4 h-4 text-indigo-600" /> Google Search Desktop SERP Preview
          </h3>
          <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-1 max-w-xl">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[9px]">Q</div>
              <span>https://www.quickforma.com</span>
            </div>
            <div className="text-base text-blue-700 hover:underline font-medium cursor-pointer line-clamp-1">
              {titlePx > titleLimitPx ? `${title.slice(0, 58)}...` : title}
            </div>
            <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {descPx > descLimitPx ? `${metaDesc.slice(0, 155)}...` : metaDesc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
