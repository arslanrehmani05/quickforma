import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

export const BillOfSaleGenerator: React.FC = () => {
  const [sellerName, setSellerName] = useState('Michael Scott');
  const [buyerName, setBuyerName] = useState('Dwight Schrute');
  const [itemDescription, setItemDescription] = useState('2018 Toyota Camry (VIN: 4T1B11HK8JU098712)');
  const [salePrice, setSalePrice] = useState<number>(12500);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">General Bill of Sale Generator</h2>
            <p className="text-slate-600 text-sm">Generate legal bill of sale documents for vehicles, equipment, and personal assets.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Seller Full Name</label>
            <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Buyer Full Name</label>
            <input type="text" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Item / Asset Description</label>
            <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Total Sale Price ($)</label>
            <input type="number" min="0" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          <span>Print / Save Bill of Sale PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-serif leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">BILL OF SALE</h1>
        </div>
        <p>For valuable consideration of <strong>${(salePrice || 0).toLocaleString()} USD</strong>, the undersigned Seller (<strong>{sellerName}</strong>) hereby sells and transfers to Buyer (<strong>{buyerName}</strong>) the following personal property: <strong>{itemDescription}</strong>.</p>
        <p>Seller warrants that the property is sold 'AS IS' without warranty express or implied, and that Seller holds full legal title.</p>
        <div className="pt-8 grid grid-cols-2 gap-8 text-xs font-sans">
          <div className="border-t border-slate-400 pt-2"><p className="font-bold">{sellerName} (Seller)</p></div>
          <div className="border-t border-slate-400 pt-2"><p className="font-bold">{buyerName} (Buyer)</p></div>
        </div>
      </div>
    </div>
  );
};
