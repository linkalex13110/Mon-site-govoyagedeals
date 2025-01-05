import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  image: string;
  altText: string;
}

export default function AuthLayout({ children, image, altText }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Image Section */}
      <div className="hidden lg:block relative">
        <img
          src={image}
          alt={altText}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-end p-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}