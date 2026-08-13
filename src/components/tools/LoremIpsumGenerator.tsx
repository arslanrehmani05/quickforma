import React, { useState } from 'react';
import { FilePlus, Copy, Check } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { Button } from '../ui/Button';

const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];

export const LoremIpsumGenerator: React.FC = () => {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const result = [];
    for (let i = 0; i < (paragraphs || 1); i++) {
      result.push(LOREM[i % LOREM.length]);
    }
    setOutput(result.join('\n\n'));
  };

  React.useEffect(() => {
    handleGenerate();
  }, [paragraphs]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <FilePlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Lorem Ipsum Placeholder Generator</h2>
            <p className="text-slate-600 text-sm">Generate customized paragraphs of Lorem Ipsum placeholder text.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-slate-700 text-xs font-semibold ">Paragraphs:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              className="w-24 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
            />
          </div>

          <div className="relative">
            <div className="flex justify-between items-center bg-slate-100 px-4 py-2 border-t border-x border-slate-200 rounded-t-xl text-xs text-slate-600 font-semibold">
              <span>Lorem Ipsum Text</span>
              <button onClick={handleCopy} className="hover:text-indigo-600 flex items-center gap-1">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              rows={8}
              readOnly
              value={output}
              className="w-full p-4 rounded-b-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none resize-none font-serif leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
