import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ModePillsBar } from '../ui/ModePillsBar';

export const AspectCalculator: React.FC = () => {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [newWidth, setNewWidth] = useState<number>(1280);

  const aspectRatio = (width || 1) / (height || 1);
  const calculatedHeight = Math.round((newWidth || 0) / aspectRatio);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Aspect Ratio Calculator</h2>
            <p className="text-slate-600 text-sm">Calculate proportional dimensions for video, design, and UI layouts (16:9, 4:3, 1:1).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <span className="text-xs font-bold  text-slate-700 block">Original Dimensions</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 text-xs mb-1">Width (px)</label>
                <input
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>
              <div>
                <label className="block text-slate-600 text-xs mb-1">Height (px)</label>
                <input
                  type="number"
                  min="1"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
                />
              </div>
            </div>

            <span className="text-xs font-bold  text-slate-700 block pt-2">New Target Width</span>
            <div>
              <input
                type="number"
                min="1"
                value={newWidth}
                onChange={(e) => setNewWidth(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 shadow-xs"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-600 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold  text-indigo-200">Proportional Height</span>
              <div className="my-4 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{calculatedHeight} px</div>
            </div>
            <div className="pt-4 border-t border-indigo-500/80 text-xs text-indigo-100">
              <span>Aspect Ratio: {aspectRatio.toFixed(2)} : 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
