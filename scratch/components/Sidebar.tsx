import React from 'react';
import { Calendar, Bell, Instagram, Facebook, Linkedin } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="space-y-8">
      {/* ACTUALITÉS */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-white/5 shadow-2xl">
        <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-500" /> PROCHAINES ACTUALITÉS
        </h4>
        <div className="space-y-6">
           {[
             { date: "24 MARS", title: "Portes Ouvertes 2026 : Le programme complet est en ligne." },
             { date: "12 AVRIL", title: "Concours 'Un des Meilleurs Apprentis' : Nos élèves en finale." }
           ].map((actu, i) => (
             <div key={i} className="group cursor-pointer">
                <span className="text-[10px] font-black text-emerald-500 tracking-widest">{actu.date}</span>
                <p className="text-slate-200 text-sm font-bold leading-tight mt-1 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{actu.title}</p>
             </div>
           ))}
        </div>
      </div>

      {/* AGENDA */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl">
        <h4 className="text-slate-900 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" /> AGENDA CLÉ
        </h4>
        <div className="space-y-4">
           {[
             { day: "07", month: "AVR", event: "Journée Portes Ouvertes (JPO)" },
             { day: "15", month: "MAI", event: "Début des examens pratiques" }
           ].map((date, i) => (
             <div key={i} className="flex items-center gap-4 group">
                 <div className="flex flex-col items-center bg-slate-950 text-white rounded-xl py-2 px-3 min-w-[50px] group-hover:bg-emerald-600 transition-all">
                    <span className="text-xs font-black leading-none">{date.day}</span>
                    <span className="text-[8px] font-bold uppercase">{date.month}</span>
                 </div>
                 <span className="text-xs font-black text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-tight leading-none">{date.event}</span>
             </div>
           ))}
        </div>
      </div>

      {/* SOCIALS */}
      <div className="flex gap-4">
          {[Instagram, Facebook, Linkedin].map((Icon, i) => (
            <button key={i} className="p-4 bg-slate-100 rounded-2xl text-slate-400 hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-lg shadow-emerald-500/20 active:scale-95">
               <Icon className="w-5 h-5" />
            </button>
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;
