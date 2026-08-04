import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';

export const BillOfSaleGenerator: React.FC = () => {
  const [sellerName, setSellerName] = useState('John Smith');
  const [buyerName, setBuyerName] = useState('Jane Doe');
  const [itemDescription, setItemDescription] = useState('2018 Honda Civic VIN #1HGCR2F34JA000000');
  const [price, setPrice] = useState<number>(14500);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Bill of Sale Generator</h2>
            <p className="text-slate-400 text-sm">Create legal bill of sale documents for vehicle and property sales.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Seller Full Name</label>
            <input
              type="text"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Buyer Full Name</label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Item / Property Description</label>
            <input
              type="text"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Purchase Price ($)</label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Date of Sale</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Download Bill of Sale</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center uppercase tracking-widest text-slate-900 border-b pb-4">
          BILL OF SALE
        </h1>

        <p>
          For and in consideration of the sum of <strong>${(price || 0).toLocaleString()} USD</strong>, paid by <strong>{buyerName || '[Buyer Name]'}</strong> ("Buyer"), the undersigned <strong>{sellerName || '[Seller Name]'}</strong> ("Seller") does hereby grant, sell, transfer, and deliver unto Buyer the following personal property:
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 font-sans text-xs sm:text-sm font-semibold rounded-lg text-slate-800">
          {itemDescription || '[Property Description]'}
        </div>

        <p>
          Seller warrants that Seller is the lawful owner of the property and that the property is sold <strong>"AS-IS"</strong> without warranties or guarantees, expressed or implied, as to condition.
        </p>

        <p>Date of Execution: <strong>{date}</strong></p>

        <div className="pt-12 grid grid-cols-2 gap-12 font-sans text-xs">
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-800">Seller: {sellerName}</p>
            <p className="text-slate-500">Signature</p>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-800">Buyer: {buyerName}</p>
            <p className="text-slate-500">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};
