import React, { useState, useEffect } from "react";
import { KeyRound, ShieldCheck, Copy, RefreshCw } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const HmacGenerator: React.FC = () => {
  const [secretKey, setSecretKey] = useState<string>("whsec_98a72b6c1e345f890d234a");
  const [messagePayload, setMessagePayload] = useState<string>('{"event":"payment_intent.succeeded","amount":14900,"currency":"usd"}');
  const [hashAlgorithm, setHashAlgorithm] = useState<"SHA-256" | "SHA-384" | "SHA-512">("SHA-256");
  const [outputEncoding, setOutputEncoding] = useState<"hex" | "base64">("hex");
  const [hmacDigest, setHmacDigest] = useState<string>("");

  useEffect(() => {
    let active = true;
    const computeHmac = async () => {
      try {
        if (!secretKey || !messagePayload) {
          if (active) setHmacDigest("");
          return;
        }
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secretKey);
        const msgData = encoder.encode(messagePayload);

        const cryptoKey = await window.crypto.subtle.importKey(
          "raw",
          keyData,
          { name: "HMAC", hash: { name: hashAlgorithm } },
          false,
          ["sign"]
        );

        const signatureBuffer = await window.crypto.subtle.sign("HMAC", cryptoKey, msgData);
        const signatureBytes = new Uint8Array(signatureBuffer);

        if (outputEncoding === "hex") {
          const hex = Array.from(signatureBytes)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          if (active) setHmacDigest(hex);
        } else {
          let binary = "";
          for (let i = 0; i < signatureBytes.byteLength; i++) {
            binary += String.fromCharCode(signatureBytes[i]);
          }
          if (active) setHmacDigest(window.btoa(binary));
        }
      } catch (err) {
        if (active) setHmacDigest("Error computing cryptographic HMAC signature");
      }
    };
    computeHmac();
    return () => {
      active = false;
    };
  }, [secretKey, messagePayload, hashAlgorithm, outputEncoding]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={KeyRound}
            title="HMAC Webhook & API Signature Generator"
            description="Generate client-side HMAC signatures using SHA-256, SHA-384, or SHA-512 via the native Web Cryptography API."
          />
          <ResetButton onReset={() => {
            setSecretKey("whsec_98a72b6c1e345f890d234a");
            setMessagePayload('{"event":"payment_intent.succeeded","amount":14900,"currency":"usd"}');
            setHashAlgorithm("SHA-256");
            setOutputEncoding("hex");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Secret Key (Shared Secret)"
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hash Algorithm</label>
              <select
                value={hashAlgorithm}
                onChange={(e) => setHashAlgorithm(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              >
                <option value="SHA-256">HMAC-SHA256 (Stripe, GitHub)</option>
                <option value="SHA-384">HMAC-SHA384</option>
                <option value="SHA-512">HMAC-SHA512 (Shopify, Kraken)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Encoding</label>
              <select
                value={outputEncoding}
                onChange={(e) => setOutputEncoding(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
              >
                <option value="hex">Hexadecimal (lowercase)</option>
                <option value="base64">Base64</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Message Payload / Request Body</label>
          <textarea
            rows={4}
            value={messagePayload}
            onChange={(e) => setMessagePayload(e.target.value)}
            className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste raw request JSON or string payload..."
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Computed HMAC ({hashAlgorithm} - {outputEncoding})
            </span>
            <CopyButton textToCopy={hmacDigest} />
          </div>
          <div className="p-3 bg-slate-950 text-indigo-300 font-mono text-xs sm:text-sm rounded-xl break-all select-all border border-slate-800">
            {hmacDigest || "Generating signature..."}
          </div>
        </div>
      </div>
    </div>
  );
};
