import React, { useState } from 'react';
import { Building, Printer } from 'lucide-react';

export const RentReceiptGenerator: React.FC = () => {
  const [landlordName, setLandlordName] = useState('Oakwood Properties LLC');
  const [tenantName, setTenantName] = useState('David Miller');
  const [propertyAddress, setPropertyAddress] = useState('742 Evergreen Terrace, Apt 4B, Springfield');
  const [rentAmount, setRentAmount] = useState<number>(1850);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [rentalPeriod, setRentalPeriod] = useState('August 2026');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl no-print">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Rent Receipt Generator</h2>
            <p className="text-slate-400 text-sm">Create tenant rent payment receipts for landlords and property managers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Landlord / Property Manager</label>
            <input
              type="text"
              value={landlordName}
              onChange={(e) => setLandlordName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Tenant Name</label>
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Rental Property Address</label>
            <input
              type="text"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Rent Paid ($)</label>
            <input
              type="number"
              min="0"
              value={rentAmount}
              onChange={(e) => setRentAmount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Rental Period Month/Year</label>
            <input
              type="text"
              value={rentalPeriod}
              onChange={(e) => setRentalPeriod(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Download Rent Receipt</span>
        </button>
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 font-sans leading-relaxed text-sm max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">RENT PAYMENT RECEIPT</h1>
            <p className="text-xs text-slate-500">{landlordName}</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">PAID</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
            <span className="text-slate-500">Tenant Name:</span>
            <span className="font-semibold text-slate-800">{tenantName}</span>
          </div>
          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
            <span className="text-slate-500">Property:</span>
            <span className="font-semibold text-slate-800 text-right">{propertyAddress}</span>
          </div>
          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
            <span className="text-slate-500">Rental Period:</span>
            <span className="font-semibold text-slate-800">{rentalPeriod}</span>
          </div>
          <div className="flex justify-between text-sm py-1 border-b border-slate-100">
            <span className="text-slate-500">Date Received:</span>
            <span className="font-semibold text-slate-800">{paymentDate}</span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center">
          <span className="font-bold text-slate-700">Total Rent Amount Paid</span>
          <span className="text-2xl font-extrabold text-slate-900 font-mono">${(rentAmount || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
