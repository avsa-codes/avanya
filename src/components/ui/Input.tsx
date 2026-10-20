import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export default function Input({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="w-full space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-text">
        {label}
      </label>

      <input
        id={inputId}
        className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text/40 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? 'border-red-600' : 'border-black/15'
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}

      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-sm text-text/60">
          {hint}
        </p>
      )}
    </div>
  );
}
