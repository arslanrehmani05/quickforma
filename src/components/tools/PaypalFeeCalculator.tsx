import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { CreditCard, DollarSign } from 'lucide-react';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';

export const PaypalFeeCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(250);
  const [transactionType, setTransactionType] = useState<'domestic' | 'international'>('domestic');

  // Standard PayPal Goods & Services rate: 3.49% + $0.49 (US Domestic)
  // International: 4.99% + $0.49
  const ratePct = transactionType === 'domestic' ? 3.49 : 4.99;
  const fixedFee = 0.49;
  const rateDecimal = ratePct / 100;

  // Standard Fee when receiving `amount`
  const feeAmount = (amount * rateDecimal) + fixedFee;
  const netAmount = Math.max(0, amount - feeAmount);

  // Invoice Amount needed to net exact `amount`
  const grossInvoiceAmount = (amount + fixedFee) / (1 - rateDecimal);
  const totalFeeToAsk = grossInvoiceAmount - amount;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <CreditCard className="w-5 h-5" />
            <span>PayPal Merchant Fee Calculator</span>
          </div>
          <ResetButton onReset={() => { setAmount(250); setTransactionType('domestic'); }} />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Payment Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2.5 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm text-zinc-900 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Transaction Region
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTransactionType('domestic')}
                className={`py-2 text-xs font-bold rounded-lg border ${
                  transactionType === 'domestic' ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-200'
                }`}
              >
                US Domestic (3.49% + $0.49)
              </button>
              <button
                onClick={() => setTransactionType('international')}
                className={`py-2 text-xs font-bold rounded-lg border ${
                  transactionType === 'international' ? 'bg-black text-white border-black' : 'bg-white text-zinc-700 border-zinc-200'
                }`}
              >
                International (4.99% + $0.49)
              </button>
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">If customer pays ${amount.toFixed(2)}</span>
            <div className="space-y-1">
              <div className="text-xs text-zinc-500">PayPal Fee:</div>
              <div className="text-lg font-extrabold text-black">${feeAmount.toFixed(2)}</div>
            </div>
            <div className="space-y-1 pt-2 border-t border-zinc-200">
              <div className="text-xs text-zinc-500">You take home:</div>
              <div className="text-xl font-black text-zinc-900">${netAmount.toFixed(2)}</div>
            </div>
          </div>

          <div className="p-5 bg-black text-white border border-black rounded-xl space-y-3 shadow-md">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">To receive exact ${amount.toFixed(2)} net</span>
            <div className="space-y-1">
              <div className="text-xs text-zinc-400">Total amount to invoice customer:</div>
              <div className="text-2xl font-black text-white">${grossInvoiceAmount.toFixed(2)}</div>
            </div>
            <div className="space-y-1 pt-2 border-t border-zinc-800">
              <div className="text-xs text-zinc-400">PayPal Fee:</div>
              <div className="text-sm font-bold text-zinc-300">${totalFeeToAsk.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
