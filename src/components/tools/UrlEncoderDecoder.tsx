import React, { useState } from 'react';
import { Globe } from 'lucide-react';

export const UrlEncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('https://quickforma.com/search?query=free tools & privacy=100%');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput('Error: Could not process URL string');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">URL Encoder & Decoder</h2>
            <p className="text-slate-600 text-sm">Safely encode special query parameters or decode URL strings.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-xl text-xs font-bold ${mode === 'encode' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
            >
              Encode Mode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-xl text-xs font-bold ${mode === 'decode' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'}`}
            >
              Decode Mode
            </button>
          </div>

          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-4 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 resize-none shadow-xs"
          />

          <button
            onClick={handleProcess}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-sm"
          >
            {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
          </button>

          {output && (
            <div className="p-4 rounded-xl bg-slate-900 font-mono text-xs text-indigo-300 break-all">
              {output}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
