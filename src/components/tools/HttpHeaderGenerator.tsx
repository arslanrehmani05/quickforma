import React, { useState } from "react";
import { ShieldCheck, Server, Globe, FileCode, Check, Copy } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const HttpHeaderGenerator: React.FC = () => {
  const [serverType, setServerType] = useState<"nginx" | "apache" | "vercel" | "raw">("nginx");
  const [enableHsts, setEnableHsts] = useState<boolean>(true);
  const [hstsMaxAge, setHstsMaxAge] = useState<number>(31536000);
  const [hstsSubdomains, setHstsSubdomains] = useState<boolean>(true);
  const [xFrameOptions, setXFrameOptions] = useState<"DENY" | "SAMEORIGIN">("SAMEORIGIN");
  const [xContentTypeOptions, setXContentTypeOptions] = useState<boolean>(true);
  const [referrerPolicy, setReferrerPolicy] = useState<string>("strict-origin-when-cross-origin");
  const [enableCors, setEnableCors] = useState<boolean>(false);
  const [corsOrigin, setCorsOrigin] = useState<string>("*");

  const buildHeaders = (): string => {
    const headers: { [key: string]: string } = {};

    if (enableHsts) {
      headers["Strict-Transport-Security"] = `max-age=${hstsMaxAge}${hstsSubdomains ? "; includeSubDomains; preload" : ""}`;
    }
    if (xFrameOptions) {
      headers["X-Frame-Options"] = xFrameOptions;
    }
    if (xContentTypeOptions) {
      headers["X-Content-Type-Options"] = "nosniff";
    }
    if (referrerPolicy) {
      headers["Referrer-Policy"] = referrerPolicy;
    }
    headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";
    headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";

    if (enableCors) {
      headers["Access-Control-Allow-Origin"] = corsOrigin;
      headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE";
      headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
    }

    if (serverType === "nginx") {
      return Object.entries(headers)
        .map(([k, v]) => `add_header ${k} "${v}" always;`)
        .join("\n");
    } else if (serverType === "apache") {
      return "<IfModule mod_headers.c>\n" +
        Object.entries(headers)
          .map(([k, v]) => `  Header set ${k} "${v}"`)
          .join("\n") +
        "\n</IfModule>";
    } else if (serverType === "vercel") {
      const vercelHeaders = Object.entries(headers).map(([k, v]) => ({ key: k, value: v }));
      return JSON.stringify(
        {
          headers: [
            {
              source: "/(.*)",
              headers: vercelHeaders
            }
          ]
        },
        null,
        2
      );
    } else {
      return Object.entries(headers)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
    }
  };

  const outputSnippet = buildHeaders();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={ShieldCheck}
            title="HTTP Security Headers & CORS Policy Generator"
            description="Generate rock-solid HSTS, CSP, X-Frame-Options, and CORS security headers for Nginx, Apache, and Vercel hosting."
          />
          <ResetButton onReset={() => {
            setServerType("nginx");
            setEnableHsts(true);
            setHstsMaxAge(31536000);
            setHstsSubdomains(true);
            setXFrameOptions("SAMEORIGIN");
            setXContentTypeOptions(true);
            setReferrerPolicy("strict-origin-when-cross-origin");
            setEnableCors(false);
            setCorsOrigin("*");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Target Web Server / Platform</label>
            <select
              value={serverType}
              onChange={(e) => setServerType(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
            >
              <option value="nginx">Nginx (nginx.conf)</option>
              <option value="apache">Apache (.htaccess)</option>
              <option value="vercel">Vercel (vercel.json)</option>
              <option value="raw">Raw HTTP Headers</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">X-Frame-Options (Clickjacking)</label>
            <select
              value={xFrameOptions}
              onChange={(e) => setXFrameOptions(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium"
            >
              <option value="SAMEORIGIN">SAMEORIGIN (Allow framing from same domain)</option>
              <option value="DENY">DENY (Disallow all iframes)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Referrer Policy</label>
            <select
              value={referrerPolicy}
              onChange={(e) => setReferrerPolicy(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium"
            >
              <option value="strict-origin-when-cross-origin">strict-origin-when-cross-origin</option>
              <option value="no-referrer">no-referrer</option>
              <option value="same-origin">same-origin</option>
            </select>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={enableHsts}
                onChange={(e) => setEnableHsts(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Strict-Transport-Security (HSTS 1-Year)
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={xContentTypeOptions}
                onChange={(e) => setXContentTypeOptions(e.target.checked)}
                className="rounded text-indigo-600"
              />
              X-Content-Type-Options: nosniff
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
              <input
                type="checkbox"
                checked={enableCors}
                onChange={(e) => setEnableCors(e.target.checked)}
                className="rounded text-indigo-600"
              />
              Enable CORS Headers
            </label>
          </div>

          {enableCors && (
            <div className="pt-2">
              <InputField
                label="Allowed CORS Origin (e.g. * or https://app.example.com)"
                type="text"
                value={corsOrigin}
                onChange={(e) => setCorsOrigin(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-600" /> Config Output ({serverType.toUpperCase()})
            </h3>
            <CopyButton textToCopy={outputSnippet} />
          </div>
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-all">
            {outputSnippet}
          </div>
        </div>
      </div>
    </div>
  );
};
