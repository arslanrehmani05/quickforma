import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';

export const BillOfLadingGenerator: React.FC = () => {
  const [shipperName, setShipperName] = useState('Global Logistics Hub');
  const [consigneeName, setConsigneeName] = useState('Metro Retail Wholesalers');
  const [bolNumber, setBolNumber] = useState('BOL-2026-8891');
  const [carrierName, setCarrierName] = useState('Swift Freight Transports');
  const [itemDescription, setItemDescription] = useState('4 Pallets of Consumer Electronic Accessories (Weight: 1,450 lbs)');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Bill of Lading (BOL) Generator</h2>
            <p className="text-slate-400 text-sm">Generate standard shipping itemization Bill of Lading forms.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Shipper / Origin Company</label>
            <input
              type="text"
              value={shipperName}
              onChange={(e) => setShipperName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Consignee / Destination Company</label>
            <input
              type="text"
              value={consigneeName}
              onChange={(e) => setConsigneeName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">BOL Number</label>
            <input
              type="text"
              value={bolNumber}
              onChange={(e) => setBolNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Carrier Name</label>
            <input
              type="text"
              value={carrierName}
              onChange={(e) => setCarrierName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Freight / Cargo Description</label>
            <textarea
              rows={2}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Bill of Lading</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 font-sans leading-relaxed text-sm max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">UNIFORM BILL OF LADING</h1>
            <p className="text-xs text-slate-500">Freight Manifest Document</p>
          </div>
          <p className="font-mono text-sm font-bold text-slate-800">{bolNumber}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs p-4 bg-slate-50 border rounded-xl">
          <div>
            <span className="font-bold text-slate-500 uppercase">Shipper:</span>
            <p className="font-semibold text-slate-800">{shipperName}</p>
          </div>
          <div>
            <span className="font-bold text-slate-500 uppercase">Consignee:</span>
            <p className="font-semibold text-slate-800">{consigneeName}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Freight Description</h3>
          <p className="p-3 bg-slate-50 border rounded font-mono text-xs text-slate-800">{itemDescription}</p>
        </div>
      </div>
    </div>
  );
};
