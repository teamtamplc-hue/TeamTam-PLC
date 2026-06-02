import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const FEATURES_DATA = [
  {
    title: "1. See Which Post Made You Money",
    description: "Know exactly which reel, video, or tweet drove every sale. Zero guessing. See conversion percentages, customer paths, and total returns per individual social media post.",
    image: "https://i.postimg.cc/wvR1n1wK/sdsdsddsddan.png",
    imageBg: "bg-gradient-to-br from-amber-50/40 to-orange-50/40",
    imageContain: true,
    scaleClass: "scale-[1.12] sm:scale-[1.18] lg:scale-[1.25] group-hover:scale-[1.3]"
  },
  {
    title: "2. Spy on Competitors",
    description: "Enter any competitor's link or handle. Discover their top-converting posts, spy on their direct-to-Stripe landing page funnels, and generate a customized content outline to easily recreate their success.",
    image: "https://i.postimg.cc/pT75Gfxx/alex-comepte.png",
    imageBg: "bg-zinc-50",
    imageContain: true,
    scaleClass: "scale-[1.12] sm:scale-[1.18] lg:scale-[1.25] group-hover:scale-[1.3]"
  },
  {
    title: "3. YouTube Click Timestamps",
    description: "Measure attention with frame-perfect precision. Detect the exact seconds viewers pause your video, inspect their cursor behavior, and discover which specific minute in your content triggered the checkout click.",
    image: "https://i.postimg.cc/q7rFqFtK/clicks-image.png",
    imageBg: "bg-zinc-50",
    imageContain: true,
    scaleClass: "scale-[0.95] sm:scale-[1.0] lg:scale-[1.05] group-hover:scale-[1.1]"
  },
  {
    title: "4. Multi-Touch Journey Map",
    description: "See every single touchpoint a buyer had with your content before they purchased - first video, second reel, bio tap, DM , the full path visualized.",
    image: "https://i.postimg.cc/nLvGjVy5/haruttttt.png",
    imageBg: "bg-zinc-50",
    imageContain: true,
    scaleClass: "scale-[1.12] sm:scale-[1.18] lg:scale-[1.25] group-hover:scale-[1.3]"
  },
  {
    title: "5. One Dashboard",
    description: "Consolidate your entire business creator model in a single modern screen. Your top-performing content, cross-platform stats, and historical buyer journeys aggregated in real-time.",
    image: "https://i.postimg.cc/HkxZF59v/Untitled-8.png",
    imageBg: "bg-zinc-50",
    imageContain: true,
    scaleClass: "scale-[1.12] sm:scale-[1.18] lg:scale-[1.25] group-hover:scale-[1.3]"
  }
];

export default function Features() {
  return (
    <section className="pt-16 pb-20 border-t border-zinc-200/50 bg-[#fafaf9] relative overflow-hidden" id="features">
      {/* Realistic high-fidelity thin background coordinate grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* PREMIUM PLACEMENT ARC HEADER */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          
          {/* Micro Badge floating beneath */}
          <div className="z-10 bg-white border border-zinc-200/80 px-4 py-1.5 rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.02)] text-zinc-800 font-mono text-[9px] tracking-[4px] font-bold uppercase mb-6 flex items-center gap-1.5">
            <Sparkles size={10} className="text-amber-500 animate-spin-slow" />
            FEATURES
          </div>

          <h2 id="features-title" className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center max-w-4xl">
            Everything your <span className="relative inline-block z-1 text-amber-700 font-serif italic font-medium px-2">1on1 business<span className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 h-3 bg-amber-100/95 -rotate-1 -z-1 rounded-sm"></span></span> needs to grow
          </h2>
          <p className="mt-4 text-base sm:text-xl text-zinc-500 max-w-2xl text-center leading-relaxed font-sans">
            See what's working, cut what's not, and make more doing what you love.
          </p>
        </div>

        {/* VERTICAL LIST OF STUNNING ALTERNATING FEATURES */}
        <div className="space-y-16 sm:space-y-24">
          {FEATURES_DATA.map((item, index) => {
            const isLeftImage = index % 2 === 1;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col gap-8 md:gap-12 lg:gap-16 items-center ${
                  isLeftImage ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Text Block */}
                <div className="flex-1 space-y-4 max-w-xl">
                  <span className="text-amber-700 font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase bg-amber-50 border border-amber-200/50 px-2.5 py-1 rounded-full">
                    FEATURE 0{index + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3.5xl font-extrabold text-zinc-900 tracking-tight leading-tight pt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-sans font-normal">
                    {item.description}
                  </p>
                  {index === 4 && (
                    <div className="mt-6 flex justify-start w-full">
                      <img 
                        src="https://i.postimg.cc/kXB9vVtq/ghghghghg.png" 
                        alt="Arrow" 
                        className="w-20 sm:w-24 md:w-28 h-auto object-contain pointer-events-none select-none filter drop-shadow-sm opacity-90 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>

                {/* Visual Block */}
                <div className="flex-1 w-full max-w-xl flex flex-col items-center justify-center">
                  <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[360px] flex items-center justify-center group overflow-visible">
                    {item.imageContain ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`max-h-full max-w-full object-contain transition-transform duration-700 select-none pointer-events-none drop-shadow-md ${item.scaleClass || "group-hover:scale-[1.04]"}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`max-h-full max-w-full rounded-2xl object-cover transition-transform duration-700 select-none pointer-events-none shadow-sm group-hover:shadow-md ${item.scaleClass || "group-hover:scale-[1.03]"}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    )}
                  </div>
                  {index === 0 && (
                    <div className="mt-6 flex justify-center w-full">
                      <img 
                        src="https://i.postimg.cc/HWbk7850/arrrrow.png" 
                        alt="Arrow" 
                        className="w-20 sm:w-24 md:w-28 h-auto object-contain pointer-events-none select-none filter drop-shadow-sm opacity-90 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="mt-6 flex justify-center w-full">
                      <img 
                        src="https://i.postimg.cc/02Nh1L8p/arrowee.png" 
                        alt="Arrow" 
                        className="w-20 sm:w-24 md:w-28 h-auto object-contain pointer-events-none select-none filter drop-shadow-sm opacity-90 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="mt-6 flex justify-center w-full">
                      <img 
                        src="https://i.postimg.cc/Y0vNbfHG/edsddsds.png" 
                        alt="Arrow" 
                        className="w-20 sm:w-24 md:w-28 h-auto object-contain pointer-events-none select-none filter drop-shadow-sm opacity-90 transition-opacity duration-300 md:rotate-3"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {index === 3 && (
                    <div className="mt-6 flex justify-center w-full">
                      <img 
                        src="https://i.postimg.cc/nLMvHGXG/bbbnarow.png" 
                        alt="Arrow" 
                        className="w-20 sm:w-24 md:w-28 h-auto object-contain pointer-events-none select-none filter drop-shadow-sm opacity-90 transition-opacity duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
