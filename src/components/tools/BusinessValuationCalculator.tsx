import React, { useState } from "react";
import { Building2, TrendingUp, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const BusinessValuationCalculator: React.FC = () => {
  const [annualRevenue, setAnnualRevenue] = useState<number>(2400000);
  const [annualEbitda, setAnnualEbitda] = useState<number>(480000);
  const [sellerDiscretionaryEarnings, setSellerDiscretionaryEarnings] = useState<number>(620000);
  const [ebitdaMultiple, setEbitdaMultiple] = useState<number>(5.5);
  const [revenueMultiple, setRevenueMultiple] = useState<number>(1.2);
  const [sdeMultiple, setSdeMultiple] = useState<number>(3.2);

  const safeRevenue = Math.max(0, annualRevenue);
  const safeEbitda = Math.max(0, annualEbitda);
  const safeSde = Math.max(0, sellerDiscretionaryEarnings);

  const ebitdaValuation = safeEbitda * Math.max(0, ebitdaMultiple);
  const revenueValuation = safeRevenue * Math.max(0, revenueMultiple);
  const sdeValuation = safeSde * Math.max(0, sdeMultiple);
  const blendedValuation = (ebitdaValuation + revenueValuation + sdeValuation) / 3;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Building2}
            title="Business Valuation Multiples (EBITDA, SDE & Revenue) Calculator"
            description="Estimate enterprise value using standard M&A transaction multiples across EBITDA, Seller Discretionary Earnings (SDE), and Revenue."
          />
          <ResetButton onReset={() => {
            setAnnualRevenue(2400000);
            setAnnualEbitda(480000);
            setSellerDiscretionaryEarnings(620000);
            setEbitdaMultiple(5.5);
            setRevenueMultiple(1.2);
            setSdeMultiple(3.2);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Annual Gross Revenue ($)"
            type="number"
            min={0}
            step={50000}
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(Number(e.target.value))}
          />
          <InputField
            label="Annual EBITDA ($)"
            type="number"
            min={0}
            step={10000}
            value={annualEbitda}
            onChange={(e) => setAnnualEbitda(Number(e.target.value))}
          />
          <InputField
            label="Seller Discretionary Earnings SDE ($)"
            type="number"
            min={0}
            step={10000}
            value={sellerDiscretionaryEarnings}
            onChange={(e) => setSellerDiscretionaryEarnings(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="EBITDA Multiple (×)"
            type="number"
            min={0.1}
            max={30}
            step={0.1}
            value={ebitdaMultiple}
            onChange={(e) => setEbitdaMultiple(Math.max(0.1, Number(e.target.value)))}
          />
          <InputField
            label="Revenue Multiple (×)"
            type="number"
            min={0.1}
            max={20}
            step={0.1}
            value={revenueMultiple}
            onChange={(e) => setRevenueMultiple(Math.max(0.1, Number(e.target.value)))}
          />
          <InputField
            label="SDE Multiple (×)"
            type="number"
            min={0.1}
            max={15}
            step={0.1}
            value={sdeMultiple}
            onChange={(e) => setSdeMultiple(Math.max(0.1, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Valuation Range Analysis">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Blended Valuation</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">
                ${Math.round(blendedValuation).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Average of 3 methodologies</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">EBITDA Method ({ebitdaMultiple}×)</span>
              <p className="text-3xl font-extrabold text-white mt-2">
                ${Math.round(ebitdaValuation).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Institutional / Private Equity standard</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">SDE Method ({sdeMultiple}×)</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">
                ${Math.round(sdeValuation).toLocaleString()}
              </p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Main Street & Broker standard</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Revenue Method ({revenueMultiple}×)</span>
              <p className="text-2xl font-mono font-bold text-amber-300 mt-2">
                ${Math.round(revenueValuation).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">Top-line benchmark</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
