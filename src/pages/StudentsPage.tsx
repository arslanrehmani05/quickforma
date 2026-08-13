import React from 'react';
import { ToolMetadata } from '../types';
import { ToolCard } from '../components/layout/ToolCard';
import { GraduationCap, FileText, Clock, Award } from 'lucide-react';

interface StudentsPageProps {
  tools: ToolMetadata[];
  onSelectTool: (id: string) => void;
}

// Curated tool IDs for Students Hub sections
const GRADES_GPA_TOOL_IDS = [
  'gpa-calculator',
];

const ACADEMIC_WORK_TOOL_IDS = [
  'word-counter',
  'pdf-page-counter',
  'text-diff-checker',
  'unit-converter',
];

const STUDY_PRODUCTIVITY_TOOL_IDS = [
  'pomodoro-timer',
  'date-difference-calculator',
];

export const StudentsPage: React.FC<StudentsPageProps> = ({ tools, onSelectTool }) => {
  // Retrieve tool metadata for each curated ID
  const gradesGpaTools = GRADES_GPA_TOOL_IDS
    .map(id => tools.find(t => t.id === id))
    .filter((t): t is ToolMetadata => t !== undefined);

  const academicWorkTools = ACADEMIC_WORK_TOOL_IDS
    .map(id => tools.find(t => t.id === id))
    .filter((t): t is ToolMetadata => t !== undefined);

  const studyProductivityTools = STUDY_PRODUCTIVITY_TOOL_IDS
    .map(id => tools.find(t => t.id === id))
    .filter((t): t is ToolMetadata => t !== undefined);

  return (
    <div className="space-y-12 py-4 max-w-5xl mx-auto px-4">
      {/* Lean Student Hero */}
      <section className="text-center space-y-4 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>QuickForma Students • Academic Utilities</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Free Student Tools & Academic Calculators
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Free tools for students to calculate grades, solve math and science problems, analyze statistics, plan study time, and handle everyday academic work.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-slate-600 font-medium pt-1">
          <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-xs">Privacy-First RAM Engine</span>
          <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-xs">Instant Calculations</span>
          <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-xs">Free for Students</span>
        </div>
      </section>

      {/* Section 1: Grades & GPA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Grades & GPA</h2>
            <p className="text-slate-500 text-xs">Flagship grade tools to calculate semester GPA, cumulative projections, and target GPA goals.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gradesGpaTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>
      </section>

      {/* Section 2: Academic Work & Utilities */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Academic Work & Utilities</h2>
            <p className="text-slate-500 text-xs">Essential writing, page estimation, text diff, and unit conversion tools for papers and assignments.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {academicWorkTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>
      </section>

      {/* Section 2: Study & Productivity */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Study & Productivity</h2>
            <p className="text-slate-500 text-xs">Focus timers and date deadline calculators to keep study schedules and project milestones on track.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {studyProductivityTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>
      </section>
    </div>
  );
};
