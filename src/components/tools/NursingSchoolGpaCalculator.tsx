import React, { useState } from "react";
import { HeartPulse, Stethoscope, Award, CheckCircle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const NursingSchoolGpaCalculator: React.FC = () => {
  const [ap1Grade, setAp1Grade] = useState<number>(4.0); // A&P I
  const [ap2Grade, setAp2Grade] = useState<number>(3.7); // A&P II
  const [microGrade, setMicroGrade] = useState<number>(3.3); // Microbiology
  const [chemGrade, setChemGrade] = useState<number>(3.7); // General/Organic Chemistry
  const [statsGrade, setStatsGrade] = useState<number>(4.0); // Statistics
  const [psychGrade, setPsychGrade] = useState<number>(4.0); // Developmental Psych

  // Standard BSN science credits: A&P 1 (4), A&P 2 (4), Micro (4), Chem (4), Stats (3), Psych (3)
  const scienceCredits = 4 + 4 + 4 + 4;
  const sciencePoints = (ap1Grade * 4) + (ap2Grade * 4) + (microGrade * 4) + (chemGrade * 4);
  const scienceGpa = (sciencePoints / scienceCredits).toFixed(2);

  const totalCredits = scienceCredits + 3 + 3;
  const totalPoints = sciencePoints + (statsGrade * 3) + (psychGrade * 3);
  const prerequisiteGpa = (totalPoints / totalCredits).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={HeartPulse}
            title="BSN & ABSN Nursing Prerequisite Science GPA Calculator"
            description="Calculate competitive Science Prerequisite GPA (Anatomy & Physiology, Microbiology, Chemistry, Statistics) for nursing school admissions."
          />
          <ResetButton onReset={() => {
            setAp1Grade(4.0); setAp2Grade(3.7); setMicroGrade(3.3);
            setChemGrade(3.7); setStatsGrade(4.0); setPsychGrade(4.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <label className="text-xs font-bold text-slate-700">Anatomy & Physiology I (4 cr)</label>
            <select
              value={ap1Grade}
              onChange={(e) => setAp1Grade(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-600"
            >
              <option value={4.0}>A (4.0)</option>
              <option value={3.7}>A- (3.7)</option>
              <option value={3.3}>B+ (3.3)</option>
              <option value={3.0}>B (3.0)</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <label className="text-xs font-bold text-slate-700">Anatomy & Physiology II (4 cr)</label>
            <select
              value={ap2Grade}
              onChange={(e) => setAp2Grade(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-600"
            >
              <option value={4.0}>A (4.0)</option>
              <option value={3.7}>A- (3.7)</option>
              <option value={3.3}>B+ (3.3)</option>
              <option value={3.0}>B (3.0)</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <label className="text-xs font-bold text-slate-700">Microbiology with Lab (4 cr)</label>
            <select
              value={microGrade}
              onChange={(e) => setMicroGrade(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-600"
            >
              <option value={4.0}>A (4.0)</option>
              <option value={3.7}>A- (3.7)</option>
              <option value={3.3}>B+ (3.3)</option>
              <option value={3.0}>B (3.0)</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <label className="text-xs font-bold text-slate-700">General Chemistry (4 cr)</label>
            <select
              value={chemGrade}
              onChange={(e) => setChemGrade(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-600"
            >
              <option value={4.0}>A (4.0)</option>
              <option value={3.7}>A- (3.7)</option>
              <option value={3.3}>B+ (3.3)</option>
              <option value={3.0}>B (3.0)</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <label className="text-xs font-bold text-slate-700">Statistics (3 cr)</label>
            <select
              value={statsGrade}
              onChange={(e) => setStatsGrade(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-600"
            >
              <option value={4.0}>A (4.0)</option>
              <option value={3.7}>A- (3.7)</option>
              <option value={3.3}>B+ (3.3)</option>
              <option value={3.0}>B (3.0)</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <label className="text-xs font-bold text-slate-700">Lifespan Development (3 cr)</label>
            <select
              value={psychGrade}
              onChange={(e) => setPsychGrade(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-600"
            >
              <option value={4.0}>A (4.0)</option>
              <option value={3.7}>A- (3.7)</option>
              <option value={3.3}>B+ (3.3)</option>
              <option value={3.0}>B (3.0)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Core Science GPA"
            value={scienceGpa}
            subtitle={`${scienceCredits} cr Lab Sciences (A&P, Micro, Chem)`}
          />
          <ResultCard
            variant="light"
            title="Overall Prerequisite GPA"
            value={prerequisiteGpa}
            subtitle={`${totalCredits} Total Prerequisite Units`}
          />
          <ResultCard
            variant="light"
            title="Admissions Competitiveness"
            value={parseFloat(scienceGpa) >= 3.7 ? "Highly Competitive (3.7+)" : parseFloat(scienceGpa) >= 3.2 ? "Competitive" : "Minimum Requirement"}
            subtitle="Target for accelerated ABSN cohorts"
          />
        </div>
      </div>
    </div>
  );
};
