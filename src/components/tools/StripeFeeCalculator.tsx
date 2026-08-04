import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { CreditCard, DollarSign } from 'lucide-react';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';
import { STRIPE_FEE_SEO } from '../../data/sampleToolSeoData';

export const StripeFeeCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [feeRate, setFeeRate] = useState<number>(2.9); // 2.9% default standard US rate
  const [fixedFee, setFixedFee] = useState<number>(0.30);

  // Additional 1% for international cards
  const effectiveRate = isInternational ? feeRate + 1.0 : feeRate;

  // Amount to charge customer so you receive exact target amount:
  // Target = (Charge * (1 - rate/100)) - fixedFee  =>  Charge = (Target + fixedFee) / (1 - rate/100)
  const rateDecimal = effectiveRate / 100;
  const chargeAmount = (amount + fixedFee) / (1 - rateDecimal);
  const stripeFee = chargeAmount - amount;

  // If you charge customer exact 'amount':
  const standardFee = (amount * rateDecimal) + fixedFee;
  const netReceived = Math.max(0, amount - standardFee);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <CreditCard className="w-5 h-5" />
            <span>Stripe Fee Calculator</span>
          </div>
          <ResetButton onReset={() => { setAmount(100); setIsInternational(false); setFeeRate(2.9); setFixedFee(0.30); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Target Invoice / Payment Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isInternational}
                onChange={(e) => setIsInternational(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
              />
              <span>International Card (+1.0% fee)</span>
            </label>
          </div>
        </div>

        {/* Breakdown Output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Option A: If customer pays exact amount */}
          <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">If you charge ${amount.toFixed(2)}</span>
            <div className="space-y-1">
              <div className="text-xs text-zinc-500">Stripe Fee deducted:</div>
              <div className="text-lg font-extrabold text-black">${standardFee.toFixed(2)}</div>
            </div>
            <div className="space-y-1 pt-2 border-t border-zinc-200">
              <div className="text-xs text-zinc-500">You take home:</div>
              <div className="text-xl font-black text-zinc-900">${netReceived.toFixed(2)}</div>
            </div>
          </div>

          {/* Option B: To take home exact amount */}
          <div className="p-5 bg-black text-white border border-black rounded-xl space-y-3 shadow-md">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">To receive exact ${amount.toFixed(2)} net</span>
            <div className="space-y-1">
              <div className="text-xs text-zinc-400">Total amount to invoice customer:</div>
              <div className="text-2xl font-black text-white">${chargeAmount.toFixed(2)}</div>
            </div>
            <div className="space-y-1 pt-2 border-t border-zinc-800">
              <div className="text-xs text-zinc-400">Total Stripe Fee:</div>
              <div className="text-sm font-bold text-zinc-300">${stripeFee.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Authority Tool Page Template v1.0 Content Hub */}
      <ToolSeoWrapper
        seoData={STRIPE_FEE_SEO}
        toolName="Stripe Fee Calculator"
        category="ecommerce"
        toolId="stripe-fee-calculator"
      />
    </div>
  );
};
