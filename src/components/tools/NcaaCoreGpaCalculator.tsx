import React, { useState } from "react";
import { Trophy, Target, Award, CheckCircle2, AlertCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const NcaaCoreGpaCalculator: React.FC = () => {
  const [englishCredits, setEnglishCredits] = useState<number>(4);
  const [englishGpa, setEnglishGpa] = useState<number>(3.5);
  const [mathCredits, setMathCredits] = useState<number>(3);
  const [mathGpa, setMathGpa] = useState<number>(3.2);
  const [scienceCredits, setScienceCredits] = useState<number>(2);
  const [scienceGpa, setScienceGpa] = useState<number>(3.4);
  const [socialScienceCredits, setSocialScienceCredits] = useState<number>(2);
  const [socialScienceGpa, setSocialScienceGpa] = useState<number>(3.7);
  const [additionalCoreCredits, setAdditionalCoreCredits] = useState<number>(5);
  const [additionalCoreGpa, setAdditionalCoreGpa] = useState<number>(3.6);

  const totalCompletedCredits = englishCredits + mathCredits + scienceCredits + socialScienceCredits + additionalCoreCredits;
  const isComplete16 = totalCompletedCredits >= 16;

  const totalPoints =
    (englishCredits * englishGpa) +
    (mathCredits * mathGpa) +
    (scienceCredits * scienceGpa) +
    (socialScienceCredits * socialScienceGpa) +
    (additionalCoreCredits * additionalCoreGpa);

  const ncaaCoreGpa = totalCompletedCredits > 0 ? (totalPoints / totalCompletedCredits).toFixed(3) : "0.000";

  // Division I 2.300 minimum qualifier threshold
  const isD1Qualified = parseFloat(ncaaCoreGpa) >= 2.300 && isComplete16;
  const isD2Qualified = parseFloat(ncaaCoreGpa) >= 2.200 && totalCompletedCredits >= 16;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Trophy}
            title="NCAA Student-Athlete Core Course GPA Solver"
            description="Calculate Division I & II eligibility: 16 approved core courses, quality points, and sliding-scale qualifiers."
          />
          <ResetButton onReset={() => {
            setEnglishCredits(4); setEnglishGpa(3.5);
            setMathCredits(3); setMathGpa(3.2);
            setScienceCredits(2); setScienceGpa(3.4);
            setSocialScienceCredits(2); setSocialScienceGpa(3.7);
            setAdditionalCoreCredits(5); setAdditionalCoreGpa(3.6);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="NCAA Core GPA"
            value={ncaaCoreGpa}
            subtitle={`${totalCompletedCredits} / 16 Core Course Units`}
          />
          <ResultCard
            variant="light"
            title="Division I Qualifier"
            value={isD1Qualified ? "Eligible" : "Needs Review"}
            subtitle="Min 2.300 Core GPA + 16 units"
          />
          <ResultCard
            variant="light"
            title="Division II Qualifier"
            value={isD2Qualified ? "Eligible" : "Needs Review"}
            subtitle="Min 2.200 Core GPA + 16 units"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">16 Core Subject Area Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-slate-800">English (Min 4)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={englishCredits}
                  onChange={(e) => setEnglishCredits(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center"
                />
                <input
                  type="number"
                  step={0.01}
                  value={englishGpa}
                  onChange={(e) => setEnglishGpa(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-slate-800">Mathematics (Min 3)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={mathCredits}
                  onChange={(e) => setMathCredits(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center"
                />
                <input
                  type="number"
                  step={0.01}
                  value={mathGpa}
                  onChange={(e) => setMathGpa(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-slate-800">Natural / Phys Science (Min 2)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={scienceCredits}
                  onChange={(e) => setScienceCredits(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center"
                />
                <input
                  type="number"
                  step={0.01}
                  value={scienceGpa}
                  onChange={(e) => setScienceGpa(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="text-xs font-bold text-slate-800">Social Science (Min 2)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={socialScienceCredits}
                  onChange={(e) => setSocialScienceCredits(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center"
                />
                <input
                  type="number"
                  step={0.01}
                  value={socialScienceGpa}
                  onChange={(e) => setSocialScienceGpa(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 sm:col-span-2">
              <label className="text-xs font-bold text-slate-800">Additional Core Courses (4-5 units)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={additionalCoreCredits}
                  onChange={(e) => setAdditionalCoreCredits(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center"
                />
                <input
                  type="number"
                  step={0.01}
                  value={additionalCoreGpa}
                  onChange={(e) => setAdditionalCoreGpa(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg text-center font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
