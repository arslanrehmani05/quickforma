import React from 'react';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  helpText?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  isMono?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helpText,
  error,
  prefix,
  suffix,
  isMono = false,
  className = '',
  id,
  type = 'text',
  disabled,
  ...props
}) => {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center rounded-xl shadow-xs">
        {prefix && (
          <div className="absolute left-3.5 inset-y-0 flex items-center pointer-events-none text-slate-400 text-sm">
            {prefix}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          disabled={disabled}
          className={`w-full bg-white border ${
            error ? 'border-rose-400 focus:border-rose-600 focus:ring-rose-600/10' : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/10'
          } rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:ring-4 transition-all ${
            prefix ? 'pl-9' : ''
          } ${suffix ? 'pr-9' : ''} ${isMono ? 'font-mono' : 'font-sans'} ${
            disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200' : ''
          } ${className}`}
          {...props}
        />

        {suffix && (
          <div className="absolute right-3.5 inset-y-0 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helpText ? (
        <p className="text-xs text-slate-500">{helpText}</p>
      ) : null}
    </div>
  );
};
