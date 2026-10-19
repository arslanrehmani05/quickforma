import React, { useState } from "react";
import { Globe, DollarSign, ArrowRightLeft, Percent } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const CrossBorderCurrencyConversionFee: React.FC = () => {
  const [transactionAmount, setTransactionAmount] = useState<number>(2500);
  const [interbankRate, setInterbankRate] = useState<number>(1.08); // e.g. EUR/USD
  const [fxMarkupPercent, setFxMarkupPercent] = useState<number>(2.5); // Stripe/PayPal markup
  const [crossBorderFlatFee, setCrossBorderFlatFee] = useState<number>(1.5); // 1.5% international card fee

  const handleReset = () => {
    setTransactionAmount(2500);
    setInterbankRate(1.08);
    setFxMarkupPercent(2.5);
    setCrossBorderFlatFee(1.5);
  };

  const trueMarketValue = transactionAmount * interbankRate;
  const fxDeduction = trueMarketValue * (fxMarkupPercent / 100);
  const crossBorderDeduction = trueMarketValue * (crossBorderFlatFee / 100);
  const totalFxLoss = fxDeduction + crossBorderDeduction;
  const netReceived = trueMarketValue - totalFxLoss;
  const effectiveLossPercent = (totalFxLoss / trueMarketValue) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToolHeader
        title="International Merchant FX Fee & Markup"
        description="Calculate international card processing fees, foreign exchange spreads, and hidden cross-border conversion markups."
      />

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Transaction Amount in Foreign Currency"
            value={transactionAmount}
            onChange={(val) => setTransactionAmount(Math.max(1, Number(val) || 0))}
            type="number"
            min={1}
            prefix="€"
          />
          <InputField
            label="Mid-Market Interbank Exchange Rate"
            value={interbankRate}
            onChange={(val) => setInterbankRate(Math.max(0.0001, Number(val) || 0))}
            type="number"
            min={0.0001}
            step={0.001}
          />
          <InputField
            label="Processor FX Conversion Spread Markup (%)"
            value={fxMarkupPercent}
            onChange={(val) => setFxMarkupPercent(Math.min(15, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={15}
            suffix="%"
          />
          <InputField
            label="International Cross-Border Card Surcharge (%)"
            value={crossBorderFlatFee}
            onChange={(val) => setCrossBorderFlatFee(Math.min(10, Math.max(0, Number(val) || 0)))}
            type="number"
            min={0}
            max={10}
            suffix="%"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <ResetButton onReset={handleReset} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard
          title="Net Payout in Base Currency"
          value={`$${netReceived.toFixed(2)}`}
          subtitle="Deposited in bank"
          variant="indigo"
        />
        <ResultCard
          title="Total FX & Border Cost"
          value={`-$${totalFxLoss.toFixed(2)}`}
          subtitle={`${effectiveLossPercent.toFixed(2)}% total take`}
          variant="light"
        />
        <ResultCard
          title="Mid-Market Benchmark"
          value={`$${trueMarketValue.toFixed(2)}`}
          subtitle="Without bank spread"
          variant="light"
        />
        <ResultCard
          title="Effective Rate Received"
          value={(netReceived / transactionAmount).toFixed(4)}
          subtitle="vs 1.0800 mid-market"
          variant="light"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm space-y-2">
        <h4 className="font-semibold text-slate-800">Cross-Border Banking Insight</h4>
        <p className="text-slate-600">
          Payment processors frequently quote a "free" or low payment fee while adding a hidden <strong className="text-slate-800">{fxMarkupPercent}%</strong> markup on the interbank exchange rate alongside a <strong className="text-slate-800">{crossBorderFlatFee}%</strong> cross-border card assessment. On this sale, you lose <strong className="text-slate-800">${totalFxLoss.toFixed(2)}</strong> to international conversion spreads.
        </p>
      </div>
    </div>
  );
};
