import React, { useState } from 'react';
import { KeyRound, Copy, Check, RefreshCw } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = '0123456789';
    const sym = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = lower;
    if (useUppercase) chars += upper;
    if (useNumbers) chars += num;
    if (useSymbols) chars += sym;

    let res = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      res += chars[array[i] % chars.length];
    }
    setPassword(res);
  };

  React.useEffect(() => {
    generatePassword();
  }, [length, useSymbols, useNumbers, useUppercase]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Secure Password Generator</h2>
            <p className="text-slate-600 text-sm">Generate cryptographic high-entropy passwords with custom length & rules.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Password Output Box */}
          <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-between font-mono text-base sm:text-lg text-indigo-950 font-bold break-all shadow-xs">
            <span>{password || '...'}</span>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <button onClick={generatePassword} className="p-2 hover:bg-indigo-100 rounded-xl text-indigo-600" title="Regenerate">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button onClick={handleCopy} className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="flex justify-between text-xs font-semibold text-slate-700 uppercase mb-2">
                <span>Password Length ({length} Characters)</span>
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                <span>Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                <span>Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-xl border border-slate-200">
                <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                <span>Symbols (!@#$)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
