import React, { useState } from "react";
import { Braces, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { Button } from "../ui/Button";
import { ResetButton } from "../common/ResetButton";

export const SchemaMarkupGenerator: React.FC = () => {
  const [schemaType, setSchemaType] = useState<"Organization" | "LocalBusiness" | "FAQPage">("Organization");
  const [orgName, setOrgName] = useState("QuickForma Technologies");
  const [orgUrl, setOrgUrl] = useState("https://www.quickforma.com");
  const [orgLogo, setOrgLogo] = useState("https://www.quickforma.com/logo.png");
  const [faqQ1, setFaqQ1] = useState("Are QuickForma tools free to use?");
  const [faqA1, setFaqA1] = useState("Yes, 100% of QuickForma calculators and generators are free with no signup or paywalls.");
  const [copied, setCopied] = useState(false);

  const generateJsonLd = () => {
    if (schemaType === "Organization") {
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": orgName,
        "url": orgUrl,
        "logo": orgLogo,
      };
    }
    if (schemaType === "LocalBusiness") {
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": orgName,
        "url": orgUrl,
        "image": orgLogo,
        "priceRange": "$$",
      };
    }
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": faqQ1,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faqA1,
          },
        },
      ],
    };
  };

  const jsonLdString = `<script type="application/ld+json">\n${JSON.stringify(generateJsonLd(), null, 2)}\n</script>`;

  const copyJson = () => {
    navigator.clipboard.writeText(jsonLdString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Braces}
            title="JSON-LD Schema.org Generator for Local Business & FAQ"
            description="Generate valid Schema.org structured data markup for rich search engine result snippets."
          />
          <ResetButton onReset={() => {
            setSchemaType("Organization");
            setOrgName("QuickForma Technologies");
            setOrgUrl("https://www.quickforma.com");
          }} />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            {(["Organization", "LocalBusiness", "FAQPage"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSchemaType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  schemaType === type ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {schemaType !== "FAQPage" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <InputField label="Entity Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
              <InputField label="Website URL" value={orgUrl} onChange={(e) => setOrgUrl(e.target.value)} />
              <InputField label="Logo / Image URL" value={orgLogo} onChange={(e) => setOrgLogo(e.target.value)} />
            </div>
          ) : (
            <div className="space-y-3">
              <InputField label="FAQ Question #1" value={faqQ1} onChange={(e) => setFaqQ1(e.target.value)} />
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">FAQ Answer #1</label>
                <textarea
                  rows={2}
                  value={faqA1}
                  onChange={(e) => setFaqA1(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          )}

          <ResultCard variant="dark" title="Generated Schema JSON-LD">
            <div className="space-y-3">
              <div className="flex justify-end">
                <Button size="sm" variant="secondary" onClick={copyJson} className="flex items-center gap-1 font-mono text-xs">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied Script!" : "Copy JSON-LD"}
                </Button>
              </div>
              <pre className="p-3 bg-black/40 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto max-h-56 leading-relaxed">
                {jsonLdString}
              </pre>
            </div>
          </ResultCard>
        </div>
      </div>
    </div>
  );
};
