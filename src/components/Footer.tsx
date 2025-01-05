import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">GoVoyages<span className="text-blue-500">Deals</span></span>
            </div>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour trouver les meilleures offres de voyage au meilleur prix.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors">+33 1 23 45 67 89</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <a href="mailto:contact@govoyagesdeals.fr" className="hover:text-white transition-colors">contact@govoyagesdeals.fr</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>123 Avenue des Champs-Élysées, 75008 Paris</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">À Propos</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">Blog Voyage</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Informations Légales</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
              </li>
              <li>
                <Link to="/cgv" className="hover:text-white transition-colors">Conditions Générales de Vente</Link>
              </li>
              <li>
                <Link to="/confidentialite" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-white transition-colors">Gestion des Cookies</Link>
              </li>
              <li>
                <Link to="/reclamations" className="hover:text-white transition-colors">Réclamations</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Inscrivez-vous pour recevoir nos meilleures offres
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        {/* Social Media & Certifications */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-500 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/8/8f/IATA_logo.svg/240px-IATA_logo.svg.png" alt="IATA" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/3b/Atout_France_logo_2019.svg/240px-Atout_France_logo_2019.svg.png" alt="Atout France" className="h-8" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} GoVoyagesDeals. Tous droits réservés. | Immatriculation Atout France IM075XXXXXX | 
            SIREN : XXX XXX XXX RCS Paris | TVA : FR XX XXX XXX XXX
          </p>
          <p className="mt-2 text-gray-500">
            Les prix affichés sont par personne, incluant les taxes et frais applicables.
            Certaines conditions et restrictions s'appliquent.
          </p>
        </div>
      </div>
    </footer>
  );
}