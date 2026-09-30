import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

export const PdfPageCounter: React.FC = () => {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = function () {
      const buffer = reader.result as ArrayBuffer;
      const text = new TextDecoder("latin1").decode(buffer);
      const matches = text.match(/\/Type\s*\/Page\b/g);
      setPageCount(matches ? matches.length : 1);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">PDF Page Counter</h2>
            <p className="text-slate-600 text-sm">Upload PDF documents to count total pages instantly with zero server uploads.</p>
          </div>
        </div>

        <div className="space-y-6">
          <label className="border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-50 hover:bg-indigo-50/50">
            <Upload className="w-10 h-10 text-slate-400 mb-3" />
            <span className="text-sm font-bold text-slate-800">Click to Select PDF File</span>
            <span className="text-xs text-slate-500 mt-1">100% Client-Side Local Processing</span>
            <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          </label>

          {fileName && (
            <div className="p-6 rounded-2xl bg-indigo-600 text-white flex justify-between items-center shadow-md">
              <div>
                <span className="text-xs text-indigo-200 font-bold  block">PDF File Loaded</span>
                <span className="text-base font-bold text-white">{fileName}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-indigo-200 font-bold  block">Total Pages</span>
                <span className="text-3xl font-extrabold text-white">{pageCount || '...'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
