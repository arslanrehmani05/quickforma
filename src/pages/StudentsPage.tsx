import React, { useState } from 'react';
import { ToolMetadata } from '../types';
import { ToolCard } from '../components/layout/ToolCard';
import { ShareSection } from '../components/social/ShareSection';
import { GraduationCap, Search, Shield, Lock, Cpu, Sparkles, X, Award, FileText, Clock } from 'lucide-react';

interface StudentsPageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

// Student Hub categories mapping to tool IDs across 9 Academic Systems
const STUDENT_CATEGORIES = [
  { id: 'all', name: 'All Student Tools' },
  { id: 'grades', name: 'Grades & GPA' },
  { id: 'math', name: 'Mathematics' },
  { id: 'stats', name: 'Statistics & Probability' },
  { id: 'chem', name: 'Chemistry' },
  { id: 'physics', name: 'Physics' },
  { id: 'writing', name: 'Academic Writing & Research' },
  { id: 'study', name: 'Study & Productivity' },
  { id: 'finance', name: 'Student Finance' },
  { id: 'conversions', name: 'Academic Conversions' },
];

const GRADES_GPA_TOOL_IDS = [
  'gpa-calculator',
  'cumulative-gpa-calculator',
  'final-grade-calculator',
  'weighted-grade-calculator',
  'target-gpa-planner-calculator',
  'attendance-calculator',
  'marks-percentage-converter',
];

const MATH_TOOL_IDS = [
  'fraction-calculator',
  'percentage-calculator',
  'ratio-proportion-calculator',
  'average-calculator',
  'scientific-notation-calculator',
  'exponent-logarithm-calculator',
  'linear-equation-calculator',
  'quadratic-formula-calculator',
  'distance-midpoint-calculator',
  'sequence-series-calculator',
  'pythagorean-theorem-calculator',
  'triangle-area-solver',
  'circle-calculator',
  'geometry-area-volume-calculator',
  'trigonometry-calculator',
  'law-of-sines-cosines-calculator',
  'derivative-limit-calculator',
];

const STATS_TOOL_IDS = [
  'descriptive-statistics-calculator',
  'z-score-calculator',
  'probability-calculator',
  'permutation-combination-calculator',
  'probability-distributions-calculator',
  'confidence-interval-calculator',
  'hypothesis-test-calculator',
];

const CHEM_TOOL_IDS = [
  'molar-mass-calculator',
  'moles-molarity-calculator',
  'dilution-calculator',
  'ph-poh-calculator',
  'stoichiometry-percent-yield-calculator',
  'gas-laws-calculator',
  'significant-figures-calculator',
];

const PHYSICS_TOOL_IDS = [
  'kinematics-motion-calculator',
  'force-friction-momentum-calculator',
  'work-energy-power-calculator',
  'ohms-law-electrical-calculator',
  'wave-frequency-speed-calculator',
];

const WRITING_TOOL_IDS = [
  'word-counter',
  'reading-presentation-time-calculator',
  'essay-page-count-calculator',
  'academic-readability-analyzer',
  'citation-formatter',
  'pdf-page-counter',
  'text-diff-checker',
];

const STUDY_TOOL_IDS = [
  'pomodoro-timer',
  'study-schedule-time-calculator',
  'exam-assignment-countdown',
  'date-difference-calculator',
];

const FINANCE_TOOL_IDS = [
  'student-budget-planner',
  'cost-per-credit-hour-calculator',
  'student-loan-payoff-calculator',
  'roommate-rent-split-calculator',
];

const CONVERSIONS_TOOL_IDS = [
  'gpa-scale-converter',
  'marks-to-gpa-converter',
  'unit-converter',
];

const ALL_STUDENT_TOOL_IDS = Array.from(new Set([
  ...GRADES_GPA_TOOL_IDS,
  ...MATH_TOOL_IDS,
  ...STATS_TOOL_IDS,
  ...CHEM_TOOL_IDS,
  ...PHYSICS_TOOL_IDS,
  ...WRITING_TOOL_IDS,
  ...STUDY_TOOL_IDS,
  ...FINANCE_TOOL_IDS,
  ...CONVERSIONS_TOOL_IDS,
]));

export const StudentsPage: React.FC<StudentsPageProps> = ({ tools, onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Retrieve student tools
  const studentTools = ALL_STUDENT_TOOL_IDS
    .map(id => tools.find(t => t.id === id))
    .filter((t): t is ToolMetadata => t !== undefined);

  // Filter tools by category and search query
  const filteredTools = studentTools.filter(tool => {
    let matchesCategory = true;
    if (selectedCategory === 'grades') matchesCategory = GRADES_GPA_TOOL_IDS.includes(tool.id);
    else if (selectedCategory === 'math') matchesCategory = MATH_TOOL_IDS.includes(tool.id);
    else if (selectedCategory === 'stats') matchesCategory = STATS_TOOL_IDS.includes(tool.id);
    else if (selectedCategory === 'chem') matchesCategory = CHEM_TOOL_IDS.includes(tool.id);
    else if (selectedCategory === 'physics') matchesCategory = PHYSICS_TOOL_IDS.includes(tool.id);
    else if (selectedCategory === 'writing') matchesCategory = WRITING_TOOL_IDS.includes(tool.id);
    else if (selectedCategory === 'study') matchesCategory = STUDY_TOOL_IDS.includes(tool.id);
    else if (selectedCategory === 'finance') matchesCategory = FINANCE_TOOL_IDS.includes(tool.id);
    else if (selectedCategory === 'conversions') matchesCategory = CONVERSIONS_TOOL_IDS.includes(tool.id);

    const q = searchQuery.toLowerCase();
    const matchesSearch = tool.name.toLowerCase().includes(q) ||
                          tool.description.toLowerCase().includes(q) ||
                          tool.keywords.some(k => k.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-4xl mx-auto px-4 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
          <span>QuickForma Students • Academic Utilities</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Free Student Tools & Academic Calculators
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Zero sign-ups, zero email paywalls, and zero server uploads. Every GPA calculation, grade estimate, word count, and study timer executes locally in your browser memory.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 pt-2 font-medium">
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600" /> 100% Private Client-Side Engine
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-indigo-600" /> Zero Academic Data Uploads
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-amber-600" /> Sub-50ms Calculation
          </div>
        </div>

        <ShareSection align="center" className="pt-2 max-w-xl mx-auto border-t-0" />
      </section>

      {/* Category Tabs & Search Bar */}
      <section className="space-y-6 max-w-5xl mx-auto px-4">
        {/* Search Box */}
        <div className="relative w-full max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student tools (e.g. gpa, final grade, word counter, pomodoro)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-sans shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto border-b border-slate-200 pb-4 px-2">
          {STUDENT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-[1.02]'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-slate-800 font-bold text-base mb-1">No Student Tools Found</h3>
            <p className="text-slate-500 text-xs">Try searching for terms like "gpa", "final grade", "word count", or "timer".</p>
          </div>
        )}
      </section>

      {/* SEO / Trust Section */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 text-slate-600 text-sm shadow-xs max-w-5xl mx-auto px-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          Why Students & Educators Use QuickForma Academic Utilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900 text-sm">Uncompromising RAM Privacy</h3>
            <p className="leading-relaxed">
              Academic records and course grades are sensitive. QuickForma processes 100% of GPA calculations, grade estimates, and text analysis locally inside your browser memory without server tracking.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900 text-sm">Sub-50ms Zero Latency</h3>
            <p className="leading-relaxed">
              Without roundtrip server calls or external database queries, final exam target grades and credit-weighted GPAs update instantly as you type.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900 text-sm">Zero Paywalls & Forced Signups</h3>
            <p className="leading-relaxed">
              No subscription paywalls or account creation required. 100% free academic utilities built for high school, college, and university students.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
