import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Générer une URL pour le placeholder
  const placeholderSrc = `${src}?w=20&q=10`;

  if (error) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-400">Image non disponible</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder flou */}
      <img
        src={placeholderSrc}
        alt=""
        className={`${className} absolute inset-0 blur-lg scale-110 transform transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Image principale */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}