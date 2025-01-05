import React from 'react';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function AuthButton({
  children,
  variant = 'primary',
  ...props
}: AuthButtonProps) {
  const baseStyles = "w-full px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]";
  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300"
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}