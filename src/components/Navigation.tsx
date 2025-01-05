import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, X, User } from 'lucide-react';

export default function Navigation({ className = '' }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Vols', path: '/' },
    { name: 'Hôtels', path: '/' },
    { name: 'Voitures', path: '/' },
    { name: 'Offres', path: '/' },
    { name: 'Blog', path: '/blog' },
    { 
      name: 'Profil',
      path: '/auth',
      icon: User,
      className: 'text-white/90 hover:text-white transition-colors relative group flex items-center gap-2'
    }
  ];

  return (
    <nav className={`relative z-30 container mx-auto px-4 sm:px-6 py-4 sm:py-6 ${className}`}>
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <div className="glass-effect p-1.5 sm:p-2 rounded-xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-white">
            GoVoyages<span className="text-blue-400">Deals</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={item.className || "text-white/90 hover:text-white transition-colors relative group text-sm font-medium"}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-5 h-5" />}
                  {item.name}
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden glass-effect p-2 rounded-xl hover:bg-white/20 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
          <div className="flex flex-col space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}