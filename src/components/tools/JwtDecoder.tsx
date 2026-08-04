import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const JwtDecoder: React.FC = () => {
  const [jwt, setJwt] = useState<string>('');
  const [header, setHeader] = useState<string>('');
  const [payload, setPayload] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleDecode = (token: string) => {
    setJwt(token);
    setError('');
    setHeader('');
    setPayload('');

    if (!token.trim()) return;

    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT format. A valid JSON Web Token consists of 3 parts separated by dots.');
      return;
    }

    try {
      const base64UrlDecode = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const decodedHeader = JSON.stringify(JSON.parse(base64UrlDecode(parts[0])), null, 2);
      const decodedPayload = JSON.stringify(JSON.parse(base64UrlDecode(parts[1])), null, 2);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
    } catch (err) {
      setError('Failed to parse JWT payload. Ensure the token is valid Base64Url JSON.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <ShieldCheck className="w-5 h-5" />
            <span>JWT Decoder (Client-Side)</span>
          </div>
          <ResetButton onReset={() => { setJwt(''); setHeader(''); setPayload(''); setError(''); }} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Encoded JSON Web Token (JWT)
          </label>
          <textarea
            value={jwt}
            onChange={(e) => handleDecode(e.target.value)}
            placeholder="Paste eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            rows={4}
            className="w-full font-mono text-xs p-3 bg-white border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-black text-zinc-900 resize-none"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Decoded Header & Payload */}
        {header && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Header (Algorithm & Type)</span>
                <CopyButton textToCopy={header} />
              </div>
              <textarea
                readOnly
                value={header}
                rows={8}
                className="w-full font-mono text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg outline-none text-zinc-900 resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Payload (Data Claims)</span>
                <CopyButton textToCopy={payload} />
              </div>
              <textarea
                readOnly
                value={payload}
                rows={8}
                className="w-full font-mono text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg outline-none text-zinc-900 resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
