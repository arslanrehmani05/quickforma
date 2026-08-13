import React, { useState, useMemo } from 'react';
import { Clock, CheckCircle2, AlertTriangle, Sparkles, BookOpen } from 'lucide-react';
import { calculateAttendance } from '../../utils/math/gradeEngine';

export const AttendanceCalculator: React.FC = () => {
  const [attendedClasses, setAttendedClasses] = useState<number>(34);
  const [totalClassesHeld, setTotalClassesHeld] = useState<number>(40);
  const [targetAttendancePct, setTargetAttendancePct] = useState<number>(85);
  const [totalSemesterClasses, setTotalSemesterClasses] = useState<number>(45);

  const result = useMemo(() => {
    return calculateAttendance(attendedClasses, totalClassesHeld, targetAttendancePct, totalSemesterClasses);
  }, [attendedClasses, totalClassesHeld, targetAttendancePct, totalSemesterClasses]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Inputs */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Attendance & Absence Calculator</h2>
            <p className="text-xs text-slate-500">
              Calculate your current attendance percentage, how many classes you can skip without missing requirement, or how many you must attend to recover.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Classes Attended So Far
            </label>
            <input
              type="number"
              min="0"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Total Classes Conducted So Far
            </label>
            <input
              type="number"
              min="1"
              value={totalClassesHeld}
              onChange={(e) => setTotalClassesHeld(parseFloat(e.target.value) || 1)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Required Target Attendance (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={targetAttendancePct}
              onChange={(e) => setTargetAttendancePct(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Total Classes in Full Semester (Optional)
            </label>
            <input
              type="number"
              min={totalClassesHeld}
              value={totalSemesterClasses}
              onChange={(e) => setTotalSemesterClasses(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Attendance Status Result
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
            Client-Side RAM Only
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Current Attendance</div>
            <div className={`text-3xl sm:text-4xl font-extrabold font-mono ${result.currentPct >= targetAttendancePct ? 'text-emerald-400' : 'text-rose-400'}`}>
              {result.currentPct}%
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              Target: {targetAttendancePct}%
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Classes You Can Skip</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-300 font-mono">
              {result.classesCanSkip}
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              while staying above {targetAttendancePct}%
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-indigo-200 mb-1">Recovery Classes Needed</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
              {result.classesNeededToAttend}
            </div>
            <div className="text-[11px] text-indigo-300 mt-1">
              must attend consecutively
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
