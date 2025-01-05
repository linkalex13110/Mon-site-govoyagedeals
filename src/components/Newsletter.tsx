import React from 'react';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block p-3 bg-white/5 border border-white/10 rounded-2xl mb-8">
          <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 mb-6">
          Ne manquez plus aucune offre
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 mb-12">
          Recevez les meilleures offres de voyage directement dans votre boîte mail
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20"
          >
            <span>S'inscrire</span>
            <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}