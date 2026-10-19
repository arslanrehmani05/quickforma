import React, { useState } from "react";
import { Store, CreditCard, DollarSign, Calculator } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SquarePosProcessingFeeCalculator: React.FC = () => {
  const [transactionType, setTransactionType] = useState<string>("in_person");
  const [ticketSize, setTicketSize] = useState<number>(42.50);
  const [monthlySales, setMonthlySales] = useState<number>(18000);

  const handleReset = () => {
    setTransactionType("in_person");
    setTicketSize(42.50);
    setMonthlySales(18000);
  };

  // Square rates:
  // In-Person (Tap, Chip, Magstripe): 2.6% + $0.10
  // Invoices & Online: 2.9% + $0.30
  // Manually Keyed-in / Card on File: 3.5% + $0.15
  const rates: Record<string, { name: string; pct: number; fixed: number }> = {
    in_person: { name: "In-Person (Tap / Chip / Swipe)", pct: 2.6, fixed: 0.10 },
    online: { name: "Online Store / Square Invoice", pct: 2.9, fixed: 0.30 },
    keyed: { name: "Manually Keyed / Card on File", pct: 3.5, fixed: 0.15 }
  };

  const selected = rates[transactionType] || rates["in_person"];
  const feePerTransaction = (ticketSize * (selected.pct / 100)) + selected.fixed;
  const netDeposit = Math.max(0, ticketSize - feePerTransaction);
  const effectiveRate = ticketSize > 0 ? (feePerTransaction / ticketSize) * 100 : 0;

  const transactionCount = ticketSize > 0 ? monthlySales / ticketSize : 0;
  const totalMonthlyFees = transactionCount * feePerTransaction;
  const netMonthlyRevenue = monthlySales - totalMonthlyFees;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Square Point of Sale In-Person vs Online Fee"
        description="Calculate exact Square processing rates, per-ticket deductions, and monthly merchant fees across card transaction types."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Square Transaction Method</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full text-sm border border-slate-300 rounded-lg p-2.5 bg-white text-slate-800 focus:outline-indigo-500 font-medium"
          >
            <option value="in_person">In-Person (Card Present Tap/Chip) — 2.6% + $0.10</option>
            <option value="online">Online / Square Invoices — 2.9% + $0.30</option>
            <option value="keyed">Manually Keyed-in / Virtual Terminal — 3.5% + $0.15</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Average Ticket / Order Size ($)"
            value={ticketSize}
            onChange={(val) => setTicketSize(Math.max(0.5, Number(val) || 0))}
            type="number"
            min={0.5}
            prefix="$"
          />
          <InputField
            label="Total Monthly Sales ($)"
            value={monthlySales}
            onChange={(val) => setMonthlySales(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Square Fee Per Sale"
          value={`$${feePerTransaction.toFixed(2)}`}
          subtitle={`${selected.pct}% + $${selected.fixed.toFixed(2)}`}
          variant="indigo"
        />
        <ResultCard
          title="Net Take-Home / Sale"
          value={`$${netDeposit.toFixed(2)}`}
          subtitle={`${effectiveRate.toFixed(2)}% effective fee`}
          variant="light"
        />
        <ResultCard
          title="Monthly Processing Fee"
          value={`$${totalMonthlyFees.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`${Math.round(transactionCount)} transactions`}
          variant="light"
        />
        <ResultCard
          title="Net Monthly Payout"
          value={`$${netMonthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="Net bank deposits"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Processing Cost Optimization</h4>
        <p className="text-slate-600">
          Swiping or tapping in-person saves <strong className="text-slate-800">0.90%</strong> compared to manually typing card numbers. On ${monthlySales.toLocaleString()} in sales, processing in-person instead of keying saves <strong className="text-slate-800">${(monthlySales * 0.009).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> every month.
        </p>
      </div>
    </div>
  );
};
