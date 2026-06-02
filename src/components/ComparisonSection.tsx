import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';

interface ComparisonRow {
  id: number;
  utmCant: string;
  oneononeCan: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 1,
    utmCant: "Can't show which post made a sale",
    oneononeCan: "Connects every sale to the exact post that caused it"
  },
  {
    id: 2,
    utmCant: "Can't track YouTube click timestamps",
    oneononeCan: "Shows the exact YouTube minute a viewer clicked"
  },
  {
    id: 3,
    utmCant: "Can't spy on competitor content",
    oneononeCan: "Reveals competitors' top posts + generates content outline"
  },
  {
    id: 4,
    utmCant: "Can't trigger smart exit popups",
    oneononeCan: "Triggers personalized exit popups based on viewer behavior"
  },
  {
    id: 5,
    utmCant: "Can't track DMs, bio taps, or VSL watch time",
    oneononeCan: "Tracks every DM, bio tap, scroll, and VSL second"
  },
  {
    id: 6,
    utmCant: "Can't show buyer journey timeline",
    oneononeCan: "Shows full buyer journey from first view to purchase"
  },
  {
    id: 7,
    utmCant: "Scattered across multiple platforms",
    oneononeCan: "Everything in one dashboard"
  },
  {
    id: 8,
    utmCant: "Built for marketers, not creators",
    oneononeCan: "Built specifically for course creators"
  },
  {
    id: 9,
    utmCant: "No ROI guarantee",
    oneononeCan: "11x your subscription or pay nothing"
  }
];

// Left background tunnel rows
const IMAGES_LEFT_1 = [
  "https://i.postimg.cc/wxRr4w2x/Screenshot-2026-05-29-202903.png",
  "https://i.postimg.cc/3r0qft1w/Screenshot-2026-05-29-202937.png",
  "https://i.postimg.cc/bYS5VmgN/Screenshot-2026-05-29-203022.png",
  "https://i.postimg.cc/mZ1npmjD/Screenshot-2026-05-29-203111.png",
];

const IMAGES_LEFT_2 = [
  "https://i.postimg.cc/h4QYZ2s7/Screenshot-2026-05-29-203147.png",
  "https://i.postimg.cc/FFk6CTpc/Screenshot-2026-05-29-203246.png",
  "https://i.postimg.cc/HW8Nv6zb/Screenshot-2026-05-29-203325.png",
  "https://i.postimg.cc/FFk6CTpj/Screenshot-2026-05-29-203420.png",
];

const IMAGES_LEFT_3 = [
  "https://i.postimg.cc/XNBP1sLg/Screenshot-2026-05-29-203522.png",
  "https://i.postimg.cc/nV9WS322/Screenshot-2026-05-29-203611.png",
  "https://i.postimg.cc/WbRHB0Yr/Screenshot-2026-05-29-203644.png",
  "https://i.postimg.cc/sDFNk5H7/Screenshot-2026-05-29-203659.png",
];

// Right background tunnel rows
const IMAGES_RIGHT_1 = [
  "https://i.postimg.cc/J4w2fjYd/Screenshot-2026-05-29-204908.png",
  "https://i.postimg.cc/5NcRh8Kr/Screenshot-2026-05-29-204841.png",
  "https://i.postimg.cc/nc8PyqS0/Screenshot-2026-05-29-204759.png",
  "https://i.postimg.cc/9F3n6ygb/Screenshot-2026-05-29-204339.png",
];

const IMAGES_RIGHT_2 = [
  "https://i.postimg.cc/7YvWFStn/Screenshot-2026-05-29-204026.png",
  "https://i.postimg.cc/TY84znNj/Screenshot-2026-05-29-203754.png",
  "https://i.postimg.cc/L6dbcjQG/Screenshot-2026-05-29-204954.png",
  "https://i.postimg.cc/Yqcs5QD5/Screenshot-2026-05-29-205049.png",
];

const IMAGES_RIGHT_3 = [
  "https://i.postimg.cc/wTKGCDbK/Screenshot-2026-05-29-205602.png",
  "https://i.postimg.cc/PrGRg1Fj/Screenshot-2026-05-29-205801.png",
  "https://i.postimg.cc/284Kr3gM/Screenshot-2026-05-29-205847.png",
  "https://i.postimg.cc/J4w2fjYd/Screenshot-2026-05-29-204908.png",
];

export default function ComparisonSection() {
  const [isTrackActive, setIsTrackActive] = useState(false);

  return (
    <section className="py-20 bg-[#fafaf8] relative overflow-hidden" id="utm-vs-track1on1">
      {/* 3D Infinite Corridor Stylesheet Injection */}
      <style>{`
        @keyframes tunnelScrollLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes tunnelScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-tunnel-left-slow {
          animation: tunnelScrollLeft 60s linear infinite;
        }
        .animate-tunnel-left-medium {
          animation: tunnelScrollLeft 48s linear infinite;
        }
        .animate-tunnel-left-fast {
          animation: tunnelScrollLeft 36s linear infinite;
        }
        .animate-tunnel-right-slow {
          animation: tunnelScrollRight 64s linear infinite;
        }
        .animate-tunnel-right-medium {
          animation: tunnelScrollRight 52s linear infinite;
        }
        .animate-tunnel-right-fast {
          animation: tunnelScrollRight 40s linear infinite;
        }
      `}</style>

      {/* Decorative subtle visual background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-100/10 rounded-full blur-3xl pointer-events-none -z-1" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/5 rounded-full blur-3xl pointer-events-none -z-1" />

      {/* LEFT SIDE TUNNEL WALL OF IMAGES */}
      <div 
        className="absolute left-0 inset-y-0 w-[35%] overflow-hidden pointer-events-none select-none z-0 hidden md:flex flex-col justify-center"
        style={{ perspective: '1100px', perspectiveOrigin: 'right center' }}
      >
        <div 
          className="flex flex-col gap-4 sm:gap-5"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateY(58deg) translateZ(-80px) scale(1.15)',
            transformOrigin: 'right center'
          }}
        >
          {/* Row 1 - Left */}
          <div className="flex w-max gap-4 animate-tunnel-left-slow py-1">
            {[...IMAGES_LEFT_1, ...IMAGES_LEFT_1].map((src, idx) => (
              <div 
                key={`left-r1-${idx}`}
                className="relative w-20 h-26 sm:w-26 sm:h-34 rounded-xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.06)] border border-zinc-200/90 bg-white shrink-0"
              >
                <img 
                  src={src} 
                  alt="" 
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isTrackActive ? 'grayscale-0 opacity-95 scale-100' : 'grayscale opacity-40 scale-[0.98]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isTrackActive ? 'bg-emerald-950/0' : 'bg-zinc-950/15'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Row 2 - Left */}
          <div className="flex w-max gap-4 animate-tunnel-left-medium py-1">
            {[...IMAGES_LEFT_2, ...IMAGES_LEFT_2].map((src, idx) => (
              <div 
                key={`left-r2-${idx}`}
                className="relative w-20 h-26 sm:w-26 sm:h-34 rounded-xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.06)] border border-zinc-200/90 bg-white shrink-0"
              >
                <img 
                  src={src} 
                  alt="" 
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isTrackActive ? 'grayscale-0 opacity-95 scale-100' : 'grayscale opacity-40 scale-[0.98]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isTrackActive ? 'bg-emerald-950/0' : 'bg-zinc-950/15'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Row 3 - Left */}
          <div className="flex w-max gap-4 animate-tunnel-left-fast py-1">
            {[...IMAGES_LEFT_3, ...IMAGES_LEFT_3].map((src, idx) => (
              <div 
                key={`left-r3-${idx}`}
                className="relative w-20 h-26 sm:w-26 sm:h-34 rounded-xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.06)] border border-zinc-200/90 bg-white shrink-0"
              >
                <img 
                  src={src} 
                  alt="" 
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isTrackActive ? 'grayscale-0 opacity-95 scale-100' : 'grayscale opacity-40 scale-[0.98]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isTrackActive ? 'bg-emerald-950/0' : 'bg-zinc-950/15'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE TUNNEL WALL OF IMAGES */}
      <div 
        className="absolute right-0 inset-y-0 w-[35%] overflow-hidden pointer-events-none select-none z-0 hidden md:flex flex-col justify-center"
        style={{ perspective: '1100px', perspectiveOrigin: 'left center' }}
      >
        <div 
          className="flex flex-col gap-4 sm:gap-5"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-58deg) translateZ(-80px) scale(1.15)',
            transformOrigin: 'left center'
          }}
        >
          {/* Row 1 - Right */}
          <div className="flex w-max gap-4 animate-tunnel-right-slow py-1">
            {[...IMAGES_RIGHT_1, ...IMAGES_RIGHT_1].map((src, idx) => (
              <div 
                key={`right-r1-${idx}`}
                className="relative w-20 h-26 sm:w-26 sm:h-34 rounded-xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.06)] border border-zinc-200/90 bg-white shrink-0"
              >
                <img 
                  src={src} 
                  alt="" 
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isTrackActive ? 'grayscale-0 opacity-95 scale-100' : 'grayscale opacity-40 scale-[0.98]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isTrackActive ? 'bg-emerald-950/0' : 'bg-zinc-950/15'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Row 2 - Right */}
          <div className="flex w-max gap-4 animate-tunnel-right-medium py-1">
            {[...IMAGES_RIGHT_2, ...IMAGES_RIGHT_2].map((src, idx) => (
              <div 
                key={`right-r2-${idx}`}
                className="relative w-20 h-26 sm:w-26 sm:h-34 rounded-xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.06)] border border-zinc-200/90 bg-white shrink-0"
              >
                <img 
                  src={src} 
                  alt="" 
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isTrackActive ? 'grayscale-0 opacity-95 scale-100' : 'grayscale opacity-40 scale-[0.98]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isTrackActive ? 'bg-emerald-950/0' : 'bg-zinc-950/15'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Row 3 - Right */}
          <div className="flex w-max gap-4 animate-tunnel-right-fast py-1">
            {[...IMAGES_RIGHT_3, ...IMAGES_RIGHT_3].map((src, idx) => (
              <div 
                key={`right-r3-${idx}`}
                className="relative w-20 h-26 sm:w-26 sm:h-34 rounded-xl overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.06)] border border-zinc-200/90 bg-white shrink-0"
              >
                <img 
                  src={src} 
                  alt="" 
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isTrackActive ? 'grayscale-0 opacity-95 scale-100' : 'grayscale opacity-40 scale-[0.98]'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div 
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isTrackActive ? 'bg-emerald-950/0' : 'bg-zinc-950/15'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHITE GRADIENT OVERLAYS AND BLENDING MASKS */}
      <div className="absolute inset-0 pointer-events-none z-10 select-none">
        {/* Top Edge Fade */}
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#fafaf8] to-transparent" />
        {/* Bottom Edge Fade */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#fafaf8] to-transparent" />
        {/* Left Edge Fade */}
        <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-[#fafaf8] to-transparent" />
        {/* Right Edge Fade */}
        <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-[#fafaf8] to-transparent" />
        {/* Center Readability Guard Fade */}
        <div className="absolute inset-y-0 left-[33%] right-[33%] bg-gradient-to-r from-transparent via-[#fafaf8]/98 to-transparent filter blur-[1px]" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-20">
        
        {/* Simplified Section Title */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-amber-850 font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-4 shadow-2xs">
            <Sparkles size={11} className="text-amber-500 animate-pulse" />
            <span>UTM VS TRACK1ON1</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-zinc-950 tracking-tight leading-[1.15] text-center">
            UTMs were built for{' '}
            <span className="relative inline-block z-1 text-zinc-500 font-serif italic font-medium px-4 py-1.5 ml-1 select-none">
              2008 websites.
              <svg 
                viewBox="0 0 220 70" 
                className="absolute -inset-x-3 -inset-y-1 w-[calc(100%+1.5rem)] h-[calc(100%+0.5rem)] pointer-events-none text-amber-400 -rotate-1"
                preserveAspectRatio="none"
              >
                <path 
                  d="M 15 25 C 60 8, 160 10, 205 28 C 215 45, 170 58, 110 60 C 50 62, 10 45, 12 28 C 13 14, 80 8, 145 10" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <br className="hidden sm:inline" />
            {" "}You're a <span className="relative inline-block z-1 text-emerald-600 font-serif italic font-medium px-2">creator in 2026.<span className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 h-2 bg-emerald-100/60 -rotate-1 -z-1 rounded-sm"></span></span>
          </h2>
        </div>

        {/* Unified Container Wrapper with Switch Button Center Top */}
        <div className="relative pt-24">
          
          {/* Centered Top Toggle Controller (No Container, Bigger Switch) */}
          <div className="absolute top-0 inset-x-0 flex flex-col items-center justify-center z-30 select-none">
            {/* Big Switch Switcher Button */}
            <button
              type="button"
              onClick={() => setIsTrackActive(!isTrackActive)}
              className="relative shrink-0 transition-all hover:scale-110 active:scale-95 duration-200 cursor-pointer focus:outline-hidden"
              aria-label="Toggle Comparison Mode"
            >
              <img
                src={isTrackActive 
                  ? "https://i.postimg.cc/136bDrTB/metal-toggle-switch-off-buttonjj.png" 
                  : "https://i.postimg.cc/vZ9C5tjz/metal-toggle-switch-off-bunnntton.png"
                }
                alt={isTrackActive ? "Metal Toggle Switch ON" : "Metal Toggle Switch OFF"}
                className={`h-15 sm:h-18 w-auto object-contain transition-all duration-300 ${
                  isTrackActive ? 'drop-shadow-[0_8px_24px_rgba(16,185,129,0.45)]' : 'drop-shadow-md'
                }`}
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Labels aligned under/around the big switch */}
            <div className="flex items-center gap-6 mt-3 font-mono text-[10px] uppercase tracking-[0.2em] font-extrabold">
              <span className={`transition-colors duration-300 ${!isTrackActive ? 'text-zinc-800' : 'text-zinc-400'}`}>
                UTMs
              </span>
              <span className="text-zinc-350 select-none">/</span>
              <span className={`transition-colors duration-300 flex items-center gap-1 ${
                isTrackActive ? 'text-emerald-700' : 'text-zinc-405'
              }`}>
                {isTrackActive && <Sparkles size={11} className="text-emerald-500 animate-pulse" />}
                Track1on1
              </span>
            </div>
          </div>

          {/* Clean Light-Themed Dual-State Container */}
          <motion.div
            layout
            className={`rounded-[24px] py-6 px-5 sm:py-8 sm:px-10 transition-all duration-500 border relative overflow-hidden ${
              isTrackActive
                ? 'bg-[#f4fbf7] border-emerald-300 shadow-[0_16px_40px_rgba(16,185,129,0.12)] text-emerald-950'
                : 'bg-zinc-100 border-zinc-200/80 shadow-sm text-zinc-700'
            }`}
          >
            {/* Ambient inner soft glowing light overlay inside active emerald mode */}
            {isTrackActive && (
              <div className="absolute right-0 top-0 w-36 h-36 bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />
            )}

            {/* List comparison elements - Styled, Centered alignment */}
            <div className="space-y-4 sm:space-y-5 relative z-10 text-center max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {COMPARISON_ROWS.map((row, idx) => (
                  <motion.div
                    key={`${row.id}-${isTrackActive ? 'active' : 'inactive'}`}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="flex flex-col items-center justify-center text-center relative"
                  >
                    {/* Minimal Prefix/Visual Badge */}
                    <div className="mb-1.5">
                      {isTrackActive ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-100/90 border border-emerald-300 flex items-center justify-center shadow-xs">
                          <Check size={10} className="text-emerald-850 stroke-[3px]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-zinc-200 border border-zinc-300/80 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-zinc-450" />
                        </div>
                      )}
                    </div>

                    {/* Simple centered statement with elegant design typography */}
                    <p className={`text-[14px] sm:text-[15.5px] leading-relaxed tracking-tight font-sans transition-colors duration-300 ${
                      isTrackActive 
                        ? 'text-emerald-950 font-extrabold max-w-sm' 
                        : 'text-zinc-650 font-semibold max-w-sm'
                    }`}>
                      {isTrackActive ? row.oneononeCan : row.utmCant}
                    </p>

                    {/* Elegant subtle line divider below each item except last */}
                    {idx < COMPARISON_ROWS.length - 1 && (
                      <div className={`w-8 h-[1px] mt-4 sm:mt-5 transition-colors duration-300 ${
                        isTrackActive ? 'bg-emerald-200/50' : 'bg-zinc-300/40'
                      }`} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

