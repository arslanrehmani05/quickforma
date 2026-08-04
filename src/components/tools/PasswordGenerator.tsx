import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { ToolSeoWrapper } from '../seo/ToolSeoWrapper';
import { PASSWORD_GENERATOR_SEO } from '../../data/sampleToolSeoData';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const calculateEntropy = () => {
    let pool = 0;
    if (includeUppercase) pool += 26;
    if (includeLowercase) pool += 26;
    if (includeNumbers) pool += 10;
    if (includeSymbols) pool += 32;
    if (pool === 0 || length === 0) return 0;
    return Math.floor(length * Math.log2(pool));
  };

  const entropy = calculateEntropy();

  const getStrengthLabel = () => {
    if (entropy < 40) return { label: 'Weak', color: 'bg-rose-500' };
    if (entropy < 65) return { label: 'Moderate', color: 'bg-amber-500' };
    if (entropy < 90) return { label: 'Strong', color: 'bg-emerald-500' };
    return { label: 'Very Strong (Enterprise)', color: 'bg-indigo-600' };
  };

  const strength = getStrengthLabel();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 1. INTERACTIVE TOOL WIDGET (ALWAYS FIRST) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Cryptographic Password Generator</h2>
            <p className="text-slate-600 text-sm">Generate secure passwords powered by Web Crypto API entropy.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider break-all text-center sm:text-left">
              {password || 'Select options below'}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <CopyButton textToCopy={password} label="Copy Password" variant="secondary" />
              <ResetButton onReset={generatePassword} label="Regenerate" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-700 uppercase">Password Length ({length} characters)</label>
              <span className="text-xs font-mono font-bold text-slate-500">{entropy} Bits Entropy</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: `${Math.min(100, (entropy / 100) * 100)}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { id: 'uppercase', label: 'A-Z Uppercase', state: includeUppercase, set: setIncludeUppercase },
              { id: 'lowercase', label: 'a-z Lowercase', state: includeLowercase, set: setIncludeLowercase },
              { id: 'numbers', label: '0-9 Numbers', state: includeNumbers, set: setIncludeNumbers },
              { id: 'symbols', label: '!@# Symbols', state: includeSymbols, set: setIncludeSymbols },
            ].map((opt) => (
              <label key={opt.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={opt.state}
                  onChange={(e) => opt.set(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-600/20"
                />
                <span className="text-xs font-bold text-slate-800">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 2. STRUCTURED ON-PAGE SEO INTENT CONTENT HUB (ALWAYS BENEATH THE TOOL) */}
      <ToolSeoWrapper
        seoData={PASSWORD_GENERATOR_SEO}
        toolName="Password Generator"
        category="developer"
        toolId="password-generator"
      />
    </div>
  );
};
