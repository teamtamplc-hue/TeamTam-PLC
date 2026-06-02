import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  MessageSquare, 
  ArrowUpRight, 
  BarChart3, 
  Target, 
  Check, 
  Layers, 
  Sparkles,
  DollarSign,
  Calendar,
  Users,
  MousePointerClick,
  FileText,
  Activity,
  Smartphone
} from 'lucide-react';

// Unified Dataset of posts we provide (no organic video plays, likes, views, saves, shares, etc.)
const instagramPostsData = [
  {
    id: 'post-1',
    title: 'This 1 line of CSS doubled our mobile checkout traffic 📈',
    type: 'Reel',
    triggerWord: 'REELCSS',
    dmsSent: '42,100',
    clicks: '18,520',
    formsSubmitted: '1,240',
    cashCollected: '$312,000',
    conversionRate: '44.0%',
    image: 'https://i.postimg.cc/Mpfg5h64/Screenshot-2026-05-31-143755.png',
    linkGoal: 'track1on1.com/get-css-code'
  },
  {
    id: 'post-2',
    title: 'How we scaled Chris raw tech-stack from $10k/mo to $140k/mo in 45 days',
    type: 'Reel',
    triggerWord: 'SCALE',
    dmsSent: '18,400',
    clicks: '6,450',
    formsSubmitted: '840',
    cashCollected: '$142,500',
    conversionRate: '35.1%',
    image: 'https://i.postimg.cc/mg1Kj0LX/Screenshot-2026-05-31-143809.png',
    linkGoal: 'track1on1.com/case-study-chris'
  },
  {
    id: 'post-3',
    title: 'Stop using standard Link-in-Bios. This DM funnel system tracks 10X better.',
    type: 'Reel',
    triggerWord: 'BIOFUNNEL',
    dmsSent: '16,200',
    clicks: '7,250',
    formsSubmitted: '915',
    cashCollected: '$184,000',
    conversionRate: '44.8%',
    image: 'https://i.postimg.cc/mg1Kj0L0/Screenshot-2026-05-31-143824.png',
    linkGoal: 'track1on1.com/bio-funnel-vsl'
  },
  {
    id: 'post-4',
    title: 'Inside our automated $3k/mo systems layout (Behind the scenes outline)',
    type: 'Reel',
    triggerWord: 'STACK',
    dmsSent: '12,150',
    clicks: '4,560',
    formsSubmitted: '240',
    cashCollected: '$82,000',
    conversionRate: '37.5%',
    image: 'https://i.postimg.cc/4xHjPrfF/Screenshot-2026-05-31-143835.png',
    linkGoal: 'track1on1.com/case-study-chris'
  },
  {
    id: 'post-5',
    title: 'The 2026 multi-channel attribution handbook (12 slide PDF breakdown)',
    type: 'Carousel Post',
    triggerWord: 'HANDBOOK',
    dmsSent: '9,820',
    clicks: '3,210',
    formsSubmitted: '420',
    cashCollected: '$105,000',
    conversionRate: '32.7%',
    image: 'https://i.postimg.cc/cLtPhV1S/Screenshot-2026-05-31-143906.png',
    linkGoal: 'track1on1.com/get-css-code'
  },
  {
    id: 'post-6',
    title: 'Step by step: Our warm content pipeline structural engine setup',
    type: 'Static Post',
    triggerWord: 'PIPELINE',
    dmsSent: '5,395',
    clicks: '1,840',
    formsSubmitted: '185',
    cashCollected: '$46,250',
    conversionRate: '34.1%',
    image: 'https://i.postimg.cc/Mpfg5h64/Screenshot-2026-05-31-143755.png',
    linkGoal: 'track1on1.com/get-css-code'
  },
  {
    id: 'post-7',
    title: 'Crucial: Why CRM systems misattribute 40% of standard buyer pathways',
    type: 'Carousel Post',
    triggerWord: 'CRMTRUTH',
    dmsSent: '3,892',
    clicks: '1,560',
    formsSubmitted: '152',
    cashCollected: '$38,000',
    conversionRate: '40.1%',
    image: 'https://i.postimg.cc/mg1Kj0LX/Screenshot-2026-05-31-143809.png',
    linkGoal: 'track1on1.com/bio-funnel-vsl'
  }
];

const instagramDMCampaigns = [
  {
    keyword: 'REELCSS',
    description: 'Dynamic checkout CSS code request auto-delivery',
    triggered: '42,100',
    delivered: '42,085 (99.9%)',
    clicked: '18,520 (44.0%)',
    booked: '1,240 (6.7%)',
    salesValue: '$312,000',
    status: 'LIVE'
  },
  {
    keyword: 'SCALE',
    description: 'Chris $140K/mo Case Study link dispatch',
    triggered: '18,400',
    delivered: '18,396 (99.9%)',
    clicked: '6,450 (35.1%)',
    booked: '840 (13.0%)',
    salesValue: '$142,500',
    status: 'LIVE'
  },
  {
    keyword: 'BIOFUNNEL',
    description: 'Direct Message Link-in-Bio VSL campaign',
    triggered: '16,200',
    delivered: '16,198 (99.9%)',
    clicked: '7,250 (44.8%)',
    booked: '915 (12.6%)',
    salesValue: '$184,000',
    status: 'LIVE'
  },
  {
    keyword: 'STACK',
    description: 'Technical raw software stack automation PDF',
    triggered: '12,150',
    delivered: '12,145 (99.9%)',
    clicked: '4,560 (37.5%)',
    booked: '240 (5.2%)',
    salesValue: '$82,000',
    status: 'PAUSED'
  },
  {
    keyword: 'HANDBOOK',
    description: 'Attribution handbook PDF breakdown delivery',
    triggered: '9,820',
    delivered: '9,812 (99.9%)',
    clicked: '3,210 (32.7%)',
    booked: '420 (13.1%)',
    salesValue: '$105,000',
    status: 'LIVE'
  }
];

const instagramDMLogs = [
  {
    id: 'idl-1',
    user: '@alex_m_grow',
    avatar: 'https://i.postimg.cc/nLbD6Jns/360-F-509029931-t5X7s-UHQOWghg-Pch-Kc-CW9Avae-O9UUhulega-removebg-preview.png',
    keyword: 'REELCSS',
    time: 'Just now',
    step: 'Booking Completed',
    text: 'Acquired slot Wed 3 PM. Confirmed direct lead capture.',
    progress: 100,
    badge: 'success'
  },
  {
    id: 'idl-2',
    user: '@sarah.dev',
    avatar: 'https://i.postimg.cc/PqswBjdx/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avae-O9UUhulega-removebg-prevjjjjiew.png',
    keyword: 'REELCSS',
    time: '2m ago',
    step: 'Link Tapped',
    text: 'Opened URL "Attribution Guide" in system direct-message automation.',
    progress: 60,
    badge: 'primary'
  },
  {
    id: 'idl-3',
    user: '@lucas_b_scale',
    avatar: 'https://i.postimg.cc/LsK1rpms/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avae-O9UUhulega-removebg-prnnmmmeview.png',
    keyword: 'BIOFUNNEL',
    time: '5m ago',
    step: 'Replied to Trigger',
    text: 'Sent word trigger "BIOFUNNEL" in DM block. Auto-reply dispatched.',
    progress: 25,
    badge: 'warning'
  },
  {
    id: 'idl-4',
    user: '@growth.engineer',
    avatar: 'https://i.postimg.cc/HLDyfgTn/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avaennnnnn-O9UUhulega-removebg-preview.png',
    keyword: 'SCALE',
    time: '12m ago',
    step: 'Booking Completed',
    text: 'Inbound booking slot Wed 10 AM. Confirmed lead conversion tracker.',
    progress: 100,
    badge: 'success'
  }
];

const chatConversations: Record<string, { sender: 'user' | 'system'; text: string; time: string }[]> = {
  'idl-1': [
    { sender: 'user', text: 'REELCSS', time: '11:24 AM' },
    { sender: 'system', text: "Hey Alex! Thanks for triggering our CSS hook. Here is the precise 1 line of mobile CSS that optimized our standard checkouts: track1on1.com/get-css-code", time: '11:24 AM' },
    { sender: 'user', text: 'Just loaded the CSS. This is literally 2 lines, completely beautiful. Do you guys handle the user trace links automatically?', time: '11:26 AM' },
    { sender: 'system', text: "Exactly - we tracking-resolve comment triggers, bio clicks, and active sessions in absolute real time. Let's get you configured:", time: '11:26 AM' },
    { sender: 'system', text: "📅 Booking Confirmed: Chris Tech Strategy Session - Wed 3:00 PM EST", time: '11:28 AM' },
    { sender: 'user', text: 'Wow, instant. Appreciate it!', time: '11:28 AM' }
  ],
  'idl-2': [
    { sender: 'user', text: 'REELCSS', time: '11:15 AM' },
    { sender: 'system', text: "Hey! Thanks for commenting on the mobile checkout optimization Reel. Here is the precise 1 line of CSS that doubled checkout CTR: track1on1.com/get-css-code", time: '11:15 AM' },
    { sender: 'user', text: 'Just downloaded it! Can we apply this to a custom React component?', time: '11:18 AM' },
    { sender: 'system', text: "Absolutely, it works out of the box with standard Vite/Tailwind templates. Check your dashboard metrics!", time: '11:19 AM' }
  ],
  'idl-3': [
    { sender: 'user', text: 'BIOFUNNEL', time: '11:02 AM' },
    { sender: 'system', text: "Hey Lucas! Stop losing 40% of standard bio clicks to generic menus. Here is our ultra high CTR tracking VSL system: track1on1.com/bio-funnel-vsl", time: '11:02 AM' },
    { sender: 'user', text: 'interesting... is this a custom domain or custom CNAME?', time: '11:05 AM' }
  ],
  'idl-4': [
    { sender: 'user', text: 'SCALE', time: '10:45 AM' },
    { sender: 'system', text: "Hey! Here is the Chris case study breakdown on how to map attribution across automated comment funnels: track1on1.com/case-study-chris", time: '10:45 AM' },
    { sender: 'system', text: "📅 Booking Confirmed: Growth Strategy Call - Wed 10:00 AM EST", time: '10:47 AM' },
    { sender: 'user', text: 'Ready!', time: '10:52 AM' }
  ]
};

interface InstagramConsoleProps {
  onVideoClick: (item: any, platform: 'YouTube' | 'Instagram' | 'X' | 'Reddit') => void;
  currentStats: {
    clicks: string;
    calls: string;
    sales: string;
    conversion: string;
  };
  triggerToast: (msg: string) => void;
}

export default function InstagramConsole({ onVideoClick, currentStats, triggerToast }: InstagramConsoleProps) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Posts' | 'DMs'>('Overview');
  const [activeChat, setActiveChat] = useState<'idl-1' | 'idl-2' | 'idl-3' | 'idl-4'>('idl-1');
  const [newMsgText, setNewMsgText] = useState('');
  const [customChats, setCustomChats] = useState<Record<string, { sender: 'user' | 'system'; text: string; time: string }[]>>(chatConversations);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;
    
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: newMsgText, time: timeNow };
    
    let botReplyText = "Thanks for the message! Our automated tracking agent has logged this activity and delivered your link.";
    if (newMsgText.toLowerCase().includes('css')) {
      botReplyText = "⚡ CSS Blueprint auto-delivered! Use link track1on1.com/get-css-code to download raw lines instantly.";
    } else if (newMsgText.toLowerCase().includes('scale') || newMsgText.toLowerCase().includes('chris')) {
      botReplyText = "📈 Case study delivered: track1on1.com/case-study-chris. Direct lead is trace-mapped.";
    } else if (newMsgText.toLowerCase().includes('bio')) {
      botReplyText = "🔗 Menus bypassed. High CTR redirect sent: track1on1.com/bio-funnel-vsl";
    }

    const botMsg = { sender: 'system' as const, text: botReplyText, time: timeNow };

    setCustomChats(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), userMsg, botMsg]
    }));
    
    setNewMsgText('');
    triggerToast("DM sent. Live automation responder dispatched link and traced click instantly!");
  };

  // Compute live mathematical totals from provided posts data
  const totalDMsSent = 107957; // 107,957 sum
  const totalClicks = 43390;   // 43,390 sum
  const totalForms = 3992;     // 3,992 sum
  const totalCashCollected = "$909,750";

  return (
    <div className="space-y-4">
      
      {/* SUB MENU TABS ROW */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white border border-zinc-200 rounded-xl p-2 shadow-sm select-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-[#b45350] mr-2 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Instagram Data View
          </span>
          {(['Overview', 'Posts', 'DMs'] as const).map((tab) => {
            const isTabActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`ig-subtab-${tab}`}
                onClick={() => {
                  setActiveTab(tab);
                  triggerToast(`Switched to Instagram: ${tab}`);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isTabActive
                    ? 'bg-[#b45309] text-white shadow-xs'
                    : 'text-zinc-650 hover:bg-zinc-100 hover:text-zinc-950'
                }`}
              >
                {tab === 'Overview' && <BarChart3 size={13} />}
                {tab === 'Posts' && <Layers size={13} />}
                {tab === 'DMs' && <MessageSquare size={13} />}
                <span>
                  {tab === 'Posts' ? 'Tracked Posts & Reels' : tab === 'DMs' ? 'Live DM Automations' : tab}
                </span>
              </button>
            );
          })}
        </div>
        
        <div className="text-[10px] font-mono text-zinc-400 font-bold flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          Track1on1 Proprietary Attribution Engine Active
        </div>
      </div>

      {/* RENDER CHANNELS */}
      <AnimatePresence mode="wait">
        {activeTab === 'Overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* 4 STUNNING FUNNEL STATS CARDS (NO VANITY INSTAGRAM METRICS) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              
              <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-amber-500/30 transition-all duration-300">
                <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-400 uppercase block">
                  1. DMs Sent
                </span>
                <div className="mt-1">
                  <span className="text-xl font-black text-zinc-900 tracking-tight">107,957</span>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-amber-500/30 transition-all duration-300">
                <span className="text-[8px] font-mono font-bold tracking-widest text-[#b45309] uppercase block">
                  2. Clicks (Link Taps)
                </span>
                <div className="mt-1">
                  <span className="text-xl font-black text-zinc-900 tracking-tight">43,390</span>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-amber-500/30 transition-all duration-300">
                <span className="text-[8px] font-mono font-bold tracking-widest text-indigo-700 uppercase block">
                  3. Forms Captured
                </span>
                <div className="mt-1">
                  <span className="text-xl font-black text-zinc-900 tracking-tight">3,992</span>
                </div>
              </div>

              <div className="bg-emerald-50/10 border border-emerald-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs transition-all duration-300">
                <span className="text-[8px] font-mono font-bold tracking-widest text-emerald-700 uppercase block">
                  4. Cash Collected
                </span>
                <div className="mt-1">
                  <span className="text-xl font-black text-emerald-800 tracking-tight">{totalCashCollected}</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC ATTRIBUTION FUNNEL DIAGRAM */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs text-left">
              <div className="flex justify-between items-start flex-wrap gap-2.5 border-b border-zinc-100 pb-2 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Attribution Funnel Leakage & Conversion Tracing</h3>
                </div>
                <div className="bg-amber-50 px-2 py-0.5 rounded border border-amber-250 text-[9px] font-mono font-bold text-[#b45309] flex items-center gap-1">
                  <Activity size={10} /> Tracing Active
                </div>
              </div>

              {/* STAGES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                
                {/* Stage 1 */}
                <div className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">Stage 01</span>
                    <span className="px-1.5 py-0.5 bg-zinc-200 text-zinc-700 font-mono text-[8.5px] font-bold rounded">Triggered</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-tight">Sent Automations</h4>
                  <p className="text-[10.5px] text-zinc-500 mt-1 leading-relaxed">Direct messages dispatched instantly upon comment keyword matches.</p>
                  <div className="text-lg font-black text-zinc-900 mt-4 font-mono">{totalDMsSent.toLocaleString()}</div>
                  <span className="text-[9px] font-mono text-zinc-400 block mt-1">100% Funnel Entry</span>
                </div>

                {/* Stage 2 */}
                <div className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-[#b35709]/70 font-bold uppercase">Stage 02</span>
                    <span className="px-1.5 py-0.5 bg-amber-100 text-[#b45309] font-mono text-[8.5px] font-extrabold rounded">40.2% CTR</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-tight">Click-Throughs</h4>
                  <p className="text-[10.5px] text-zinc-500 mt-1 leading-relaxed">Verified buyers tapping delivery link from direct message inbox.</p>
                  <div className="text-lg font-black text-zinc-900 mt-4 font-mono">{totalClicks.toLocaleString()}</div>
                  <span className="text-[9px] font-mono text-[#b45309] block mt-1">40.2% of entry flow</span>
                </div>

                {/* Stage 3 */}
                <div className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-indigo-700/70 font-bold uppercase">Stage 03</span>
                    <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-800 font-mono text-[8.5px] font-extrabold rounded">9.2% Booked</span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-tight">Inbound Forms</h4>
                  <p className="text-[10.5px] text-zinc-500 mt-1 leading-relaxed">Calendly matches or opt-in lead capture form submissions completed.</p>
                  <div className="text-lg font-black text-zinc-900 mt-4 font-mono">{totalForms.toLocaleString()}</div>
                  <span className="text-[9px] font-mono text-indigo-600 block mt-1">9.2% of clicks converted</span>
                </div>

                {/* Stage 4 */}
                <div className="p-4 bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-xl hover:border-emerald-300 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Stage 04</span>
                    <span className="px-1.5 py-0.5 bg-emerald-200 text-emerald-800 font-mono text-[8.5px] font-black rounded">Bottom Line</span>
                  </div>
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-tight">Cash Collected</h4>
                  <p className="text-[10.5px] text-emerald-700 mt-1 leading-relaxed">Payments cleared matching exact tracking hashes of trigger post.</p>
                  <div className="text-lg font-black text-emerald-800 mt-4 font-mono">{totalCashCollected}</div>
                  <span className="text-[9px] font-mono text-emerald-700 block mt-1">Avg. $227.89 per opt-in lead</span>
                </div>

              </div>

              {/* SUBTITLE ACCENT NOTE */}
              <div className="mt-6 p-4 rounded-xl bg-amber-50/20 border border-amber-200/40 text-[11px] text-zinc-600 leading-relaxed font-semibold">
                *Unlike organic reports, we bypass explore plays / impressions completely. High conversion ratios prove that content works of itself without relying on algorithmic vanity variables. Let us track what converts.
              </div>
            </div>
          </motion.div>
        )}

        {/* POSTS PERFORMANCE TAB (GRID COVERS ONLY OUR TRACKED METRICS) */}
        {activeTab === 'Posts' && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-4 text-left"
          >
            <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-xs">
              <h3 className="text-xs font-bold text-zinc-900 font-mono uppercase tracking-wider">Posts &amp; Reels Funnel Performance</h3>
              <p className="text-[10.5px] text-zinc-500 font-medium mt-0.5">Custom video titles and structures mapped directly to checkout bottom-line cash collected.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instagramPostsData.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Banner - Clean and Elegant */}
                    <div className="bg-zinc-50 border-b border-zinc-150 p-3 text-left">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="px-2 py-0.5 bg-zinc-200 text-zinc-700 font-mono text-[8.5px] font-bold rounded border border-zinc-300 whitespace-nowrap">
                          {post.type}
                        </span>
                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-mono text-[8.5px] font-black rounded uppercase">
                          Trigger: "{post.triggerWord}"
                        </span>
                      </div>
                      
                      <p className="text-zinc-800 text-xs font-extrabold leading-snug line-clamp-2 height-[32px]">
                        {post.title}
                      </p>
                    </div>

                    {/* Image Container with Contain Styling for Full Visibility */}
                    <div className="relative h-80 w-full bg-zinc-900 overflow-hidden flex items-center justify-center border-b border-zinc-150">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        referrerPolicy="no-referrer"
                        className="h-full max-h-full max-w-full object-contain mx-auto transition-transform duration-300 hover:scale-[1.02]" 
                      />
                    </div>

                    {/* Funnel Metrics Grid (No organic plays, likes, views, saves, shares or comments) */}
                    <div className="p-4 space-y-4">
                      
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-zinc-50 border border-zinc-150 p-2 rounded-xl text-left">
                          <span className="block text-[8px] font-mono font-bold text-zinc-400 uppercase leading-none">1. DMs Sent</span>
                          <span className="text-xs font-mono font-black text-zinc-800 tracking-tight mt-1 inline-block leading-none">{post.dmsSent}</span>
                        </div>
                        <div className="bg-orange-50/20 border border-orange-100 p-2 rounded-xl text-left">
                          <span className="block text-[8px] font-mono font-bold text-[#b45309] uppercase leading-none">2. Clicks (Link Taps)</span>
                          <span className="text-xs font-mono font-black text-[#b45309] tracking-tight mt-1 inline-block leading-none">{post.clicks}</span>
                        </div>
                        <div className="bg-indigo-50/20 border border-indigo-100 p-2 rounded-xl text-left">
                          <span className="block text-[8px] font-mono font-bold text-indigo-700 uppercase leading-none">3. Forms Captured</span>
                          <span className="text-xs font-mono font-black text-indigo-800 tracking-tight mt-1 inline-block leading-none">{post.formsSubmitted}</span>
                        </div>
                        <div className="bg-emerald-50/20 border border-emerald-150 p-2 rounded-xl text-left">
                          <span className="block text-[8px] font-mono font-bold text-emerald-700 uppercase leading-none">4. Cash Collected</span>
                          <span className="text-xs font-mono font-black text-emerald-800 tracking-tight mt-1 inline-block leading-none">{post.cashCollected}</span>
                        </div>
                      </div>

                      {/* Redirect Link goal info */}
                      <div className="p-2 text-[9.5px] font-mono bg-zinc-50 rounded-lg text-zinc-400 flex justify-between items-center font-bold">
                        <span>Attribution redirect:</span>
                        <span className="text-zinc-700 underline truncate max-w-[140px]">{post.linkGoal}</span>
                      </div>

                    </div>
                  </div>

                  {/* Operational Footer action */}
                  <div className="px-4 pb-4 pt-1.5 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] font-mono text-zinc-400 uppercase font-bold">Conversion Rate</span>
                      <span className="text-xs font-mono font-black text-[#b35709]">{post.conversionRate} CTR</span>
                    </div>

                    <button 
                      onClick={() => onVideoClick({
                        title: post.title,
                        clicks: post.clicks + " link taps",
                        calls: post.formsSubmitted,
                        sales: post.cashCollected,
                        img: post.image,
                        platform: 'Instagram'
                      }, 'Instagram')}
                      className="px-2.5 py-1.5 bg-zinc-950 hover:bg-amber-600 text-white font-mono text-[9px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <span>Funnel Map</span>
                      <ArrowUpRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DM AUTOMATIONS & INTERACTIVE CHATTER TAB */}
        {activeTab === 'DMs' && (
          <motion.div
            key="dms"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* CAMPAIGN LIST */}
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-4 border-b border-zinc-150 bg-zinc-50 flex justify-between items-center text-left flex-wrap gap-2">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 font-mono uppercase tracking-wider">Direct Message Funnel Camapigns</h3>
                  <p className="text-[10.5px] text-zinc-500 font-medium">Bypassing the standard bio structure with customized direct trigger keywords.</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-[9.5px] text-emerald-800 font-mono font-extrabold uppercase rounded border border-emerald-200 self-start">
                  Live Dispatch Stream Sync
                </span>
              </div>

              <div className="overflow-x-auto text-left">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-zinc-50/50 border-b border-zinc-150 text-[10px] font-mono text-zinc-400 uppercase font-extrabold">
                      <th className="p-3.5 pl-5">Keyword Trigger</th>
                      <th className="p-3.5">Campaign Automation description</th>
                      <th className="p-3.5">Traced DMs</th>
                      <th className="p-3.5">Traced Clicks</th>
                      <th className="p-3.5">Forms Filled</th>
                      <th className="p-3.5">Cash Captured</th>
                      <th className="p-3.5 pr-5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instagramDMCampaigns.map((camp) => (
                      <tr key={camp.keyword} className="border-b border-zinc-150 hover:bg-zinc-50/40 font-semibold text-zinc-700">
                        <td className="p-3.5 pl-5">
                          <span className="px-2 py-1 bg-amber-50 text-[10px] font-mono font-extrabold text-[#b45309] rounded border border-amber-200">
                            "{camp.keyword}"
                          </span>
                        </td>
                        <td className="p-3.5 text-zinc-800 font-bold">{camp.description}</td>
                        <td className="p-3.5 font-mono font-black text-zinc-800">{camp.triggered}</td>
                        <td className="p-3.5 font-mono text-[#b35709]">{camp.clicked}</td>
                        <td className="p-3.5 font-mono text-indigo-700">{camp.booked}</td>
                        <td className="p-3.5 font-mono font-black text-emerald-700">{camp.salesValue}</td>
                        <td className="p-3.5 pr-5">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-extrabold ${
                            camp.status === 'LIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                            {camp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LIVE CHAT SIMULATION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 select-none">
              
              {/* SIDEBAR FEED */}
              <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
                <div className="text-left mb-3">
                  <h3 className="text-xs font-black text-zinc-900 font-mono uppercase tracking-wider">Live Lead Attribution Feed</h3>
                  <p className="text-[10.5px] text-zinc-500 font-medium">Click any outbound lead stream to preview conversational chatbot logs.</p>
                </div>

                <div className="space-y-2.5 overflow-y-auto max-h-[350px] pr-1">
                  {instagramDMLogs.map((lead) => {
                    const isSelected = activeChat === lead.id;
                    return (
                      <button
                        key={lead.id}
                        onClick={() => {
                          setActiveChat(lead.id as any);
                          triggerToast(`Swapped view to conversation with ${lead.user}`);
                        }}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex gap-3 ${
                          isSelected
                            ? 'bg-amber-50/40 border-amber-400 ring-1 ring-amber-400'
                            : 'bg-white border-zinc-150 hover:border-zinc-300'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-zinc-100 overflow-hidden shrink-0 mt-0.5 border border-zinc-200">
                          <img src={lead.avatar} alt="User Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 text-[11px] leading-tight space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="font-extrabold text-zinc-900">{lead.user}</span>
                            <span className="text-[9px] font-mono text-zinc-400 leading-none">{lead.time}</span>
                          </div>
                          
                          <p className="text-zinc-650 font-medium line-clamp-1 italic">"{lead.text}"</p>
                          
                          <div className="flex items-center gap-2 pt-1 font-bold">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono leading-none capitalize ${
                              lead.badge === 'success' ? 'bg-emerald-100 text-emerald-800' :
                              lead.badge === 'primary' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-[#b45309]'
                            }`}>
                              {lead.step}
                            </span>
                            <span className="text-[9px] text-zinc-400 font-mono">Trigger: "{lead.keyword}"</span>
                          </div>

                          <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden mt-1.5">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${lead.progress}%` }} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CHAT handset SIMULATOR */}
              <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-[450px]">
                
                {/* Active phone header */}
                <div className="pb-3 border-b border-zinc-150 flex justify-between items-center">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 overflow-hidden border">
                      <img 
                        src={instagramDMLogs.find(l => l.id === activeChat)?.avatar} 
                        referrerPolicy="no-referrer"
                        alt="Handset User" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-black text-zinc-900 leading-none">
                        {instagramDMLogs.find(l => l.id === activeChat)?.user}
                      </span>
                      <span className="text-[9.5px] font-mono text-[#b35709] font-black flex items-center gap-1 mt-0.5 leading-none">
                        <span className="inline-block w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
                        Buyer Traced Loop Active
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-500 bg-zinc-50 border px-2 py-0.5 rounded-md font-bold">
                    Keyword: "{instagramDMLogs.find(l => l.id === activeChat)?.keyword}"
                  </div>
                </div>

                {/* Conversation flow container */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3.5 bg-zinc-50/50 border border-zinc-150 rounded-xl my-3 scrollbar-none flex flex-col">
                  {customChats[activeChat]?.map((msg, mIdx) => {
                    const isSystem = msg.sender === 'system';
                    return (
                      <div 
                        key={mIdx}
                        className={`max-w-[85%] text-left p-2.5 rounded-2xl text-[11px] leading-relaxed shadow-3xs transition-all ${
                          isSystem
                            ? 'bg-zinc-900 text-white rounded-tl-sm self-start font-medium'
                            : 'bg-white border rounded-tr-sm self-end text-zinc-805 font-bold'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="block font-mono text-[7px] text-right mt-1 font-bold text-zinc-400">
                          {msg.time}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Form Simulation dispatch */}
                <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
                  <input 
                    type="text" 
                    placeholder="Type comments to simulate (e.g. 'REELCSS', 'SCALE', 'BIOFUNNEL')..."
                    value={newMsgText}
                    onChange={(e) => setNewMsgText(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-250 hover:border-zinc-350 focus:border-[#b45309] rounded-xl text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-[#b45309] transition-all text-zinc-800"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#b45309] text-white rounded-xl text-xs font-bold hover:bg-[#92400e] transition-all flex items-center justify-center cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <Send size={12} className="mr-1" /> Simulate Comment
                  </button>
                </form>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
