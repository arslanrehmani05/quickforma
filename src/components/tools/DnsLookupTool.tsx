import React, { useState } from "react";
import { Globe, Server, ShieldCheck, Copy, Check, FileText } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const DnsLookupTool: React.FC = () => {
  const [domainName, setDomainName] = useState<string>("quickforma.com");
  const [recordType, setRecordType] = useState<"A" | "AAAA" | "CNAME" | "MX" | "TXT" | "SPF">("TXT");
  const [ttlSeconds, setTtlSeconds] = useState<number>(3600);
  const [hostName, setHostName] = useState<string>("@");
  const [recordValue, setRecordValue] = useState<string>("v=spf1 include:_spf.google.com ~all");
  const [mxPriority, setMxPriority] = useState<number>(10);

  const cleanDomain = domainName.replace(/^https?:\/\//, "").replace(/\/.*$/, "").trim().toLowerCase();

  const generateZoneSnippet = (): string => {
    if (recordType === "MX") {
      return `${cleanDomain}.    ${ttlSeconds}    IN    MX    ${mxPriority}    ${recordValue}.`;
    } else if (recordType === "TXT" || recordType === "SPF") {
      return `${cleanDomain}.    ${ttlSeconds}    IN    TXT    "${recordValue}"`;
    } else {
      return `${cleanDomain}.    ${ttlSeconds}    IN    ${recordType}    ${recordValue}`;
    }
  };

  const zoneOutput = generateZoneSnippet();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Globe}
            title="DNS Record Syntax & BIND Zone File Builder"
            description="Generate RFC-compliant DNS zone records for A, AAAA, CNAME, MX mail exchangers, and SPF/DKIM TXT authentication."
          />
          <ResetButton onReset={() => {
            setDomainName("quickforma.com");
            setRecordType("TXT");
            setTtlSeconds(3600);
            setHostName("@");
            setRecordValue("v=spf1 include:_spf.google.com ~all");
            setMxPriority(10);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Root Domain Name"
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">DNS Record Type</label>
            <select
              value={recordType}
              onChange={(e) => {
                const type = e.target.value as any;
                setRecordType(type);
                if (type === "A") setRecordValue("192.0.2.1");
                else if (type === "AAAA") setRecordValue("2001:db8::1");
                else if (type === "CNAME") setRecordValue("app.hostingprovider.net");
                else if (type === "MX") setRecordValue("aspmx.l.google.com");
                else if (type === "TXT" || type === "SPF") setRecordValue("v=spf1 include:_spf.google.com ~all");
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500"
            >
              <option value="A">A Record (IPv4 Address)</option>
              <option value="AAAA">AAAA Record (IPv6 Address)</option>
              <option value="CNAME">CNAME (Alias)</option>
              <option value="MX">MX (Mail Exchanger)</option>
              <option value="TXT">TXT / SPF / DKIM Record</option>
            </select>
          </div>
          <InputField
            label="TTL (Time To Live in Seconds)"
            type="number"
            value={ttlSeconds}
            onChange={(e) => setTtlSeconds(Number(e.target.value))}
            min={60}
            max={86400}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Host / Subdomain (@ for apex)"
            type="text"
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
          />
          {recordType === "MX" && (
            <InputField
              label="MX Priority / Preference"
              type="number"
              value={mxPriority}
              onChange={(e) => setMxPriority(Number(e.target.value))}
              min={0}
              max={100}
            />
          )}
          <div className={recordType === "MX" ? "sm:col-span-1" : "sm:col-span-2"}>
            <InputField
              label="Target IP / Host / Value"
              type="text"
              value={recordValue}
              onChange={(e) => setRecordValue(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" /> BIND / Cloudflare Zone File Syntax
            </h3>
            <CopyButton textToCopy={zoneOutput} />
          </div>
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-sm leading-relaxed select-all">
            {zoneOutput}
          </div>
        </div>
      </div>
    </div>
  );
};
