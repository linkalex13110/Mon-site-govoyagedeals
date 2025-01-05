import React from 'react';
import { Check } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isValid?: boolean;
}

export default function AuthInput({
  label,
  error,
  isValid,
  ...props
}: AuthInputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder={label}
        className={`
          w-full px-4 py-3 bg-transparent border-b-2 outline-none transition-colors
          ${error ? 'border-red-500' : isValid ? 'border-green-500' : 'border-gray-200'}
          ${error ? 'focus:border-red-500' : 'focus:border-blue-500'}
        `}
      />
      {isValid && !error && (
        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
      )}
      {error && (
        <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}