import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, image, tags = [], color = "emerald" }) => (
  <div className="group relative min-h-[380px] rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)]">
    {/* Background Image & Overlays */}
    <div className="absolute inset-0 z-0">
      <img src={image} className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:grayscale-0 group-hover:scale-110 opacity-30" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
      <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-40 transition-opacity" />
    </div>

    {/* Content */}
    <div className="relative z-10 h-full p-8 flex flex-col justify-end">
       <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl w-fit mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
          <Icon className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
       </div>
       <h2 className="text-2xl font-black text-white mb-3 tracking-tight">{title}</h2>
       <p className="text-slate-300 font-medium text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity mb-5">{description}</p>
       
       <div className="flex flex-wrap gap-2 mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
          {tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-tighter">
                {tag}
            </span>
          ))}
       </div>

       <button className="flex items-center gap-2 text-xs font-bold text-emerald-400 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
           EXPLORER LA FILIÈRE <ArrowRight className="w-4 h-4" />
       </button>
    </div>
  </div>
);

export default FeatureCard;
