import React, { useState } from "react";
import { Landmark, Calendar, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CapitalBudgetingPaybackCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(250000);
  const [annualCashInflow, setAnnualCashInflow] = useState<number>(65000);
  const [discountRatePct, setDiscountRatePct] = useState<number>(10.0);
  const [assetUsefulLifeYears, setAssetUsefulLifeYears] = useState<number>(6);

  const safeCapex = Math.max(0, initialInvestment);
  const safeCashFlow = Math.max(0, annualCashInflow);
  const r = Math.max(0, discountRatePct) / 100;

  // Simple payback period
  const simplePaybackYears = safeCashFlow > 0 ? safeCapex / safeCashFlow : 0;

  // Discounted payback period
  let cumulativeDcf = 0;
  let discountedPaybackYears = 0;
  let isDiscountedPaidOff = false;

  for (let year = 1; year <= assetUsefulLifeYears * 2; year++) {
    const discountedInflow = safeCashFlow / Math.pow(1 + r, year);
    if (!isDiscountedPaidOff) {
      if (cumulativeDcf + discountedInflow >= safeCapex) {
        const remaining = safeCapex - cumulativeDcf;
        discountedPaybackYears = (year - 1) + (remaining / discountedInflow);
        isDiscountedPaidOff = true;
      }
      cumulativeDcf += discountedInflow;
    }
  }

  // CapEx ROI over useful life
  const totalLifetimeCash = safeCashFlow * assetUsefulLifeYears;
  const capexNetProfit = totalLifetimeCash - safeCapex;
  const capexRoiPct = safeCapex > 0 ? (capexNetProfit / safeCapex) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Landmark}
            title="Capital Budgeting Simple & Discounted Payback Period Calculator"
            description="Evaluate corporate CapEx investments: calculate simple payback, time-value discounted payback, and lifetime project ROI."
          />
          <ResetButton onReset={() => {
            setInitialInvestment(250000);
            setAnnualCashInflow(65000);
            setDiscountRatePct(10.0);
            setAssetUsefulLifeYears(6);
          }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InputField
            label="Initial CapEx Outlay ($)"
            type="number"
            min={0}
            step={25000}
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Annual Net Cash Inflow ($)"
            type="number"
            min={0}
            step={5000}
            value={annualCashInflow}
            onChange={(e) => setAnnualCashInflow(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Hurdle Discount Rate (%)"
            type="number"
            min={0}
            max={30}
            step={0.5}
            value={discountRatePct}
            onChange={(e) => setDiscountRatePct(Number(e.target.value))}
          />
          <InputField
            label="Project Useful Life (Years)"
            type="number"
            min={1}
            max={30}
            value={assetUsefulLifeYears}
            onChange={(e) => setAssetUsefulLifeYears(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <ResultCard variant="dark" title="Capital Budgeting Decision Matrix">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Simple Payback</span>
              <p className="text-4xl font-extrabold text-emerald-400 mt-2">{simplePaybackYears.toFixed(2)} yrs</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Zero interest consideration</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Discounted Payback</span>
              <p className="text-3xl font-extrabold text-white mt-2">
                {isDiscountedPaidOff ? `${discountedPaybackYears.toFixed(2)} yrs` : "> Useful Life"}
              </p>
              <span className="text-[11px] text-slate-300 mt-1 block">At {discountRatePct}% cost of capital</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Lifetime CapEx ROI</span>
              <p className="text-3xl font-extrabold text-indigo-300 mt-2">{capexRoiPct.toFixed(1)}%</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">Over {assetUsefulLifeYears} years</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Project Viability</span>
              <p className="text-sm font-bold text-slate-200 mt-2">
                {simplePaybackYears <= assetUsefulLifeYears ? "Acceptable CapEx Investment" : "Exceeds Asset Lifespan"}
              </p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
