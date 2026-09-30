import React, { useState, useMemo } from 'react';
import { Percent } from 'lucide-react';
import { ToolHeader } from '../ui/ToolHeader';
import { InputField } from '../ui/InputField';
import { ResultCard } from '../ui/ResultCard';
import { ModePillsBar } from '../ui/ModePillsBar';
import { MultiModeCalculatorTemplate } from '../templates/MultiModeCalculatorTemplate';

type Mode = 'percentageOf' | 'whatPercentage' | 'percentageChange' | 'percentageDifference';

const MODE_OPTIONS = [
  { id: 'percentageOf', label: 'What is X% of Y?' },
  { id: 'whatPercentage', label: 'X is what % of Y?' },
  { id: 'percentageChange', label: 'Percentage Change (% Inc/Dec)' },
  { id: 'percentageDifference', label: 'Percentage Difference' },
] as const;

export const PercentageCalculator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<Mode>('percentageOf');

  // Mode 1 State: What is X% of Y?
  const [percentVal, setPercentVal] = useState<string>('15');
  const [ofNumberVal, setOfNumberVal] = useState<string>('200');

  // Mode 2 State: X is what percentage of Y?
  const [partVal, setPartVal] = useState<string>('30');
  const [wholeVal, setWholeVal] = useState<string>('200');

  // Mode 3 State: Percentage Change (Original -> New)
  const [originalVal, setOriginalVal] = useState<string>('80');
  const [newVal, setNewVal] = useState<string>('100');

  // Mode 4 State: Percentage Difference between A and B
  const [valueA, setValueA] = useState<string>('80');
  const [valueB, setValueB] = useState<string>('100');

  // --- Calculations ---

  // Mode 1: What is X% of Y?
  const calcMode1 = useMemo(() => {
    const p = parseFloat(percentVal);
    const y = parseFloat(ofNumberVal);
    if (isNaN(p) || isNaN(y)) return null;

    const result = (p / 100) * y;
    return { p, y, result };
  }, [percentVal, ofNumberVal]);

  // Mode 2: X is what percentage of Y?
  const calcMode2 = useMemo(() => {
    const part = parseFloat(partVal);
    const whole = parseFloat(wholeVal);
    if (isNaN(part) || isNaN(whole)) return null;
    if (whole === 0) return { error: 'Enter a whole number greater than zero.' };

    const result = (part / whole) * 100;
    return { part, whole, result };
  }, [partVal, wholeVal]);

  // Mode 3: Percentage Change
  const calcMode3 = useMemo(() => {
    const orig = parseFloat(originalVal);
    const n = parseFloat(newVal);
    if (isNaN(orig) || isNaN(n)) return null;
    if (orig === 0) return { error: 'Original value cannot be zero for percent change.' };

    const absoluteDifference = n - orig;
    const percentChange = (absoluteDifference / Math.abs(orig)) * 100;
    const isIncrease = percentChange >= 0;

    return { orig, n, absoluteDifference, percentChange, isIncrease };
  }, [originalVal, newVal]);

  // Mode 4: Percentage Difference
  const calcMode4 = useMemo(() => {
    const a = parseFloat(valueA);
    const b = parseFloat(valueB);
    if (isNaN(a) || isNaN(b)) return null;
    const avg = (a + b) / 2;
    if (avg === 0) return { error: 'Average of values cannot be zero.' };

    const absDiff = Math.abs(a - b);
    const difference = (absDiff / avg) * 100;
    return { a, b, absDiff, avg, difference };
  }, [valueA, valueB]);

  const renderInputs = () => {
    switch (activeMode) {
      case 'percentageOf':
        return (
          <>
            <InputField
              label="Percentage (X%)"
              type="number"
              value={percentVal}
              onChange={(e) => setPercentVal(e.target.value)}
              suffix="%"
              inputMode="decimal"
            />
            <InputField
              label="Total Number (Y)"
              type="number"
              value={ofNumberVal}
              onChange={(e) => setOfNumberVal(e.target.value)}
              inputMode="decimal"
            />
          </>
        );
      case 'whatPercentage':
        return (
          <>
            <InputField
              label="Part (X)"
              type="number"
              value={partVal}
              onChange={(e) => setPartVal(e.target.value)}
              inputMode="decimal"
            />
            <InputField
              label="Whole (Y)"
              type="number"
              value={wholeVal}
              onChange={(e) => setWholeVal(e.target.value)}
              inputMode="decimal"
            />
          </>
        );
      case 'percentageChange':
        return (
          <>
            <InputField
              label="Original Value"
              type="number"
              value={originalVal}
              onChange={(e) => setOriginalVal(e.target.value)}
              inputMode="decimal"
            />
            <InputField
              label="New Value"
              type="number"
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              inputMode="decimal"
            />
          </>
        );
      case 'percentageDifference':
        return (
          <>
            <InputField
              label="Value A"
              type="number"
              value={valueA}
              onChange={(e) => setValueA(e.target.value)}
              inputMode="decimal"
            />
            <InputField
              label="Value B"
              type="number"
              value={valueB}
              onChange={(e) => setValueB(e.target.value)}
              inputMode="decimal"
            />
          </>
        );
    }
  };

  const renderResult = () => {
    switch (activeMode) {
      case 'percentageOf':
        return calcMode1 ? (
          <ResultCard
            variant="indigo"
            title="Calculated Result"
            value={calcMode1.result.toFixed(2)}
            subtitle={`${calcMode1.p}% of ${calcMode1.y} is ${calcMode1.result.toFixed(2)}.`}
          />
        ) : null;
      case 'whatPercentage':
        return calcMode2 ? (
          'error' in calcMode2 ? (
            <ResultCard variant="light" title="Input Error" value={calcMode2.error} />
          ) : (
            <ResultCard
              variant="indigo"
              title="Percentage Result"
              value={`${calcMode2.result.toFixed(2)}%`}
              subtitle={`${calcMode2.part} represents ${calcMode2.result.toFixed(2)}% of ${calcMode2.whole}.`}
            />
          )
        ) : null;
      case 'percentageChange':
        return calcMode3 ? (
          'error' in calcMode3 ? (
            <ResultCard variant="light" title="Input Error" value={calcMode3.error} />
          ) : (
            <ResultCard
              variant="indigo"
              title="Percentage Change"
              value={`${calcMode3.isIncrease ? '+' : ''}${calcMode3.percentChange.toFixed(2)}%`}
              subtitle={`${calcMode3.isIncrease ? 'Increase' : 'Decrease'} of ${Math.abs(calcMode3.absoluteDifference).toFixed(2)} from ${calcMode3.orig} to ${calcMode3.n}.`}
            />
          )
        ) : null;
      case 'percentageDifference':
        return calcMode4 ? (
          'error' in calcMode4 ? (
            <ResultCard variant="light" title="Input Error" value={calcMode4.error} />
          ) : (
            <ResultCard
              variant="indigo"
              title="Percentage Difference"
              value={`${calcMode4.difference.toFixed(2)}%`}
              subtitle={`Difference relative to average (${calcMode4.avg.toFixed(2)}) is ${calcMode4.difference.toFixed(2)}%.`}
            />
          )
        ) : null;
    }
  };

  return (
    <MultiModeCalculatorTemplate
      header={
        <ToolHeader
          icon={Percent}
          title="Percentage Calculator"
          description="Calculate percentages, percentage change, percent difference, and fraction to percentage conversions instantly."
        />
      }
      modeBar={
        <ModePillsBar
          options={MODE_OPTIONS}
          activeMode={activeMode}
          onSelectMode={(mode) => setActiveMode(mode as Mode)}
        />
      }
      inputs={renderInputs()}
      result={renderResult()}
    />
  );
};
