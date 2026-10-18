import React, { useState } from "react";
import { Link, Globe, Check, Copy, Code2 } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const CanonicalTagGenerator: React.FC = () => {
  const [domainUrl, setDomainUrl] = useState<string>("https://quickforma.com");
  const [pagePath, setPagePath] = useState<string>("/tools/business-valuation-calculator");
  const [enforceTrailingSlash, setEnforceTrailingSlash] = useState<boolean>(false);
  const [stripQueryParams, setStripQueryParams] = useState<boolean>(true);
  const [includeHreflang, setIncludeHreflang] = useState<boolean>(false);
  const [defaultLanguage, setDefaultLanguage] = useState<string>("en");

  let cleanBase = domainUrl.trim().replace(/\/+$/, "");
  let cleanPath = pagePath.trim().replace(/^\/+/, "");

  if (stripQueryParams) {
    cleanPath = cleanPath.split("?")[0].split("#")[0];
  }

  let finalUrl = `${cleanBase}/${cleanPath}`;
  if (enforceTrailingSlash && !finalUrl.endsWith("/")) {
    finalUrl += "/";
  } else if (!enforceTrailingSlash && finalUrl.endsWith("/")) {
    finalUrl = finalUrl.replace(/\/+$/, "");
  }

  const htmlOutput = `<link rel="canonical" href="${finalUrl}" />${
    includeHreflang
      ? `\n<link rel="alternate" hreflang="${defaultLanguage}" href="${finalUrl}" />\n<link rel="alternate" hreflang="x-default" href="${finalUrl}" />`
      : ""
  }`;

  const httpHeaderOutput = `Link: <${finalUrl}>; rel="canonical"`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Link}
            title="Canonical URL Tag & HTTP Header Generator"
            description="Prevent duplicate content penalties across tracking parameters, pagination, and multi-domain environments."
          />
          <ResetButton onReset={() => {
            setDomainUrl("https://quickforma.com");
            setPagePath("/tools/business-valuation-calculator");
            setEnforceTrailingSlash(false);
            setStripQueryParams(true);
            setIncludeHreflang(false);
            setDefaultLanguage("en");
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Root Domain Protocol & Host"
            type="text"
            value={domainUrl}
            onChange={(e) => setDomainUrl(e.target.value)}
          />
          <InputField
            label="Canonical Page Route / Path"
            type="text"
            value={pagePath}
            onChange={(e) => setPagePath(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={stripQueryParams}
              onChange={(e) => setStripQueryParams(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Strip Query Parameters (utm_, ref)
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={enforceTrailingSlash}
              onChange={(e) => setEnforceTrailingSlash(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Enforce Trailing Slash (/)
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={includeHreflang}
              onChange={(e) => setIncludeHreflang(e.target.checked)}
              className="rounded text-indigo-600"
            />
            Include hreflang Tags
          </label>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-600" /> HTML &lt;head&gt; Tag
              </label>
              <CopyButton textToCopy={htmlOutput} />
            </div>
            <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm rounded-2xl select-all whitespace-pre-wrap">
              {htmlOutput}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-600" /> HTTP Response Header
              </label>
              <CopyButton textToCopy={httpHeaderOutput} />
            </div>
            <div className="p-3 bg-slate-900 text-indigo-300 font-mono text-xs sm:text-sm rounded-xl select-all">
              {httpHeaderOutput}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
