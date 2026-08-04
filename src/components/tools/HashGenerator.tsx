import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export const HashGenerator: React.FC = () => {
  const [text, setText] = useState('QuickForma 2026');
  const [hashes, setHashes] = useState<{ sha256: string; sha512: string }>({ sha256: '', sha512: '' });

  const generateHashes = async () => {
    if (!text) return;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const buf256 = await crypto.subtle.digest('SHA-256', data);
    const hash256 = Array.from(new Uint8Array(buf256)).map(b => b.toString(16).padStart(2, '0')).join('');

    const buf512 = await crypto.subtle.digest('SHA-512', data);
    const hash512 = Array.from(new Uint8Array(buf512)).map(b => b.toString(16).padStart(2, '0')).join('');

    setHashes({ sha256: hash256, sha512: hash512 });
  };

  React.useEffect(() => {
    generateHashes();
  }, [text]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Cryptographic Hash Generator</h2>
            <p className="text-slate-600 text-sm">Generate SHA-256 and SHA-512 hashes using browser Web Crypto API.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Input String</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type string to hash..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
            />
          </div>

          <div className="space-y-3 pt-4">
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">SHA-256 Hash</span>
              <p className="font-mono text-xs text-slate-200 break-all">{hashes.sha256 || '...'}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">SHA-512 Hash</span>
              <p className="font-mono text-xs text-slate-200 break-all">{hashes.sha512 || '...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
