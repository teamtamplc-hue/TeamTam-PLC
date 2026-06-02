import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, ShieldCheck } from 'lucide-react';

interface Tier {
  id: 'pro' | 'max' | 'agency';
  name: string;
  subName: string;
  amount: string;
  originalAmount: string;
  discountBadge: string;
  desc: string;
  badge?: string;
  guaranteeText: string;
  guaranteeMultiplier: string;
  qtyText: string;
  features: string[];
  barcode: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badgeStyle: string;
    btnStyle: string;
    guaranteeStyle: string;
  };
}

// Serrated edge overlay to model realistic thermal paper tear
const SerratedEdge = ({ position = 'bottom' }: { position?: 'top' | 'bottom' }) => {
  return (
    <div 
      className={`absolute left-0 right-0 h-2.5 flex overflow-hidden pointer-events-none select-none z-20 ${
        position === 'top' ? 'top-0 rotate-180' : 'bottom-0'
      }`}
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <svg 
          key={i} 
          className="w-4 h-2.5 shrink-0" 
          viewBox="0 0 16 10" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0 L8 8 L16 0 L16 10 L0 10 Z" fill="#ffffff" />
        </svg>
      ))}
    </div>
  );
};

// Single parameterised receipt items component capable of super-readable MAGNIFIED view
const ReceiptContent = ({ 
  plan, 
  isMagnified = false,
  onSelectPlan
}: { 
  plan: Tier; 
  isMagnified?: boolean;
  onSelectPlan?: (tierId: 'pro' | 'max' | 'agency') => void;
}) => {
  return (
    <div className="flex flex-col justify-between h-auto flex-1">
      <div className="relative">
        
        {/* Receipt meta header strip */}
        <div className="text-center font-mono my-3 uppercase tracking-wider text-[11px] leading-none mb-6">
          {plan.badge && (
            <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-xs border inline-block mb-3 ${
              isMagnified 
                ? 'bg-amber-200 text-amber-950 border-amber-400 font-black scale-105' 
                : 'bg-amber-100/90 text-amber-900 border-amber-200'
            }`}>
              {plan.badge}
            </span>
          )}
          <p className={`text-xs tracking-widest ${isMagnified ? 'text-black font-black' : 'text-zinc-800 font-extrabold'}`}>
            *** RECEIPT ***
          </p>
          <p className={`mt-1 ${isMagnified ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>TRACK 1on1 INC.</p>
          <p className={isMagnified ? 'text-zinc-950 font-bold' : 'text-zinc-500'}>REG_ID: 0{plan.amount}-{plan.id.toUpperCase()}</p>
          <p className={isMagnified ? 'text-zinc-950 font-bold' : 'text-zinc-500'}>DATE: 2026-05-28 12:35Z</p>
          <p className="pt-2.5 border-b border-dashed border-zinc-300"></p>
        </div>

        {/* Title Header */}
        <div className="flex justify-between items-end mt-4">
          <div>
            <span className={`text-[10px] uppercase font-mono block ${isMagnified ? 'text-zinc-900 font-black' : 'text-zinc-400 font-extrabold'}`}>
              PLAN TIER
            </span>
            <h3 className={`text-3xl font-extrabold tracking-tight font-sans ${isMagnified ? 'text-black font-black' : 'text-zinc-950'}`}>
              {plan.name}
            </h3>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase font-mono tracking-widest ${
            isMagnified ? 'bg-zinc-300 text-black font-black border border-zinc-400' : plan.colorTheme.badgeStyle
          }`}>
            {plan.subName}
          </span>
        </div>

        {/* Pricing block */}
        <div className="my-5 py-4 border-t border-b border-dashed border-zinc-300">
          <div className="flex items-baseline gap-1.5 justify-between">
            <span className={`uppercase tracking-wider text-xs font-mono ${isMagnified ? 'text-black font-black' : 'text-zinc-500 font-bold'}`}>
              PLAN AMOUNT:
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className={`text-4.5xl sm:text-5xl font-black tracking-tight ${isMagnified ? 'text-black font-black' : 'text-zinc-950'}`}>
                ${plan.amount}
              </span>
              <span className={`font-semibold text-xs font-mono ${isMagnified ? 'text-black font-bold' : 'text-zinc-500'}`}>/Mo</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className={`text-xs font-mono line-through ${isMagnified ? 'text-zinc-800 font-bold' : 'text-zinc-400'}`}>
              {plan.originalAmount}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${
              isMagnified 
                ? 'bg-emerald-200 text-emerald-950 font-black border border-emerald-400' 
                : 'bg-emerald-100 text-emerald-800 font-extrabold'
            }`}>
              {plan.discountBadge}
            </span>
          </div>
          
          <p className={`text-[11px] italic mt-2.5 text-right ${isMagnified ? 'text-zinc-900 font-bold' : 'text-zinc-500 font-medium'}`}>
            {plan.desc}
          </p>
        </div>

        {/* Dynamic Guarantee panel */}
        <div className={`my-5 p-4 rounded border shadow-xs relative ${
          isMagnified 
            ? 'bg-amber-100/90 border-amber-300 text-amber-950' 
            : plan.colorTheme.guaranteeStyle
        }`}>
          <span className="absolute -top-2.5 -right-1 text-base">🛡️</span>
          <p className={`text-[10px] uppercase tracking-wider font-mono flex items-center gap-1 ${
            isMagnified ? 'font-black text-amber-950' : 'font-semibold text-amber-800'
          }`}>
            <ShieldCheck size={13} className="shrink-0" /> Our Guarantee
          </p>
          <p className={`text-xs sm:text-xs font-sans mt-1 leading-relaxed ${isMagnified ? 'text-black font-black' : 'text-zinc-800 font-bold'}`}>
            Make <span className="underline decoration-wavy decoration-amber-500 bg-amber-50 px-0.5 rounded-sm font-black">{plan.guaranteeText.match(/\$\d+,\d+\+/)?.[0] || "$3,278+"}</span> or you don't pay <span className="font-serif italic text-rose-800 ml-0.5 font-semibold">({plan.guaranteeMultiplier})</span>
          </p>
        </div>

        {/* Feature checklist */}
        <div className="mt-5">
          <p className={`text-[10px] font-mono uppercase tracking-wider pb-1 border-b border-dashed border-zinc-200 mb-3 ${
            isMagnified ? 'text-zinc-950 font-black border-zinc-400' : 'text-zinc-400 font-bold'
          }`}>
            {plan.qtyText}
          </p>
          <ul className="space-y-2">
            {plan.features.map((f, i) => {
              const isEverythingInMax = f.includes("Everything in Max");
              const isEverythingInPro = f.includes("Everything in Pro");
              const isSubHeading = isEverythingInMax || isEverythingInPro;
              
              return (
                <li 
                  key={i} 
                  className={`flex items-start gap-2.5 text-xs sm:text-[13px] ${
                    isSubHeading 
                      ? isMagnified ? 'font-black text-black border-b border-dashed border-zinc-400 pb-1 mt-2.5' : 'font-bold text-zinc-900 border-b border-dashed border-zinc-200 pb-0.5 mt-2'
                      : isMagnified ? 'text-zinc-900 font-semibold' : 'text-zinc-700 font-medium'
                  }`}
                >
                  {isSubHeading ? (
                    <Zap size={12} className={`shrink-0 mt-0.5 ${isMagnified ? 'text-amber-600 scale-110' : 'text-amber-500'}`} />
                  ) : (
                    <Check size={12} className={`shrink-0 mt-0.5 ${isMagnified ? 'text-emerald-900 stroke-[3px]' : 'text-emerald-600'}`} />
                  )}
                  <span className="leading-tight font-sans">{f}</span>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      {/* Button segment */}
      <div className="pt-6 border-t border-dashed border-zinc-300 relative z-10 w-full mt-6">
        <button 
          type="button"
          onClick={() => onSelectPlan?.(plan.id)}
          className={`block w-full text-center py-3 px-4 rounded font-bold tracking-wider font-mono text-[11px] uppercase shadow-xs transition-all active:scale-[0.99] cursor-pointer ${plan.colorTheme.btnStyle} ${
            isMagnified ? 'scale-102 ring-1 ring-zinc-400 font-extrabold shadow-sm' : ''
          }`}
        >
          SELECT {plan.name.toUpperCase()} TIER
        </button>
      </div>
    </div>
  );
};

// Precise mathematical floating magnifying glass overlay
export interface OpticsConfig {
  diameter: number;
  centerX: number;
  centerY: number;
  scale: number;
  showCrosshairs: boolean;
  hdRefraction: boolean;
}

interface MagnifierGlassProps {
  x: number;
  y: number;
  cardWidth: number;
  cardHeight: number;
  plan: Tier;
  optics: OpticsConfig;
}

const MagnifierGlass = ({ x, y, cardWidth, cardHeight, plan, optics }: MagnifierGlassProps) => {
  const LENS_DIAMETER = optics.diameter;       // Lens frame/glass outer diameter
  const LENS_CENTER_X = optics.centerX;        // Centered coordinate point of glass in the 260px image
  const LENS_CENTER_Y = optics.centerY;        // Centered coordinate point of glass in the 260px image
  const GLASS_IMAGE_SIZE = 260;                // Dimensions of the rendering container bounding box
  const SCALE = optics.scale;                  // Real magnification physics multiplier

  return (
    <div 
      className="absolute pointer-events-none z-50 select-none transition-opacity duration-150 ease-out"
      style={{
        width: GLASS_IMAGE_SIZE,
        height: GLASS_IMAGE_SIZE,
        left: x - LENS_CENTER_X,
        top: y - LENS_CENTER_Y,
      }}
    >
      {/* 1. Zoomed circular window masking layer */}
      <div 
        className="absolute overflow-hidden rounded-full border-2 border-zinc-400/40 shadow-[inset_0_4px_14px_rgba(0,0,0,0.22),0_10px_25px_rgba(0,0,0,0.3)]"
        style={{
          width: LENS_DIAMETER,
          height: LENS_DIAMETER,
          left: LENS_CENTER_X - LENS_DIAMETER / 2,
          top: LENS_CENTER_Y - LENS_DIAMETER / 2,
          backgroundColor: '#fefefe'
        }}
      >
        {/* Render a replica of the receipt inside, translated based on the center of magnification optics */}
        <div 
          className="absolute"
          style={{
            width: cardWidth,
            height: cardHeight,
            left: LENS_DIAMETER / 2 - x * SCALE,
            top: LENS_DIAMETER / 2 - y * SCALE,
            transform: `scale(${SCALE})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Card background replica inside the viewport */}
          <div className={`w-full h-full p-8 sm:p-9 ${plan.colorTheme.bg}`} style={{
            backgroundImage: 'linear-gradient(90deg, transparent 79px, #f7e4d6 80px, transparent 81px), linear-gradient(rgba(255,255,255,0.73), rgba(255,255,255,0.73))',
          }}>
            <ReceiptContent plan={plan} isMagnified={true} />
          </div>
        </div>

        {/* Lens Glass Highlight / Refraction Ring effect */}
        {optics.hdRefraction && (
          <div 
            className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-90"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 30%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0.02) 70%, rgba(255,255,255,0.35) 100%)',
            }}
          />
        )}

        {/* Crosshair Center Align Marker for absolute perfect calibration feedback */}
        {optics.showCrosshairs && (
          <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
            <div className="w-full h-[1px] bg-red-500/80 absolute" />
            <div className="h-full w-[1px] bg-red-500/80 absolute" />
            <div className="w-5 h-5 rounded-full border border-red-500/80 bg-red-500/20 flex items-center justify-center text-[7px] font-mono leading-none text-red-650 font-bold">
              {Math.round(LENS_DIAMETER)}px
            </div>
          </div>
        )}
      </div>

      {/* 2. Stunning highly realistic 3D PNG layer overlay */}
      <img 
        src="https://static.vecteezy.com/system/resources/thumbnails/009/876/398/small/realistic-magnifying-glass-clip-art-free-png.png" 
        alt="Magnifier Frame Glass"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
        referrerPolicy="no-referrer"
      />

      {/* Crosshair on Glass to check if outer picture matches exactly under */}
      {optics.showCrosshairs && (
        <div 
          className="absolute pointer-events-none z-40 rounded-full border border-dotted border-blue-500/80" 
          style={{
            width: LENS_DIAMETER + 4,
            height: LENS_DIAMETER + 4,
            left: LENS_CENTER_X - (LENS_DIAMETER + 4) / 2,
            top: LENS_CENTER_Y - (LENS_DIAMETER + 4) / 2,
          }}
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-blue-600 bg-white/95 px-1 rounded shadow-xs font-bold leading-none select-none">
            Lens Center: ({LENS_CENTER_X}, {LENS_CENTER_Y})
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Receipt Card Wrapper executing the custom hover Magnifier effect
const ReceiptCard = ({ 
  plan, 
  optics,
  onSelectPlan
}: { 
  plan: Tier; 
  optics: OpticsConfig; 
  onSelectPlan?: (tierId: 'pro' | 'max' | 'agency') => void;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [cardSize, setCardSize] = React.useState({ width: 360, height: 750 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (cardRef.current) {
      setCardSize({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight
      });
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      className="relative group/receipt overflow-visible cursor-none md:hover:scale-[1.01] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Outer casting shadow */}
      <div className="absolute inset-x-4 bottom-2 top-8 bg-black/15 blur-lg rounded-xl group-hover/receipt:blur-xl transition-all scale-[0.98] pointer-events-none select-none z-0" />

      {/* Staple block (rendered on base layer only for neat optics) */}
      <div className="absolute top-2 w-10 h-2 bg-zinc-300 border-t border-b border-zinc-400/80 rounded-xs opacity-65 left-1/2 -translate-x-1/2 shadow-[0_1px_2px_rgba(0,0,0,0.1)] pointer-events-none select-none z-30" />

      {/* Pure base receipt card */}
      <div 
        ref={cardRef}
        className={`relative w-full h-auto border rounded-md shadow-md flex flex-col justify-between overflow-hidden p-8 sm:p-9 z-10 ${plan.colorTheme.bg} ${plan.colorTheme.border}`}
        style={{ 
          transform: isHovered 
            ? 'rotate(0deg) scale(1.015)' 
            : `rotate(${plan.id === 'pro' ? -1.2 : plan.id === 'max' ? 1.55 : -0.6}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          backgroundImage: 'linear-gradient(90deg, transparent 79px, #faece1 80px, transparent 81px), linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7))',
          transformOrigin: 'center center'
        }}
      >
        <SerratedEdge position="top" />
        <SerratedEdge position="bottom" />

        <ReceiptContent plan={plan} isMagnified={false} onSelectPlan={onSelectPlan} />
      </div>

      {/* Premium floating glass follow overlay with reactive optics control */}
      {isHovered && (
        <MagnifierGlass 
          x={mousePos.x} 
          y={mousePos.y} 
          cardWidth={cardSize.width} 
          cardHeight={cardSize.height} 
          plan={plan} 
          optics={optics}
        />
      )}
    </div>
  );
};

const OPTICS_CONFIG: OpticsConfig = {
  diameter: 142,
  centerX: 89,
  centerY: 80,
  scale: 1.55,
  showCrosshairs: false,
  hdRefraction: true
};

export default function Pricing({ 
  onSelectPlan 
}: { 
  onSelectPlan?: (tierId: 'pro' | 'max' | 'agency') => void;
}) {
  const proFeatures = [
    "1 YouTube channel",
    "1 Instagram account",
    "1 Twitter (X) account",
    "Up to 5,000 clicks / month",
    "150 Smart Tracking Links",
    "Up to 3 team members",
    "Auto-deployed Smart Links - no setup needed",
    "15,000 Twitter (X) Auto DMs / month",
    "15,050 Instagram Auto DMs / month",
    "Full revenue attribution per post",
    "YouTube click timestamp tracking",
    "Visitor behavior tracking (scroll, watch time, hover)",
    "Multi-video buyer journey tracking",
    "Per-video financial reports",
    "Basic reporting dashboard",
    "Exportable reports",
    "Exit-intent intelligence",
    "Lead source tagging"
  ];

  const maxFeatures = [
    "Everything in Pro, plus:",
    "Up to 3 YouTube channels",
    "Up to 2 Instagram accounts (30,000 Instagram Auto DMs / month)",
    "Up to 2 Twitter (X) accounts (30,000 Twitter (X) Auto DMs / month)",
    "Up to 25,000 clicks / month",
    "350 Smart Tracking Links",
    "Up to 10 team members",
    "Advanced reporting dashboard",
    "Revenue trends & performance over time",
    "Top-performing content insights across all platforms",
    "Lead journey depth analysis",
    "Competitor content intelligence - import any channel or account",
    "Content Outliner - ready-made post outlines based on competitor top posts",
    "Priority tracking processing",
    "Audience segmentation (buyers vs hesitant vs wrong fit)",
    "VSL drop-off map"
  ];

  const agencyFeatures = [
    "Everything in Max, plus:",
    "10+ YouTube channels",
    "Unlimited Instagram & Twitter accounts",
    "100,000+ clicks / month",
    "500–2,000+ Smart Tracking Links",
    "5–20 team members",
    "Multi-client dashboard - manage all creators from one view",
    "45,000 Twitter (X) Auto DMs / month",
    "45,000 Instagram Auto DMs / month",
    "Agency view across all accounts",
    "Advanced filtering & attribution",
    "Historical performance tracking",
    "White-label reporting for clients",
    "Custom Smart Link domains",
    "Dedicated onboarding call",
    "Priority support response within 2 hours",
    "Quarterly strategy review call",
    "Early access to all new features"
  ];

  const PLANS: Tier[] = [
    {
      id: 'pro',
      name: "Pro",
      subName: "Solo Creator",
      amount: "149",
      originalAmount: "$298 / month",
      discountBadge: "50% OFF ACTIVATED",
      desc: "Best for solo creators just getting started",
      guaranteeText: "Make $3,278+ or you don't pay",
      guaranteeMultiplier: "11x investment",
      qtyText: "QTY: 18 CHANNELS / SERVICES",
      features: proFeatures,
      barcode: "T-1101-G-PRO-149",
      colorTheme: {
        bg: "bg-[#fafaf6]",
        border: "border-zinc-200/80",
        text: "text-zinc-900",
        badgeStyle: "bg-zinc-200/70 text-zinc-700",
        btnStyle: "bg-[#eae6de] hover:bg-[#ded9cf] text-zinc-800 border border-zinc-300/60 shadow-xs",
        guaranteeStyle: "bg-[#fdfdf7] border-amber-200/60 text-amber-800"
      }
    },
    {
      id: 'max',
      name: "Max",
      subName: "Scale Kit",
      amount: "298",
      originalAmount: "$498 / month",
      discountBadge: "40% OFF ACTIVATED",
      desc: "Best for creators scaling to multiple platforms and channels",
      badge: "MOST POPULAR",
      guaranteeText: "Make $4,980+ or you don't pay",
      guaranteeMultiplier: "10x investment",
      qtyText: "QTY: 16 SCALING SOLUTIONS",
      features: maxFeatures,
      barcode: "T-1202-G-MAX-298",
      colorTheme: {
        bg: "bg-[#fcfcf0]",
        border: "border-yellow-200/90",
        text: "text-zinc-900",
        badgeStyle: "bg-amber-100 text-amber-900",
        btnStyle: "bg-[#efefd2] hover:bg-[#e2e2be] text-amber-950 border border-yellow-300/50 shadow-xs",
        guaranteeStyle: "bg-[#fbfbef] border-amber-300/80 text-amber-850"
      }
    },
    {
      id: 'agency',
      name: "Agency",
      subName: "Enterprise",
      amount: "908",
      originalAmount: "$1,298 / month",
      discountBadge: "30% OFF ACTIVATED",
      desc: "Best for agencies and professionals managing multiple creators",
      guaranteeText: "Make $10,384+ or you don't pay",
      guaranteeMultiplier: "8x investment",
      qtyText: "QTY: 19 COMPREHENSIVE TOOLS",
      features: agencyFeatures,
      barcode: "T-1303-G-AGN-908",
      colorTheme: {
        bg: "bg-[#fafafa]",
        border: "border-zinc-200",
        text: "text-zinc-900",
        badgeStyle: "bg-indigo-50 text-indigo-700",
        btnStyle: "bg-[#ebebeb] hover:bg-[#dedede] text-zinc-800 border border-zinc-300/60 shadow-xs",
        guaranteeStyle: "bg-[#f5f6ff] border-indigo-200/50 text-indigo-850"
      }
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 relative" id="pricing-section">
      {/* Decorative Corner Pencil Logos */}
      <img 
        src="https://i.postimg.cc/yxJhqvCs/pencil-logo.png" 
        alt="" 
        className="absolute top-4 left-4 w-16 h-16 md:w-24 md:h-24 pointer-events-none select-none opacity-78"
        referrerPolicy="no-referrer"
      />
      <img 
        src="https://i.postimg.cc/yxJhqvCs/pencil-logo.png" 
        alt="" 
        className="absolute top-4 right-4 w-16 h-16 md:w-24 md:h-24 pointer-events-none select-none opacity-78 scale-x-[-1]"
        referrerPolicy="no-referrer"
      />
      
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 rounded-sm border border-amber-200">
          PROVEN RETURN PLANS
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 mt-4 font-sans">
          Pricing
        </h2>
        
        {/* Highlight notification */}
        <div className="mt-4 inline-block bg-yellow-105/90 border border-amber-300 text-amber-900 px-4 py-2.5 rounded-lg font-bold shadow-sm rotate-[-1deg] text-sm sm:text-base font-sans relative">
          <span className="absolute -top-2.5 -left-2 text-xl">🎁</span>
          Get 50% off for 3 months if you’re among the first 100 people.
        </div>
        
        <p className="text-sm sm:text-base text-zinc-600 font-medium max-w-2xl mx-auto mt-6 leading-relaxed">
          Stop Paying for Tools That Don't Pay You Back. Track 1on1 has a simple rule: <span className="underline italic text-amber-800 font-bold">“if you don't make at least the return below on your plan, you don't pay. No questions asked.”</span>
        </p>
      </div>

      {/* The Three Shaded Thermal Receipt Sheets wearing responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start pt-6 pb-12">
        {PLANS.map((plan) => (
          <div key={plan.id} className="contents">
            <ReceiptCard plan={plan} optics={OPTICS_CONFIG} onSelectPlan={onSelectPlan} />
          </div>
        ))}
      </div>
    </div>
  );
}
