import React, { useState } from 'react';
import { Code, Copy, Check, AlertCircle } from 'lucide-react';

export const JsonFormatterValidator: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('{"name":"QuickForma","type":"utility","version":1.0,"features":["client-side","zero-api"]}');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson || jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">JSON Formatter & Validator</h2>
            <p className="text-slate-400 text-sm">Format, beautify, minify, and validate JSON data structures in real time.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Raw JSON Input</label>
            <textarea
              rows={6}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste raw JSON here..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleFormat}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all"
            >
              Format & Beautify
            </button>
            <button
              onClick={handleMinify}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-all"
            >
              Minify JSON
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {formattedJson && (
            <div className="relative">
              <div className="flex justify-between items-center bg-slate-950 px-4 py-2 border-t border-x border-slate-800 rounded-t-xl text-xs text-slate-400">
                <span>Formatted Output</span>
                <button onClick={handleCopy} className="hover:text-indigo-400 flex items-center gap-1">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-b-xl text-emerald-400 font-mono text-xs overflow-x-auto max-h-96">
                {formattedJson}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
