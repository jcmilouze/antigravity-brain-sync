import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl mb-12 flex flex-col lg:flex-row min-h-[500px]">
      {/* Zone 1: Text (40%) */}
      <div className="lg:w-5/12 p-8 md:p-12 flex flex-col justify-center relative z-20">
        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
          Tu ne sais pas quel <span className="text-emerald-400">métier</span> te correspond ?
        </h1>
        <p className="text-lg md:text-xl text-slate-200 font-medium mb-6 leading-relaxed">
          Chez Bort-Artense, tu expérimentes en vrai les métiers avant de choisir.
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-3 text-emerald-100/90 text-sm font-medium">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <p>À la fin, tu seras capable, confiant(e) et prêt(e) pour le marché du travail.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center gap-3">
              Découvre tes futurs métiers
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 italic pl-1">(Visite gratuite + conseils personnalisés)</p>
        </div>
      </div>

      {/* Zone 2: Visual (60%) */}
      <div className="lg:w-7/12 relative h-64 lg:h-auto bg-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581092921461-eab624520c68?q=80&w=1200"
            alt="Élève en situation réelle"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Gradient Overlay for smooth text transition */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0f172a] via-[#0f172a]/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
