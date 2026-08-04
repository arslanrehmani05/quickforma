import React, { useState } from 'react';
import { Code, AlertCircle } from 'lucide-react';
import { CopyButton } from '../common/CopyButton';

export const JsonFormatterValidator: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('{"name":"QuickForma","type":"utility","version":1.0,"features":["client-side","zero-api"]}');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setFormattedJson('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">JSON Formatter & Validator</h2>
            <p className="text-slate-600 text-sm">Format, beautify, minify, and validate JSON data structures in real time.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Raw JSON Input</label>
            <textarea
              rows={6}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste raw JSON here..."
              className="w-full p-4 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 resize-none shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleFormat}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-sm"
            >
              Format & Beautify
            </button>
            <button
              onClick={handleMinify}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
            >
              Minify JSON
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {formattedJson && (
            <div className="relative">
              <div className="flex justify-between items-center bg-slate-100 px-4 py-2 rounded-t-xl border-t border-x border-slate-200 text-xs text-slate-700 font-bold">
                <span>Formatted Output</span>
                <CopyButton textToCopy={formattedJson} variant="secondary" />
              </div>
              <pre className="p-4 bg-slate-50 text-indigo-900 font-mono text-xs rounded-b-xl border border-slate-200 overflow-x-auto max-h-96">
                {formattedJson}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
