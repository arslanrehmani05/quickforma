import React, { useState } from "react";
import { ShieldAlert, DollarSign, Target, Award } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const AmazonRepricingMarginCalculator: React.FC = () => {
  const [landedCost, setLandedCost] = useState<number>(14.50);
  const [fbaPickPackFee, setFbaPickPackFee] = useState<number>(5.40);
  const [inboundFreight, setInboundFreight] = useState<number>(0.85);
  const [minTargetProfitDollars, setMinTargetProfitDollars] = useState<number>(4.00);
  const [referralFeePercent, setReferralFeePercent] = useState<number>(15);

  const handleReset = () => {
    setLandedCost(14.50);
    setFbaPickPackFee(5.40);
    setInboundFreight(0.85);
    setMinTargetProfitDollars(4.00);
    setReferralFeePercent(15);
  };

  // Formula: Minimum Floor Price P:
  // P - (P * referralFee%) - landedCost - fbaFee - inboundFreight = minProfit
  // P * (1 - referralFee%) = landedCost + fbaFee + inboundFreight + minProfit
  // P = (landedCost + fbaFee + inboundFreight + minProfit) / (1 - referralFee%)
  const nonReferralTotal = landedCost + fbaPickPackFee + inboundFreight + minTargetProfitDollars;
  const feeDecimal = referralFeePercent / 100;
  const minimumFloorPrice = feeDecimal < 1 ? nonReferralTotal / (1 - feeDecimal) : 0;
  const referralFeeAtFloor = minimumFloorPrice * feeDecimal;
  const floorMargin = minimumFloorPrice > 0 ? (minTargetProfitDollars / minimumFloorPrice) * 100 : 0;
  const zeroProfitFloor = feeDecimal < 1 ? (landedCost + fbaPickPackFee + inboundFreight) / (1 - feeDecimal) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="Automated Amazon Repricer Minimum Floor Price Solver"
        description="Compute the exact minimum floor price for algorithmic repricers (Aura, Bqool) to protect margins during price wars."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Landed Product Cost ($)"
            value={landedCost}
            onChange={(val) => setLandedCost(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Amazon FBA Pick & Pack Fee ($)"
            value={fbaPickPackFee}
            onChange={(val) => setFbaPickPackFee(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Inbound Shipping to FBA ($/unit)"
            value={inboundFreight}
            onChange={(val) => setInboundFreight(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Target Minimum Net Profit ($/unit)"
            value={minTargetProfitDollars}
            onChange={(val) => setMinTargetProfitDollars(Math.max(0, Number(val) || 0))}
            type="number"
            min={0}
            prefix="$"
          />
          <InputField
            label="Amazon Category Referral Fee (%)"
            value={referralFeePercent}
            onChange={(val) => setReferralFeePercent(Math.min(45, Math.max(1, Number(val) || 0)))}
            type="number"
            min={1}
            max={45}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Repricer Min Floor Price"
          value={`$${minimumFloorPrice.toFixed(2)}`}
          subtitle={`Secures $${minTargetProfitDollars.toFixed(2)} net`}
          variant="indigo"
        />
        <ResultCard
          title="Breakeven Zero Profit Floor"
          value={`$${zeroProfitFloor.toFixed(2)}`}
          subtitle="Absolute bottom stop"
          variant="light"
        />
        <ResultCard
          title="Amazon Referral Deduction"
          value={`$${referralFeeAtFloor.toFixed(2)}`}
          subtitle={`${referralFeePercent}% of selling price`}
          variant="light"
        />
        <ResultCard
          title="Net Margin at Floor"
          value={`${floorMargin.toFixed(1)}%`}
          subtitle="Guaranteed profit rate"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Repricer Configuration Rule</h4>
        <p className="text-slate-600">
          Enter <strong className="text-slate-800">${minimumFloorPrice.toFixed(2)}</strong> as your automated tool minimum price. Even if competitors trigger a race to the bottom, this floor ensures Amazon takes <strong className="text-slate-800">${referralFeeAtFloor.toFixed(2)}</strong> while locking in your required <strong className="text-slate-800">${minTargetProfitDollars.toFixed(2)}</strong> net margin per unit sold.
        </p>
      </div>
    </div>
  );
};
