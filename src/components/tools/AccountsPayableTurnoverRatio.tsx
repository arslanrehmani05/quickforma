import React, { useState } from "react";
import { ArrowDownLeft, DollarSign, Calendar, Clock } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AccountsPayableTurnoverRatio: React.FC = () => {
  const [totalSupplierPurchasesCost, setTotalSupplierPurchasesCost] = useState<number>(1450000);
  const [averageAccountsPayableBalance, setAverageAccountsPayableBalance] = useState<number>(185000);

  const handleReset = () => {
    setTotalSupplierPurchasesCost(1450000);
    setAverageAccountsPayableBalance(185000);
  };

  // AP Turnover = Total Purchases / Average Accounts Payable
  const apTurnoverRatio = averageAccountsPayableBalance > 0 ? totalSupplierPurchasesCost / averageAccountsPayableBalance : 0;
  // Days Payable Outstanding (DPO) = 365 / AP Turnover
  const daysPayableOutstandingDpo = apTurnoverRatio > 0 ? 365 / apTurnoverRatio : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Accounts Payable Turnover & Days Payable Outstanding (DPO) Solver"
        description="Compute accounts payable turnover velocity, vendor payment cycle speed, and Days Payable Outstanding (DPO)."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Annual Total Inventory / Supplier Purchases ($)"
            value={totalSupplierPurchasesCost}
            onChange={(val) => setTotalSupplierPurchasesCost(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
          <InputField
            label="Average Accounts Payable (AP) Balance ($)"
            value={averageAccountsPayableBalance}
            onChange={(val) => setAverageAccountsPayableBalance(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard
            title="AP Turnover Ratio"
            value={`${apTurnoverRatio.toFixed(2)}x / yr`}
            subtitle="Frequency AP balance is settled annually"
            variant="light"
          />
          <ResultCard
            title="Days Payable Outstanding (DPO)"
            value={`${daysPayableOutstandingDpo.toFixed(1)} days`}
            subtitle="Average days to pay vendors"
            variant="light"
          />
          <ResultCard
            title="Working Capital Cash Preservation"
            value={`$${(averageAccountsPayableBalance).toLocaleString()}`}
            subtitle="Vendor-financed interest-free capital"
            variant="indigo"
          />
        </div>
      </div>
    </div>
  );
};
