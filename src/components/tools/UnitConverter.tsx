import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const [val, setVal] = useState<number>(100);
  const [category, setCategory] = useState<'length' | 'weight' | 'temp'>('length');
  const [unitFrom, setUnitFrom] = useState('km');
  const [unitTo, setUnitTo] = useState('miles');

  const convert = (): number => {
    const v = val || 0;
    if (category === 'length') {
      if (unitFrom === 'km' && unitTo === 'miles') return v * 0.621371;
      if (unitFrom === 'miles' && unitTo === 'km') return v * 1.60934;
      if (unitFrom === 'm' && unitTo === 'ft') return v * 3.28084;
      if (unitFrom === 'ft' && unitTo === 'm') return v * 0.3048;
    } else if (category === 'weight') {
      if (unitFrom === 'kg' && unitTo === 'lbs') return v * 2.20462;
      if (unitFrom === 'lbs' && unitTo === 'kg') return v * 0.453592;
    } else if (category === 'temp') {
      if (unitFrom === 'c' && unitTo === 'f') return (v * 9) / 5 + 32;
      if (unitFrom === 'f' && unitTo === 'c') return ((v - 32) * 5) / 9;
    }
    return v;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Universal Unit Converter</h2>
            <p className="text-slate-600 text-sm">Bi-directional metric and imperial unit conversions.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2">
            {(['length', 'weight', 'temp'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  if (cat === 'length') { setUnitFrom('km'); setUnitTo('miles'); }
                  if (cat === 'weight') { setUnitFrom('kg'); setUnitTo('lbs'); }
                  if (cat === 'temp') { setUnitFrom('c'); setUnitTo('f'); }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${category === cat ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">Input Value & Unit</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-xs"
                />
                <select
                  value={unitFrom}
                  onChange={(e) => setUnitFrom(e.target.value)}
                  className="px-3 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold outline-none"
                >
                  {category === 'length' && <><option value="km">KM</option><option value="miles">Miles</option><option value="m">Meters</option><option value="ft">Feet</option></>}
                  {category === 'weight' && <><option value="kg">KG</option><option value="lbs">LBS</option></>}
                  {category === 'temp' && <><option value="c">°C</option><option value="f">°F</option></>}
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-600 text-white flex flex-col justify-center shadow-md">
              <span className="text-xs text-indigo-200 font-bold uppercase mb-1">Converted Result</span>
              <div className="text-3xl font-extrabold text-white">
                {convert().toFixed(2)} <span className="text-base text-indigo-200 uppercase font-normal">{unitTo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
