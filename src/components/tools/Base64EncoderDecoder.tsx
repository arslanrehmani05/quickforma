import React, { useState } from 'react';
import { Binary, Copy, Check } from 'lucide-react';

export const Base64EncoderDecoder: React.FC = () => {
  const [input, setInput] = useState('Hello QuickForma!');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

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
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Binary className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Base64 Encoder & Decoder</h2>
            <p className="text-slate-400 text-sm">Encode text to Base64 format or decode Base64 data instantly.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Encode Mode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Decode Mode
            </button>
          </div>

          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none"
          />

          <button
            onClick={handleConvert}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all"
          >
            {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
          </button>

          {output && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative font-mono text-xs text-indigo-300 break-all">
              <span className="block text-slate-500 text-[10px] uppercase mb-1">Result</span>
              {output}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
