import React from 'react';

const Header = () => {
  return (
    <div className="bg-slate-950 text-white py-2 px-6">
       <div className="container mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
           <p>LYCÉE PROFESSIONNEL BORT-ARTENSE — ACADÉMIE DE LIMOGES</p>
           <div className="flex gap-6">
               <span>CORRÈZE / NOUVELLE-AQUITAINE</span>
               <span>📞 05 55 96 03 00</span>
           </div>
       </div>
    </div>
  );
};

export default Header;
