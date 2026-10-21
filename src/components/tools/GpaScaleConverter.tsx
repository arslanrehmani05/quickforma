import React, { useState, useMemo } from 'react';
import { Sparkles, GraduationCap, Info, AlertCircle } from 'lucide-react';
import { convertGpaScale, GpaScaleType } from '../../utils/calculators/gpaScale';

export const GpaScaleConverter: React.FC = () => {
  const [sourceGpa, setSourceGpa] = useState<number>(3.6);
  const [sourceScale, setSourceScale] = useState<GpaScaleType>(4.0);

  const result = useMemo(() => {
    return convertGpaScale({
      gpa: sourceGpa,
      scale: sourceScale,
    });
  }, [sourceGpa, sourceScale]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. Interactive Tool Widget */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">GPA Scale Converter</h2>
            <p className="text-xs text-slate-500">
              Convert GPAs across US 4.0, 4.33, and 5.0 weighted scales with authentic letter grade and College Board curve equivalencies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Current GPA</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max={sourceScale}
              value={sourceGpa}
              onChange={(e) => setSourceGpa(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-mono text-center outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Grading Scale</label>
            <div className="flex gap-2">
              {([4.0, 4.33, 5.0] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => setSourceScale(sc)}
                  className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                    sourceScale === sc 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sc} Scale
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Results Box: Academic Grade Equivalency */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
          <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" /> Academic Grade Equivalency
          </span>
          <span className="text-[11px] text-indigo-300 bg-white/10 px-2.5 py-0.5 rounded-full font-medium">
            US Standard
          </span>
        </div>

        {/* Highlighted Letter Grade & US Percentage Curve */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
            <div className="text-xs text-indigo-200 mb-1">Standard Letter Grade</div>
            <div className="text-4xl font-extrabold text-amber-300 font-mono">{result.letterGrade}</div>
            <div className="text-[11px] text-indigo-200 mt-1">{result.academicClassification}</div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
            <div className="text-xs text-indigo-200 mb-1">US College Board Curve Range</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">{result.percentageRange}</div>
            <div className="text-[11px] text-indigo-200 mt-1">Non-linear academic interval</div>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
            <div className="text-xs text-indigo-200 mb-1">Unweighted 4.0 Equivalent</div>
            <div className="text-4xl font-extrabold text-white font-mono">{result.unweightedGpa4_0.toFixed(2)}</div>
            <div className="text-[11px] text-indigo-200 mt-1">Max 4.0 baseline</div>
          </div>
        </div>

        {/* Scale Normalization Breakdown */}
        <div className="pt-2">
          <div className="text-xs font-semibold text-indigo-300 mb-3 uppercase tracking-wider">
            Arithmetic Scale Normalization
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-black/20 p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-indigo-200 mb-0.5">4.33 Scale</div>
              <div className="text-lg font-bold font-mono text-white">{result.scale4_33.toFixed(2)}</div>
            </div>
            <div className="bg-black/20 p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-indigo-200 mb-0.5">5.0 Scale (Weighted)</div>
              <div className="text-lg font-bold font-mono text-white">{result.scale5_0.toFixed(2)}</div>
            </div>
            <div className="bg-black/20 p-3 rounded-xl border border-white/5">
              <div className="text-[11px] text-indigo-200 mb-0.5">Arithmetic Ratio</div>
              <div className="text-lg font-bold font-mono text-indigo-300">{result.proportionalPercentage}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Academic Policy Guidance & Limitations */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>Grading Policy Context & Limitations</span>
        </div>
        <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
          {result.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
          <li>
            Linear percentage ratios (e.g. 3.0 / 4.0 = 75%) misrepresent US grading because passing grades begin at 60–65%, not 0%. A 3.0 represents a solid B average (83–86%).
          </li>
        </ul>
      </div>
    </div>
  );
};
