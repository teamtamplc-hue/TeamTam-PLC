import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Youtube, 
  Instagram, 
  Twitter, 
  TrendingUp, 
  DollarSign, 
  Users, 
  MousePointerClick, 
  Play, 
  Activity, 
  Send, 
  ArrowUpRight, 
  Sparkles, 
  Target, 
  Layers, 
  CheckCircle,
  Smartphone,
  Globe,
  Bell,
  Calendar,
  CheckCircle2,
  Lock,
  MessageSquare,
  ChevronRight,
  Eye,
  Settings
} from 'lucide-react';

import InstagramConsole from './InstagramConsole';
import XConsole from './XConsole';

// Detailed multi-channel datasets replicating DemoDashboard
const platformStats = {
  Overview: {
    '7d': { clicks: '320,150', forms: '95,400', calls: '14,200', sales: '$1,020,400', conversion: '29.8%' },
    '28d': { clicks: '1,482,093', forms: '395,204', calls: '65,495', sales: '$4,850,230', conversion: '26.6%' },
    '90d': { clicks: '4,102,900', forms: '1,120,440', calls: '190,450', sales: '$14,230,400', conversion: '27.3%' },
    '6m': { clicks: '8,320,100', forms: '2,150,000', calls: '380,120', sales: '$28,450,900', conversion: '25.8%' },
    '1y': { clicks: '16,420,500', forms: '4,923,100', calls: '742,000', sales: '$54,120,800', conversion: '29.9%' },
    'lifetime': { clicks: '35,210,400', forms: '10,410,200', calls: '1,684,500', sales: '$112,480,900', conversion: '29.5%' }
  },
  YouTube: {
    '7d': { clicks: '140,500', forms: '40,250', calls: '6,105', sales: '$1,120,400', conversion: '28.6%' },
    '28d': { clicks: '642,300', forms: '185,120', calls: '29,450', sales: '$2,150,000', conversion: '28.8%' },
    '90d': { clicks: '1,920,400', forms: '512,180', calls: '82,100', sales: '$6,800,000', conversion: '26.6%' },
    '6m': { clicks: '3,840,100', forms: '1,020,400', calls: '154,200', sales: '$12,940,000', conversion: '26.5%' },
    '1y': { clicks: '7,680,200', forms: '2,120,000', calls: '310,400', sales: '$25,600,000', conversion: '27.6%' },
    'lifetime': { clicks: '18,400,000', forms: '5,100,000', calls: '780,200', sales: '$64,200,000', conversion: '27.7%' }
  },
  Instagram: {
    '7d': { clicks: '110,200', forms: '32,150', calls: '5,000', sales: '$1,050,150', conversion: '29.1%' },
    '28d': { clicks: '520,410', forms: '142,500', calls: '24,100', sales: '$1,840,150', conversion: '27.3%' },
    '90d': { clicks: '1,560,900', forms: '412,000', calls: '72,400', sales: '$5,950,000', conversion: '26.3%' },
    '6m': { clicks: '3,120,500', forms: '820,150', calls: '144,300', sales: '$11,840,000', conversion: '26.2%' },
    '1y': { clicks: '6,240,000', forms: '1,640,000', calls: '288,050', sales: '$23,680,050', conversion: '26.2%' },
    'lifetime': { clicks: '14,800,000', forms: '4,000,000', calls: '690,000', sales: '$58,400,000', conversion: '27.0%' }
  },
  X: {
    '7d': { clicks: '50,450', forms: '15,200', calls: '2,100', sales: '$1,012,300', conversion: '30.1%' },
    '28d': { clicks: '219,300', forms: '42,150', calls: '9,450', sales: '$1,255,420', conversion: '19.2%' },
    '90d': { clicks: '657,000', forms: '125,000', calls: '28,100', sales: '$3,415,000', conversion: '19.0%' },
    '6m': { clicks: '1,314,000', forms: '250,105', calls: '56,050', sales: '$6,800,000', conversion: '19.0%' },
    '1y': { clicks: '2,628,000', forms: '500,000', calls: '112,000', sales: '$13,600,000', conversion: '19.0%' },
    'lifetime': { clicks: '6,500,000', forms: '1,200,000', calls: '280,000', sales: '$34,000,000', conversion: '18.4%' }
  },
  Reddit: {
    '7d': { clicks: '20,000', forms: '7,400', calls: '1,000', sales: '$1,002,400', conversion: '37.0%' },
    '28d': { clicks: '100,083', forms: '25,434', calls: '5,495', sales: '$1,084,260', conversion: '25.4%' },
    '90d': { clicks: '300,000', forms: '76,200', calls: '16,400', sales: '$2,250,000', conversion: '25.4%' },
    '6m': { clicks: '600,000', forms: '152,000', calls: '32,800', sales: '$4,500,000', conversion: '25.3%' },
    '1y': { clicks: '1,200,000', forms: '304,000', calls: '65,600', sales: '$9,000,000', conversion: '25.3%' },
    'lifetime': { clicks: '3,000,000', forms: '760,000', calls: '164,050', sales: '$22,500,000', conversion: '25.3%' }
  }
};

const dateRangeLabels = {
  '7d': 'Last 7 Days',
  '28d': 'Last 28 Days',
  '90d': 'Last 90 Days',
  '6m': '6 Months',
  '1y': '1 Year',
  'lifetime': 'Lifetime'
};

const pinnedPurchases = [
  { 
    id: 'p1', 
    name: 'Cinon (Verified Client)', 
    country: 'United States', 
    flag: '🇺🇸', 
    x: '20%', 
    y: '22%', 
    amount: '$5,400', 
    time: 'Just now', 
    item: 'Instagram Lead Funnel',
    pinIconUrl: 'https://i.postimg.cc/nLbD6Jns/360-F-509029931-t5X7s-UHQOWghg-Pch-Kc-CW9Avae-O9UUhulega-removebg-preview.png'
  },
  { 
    id: 'p2', 
    name: 'Liam D.', 
    country: 'United Kingdom', 
    flag: '🇬🇧', 
    x: '41%', 
    y: '16%', 
    amount: '$3,200', 
    time: '4m ago', 
    item: 'YouTube VSL Conversions',
    pinIconUrl: 'https://i.postimg.cc/PqswBjdx/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avae-O9UUhulega-removebg-prevjjjjiew.png'
  },
  { 
    id: 'p3', 
    name: 'Clara W.', 
    country: 'Germany', 
    flag: '🇩🇪', 
    x: '48%', 
    y: '20%', 
    amount: '$7,500', 
    time: '12m ago', 
    item: 'Reddit Warm Pipeline',
    pinIconUrl: 'https://i.postimg.cc/LsK1rpms/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avae-O9UUhulega-removebg-prnnmmmeview.png'
  },
  { 
    id: 'p4', 
    name: 'Hiroshi S.', 
    country: 'Japan', 
    flag: '🇯🇵', 
    x: '76%', 
    y: '32%', 
    amount: '$12,800', 
    time: '28m ago', 
    item: 'X Pipeline Accelerator',
    pinIconUrl: 'https://i.postimg.cc/HLDyfgTn/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avaennnnnn-O9UUhulega-removebg-preview.png'
  },
  { 
    id: 'p5', 
    name: 'Chloe L.', 
    country: 'Australia', 
    flag: '🇦🇺', 
    x: '82%', 
    y: '68%', 
    amount: '$6,200', 
    time: '1h ago', 
    item: 'YouTube Organic Funnel',
    pinIconUrl: 'https://i.postimg.cc/jj07GbRq/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9dddgg-Avae-O9UUhulega-removebg-preview.png'
  },
  { 
    id: 'p6', 
    name: 'Carlos S.', 
    country: 'Brazil', 
    flag: '🇧🇷', 
    x: '32%', 
    y: '58%', 
    amount: '$4,105', 
    time: '2h ago', 
    item: 'Instagram Broadcast Hook',
    pinIconUrl: 'https://i.postimg.cc/N0qHWcQL/ghghghghghghghghg.png'
  }
];

const dailyThumbnails = [
  {
    title: "10x YouTube Hook Blueprint",
    views: "54.2K views",
    clicks: "+1,240 clicks",
    img: "https://i.postimg.cc/pdDTw5dz/Screenshot-2026-05-30-092601.png"
  },
  {
    title: "SaaS Cold Funnel Mastery",
    views: "31.8K views",
    clicks: "+892 clicks",
    img: "https://i.postimg.cc/CMZ102dd/Screenshot-2026-05-29-222330.png"
  },
  {
    title: "Organic Shorts Hack ($10K/mo)",
    views: "98.5K views",
    clicks: "+2,450 clicks",
    img: "https://i.postimg.cc/ZY9RmQ0Y/Screenshot-2026-05-29-222253.png"
  },
  {
    title: "Why Retention Matters",
    views: "42.0K views",
    clicks: "+915 clicks",
    img: "https://i.postimg.cc/7PC64Rb4/Screenshot-2026-05-29-203644.png"
  },
  {
    title: "Vite+React Quick Pipeline",
    views: "67.1K views",
    clicks: "+1,580 clicks",
    img: "https://i.postimg.cc/pdDTw5dz/Screenshot-2026-05-30-092601.png"
  },
  {
    title: "High-Ticket VSL Setup",
    views: "89.4K views",
    clicks: "+2,110 clicks",
    img: "https://i.postimg.cc/CMZ102dd/Screenshot-2026-05-29-222330.png"
  },
  {
    title: "Instant Video Sales Engine",
    views: "115.0K views",
    clicks: "+3,240 clicks",
    img: "https://i.postimg.cc/ZY9RmQ0Y/Screenshot-2026-05-29-222253.png"
  }
];

const highConvertingPosts = [
  {
    id: 'post-1',
    platform: 'Instagram',
    caption: 'My $3,000/mo raw tech stack outline revealed...',
    clicks: 14250,
    calls: 684,
    sales: '$52,400',
    rate: '4.8%',
    image: 'https://i.postimg.cc/76PwX0H6/Screenshot-2026-05-31-175332.png'
  },
  {
    id: 'post-2',
    platform: 'YouTube',
    caption: 'How I built an AI agents startup under 48 hours',
    clicks: 18920,
    calls: 1020,
    sales: '$112,000',
    rate: '5.3%',
    image: 'https://i.postimg.cc/DZfn5LvW/Screenshot-2026-05-31-180522.png'
  },
  {
    id: 'post-3',
    platform: 'YouTube',
    caption: '10 structural conversion frameworks for creators...',
    clicks: 12440,
    calls: 642,
    sales: '$45,150',
    rate: '5.1%',
    image: 'https://i.postimg.cc/FRFNG3rK/Screenshot-2026-05-31-180503.png'
  },
  {
    id: 'post-4',
    platform: 'YouTube',
    caption: 'Why SaaS tools fail without tracking content pipeline...',
    clicks: 11200,
    calls: 512,
    sales: '$38,400',
    rate: '4.5%',
    image: 'https://i.postimg.cc/HxWd3XYj/Screenshot-2026-05-31-180431.png'
  }
];

const vslRecentActivities = [
  { id: 'vsl-1', user: 'Someone in Austin, TX', event: 'Completed 100% video view', extra: 'Booked Call directly', time: '2m ago' },
  { id: 'vsl-2', user: 'Someone in London, UK', event: 'Clicked CTA button at 5m 12s', extra: 'Forms submitted', time: '12m ago' },
  { id: 'vsl-3', user: 'Someone in Tokyo, JP', event: 'Started watching VSL', extra: 'Referrer: YouTube Timestamp', time: '22m ago' },
  { id: 'vsl-4', user: 'Someone in Munich, DE', event: 'Completed 85% of VSL', extra: 'Checkout initiated', time: '1h ago' }
];

// Graph math mirroring exactly the main workspace logic
const getGraphData = (platform: string, dateRange: string) => {
  let basePoints: number[] = [];
  let shapeName = '';
  let shapeDesc = '';
  
  switch (dateRange) {
    case '7d':
      basePoints = [90, 35, 110, 25, 95, 15, 60];
      shapeName = 'Outlier Jagged Spike';
      shapeDesc = 'Rapid content-driven acquisition spikes';
      break;
    case '90d':
      basePoints = [85, 30, 75, 45, 80, 20, 38];
      shapeName = 'Double-Wave Cyclic Peaks';
      shapeDesc = 'Marketing waves & dynamic purchase cycles';
      break;
    case '6m':
      basePoints = [105, 105, 65, 65, 35, 35, 10];
      shapeName = 'High-Altitude Staircase';
      shapeDesc = 'Viral staircase step jumps';
      break;
    case '1y':
      basePoints = [115, 105, 95, 78, 55, 28, 6];
      shapeName = 'Exponential J-Curve';
      shapeDesc = 'Compounding multi-channel take-off distribution';
      break;
    case 'lifetime':
      basePoints = [45, 25, 38, 20, 32, 15, 8];
      shapeName = 'High-Baseline Parabolic Wave';
      shapeDesc = 'Persistent, mature customer capture ceiling';
      break;
    default: // '28d'
      basePoints = [98, 82, 72, 52, 44, 28, 12];
      shapeName = 'Quadratic S-Curve';
      shapeDesc = 'Steady organic funnel growth trace';
      break;
  }
  
  const valMultiplier = platform === 'YouTube' ? 0.95 : platform === 'Instagram' ? 1.05 : platform === 'X' ? 1.15 : platform === 'Reddit' ? 1.25 : 1;
  const points = basePoints.map((val, idx) => {
    const x = idx * 116.66;
    let y = val * valMultiplier;
    if (y < 4) y = 4;
    y = y * 1.6; // Scale beautifully for 220px vertical workspace
    if (y < 12) y = 12;
    if (y > 210) y = 210;
    return { x, y };
  });

  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cp1x = curr.x + 58.3;
    const cp1y = curr.y;
    const cp2x = next.x - 58.3;
    const cp2y = next.y;
    linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  const fillPath = `${linePath} L 700 220 L 0 220 Z`;

  return { points, linePath, fillPath, shapeName, shapeDesc };
};

export default function SimplifiedDemoDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState<'Overview' | 'YouTube' | 'Instagram' | 'X' | 'Reddit'>('Overview');
  const [selectedDateRange, setSelectedDateRange] = useState<'7d' | '28d' | '90d' | '6m' | '1y' | 'lifetime'>('28d');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sparklineHoverIndex, setSparklineHoverIndex] = useState<number | null>(null);
  const [hoveredBuyer, setHoveredBuyer] = useState<typeof pinnedPurchases[number] | null>(pinnedPurchases[0]);

  // Handle Buyer Map rotation at interval
  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredBuyer(prev => {
        if (!prev) return pinnedPurchases[0];
        const idx = pinnedPurchases.findIndex(item => item.id === prev.id);
        const nextIdx = (idx + 1) % pinnedPurchases.length;
        return pinnedPurchases[nextIdx];
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const [activeVideoModal, setActiveVideoModal] = useState<{
    title: string;
    views: string;
    clicks: string;
    img: string;
    platform: 'YouTube' | 'Instagram' | 'X' | 'Reddit';
    impressions: string;
    ctr: string;
    averageWatchTime: string;
    retentionRate: string;
    callsBooked: string | number;
    salesAttributed: string;
    audienceGender: string;
    trafficSources: { name: string; pct: number }[];
    hookTimestamp?: string;
    retentionPoints: string;
    formsFilled: string | number;
    avgViewsBeforeClick: string;
    clickTimestamps: string[];
    rawClicksCount: number;
    rawCallsCount: number;
    rawFormsCount: number;
  } | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleVideoClick = (item: any, platformVal?: string) => {
    const title = item.title || item.caption || "Content Piece";
    const img = item.img || item.image || "https://i.postimg.cc/pdDTw5dz/Screenshot-2026-05-30-092601.png";
    const platform = (item.platform || platformVal || "YouTube") as 'YouTube' | 'Instagram' | 'X' | 'Reddit';
    
    let viewsStr = item.views ? String(item.views) : "125.4K views";
    
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Parse / Calculate clean underlying metrics
    const rawClicksCount = typeof item.clicks === 'number' 
      ? item.clicks 
      : (item.clicks ? parseInt(String(item.clicks).replace(/[^0-9]/g, '')) : Math.floor((hash % 1500) + 950));
    
    const rawCallsCount = typeof item.calls === 'number' 
      ? item.calls 
      : Math.floor(rawClicksCount * 0.048) + 12;
    
    const rawFormsCount = Math.floor(rawClicksCount * 0.16 + (hash % 20));
    
    const revenueValue = item.sales ? String(item.sales) : "$" + (Math.floor(rawCallsCount * 0.45) * 1997).toLocaleString();
    
    const impValue = Math.floor((hash % 400) + 120) + "K";
    const ctrValue = ((hash % 8) + 6.2).toFixed(1) + "%";
    const watchValue = Math.floor((hash % 4) + 2) + "m " + Math.floor((hash % 45) + 10) + "s";
    const rotVal = Math.floor((hash % 20) + 55) + "%";
    
    const firstPct = Math.floor((hash % 30) + 40);
    const secondPct = Math.floor((hash % 20) + 20);
    const thirdPct = 100 - firstPct - secondPct;

    const sources = [
      { name: platform === 'YouTube' ? 'Home Suggested' : 'Feed Explore', pct: firstPct },
      { name: platform === 'YouTube' ? 'Search Keyword' : 'Direct Checkout', pct: secondPct },
      { name: 'External Link Tap', pct: thirdPct }
    ];

    const timestampVal = platform === 'YouTube' 
      ? `0${Math.floor(hash % 3) + 1}:${Math.floor(hash % 40) + 10}` 
      : `Reel Autopilot DM`;

    // Dynamic high-fidelity Click Timestamps based on the caption hash
    const clickTimestamps = platform === 'Instagram' ? [
      `Just now • Direct DM Click registered • New York, US (Ref: in_dm_${hash % 500 + 100})`,
      `4m ago • Comment trigger-word triggered • Auto-DM Dispatched`,
      `11m ago • Form Captured • Dallas, US (Ref: form_${hash % 300 + 400})`,
      `25m ago • Cal.com Booking Confirmed • Atlanta, US`,
      `48m ago • Stripe Completed payment $2,400 • Austin, US`,
      `2h ago • Direct DM Click registered • Los Angeles, US`,
    ] : platform === 'YouTube' ? [
      `Just now • VSL CTA Click tracked • Toronto, CA (Ref: yt_vsl_${hash % 500 + 100})`,
      `3m ago • Ad click redirect tracked • Chicago, US`,
      `14m ago • Stripe Completed payment $1,997 • San Diego, US`,
      `35m ago • Form Captured • Boston, US (Ref: form_${hash % 300 + 400})`,
      `1h ago • Cal.com Booking Confirmed • Chicago, US`,
      `4h ago • VSL seeked to 4m 12s • Interactive CTA Tapped`,
    ] : [
      `Just now • Link Tapped in Thread • Chicago, US (Ref: tw_th_${hash % 500 + 100})`,
      `8m ago • Auto-DM Dispatched on comment reply`,
      `19m ago • Form signup captured (Ref: form_${hash % 300 + 400})`,
      `50m ago • Stripe Completed payment $1,500 • New York, US`,
      `2h ago • Link Tapped in Thread • Dallas, US`,
    ];

    // High fidelity "Average view before clicks" metric
    const loopOptions = [
      "1.7x views (user loops/re-watches content before clicking links)",
      "1.9x loops (high organic replay frequency before bio link clicks)",
      "1.5x views (interactive replay before comments / auto-DM dispatch)",
      "2.1x loops (cohort watches multiple times before active inquiry)"
    ];
    const avgViewsBeforeClick = platform === 'YouTube' 
      ? `85% average video watch-time duration (4m 12s) prior to clicking CTA link`
      : `${loopOptions[hash % loopOptions.length]}`;

    setActiveVideoModal({
      title,
      views: viewsStr,
      clicks: rawClicksCount.toLocaleString(),
      img,
      platform,
      impressions: impValue,
      ctr: ctrValue,
      averageWatchTime: watchValue,
      retentionRate: rotVal,
      callsBooked: rawCallsCount.toLocaleString(),
      salesAttributed: revenueValue,
      audienceGender: (hash % 2 === 0 ? "68.2% Male / 31.8% Female" : "54.1% Female / 45.9% Male"),
      trafficSources: sources,
      hookTimestamp: timestampVal,
      retentionPoints: JSON.stringify([40, 68, 85, 92, 70, 42, 28]),
      formsFilled: rawFormsCount.toLocaleString(),
      avgViewsBeforeClick,
      clickTimestamps,
      rawClicksCount,
      rawCallsCount,
      rawFormsCount
    });

    triggerToast(`Opened detailed attribution matrix for: ${title}`);
  };

  const currentStats = platformStats[selectedPlatform][selectedDateRange];
  const { points, linePath, fillPath } = getGraphData(selectedPlatform, selectedDateRange);

  return (
    <div className="w-full h-[820px] flex flex-col bg-white border-2 border-amber-500/20 rounded-3xl p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1),_0_0_35px_rgba(217,119,6,0.12)] text-left max-w-5xl mx-auto relative overflow-visible select-none transition-all duration-300 hover:border-amber-500/30 font-sans">
      
      {/* Toast Notification alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -25, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -25, x: '-50%' }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0c0a09] text-zinc-100 font-mono text-[11px] font-black tracking-wide px-4 py-2.5 rounded-2xl border border-zinc-850 shadow-2xl flex items-center gap-2"
          >
            <Sparkles size={13} className="text-amber-500 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DASHBOARD TOP CONTROL BAR HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3 mb-4 shrink-0">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-zinc-400">
              Live Control Center
            </span>
          </div>
          <h3 className="text-base font-black font-sans text-zinc-900 mt-0.5 flex flex-wrap items-center gap-2">
            <span>The Track 1on1 Live Controller</span>
            <span className="text-[9px] bg-amber-50 text-amber-800 font-mono font-bold px-1.5 py-0.5 rounded border border-amber-200">Interactive</span>
          </h3>
        </div>

        {/* Dynamic platform icons tab selectors */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none bg-zinc-50 border border-zinc-200/60 p-1 rounded-xl">
          {(['Overview', 'YouTube', 'Instagram', 'X', 'Reddit'] as const).map((platform) => {
            const isActive = selectedPlatform === platform;
            return (
              <button
                key={platform}
                onClick={() => {
                  setSelectedPlatform(platform);
                  triggerToast(`Switched channel view directly to ${platform}`);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                  isActive 
                    ? 'bg-zinc-900 text-white shadow-xs' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80'
                }`}
              >
                {platform === 'Instagram' && <Instagram size={11} className={isActive ? 'text-pink-400' : 'text-zinc-400'} />}
                {platform === 'YouTube' && <Youtube size={11} className={isActive ? 'text-rose-500' : 'text-zinc-400'} />}
                {platform === 'X' && <span className="text-[9px] font-mono font-bold">X</span>}
                {platform === 'Reddit' && <span className="text-[9px] font-mono font-bold">R/</span>}
                <span>{platform}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DASHBOARD CALENDAR DATE RANGE SELECTOR */}
      <div className="flex items-center justify-between mb-4 pb-1.5 border-b border-dashed border-zinc-100 h-8 shrink-0">
        <span className="text-[10.5px] text-zinc-400 font-mono">
          Attribution Source: <strong className="text-zinc-800 uppercase font-black">{selectedPlatform} channel</strong>
        </span>

        {/* Date Options glass dropdown on click */}
        <div className="relative z-30">
          <button
            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            className="px-2.5 py-1 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-250 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-3xs cursor-pointer"
          >
            <Calendar size={11.5} className="text-[#b45309]" />
            <span>Timeline: {dateRangeLabels[selectedDateRange]}</span>
            <span className="text-[8px] bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200 text-zinc-500 select-none block-inline">▼</span>
          </button>

          <AnimatePresence>
            {isDateDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsDateDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute right-0 top-7 mt-1 w-40 bg-white border border-zinc-200 rounded-lg shadow-xl p-1 z-30 text-left"
                >
                  {(['7d', '28d', '90d', '6m', '1y', 'lifetime'] as const).map((r) => {
                    const isSelected = selectedDateRange === r;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          setSelectedDateRange(r);
                          setIsDateDropdownOpen(false);
                          triggerToast(`Timeline filtered: ${dateRangeLabels[r]}`);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-md text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50 text-amber-900 font-extrabold'
                            : 'text-zinc-650 hover:bg-zinc-50 hover:text-zinc-950'
                        }`}
                      >
                        <span>{dateRangeLabels[r]}</span>
                        {isSelected && <span className="h-1 w-1 rounded-full bg-[#b45309]" />}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* SCROLLABLE MAIN BODY CONTENT */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 md:pr-2 -mr-1 md:-mr-2 pb-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent">
        {selectedPlatform === 'Instagram' ? (
        <InstagramConsole 
          onVideoClick={handleVideoClick} 
          currentStats={currentStats} 
          triggerToast={triggerToast} 
        />
      ) : selectedPlatform === 'X' ? (
        <XConsole 
          onVideoClick={handleVideoClick} 
          currentStats={currentStats} 
          triggerToast={triggerToast} 
        />
      ) : (
        <>
          {/* STATS CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            
            {/* Total Link Clicks */}
            <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-amber-500/30 transition-all duration-300">
              <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                Total Link Clicks
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-zinc-900 tracking-tight">
                  {currentStats.clicks}
                </span>
              </div>
            </div>

            {/* Forms Filled */}
            <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-amber-500/30 transition-all duration-300">
              <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                Forms Filled
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-zinc-900 tracking-tight">
                  {currentStats.forms}
                </span>
              </div>
            </div>

            {/* Booked Calls */}
            <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-amber-500/30 transition-all duration-300">
              <span className="text-[8px] font-mono font-bold tracking-widest text-[#b45309] uppercase">
                Booked Calls
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-zinc-900 tracking-tight">
                  {currentStats.calls}
                </span>
              </div>
            </div>

            {/* Sales Made */}
            <div className="bg-gradient-to-br from-white to-amber-50/15 border border-amber-200 rounded-xl p-3 text-left relative overflow-hidden shadow-sm hover:border-amber-500/40 transition-all duration-300">
              <span className="text-[8px] font-mono font-bold tracking-widest text-emerald-800 uppercase animate-pulse">
                Sales Made
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-emerald-700 tracking-tight">
                  {currentStats.sales}
                </span>
              </div>
            </div>

          </div>

          {/* DETAILED INTERACTIVE STAGES (GRAPH & WATCH ACTIONS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            
            {/* MAIN GRAPH CARD (Column Span 8) */}
            <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-xl p-4.5 relative overflow-visible flex flex-col justify-between shadow-xs hover:border-amber-500/20 transition-all duration-300 min-h-[310px]">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b45309] flex items-center gap-1.5">
                    <span>Traction Trend ({selectedPlatform})</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-amber-800 uppercase bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    {dateRangeLabels[selectedDateRange]}
                  </span>
                </div>
 
                {/* SVG Graph Plotter */}
                <div className="relative pt-1.5">
                  <div className="relative h-[180px] w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 700 220" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="simplifiedGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid background markers */}
                      <line x1="0" y1="40" x2="700" y2="40" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                      <line x1="0" y1="110" x2="700" y2="110" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                      <line x1="0" y1="180" x2="700" y2="180" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
 
                      {/* Fill graph */}
                      <path 
                        d={fillPath} 
                        fill="url(#simplifiedGlow)" 
                      />
 
                      {/* Line graph */}
                      <path 
                        d={linePath} 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                      />
 
                      {/* Interaction circles */}
                      {points.map((pt, idx) => {
                        const isHovered = sparklineHoverIndex === idx;
                        return (
                          <g 
                            key={idx}
                            onMouseEnter={() => setSparklineHoverIndex(idx)}
                            onMouseLeave={() => setSparklineHoverIndex(null)}
                            onClick={() => handleVideoClick(dailyThumbnails[idx % dailyThumbnails.length], selectedPlatform === 'Overview' ? 'YouTube' : selectedPlatform)}
                            className="cursor-pointer"
                          >
                            {/* Larger invisible hover target for easy interaction */}
                            <circle 
                              cx={pt.x} 
                              cy={pt.y} 
                              r="20" 
                              fill="transparent"
                            />
                            {/* Inner dot with subtle pulse animation context */}
                            <circle 
                              cx={pt.x} 
                              cy={pt.y} 
                              r={isHovered ? "9" : "7"} 
                              fill="rgba(16,185,129,0.15)" 
                              className="transition-all duration-150"
                            />
                            {/* Crisp perfect dot center with emerald colored stroke border */}
                            <circle 
                              cx={pt.x} 
                              cy={pt.y} 
                              r={isHovered ? "5.5" : "4"} 
                              fill="#ffffff"
                              stroke="#10b981"
                              strokeWidth={isHovered ? "3" : "2.2"}
                              className="transition-all duration-150 shadow-xs"
                            />
                          </g>
                        );
                      })}
                    </svg>
 
                    {/* DYNAMIC HOVER OVERLAY CARDS */}
                    <AnimatePresence>
                      {sparklineHoverIndex !== null && points[sparklineHoverIndex] && (
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.95, y: -8 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.95, y: -8 }}
                           className="absolute bg-white border border-zinc-200 rounded-xl p-2 shadow-xl z-40 w-44 pointer-events-none select-none text-left"
                           style={{
                             left: `${(points[sparklineHoverIndex].x / 700) * 100}%`,
                             top: `${(points[sparklineHoverIndex].y / 220) * 100 - 10}%`,
                             transform: 'translate(-50%, -100%)',
                           }}
                        >
                          <div className="relative w-full h-18 bg-zinc-100 rounded-lg overflow-hidden mb-1 border border-zinc-200">
                            <img 
                              src={dailyThumbnails[sparklineHoverIndex % dailyThumbnails.length].img} 
                              alt="Thumbnail context mapping" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-1 left-1 bg-rose-600 text-white font-mono text-[7px] font-black px-1.5 py-0.5 rounded uppercase">
                              REEL ATTRIBUTED
                            </div>
                          </div>
                          
                          <p className="text-[9.5px] font-extrabold text-zinc-900 truncate leading-tight">
                            {dailyThumbnails[sparklineHoverIndex % dailyThumbnails.length].title}
                          </p>
                          <div className="flex items-center justify-between mt-1 pt-1 border-t border-zinc-100 text-[8px] font-mono font-bold">
                            <span className="text-zinc-550">{dailyThumbnails[sparklineHoverIndex % dailyThumbnails.length].views}</span>
                            <span className="text-amber-700">{dailyThumbnails[sparklineHoverIndex % dailyThumbnails.length].clicks}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
 
                  <div className="flex justify-between text-[8px] font-mono text-zinc-400 mt-2 font-bold uppercase border-t border-zinc-100 pt-1.5">
                    <span>May 25</span>
                    <span>May 26</span>
                    <span>May 27</span>
                    <span>May 28</span>
                    <span>May 29</span>
                    <span>May 30</span>
                    <span>May 31 (Today)</span>
                  </div>
                </div>
              </div>
            </div>
 
            {/* VSL ACTIVITIES FEED (Column Span 4) */}
            <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-amber-500/20 transition-all duration-300 text-left min-h-[310px]">
              <div className="space-y-3.5 w-full">
                <div className="border-b border-zinc-100 pb-1.5 flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b45309]">
                    Activities on VSL
                  </h3>
                  <span className="text-[8px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-black uppercase">
                    Live
                  </span>
                </div>
 
                {/* Engagement counters container */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-1.5 bg-zinc-50 border border-zinc-150 rounded-xl">
                    <p className="text-[7.5px] font-mono uppercase tracking-wider text-zinc-400 font-bold leading-none">VSL Views</p>
                    <p className="text-sm font-black text-zinc-800 mt-1">14,805</p>
                  </div>
                  <div className="p-1.5 bg-zinc-50 border border-zinc-150 rounded-xl">
                    <p className="text-[7.5px] font-mono uppercase tracking-wider text-zinc-400 font-bold leading-none">CTA Clicks</p>
                    <p className="text-sm font-black text-amber-700 mt-1">3,124</p>
                  </div>
                </div>
 
                {/* Watch activity list stream */}
                <div className="space-y-1.5 max-h-[115px] overflow-y-auto pr-0.5 scrollbar-thin">
                  {vslRecentActivities.map((act) => (
                    <div key={act.id} className="text-[10px] border-l-2 border-amber-500 pl-2 py-0.5">
                      <div className="flex items-center justify-between font-bold text-zinc-800 leading-none">
                        <span className="text-[9.5px] truncate max-w-[105px]">{act.user}</span>
                        <span className="text-[7.5px] font-mono text-zinc-400 font-semibold">{act.time}</span>
                      </div>
                      <p className="text-zinc-550 text-[8.5px] mt-0.5 font-semibold leading-tight">{act.event}</p>
                      <span className="text-[8.5px] font-mono text-amber-700 font-bold block mt-0.5">{act.extra}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
 
          </div>
 
          {/* LOWER SECTION: HIGH CONVERTING POSTS TABLE & GOOGLE MAP PIN SYSTEM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            
            {/* HIGH-CONVERTING POSTS (Column Span 8) */}
            <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-xl p-4 shadow-xs hover:border-amber-500/20 transition-all text-left">
              <div className="border-b border-zinc-100 pb-2 flex items-center justify-between animate-none">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b45309]">
                    High-Converting Posts List
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-mono font-black uppercase text-[#b45309] bg-amber-50 border border-amber-200 rounded">
                  Outlier Content
                </span>
              </div>

              {/* Minimal Clean Posts Table */}
              <div className="overflow-x-auto mt-4 scrollbar-none">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                      <th className="py-2.5 font-extrabold">Creative Thumbnail</th>
                      <th className="py-2.5 font-extrabold">Details</th>
                      <th className="py-2.5 font-extrabold text-right">Links Tap</th>
                      <th className="py-2.5 font-extrabold text-right">Calls</th>
                      <th className="py-2.5 font-extrabold text-right">Sales Made</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
                    {highConvertingPosts.map((post) => (
                      <tr 
                        key={post.id} 
                        className="group hover:bg-amber-50/40 cursor-pointer transition-all duration-200"
                        onClick={() => handleVideoClick(post, post.platform)}
                      >
                        <td className="py-2.5">
                          <div className="w-14 h-9 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 relative shrink-0 group-hover:border-amber-500/50 transition-all">
                            <img 
                              src={post.image} 
                              alt="Post screen presentation thumbnail" 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all flex items-center justify-center">
                              <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">
                                <Play size={7} className="fill-amber-700 text-amber-700 ml-0.5" />
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 max-w-[200px]">
                          <p className="font-bold text-zinc-900 leading-snug truncate group-hover:text-amber-805 group-hover:text-amber-700 transition-colors">
                            {post.caption}
                          </p>
                          <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                            {post.platform} • Rate {post.rate}
                          </span>
                        </td>
                        <td className="py-2.5 text-right font-mono font-bold text-zinc-500">
                          {post.clicks.toLocaleString()}
                        </td>
                        <td className="py-2.5 text-right font-mono font-bold text-amber-700">
                          {post.calls}
                        </td>
                        <td className="py-2.5 text-right font-mono font-black text-emerald-700">
                          {post.sales}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* GOOGLE EARTH LIVE PLANET TRACKER (Column Span 4) */}
            <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-xl p-3.5 shadow-xs hover:border-amber-500/20 transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between min-h-[330px]">
              <div className="space-y-2.5">
                <div className="border-b border-zinc-100 pb-1.5 flex items-center gap-1.5">
                  <Globe size={12} className="text-[#b45309]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b45309]">
                    Buyers Map
                  </h3>
                </div>

                {/* Google Map overlay box */}
                <div className="relative w-full h-[120px] bg-zinc-100 border border-zinc-250 rounded-xl overflow-hidden shadow-inner flex items-center justify-center select-none group">
                  <img 
                    src="https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/08/07/Photos/Home%20Page/Gogle%20maps%20earth-kJdF--621x414@LiveMint.png" 
                    alt="Google Earth global view tracking widget" 
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.98] rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none rounded-xl" />

                  {/* Absolute sweep glow action */}
                  <div className="absolute inset-0 bg-transparent pointer-events-none overflow-hidden rounded-xl">
                    <div className="w-[180%] h-full bg-gradient-to-r from-transparent via-amber-500/10 to-transparent -translate-x-full animate-pulse" style={{ transform: 'skewX(-20deg)', animationDuration: '4.5s' }} />
                  </div>

                  {/* Overlaid buyer pins mapping */}
                  {pinnedPurchases.map((buyer) => {
                    const isHovered = hoveredBuyer?.id === buyer.id;
                    return (
                      <div
                        key={buyer.id}
                        className="absolute cursor-pointer transition-transform duration-205 hover:scale-120 z-20"
                        style={{ left: buyer.x, top: buyer.y }}
                        onMouseEnter={() => setHoveredBuyer(buyer)}
                      >
                        <span className="absolute -inset-2 rounded-full animate-ping bg-[#b45309] opacity-30" />
                        <div className={`relative w-6.5 h-6.5 w-6 h-6 rounded-full border shadow-md flex items-center justify-center transition-all duration-200 ${
                          isHovered 
                            ? 'scale-110 border-amber-500 bg-amber-500/20 shadow-md shadow-amber-500/25' 
                            : 'border-zinc-350 bg-white shadow-3xs'
                        }`}>
                          <img 
                            src={buyer.pinIconUrl} 
                            alt={`${buyer.name} Avatar`} 
                            className="w-full h-full object-contain pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Buyer country showcase card */}
                <div className="p-2 bg-zinc-50 border border-zinc-200 rounded-lg min-h-[82px] flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-zinc-150 pb-1">
                    <div className="flex items-center gap-1">
                      <img 
                        src={hoveredBuyer?.pinIconUrl} 
                        alt="Buyer Map Avatar" 
                        className="w-4.5 h-4.5 w-4 h-4 rounded-full object-contain border border-zinc-200 bg-white"
                        referrerPolicy="no-referrer"
                      />
                      <p className="text-[11px] font-bold text-zinc-900 flex items-center gap-0.5">
                        <span>{hoveredBuyer?.name || "Global Client"}</span>
                        <span className="text-[9px] font-normal text-zinc-500">({hoveredBuyer?.flag})</span>
                      </p>
                    </div>
                    <span className="text-[7.5px] font-mono text-amber-900 bg-amber-50 px-1 py-0.5 rounded border border-amber-200 font-bold uppercase shrink-0">
                      verified client
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 text-[9px] pt-1 text-zinc-650 font-semibold">
                    <div>
                      <span className="block font-mono tracking-wider uppercase text-[7px] text-zinc-400 leading-none">Country</span>
                      <span className="font-extrabold text-zinc-800 mt-0.5 block">{hoveredBuyer?.country}</span>
                    </div>
                    <div>
                      <span className="block font-mono tracking-wider uppercase text-[7px] text-zinc-400 leading-none">Attributed Value</span>
                      <span className="font-extrabold text-emerald-700 mt-0.5 block">{hoveredBuyer?.amount} USD</span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-zinc-150 mt-1 flex items-center justify-between text-[8px]">
                    <span className="text-zinc-400 font-mono italic">{hoveredBuyer?.time}</span>
                    <span className="text-zinc-700 font-extrabold leading-none truncate max-w-[100px]">{hoveredBuyer?.item}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </>
      )}
      </div>

      {/* DETAILED VIDEO/REEL ANALYTICS MODAL LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setActiveVideoModal(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 360 }}
              className="relative bg-white border border-zinc-200 rounded-3xl p-5 lg:p-7 max-w-4xl w-full z-10 max-h-[85vh] overflow-y-auto text-left flex flex-col gap-5 shadow-2xl select-none"
            >
              {/* Header inside modal */}
              <div className="flex items-start justify-between pb-3.5 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  {activeVideoModal.platform === 'YouTube' ? (
                    <span className="flex items-center gap-1 bg-red-50 text-red-700 text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-red-100 uppercase leading-none">
                      <Youtube size={11} className="fill-red-600 text-red-600" />
                      YouTube Ad / VSL
                    </span>
                  ) : activeVideoModal.platform === 'Instagram' ? (
                    <span className="flex items-center gap-1 bg-pink-50 text-pink-700 text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-pink-100 uppercase leading-none">
                      <Instagram size={11} className="text-pink-600" />
                      Instagram Reel
                    </span>
                  ) : activeVideoModal.platform === 'X' ? (
                    <span className="flex items-center gap-1 bg-zinc-50 text-zinc-700 text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-zinc-200 uppercase leading-none">
                      <span className="font-sans font-bold text-[10px]">X</span>
                      Micro Hook
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-amber-200 uppercase leading-none">
                      <span className="font-sans font-bold text-[10px]">r/</span>
                      Reddit Thread
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-zinc-400 font-bold">Attributed Live Event Detail</span>
                </div>
                
                <button 
                  onClick={() => setActiveVideoModal(null)}
                  className="w-7 h-7 bg-zinc-50 hover:bg-zinc-150 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 border border-zinc-200 transition-all cursor-pointer font-bold leading-none text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Main modal contents */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left col: Image Preview & Pre-conversion engagement & Path Sources */}
                <div className="md:col-span-5 space-y-4">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-200 shadow-md">
                    <img 
                      src={activeVideoModal.img} 
                      alt="Modal visual content placeholder" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                      <span className="text-white font-mono text-[10px] font-extrabold tracking-tight truncate w-full">
                        {activeVideoModal.title}
                      </span>
                    </div>
                  </div>

                  {/* Average View Before Click layout (Pre-Conversion view engagement) */}
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4">
                    <div className="flex gap-2 items-center text-[#b45309]">
                      <Eye size={14} className="shrink-0 animate-pulse text-[#b45309]" />
                      <span className="text-[9px] font-mono font-black uppercase tracking-widest leading-none text-[#b45309]">
                        Pre-Conversion View Engagement
                      </span>
                    </div>
                    <p className="text-zinc-800 text-xs font-bold leading-relaxed mt-2">
                      {activeVideoModal.avgViewsBeforeClick}
                    </p>
                    <div className="mt-2 text-[10.5px] text-zinc-500 leading-normal font-semibold">
                      Analyzes retention before conversion. Users thoroughly view/loop this asset prior to triggering automated DM actions or link clicks.
                    </div>
                  </div>

                  {/* Traffic origin paths with percentage indicator bars */}
                  <div className="space-y-2 bg-zinc-50/50 border border-zinc-200/65 p-4 rounded-2xl text-xs">
                    <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase block font-black text-[#b45309]">Inbound Segment Traced Paths</span>
                    <div className="space-y-2">
                      {activeVideoModal.trafficSources.map((source, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-zinc-700">{source.name}</span>
                            <span className="text-zinc-900 font-mono">{source.pct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-200/60 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-500 rounded-full" 
                              style={{ width: `${source.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right col: 4 key metrics, demographic indicators & Timestamps log */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b45309]">Attributed Cohort Segment</h4>
                    <p className="text-base font-black text-zinc-900 tracking-tight leading-snug mt-1">{activeVideoModal.title}</p>
                  </div>

                  {/* Key conversion stages grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-left hover:border-amber-500/20 transition-all">
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest block font-bold leading-none">1. Clicks</span>
                      <strong className="text-zinc-900 text-base font-black block mt-1.5 leading-none">{activeVideoModal.clicks}</strong>
                      <span className="text-[8px] text-zinc-400 block mt-1 leading-none">Inbound clicks</span>
                    </div>

                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-left hover:border-amber-500/20 transition-all">
                      <span className="text-[8px] font-mono text-[#b45308] uppercase tracking-widest block font-bold leading-none">2. Forms</span>
                      <strong className="text-[#b45309] text-base font-black block mt-1.5 leading-none">{activeVideoModal.formsFilled}</strong>
                      <span className="text-[8px] text-zinc-400 block mt-1 leading-none">Forms captured</span>
                    </div>

                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-left hover:border-amber-500/20 transition-all">
                      <span className="text-[8px] font-mono text-indigo-700 uppercase tracking-widest block font-bold leading-none">3. Booked Call</span>
                      <strong className="text-indigo-800 text-base font-black block mt-1.5 leading-none">{activeVideoModal.callsBooked}</strong>
                      <span className="text-[8px] text-zinc-400 block mt-1 leading-none">Calls scheduled</span>
                    </div>

                    <div className="p-3 bg-emerald-50/20 border border-emerald-250 rounded-2xl text-left hover:border-emerald-500/20 transition-all">
                      <span className="text-[8px] font-mono text-emerald-700 uppercase tracking-widest block font-bold leading-none">4. Cash Coll.</span>
                      <strong className="text-emerald-700 text-base font-black block mt-1.5 leading-none">{activeVideoModal.salesAttributed}</strong>
                      <span className="text-[8px] text-emerald-600 font-bold block mt-1 leading-none">Strype revenue</span>
                    </div>
                  </div>

                  {/* Clicking timestamps event stream log */}
                  <div className="bg-zinc-50/50 border border-zinc-200/80 rounded-2xl p-4">
                    <span className="text-[9px] font-mono font-black uppercase tracking-widest text-[#b45309] block mb-3">
                      Pipeline Live Trace Stream (Click Timestamps)
                    </span>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
                      {activeVideoModal.clickTimestamps.map((timestamp, i) => {
                        let bulletColor = "bg-zinc-400";
                        if (timestamp.includes("Stripe") || timestamp.includes("payment")) {
                          bulletColor = "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]";
                        } else if (timestamp.includes("Book") || timestamp.includes("Booking") || timestamp.includes("Cal.com")) {
                          bulletColor = "bg-indigo-500";
                        } else if (timestamp.includes("Form") || timestamp.includes("Captured")) {
                          bulletColor = "bg-[#b45309]";
                        } else if (timestamp.includes("Click") || timestamp.includes("Tapped")) {
                          bulletColor = "bg-zinc-650";
                        }
                        return (
                          <div key={i} className="flex gap-2 px-1 py-0.5 items-center text-[10.5px] border-b border-zinc-100 last:border-none leading-relaxed">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${bulletColor}`} />
                            <span className="font-semibold text-zinc-650 flex-1">{timestamp}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cohort Profile Segment information */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-3 text-xs font-semibold">
                    <div>
                      <span className="text-[8.5px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Hook Trigger Value</span>
                      <span className="text-zinc-800 text-xs block mt-0.5 font-bold">{activeVideoModal.hookTimestamp}</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Cohort Gender</span>
                      <span className="text-zinc-850 text-xs block mt-0.5 font-bold text-zinc-805">{activeVideoModal.audienceGender}</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Impressions mapped</span>
                      <span className="text-zinc-850 text-xs block mt-0.5 font-bold">{activeVideoModal.impressions} plays</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">Direct Conversion CTR</span>
                      <span className="text-amber-801 text-xs block mt-0.5 font-black text-amber-700">{activeVideoModal.ctr} click-rate</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Warnings and actions footer */}
              <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[10px] text-zinc-450 text-zinc-400 flex items-center gap-1.5 font-semibold">
                  <Lock size={12} className="text-emerald-600" />
                  <span>Attribution hashes matching Stripe customer footprint metadata in absolute confidentiality.</span>
                </div>
                <button 
                  onClick={() => setActiveVideoModal(null)}
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-850 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Done, Keep Tracking
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
