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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 no-print">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Instant Invoice Generator
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">100% Client-Side. No account required. Download & Print PDF instantly.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold rounded-lg shadow-sm transition-all text-sm hover:opacity-90"
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
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Business & Client Details
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Currency</label>
                <select
                  value={data.currency}
                  onChange={(e) => setData({ ...data, currency: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none"
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
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={data.invoiceNumber}
                  onChange={(e) => setData({ ...data, invoiceNumber: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Invoice Date</label>
                <input
                  type="date"
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Due Date</label>
                <input
                  type="date"
                  value={data.dueDate}
                  onChange={(e) => setData({ ...data, dueDate: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">Your Business (Sender)</span>
                <input
                  type="text"
                  placeholder="Business Name"
                  value={data.senderName}
                  onChange={(e) => setData({ ...data, senderName: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  value={data.senderEmail}
                  onChange={(e) => setData({ ...data, senderEmail: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Address / Phone"
                  value={data.senderAddress}
                  onChange={(e) => setData({ ...data, senderAddress: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white resize-none"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">Billed To (Client)</span>
                <input
                  type="text"
                  placeholder="Client Name / Company"
                  value={data.clientName}
                  onChange={(e) => setData({ ...data, clientName: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Client Email"
                  value={data.clientEmail}
                  onChange={(e) => setData({ ...data, clientEmail: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white"
                />
                <textarea
                  rows={2}
                  placeholder="Client Address"
                  value={data.clientAddress}
                  onChange={(e) => setData({ ...data, clientAddress: e.target.value })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* Line Items Card */}
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Line Items</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-1 text-xs bg-black text-white dark:bg-white dark:text-black px-3 py-1.5 rounded-lg font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {data.items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white outline-none px-2 font-medium"
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white rounded px-2 py-1 text-center outline-none"
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    className="w-24 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white rounded px-2 py-1 text-right outline-none"
                  />
                  <span className="text-xs font-bold text-zinc-900 dark:text-white w-20 text-right">
                    {data.currency}{(item.quantity * item.rate).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.discountPercent}
                  onChange={(e) => setData({ ...data, discountPercent: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Tax (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.taxPercent}
                  onChange={(e) => setData({ ...data, taxPercent: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Visual Printable Preview */}
        <div className="lg:col-span-6">
          <div className="sticky top-20 bg-white text-zinc-900 p-8 rounded-2xl shadow-xl space-y-6 text-sm border border-zinc-200" id="invoice-preview">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-zinc-200 pb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">INVOICE</h1>
                <p className="text-zinc-500 text-xs font-semibold mt-1">#{data.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-zinc-900 text-base">{data.senderName || 'Your Business Name'}</h3>
                <p className="text-zinc-500 text-xs whitespace-pre-line leading-relaxed">{data.senderAddress}</p>
                <p className="text-zinc-500 text-xs">{data.senderEmail}</p>
              </div>
            </div>

            {/* Bill To & Dates */}
            <div className="grid grid-cols-2 gap-6 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Billed To</span>
                <p className="font-bold text-zinc-800">{data.clientName || 'Client Name'}</p>
                <p className="text-zinc-500 text-xs whitespace-pre-line">{data.clientAddress}</p>
                <p className="text-zinc-500 text-xs">{data.clientEmail}</p>
              </div>
              <div className="text-right space-y-1">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Invoice Date</span>
                  <span className="font-semibold text-zinc-700 text-xs">{data.date}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Payment Due</span>
                  <span className="font-bold text-black text-xs">{data.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-zinc-200 text-zinc-500 text-[11px] uppercase tracking-wider">
                  <th className="py-2 font-semibold">Description</th>
                  <th className="py-2 text-center font-semibold">Qty</th>
                  <th className="py-2 text-right font-semibold">Rate</th>
                  <th className="py-2 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {data.items.map((item) => (
                  <tr key={item.id} className="text-zinc-800">
                    <td className="py-3 font-medium">{item.description || 'Item description...'}</td>
                    <td className="py-3 text-center text-zinc-600">{item.quantity}</td>
                    <td className="py-3 text-right text-zinc-600">{data.currency}{item.rate.toFixed(2)}</td>
                    <td className="py-3 text-right font-bold text-zinc-900">{data.currency}{(item.quantity * item.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Calculations summary */}
            <div className="flex justify-end pt-4 border-t border-zinc-200">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-zinc-900">{data.currency}{subtotal.toFixed(2)}</span>
                </div>
                {data.discountPercent > 0 && (
                  <div className="flex justify-between text-zinc-600">
                    <span>Discount ({data.discountPercent}%):</span>
                    <span>-{data.currency}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {data.taxPercent > 0 && (
                  <div className="flex justify-between text-zinc-600">
                    <span>Tax ({data.taxPercent}%):</span>
                    <span>+{data.currency}{taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-zinc-900 pt-2 border-t-2 border-zinc-900">
                  <span>Total Due:</span>
                  <span>{data.currency}{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer notes */}
            <div className="pt-6 border-t border-zinc-100 text-xs text-zinc-500 space-y-1">
              {data.notes && <p><strong className="text-zinc-700">Notes:</strong> {data.notes}</p>}
              {data.terms && <p><strong className="text-zinc-700">Terms:</strong> {data.terms}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
