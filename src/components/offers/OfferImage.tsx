import React, { useState } from 'react';

interface OfferImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function OfferImage({ src, alt, className = '' }: OfferImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Générer une URL pour une version basse résolution
  const lowResSrc = `${src}?w=50&q=10`;

  return (
    <div className="relative">
      {/* Image basse résolution pour le chargement initial */}
      <img
        src={lowResSrc}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 blur-lg absolute inset-0`}
      />
      
      {/* Image haute résolution */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </div>
  );
}