import React, { useState } from "react";
import { AlignLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";

export const CharacterCountLimitTool: React.FC = () => {
  const [text, setText] = useState(
    "QuickForma empowers modern businesses and developers with instant, 100% client-side calculators. Test your social media copy against live platform limits in real time."
  );

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const platforms = [
    { name: "Twitter / X Post", limit: 280 },
    { name: "LinkedIn Post", limit: 3000 },
    { name: "Instagram Caption", limit: 2200 },
    { name: "Instagram Bio", limit: 150 },
    { name: "Pinterest Pin Description", limit: 500 },
    { name: "Google SERP Title", limit: 60 },
    { name: "Google Meta Description", limit: 160 },
    { name: "SMS Message (1 Segment)", limit: 160 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={AlignLeft}
            title="Social Media Character Count & Platform Limits"
            description="Track real-time character counts, word counts, and multi-platform length limits for Twitter/X, LinkedIn, Meta, and SEO."
          />
          <ResetButton onReset={() => setText("QuickForma empowers modern businesses with instant calculators.")} />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
          <span>Characters: <strong className="text-slate-900 text-sm">{charCount}</strong></span>
          <span>Words: <strong className="text-slate-900 text-sm">{wordCount}</strong></span>
        </div>

        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type social copy to inspect character restrictions..."
          className="w-full p-4 text-xs font-sans bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:bg-white"
        />

        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900">Platform Limit Progress</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {platforms.map((p) => {
              const remaining = p.limit - charCount;
              const isOver = remaining < 0;
              const percent = Math.min(100, (charCount / p.limit) * 100);

              return (
                <div key={p.name} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{p.name}</span>
                    <span className={`font-mono font-semibold ${isOver ? "text-rose-600" : "text-slate-500"}`}>
                      {charCount} / {p.limit} {isOver ? `(${remaining})` : `(+${remaining})`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${isOver ? "bg-rose-500" : percent > 85 ? "bg-amber-500" : "bg-indigo-600"}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
