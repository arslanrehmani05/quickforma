import React, { useState } from "react";
import { Network, Server, ArrowRight, Shield } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const IpRangeCalculator: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>("192.168.1.10");
  const [cidrPrefix, setCidrPrefix] = useState<number>(24);

  const ipToInt = (ip: string): number => {
    return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  };

  const intToIp = (num: number): string => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join(".");
  };

  const safePrefix = Math.max(0, Math.min(32, cidrPrefix));
  let netmaskInt = safePrefix === 0 ? 0 : (~0 << (32 - safePrefix)) >>> 0;
  let parsedIpInt = 0;
  let isValid = false;

  try {
    const parts = ipAddress.split(".");
    if (parts.length === 4 && parts.every((p) => !isNaN(Number(p)) && Number(p) >= 0 && Number(p) <= 255)) {
      parsedIpInt = ipToInt(ipAddress);
      isValid = true;
    }
  } catch (e) {
    isValid = false;
  }

  const networkInt = (parsedIpInt & netmaskInt) >>> 0;
  const broadcastInt = (networkInt | (~netmaskInt >>> 0)) >>> 0;
  const totalIps = Math.pow(2, 32 - safePrefix);
  const usableHosts = safePrefix >= 31 ? 0 : totalIps - 2;

  const networkAddress = isValid ? intToIp(networkInt) : "Invalid IP";
  const broadcastAddress = isValid ? intToIp(broadcastInt) : "Invalid IP";
  const subnetMask = intToIp(netmaskInt);
  const firstUsableIp = isValid && usableHosts > 0 ? intToIp(networkInt + 1) : "N/A";
  const lastUsableIp = isValid && usableHosts > 0 ? intToIp(broadcastInt - 1) : "N/A";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Network}
            title="IP Address Range & Subnet Gateway Solver"
            description="Calculate IPv4 network address, broadcast address, usable gateway range, and host capacities from CIDR prefix notations."
          />
          <ResetButton onReset={() => {
            setIpAddress("192.168.1.10");
            setCidrPrefix(24);
          }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="IPv4 Base Address"
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value.trim())}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              CIDR Subnet Mask Prefix (/{safePrefix})
            </label>
            <input
              type="range"
              min={8}
              max={32}
              value={safePrefix}
              onChange={(e) => setCidrPrefix(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
              <span>/8 (16.7M Hosts)</span>
              <span>/16 (65k)</span>
              <span>/24 (254)</span>
              <span>/30 (2)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard
            variant="light"
            title="Network Address"
            value={networkAddress}
            subtitle={`Subnet: ${subnetMask}`}
          />
          <ResultCard
            variant="light"
            title="Broadcast Address"
            value={broadcastAddress}
            subtitle="Last IP in range"
          />
          <ResultCard
            variant="light"
            title="First Usable Host"
            value={firstUsableIp}
            subtitle="Typically Default Gateway"
          />
          <ResultCard
            variant="light"
            title="Usable Client Hosts"
            value={usableHosts.toLocaleString()}
            subtitle={`Total addresses: ${totalIps.toLocaleString()}`}
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Usable Gateway & Host Range</h4>
          <div className="font-mono text-xs sm:text-sm text-slate-900 bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-indigo-600">{firstUsableIp}</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-indigo-600">{lastUsableIp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
