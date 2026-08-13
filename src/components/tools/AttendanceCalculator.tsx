import React, { useState, useMemo } from 'react';
import { Clock } from 'lucide-react';
import { calculateAttendance } from '../../utils/math/gradeEngine';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ComplexDashboardTemplate } from '../templates/ComplexDashboardTemplate';

export const AttendanceCalculator: React.FC = () => {
  const [attendedClasses, setAttendedClasses] = useState<number>(34);
  const [totalClassesHeld, setTotalClassesHeld] = useState<number>(40);
  const [targetAttendancePct, setTargetAttendancePct] = useState<number>(85);
  const [totalSemesterClasses, setTotalSemesterClasses] = useState<number>(45);

  const result = useMemo(() => {
    return calculateAttendance(attendedClasses, totalClassesHeld, targetAttendancePct, totalSemesterClasses);
  }, [attendedClasses, totalClassesHeld, targetAttendancePct, totalSemesterClasses]);

  return (
    <ComplexDashboardTemplate
      header={
        <ToolHeader
          icon={Clock}
          title="Attendance & Absence Calculator"
          description="Calculate your current attendance percentage, how many classes you can skip without missing requirements, or how many you must attend to recover."
        />
      }
      inputs={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="Classes Attended So Far"
            type="number"
            min="0"
            value={attendedClasses}
            onChange={(e) => setAttendedClasses(parseFloat(e.target.value) || 0)}
            inputMode="numeric"
          />
          <InputField
            label="Total Classes Conducted So Far"
            type="number"
            min="1"
            value={totalClassesHeld}
            onChange={(e) => setTotalClassesHeld(parseFloat(e.target.value) || 1)}
            inputMode="numeric"
          />
          <InputField
            label="Required Target Attendance (%)"
            type="number"
            min="0"
            max="100"
            value={targetAttendancePct}
            onChange={(e) => setTargetAttendancePct(parseFloat(e.target.value) || 0)}
            suffix="%"
            inputMode="decimal"
          />
          <InputField
            label="Total Classes in Full Semester (Optional)"
            type="number"
            min={totalClassesHeld}
            value={totalSemesterClasses}
            onChange={(e) => setTotalSemesterClasses(parseFloat(e.target.value) || 0)}
            inputMode="numeric"
          />
        </div>
      }
      resultDashboard={
        <ResultCard variant="dark" title="Attendance Status Result">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1 font-semibold">Current Attendance</div>
              <div
                className={`text-3xl sm:text-4xl font-extrabold font-mono ${
                  result.currentPct >= targetAttendancePct ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {result.currentPct}%
              </div>
              <div className="text-[11px] text-indigo-300 mt-1">Target: {targetAttendancePct}%</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1 font-semibold">Classes You Can Skip</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-mono">
                {result.classesCanSkip}
              </div>
              <div className="text-[11px] text-indigo-300 mt-1">while staying above {targetAttendancePct}%</div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="text-xs text-indigo-200 mb-1 font-semibold">Recovery Classes Needed</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                {result.classesNeededToAttend}
              </div>
              <div className="text-[11px] text-indigo-300 mt-1">must attend consecutively</div>
            </div>
          </div>
        </ResultCard>
      }
    />
  );
};
