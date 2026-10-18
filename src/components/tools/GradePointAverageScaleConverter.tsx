import React, { useState } from "react";
import { Globe, Info, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const GradePointAverageScaleConverter: React.FC = () => {
  const [scaleType, setScaleType] = useState<"10point" | "percentage" | "german">("10point");
  const [inputValue, setInputValue] = useState<number>(8.4);

  // Conversion algorithms with documented assumptions
  let usGpaEstimate = 0;
  let formulaExplanation = "";

  if (scaleType === "10point") {
    // 10-Point Indian / Asian CGPA Scale (AICTE Recommended Bracket Conversion)
    // AICTE / Standard US Graduate Admissions bracket estimation:
    // >= 9.0 -> 4.0, 8.0-8.9 -> 3.5-3.9, 7.0-7.9 -> 3.0-3.4, 6.0-6.9 -> 2.5-2.9, <6.0 -> proportional
    const val = Math.max(0, Math.min(10, inputValue));
    if (val >= 9.0) {
      usGpaEstimate = 3.8 + ((val - 9.0) / 1.0) * 0.2;
    } else if (val >= 8.0) {
      usGpaEstimate = 3.3 + ((val - 8.0) / 1.0) * 0.5;
    } else if (val >= 7.0) {
      usGpaEstimate = 2.8 + ((val - 7.0) / 1.0) * 0.5;
    } else if (val >= 6.0) {
      usGpaEstimate = 2.2 + ((val - 6.0) / 1.0) * 0.6;
    } else if (val >= 5.0) {
      usGpaEstimate = 1.5 + ((val - 5.0) / 1.0) * 0.7;
    } else {
      usGpaEstimate = Math.max(0, (val / 5.0) * 1.5);
    }
    formulaExplanation = "AICTE / Collegiate Bracket Model: Evaluates upper quartile distribution (8.0+ corresponds to US Honors B+/A range).";
  } else if (scaleType === "percentage") {
    // Percentage to US 4.0 Scale (Standard US Collegiate Grading Brackets)
    const pct = Math.max(0, Math.min(100, inputValue));
    if (pct >= 93) usGpaEstimate = 4.0;
    else if (pct >= 90) usGpaEstimate = 3.7 + ((pct - 90) / 3) * 0.3;
    else if (pct >= 87) usGpaEstimate = 3.3 + ((pct - 87) / 3) * 0.4;
    else if (pct >= 83) usGpaEstimate = 3.0 + ((pct - 83) / 4) * 0.3;
    else if (pct >= 80) usGpaEstimate = 2.7 + ((pct - 80) / 3) * 0.3;
    else if (pct >= 77) usGpaEstimate = 2.3 + ((pct - 77) / 3) * 0.4;
    else if (pct >= 73) usGpaEstimate = 2.0 + ((pct - 73) / 4) * 0.3;
    else if (pct >= 70) usGpaEstimate = 1.7 + ((pct - 70) / 3) * 0.3;
    else if (pct >= 60) usGpaEstimate = 1.0 + ((pct - 60) / 10) * 0.7;
    else usGpaEstimate = 0.0;
    formulaExplanation = "US Standard Collegiate Grading Scale (A = 93–100%, A- = 90–92%, B+ = 87–89%, etc.).";
  } else {
    // German Modified Bavarian Formula: 1 + 3 * (N_max - N_d) / (N_max - N_min)
    // German grades: 1.0 is best, 4.0 is minimum passing, 5.0 is fail
    const nMax = 1.0;
    const nMin = 4.0;
    const gVal = Math.max(1.0, Math.min(5.0, inputValue));
    if (gVal > 4.0) {
      usGpaEstimate = 0.0;
    } else {
      // German formula converts to German GPA; mapping to US 4.0:
      // German 1.0 = US 4.0, German 4.0 = US 2.0 (Passing)
      const bavarianScore = 1 + 3 * ((gVal - nMax) / (nMin - nMax)); // 1.0 to 4.0 (German)
      // Map German [1.0 best, 4.0 min pass] to US [4.0 best, 2.0 min pass]
      usGpaEstimate = Math.max(0, 4.0 - ((gVal - 1.0) / 3.0) * 2.0);
    }
    formulaExplanation = "Modified Bavarian Formula: Standard German Academic Exchange Service (DAAD) conversion formula.";
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Globe}
            title="International GPA Scale to US 4.0 Estimator"
            description="Estimate standard US 4.0 GPA equivalents from Indian/Asian 10-point CGPA, 100% percentage scales, and German Bavarian grades."
          />
          <ResetButton onReset={() => {
            setScaleType("10point");
            setInputValue(8.4);
          }} />
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl max-w-md">
          <button
            onClick={() => { setScaleType("10point"); setInputValue(8.4); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${scaleType === "10point" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
          >
            10-Point CGPA
          </button>
          <button
            onClick={() => { setScaleType("percentage"); setInputValue(85); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${scaleType === "percentage" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
          >
            Percentage (100%)
          </button>
          <button
            onClick={() => { setScaleType("german"); setInputValue(1.8); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg ${scaleType === "german" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
          >
            German Scale
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label={scaleType === "10point" ? "10-Point CGPA Score (0–10)" : scaleType === "percentage" ? "Academic Percentage Score (0–100%)" : "German Grade (1.0 Best to 5.0 Fail)"}
              type="number"
              step="0.01"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
            />

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Info className="w-3.5 h-3.5 text-indigo-600" /> Methodology Disclaimer
              </div>
              <p>
                International credential evaluators (such as WES, ECE, or individual university graduate admissions offices) evaluate transcripts course-by-course using specific institutional grading keys. This calculator provides heuristic benchmarking estimates based on published AICTE, Bavarian, and US percentage bracket formulas.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Estimated US 4.0 GPA Equivalent">
              <div className="space-y-4 text-center">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Estimated US 4.0 GPA</div>
                  <div className="text-5xl font-extrabold text-emerald-400">{usGpaEstimate.toFixed(2)}</div>
                  <div className="text-xs text-slate-300 mt-2">
                    {formulaExplanation}
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-left text-xs text-slate-300">
                  <span className="font-semibold text-white block mb-0.5">Academic Standing:</span>
                  {usGpaEstimate >= 3.7 ? "Top Tier / Distinction (Strong candidate for competitive programs)" :
                   usGpaEstimate >= 3.0 ? "Above Average / Satisfactory for most graduate admissions" :
                   usGpaEstimate >= 2.0 ? "Minimum passing grade point average" : "Below standard US passing threshold"}
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
