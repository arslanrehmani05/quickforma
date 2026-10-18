import React, { useState } from "react";
import { Store, Percent, DollarSign } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const FranchiseFeeRoiCalculator: React.FC = () => {
  const [initialFranchiseFee, setInitialFranchiseFee] = useState<number>(35000);
  const [buildoutEquipmentInvestment, setBuildoutEquipmentInvestment] = useState<number>(275000);
  const [projectedAnnualSales, setProjectedAnnualSales] = useState<number>(750000);
  const [ongoingRoyaltyPct, setOngoingRoyaltyPct] = useState<number>(5.0); // Standard 4-6%
  const [nationalAdFundPct, setNationalAdFundPct] = useState<number>(2.0); // Standard 1-3%
  const [storeOperatingMarginPreRoyaltyPct, setStoreOperatingMarginPreRoyaltyPct] = useState<number>(18.0);

  const totalInitialInvestment = Math.max(0, initialFranchiseFee) + Math.max(0, buildoutEquipmentInvestment);
  const safeSales = Math.max(0, projectedAnnualSales);
  
  const annualRoyaltyFeeDollars = safeSales * (ongoingRoyaltyPct / 100);
  const annualAdFundDollars = safeSales * (nationalAdFundPct / 100);
  const totalAnnualFranchisorFees = annualRoyaltyFeeDollars + annualAdFundDollars;

  const preFeeOperatingProfit = safeSales * (storeOperatingMarginPreRoyaltyPct / 100);
  const netFranchiseeProfit = Math.max(0, preFeeOperatingProfit - totalAnnualFranchisorFees);
  const franchiseeNetMarginPct = safeSales > 0 ? (netFranchiseeProfit / safeSales) * 100 : 0;
  
  // Payback period on total upfront investment
  const paybackYears = netFranchiseeProfit > 0 ? totalInitialInvestment / netFranchiseeProfit : 0;
  const annualRoiPct = totalInitialInvestment > 0 ? (netFranchiseeProfit / totalInitialInvestment) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Store}
            title="Franchise Investment & Royalty Fee ROI Calculator"
            description="Evaluate Item 19 FDD financial disclosures: model initial franchise fees, ongoing royalties, ad fund deductions, and franchisee cash-on-cash ROI."
          />
          <ResetButton onReset={() => {
            setInitialFranchiseFee(35000);
            setBuildoutEquipmentInvestment(275000);
            setProjectedAnnualSales(750000);
            setOngoingRoyaltyPct(5.0);
            setNationalAdFundPct(2.0);
            setStoreOperatingMarginPreRoyaltyPct(18.0);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Initial Franchise Fee ($)"
            type="number"
            min={0}
            step={5000}
            value={initialFranchiseFee}
            onChange={(e) => setInitialFranchiseFee(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Buildout & Working Capital ($)"
            type="number"
            min={0}
            step={10000}
            value={buildoutEquipmentInvestment}
            onChange={(e) => setBuildoutEquipmentInvestment(Math.max(0, Number(e.target.value)))}
          />
          <InputField
            label="Projected Annual Sales ($)"
            type="number"
            min={0}
            step={25000}
            value={projectedAnnualSales}
            onChange={(e) => setProjectedAnnualSales(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Ongoing Royalty (%)"
            type="number"
            min={0}
            max={15}
            step={0.5}
            value={ongoingRoyaltyPct}
            onChange={(e) => setOngoingRoyaltyPct(Number(e.target.value))}
          />
          <InputField
            label="National Brand Ad Fund (%)"
            type="number"
            min={0}
            max={5}
            step={0.5}
            value={nationalAdFundPct}
            onChange={(e) => setNationalAdFundPct(Number(e.target.value))}
          />
          <InputField
            label="Store Margin Pre-Fees (%)"
            type="number"
            min={1}
            max={50}
            step={1}
            value={storeOperatingMarginPreRoyaltyPct}
            onChange={(e) => setStoreOperatingMarginPreRoyaltyPct(Number(e.target.value))}
          />
        </div>

        <ResultCard variant="dark" title="Franchisee Net Economics">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Net Owner Profit</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${Math.round(netFranchiseeProfit).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{franchiseeNetMarginPct.toFixed(1)}% net margin</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Annual Franchisor Cut</span>
              <p className="text-3xl font-extrabold text-amber-300 mt-2">${Math.round(totalAnnualFranchisorFees).toLocaleString()}</p>
              <span className="text-[11px] text-slate-300 mt-1 block">{(ongoingRoyaltyPct + nationalAdFundPct).toFixed(1)}% top-line royalty</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Payback Period</span>
              <p className="text-3xl font-extrabold text-white mt-2">{paybackYears > 0 ? `${paybackYears.toFixed(1)} yrs` : "—"}</p>
              <span className="text-[11px] text-indigo-200 mt-1 block">On ${totalInitialInvestment.toLocaleString()} capital</span>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Annualized Cash ROI</span>
              <p className="text-2xl font-mono font-bold text-indigo-300 mt-2">{annualRoiPct.toFixed(1)}%</p>
              <span className="text-[11px] text-slate-300 mt-1 block">Profit / Initial Outlay</span>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
