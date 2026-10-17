import React, { useState } from "react";
import { Network, Server, Globe } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";

export const SubnetCalculator: React.FC = () => {
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [cidr, setCidr] = useState<number>(24);

  const calculateSubnet = () => {
    const parts = ipAddress.split(".").map(Number);
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255) || cidr < 0 || cidr > 32) {
      return null;
    }

    const ipInt = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = cidr === 32 ? networkInt : (networkInt | (~maskInt >>> 0)) >>> 0;

    const toIp = (num: number) => [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255,
    ].join(".");

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? 0 : totalHosts - 2;
    const firstHost = cidr >= 31 ? "N/A" : toIp(networkInt + 1);
    const lastHost = cidr >= 31 ? "N/A" : toIp(broadcastInt - 1);
    const wildcardMask = toIp((~maskInt) >>> 0);

    return {
      network: toIp(networkInt),
      broadcast: toIp(broadcastInt),
      mask: toIp(maskInt),
      wildcard: wildcardMask,
      firstHost,
      lastHost,
      totalHosts,
      usableHosts,
    };
  };

  const res = calculateSubnet();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Network}
            title="IPv4 Subnet Mask & CIDR Notation Calculator"
            description="Compute IPv4 network address, broadcast, usable host ranges, and wildcard masks from CIDR notation."
          />
          <ResetButton onReset={() => { setIpAddress("192.168.1.100"); setCidr(24); }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <InputField
              label="IPv4 Host Address"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              isMono
              placeholder="e.g. 192.168.1.1"
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Subnet Mask Prefix (/{cidr})</label>
              <input
                type="range"
                min="1"
                max="32"
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>/1</span>
                <span>/8</span>
                <span>/16</span>
                <span>/24</span>
                <span>/32</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard variant="dark" title="IPv4 Subnet Topology">
              {res ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1 font-mono">
                    <span className="text-[11px] text-slate-400 block">Network Address</span>
                    <span className="text-xl font-bold text-emerald-400">{res.network}/{cidr}</span>
                    <span className="text-xs text-slate-400 block">Subnet Mask: {res.mask}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-sans">First Usable Host</span>
                      <span className="text-white font-bold">{res.firstHost}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-sans">Last Usable Host</span>
                      <span className="text-white font-bold">{res.lastHost}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-sans">Broadcast Address</span>
                      <span className="text-white font-bold">{res.broadcast}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-400 block font-sans">Usable Hosts</span>
                      <span className="text-indigo-300 font-bold">{res.usableHosts.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-rose-400 text-xs">Invalid IPv4 address format.</div>
              )}
            </ResultCard>
          </div>
        </div>
      </div>
    </div>
  );
};
