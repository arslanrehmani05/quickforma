import React, { useState } from "react";
import { ShieldAlert, Award, CheckCircle, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AcademicStandingCalculator: React.FC = () => {
  const [cumulativeGpa, setCumulativeGpa] = useState<number>(3.55);
  const [termGpa, setTermGpa] = useState<number>(3.65);
  const [totalUnitsCompleted, setTotalUnitsCompleted] = useState<number>(64);
  const [termEnrolledUnits, setTermEnrolledUnits] = useState<number>(15);

  let standing = "Good Standing";
  let explanation = "Meets all satisfactory academic progress requirements.";

  if (cumulativeGpa >= 3.50 && termGpa >= 3.50 && termEnrolledUnits >= 12) {
    standing = "Dean's List / Academic Honors";
    explanation = "Qualified for semester Dean's List honors recognition (Full-time >= 12 units and Term/Cumulative GPA >= 3.50).";
  } else if (cumulativeGpa < 2.00) {
    standing = "Academic Probation";
    explanation = "Cumulative GPA fell below standard 2.00 collegiate threshold. Must raise cumulative GPA next semester to avoid dismissal.";
  } else if (termGpa < 2.00) {
    standing = "Academic Warning";
    explanation = "Semester term GPA fell below 2.00 despite cumulative standing staying above minimum threshold.";
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShieldAlert}
            title="Dean's List & Academic Standing Threshold Evaluator"
            description="Evaluate term and cumulative academic progress: Dean's List honors, Good Standing, Warning, and Probation status."
          />
          <ResetButton onReset={() => {
            setCumulativeGpa(3.55);
            setTermGpa(3.65);
            setTotalUnitsCompleted(64);
            setTermEnrolledUnits(15);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Cumulative GPA"
            type="number"
            step={0.01}
            value={cumulativeGpa}
            onChange={(e) => setCumulativeGpa(Number(e.target.value))}
            min={0}
            max={4.0}
          />
          <InputField
            label="Current Term GPA"
            type="number"
            step={0.01}
            value={termGpa}
            onChange={(e) => setTermGpa(Number(e.target.value))}
            min={0}
            max={4.0}
          />
          <InputField
            label="Completed Degree Units"
            type="number"
            value={totalUnitsCompleted}
            onChange={(e) => setTotalUnitsCompleted(Number(e.target.value))}
            min={0}
          />
          <InputField
            label="Term Units Enrolled"
            type="number"
            value={termEnrolledUnits}
            onChange={(e) => setTermEnrolledUnits(Number(e.target.value))}
            min={1}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ResultCard
            variant="light"
            title="Official Academic Standing"
            value={standing}
            subtitle={explanation}
          />
          <ResultCard
            variant="light"
            title="Dean's List Status"
            value={standing.includes("Dean's List") ? "Qualified" : "Not Qualified"}
            subtitle="Requires Full-Time (>= 12 cr) & >= 3.50 GPA"
          />
          <ResultCard
            variant="light"
            title="Probation Risk"
            value={cumulativeGpa < 2.0 || termGpa < 2.0 ? "Warning / Alert" : "Clear"}
            subtitle="Satisfactory Academic Progress (SAP) Verified"
          />
        </div>
      </div>
    </div>
  );
};
