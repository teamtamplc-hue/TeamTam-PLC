import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  Target, 
  Zap, 
  Share2, 
  Layers, 
  ShieldCheck, 
  BarChart4, 
  Heart,
  Youtube,
  Instagram,
  Twitter,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

import SimplifiedDemoDashboard from './components/SimplifiedDemoDashboard';
import Pricing from './components/Pricing';
import SparklingMoneyTitle from './components/SparklingMoneyTitle';
import Features from './components/Features';
import ComparisonSection from './components/ComparisonSection';
import Footer from './components/Footer';
import RetroFAQ from './components/RetroFAQ';
import AutoScrollGallery from './components/AutoScrollGallery';
import WaitlistFormPage from './components/WaitlistFormPage';
import DemoDashboard from './components/DemoDashboard';
import AdminConsole from './components/AdminConsole';

const INTEGRATION_LOGOS = [
  { name: "Whop", url: "https://images.seeklogo.com/logo-png/64/2/whop-logo-png_seeklogo-643501.png" },
  { name: "YouTube", url: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" },
  { name: "Stripe", url: "https://cdn.iconscout.com/icon/free/png-256/free-stripe-logo-icon-svg-download-png-498440.png?f=webp" },
  { name: "Twitter", url: "https://pngimg.com/uploads/x_logo/x_logo_PNG14.png" },
  { name: "Instagram", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1280px-Instagram_icon.png" },
  { name: "Skool", url: "https://images.seeklogo.com/logo-png/42/2/skool-logo-png_seeklogo-425793.png" },
  { name: "Telegram", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/3840px-Telegram_logo.svg.png" },
  { name: "Cloudflare", url: "https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png" },
  { name: "Calendly", url: "https://emailoctopus.com/api/media/file/Calendly%20logo.png" },
  { name: "Close CRM", url: "https://images.seeklogo.com/logo-png/27/2/close-logo-png_seeklogo-272970.png" },
  { name: "iClosed", url: "https://s3-eu-west-1.amazonaws.com/tpd/logos/670d0c9fc53c6130a02f87b6/0x0.png" },
  { name: "Hubspot", url: "https://cdn-icons-png.flaticon.com/512/5968/5968872.png" },
  { name: "WebinarJam", url: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_9ce978513598d21849c7e317abb5611b/webinarjam.png" },
  { name: "GoHighLevel", url: "https://ghl.software/wp-content/uploads/2023/10/Diseno-sin-titulo-2023-10-09T000432.406.png" },
  { name: "Teachable", url: "https://media.bebee.com/logos/teachable/br-f2d67ddff2658167.png" },
  { name: "ClickFunnel", url: "https://images.seeklogo.com/logo-png/47/2/clickfunnels-logo-png_seeklogo-470213.png" },
  { name: "Framer", url: "https://static.vecteezy.com/system/resources/previews/067/565/486/non_2x/framer-logo-rounded-free-png.png" },
  { name: "Kit", url: "https://media.kit.com/images/logos/kit-logo-soft-black.svg" },
  { name: "Tally", url: "https://cdn.prod.website-files.com/63405aed0eef878ae97819c8/655f72e0319f2b98b1a425f1_WUfZW2qkdb4PGJfV5Jq_SebWKq1f86bljc0Ql87dAvg.webp" },
  { name: "Typeform", url: "https://file.formbuilder.tools/1764005985009-924405056.png" }
];

export default function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<'landing' | 'waitlist' | 'demo-dashboard' | 'admin'>('landing');
  const [selectedTier, setSelectedTier] = useState<'pro' | 'max' | 'agency' | null>(null);

  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname;
      if (path === '/demo-dashboard' || window.location.hash === '#/demo-dashboard') {
        setCurrentPage('demo-dashboard');
      } else if (path === '/waitlist' || window.location.hash === '#/waitlist') {
        setCurrentPage('waitlist');
      } else if (path === '/admin' || window.location.hash === '#/admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('landing');
      }
    };

    handleUrlRouting();
    window.addEventListener('popstate', handleUrlRouting);
    window.addEventListener('hashchange', handleUrlRouting);

    return () => {
      window.removeEventListener('popstate', handleUrlRouting);
      window.removeEventListener('hashchange', handleUrlRouting);
    };
  }, []);

  const navigateTo = (page: 'landing' | 'waitlist' | 'demo-dashboard' | 'admin') => {
    setCurrentPage(page);
    const newPath = page === 'landing' ? '/' : `/${page}`;
    window.history.pushState(null, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const video = videoElement;
    if (!video) return;

    let animationFrameId: number;

    // Explicitly play video to handle landing page remounting
    video.play().catch(err => console.log("Video initial play exception:", err));

    const tick = () => {
      if (video) {
        const time = video.currentTime;
        const duration = video.duration;
        let opacity = 1;

        if (duration && !isNaN(duration)) {
          // Fade in over 0.5s at the start
          if (time < 0.5) {
            opacity = time / 0.5;
          } 
          // Fade out over 0.5s before it ends
          else if (time > duration - 0.5) {
            opacity = Math.max(0, (duration - time) / 0.5);
          }
        } else {
          if (time < 0.5) {
            opacity = time / 0.5;
          }
        }

        video.style.opacity = opacity.toString();
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // Custom ended logic to loop seamlessly with standard wait state
    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(err => console.log("Video loops playback exception:", err));
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [videoElement]);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowEmailInput(false);
      }, 7000);
    }
  };

  const faqs = [
    {
      q: "1. Do I need to be a developer or technical person to use Track 1on1?",
      a: "Not at all. You connect your accounts in one click and Track 1on1 deploys everything automatically. No code, no setup, no developer needed. If you can log into Instagram, you can use Track 1on1.",
      color: {
        bg: "bg-amber-50/40 hover:bg-amber-50/70 border-amber-200/90",
        badge: "bg-amber-100 text-amber-800",
        contentBg: "bg-amber-50/20 border-t border-amber-100/50",
        bullet: "bg-amber-500"
      }
    },
    {
      q: "2. How does Track 1on1 know which post made the sale?",
      a: "The moment you connect your accounts, we attach a Smart Link to every post across every platform. When someone clicks, we follow that exact visitor — through your page, through your video, through your checkout — and tie the final purchase back to the post that started their journey.",
      color: {
        bg: "bg-emerald-50/40 hover:bg-emerald-50/70 border-emerald-200/90",
        badge: "bg-emerald-100 text-emerald-800",
        contentBg: "bg-emerald-50/20 border-t border-emerald-100/50",
        bullet: "bg-emerald-500"
      }
    },
    {
      q: "3. Will this slow down my website or sales page?",
      a: "No. Track 1on1 runs silently in the background. Your page loads exactly the same speed. Your visitors never know it's there.",
      color: {
        bg: "bg-sky-50/40 hover:bg-sky-50/70 border-sky-200/90",
        badge: "bg-sky-100 text-sky-800",
        contentBg: "bg-sky-50/20 border-t border-sky-100/50",
        bullet: "bg-sky-500"
      }
    },
    {
      q: "4. What platforms does Track 1on1 support?",
      a: "Currently YouTube, Instagram, and Twitter (X). With full integrations for course platforms like Kajabi, Teachable, ThriveCart, Gumroad, and Stan Store — plus email tools like ConvertKit and ActiveCampaign.",
      color: {
        bg: "bg-indigo-50/40 hover:bg-indigo-50/70 border-indigo-200/90",
        badge: "bg-indigo-100 text-indigo-800",
        contentBg: "bg-indigo-50/20 border-t border-indigo-100/50",
        bullet: "bg-indigo-500"
      }
    },
    {
      q: "5. How does the 11x guarantee actually work?",
      a: "Simple. If at the end of your first month you can't see at least 11 times your subscription amount in attributed revenue inside your Track 1on1 dashboard — you pay nothing. No forms, no arguments, no fine print.",
      color: {
        bg: "bg-rose-50/40 hover:bg-rose-50/70 border-rose-200/90",
        badge: "bg-rose-100 text-rose-800",
        contentBg: "bg-rose-50/20 border-t border-rose-100/50",
        bullet: "bg-rose-500"
      }
    },
    {
      q: "6. What exactly does the Auto DM feature do?",
      a: "When someone comments on your reel, replies to your tweet, or uses a keyword you set — Track 1on1 automatically sends them a DM with your link or message instantly. You set it once, it runs 24/7 while you sleep.",
      color: {
        bg: "bg-purple-50/40 hover:bg-purple-50/70 border-purple-200/90",
        badge: "bg-purple-100 text-purple-800",
        contentBg: "bg-purple-50/20 border-t border-purple-100/50",
        bullet: "bg-purple-500"
      }
    },
    {
      q: "7. Is my data and my audience's data safe?",
      a: "Yes. Track 1on1 uses enterprise-grade encryption and never sells, shares, or exposes your audience data to any third party. Everything tracked stays inside your dashboard and belongs to you.",
      color: {
        bg: "bg-teal-50/40 hover:bg-teal-50/70 border-teal-200/90",
        badge: "bg-teal-100 text-teal-800",
        contentBg: "bg-teal-50/20 border-t border-teal-100/50",
        bullet: "bg-teal-500"
      }
    },
    {
      q: "8. What's the difference between Track 1on1 and just using UTM links?",
      a: "UTM links tell you someone clicked. Track 1on1 tells you who clicked, which video minute made them click, how long they stayed on your page, how much of your VSL they watched, whether they hovered the buy button, and exactly how much money that one post made you. UTMs show you the door. Track 1on1 shows you everything that happened inside.",
      color: {
        bg: "bg-orange-50/40 hover:bg-orange-50/70 border-orange-200/90",
        badge: "bg-orange-100 text-orange-800",
        contentBg: "bg-orange-50/20 border-t border-orange-100/50",
        bullet: "bg-orange-550"
      }
    },
    {
      q: "9. Can I track competitors even if I don't follow them?",
      a: "Yes. Just type in any YouTube channel name, Instagram handle, or Twitter account. Track 1on1 scans their top performing content publicly and generates outlines for you — no following, no connection needed.",
      color: {
        bg: "bg-fuchsia-50/40 hover:bg-fuchsia-50/70 border-fuchsia-200/90",
        badge: "bg-fuchsia-100 text-fuchsia-800",
        contentBg: "bg-fuchsia-50/20 border-t border-fuchsia-100/50",
        bullet: "bg-fuchsia-500"
      }
    },
    {
      q: "10. How quickly can I get set up and see my first data?",
      a: "Most creators see their first tracked clicks within minutes of connecting. Full revenue attribution data — meaning a complete sale traced back to a specific post — typically shows up within the first 24 to 48 hours depending on your traffic volume.",
      color: {
        bg: "bg-cyan-50/40 hover:bg-cyan-50/70 border-cyan-200/90",
        badge: "bg-cyan-100 text-cyan-800",
        contentBg: "bg-cyan-50/20 border-t border-cyan-100/50",
        bullet: "bg-cyan-500"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8] text-zinc-900 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden antialiased">
      <AnimatePresence mode="wait">
        {currentPage === 'demo-dashboard' ? (
          <DemoDashboard 
            key="demo-dashboard"
            onBackToLanding={() => navigateTo('landing')}
          />
        ) : currentPage === 'waitlist' ? (
          <WaitlistFormPage 
            key="waitlist-page" 
            selectedTier={selectedTier} 
            onBack={() => navigateTo('landing')}
            onSeeDemoDashboard={() => navigateTo('demo-dashboard')}
          />
        ) : currentPage === 'admin' ? (
          <AdminConsole 
            key="admin-page"
            onBack={() => navigateTo('landing')}
          />
        ) : (
          <motion.div
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {/* Hero Header Section with full bleed video background */}
            <main className="w-full">
        {/* Full bleed Hero Section wrapper */}
        <div className="w-full relative overflow-hidden bg-white">
          {/* Fullscreen looping video background starting from the top */}
          <video
            ref={setVideoElement}
            autoPlay
            muted
            playsInline
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
            className="absolute w-full object-cover pointer-events-none z-0 animate-pulse-slow"
            style={{ 
              top: '0px', 
              inset: '0px', 
              height: '100%',
              opacity: 0
            }}
          />
          {/* Gradient overlay on top of video starting from top */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white pointer-events-none z-0"
            style={{ 
              top: '0px', 
              inset: '0px', 
              height: '100%' 
            }}
          />

          {/* Transparent Navigation Header placed inside full bleed hero container */}
          <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-white/10 bg-transparent relative z-10">
            <a href="#" className="flex items-center gap-1">
              <span className="text-amber-700 font-serif italic font-semibold text-lg md:text-2xl tracking-tight select-none mr-1">
                Track
              </span>
              <img 
                src="https://i.postimg.cc/fkQJM3ns/track1on1-logo-pngfdfdf.png" 
                alt="Track 1on1 Logo" 
                className="h-8 md:h-10 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Hidden on mobile, visible on desktop */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
              <a href="#chalkboard-showcase-snip" className="hover:text-amber-700 transition-colors">How does it work?</a>
              <a href="#features" className="hover:text-amber-700 transition-colors">Features</a>
              <a href="#pricing-section" className="hover:text-amber-700 transition-colors">Pricing</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('waitlist')}
                className="px-5 py-2.5 rounded-lg bg-[#78350f] hover:bg-[#5c2509] text-white font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Join Waitlist
              </button>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-16 relative z-10">
        
        {/* Main Title Headings */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight text-zinc-900 leading-[1.05]">
            See Exactly Which Posts Are <SparklingMoneyTitle />
          </h1>

          {/* Slogan */}
          <p className="text-base sm:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed pt-2">
            Track 1on1 connects every sale back to the content that caused it - across YouTube, Instagram, and Twitter.
          </p>
        </div>

        {/* Interactive sticky yellow paper note waitlist button & floating content mockups */}
        <div className="max-w-6xl mx-auto mt-2 relative px-4 md:px-8" id="join-beta-anchor">
          
          {/* Handdrawn Chalk Connection lines with glowing neon laser paths */}
          <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1100 450" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Neon glow filters */}
                <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-indigo" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Glowing arrow marker for orange paths */}
                <marker 
                  id="arrow-orange" 
                  viewBox="0 0 10 10" 
                  refX="6" 
                  refY="5" 
                  markerWidth="6" 
                  markerHeight="6" 
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
                </marker>
                
                {/* Glowing arrow marker for indigo paths */}
                <marker 
                  id="arrow-indigo" 
                  viewBox="0 0 10 10" 
                  refX="6" 
                  refY="5" 
                  markerWidth="6" 
                  markerHeight="6" 
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366f1" />
                </marker>

                {/* Glowing arrow marker for rose paths */}
                <marker 
                  id="arrow-rose" 
                  viewBox="0 0 10 10" 
                  refX="6" 
                  refY="5" 
                  markerWidth="6" 
                  markerHeight="6" 
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
                </marker>

                {/* Glowing arrow marker for emerald paths */}
                <marker 
                  id="arrow-emerald" 
                  viewBox="0 0 10 10" 
                  refX="6" 
                  refY="5" 
                  markerWidth="6" 
                  markerHeight="6" 
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                </marker>
              </defs>

              {/* === LEFT TO MID PATHS (Social Posts -> Waitlist) === */}

              {/* Curve 1: Instagram Post to Waitlist (Amber) */}
              {/* Base Glowing Core */}
              <motion.path 
                d="M 120,70 Q 280,45 430,155" 
                stroke="#f59e0b" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-45"
                filter="url(#glow-orange)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              {/* Animated Light Pulse */}
              <motion.path 
                d="M 120,70 Q 280,45 430,155" 
                stroke="#ffffff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeDasharray="15 60"
                markerEnd="url(#arrow-orange)"
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: [0, -75] }}
                transition={{ 
                  pathLength: { duration: 1.5, ease: "easeOut" },
                  strokeDashoffset: { repeat: Infinity, duration: 2.2, ease: "linear" }
                }}
              />

              {/* Curve 2: Twitter to Waitlist (Indigo) */}
              {/* Base Glowing Core */}
              <motion.path 
                d="M 130,195 Q 280,180 430,210" 
                stroke="#6366f1" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-50"
                filter="url(#glow-indigo)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.15 }}
              />
              {/* Animated Light Pulse */}
              <motion.path 
                d="M 130,195 Q 280,180 430,210" 
                stroke="#e0e7ff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeDasharray="15 65"
                markerEnd="url(#arrow-indigo)"
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: [0, -80] }}
                transition={{ 
                  pathLength: { duration: 1.5, ease: "easeOut", delay: 0.15 },
                  strokeDashoffset: { repeat: Infinity, duration: 2.4, ease: "linear", delay: 0.15 }
                }}
              />

              {/* Curve 3: YouTube to Waitlist (Rose) */}
              {/* Base Glowing Core */}
              <motion.path 
                d="M 120,315 Q 280,290 430,255" 
                stroke="#f43f5e" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-45"
                filter="url(#glow-rose)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
              {/* Animated Light Pulse */}
              <motion.path 
                d="M 120,315 Q 280,290 430,255" 
                stroke="#ffe4e6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeDasharray="15 60"
                markerEnd="url(#arrow-rose)"
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: [0, -75] }}
                transition={{ 
                  pathLength: { duration: 1.5, ease: "easeOut", delay: 0.3 },
                  strokeDashoffset: { repeat: Infinity, duration: 2.0, ease: "linear", delay: 0.3 }
                }}
              />


              {/* === MID TO RIGHT PATHS (Waitlist -> Metrics) === */}

              {/* Curve 4: Waitlist to Clicks Total (Emerald) */}
              {/* Base Glowing Core */}
              <motion.path 
                d="M 665,160 Q 770,110 885,110" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-55"
                filter="url(#glow-emerald)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.45 }}
              />
              {/* Animated Light Pulse */}
              <motion.path 
                d="M 665,160 Q 770,110 885,110" 
                stroke="#ffffff" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeDasharray="20 70"
                markerEnd="url(#arrow-emerald)"
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: [0, -90] }}
                transition={{ 
                  pathLength: { duration: 1.5, ease: "easeOut", delay: 0.45 },
                  strokeDashoffset: { repeat: Infinity, duration: 1.9, ease: "linear", delay: 0.45 }
                }}
              />

              {/* Curve 5: Waitlist to Booked Call (Emerald) */}
              {/* Base Glowing Core */}
              <motion.path 
                d="M 665,200 Q 755,185 805,180" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-60"
                filter="url(#glow-emerald)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.55 }}
              />
              {/* Animated Light Pulse */}
              <motion.path 
                d="M 665,200 Q 755,185 805,180" 
                stroke="#d1fae5" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeDasharray="18 60"
                markerEnd="url(#arrow-emerald)"
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: [0, -78] }}
                transition={{ 
                  pathLength: { duration: 1.5, ease: "easeOut", delay: 0.55 },
                  strokeDashoffset: { repeat: Infinity, duration: 1.7, ease: "linear", delay: 0.55 }
                }}
              />

              {/* Curve 6: Waitlist to Cash Collected (Emerald) */}
              {/* Base Glowing Core */}
              <motion.path 
                d="M 665,230 Q 765,245 855,250" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-60"
                filter="url(#glow-emerald)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.65 }}
              />
              {/* Animated Light Pulse */}
              <motion.path 
                d="M 665,230 Q 765,245 855,250" 
                stroke="#ffffff" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeDasharray="22 75"
                markerEnd="url(#arrow-emerald)"
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: [0, -97] }}
                transition={{ 
                  pathLength: { duration: 1.5, ease: "easeOut", delay: 0.65 },
                  strokeDashoffset: { repeat: Infinity, duration: 1.8, ease: "linear", delay: 0.65 }
                }}
              />

              {/* Curve 7: Waitlist to Forms (Emerald) */}
              {/* Base Glowing Core */}
              <motion.path 
                d="M 665,270 Q 755,310 825,320" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-55"
                filter="url(#glow-emerald)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.75 }}
              />
              {/* Animated Light Pulse */}
              <motion.path 
                d="M 665,270 Q 755,310 825,320" 
                stroke="#d1fae5" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeDasharray="20 70"
                markerEnd="url(#arrow-emerald)"
                initial={{ pathLength: 0, strokeDashoffset: 0 }}
                animate={{ pathLength: 1, strokeDashoffset: [0, -90] }}
                transition={{ 
                  pathLength: { duration: 1.5, ease: "easeOut", delay: 0.75 },
                  strokeDashoffset: { repeat: Infinity, duration: 2.1, ease: "linear", delay: 0.75 }
                }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
            
            {/* Left Column: 3 Rotated social posts */}
            <div className="lg:col-span-4 flex flex-col gap-0 items-center lg:items-start relative min-h-[360px] max-w-sm lg:max-w-full mx-auto w-full py-2 pr-4 lg:-ml-12 xl:-ml-16">
              {/* Subtle background anchor blur */}
              <div className="absolute w-44 h-44 bg-amber-100/10 rounded-full blur-2xl -z-1" />

              {/* 1. Instagram post (top, rotated slightly left) */}
              <motion.div 
                className="w-full max-w-[200px] sm:max-w-[220px] select-none cursor-grab active:cursor-grabbing"
                style={{ rotate: -7 }}
                animate={{ y: [0, -12, 0] }}
                whileHover={{ rotate: -2, scale: 1.05, zIndex: 30 }}
                transition={{
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <img 
                  src="https://i.postimg.cc/brc8N8bJ/igpost.png" 
                  alt="Track Instagram Post"
                  className="w-full h-auto drop-shadow-md hover:drop-shadow-xl transition-all object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* 2. Twitter post (middle, rotated slightly right) */}
              <motion.div 
                className="w-full max-w-[210px] sm:max-w-[230px] lg:ml-8 -mt-16 sm:-mt-20 select-none cursor-grab active:cursor-grabbing"
                style={{ rotate: 5 }}
                animate={{ y: [0, 10, 0] }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                transition={{
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  },
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <img 
                  src="https://i.postimg.cc/prbxXx8P/tweer.png" 
                  alt="Track Twitter Post"
                  className="w-full h-auto drop-shadow-lg hover:drop-shadow-xl transition-all object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* 3. YouTube post (bottom, rotated slightly left) */}
              <motion.div 
                className="w-full max-w-[200px] sm:max-w-[220px] lg:ml-2 -mt-16 sm:-mt-20 select-none cursor-grab active:cursor-grabbing"
                style={{ rotate: -4 }}
                animate={{ y: [0, -8, 0] }}
                whileHover={{ rotate: 1, scale: 1.05, zIndex: 30 }}
                transition={{
                  y: {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  },
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <img 
                  src="https://i.postimg.cc/SRFqNq8K/youtube.png" 
                  alt="Track YouTube Video"
                  className="w-full h-auto drop-shadow-md hover:drop-shadow-xl transition-all object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Center Column: Waitlist Paper Note Button */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div 
                onClick={() => setCurrentPage('waitlist')}
                className="relative w-[280px] h-[280px] select-none transition-all duration-300 md:w-[310px] md:h-[310px] hover:scale-105 active:scale-95 cursor-pointer hover:rotate-2 block text-inherit decoration-none"
              >
                {/* The paper background */}
                <img 
                  src="https://i.postimg.cc/ZRgpmbLP/tttttttt.png"
                  alt="Join Waitlist Custom Note Paper"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Content overlaid on top of the paper */}
                <div className="absolute inset-x-8 top-14 bottom-12 flex flex-col justify-between items-center text-center px-4 py-2">
                  
                  {/* Paper Title / Logo Stamp */}
                  <div className="mt-3 space-y-0.5">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-amber-950/40 block">
                      Track 1on1
                    </span>
                    <span className="font-serif italic font-semibold text-[11px] text-amber-950/60 block">
                      ~ Private Invitation ~
                    </span>
                  </div>

                  {/* Click to Navigate Content */}
                  <div className="flex-1 w-full flex flex-col justify-center items-center py-2">
                    <div className="flex flex-col items-center justify-center space-y-1 group">
                      <span 
                        className="font-bold text-2xl sm:text-3xl text-zinc-900 group-hover:text-amber-900 transition-colors tracking-tight select-none rotate-[-2deg]"
                        style={{ fontFamily: '"Architects Daughter", cursive' }}
                      >
                        Join waitlist
                      </span>
                      <span className="text-[9px] font-mono text-amber-900/50 uppercase tracking-widest animate-pulse font-bold">
                        👆 Click to Enter
                      </span>
                    </div>
                  </div>

                  {/* Decorative scribble lines */}
                  <div className="w-full border-t border-dashed border-amber-900/10 pt-1">
                    <span className="text-[8px] font-mono text-amber-900/40 uppercase tracking-widest font-bold">
                      ★ No Credit Card Required ★
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: 4 Rotated metrics posts/charts */}
            <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-5 items-center lg:items-end relative min-h-[360px] max-w-sm lg:max-w-full mx-auto w-full py-2 pl-4 lg:-mr-12 xl:-mr-16">
              {/* Subtle background anchor blur */}
              <div className="absolute w-44 h-44 bg-emerald-100/10 rounded-full blur-2xl -z-1" />

              {/* 1. Clicks Total (top, rotated slightly right) */}
              <motion.div 
                className="w-full max-w-[200px] sm:max-w-[220px] select-none cursor-grab active:cursor-grabbing z-10"
                style={{ rotate: 4 }}
                animate={{ y: [0, -9, 0] }}
                whileHover={{ rotate: 1, scale: 1.05, zIndex: 30 }}
                transition={{
                  y: {
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <img 
                  src="https://i.postimg.cc/RFPZTqW3/link-clicks.png" 
                  alt="Track Clicks Total"
                  className="w-full h-auto drop-shadow-md hover:drop-shadow-xl transition-all object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* 2. Booked Call (middle upper, rotated slightly left) */}
              <motion.div 
                className="w-full max-w-[200px] sm:max-w-[220px] lg:mr-8 select-none cursor-grab active:cursor-grabbing z-15"
                style={{ rotate: -5 }}
                animate={{ y: [0, 11, 0] }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                transition={{
                  y: {
                    duration: 5.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  },
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <img 
                  src="https://i.postimg.cc/25m3xsSX/bookedcall.png" 
                  alt="Track Booked Call"
                  className="w-full h-auto drop-shadow-lg hover:drop-shadow-xl transition-all object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* 3. Cash Collected (middle lower, rotated slightly right) */}
              <motion.div 
                className="w-full max-w-[200px] sm:max-w-[220px] lg:mr-2 select-none cursor-grab active:cursor-grabbing z-20"
                style={{ rotate: 3 }}
                animate={{ y: [0, -10, 0] }}
                whileHover={{ rotate: -1, scale: 1.05, zIndex: 30 }}
                transition={{
                  y: {
                    duration: 6.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6
                  },
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <img 
                  src="https://i.postimg.cc/rmhw9zD0/cashstripe.png" 
                  alt="Track Cash Collected"
                  className="w-full h-auto drop-shadow-md hover:drop-shadow-xl transition-all object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* 4. Forms (bottom, rotated slightly left) */}
              <motion.div 
                className="w-full max-w-[200px] sm:max-w-[220px] lg:mr-6 select-none cursor-grab active:cursor-grabbing z-25"
                style={{ rotate: -4 }}
                animate={{ y: [0, 8, 0] }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                transition={{
                  y: {
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.9
                  },
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                <img 
                  src="https://i.postimg.cc/fbZkvGR2/forms.png" 
                  alt="Track Forms Submitted"
                  className="w-full h-auto drop-shadow-md hover:drop-shadow-xl transition-all object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

          </div>

        </div>

        {/* Social Network Platforms badge rail */}
        <div className="mt-6 text-center w-full max-w-6xl mx-auto px-4 md:px-8">
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3">
            Integrations
          </p>
          <div className="relative w-full overflow-hidden py-3 px-4 bg-white/40 border border-zinc-200/50 rounded-xl backdrop-blur-xs">
            {/* Soft horizontal gradient fades */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#fafaf8] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#fafaf8] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex gap-8 items-center">
              {/* Set 1 */}
              <div className="flex gap-8 items-center shrink-0">
                {INTEGRATION_LOGOS.map((item, idx) => (
                  <div key={`set1-${idx}`} className="flex items-center gap-2 px-1 shrink-0">
                    <img 
                      src={item.url} 
                      alt={`${item.name} Logo`} 
                      className="h-6 sm:h-7 object-contain opacity-75 hover:opacity-100 transition-opacity max-w-[100px]" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-mono text-zinc-400 font-semibold">{item.name}</span>
                  </div>
                ))}
              </div>
              {/* Set 2 */}
              <div className="flex gap-8 items-center shrink-0">
                {INTEGRATION_LOGOS.map((item, idx) => (
                  <div key={`set2-${idx}`} className="flex items-center gap-2 px-1 shrink-0">
                    <img 
                      src={item.url} 
                      alt={`${item.name} Logo clone`} 
                      className="h-6 sm:h-7 object-contain opacity-75 hover:opacity-100 transition-opacity max-w-[100px]" 
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-mono text-zinc-400 font-semibold">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Don't See Your Tool Request Box */}
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm font-bold text-zinc-800 tracking-tight">
              Don't See Your Tool?
            </p>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
              Request an integration <span className="text-amber-700 font-medium">→</span> <a href="#join-beta-anchor" className="underline hover:text-amber-900 font-semibold text-amber-800 transition-colors">Tell us which tool you use</a> and we'll prioritize it in our next release.
            </p>
          </div>
        </div>

        {/* Closing full bleed Hero Section wrapper and centered container */}
        </div>
        </div>

        {/* Solid white Chalkboard section with auto-scrolling galleries on both sides and pure white background */}
        <section className="w-full bg-white pt-16 pb-6 sm:pt-24 sm:pb-8 border-y border-zinc-200/80 relative overflow-hidden" id="chalkboard-showcase-snip">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-center">
              
              {/* Left Column: Vertical Scrolling Image Gallery (Single column scrolling up) */}
              <div className="lg:col-span-2 relative h-[820px] overflow-hidden rounded-2xl bg-white border border-zinc-200/90 shadow-xs hidden lg:block">
                <AutoScrollGallery side="left" />
              </div>

              {/* Center Column: Simplified Demo Dashboard Sandbox Area */}
              <div className="lg:col-span-8 flex flex-col items-center justify-center">
                <div className="text-center max-w-2xl mx-auto mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-850 bg-amber-50 rounded-full border border-amber-200/60">
                    INTERACTIVE LIVE PREVIEW
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-4 tracking-tight leading-relaxed">
                    <img 
                      src="https://i.postimg.cc/C1p90Dmr/arrow.png" 
                      alt="Arrow Indicator" 
                      className="inline-block h-10 sm:h-14 md:h-16 w-auto mr-3 translate-y-2 md:translate-y-2.5 align-middle object-contain"
                      referrerPolicy="no-referrer"
                    />
                    Test the Live Tracking <span className="relative inline-block z-1 text-amber-700 font-serif italic font-medium px-2">Pipeline<span className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 h-3 bg-amber-100/95 -rotate-1 -z-1 rounded-sm"></span></span>
                  </h2>
                  <p className="text-sm text-zinc-500 mt-3 font-semibold max-w-md mx-auto leading-relaxed">
                    Interact directly with the simplified dashboard preview below
                  </p>
                </div>
                <SimplifiedDemoDashboard />
              </div>

              {/* Right Column: Vertical Scrolling Image Gallery (Single column scrolling down) */}
              <div className="lg:col-span-2 relative h-[820px] overflow-hidden rounded-2xl bg-white border border-zinc-200/90 shadow-xs hidden lg:block">
                <AutoScrollGallery side="right" />
              </div>

            </div>
          </div>
        </section>

        {/* Regular page sections with unified grid alignment */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative" id="main-scroll-bridge-container">

        {/* Premium Features Section */}
        <Features />

        {/* Interactive Comparison Section */}
        <ComparisonSection />

        {/* Pricing Papers Section */}
        <section className="py-12 border-t border-zinc-200/60" id="pricing-papers-section">
          <Pricing onSelectPlan={(tierId) => {
            setSelectedTier(tierId);
            setCurrentPage('waitlist');
          }} />
        </section>

        {/* RETRO WINDOWS 98 FAQ SECTION */}
        <RetroFAQ />



        </div>
      </main>

      {/* FOOTER */}
      <Footer onJoinWaitlist={() => setCurrentPage('waitlist')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
