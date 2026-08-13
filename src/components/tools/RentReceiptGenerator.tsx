import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

export const RentReceiptGenerator: React.FC = () => {
  const [landlordName, setLandlordName] = useState('Robert California');
  const [tenantName, setTenantName] = useState('Pam Beesly');
  const [propertyAddress, setPropertyAddress] = useState('1725 Slough Avenue, Suite 200, Scranton, PA');
  const [rentAmount, setRentAmount] = useState<number>(1450);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Tenant Rent Receipt Generator</h2>
            <p className="text-slate-600 text-sm">Generate tenant rental payment proof receipts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Landlord Name</label>
            <input type="text" value={landlordName} onChange={(e) => setLandlordName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Tenant Name</label>
            <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Property Address</label>
            <input type="text" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
          <div>
            <label className="block text-slate-700 text-xs font-semibold  mb-2">Rent Amount ($)</label>
            <input type="number" min="0" value={rentAmount} onChange={(e) => setRentAmount(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs" />
          </div>
        </div>

        <button onClick={() => window.print()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
          <Printer className="w-4 h-4" />
          <span>Print / Save Rent Receipt PDF</span>
        </button>
      </div>

      <div className="p-8 sm:p-10 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 font-sans leading-relaxed text-sm max-w-md mx-auto space-y-4">
        <div className="text-center border-b border-slate-200 pb-4">
          <h1 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">RENT PAYMENT RECEIPT</h1>
        </div>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex justify-between"><span>Tenant:</span><span className="font-semibold text-slate-900">{tenantName}</span></div>
          <div className="flex justify-between"><span>Landlord:</span><span className="font-semibold text-slate-900">{landlordName}</span></div>
          <div className="flex justify-between"><span>Property:</span><span className="font-semibold text-slate-900">{propertyAddress}</span></div>
        </div>
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
          <span>Amount Paid:</span>
          <span className="text-indigo-600 text-xl">${(rentAmount || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
