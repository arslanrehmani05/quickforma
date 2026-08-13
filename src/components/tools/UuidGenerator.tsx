import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { ResetButton } from '../common/ResetButton';
import { Key, RefreshCw } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';

export const UuidGenerator: React.FC = () => {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let uuid = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      if (uppercase) uuid = uuid.toUpperCase();
      list.push(uuid);
    }
    setUuids(list);
  };

  React.useEffect(() => {
    generateUuids();
  }, [count, uppercase]);

  const outputText = uuids.join('\n');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-zinc-900 text-lg">
            <Key className="w-5 h-5" />
            <span>UUID v4 Generator</span>
          </div>
          <ResetButton onReset={() => { setCount(5); setUppercase(false); generateUuids(); }} />
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Quantity to Generate ({count})
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
              />
              <span>Uppercase UUIDs</span>
            </label>
          </div>
        </div>

        <button
          onClick={generateUuids}
          className="w-full py-2.5 bg-black text-white font-bold rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
        >
          <RefreshCw className="w-4 h-4" /> Generate Fresh Batch
        </button>

        {/* Output */}
        {uuids.length > 0 && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-700">Generated UUIDs ({uuids.length})</span>
              <CopyButton textToCopy={outputText} label="Copy All UUIDs" />
            </div>
            <textarea
              readOnly
              value={outputText}
              rows={Math.min(uuids.length + 1, 12)}
              className="w-full font-mono text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg outline-none text-zinc-900 resize-none leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
};
