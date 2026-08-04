import React, { useState } from 'react';
import { Binary } from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';

export const Base64EncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('Hello QuickForma!');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch {
      setOutput('Error: Invalid string for Base64 conversion');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Binary className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Base64 Encoder & Decoder</h2>
              <p className="text-slate-600 text-sm">Encode text to Base64 format or decode Base64 data instantly.</p>
            </div>
          </div>
          <ResetButton onReset={() => { setInput(''); setOutput(''); }} label="Clear" />
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'encode' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Encode Mode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'decode' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              Decode Mode
            </button>
          </div>

          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text..."
            className="w-full p-4 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 resize-none shadow-xs"
          />

          <button
            onClick={handleConvert}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-sm"
          >
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </button>

          {output && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
              <div className="font-mono text-xs text-slate-900 break-all flex-1">
                <span className="block text-slate-500 text-[10px] uppercase mb-1 font-bold">Processed Base64 Result</span>
                {output}
              </div>
              <CopyButton textToCopy={output} variant="secondary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
