import React, { useState, useEffect } from "react";
import { Clock, Calendar, Copy, Check } from "lucide-react";
import { ToolHeader } from "../ui/ToolHeader";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/Button";
import { ResultCard } from "../ui/ResultCard";
import { ResetButton } from "../common/ResetButton";
import { CopyButton } from "../common/CopyButton";

export const UnixTimestampConverter: React.FC = () => {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputTimestamp, setInputTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentEpoch(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const tsNum = Number(inputTimestamp);
  const isMillis = tsNum > 10000000000;
  const dateObj = new Date(isMillis ? tsNum : tsNum * 1000);
  const isValid = !isNaN(dateObj.getTime()) && tsNum > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <ToolHeader
            icon={Clock}
            title="Unix Epoch Timestamp to ISO Date Converter"
            description="Convert Unix timestamps in seconds or milliseconds into human-readable ISO 8601, UTC, and local date formats."
          />
          <ResetButton onReset={() => setInputTimestamp(Math.floor(Date.now() / 1000).toString())} />
        </div>

        <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Current Unix Epoch Time:</span>
            <p className="text-2xl font-mono font-extrabold text-emerald-400">{currentEpoch}</p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => setInputTimestamp(currentEpoch.toString())}>
            Use Current Time
          </Button>
        </div>

        <InputField
          label="Unix Timestamp (Seconds or Milliseconds)"
          value={inputTimestamp}
          onChange={(e) => setInputTimestamp(e.target.value)}
          isMono
        />

        {isValid ? (
          <ResultCard variant="dark" title="Converted Human Date Formats">
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-slate-400">ISO 8601 String:</span>
                  <p className="text-emerald-300 font-mono text-sm mt-0.5">{dateObj.toISOString()}</p>
                </div>
                <CopyButton textToCopy={dateObj.toISOString()} variant="ghost" />
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-slate-400">UTC Date String:</span>
                  <p className="text-white font-mono text-sm mt-0.5">{dateObj.toUTCString()}</p>
                </div>
                <CopyButton textToCopy={dateObj.toUTCString()} variant="ghost" />
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-slate-400">Local Browser Time:</span>
                  <p className="text-indigo-200 font-mono text-sm mt-0.5">{dateObj.toString()}</p>
                </div>
                <CopyButton textToCopy={dateObj.toString()} variant="ghost" />
              </div>
            </div>
          </ResultCard>
        ) : (
          <div className="p-4 bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold">
            Please enter a valid numeric Unix timestamp.
          </div>
        )}
      </div>
    </div>
  );
};
