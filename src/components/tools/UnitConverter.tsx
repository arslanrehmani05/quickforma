import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Scale, Ruler, Thermometer, Box, Database, Square } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'data';

interface UnitDefinition {
  label: string;
  factor: number;
  offset?: number;
}

const UNITS: Record<UnitCategory, Record<string, UnitDefinition>> = {
  length: {
    meters: { label: 'Meters (m)', factor: 1 },
    kilometers: { label: 'Kilometers (km)', factor: 1000 },
    centimeters: { label: 'Centimeters (cm)', factor: 0.01 },
    millimeters: { label: 'Millimeters (mm)', factor: 0.001 },
    miles: { label: 'Miles (mi)', factor: 1609.344 },
    yards: { label: 'Yards (yd)', factor: 0.9144 },
    feet: { label: 'Feet (ft)', factor: 0.3048 },
    inches: { label: 'Inches (in)', factor: 0.0254 },
  },
  weight: {
    kilograms: { label: 'Kilograms (kg)', factor: 1 },
    grams: { label: 'Grams (g)', factor: 0.001 },
    milligrams: { label: 'Milligrams (mg)', factor: 0.000001 },
    pounds: { label: 'Pounds (lbs)', factor: 0.45359237 },
    ounces: { label: 'Ounces (oz)', factor: 0.028349523125 },
    tons: { label: 'Metric Tons (t)', factor: 1000 },
  },
  temperature: {
    celsius: { label: 'Celsius (°C)', factor: 1, offset: 0 },
    fahrenheit: { label: 'Fahrenheit (°F)', factor: 1, offset: 32 },
    kelvin: { label: 'Kelvin (K)', factor: 1, offset: 273.15 },
  },
  area: {
    sqMeters: { label: 'Square Meters (m²)', factor: 1 },
    sqKm: { label: 'Square Kilometers (km²)', factor: 1000000 },
    sqFeet: { label: 'Square Feet (ft²)', factor: 0.092903 },
    acres: { label: 'Acres', factor: 4046.86 },
    hectares: { label: 'Hectares', factor: 10000 },
  },
  volume: {
    liters: { label: 'Liters (L)', factor: 1 },
    milliliters: { label: 'Milliliters (mL)', factor: 0.001 },
    gallons: { label: 'US Gallons (gal)', factor: 3.78541 },
    cups: { label: 'US Cups', factor: 0.236588 },
  },
  data: {
    bytes: { label: 'Bytes (B)', factor: 1 },
    kilobytes: { label: 'Kilobytes (KB)', factor: 1024 },
    megabytes: { label: 'Megabytes (MB)', factor: 1048576 },
    gigabytes: { label: 'Gigabytes (GB)', factor: 1073741824 },
    terabytes: { label: 'Terabytes (TB)', factor: 1099511627776 },
  }
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('kilometers');
  const [toUnit, setToUnit] = useState('miles');
  const [value, setValue] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  const availableUnits = UNITS[category];

  const convert = () => {
    if (isNaN(value)) return 0;
    if (category === 'temperature') {
      let celsiusVal = value;
      if (fromUnit === 'fahrenheit') celsiusVal = (value - 32) * (5 / 9);
      if (fromUnit === 'kelvin') celsiusVal = value - 273.15;

      if (toUnit === 'celsius') return celsiusVal;
      if (toUnit === 'fahrenheit') return (celsiusVal * 9 / 5) + 32;
      if (toUnit === 'kelvin') return celsiusVal + 273.15;
    }

    const fromDef = availableUnits[fromUnit] || Object.values(availableUnits)[0];
    const toDef = availableUnits[toUnit] || Object.values(availableUnits)[1];

    const baseVal = value * fromDef.factor;
    return baseVal / toDef.factor;
  };

  const result = convert();

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const keys = Object.keys(UNITS[newCat]);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${value} ${fromUnit} = ${result.toLocaleString()} ${toUnit}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5" />
            Universal Unit Converter
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Bi-directional conversion across metric, imperial, and digital units.</p>
        </div>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'length', label: 'Length', icon: Ruler },
          { id: 'weight', label: 'Weight', icon: Scale },
          { id: 'temperature', label: 'Temperature', icon: Thermometer },
          { id: 'area', label: 'Area', icon: Square },
          { id: 'volume', label: 'Volume', icon: Box },
          { id: 'data', label: 'Data', icon: Database },
        ].map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                category === cat.id
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Conversion Form */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-11 gap-4 items-center">
          {/* From */}
          <div className="sm:col-span-5 space-y-2">
            <label className="block text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">From</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-lg font-bold text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white mb-2"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none font-medium"
            >
              {Object.entries(availableUnits).map(([key, def]) => (
                <option key={key} value={key}>{def.label}</option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="sm:col-span-1 flex justify-center pt-4 sm:pt-6">
            <button
              onClick={handleSwap}
              className="p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-zinc-700 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700 transition-all shadow-sm"
              title="Swap Units"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* To */}
          <div className="sm:col-span-5 space-y-2">
            <label className="block text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">To</label>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-lg font-bold text-zinc-900 dark:text-white mb-2 truncate">
              {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white outline-none font-medium"
            >
              {Object.entries(availableUnits).map(([key, def]) => (
                <option key={key} value={key}>{def.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Copy Result Button */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl text-xs transition-all hover:opacity-90 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Result Copied!' : 'Copy Formula Result'}
          </button>
        </div>
      </div>
    </div>
  );
};
