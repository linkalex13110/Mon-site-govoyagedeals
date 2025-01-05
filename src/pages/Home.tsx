import React from 'react';
import Navigation from '../components/Navigation';
import SearchForm from '../components/SearchForm';
import Features from '../components/Features';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import TravelDeals from '../components/TravelDeals';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] bg-gradient-to-br from-black/70 via-black/60 to-black/70">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80"
            alt="Modern Airport Terminal"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenu */}
        <Navigation />

        <div className="relative container mx-auto pt-12 sm:pt-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            {/* Badge animé */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white mb-6 animate-float shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium">Retrouvez les meilleures offres chaques jours</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight drop-shadow-lg">
              Découvrez le Monde{' '}
              <span className="relative">
                <span className="relative z-10">Autrement</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-500/40 -rotate-2"></span>
              </span>
              {' '}avec{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 drop-shadow">
                Les Meilleurs Prix
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-lg sm:text-xl text-white mb-8 max-w-3xl mx-auto font-medium drop-shadow-lg">
              Explorez des milliers de destinations et trouvez les offres les plus avantageuses 
              pour votre prochain voyage. Économisez jusqu'à 70% sur vos réservations.
            </p>
          </div>
        </div>

        {/* Widget de recherche */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-[60%] sm:translate-y-1/2 z-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      {/* Reste du contenu */}
      <div className="bg-gradient-to-b from-[#0B1120] via-[#1E293B] to-[#0F172A] pt-32">
        <section className="py-24">
          <TravelDeals />
        </section>
        <section className="py-24">
          <Features />
        </section>
        <section className="py-24">
          <Newsletter />
        </section>
        <section className="pt-12 pb-6">
          <Footer />
        </section>
      </div>
    </div>
  );
}