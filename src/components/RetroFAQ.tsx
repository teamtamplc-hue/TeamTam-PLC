import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function RetroFAQ() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "1. Do I need to be a developer or technical person to use Track 1on1?",
      a: "Not at all. You connect your accounts in one click and Track 1on1 deploys everything automatically. No code, no setup, no developer needed. If you can log into Instagram, you can use Track 1on1."
    },
    {
      q: "2. How does Track 1on1 know which post made the sale?",
      a: "The moment you connect your accounts, we attach a Smart Link to every post across every platform. When someone clicks, we follow that exact visitor — through your page, through your video, through your checkout — and tie the final purchase back to the post that started their journey."
    },
    {
      q: "3. Will this slow down my website or sales page?",
      a: "No. Track 1on1 runs silently in the background. Your page loads exactly the same speed. Your visitors never know it's there."
    },
    {
      q: "4. What platforms does Track 1on1 support?",
      a: "Currently YouTube, Instagram, and Twitter (X). With full integrations for course platforms like Kajabi, Teachable, ThriveCart, Gumroad, and Stan Store — plus email tools like ConvertKit and ActiveCampaign."
    },
    {
      q: "5. How does the 11x guarantee actually work?",
      a: "Simple. If at the end of your first month you can't see at least 11 times your subscription amount in attributed revenue inside your Track 1on1 dashboard — you pay nothing. No forms, no arguments, no fine print."
    },
    {
      q: "6. What exactly does the Auto DM feature do?",
      a: "When someone comments on your reel, replies to your tweet, or uses a keyword you set — Track 1on1 automatically sends them a DM with your link or message instantly. You set it once, it runs 24/7 while you sleep."
    },
    {
      q: "7. Is my data and my audience's data safe?",
      a: "Yes. Track 1on1 uses enterprise-grade encryption and never sells, shares, or exposes your audience data to any third party. Everything tracked stays inside your dashboard and belongs to you."
    },
    {
      q: "8. What's the difference between Track 1on1 and just using UTM links?",
      a: "UTM links tell you someone clicked. Track 1on1 tells you who clicked, which video minute made them click, how long they stayed on your page, how much of your VSL they watched, whether they hovered the buy button, and exactly how much money that one post made you. UTMs show you the door. Track 1on1 shows you everything that happened inside."
    },
    {
      q: "9. Can I track competitors even if I don't follow them?",
      a: "Yes. Just type in any YouTube channel name, Instagram handle, or Twitter account. Track 1on1 scans their top performing content publicly and generates outlines for you — no following, no connection needed."
    },
    {
      q: "10. How quickly can I get set up and see my first data?",
      a: "Most creators see their first tracked clicks within minutes of connecting. Full revenue attribution data — meaning a complete sale traced back to a specific post — typically shows up within the first 24 to 48 hours depending on your traffic volume."
    }
  ];

  return (
    <section className="py-24 border-t border-zinc-200/85 bg-[#fafaf8] relative overflow-hidden" id="frequently-asked-cases">
      {/* Background coordinate grid decorations - Keeps visual alignment with the rest of the application */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.05] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10 font-sans">
        
        {/* Modern styled Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-850 bg-amber-50 rounded-full border border-amber-200/60 leading-none">
            <HelpCircle size={12} className="text-amber-600" />
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#451a03] mt-5 tracking-tight leading-tight flex flex-wrap items-center justify-center gap-y-2">
            Answering Your Questions About&nbsp;
            <span className="relative inline-block z-1 whitespace-nowrap">
              <span className="relative z-10 text-amber-800 font-serif italic font-medium px-2">
                Track 1on1
              </span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-100/95 -rotate-1 -z-1 rounded-xs"></span>
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#78350f]/80 mt-4 font-semibold max-w-xl mx-auto leading-relaxed">
            Everything you need to know about connecting accounts, automated attribution technology, and growing with zero hassle.
          </p>
        </div>

        {/* Tactile Bulletin Wood Board Frame containing Corkboard backdrop */}
        <div className="relative w-full rounded-3xl p-4 sm:p-6 md:p-10 bg-[#92400e] shadow-[0_25px_50px_-12px_rgba(120,53,15,0.45),_inset_0_4px_12px_rgba(255,255,255,0.3)] border-4 sm:border-8 border-[#78350f] overflow-hidden">
          
          {/* Overlay to give realistic depth and light shading */}
          <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none z-0" />

          {/* Grid of pinned paper sheets */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pb-2">
            {faqs.map((faq, idx) => {
              const isOpen = activeIdx === idx;
              
              // Slightly staggered 3D rotation angles to replicate real pinned papers
              const rotAngles = ['-1.1deg', '0.7deg', '-0.6deg', '1deg', '-0.8deg', '0.5deg', '-0.9deg', '0.8deg', '-0.5deg', '1.1deg'];
              const rotation = rotAngles[idx % rotAngles.length];

              return (
                <div 
                  key={idx}
                  className="relative rounded-sm transition-all duration-300 bg-[#fffef7] border border-[#f3dfc6]/80 text-[#3a2212] p-5 sm:p-6 shadow-[5px_8px_18px_rgba(0,0,0,0.22)] hover:shadow-[8px_14px_28px_rgba(0,0,0,0.28)] hover:scale-[1.015]"
                  style={{
                    transform: `rotate(${rotation})`,
                    boxShadow: isOpen 
                      ? '12px 18px 32px rgba(0,0,0,0.28)' 
                      : undefined
                  }}
                >
                  {/* Decorative Colored Pinned pushpin at the top center of page */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
                    {/* Metal needle stick shadow */}
                    <div className="w-[1px] h-3 bg-zinc-650 opacity-60" />
                    {/* Pin colorful cap */}
                    <div className={`w-3.5 h-3.5 rounded-full border border-black/25 ${
                      idx % 3 === 0 
                        ? 'bg-red-500 shadow-[0_3px_5px_rgba(239,68,68,0.4)]' 
                        : idx % 3 === 1 
                          ? 'bg-sky-500 shadow-[0_3px_5px_rgba(14,165,233,0.4)]' 
                          : 'bg-yellow-400 shadow-[0_3px_5px_rgba(234,179,8,0.4)]'
                    }`} />
                  </div>

                  <div className="flex gap-3 items-start justify-between">
                    <button
                      onClick={() => setActiveIdx(isOpen ? null : idx)}
                      className="text-left font-extrabold text-[15px] sm:text-[16px] leading-snug tracking-tight text-[#451a03] hover:text-[#92400e] focus:outline-hidden transition-colors cursor-pointer flex-1 pr-2"
                    >
                      {faq.q}
                    </button>

                    {/* Clean circular fold-out button */}
                    <button
                      onClick={() => setActiveIdx(isOpen ? null : idx)}
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 cursor-pointer bg-[#78350f] hover:bg-[#451a03] text-white shadow-xs"
                      aria-label="Toggle answer panel"
                    >
                      <ChevronDown 
                        size={15} 
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                  </div>

                  {/* Expanded envelope displaying the answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                      >
                        <div className="mt-4 pt-4 border-t border-[#ebd9be] text-[14px] sm:text-[15px] text-[#5c3c25] leading-relaxed font-semibold font-sans pr-1">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
