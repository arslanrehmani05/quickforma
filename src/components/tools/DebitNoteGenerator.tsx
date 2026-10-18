import React, { useState } from "react";
import { FileSpreadsheet, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const DebitNoteGenerator: React.FC = () => {
  const [buyerName, setBuyerName] = useState("Nexus Industrial Supplies Inc.");
  const [vendorName, setVendorName] = useState("Apex Component Wholesalers");
  const [originalInvoiceNo, setOriginalInvoiceNo] = useState("INV-2026-8841");
  const [debitNoteNo, setDebitNoteNo] = useState("DN-2026-0042");
  const [debitAmount, setDebitAmount] = useState("3250.00");
  const [reason, setReason] = useState("Damaged goods upon arrival (25 units crushed) & pricing discrepancy on PO line 4");

  const formattedDebitNote = `DEBIT NOTE

DEBIT NOTE NO: ${debitNoteNo}
DATE: ${new Date().toISOString().split("T")[0]}

ISSUED BY (BUYER):
${buyerName}

ISSUED TO (VENDOR):
${vendorName}

REFERENCE ORIGINAL INVOICE: ${originalInvoiceNo}
TOTAL DEBIT REQUESTED: $${Number(debitAmount).toFixed(2)} USD

REASON FOR DEBIT ADJUSTMENT:
${reason}

ACCOUNTING INSTRUCTIONS:
Please credit our commercial purchasing account for the amount specified above, or issue a formal Credit Note to offset against our next monthly accounts payable settlement.

Authorized Purchasing Agent: ____________________
Signature & Date: ______________________________
`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={FileSpreadsheet}
            title="Commercial Vendor Debit Note Generator"
            description="Generate formal commercial debit notes to request supplier credits for damaged goods, inventory returns, or invoice overbilling."
          />
          <ResetButton onReset={() => {
            setBuyerName("Nexus Industrial Supplies Inc.");
            setVendorName("Apex Component Wholesalers");
            setOriginalInvoiceNo("INV-2026-8841");
            setDebitNoteNo("DN-2026-0042");
            setDebitAmount("3250.00");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Buyer Business Name</label>
            <input type="text" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Vendor Name</label>
            <input type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Original Invoice Number</label>
            <input type="text" value={originalInvoiceNo} onChange={(e) => setOriginalInvoiceNo(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Debit Amount ($)</label>
            <input type="number" value={debitAmount} onChange={(e) => setDebitAmount(e.target.value)} className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Formatted Debit Note Document</span>
            <CopyButton textToCopy={formattedDebitNote} variant="ghost" />
          </div>
          <textarea readOnly rows={10} value={formattedDebitNote} className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-2xl outline-none border border-slate-800" />
        </div>
      </div>
    </div>
  );
};
