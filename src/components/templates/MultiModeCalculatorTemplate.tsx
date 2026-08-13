import React from 'react';

export interface MultiModeCalculatorTemplateProps {
  header?: React.ReactNode;
  modeBar: React.ReactNode;
  inputs: React.ReactNode;
  result: React.ReactNode;
  className?: string;
}

export const MultiModeCalculatorTemplate: React.FC<MultiModeCalculatorTemplateProps> = ({
  header,
  modeBar,
  inputs,
  result,
  className = '',
}) => {
  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {header}
        <div>{modeBar}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
          <div className="space-y-4 flex flex-col justify-center">{inputs}</div>
          <div className="flex flex-col justify-stretch">{result}</div>
        </div>
      </div>
    </div>
  );
};
