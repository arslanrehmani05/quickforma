import React, { useState } from "react";
import { BookOpen, FileText, Check, Copy, Printer } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const CornellNotesTemplateGenerator: React.FC = () => {
  const [topicSubject, setTopicSubject] = useState<string>("Introduction to Macroeconomics: Fiscal vs Monetary Policy");
  const [cuesQuestions, setCuesQuestions] = useState<string>(
    "- What is the primary mandate of the Federal Reserve?\n- How does quantitative easing stimulate bank reserves?\n- Contrast Keynesian fiscal multipliers with supply-side tax cuts."
  );
  const [mainNotes, setMainNotes] = useState<string>(
    "1. Dual Mandate: Price stability (2% inflation target) and maximum sustainable employment.\n2. Open Market Operations: Purchasing Treasury securities injects liquid reserves directly into primary dealer balances.\n3. Discount Window: Serves as the backup lender of last resort for depository institutions."
  );
  const [summarySection, setSummarySection] = useState<string>(
    "Monetary policy controls money supply and interest rates via the central bank, while fiscal policy relies on congressional tax and government expenditure levers."
  );

  const formattedNotes = `========================================================================
CORNELL SYSTEM NOTE-TAKING SHEET
Topic / Lecture: ${topicSubject}
Date: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
========================================================================

CUES / KEY QUESTIONS (Left Column):
${cuesQuestions}

------------------------------------------------------------------------
DETAILED LECTURE NOTES (Main Column):
${mainNotes}

========================================================================
BOTTOM SUMMARY (Synthesized takeaways):
${summarySection}
========================================================================
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BookOpen}
            title="Interactive Cornell Note-Taking Sheet & Template Builder"
            description="Format structured Cornell study notes with cues, lecture details, and synthesized summary review blocks."
          />
          <ResetButton onReset={() => {
            setTopicSubject("Introduction to Macroeconomics: Fiscal vs Monetary Policy");
          }} />
        </div>

        <InputField
          label="Lecture Topic / Subject"
          type="text"
          value={topicSubject}
          onChange={(e) => setTopicSubject(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Cues & Questions (30%)</label>
            <textarea
              rows={8}
              value={cuesQuestions}
              onChange={(e) => setCuesQuestions(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-700 uppercase">Lecture Notes (70%)</label>
            <textarea
              rows={8}
              value={mainNotes}
              onChange={(e) => setMainNotes(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-sans"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase">Bottom Summary Review</label>
          <textarea
            rows={3}
            value={summarySection}
            onChange={(e) => setSummarySection(e.target.value)}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-sans"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> Exportable Study Document
            </h3>
            <CopyButton textToCopy={formattedNotes} />
          </div>
          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap select-all">
            {formattedNotes}
          </div>
        </div>
      </div>
    </div>
  );
};
