import React, { useState } from 'react';
import { Receipt, Printer, Download } from 'lucide-react';

export const ReceiptGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState('QuickForma Studios');
  const [customerName, setCustomerName] = useState('Acme Corporation');
  const [receiptNo, setReceiptNo] = useState('REC-2026-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [itemName, setItemName] = useState('Web Development Services');
  const [amount, setAmount] = useState<number>(450);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Stripe)');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Receipt Maker</h2>
            <p className="text-slate-400 text-sm">Create printable itemized payment receipts for transactions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Business Name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Customer / Client Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Receipt Number</label>
            <input
              type="text"
              value={receiptNo}
              onChange={(e) => setReceiptNo(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Date Paid</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Item / Service Description</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Amount Paid ($)</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Receipt</span>
        </button>
      </div>

      {/* Printable Paper Voucher */}
      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 font-sans max-w-2xl mx-auto">
        <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{businessName || 'Business Name'}</h1>
            <p className="text-xs text-slate-500">Official Payment Receipt</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase">PAID IN FULL</span>
            <p className="text-xs font-mono text-slate-600 mt-2">Receipt #{receiptNo}</p>
            <p className="text-xs text-slate-500">Date: {date}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-sm py-2 border-b border-slate-100">
            <span className="text-slate-500">Received From:</span>
            <span className="font-semibold text-slate-800">{customerName || 'Customer'}</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-slate-100">
            <span className="text-slate-500">Description:</span>
            <span className="font-semibold text-slate-800">{itemName || 'Services'}</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-slate-100">
            <span className="text-slate-500">Payment Method:</span>
            <span className="font-semibold text-slate-800">{paymentMethod}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-700">Total Amount Paid</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">${(amount || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
