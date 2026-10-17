import React, { useState } from "react";
import { Search, Monitor, Smartphone } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GoogleSerpPreviewTool: React.FC = () => {
  const [title, setTitle] = useState("Best Financial Calculators for Small Business (100% Free)");
  const [description, setDescription] = useState("Access 50+ free client-side financial calculators, invoice generators, cash runway solvers, and EBITDA models. Fast, private, and zero signup.");
  const [slug, setSlug] = useState("business/financial-calculators");
  const [isMobile, setIsMobile] = useState(false);

  const titleLength = title.length;
  const descLength = description.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Search}
            title="Google Desktop & Mobile SERP Snippet Preview"
            description="Preview how your web page title, URL path, and meta description render in Google search results."
          />
          <ResetButton onReset={() => {
            setTitle("Best Financial Calculators for Small Business (100% Free)");
            setDescription("Access 50+ free client-side financial calculators, invoice generators, cash runway solvers, and EBITDA models.");
            setSlug("business/financial-calculators");
          }} />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Page Title Tag"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helpText={`${titleLength} chars (Google truncates around 580px / ~60 chars)`}
              error={titleLength > 60 ? "Warning: Title may truncate on desktop" : undefined}
            />
            <InputField
              label="URL Slug Path"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              prefix="https://quickforma.com/"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Meta Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
            />
            <span className="text-[11px] text-slate-400 block mt-1">
              {descLength} characters (Google truncates around 960px / ~155–160 chars)
            </span>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Google SERP Snippet Preview</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMobile(false)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${!isMobile ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
                <button
                  onClick={() => setIsMobile(true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${isMobile ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl bg-white border border-slate-200 shadow-sm font-sans ${isMobile ? "max-w-sm mx-auto" : "max-w-2xl"}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">Q</div>
                <div className="text-xs text-slate-700 truncate">
                  <span className="font-semibold text-slate-900">QuickForma</span>
                  <span className="text-slate-400 ml-1">https://www.quickforma.com › {slug}</span>
                </div>
              </div>
              <h3 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-1">
                {title || "Untitled Page"}
              </h3>
              <p className="text-xs text-[#4d5156] line-clamp-2 mt-1 leading-relaxed">
                {description || "No meta description provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
