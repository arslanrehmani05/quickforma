import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center gap-2 font-bold transition-all outline-none rounded-xl disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-md shadow-indigo-600/20',
    secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100',
    outline: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300',
    ghost: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    destructive: 'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98] shadow-sm',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
