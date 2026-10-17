import React, { useState } from "react";
import { Globe, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

export const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState("QuickForma — Free Client-Side Business Calculators");
  const [description, setDescription] = useState("Free online financial calculators, document generators, and operational tools. 100% private, instant client-side execution in your browser.");
  const [canonical, setCanonical] = useState("https://www.quickforma.com");
  const [ogImage, setOgImage] = useState("https://www.quickforma.com/og-image.jpg");
  const [twitterHandle, setTwitterHandle] = useState("@quickforma");
  const [robots, setRobots] = useState("index, follow");
  const [copied, setCopied] = useState(false);

  const metaHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="robots" content="${robots}" />
<link rel="canonical" href="${canonical}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="${twitterHandle}" />
<meta name="twitter:url" content="${canonical}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${ogImage}" />`;

  const copyCode = () => {
    navigator.clipboard.writeText(metaHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Globe}
            title="SEO Meta Title & Open Graph Tag Generator"
            description="Generate HTML meta tags, OpenGraph social cards, and Twitter summary tags for web pages."
          />
          <ResetButton onReset={() => {
            setTitle("QuickForma — Free Client-Side Business Calculators");
            setDescription("Free online financial calculators, document generators, and operational tools.");
            setCanonical("https://www.quickforma.com");
          }} />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="SEO Page Title" value={title} onChange={(e) => setTitle(e.target.value)} helpText={`${title.length} characters (recommended: 50–60)`} />
            <InputField label="Canonical Website URL" value={canonical} onChange={(e) => setCanonical(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Meta Description ({description.length} chars / recommended 140–160)</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Open Graph Social Image URL" value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
            <InputField label="Twitter @Handle" value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} />
          </div>

          <ResultCard variant="dark" title="Generated HTML <head> Snippet">
            <div className="space-y-3">
              <div className="flex justify-end">
                <Button size="sm" variant="secondary" onClick={copyCode} className="flex items-center gap-1 font-mono text-xs">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied HTML!" : "Copy Meta Tags"}
                </Button>
              </div>
              <pre className="p-3 bg-black/40 rounded-xl text-xs font-mono text-indigo-200 overflow-x-auto max-h-56 leading-relaxed">
                {metaHtml}
              </pre>
            </div>
          </ResultCard>
        </div>
      </div>
    </div>
  );
};
