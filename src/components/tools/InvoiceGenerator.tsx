import React, { useState } from 'react';
import { Plus, Trash2, Printer, Building2, FileText } from 'lucide-react';
import { InvoiceData, InvoiceItem } from '../../types';

export const InvoiceGenerator: React.FC = () => {
  const [data, setData] = useState<InvoiceData>({
    invoiceNumber: 'INV-2026-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    senderName: 'Apex Creative Studio',
    senderEmail: 'hello@apexstudio.com',
    senderAddress: '100 Innovation Way, Suite 400\nSan Francisco, CA 94105',
    clientName: 'Acme Global Corp',
    clientEmail: 'billing@acmeglobal.com',
    clientAddress: '500 Commerce Blvd\nNew York, NY 10001',
    items: [
      { id: '1', description: 'Brand Identity Design & UI Kit', quantity: 1, rate: 2500 },
      { id: '2', description: 'Web Application Development (Frontend)', quantity: 40, rate: 85 }
    ],
    taxPercent: 8.5,
    discountPercent: 5,
    currency: '$',
    notes: 'Thank you for your business! Please remit payment within 14 days.',
    terms: 'Late payments are subject to a 1.5% monthly finance charge.',
    logoUrl: ''
  });

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0
    };
    setData({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    if (data.items.length === 1) return;
    setData({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setData({
      ...data,
      items: data.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const discountAmount = (subtotal * data.discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * data.taxPercent) / 100;
  const grandTotal = taxableAmount + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs no-print">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            Instant Invoice Generator
          </h2>
          <p className="text-xs text-slate-500">100% Client-Side. No account required. Download & Print PDF instantly.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-all text-sm"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form */}
        <div className="lg:col-span-6 space-y-6 no-print">
          {/* Sender & Receiver Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" /> Business & Client Details
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Currency</label>
                <select
                  value={data.currency}
                  onChange={(e) => setData({ ...data, currency: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                >
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                  <option value="£">GBP (£)</option>
                  <option value="CAD $">CAD ($)</option>
                  <option value="AUD $">AUD ($)</option>
                  <option value="₹">INR (₹)</option>
                  <option value="¥">JPY (¥)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={data.invoiceNumber}
                  onChange={(e) => setData({ ...data, invoiceNumber: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Invoice Date</label>
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={data.dueDate}
                  onChange={(e) => setData({ ...data, dueDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                />
              </div>
            </div>

            <hr className="border-slate-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sender Details */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800">Your Business (Sender)</span>
                <input
                  type="text"
                  placeholder="Business Name"
                  value={data.senderName}
                  onChange={(e) => setData({ ...data, senderName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  value={data.senderEmail}
                  onChange={(e) => setData({ ...data, senderEmail: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                />
                <textarea
                  placeholder="Business Address"
                  rows={2}
                  value={data.senderAddress}
                  onChange={(e) => setData({ ...data, senderAddress: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600 resize-none"
                />
              </div>

              {/* Client Details */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800">Client Details (Recipient)</span>
                <input
                  type="text"
                  placeholder="Client Name / Company"
                  value={data.clientName}
                  onChange={(e) => setData({ ...data, clientName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                />
                <input
                  type="email"
                  placeholder="Client Email"
                  value={data.clientEmail}
                  onChange={(e) => setData({ ...data, clientEmail: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                />
                <textarea
                  placeholder="Client Address"
                  rows={2}
                  value={data.clientAddress}
                  onChange={(e) => setData({ ...data, clientAddress: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Line Items Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Line Items</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {data.items.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    className="w-16 bg-white border border-slate-300 rounded-xl px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600 text-center"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                    className="w-20 bg-white border border-slate-300 rounded-xl px-2 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600 text-right"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Tax & Discounts */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Discount Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.discountPercent}
                  onChange={(e) => setData({ ...data, discountPercent: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tax Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.taxPercent}
                  onChange={(e) => setData({ ...data, taxPercent: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Invoice Preview (A4 Sheet Simulation) */}
        <div className="lg:col-span-6">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md text-slate-900 text-sm font-sans space-y-6">
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">INVOICE</h1>
                <p className="text-xs text-indigo-600 font-bold mt-1">#{data.invoiceNumber}</p>
              </div>
              <div className="text-right text-xs text-slate-600 space-y-1">
                <p><span className="font-semibold text-slate-800">Date:</span> {data.date}</p>
                <p><span className="font-semibold text-slate-800">Due Date:</span> {data.dueDate}</p>
              </div>
            </div>

            {/* Parties Info */}
            <div className="grid grid-cols-2 gap-6 text-xs border-b border-slate-200 pb-6">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">From</span>
                <p className="font-bold text-slate-900">{data.senderName || 'Your Business Name'}</p>
                <p className="text-slate-600 whitespace-pre-line">{data.senderAddress}</p>
                <p className="text-slate-600">{data.senderEmail}</p>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">Billed To</span>
                <p className="font-bold text-slate-900">{data.clientName || 'Client Business Name'}</p>
                <p className="text-slate-600 whitespace-pre-line">{data.clientAddress}</p>
                <p className="text-slate-600">{data.clientEmail}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Rate</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2.5 font-medium text-slate-800">{item.description || 'Service/Item'}</td>
                    <td className="py-2.5 text-center text-slate-600">{item.quantity}</td>
                    <td className="py-2.5 text-right text-slate-600">{data.currency}{item.rate.toFixed(2)}</td>
                    <td className="py-2.5 text-right font-semibold text-slate-900">{data.currency}{(item.quantity * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Breakdown */}
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-medium text-slate-900">{data.currency}{subtotal.toFixed(2)}</span>
                </div>
                {data.discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({data.discountPercent}%):</span>
                    <span>-{data.currency}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {data.taxPercent > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Tax ({data.taxPercent}%):</span>
                    <span>+{data.currency}{taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount Due:</span>
                  <span className="text-indigo-600">{data.currency}{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            {(data.notes || data.terms) && (
              <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 space-y-2">
                {data.notes && <p><span className="font-semibold text-slate-700">Notes:</span> {data.notes}</p>}
                {data.terms && <p><span className="font-semibold text-slate-700">Terms:</span> {data.terms}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
