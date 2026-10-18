import React, { useState } from "react";
import { Terminal, Shield, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const ChmodCalculator: React.FC = () => {
  const [ownerR, setOwnerR] = useState(true);
  const [ownerW, setOwnerW] = useState(true);
  const [ownerX, setOwnerX] = useState(true);

  const [groupR, setGroupR] = useState(true);
  const [groupW, setGroupW] = useState(false);
  const [groupX, setGroupX] = useState(true);

  const [publicR, setPublicR] = useState(true);
  const [publicW, setPublicW] = useState(false);
  const [publicX, setPublicX] = useState(true);

  const ownerOctal = (ownerR ? 4 : 0) + (ownerW ? 2 : 0) + (ownerX ? 1 : 0);
  const groupOctal = (groupR ? 4 : 0) + (groupW ? 2 : 0) + (groupX ? 1 : 0);
  const publicOctal = (publicR ? 4 : 0) + (publicW ? 2 : 0) + (publicX ? 1 : 0);

  const octal = `${ownerOctal}${groupOctal}${publicOctal}`;
  const symbolic = `-${ownerR ? "r" : "-"}${ownerW ? "w" : "-"}${ownerX ? "x" : "-"}${groupR ? "r" : "-"}${groupW ? "w" : "-"}${groupX ? "x" : "-"}${publicR ? "r" : "-"}${publicW ? "w" : "-"}${publicX ? "x" : "-"}`;

  const setPreset = (o: number, g: number, p: number) => {
    setOwnerR((o & 4) === 4);
    setOwnerW((o & 2) === 2);
    setOwnerX((o & 1) === 1);
    setGroupR((g & 4) === 4);
    setGroupW((g & 2) === 2);
    setGroupX((g & 1) === 1);
    setPublicR((p & 4) === 4);
    setPublicW((p & 2) === 2);
    setPublicX((p & 1) === 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Terminal}
            title="Linux File Permission Chmod Octal Calculator"
            description="Calculate Linux file permissions in octal (755, 644) and symbolic (-rwxr-xr-x) notations with interactive permission bits."
          />
          <ResetButton onReset={() => setPreset(7, 5, 5)} />
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Owner (User)</span>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={ownerR} onChange={(e) => setOwnerR(e.target.checked)} /> Read (4)
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={ownerW} onChange={(e) => setOwnerW(e.target.checked)} /> Write (2)
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={ownerX} onChange={(e) => setOwnerX(e.target.checked)} /> Execute (1)
            </label>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Group</span>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={groupR} onChange={(e) => setGroupR(e.target.checked)} /> Read (4)
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={groupW} onChange={(e) => setGroupW(e.target.checked)} /> Write (2)
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={groupX} onChange={(e) => setGroupX(e.target.checked)} /> Execute (1)
            </label>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Public / Others</span>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={publicR} onChange={(e) => setPublicR(e.target.checked)} /> Read (4)
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={publicW} onChange={(e) => setPublicW(e.target.checked)} /> Write (2)
            </label>
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input type="checkbox" checked={publicX} onChange={(e) => setPublicX(e.target.checked)} /> Execute (1)
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-xs text-slate-500 font-semibold self-center">Presets:</span>
          <button onClick={() => setPreset(7, 5, 5)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg">755 (Web Executable / Dir)</button>
          <button onClick={() => setPreset(6, 4, 4)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg">644 (Web Static File)</button>
          <button onClick={() => setPreset(6, 0, 0)} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg">600 (SSH Private Key)</button>
          <button onClick={() => setPreset(7, 7, 7)} className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg">777 (Full Open / Insecure)</button>
        </div>

        <ResultCard variant="dark" title="Chmod Permission Notation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Octal Representation</span>
              <p className="text-4xl font-mono font-extrabold text-emerald-400 mt-1">{octal}</p>
              <div className="mt-2">
                <CopyButton textToCopy={`chmod ${octal} filename`} label={`Copy "chmod ${octal}"`} variant="secondary" />
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Symbolic Notation</span>
              <p className="text-2xl font-mono font-extrabold text-indigo-200 mt-2">{symbolic}</p>
            </div>
          </div>
        </ResultCard>
      </div>
    </div>
  );
};
