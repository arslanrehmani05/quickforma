import React, { useState } from "react";
import { GraduationCap, School, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

interface Institution {
  id: string;
  name: string;
  credits: number;
  gpa: number;
}

export const TransferCreditGpaCalculator: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([
    { id: "1", name: "Community College / Prior College", credits: 45, gpa: 3.40 },
    { id: "2", name: "Current University", credits: 30, gpa: 3.75 },
  ]);

  const totalCredits = institutions.reduce((sum, inst) => sum + Math.max(0, Number(inst.credits) || 0), 0);
  const totalQualityPoints = institutions.reduce((sum, inst) => {
    const cred = Math.max(0, Number(inst.credits) || 0);
    const g = Math.min(4.0, Math.max(0, Number(inst.gpa) || 0));
    return sum + cred * g;
  }, 0);
  const combinedGpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  const addInstitution = () => {
    setInstitutions([...institutions, { id: Date.now().toString(), name: "Summer Session / Third College", credits: 12, gpa: 3.5 }]);
  };

  const removeInstitution = (id: string) => {
    if (institutions.length > 1) setInstitutions(institutions.filter((i) => i.id !== id));
  };

  const updateInstitution = (id: string, field: keyof Institution, val: any) => {
    const cleanVal = field === "credits" ? Math.max(0, Number(val) || 0) : field === "gpa" ? Math.min(4.0, Math.max(0, Number(val) || 0)) : val;
    setInstitutions(institutions.map((i) => (i.id === id ? { ...i, [field]: cleanVal } : i)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GraduationCap}
            title="Transfer Credit Combined GPA Calculator"
            description="Calculate your overall cumulative collegiate GPA by combining credits and GPAs from prior and current colleges."
          />
          <ResetButton onReset={() => {
            setInstitutions([
              { id: "1", name: "Community College / Prior College", credits: 45, gpa: 3.40 },
              { id: "2", name: "Current University", credits: 30, gpa: 3.75 },
            ]);
          }} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Institutions Attended</h3>
            <button
              onClick={addInstitution}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add College
            </button>
          </div>

          <div className="space-y-2">
            {institutions.map((inst) => (
              <div key={inst.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={inst.name}
                    onChange={(e) => updateInstitution(inst.id, "name", e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">Credits:</span>
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={inst.credits}
                      onChange={(e) => updateInstitution(inst.id, "credits", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">GPA:</span>
                    <input
                      type="number"
                      min={0}
                      max={4.0}
                      step={0.01}
                      value={inst.gpa}
                      onChange={(e) => updateInstitution(inst.id, "gpa", Number(e.target.value))}
                      className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={() => removeInstitution(inst.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ResultCard variant="dark" title="Combined Academic Standing">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Combined Cumulative GPA</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-1">
                {totalCredits > 0 ? combinedGpa.toFixed(2) : "—"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">
                {totalCredits > 0 ? `Total Quality Pts: ${totalQualityPoints.toFixed(1)}` : "No credits entered"}
              </span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Completed Credits</span>
              <p className="text-4xl font-extrabold text-white mt-1">{totalCredits}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Across all institutions</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Graduation Standing</span>
              <p className="text-sm font-bold text-white mt-1">
                {totalCredits === 0 ? "—" : combinedGpa >= 3.8 ? "Summa Cum Laude" : combinedGpa >= 3.5 ? "Magna Cum Laude" : combinedGpa >= 3.0 ? "Good Standing" : "Satisfactory"}
              </p>
            </div>
          </div>
        </ResultCard>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 text-xs leading-relaxed">
          <strong>US Collegiate Transfer Policy Disclosure:</strong> Most US universities accept transfer credits toward general degree completion, but compute institutional Latin honors solely on credits taken in residence. However, graduate school central applications (AMCAS for Medical, LSAC for Law, SOPHAS, PTCAS) recalculate all attempted undergraduate coursework across all institutions into one standardized cumulative GPA.
        </div>
      </div>
    </div>
  );
};
