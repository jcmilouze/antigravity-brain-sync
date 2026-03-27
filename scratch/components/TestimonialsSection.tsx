import React from 'react';
import { Quote, Briefcase, ArrowRight } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <Quote className="w-8 h-8 text-slate-200 mb-3 fill-current" />
          <p className="text-slate-700 font-medium italic text-sm mb-4">"Avant j'étais perdu, à Bort-Artense j'ai découvert ma passion pour le bois. Aujourd'hui je dirige ma propre équipe."</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">TR</div>
          <div className="text-xs">
            <div className="font-bold text-slate-900">Thomas R.</div>
            <div className="text-slate-500">Menuisier, Promo 2019</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <Quote className="w-8 h-8 text-slate-200 mb-3 fill-current" />
          <p className="text-slate-700 font-medium italic text-sm mb-4">"L'immersion en atelier m'a donné une confiance que je n'avais pas au collège. Je me suis sentie capable."</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">LM</div>
          <div className="text-xs">
            <div className="font-bold text-slate-900">Léa M.</div>
            <div className="text-slate-500">Maroquinerie, Promo 2021</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm md:col-span-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-600 text-white rounded-full"><Briefcase className="w-5 h-5" /></div>
          <p className="text-blue-900 font-bold text-sm">Nos entreprises partenaires recrutent.</p>
        </div>
        <ArrowRight className="w-5 h-5 text-blue-600" />
      </div>
    </div>
  );
};

export default TestimonialsSection;
