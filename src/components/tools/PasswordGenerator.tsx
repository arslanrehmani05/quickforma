import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, Check, RefreshCw } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(18);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    if (!chars) {
      setPassword('');
      return;
    }

    const randomBuffer = new Uint32Array(length);
    window.crypto.getRandomValues(randomBuffer);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[randomBuffer[i] % chars.length];
    }
    setPassword(result);
  };

  const getEntropy = () => {
    let pool = 0;
    if (useUpper) pool += 26;
    if (useLower) pool += 26;
    if (useNumbers) pool += 10;
    if (useSymbols) pool += 32;
    if (pool === 0) return 0;
    return Math.round(length * Math.log2(pool));
  };

  const entropy = getEntropy();

  const getStrengthLabel = () => {
    if (entropy < 40) return { label: 'Weak', bar: 'w-1/4 bg-zinc-400' };
    if (entropy < 65) return { label: 'Moderate', bar: 'w-2/4 bg-zinc-600' };
    if (entropy < 90) return { label: 'Strong', bar: 'w-3/4 bg-zinc-900 dark:bg-zinc-200' };
    return { label: 'High Entropy', bar: 'w-full bg-black dark:bg-white' };
  };

  const strength = getStrengthLabel();

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            Secure Password Generator
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">100% Client-side cryptographic entropy (window.crypto API).</p>
        </div>
      </div>

      {/* Main Password Output Card */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-4 rounded-2xl">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="Select options to generate password"
            className="w-full bg-transparent text-lg sm:text-xl font-mono text-zinc-900 dark:text-white font-bold outline-none tracking-wider select-all"
          />
          <button
            onClick={generatePassword}
            className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-xl transition-all"
            title="Regenerate"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleCopy}
            disabled={!password}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl shadow-sm transition-all text-sm disabled:opacity-50 hover:opacity-90"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Strength meter */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500 font-medium">Entropy Strength:</span>
            <span className="font-bold text-zinc-900 dark:text-white">{strength.label} ({entropy} bits)</span>
          </div>
          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700">
            <div className={`h-full transition-all duration-300 ${strength.bar}`} />
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-zinc-900 dark:text-white">Password Length</label>
              <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono font-bold rounded-lg border border-zinc-200 dark:border-zinc-700">
                {length} Characters
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
            />
          </div>

          {/* Character Toggles */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Uppercase (A-Z)', state: useUpper, setter: setUseUpper },
              { label: 'Lowercase (a-z)', state: useLower, setter: setUseLower },
              { label: 'Numbers (0-9)', state: useNumbers, setter: setUseNumbers },
              { label: 'Symbols (!@#$%)', state: useSymbols, setter: setUseSymbols },
            ].map((opt, idx) => (
              <button
                key={idx}
                onClick={() => opt.setter(!opt.state)}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold transition-all ${
                  opt.state
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <span>{opt.label}</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                  opt.state ? 'bg-white text-black dark:bg-black dark:text-white border-transparent' : 'border-zinc-400'
                }`}>
                  {opt.state && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
