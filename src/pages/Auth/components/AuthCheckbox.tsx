import React from 'react';

interface AuthCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthCheckbox({ label, ...props }: AuthCheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
        <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-black peer-checked:bg-black" />
        <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">
          <svg className="w-3 h-3" viewBox="0 0 12 10">
            <polyline
              points="1.5 6 4.5 9 10.5 1"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </label>
  );
}