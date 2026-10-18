import React, { useState } from "react";
import { Clock, BookOpen, Calendar } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const StudyHoursPerCreditCalculator: React.FC = () => {
  const [creditHours, setCreditHours] = useState<number>(15);
  const [studyRatio, setStudyRatio] = useState<number>(2); // standard 2:1 Carnegie rule
  const [workHours, setWorkHours] = useState<number>(15);
  const [sleepHoursPerDay, setSleepHoursPerDay] = useState<number>(8);

  const safeCredits = Math.max(0, creditHours);
  const safeWorkHours = Math.max(0, workHours);
  const safeSleep = Math.max(0, sleepHoursPerDay);

  const inClassHours = safeCredits;
  const outsideStudyHours = safeCredits * studyRatio;
  const totalAcademicHours = inClassHours + outsideStudyHours;
  const weeklySleepHours = safeSleep * 7;
  const weeklyWorkHours = safeWorkHours;
  const totalCommittedHours = totalAcademicHours + weeklySleepHours + weeklyWorkHours;
  const isOvercommitted = totalCommittedHours > 168;
  const freeHoursPerWeek = Math.max(0, 168 - totalCommittedHours);
  const deficitHours = isOvercommitted ? totalCommittedHours - 168 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Clock}
            title="Study Hours per Credit Hour & Workload Calculator"
            description="Apply the collegiate Carnegie 2:1 / 3:1 study hour rule to estimate weekly academic commitment and free time."
          />
          <ResetButton onReset={() => {
            setCreditHours(15);
            setStudyRatio(2);
            setWorkHours(15);
            setSleepHoursPerDay(8);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Enrolled Credit Hours"
            type="number"
            min={1}
            max={30}
            value={creditHours}
            onChange={(e) => setCreditHours(Math.max(1, Number(e.target.value)))}
          />
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Study Ratio (Hrs : Credit)
            </label>
            <select
              value={studyRatio}
              onChange={(e) => setStudyRatio(Number(e.target.value))}
              className="w-full text-sm font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value={2}>Standard 2:1 Rule (Carnegie Unit)</option>
              <option value={3}>Rigorous / STEM 3:1 Rule</option>
              <option value={1}>Light / Survey Course 1:1</option>
            </select>
          </div>
          <InputField
            label="Weekly Job / Internship Hrs"
            type="number"
            min={0}
            max={60}
            value={workHours}
            onChange={(e) => setWorkHours(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Sleep Hours per Day"
            type="number"
            min={4}
            max={12}
            value={sleepHoursPerDay}
            onChange={(e) => setSleepHoursPerDay(Math.max(4, Number(e.target.value)))}
          />
        </div>

        {isOvercommitted && (
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-900 text-xs leading-relaxed">
            <strong>Schedule Overload Alert:</strong> Your total commitments ({totalCommittedHours} hours) exceed the 168 hours available in a week by <strong>{deficitHours} hours</strong>. This schedule cuts into vital sleep or leads to academic burnout. Consider reducing course load or outside work hours.
          </div>
        )}

        <ResultCard variant="dark" title="Weekly Time Budget (168 Total Hours)">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Outside Study</span>
              <p className="text-4xl font-extrabold text-indigo-300 mt-1">{outsideStudyHours} hrs</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{studyRatio}h per credit/wk</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Academic</span>
              <p className="text-4xl font-extrabold text-white mt-1">{totalAcademicHours} hrs</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Class ({inClassHours}h) + Study</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Committed Time</span>
              <p className="text-4xl font-extrabold text-amber-300 mt-1">{totalCommittedHours} hrs</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Study + Work + Sleep</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Free / Social Time</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">{freeHoursPerWeek} hrs</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{(freeHoursPerWeek / 7).toFixed(1)} hrs/day</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
