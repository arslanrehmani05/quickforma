import React, { useState } from "react";
import { GitBranch, Layers, CheckCircle2, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const PrerequisiteCoursePlanner: React.FC = () => {
  const [majorSequenceLevels, setMajorSequenceLevels] = useState<number>(4); // e.g. Calc 1 -> Calc 2 -> Multivariable -> Diff Eq
  const [fallSpringOnly, setFallSpringOnly] = useState<boolean>(true);
  const [coursesPerTermMax, setCoursesPerTermMax] = useState<number>(5);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  const levelsRemaining = Math.max(0, majorSequenceLevels - currentLevel);
  const minimumSemesters = levelsRemaining; // Strict sequential prerequisite chain
  const yearsToComplete = (minimumSemesters / (fallSpringOnly ? 2 : 3)).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={GitBranch}
            title="College Course Sequence & Prerequisite Chain Planner"
            description="Plan sequential multi-semester course dependencies, milestone gates, and minimum terms to major completion."
          />
          <ResetButton onReset={() => {
            setMajorSequenceLevels(4);
            setFallSpringOnly(true);
            setCoursesPerTermMax(5);
            setCurrentLevel(1);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Total Sequence Tiers (Chain Length)"
            type="number"
            value={majorSequenceLevels}
            onChange={(e) => setMajorSequenceLevels(Number(e.target.value))}
            min={1}
            max={8}
          />
          <InputField
            label="Current Completed Tier"
            type="number"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(Number(e.target.value))}
            min={0}
            max={majorSequenceLevels}
          />
          <InputField
            label="Max Concurrent Courses / Term"
            type="number"
            value={coursesPerTermMax}
            onChange={(e) => setCoursesPerTermMax(Number(e.target.value))}
            min={1}
            max={7}
          />
          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 text-xs">
              <input
                type="checkbox"
                checked={fallSpringOnly}
                onChange={(e) => setFallSpringOnly(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              Fall / Spring Only (No Summer Prereqs)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Minimum Semesters"
            value={`${minimumSemesters} Terms`}
            subtitle="Strict sequential dependency limit"
          />
          <ResultCard
            variant="light"
            title="Calendar Horizon"
            value={`${yearsToComplete} Years`}
            subtitle={fallSpringOnly ? "2 Semesters per academic year" : "Includes summer accelerator terms"}
          />
          <ResultCard
            variant="light"
            title="Sequence Progress"
            value={`${currentLevel} / ${majorSequenceLevels}`}
            subtitle={`${((currentLevel / majorSequenceLevels) * 100).toFixed(0)}% chain completed`}
          />
        </div>
      </div>
    </div>
  );
};
