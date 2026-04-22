import Hero from "@/components/Hero";
import ProductBento from "@/components/ProductBento";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ProductBento />
      
      <section className="section-padding bg-zinc-900/10 flex flex-col items-center justify-center border-t border-zinc-900">
        <h2 className="text-4xl md:text-6xl text-center mb-8">PRÊT À ÉQUIPER <br /> VOTRE ATELIER ?</h2>
        <button className="px-12 py-5 bg-accent text-accent-foreground font-bold rounded-full hover:scale-110 transition-transform active:scale-95 shadow-[0_0_50px_-12px_rgba(oklch(75%_0.2_45),0.5)]">
          REJOINDRE LA COMMUNAUTÉ
        </button>
        <div className="mt-16 text-zinc-600 font-mono text-[10px] uppercase tracking-[0.3em]">
          Addictive Prints // Engineering for Craftsmen
        </div>
      </section>
      
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950 text-center">
        <p className="text-zinc-600 text-sm font-mono tracking-widest">
          © 2026 ADDICTIVE PRINTS // ALL_RIGHTS_RESERVED
        </p>
      </footer>
    </main>
  );
}
