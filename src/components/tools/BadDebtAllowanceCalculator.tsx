import React, { useState } from "react";
import { AlertTriangle, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BadDebtAllowanceCalculator: React.FC = () => {
  // Aging buckets: Current, 1-30 days, 31-60 days, 61-90 days, 90+ days
  const [arCurrent, setArCurrent] = useState<number>(120000);
  const [ar30Days, setAr30Days] = useState<number>(45000);
  const [ar60Days, setAr60Days] = useState<number>(18000);
  const [ar90Days, setAr90Days] = useState<number>(9000);
  const [arOver90Days, setArOver90Days] = useState<number>(6000);

  // Standard historical loss default rates
  const lossCurrent = 1.0; // 1%
  const loss30 = 3.0; // 3%
  const loss60 = 10.0; // 10%
  const loss90 = 25.0; // 25%
  const lossOver90 = 50.0; // 50%

  const safeCurrent = Math.max(0, arCurrent);
  const safe30 = Math.max(0, ar30Days);
  const safe60 = Math.max(0, ar60Days);
  const safe90 = Math.max(0, ar90Days);
  const safeOver90 = Math.max(0, arOver90Days);

  const totalAr = safeCurrent + safe30 + safe60 + safe90 + safeOver90;

  const allowanceDollars = (safeCurrent * (lossCurrent / 100)) +
    (safe30 * (loss30 / 100)) +
    (safe60 * (loss60 / 100)) +
    (safe90 * (loss90 / 100)) +
    (safeOver90 * (lossOver90 / 100));

  const blendedLossRatePct = totalAr > 0 ? (allowanceDollars / totalAr) * 100 : 0;
  const netCollectibleAr = totalAr - allowanceDollars;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={AlertTriangle}
            title="Allowance for Doubtful Accounts & AR Aging Bad Debt Estimator"
            description="Apply the US GAAP aging-of-receivables method to estimate credit loss reserve allowances and net realizable AR value."
          />
          <ResetButton onReset={() => {
            setArCurrent(120000);
            setAr30Days(45000);
            setAr60Days(18000);
            setAr90Days(9000);
            setArOver90Days(6000);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <InputField
            label="Current (0-30 d) (1%)"
            type="number"
            min={0}
            value={arCurrent}
            onChange={(e) => setArCurrent(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="31-60 Days (3%)"
            type="number"
            min={0}
            value={ar30Days}
            onChange={(e) => setAr30Days(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="61-90 Days (10%)"
            type="number"
            min={0}
            value={ar60Days}
            onChange={(e) => setAr60Days(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="91-120 Days (25%)"
            type="number"
            min={0}
            value={ar90Days}
            onChange={(e) => setAr90Days(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="120+ Days (50%)"
            type="number"
            min={0}
            value={arOver90Days}
            onChange={(e) => setArOver90Days(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="AR Reserve Valuation">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Required Allowance</span>
              <p className="text-3xl font-extrabold text-amber-300 mt-2">${Math.round(allowanceDollars).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Contra-asset reserve</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Realizable AR</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${Math.round(netCollectibleAr).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Expected cash recovery</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Total Gross AR</span>
              <p className="text-3xl font-extrabold text-white mt-2">${Math.round(totalAr).toLocaleString()}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Uncollected invoices</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Blended Risk Exposure</span>
              <p className="text-2xl font-mono font-bold text-rose-300 mt-2">{blendedLossRatePct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Reserve / Total AR</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
