import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

export const ReceiptGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState('Apex Services LLC');
  const [customerName, setCustomerName] = useState('John Doe');
  const [amount, setAmount] = useState<number>(450);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Payment Receipt Generator</h2>
            <p className="text-slate-600 text-sm">Create and print official payment receipts with zero server storage.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Business Name</label>
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Customer Name</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Amount Paid ($)</label>
            <input type="number" min="0" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Payment Method</label>
            <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          <span>Print / Save Receipt PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-10 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-sans leading-relaxed text-sm max-w-md mx-auto space-y-4">
        <div className="text-center border-b border-slate-200 pb-4">
          <h1 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">{businessName}</h1>
          <span className="text-xs text-indigo-600 font-bold ">Official Payment Receipt</span>
        </div>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex justify-between"><span>Date:</span><span className="font-semibold text-slate-900">{date}</span></div>
          <div className="flex justify-between"><span>Received From:</span><span className="font-semibold text-slate-900">{customerName}</span></div>
          <div className="flex justify-between"><span>Payment Method:</span><span className="font-semibold text-slate-900">{paymentMethod}</span></div>
        </div>
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
          <span>Total Paid:</span>
          <span className="text-indigo-600 text-xl">${(amount || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
