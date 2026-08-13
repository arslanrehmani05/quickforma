import React from 'react';

export interface SimpleCalculatorTemplateProps {
  header?: React.ReactNode;
  inputs: React.ReactNode;
  result: React.ReactNode;
  className?: string;
}

export const SimpleCalculatorTemplate: React.FC<SimpleCalculatorTemplateProps> = ({
  header,
  inputs,
  result,
  className = '',
}) => {
  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {header}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4 flex flex-col justify-center">{inputs}</div>
          <div className="flex flex-col justify-stretch">{result}</div>
        </div>
      </div>
    </div>
  );
};
