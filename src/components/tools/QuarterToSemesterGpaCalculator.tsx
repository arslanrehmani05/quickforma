import React, { useState } from "react";
import { GraduationCap, ArrowLeftRight, Calculator, Info } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const QuarterToSemesterGpaCalculator: React.FC = () => {
  const [quarterUnits, setQuarterUnits] = useState<number>(90);
  const [quarterGpa, setQuarterGpa] = useState<number>(3.65);

  const qUnits = Math.max(0, quarterUnits || 0);
  const qGpa = Math.max(0, Math.min(4.0, quarterGpa || 0));

  // US Standard Collegiate Conversion: 1 Quarter Unit = 2/3 (0.6667) Semester Credit
  const semesterCredits = qUnits * (2 / 3);
  // Quarter Quality Points = Quarter Units * Quarter GPA
  const quarterQualityPoints = qUnits * qGpa;
  // Semester Quality Points = Semester Credits * Semester GPA = Quarter Quality Points * (2/3)
  const semesterQualityPoints = semesterCredits * qGpa;
  // Grade Point Average remains invariant across credit systems
  const semesterGpa = qGpa;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GraduationCap}
            title="Quarter Unit to Semester Credit GPA Converter"
            description="Convert college academic credits between quarter terms and semester hours with mathematically synchronized quality points."
          />
          <ResetButton onReset={() => {
            setQuarterUnits(90);
            setQuarterGpa(3.65);
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="Quarter Units Completed"
              type="number"
              min={0}
              step="0.5"
              value={quarterUnits}
              onChange={(e) => setQuarterUnits(Math.max(0, Number(e.target.value)))}
              helpText="Standard US full-time academic year is 45 quarter units (3 quarters of 15 units)."
            />
            <InputField
              label="Cumulative Quarter GPA (4.0 Scale)"
              type="number"
              min={0}
              max={4.0}
              step="0.01"
              value={quarterGpa}
              onChange={(e) => setQuarterGpa(Math.max(0, Math.min(4.0, Number(e.target.value))))}
              helpText="Cumulative Grade Point Average on standard 4.0 scale."
            />

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Info className="w-3.5 h-3.5 text-indigo-600" /> Mathematical Conversion Standard
              </div>
              <p>
                1 Semester Credit = 1.5 Quarter Units (ratio 2/3 or 0.6667). Grade point averages (GPA) remain unchanged. Total grade quality points scale down by exactly 2/3 so Quality Points ÷ Credits = GPA is conserved.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="Converted Semester Standing">
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">Equivalent Semester Credits</div>
                  <div className="text-4xl font-extrabold text-white">{semesterCredits.toFixed(1)} Credits</div>
                  <div className="text-xs text-indigo-200 mt-1">
                    {qUnits} Quarter Units × 2/3 = {semesterCredits.toFixed(2)} Semester Credits
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                    <span className="text-slate-400">Equivalent Semester GPA:</span>
                    <p className="text-emerald-300 font-bold text-lg mt-0.5">{semesterGpa.toFixed(2)}</p>
                    <span className="text-[10px] text-slate-400">Scale Invariant (4.0)</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                    <span className="text-slate-400">Semester Quality Points:</span>
                    <p className="text-white font-bold text-lg mt-0.5">{semesterQualityPoints.toFixed(1)}</p>
                    <span className="text-[10px] text-indigo-200">{semesterCredits.toFixed(1)} cr × {semesterGpa.toFixed(2)} GPA</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-300 flex justify-between">
                  <span>Original Quarter Quality Points:</span>
                  <span className="font-mono text-white font-bold">{quarterQualityPoints.toFixed(1)} pts</span>
                </div>
              </div>
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
