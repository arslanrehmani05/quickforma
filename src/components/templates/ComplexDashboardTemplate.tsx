import React from 'react';

export interface ComplexDashboardTemplateProps {
  header?: React.ReactNode;
  inputs: React.ReactNode;
  resultDashboard: React.ReactNode;
  supportingDetails?: React.ReactNode;
  className?: string;
}

export const ComplexDashboardTemplate: React.FC<ComplexDashboardTemplateProps> = ({
  header,
  inputs,
  resultDashboard,
  supportingDetails,
  className = '',
}) => {
  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Inputs & Config Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {header}
        <div>{inputs}</div>
      </div>

      {/* Dark Navy Analytical Result Dashboard */}
      <div>{resultDashboard}</div>

      {/* Optional Supporting Breakdown */}
      {supportingDetails && <div>{supportingDetails}</div>}
    </div>
  );
};
