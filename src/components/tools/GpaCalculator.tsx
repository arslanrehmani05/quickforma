import React, { useState, useMemo } from 'react';
import { GraduationCap, Plus, Trash2, Calculator, Target, TrendingUp, BookOpen, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

// Standard US 4.0 Letter Grade to Grade Point Mapping
const STANDARD_GRADE_SCALE: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.67,
  'B+': 3.33,
  'B': 3.0,
  'B-': 2.67,
  'C+': 2.33,
  'C': 2.0,
  'C-': 1.67,
  'D+': 1.33,
  'D': 1.0,
  'D-': 0.67,
  'F': 0.0,
};

interface CourseRow {
  id: string;
  name: string;
  credits: number;
  grade: string;
  whatIfGrade?: string;
  type?: 'regular' | 'honors' | 'ap' | 'ib';
}

type Mode = 'semester' | 'cumulative' | 'target' | 'whatif' | 'highschool';
type HighSchoolWeightType = 'unweighted' | 'weighted' | 'custom';

export const GpaCalculator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('semester');

  // Mode 1: Semester GPA State
  const [semesterCourses, setSemesterCourses] = useState<CourseRow[]>([
    { id: '1', name: 'Biology 101', credits: 4, grade: 'A' },
    { id: '2', name: 'English Composition', credits: 3, grade: 'B+' },
    { id: '3', name: 'Calculus I', credits: 4, grade: 'A-' },
    { id: '4', name: 'World History', credits: 3, grade: 'B' },
  ]);

  // Mode 2: Cumulative GPA State
  const [currentGpa, setCurrentGpa] = useState<number>(3.25);
  const [completedCredits, setCompletedCredits] = useState<number>(45);
  const [newCourses, setNewCourses] = useState<CourseRow[]>([
    { id: 'c1', name: 'Physics I', credits: 4, grade: 'A' },
    { id: 'c2', name: 'Organic Chemistry', credits: 4, grade: 'B+' },
    { id: 'c3', name: 'Psychology', credits: 3, grade: 'A' },
  ]);

  // Mode 3: Target GPA Needed State
  const [targetCurrentGpa, setTargetCurrentGpa] = useState<number>(2.95);
  const [targetCompletedCredits, setTargetCompletedCredits] = useState<number>(45);
  const [targetRemainingCredits, setTargetRemainingCredits] = useState<number>(60);
  const [targetGoalGpa, setTargetGoalGpa] = useState<number>(3.30);

  // Mode 4: What-If Scenario State
  const [whatIfCourses, setWhatIfCourses] = useState<CourseRow[]>([
    { id: 'w1', name: 'Biology 101', credits: 4, grade: 'A', whatIfGrade: 'A' },
    { id: 'w2', name: 'Organic Chemistry', credits: 4, grade: 'B', whatIfGrade: 'A-' },
    { id: 'w3', name: 'Calculus I', credits: 4, grade: 'B+', whatIfGrade: 'A' },
    { id: 'w4', name: 'Microeconomics', credits: 3, grade: 'B-', whatIfGrade: 'B+' },
  ]);

  // Mode 5: High School GPA State
  const [hsWeightType, setHsWeightType] = useState<HighSchoolWeightType>('weighted');
  const [hsCourses, setHsCourses] = useState<CourseRow[]>([
    { id: 'h1', name: 'AP English Literature', credits: 1, grade: 'A', type: 'ap' },
    { id: 'h2', name: 'Honors Chemistry', credits: 1, grade: 'A-', type: 'honors' },
    { id: 'h3', name: 'Algebra II', credits: 1, grade: 'B+', type: 'regular' },
    { id: 'h4', name: 'AP US History', credits: 1, grade: 'A', type: 'ap' },
  ]);

  // Custom Grade Point Mapping State
  const [customGradePoints, setCustomGradePoints] = useState<Record<string, number>>({
    'A+': 4.33,
    'A': 4.0,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.0,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.0,
    'C-': 1.67,
    'D+': 1.33,
    'D': 1.0,
    'D-': 0.67,
    'F': 0.0,
  });

  // --- Handlers for Course Management ---
  const addCourse = (type: Mode) => {
    const newId = Date.now().toString();
    const defaultRow: CourseRow = { id: newId, name: '', credits: 3, grade: 'A', whatIfGrade: 'A', type: 'regular' };
    if (type === 'semester') setSemesterCourses(prev => [...prev, defaultRow]);
    else if (type === 'cumulative') setNewCourses(prev => [...prev, defaultRow]);
    else if (type === 'whatif') setWhatIfCourses(prev => [...prev, defaultRow]);
    else if (type === 'highschool') setHsCourses(prev => [...prev, { ...defaultRow, credits: 1 }]);
  };

  const removeCourse = (id: string, type: Mode) => {
    if (type === 'semester') setSemesterCourses(prev => prev.filter(c => c.id !== id));
    else if (type === 'cumulative') setNewCourses(prev => prev.filter(c => c.id !== id));
    else if (type === 'whatif') setWhatIfCourses(prev => prev.filter(c => c.id !== id));
    else if (type === 'highschool') setHsCourses(prev => prev.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseRow, value: any, type: Mode) => {
    const updater = (prev: CourseRow[]) =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c));
    if (type === 'semester') setSemesterCourses(updater);
    else if (type === 'cumulative') setNewCourses(updater);
    else if (type === 'whatif') setWhatIfCourses(updater);
    else if (type === 'highschool') setHsCourses(updater);
  };

  // --- Calculations ---

  // 1. Semester GPA Calculation
  const semesterCalc = useMemo(() => {
    let totalQualityPoints = 0;
    let totalCredits = 0;
    semesterCourses.forEach(c => {
      const cr = Math.max(0, Number(c.credits) || 0);
      const points = STANDARD_GRADE_SCALE[c.grade] ?? 0;
      totalQualityPoints += points * cr;
      totalCredits += cr;
    });
    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
    return { gpa, totalQualityPoints, totalCredits };
  }, [semesterCourses]);

  // 2. Cumulative GPA Projection Calculation
  const cumulativeCalc = useMemo(() => {
    const prevQualityPoints = Math.max(0, currentGpa) * Math.max(0, completedCredits);
    let newQualityPoints = 0;
    let newCredits = 0;

    newCourses.forEach(c => {
      const cr = Math.max(0, Number(c.credits) || 0);
      const points = STANDARD_GRADE_SCALE[c.grade] ?? 0;
      newQualityPoints += points * cr;
      newCredits += cr;
    });

    const totalQualityPoints = prevQualityPoints + newQualityPoints;
    const totalCredits = completedCredits + newCredits;
    const projectedGpa = totalCredits > 0 ? totalQualityPoints / totalCredits : currentGpa;
    const gpaChange = projectedGpa - currentGpa;

    return { projectedGpa, gpaChange, totalCredits, totalQualityPoints, newCredits };
  }, [currentGpa, completedCredits, newCourses]);

  // 3. Target GPA Needed Calculation
  const targetCalc = useMemo(() => {
    const remCreds = Math.max(0, targetRemainingCredits);
    const compCreds = Math.max(0, targetCompletedCredits);
    const totalCredits = compCreds + remCreds;
    const prevQualityPoints = Math.max(0, targetCurrentGpa) * compCreds;
    const targetTotalQualityPoints = Math.max(0, targetGoalGpa) * totalCredits;
    const requiredFutureQualityPoints = targetTotalQualityPoints - prevQualityPoints;

    const requiredGpa = remCreds > 0 ? requiredFutureQualityPoints / remCreds : 0;
    const isUnreachable = requiredGpa > 4.0;
    const isAlreadyAchieved = targetGoalGpa <= targetCurrentGpa;

    return { requiredGpa, totalCredits, isUnreachable, isAlreadyAchieved, remCreds };
  }, [targetCurrentGpa, targetCompletedCredits, targetRemainingCredits, targetGoalGpa]);

  // 4. What-If Scenario Calculation
  const whatIfCalc = useMemo(() => {
    let originalQualityPoints = 0;
    let whatIfQualityPoints = 0;
    let totalCredits = 0;

    whatIfCourses.forEach(c => {
      const cr = Math.max(0, Number(c.credits) || 0);
      const origPts = STANDARD_GRADE_SCALE[c.grade] ?? 0;
      const whatIfPts = STANDARD_GRADE_SCALE[c.whatIfGrade || c.grade] ?? 0;

      originalQualityPoints += origPts * cr;
      whatIfQualityPoints += whatIfPts * cr;
      totalCredits += cr;
    });

    const originalGpa = totalCredits > 0 ? originalQualityPoints / totalCredits : 0;
    const whatIfGpa = totalCredits > 0 ? whatIfQualityPoints / totalCredits : 0;
    const difference = whatIfGpa - originalGpa;

    return { originalGpa, whatIfGpa, difference, totalCredits };
  }, [whatIfCourses]);

  // 5. High School GPA Calculation
  const hsCalc = useMemo(() => {
    let unweightedPoints = 0;
    let weightedPoints = 0;
    let totalCourses = 0;

    hsCourses.forEach(c => {
      const basePoints = hsWeightType === 'custom'
        ? (customGradePoints[c.grade] ?? 0)
        : (STANDARD_GRADE_SCALE[c.grade] ?? 0);

      let weightAdd = 0;
      if (hsWeightType === 'weighted') {
        if (c.type === 'ap' || c.type === 'ib') weightAdd = 1.0;
        else if (c.type === 'honors') weightAdd = 0.5;
      }

      unweightedPoints += basePoints;
      weightedPoints += basePoints + weightAdd;
      totalCourses += 1;
    });

    const unweightedGpa = totalCourses > 0 ? unweightedPoints / totalCourses : 0;
    const weightedGpa = totalCourses > 0 ? weightedPoints / totalCourses : 0;

    return { unweightedGpa, weightedGpa, totalCourses };
  }, [hsCourses, hsWeightType, customGradePoints]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Main Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        {/* Tool Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">GPA Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate semester GPA, cumulative projections, target GPA goals, hypothetical what-if scenarios, and high school GPAs.</p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveMode('semester')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'semester'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Semester GPA</span>
          </button>

          <button
            onClick={() => setActiveMode('cumulative')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'cumulative'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Cumulative GPA</span>
          </button>

          <button
            onClick={() => setActiveMode('target')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'target'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Target GPA Needed</span>
          </button>

          <button
            onClick={() => setActiveMode('whatif')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'whatif'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>What-If Scenario</span>
          </button>

          <button
            onClick={() => setActiveMode('highschool')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all ${
              activeMode === 'highschool'
                ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>High School GPA</span>
          </button>
        </div>

        {/* ================= MODE 1: SEMESTER GPA ================= */}
        {activeMode === 'semester' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Courses & Grades</label>
                <span className="text-xs text-slate-500 font-mono">Standard 4.0 Scale</span>
              </div>

              <div className="space-y-3">
                {semesterCourses.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <input
                      type="text"
                      placeholder="Course Name (e.g. Biology)"
                      value={c.name}
                      onChange={(e) => updateCourse(c.id, 'name', e.target.value, 'semester')}
                      className="col-span-5 sm:col-span-6 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    />

                    <select
                      value={c.credits}
                      onChange={(e) => updateCourse(c.id, 'credits', Number(e.target.value), 'semester')}
                      className="col-span-3 sm:col-span-3 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    >
                      <option value={1}>1 Credit</option>
                      <option value={2}>2 Credits</option>
                      <option value={3}>3 Credits</option>
                      <option value={4}>4 Credits</option>
                      <option value={5}>5 Credits</option>
                      <option value={0.5}>0.5 Credits</option>
                    </select>

                    <select
                      value={c.grade}
                      onChange={(e) => updateCourse(c.id, 'grade', e.target.value, 'semester')}
                      className="col-span-3 sm:col-span-2 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    >
                      {Object.keys(STANDARD_GRADE_SCALE).map(g => (
                        <option key={g} value={g}>{g} ({STANDARD_GRADE_SCALE[g].toFixed(2)})</option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeCourse(c.id, 'semester')}
                      disabled={semesterCourses.length <= 1}
                      className="col-span-1 p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors flex justify-center"
                      title="Remove Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addCourse('semester')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-indigo-600 hover:bg-indigo-50/50 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Course</span>
              </button>
            </div>

            {/* Result Display */}
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">YOUR SEMESTER GPA</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 mt-1 tracking-tight">
                    {semesterCalc.gpa.toFixed(2)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="text-slate-500 block text-[10px] font-semibold uppercase">Total Quality Points</span>
                    <span className="text-slate-900 font-bold text-sm">{semesterCalc.totalQualityPoints.toFixed(2)}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-indigo-100">
                    <span className="text-slate-500 block text-[10px] font-semibold uppercase">Total GPA Credits</span>
                    <span className="text-slate-900 font-bold text-sm">{semesterCalc.totalCredits.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed border-t border-indigo-100 pt-3">
                Calculated by dividing total quality points ({semesterCalc.totalQualityPoints.toFixed(2)}) by total credits ({semesterCalc.totalCredits.toFixed(1)}).
              </p>
            </div>
          </div>
        )}

        {/* ================= MODE 2: CUMULATIVE GPA ================= */}
        {activeMode === 'cumulative' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Current Cumulative GPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={currentGpa}
                  onChange={(e) => setCurrentGpa(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Completed GPA Credits</label>
                <input
                  type="number"
                  min="0"
                  value={completedCredits}
                  onChange={(e) => setCompletedCredits(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* New Courses */}
            <div className="space-y-3">
              <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider block">New Semester Courses</label>

              <div className="space-y-3">
                {newCourses.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={c.name}
                      onChange={(e) => updateCourse(c.id, 'name', e.target.value, 'cumulative')}
                      className="col-span-5 sm:col-span-6 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    />

                    <select
                      value={c.credits}
                      onChange={(e) => updateCourse(c.id, 'credits', Number(e.target.value), 'cumulative')}
                      className="col-span-3 sm:col-span-3 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    >
                      <option value={1}>1 Credit</option>
                      <option value={2}>2 Credits</option>
                      <option value={3}>3 Credits</option>
                      <option value={4}>4 Credits</option>
                    </select>

                    <select
                      value={c.grade}
                      onChange={(e) => updateCourse(c.id, 'grade', e.target.value, 'cumulative')}
                      className="col-span-3 sm:col-span-2 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    >
                      {Object.keys(STANDARD_GRADE_SCALE).map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeCourse(c.id, 'cumulative')}
                      disabled={newCourses.length <= 1}
                      className="col-span-1 p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 flex justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addCourse('cumulative')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-indigo-600 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            {/* Cumulative Result */}
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Current GPA</span>
                  <div className="text-2xl font-bold text-slate-800 mt-0.5">{currentGpa.toFixed(2)}</div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase text-indigo-700">PROJECTED CUMULATIVE GPA</span>
                  <div className="text-4xl font-extrabold text-indigo-950 mt-0.5">{cumulativeCalc.projectedGpa.toFixed(2)}</div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">GPA Change</span>
                  <div className={`text-2xl font-bold mt-0.5 ${cumulativeCalc.gpaChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {cumulativeCalc.gpaChange >= 0 ? `+${cumulativeCalc.gpaChange.toFixed(2)}` : cumulativeCalc.gpaChange.toFixed(2)}
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3">
                Your cumulative GPA will {cumulativeCalc.gpaChange >= 0 ? 'increase' : 'decrease'} by {Math.abs(cumulativeCalc.gpaChange).toFixed(2)} points across {cumulativeCalc.totalCredits} total credits.
              </p>
            </div>
          </div>
        )}

        {/* ================= MODE 3: TARGET GPA NEEDED ================= */}
        {activeMode === 'target' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Current Cumulative GPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={targetCurrentGpa}
                  onChange={(e) => setTargetCurrentGpa(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Completed Credits</label>
                <input
                  type="number"
                  min="0"
                  value={targetCompletedCredits}
                  onChange={(e) => setTargetCompletedCredits(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Remaining Credits</label>
                <input
                  type="number"
                  min="1"
                  value={targetRemainingCredits}
                  onChange={(e) => setTargetRemainingCredits(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Target Cumulative GPA Goal</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={targetGoalGpa}
                  onChange={(e) => setTargetGoalGpa(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Target GPA Result */}
            {targetCalc.remCreds <= 0 ? (
              <div className="p-4 rounded-xl bg-slate-100 text-slate-600 text-xs">
                Please enter remaining credit hours (e.g. 15, 30, 60) to calculate required GPA.
              </div>
            ) : targetCalc.isUnreachable ? (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Target Is Mathematically Unreachable</h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    To reach a {targetGoalGpa.toFixed(2)} cumulative GPA, you would need to average a <strong>{targetCalc.requiredGpa.toFixed(2)} GPA</strong> across your remaining {targetRemainingCredits} credits, which exceeds the maximum 4.0 scale limit.
                  </p>
                </div>
              </div>
            ) : targetCalc.isAlreadyAchieved ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Target Already Achieved!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Your current GPA ({targetCurrentGpa.toFixed(2)}) already meets or exceeds your target goal of {targetGoalGpa.toFixed(2)}. Maintain your current average to finish strong!
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase text-indigo-700 tracking-wider">REQUIRED AVERAGE GPA FOR REMAINING CREDITS</span>
                  <div className="text-4xl sm:text-5xl font-extrabold text-indigo-950 mt-1">
                    {targetCalc.requiredGpa.toFixed(2)}
                  </div>
                </div>

                <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3 leading-relaxed">
                  You need to maintain an average GPA of <strong>{targetCalc.requiredGpa.toFixed(2)}</strong> across your remaining {targetRemainingCredits} credits to graduate with a <strong>{targetGoalGpa.toFixed(2)} cumulative GPA</strong>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= MODE 4: WHAT-IF SCENARIO ================= */}
        {activeMode === 'whatif' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 text-xs font-semibold uppercase tracking-wider">Simulate Grade Changes</label>
                <span className="text-xs text-slate-500 font-mono">Original Grade vs What-If Grade</span>
              </div>

              <div className="space-y-3">
                {whatIfCourses.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={c.name}
                      onChange={(e) => updateCourse(c.id, 'name', e.target.value, 'whatif')}
                      className="col-span-4 sm:col-span-4 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    />

                    <select
                      value={c.credits}
                      onChange={(e) => updateCourse(c.id, 'credits', Number(e.target.value), 'whatif')}
                      className="col-span-2 sm:col-span-2 px-2 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    >
                      <option value={1}>1 cr</option>
                      <option value={2}>2 cr</option>
                      <option value={3}>3 cr</option>
                      <option value={4}>4 cr</option>
                    </select>

                    <div className="col-span-5 sm:col-span-5 grid grid-cols-2 gap-1.5">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Current</span>
                        <select
                          value={c.grade}
                          onChange={(e) => updateCourse(c.id, 'grade', e.target.value, 'whatif')}
                          className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold text-xs focus:outline-none focus:border-indigo-600"
                        >
                          {Object.keys(STANDARD_GRADE_SCALE).map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <span className="text-[10px] text-indigo-600 font-bold block uppercase">What-If</span>
                        <select
                          value={c.whatIfGrade || c.grade}
                          onChange={(e) => updateCourse(c.id, 'whatIfGrade', e.target.value, 'whatif')}
                          className="w-full px-2 py-1.5 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-900 font-extrabold text-xs focus:outline-none focus:border-indigo-600"
                        >
                          {Object.keys(STANDARD_GRADE_SCALE).map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => removeCourse(c.id, 'whatif')}
                      disabled={whatIfCourses.length <= 1}
                      className="col-span-1 p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 flex justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addCourse('whatif')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-indigo-600 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add What-If Course</span>
              </button>
            </div>

            {/* What-If Result Comparison */}
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">Original Base GPA</span>
                  <div className="text-2xl font-bold text-slate-800 mt-0.5">{whatIfCalc.originalGpa.toFixed(2)}</div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase text-indigo-700">WHAT-IF PROJECTED GPA</span>
                  <div className="text-4xl font-extrabold text-indigo-950 mt-0.5">{whatIfCalc.whatIfGpa.toFixed(2)}</div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">GPA Impact</span>
                  <div className={`text-2xl font-bold mt-0.5 ${whatIfCalc.difference >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {whatIfCalc.difference >= 0 ? `+${whatIfCalc.difference.toFixed(2)}` : whatIfCalc.difference.toFixed(2)}
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-xs border-t border-indigo-100 pt-3">
                Simulating grade changes result in a <strong>{whatIfCalc.difference >= 0 ? '+' : ''}{whatIfCalc.difference.toFixed(2)} point shift</strong> in your overall GPA across {whatIfCalc.totalCredits} total credit hours.
              </p>
            </div>
          </div>
        )}

        {/* ================= MODE 5: HIGH SCHOOL GPA ================= */}
        {activeMode === 'highschool' && (
          <div className="space-y-6">
            {/* Weighting Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <label className="font-semibold text-slate-700">Weighting Type:</label>
                <div className="flex gap-1">
                  <button
                    onClick={() => setHsWeightType('unweighted')}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all ${hsWeightType === 'unweighted' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Unweighted (4.0)
                  </button>
                  <button
                    onClick={() => setHsWeightType('weighted')}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all ${hsWeightType === 'weighted' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Weighted (AP/Honors/IB)
                  </button>
                  <button
                    onClick={() => setHsWeightType('custom')}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all ${hsWeightType === 'custom' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Custom Scale
                  </button>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed italic">
              Note: AP/IB (+1.0) and Honors (+0.5) represent standard US High School presets. Switch to Custom Scale if your school district uses a custom point policy.
            </p>

            {/* Custom Grade Points Configurator */}
            {hsWeightType === 'custom' && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <h4 className="font-bold text-xs text-amber-900 uppercase tracking-wider">Configure Custom Grade Point Values</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.keys(customGradePoints).map((g) => (
                    <div key={g} className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-amber-200 text-xs">
                      <span className="font-bold text-slate-800 w-6">{g}</span>
                      <input
                        type="number"
                        step="0.01"
                        value={customGradePoints[g]}
                        onChange={(e) => setCustomGradePoints({ ...customGradePoints, [g]: Number(e.target.value) })}
                        className="w-16 px-1.5 py-1 rounded bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Courses List */}
            <div className="space-y-3">
              {hsCourses.map((c) => (
                <div key={c.id} className="grid grid-cols-12 gap-2 sm:gap-3 items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <input
                    type="text"
                    placeholder="High School Course Name"
                    value={c.name}
                    onChange={(e) => updateCourse(c.id, 'name', e.target.value, 'highschool')}
                    className="col-span-5 sm:col-span-5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                  />

                  {hsWeightType === 'weighted' && (
                    <select
                      value={c.type || 'regular'}
                      onChange={(e) => updateCourse(c.id, 'type', e.target.value, 'highschool')}
                      className="col-span-3 sm:col-span-3 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
                    >
                      <option value="regular">Regular (+0.0)</option>
                      <option value="honors">Honors (+0.5)</option>
                      <option value="ap">AP (+1.0)</option>
                      <option value="ib">IB (+1.0)</option>
                    </select>
                  )}

                  <select
                    value={c.grade}
                    onChange={(e) => updateCourse(c.id, 'grade', e.target.value, 'highschool')}
                    className={`${hsWeightType === 'weighted' ? 'col-span-3 sm:col-span-3' : 'col-span-6 sm:col-span-6'} px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold text-xs sm:text-sm focus:outline-none focus:border-indigo-600`}
                  >
                    {Object.keys(STANDARD_GRADE_SCALE).map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeCourse(c.id, 'highschool')}
                    disabled={hsCourses.length <= 1}
                    className="col-span-1 p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 flex justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => addCourse('highschool')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-600 text-indigo-600 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add High School Class</span>
              </button>
            </div>

            {/* High School Result */}
            <div className="p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-500">Unweighted GPA (4.0)</span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">{hsCalc.unweightedGpa.toFixed(2)}</div>
                </div>

                {hsWeightType === 'weighted' && (
                  <div>
                    <span className="text-xs font-bold uppercase text-indigo-700">WEIGHTED GPA (AP/HONORS)</span>
                    <div className="text-4xl font-extrabold text-indigo-950 mt-1">{hsCalc.weightedGpa.toFixed(2)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer Note */}
        <div className="pt-4 border-t border-slate-200 text-slate-500 text-xs leading-relaxed">
          <p>
            <strong>Note:</strong> GPA policies, credit weightings, and letter-grade point mappings vary by institution and school district. QuickForma provides calculations based on standard US grading scales and your explicit inputs. Always cross-check with your official school transcript guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
