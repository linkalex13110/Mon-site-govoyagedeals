import React from 'react';
import { X } from 'lucide-react';
import NavigationLink from './NavigationLink';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';

export default function NavigationMenu() {
  const { isOpen, closeMenu } = useNavigationMenu();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="container mx-auto px-6 py-8">
        {/* Bouton de fermeture */}
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Fermer le menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Liste des liens */}
        <nav className="mt-16">
          <ul className="space-y-6">
            <NavigationLink href="/" onClick={closeMenu}>
              Accueil
            </NavigationLink>
            <NavigationLink href="/vols" onClick={closeMenu}>
              Vols
            </NavigationLink>
            <NavigationLink href="/hotels" onClick={closeMenu}>
              Hôtels
            </NavigationLink>
            <NavigationLink href="/sejours" onClick={closeMenu}>
              Séjours
            </NavigationLink>
            <NavigationLink href="/blog" onClick={closeMenu}>
              Blog
            </NavigationLink>
          </ul>
        </nav>
      </div>
    </div>
  );
}