import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';

export const BillOfLadingGenerator: React.FC = () => {
  const [shipper, setShipper] = useState('Dunder Mifflin Paper Co.');
  const [consignee, setConsignee] = useState('Vance Refrigeration');
  const [carrier, setCarrier] = useState('FedEx Freight');
  const [cargoDetails, setCargoDetails] = useState('2 Pallets Premium 24lb Copy Paper (Total 1,200 lbs)');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Bill of Lading (BOL) Shipping Manifest Generator</h2>
            <p className="text-slate-600 text-sm">Generate freight bill of lading documents for logistics and shipments.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Shipper (From)</label>
            <input type="text" value={shipper} onChange={(e) => setShipper(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Consignee (To)</label>
            <input type="text" value={consignee} onChange={(e) => setConsignee(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Carrier Name</label>
            <input type="text" value={carrier} onChange={(e) => setCarrier(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Cargo / Goods Description</label>
            <input type="text" value={cargoDetails} onChange={(e) => setCargoDetails(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          <span>Print / Save Bill of Lading PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-sans leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">STRAIGHT BILL OF LADING</h1>
            <p className="text-xs text-slate-500">Non-Negotiable Freight Manifest</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">BOL-881923</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div><p className="font-bold text-slate-500 uppercase">Shipper:</p><p className="font-semibold text-slate-900">{shipper}</p></div>
          <div><p className="font-bold text-slate-500 uppercase">Consignee:</p><p className="font-semibold text-slate-900">{consignee}</p></div>
        </div>
        <div className="pt-2 text-xs">
          <p className="font-bold text-slate-500 uppercase">Carrier:</p>
          <p className="font-semibold text-slate-900">{carrier}</p>
        </div>
        <div className="pt-2 text-xs">
          <p className="font-bold text-slate-500 uppercase">Cargo Description:</p>
          <p className="font-semibold text-slate-900">{cargoDetails}</p>
        </div>
      </div>
    </div>
  );
};
