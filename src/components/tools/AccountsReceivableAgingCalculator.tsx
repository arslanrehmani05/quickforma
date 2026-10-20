import React, { useState } from "react";
import { ArrowUpRight, DollarSign, Clock, ShieldAlert } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AccountsReceivableAgingCalculator: React.FC = () => {
  const [currentBucket0to30, setCurrentBucket0to30] = useState<number>(180000);
  const [pastDue31to60, setPastDue31to60] = useState<number>(45000);
  const [pastDue61to90, setPastDue61to90] = useState<number>(22000);
  const [pastDue90Plus, setPastDue90Plus] = useState<number>(14000);

  const handleReset = () => {
    setCurrentBucket0to30(180000);
    setPastDue31to60(45000);
    setPastDue61to90(22000);
    setPastDue90Plus(14000);
  };

  const totalOutstandingAr = currentBucket0to30 + pastDue31to60 + pastDue61to90 + pastDue90Plus;
  // Recommended bad debt allowance provisioning (1% for current, 5% for 31-60, 20% for 61-90, 50% for 90+)
  const badDebtAllowance =
    (currentBucket0to30 * 0.01) +
    (pastDue31to60 * 0.05) +
    (pastDue61to90 * 0.20) +
    (pastDue90Plus * 0.50);
  const totalDelinquentAr = pastDue31to60 + pastDue61to90 + pastDue90Plus;
  const delinquencyRate = totalOutstandingAr > 0 ? (totalDelinquentAr / totalOutstandingAr) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Accounts Receivable Aging & Bad Debt Reserve Solver"
        description="Categorize unpaid invoices across 30, 60, and 90+ day aging buckets and estimate GAAP bad debt reserves."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InputField
            label="Current (0–30 Days) ($)"
            value={currentBucket0to30}
            onChange={(val) => setCurrentBucket0to30(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Past Due (31–60 Days) ($)"
            value={pastDue31to60}
            onChange={(val) => setPastDue31to60(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Past Due (61–90 Days) ($)"
            value={pastDue61to90}
            onChange={(val) => setPastDue61to90(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Severely Delinquent (90+ Days) ($)"
            value={pastDue90Plus}
            onChange={(val) => setPastDue90Plus(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResultCard
            title="Total Outstanding AR"
            value={`$${totalOutstandingAr.toLocaleString()}`}
            subtitle="Gross uncollected invoices"
            variant="light"
          />
          <ResultCard
            title="Bad Debt Reserve Needed"
            value={`$${badDebtAllowance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Allowance for doubtful accounts"
            variant="light"
          />
          <ResultCard
            title="Delinquency Ratio"
            value={`${delinquencyRate.toFixed(1)}%`}
            subtitle={`$${totalDelinquentAr.toLocaleString()} past due >30 days`}
            variant="light"
          />
          <ResultCard
            title="Net Collectible AR"
            value={`$${(totalOutstandingAr - badDebtAllowance).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            subtitle="Conservative cash realization value"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
