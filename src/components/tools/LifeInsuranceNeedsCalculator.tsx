import React, { useState } from "react";
import { Umbrella, DollarSign, Shield, Heart } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const LifeInsuranceNeedsCalculator: React.FC = () => {
  const [outstandingDebtsAndMortgage, setOutstandingDebtsAndMortgage] = useState<number>(380000); // D
  const [annualIncomeToReplace, setAnnualIncomeToReplace] = useState<number>(95000); // I
  const [yearsOfIncomeReplacement, setYearsOfIncomeReplacement] = useState<number>(10);
  const [mortgageBalance, setMortgageBalance] = useState<number>(0); // M (if separate)
  const [childrenCollegeFundNeeds, setChildrenCollegeFundNeeds] = useState<number>(150000); // E
  const [existingSavingsAndInsurance, setExistingSavingsAndInsurance] = useState<number>(120000);

  const handleReset = () => {
    setOutstandingDebtsAndMortgage(380000);
    setAnnualIncomeToReplace(95000);
    setYearsOfIncomeReplacement(10);
    setMortgageBalance(0);
    setChildrenCollegeFundNeeds(150000);
    setExistingSavingsAndInsurance(120000);
  };

  // D.I.M.E. Method: Debt + Income + Mortgage + Education - Existing Assets
  const totalIncomeReplacementNeed = annualIncomeToReplace * yearsOfIncomeReplacement;
  const grossNeeds = outstandingDebtsAndMortgage + mortgageBalance + totalIncomeReplacementNeed + childrenCollegeFundNeeds;
  const netTermLifeInsuranceRecommended = Math.max(0, grossNeeds - existingSavingsAndInsurance);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="DIME Method Term Life Insurance Coverage Solver"
        description="Estimate comprehensive term life insurance policy size using the standard D.I.M.E. formula (Debt, Income, Mortgage, Education)."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Total Debts + Mortgage (D+M) ($)"
            value={outstandingDebtsAndMortgage}
            onChange={(val) => setOutstandingDebtsAndMortgage(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Annual Income to Replace ($)"
            value={annualIncomeToReplace}
            onChange={(val) => setAnnualIncomeToReplace(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Years of Income Support"
            value={yearsOfIncomeReplacement}
            onChange={(val) => setYearsOfIncomeReplacement(Math.min(30, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={30}
          />
          <InputField
            label="Kids College / Education (E) ($)"
            value={childrenCollegeFundNeeds}
            onChange={(val) => setChildrenCollegeFundNeeds(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Existing Savings & Insurance ($)"
            value={existingSavingsAndInsurance}
            onChange={(val) => setExistingSavingsAndInsurance(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="Recommended Term Coverage"
            value={`$${netTermLifeInsuranceRecommended.toLocaleString()}`}
            subtitle="D.I.M.E. total policy target"
            variant="indigo"
          />
          <ResultCard
            title="Total Financial Obligations"
            value={`$${grossNeeds.toLocaleString()}`}
            subtitle="Debts, income, and education"
            variant="light"
          />
          <ResultCard
            title="Existing Asset Offset"
            value={`-$${existingSavingsAndInsurance.toLocaleString()}`}
            subtitle="Current portfolio and safety cushion"
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};
