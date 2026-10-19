import React, { useState } from "react";
import { BookOpen, CheckSquare, Award, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const HighSchoolCreditCalculator: React.FC = () => {
  const [englishCredits, setEnglishCredits] = useState<number>(3.5);
  const [mathCredits, setMathCredits] = useState<number>(3.0);
  const [scienceCredits, setScienceCredits] = useState<number>(3.0);
  const [socialStudiesCredits, setSocialStudiesCredits] = useState<number>(2.5);
  const [foreignLangCredits, setForeignLangCredits] = useState<number>(2.0);
  const [peHealthCredits, setPeHealthCredits] = useState<number>(1.5);
  const [electivesCredits, setElectivesCredits] = useState<number>(4.5);
  const [graduationGoal, setGraduationGoal] = useState<number>(24.0); // Standard 24 credit diploma

  const completed =
    Math.max(0, englishCredits) +
    Math.max(0, mathCredits) +
    Math.max(0, scienceCredits) +
    Math.max(0, socialStudiesCredits) +
    Math.max(0, foreignLangCredits) +
    Math.max(0, peHealthCredits) +
    Math.max(0, electivesCredits);

  const remaining = Math.max(0, graduationGoal - completed);
  const progressPct = ((completed / graduationGoal) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={BookOpen}
            title="High School Diploma Credit Completion Tracker"
            description="Track state graduation requirements across core academics, foreign languages, and general electives."
          />
          <ResetButton onReset={() => {
            setEnglishCredits(3.5); setMathCredits(3.0); setScienceCredits(3.0);
            setSocialStudiesCredits(2.5); setForeignLangCredits(2.0);
            setPeHealthCredits(1.5); setElectivesCredits(4.5);
            setGraduationGoal(24.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="English (Req: 4.0)"
            type="number"
            step={0.5}
            value={englishCredits}
            onChange={(e) => setEnglishCredits(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Mathematics (Req: 3-4)"
            type="number"
            step={0.5}
            value={mathCredits}
            onChange={(e) => setMathCredits(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Science (Req: 3.0)"
            type="number"
            step={0.5}
            value={scienceCredits}
            onChange={(e) => setScienceCredits(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Social Studies (Req: 3.0)"
            type="number"
            step={0.5}
            value={socialStudiesCredits}
            onChange={(e) => setSocialStudiesCredits(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Foreign Language (Req: 2.0)"
            type="number"
            step={0.5}
            value={foreignLangCredits}
            onChange={(e) => setForeignLangCredits(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="PE / Health (Req: 1.5)"
            type="number"
            step={0.5}
            value={peHealthCredits}
            onChange={(e) => setPeHealthCredits(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Electives (Req: 5-7)"
            type="number"
            step={0.5}
            value={electivesCredits}
            onChange={(e) => setElectivesCredits(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="State Diploma Goal"
            type="number"
            step={0.5}
            value={graduationGoal}
            onChange={(e) => setGraduationGoal(Number(e.target.value))}
            min={18}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Credits Completed"
            value={`${completed.toFixed(1)} / ${graduationGoal}`}
            subtitle={`${progressPct}% of diploma fulfilled`}
          />
          <ResultCard
            variant="light"
            title="Remaining Units"
            value={`${remaining.toFixed(1)} cr`}
            subtitle={remaining === 0 ? "All requirements complete!" : "Needed to graduate"}
          />
          <ResultCard
            variant="light"
            title="Semesters Needed"
            value={remaining > 0 ? `${Math.ceil(remaining / 3)} terms` : "Ready for Diploma"}
            subtitle="Assuming 3-3.5 credits / semester"
          />
        </div>
      </div>
    </div>
  );
};
