import React, { useState } from "react";
import { UserX, Clock, Calendar, AlertTriangle } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const EmployeeAbsenceRateCalculator: React.FC = () => {
  const [totalWorkDaysInPeriod, setTotalWorkDaysInPeriod] = useState<number>(220);
  const [totalDaysLostToAbsence, setTotalDaysLostToAbsence] = useState<number>(14);
  const [numberOfAbsenceSpells, setNumberOfAbsenceSpells] = useState<number>(4);

  const handleReset = () => {
    setTotalWorkDaysInPeriod(220);
    setTotalDaysLostToAbsence(14);
    setNumberOfAbsenceSpells(4);
  };

  // Lost Time Rate = (Days Lost / Total Scheduled Work Days) * 100
  const absenteeismRatePercent = totalWorkDaysInPeriod > 0 ? (totalDaysLostToAbsence / totalWorkDaysInPeriod) * 100 : 0;
  // Bradford Factor = S^2 * D (where S is number of spells, D is total days)
  const bradfordFactor = Math.pow(numberOfAbsenceSpells, 2) * totalDaysLostToAbsence;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Employee Absenteeism Rate & Bradford Factor Solver"
        description="Assess employee absenteeism percentages, frequency of unplanned absences, and HR Bradford Factor disruption scores."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="Total Scheduled Work Days"
            value={totalWorkDaysInPeriod}
            onChange={(val) => setTotalWorkDaysInPeriod(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
          />
          <InputField
            label="Total Days Lost to Absence (D)"
            value={totalDaysLostToAbsence}
            onChange={(val) => setTotalDaysLostToAbsence(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
          <InputField
            label="Separate Absence Instances/Spells (S)"
            value={numberOfAbsenceSpells}
            onChange={(val) => setNumberOfAbsenceSpells(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Absenteeism Rate"
            value={`${absenteeismRatePercent.toFixed(2)}%`}
            subtitle="Percentage of lost scheduled days"
            variant="light"
          />
          <ResultCard
            title="Bradford Factor Score"
            value={`${bradfordFactor}`}
            subtitle={bradfordFactor < 50 ? "Low disruption (Normal)" : bradfordFactor < 200 ? "Moderate disruption" : "High HR disciplinary alert"}
            variant="light"
          />
          <ResultCard
            title="Average Absence Duration"
            value={numberOfAbsenceSpells > 0 ? `${(totalDaysLostToAbsence / numberOfAbsenceSpells).toFixed(1)} days/spell` : "0 days"}
            subtitle="Average length per absence event"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
