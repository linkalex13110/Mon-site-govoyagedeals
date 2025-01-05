import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from './useScrollPosition';
import { scrollToTop } from './scrollUtils';

export default function ScrollToTop() {
  const scrollPosition = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when page is scrolled more than 500px
    setIsVisible(scrollPosition > 500);
  }, [scrollPosition]);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
      aria-label="Retour en haut de la page"
    >
      <ArrowUp className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}