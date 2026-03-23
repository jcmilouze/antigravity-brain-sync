import React from 'react';
import { Award, Home, Users } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <div className="md:col-span-5 bg-slate-50 rounded-xl border border-slate-100 p-8 flex flex-col justify-center gap-8">
      <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-2">Nos chiffres</h3>
      
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 text-blue-700 rounded-lg"><Award className="w-8 h-8" /></div>
        <div>
          <div className="text-3xl font-black text-slate-900">95%</div>
          <div className="text-sm text-slate-600 font-medium">de réussite au diplôme</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg"><Home className="w-8 h-8" /></div>
        <div>
          <div className="text-3xl font-black text-slate-900">85%</div>
          <div className="text-sm text-slate-600 font-medium">d'élèves internes (Corrèze, Cantal, Puy-de-Dôme)</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="p-3 bg-amber-100 text-amber-700 rounded-lg"><Users className="w-8 h-8" /></div>
        <div>
          <div className="text-3xl font-black text-slate-900">2500+</div>
          <div className="text-sm text-slate-600 font-medium">anciens élèves en activité</div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
