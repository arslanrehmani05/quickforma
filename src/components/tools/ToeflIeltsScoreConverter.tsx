import React, { useState } from "react";
import { Globe, Languages, Award, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const ToeflIeltsScoreConverter: React.FC = () => {
  const [toeflScore, setToeflScore] = useState<number>(102);

  // Official ETS / British Council Concordance
  let ieltsBand = "7.5";
  let cefrLevel = "C1 (Advanced Professional)";

  if (toeflScore >= 118) { ieltsBand = "9.0"; cefrLevel = "C2 (Mastery / Native)"; }
  else if (toeflScore >= 115) { ieltsBand = "8.5"; cefrLevel = "C2 (Mastery)"; }
  else if (toeflScore >= 110) { ieltsBand = "8.0"; cefrLevel = "C1 (Advanced)"; }
  else if (toeflScore >= 94) { ieltsBand = "7.0"; cefrLevel = "C1 (Advanced Working)"; }
  else if (toeflScore >= 79) { ieltsBand = "6.5"; cefrLevel = "B2 (Vantage / Independent)"; }
  else if (toeflScore >= 60) { ieltsBand = "6.0"; cefrLevel = "B2 (Independent User)"; }
  else if (toeflScore >= 46) { ieltsBand = "5.5"; cefrLevel = "B1 (Threshold)"; }
  else if (toeflScore >= 35) { ieltsBand = "5.0"; cefrLevel = "B1 (Threshold)"; }
  else { ieltsBand = "4.5 or below"; cefrLevel = "A2 (Basic User)"; }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Languages}
            title="TOEFL iBT to IELTS Band & CEFR Score Converter"
            description="Convert TOEFL iBT test scores (0-120) to official IELTS Academic 9.0 bands and Common European Framework (CEFR) levels."
          />
          <ResetButton onReset={() => setToeflScore(102)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="TOEFL iBT Total Score (0 - 120)"
            type="number"
            value={toeflScore}
            onChange={(e) => setToeflScore(Number(e.target.value))}
            min={0}
            max={120}
          />
          <div className="flex items-end">
            <div className="w-full text-xs font-medium text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              U.S. Top 50 University Minimum Target: <strong className="text-slate-900">100+ TOEFL / 7.5 IELTS</strong>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Concordant IELTS Band"
            value={ieltsBand}
            subtitle="IELTS Academic Overall Band Scale (0-9.0)"
          />
          <ResultCard
            variant="light"
            title="CEFR Proficiency Level"
            value={cefrLevel.split(" ")[0]}
            subtitle={cefrLevel}
          />
          <ResultCard
            variant="light"
            title="Admissions Eligibility"
            value={toeflScore >= 100 ? "Highly Competitive" : toeflScore >= 80 ? "Meets Standard" : "Conditional"}
            subtitle="Recognized by 11,500+ global universities"
          />
        </div>
      </div>
    </div>
  );
};
