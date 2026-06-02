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
  Smartphone,
  MessageCircle,
  Repeat2,
  Heart
} from 'lucide-react';

const xPostsData = [
  {
    id: 'xt-1',
    title: 'This 1 line of CSS doubled our mobile checkout traffic 📈 - full blueprint inside.',
    triggerWord: 'XSCODE',
    type: 'Tweet with media',
    dmsSent: '31,800',
    clicks: '14,240',
    formsSubmitted: '950',
    cashCollected: '$240,000',
    conversionRate: '44.8%',
    image: 'https://i.postimg.cc/Mpfg5h64/Screenshot-2026-05-31-143755.png',
    linkGoal: 'track1on1.com/get-css-code'
  },
  {
    id: 'xt-2',
    title: 'How we scaled Chris raw tech-stack from $10k/mo to $140k/mo in 45 days. Fully tracked!',
    triggerWord: 'CHRIS',
    type: 'Thread Plug',
    dmsSent: '15,600',
    clicks: '5,280',
    formsSubmitted: '680',
    cashCollected: '$115,000',
    conversionRate: '33.8%',
    image: 'https://i.postimg.cc/mg1Kj0LX/Screenshot-2026-05-31-143809.png',
    linkGoal: 'track1on1.com/case-study-chris'
  },
  {
    id: 'xt-3',
    title: 'Stop using standard Link-in-Bios. This DM funnel system tracks 10X cleaner on X.',
    triggerWord: 'BYPASS',
    type: 'Tweet with media',
    dmsSent: '14,100',
    clicks: '6,120',
    formsSubmitted: '780',
    cashCollected: '$162,000',
    conversionRate: '43.4%',
    image: 'https://i.postimg.cc/mg1Kj0L0/Screenshot-2026-05-31-143824.png',
    linkGoal: 'track1on1.com/bio-funnel-vsl'
  },
  {
    id: 'xt-4',
    title: 'Inside our automated $3k/mo systems layout (Behind the scenes outline breakdown)',
    triggerWord: 'XSTACK',
    type: 'Thread Plug',
    dmsSent: '11,400',
    clicks: '4,100',
    formsSubmitted: '180',
    cashCollected: '$68,000',
    conversionRate: '36.0%',
    image: 'https://i.postimg.cc/4xHjPrfF/Screenshot-2026-05-31-143835.png',
    linkGoal: 'track1on1.com/case-study-chris'
  },
  {
    id: 'xt-5',
    title: 'The 2026 multi-channel attribution handbook (12 slide PDF breakdown). Pure value.',
    triggerWord: 'XTRUTH',
    type: 'Tweet with media',
    dmsSent: '8,210',
    clicks: '2,920',
    formsSubmitted: '340',
    cashCollected: '$85,000',
    conversionRate: '35.5%',
    image: 'https://i.postimg.cc/cLtPhV1S/Screenshot-2026-05-31-143906.png',
    linkGoal: 'track1on1.com/get-css-code'
  }
];

const xDMCampaigns = [
  {
    keyword: 'XSCODE',
    description: 'Auto dispatch mobile checkout CSS code block to replies',
    triggered: '31,800',
    delivered: '31,792 (99.9%)',
    clicked: '14,240 (44.8%)',
    booked: '950 (6.7%)',
    salesValue: '$240,000',
    status: 'LIVE'
  },
  {
    keyword: 'CHRIS',
    description: 'Scale case study dispatch inside system direct-messages',
    triggered: '15,600',
    delivered: '15,595 (99.9%)',
    clicked: '5,280 (33.8%)',
    booked: '680 (12.8%)',
    salesValue: '$115,000',
    status: 'LIVE'
  },
  {
    keyword: 'BYPASS',
    description: 'Bypass links with direct funnel VSL delivery',
    triggered: '14,100',
    delivered: '14,098 (99.9%)',
    clicked: '6,120 (43.4%)',
    booked: '780 (12.7%)',
    salesValue: '$162,000',
    status: 'LIVE'
  },
  {
    keyword: 'XSTACK',
    description: 'Walkthrough PDF of micro raw stacks trigger',
    triggered: '11,400',
    delivered: '11,396 (99.9%)',
    clicked: '4,100 (36.0%)',
    booked: '180 (4.4%)',
    salesValue: '$68,000',
    status: 'PAUSED'
  },
  {
    keyword: 'XTRUTH',
    description: 'Attribution handbook download stream plug',
    triggered: '8,210',
    delivered: '8,206 (99.9%)',
    clicked: '2,920 (35.5%)',
    booked: '340 (11.6%)',
    salesValue: '$85,000',
    status: 'LIVE'
  }
];

const xDMLogs = [
  {
    id: 'xd-1',
    user: '@naval_fan_9',
    avatar: 'https://i.postimg.cc/nLbD6Jns/360-F-509029931-t5X7s-UHQOWghg-Pch-Kc-CW9Avae-O9UUhulega-removebg-preview.png',
    keyword: 'XSCODE',
    time: 'Just now',
    step: 'Booking Completed',
    text: 'Completed target onboarding form. Calendly matched.',
    progress: 100,
    badge: 'success'
  },
  {
    id: 'xd-2',
    user: '@saas_founder_alpha',
    avatar: 'https://i.postimg.cc/PqswBjdx/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avae-O9UUhulega-removebg-prevjjjjiew.png',
    keyword: 'CHRIS',
    time: '1m ago',
    step: 'Link Tapped',
    text: 'Opened case study. Traffic trace active.',
    progress: 60,
    badge: 'primary'
  },
  {
    id: 'xd-3',
    user: '@marketing_exec',
    avatar: 'https://i.postimg.cc/LsK1rpms/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avae-O9UUhulega-removebg-prnnmmmeview.png',
    keyword: 'BYPASS',
    time: '4m ago',
    step: 'Replied to Trigger',
    text: 'Sent reply keyword "BYPASS". System auto-response generated.',
    progress: 25,
    badge: 'warning'
  },
  {
    id: 'xd-4',
    user: '@growth_lead_xyz',
    avatar: 'https://i.postimg.cc/HLDyfgTn/360-F-509029931-t5X7s-UHQOWPch-Kc-CW9Avaennnnnn-O9UUhulega-removebg-preview.png',
    keyword: 'XSTACK',
    time: '10m ago',
    step: 'Booking Completed',
    text: 'Booked direct demo call. Conversion traced successfully.',
    progress: 100,
    badge: 'success'
  }
];

const xChatConversations: Record<string, { sender: 'user' | 'system'; text: string; time: string }[]> = {
  'xd-1': [
    { sender: 'user', text: 'XSCODE', time: '11:40 AM' },
    { sender: 'system', text: "Perfect choice! Here is the precise 1 line of mobile CSS that optimized checkouts: track1on1.com/get-css-code", time: '11:40 AM' },
    { sender: 'user', text: 'This is brilliant. Do you guys track thread clicks natively or only direct DMs?', time: '11:42 AM' },
    { sender: 'system', text: "Both! We map direct-message automations AND auto-post custom thread plugs in absolute real time. Let's trace your setup:", time: '11:43 AM' },
    { sender: 'system', text: "📅 Booking Confirmed: Naval Strategy Session - Wed 4:00 PM EST", time: '11:45 AM' },
    { sender: 'user', text: 'Stunning speed! Thank you.', time: '11:46 AM' }
  ],
  'xd-2': [
    { sender: 'user', text: 'CHRIS', time: '11:30 AM' },
    { sender: 'system', text: "Awesome! Here is the Chris case study on how we scaled a dev agency from $10k to $140k/mo with zero organic vanity waste: track1on1.com/case-study-chris", time: '11:30 AM' },
    { sender: 'user', text: 'Reading now. Love this no-fluff approach.', time: '11:32 AM' }
  ],
  'xd-3': [
    { sender: 'user', text: 'BYPASS', time: '11:10 AM' },
    { sender: 'system', text: "Bypass standard link-in-bios instantly! Here is our high CTR tracking system layout: track1on1.com/bio-funnel-vsl", time: '11:10 AM' }
  ],
  'xd-4': [
    { sender: 'user', text: 'XSTACK', time: '10:55 AM' },
    { sender: 'system', text: "Here is our optimized stacked framework setup breakdown PDF: track1on1.com/case-study-chris", time: '10:55 AM' },
    { sender: 'system', text: "📅 Booking Confirmed: System Walkthrough Call - Wed 11:00 AM EST", time: '10:58 AM' }
  ]
};

interface XConsoleProps {
  onVideoClick: (item: any, platform: 'YouTube' | 'Instagram' | 'X' | 'Reddit') => void;
  currentStats: {
    clicks: string;
    calls: string;
    sales: string;
    conversion: string;
  };
  triggerToast: (msg: string) => void;
}

export default function XConsole({ onVideoClick, currentStats, triggerToast }: XConsoleProps) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Posts' | 'DMs'>('Overview');
  const [activeChat, setActiveChat] = useState<'xd-1' | 'xd-2' | 'xd-3' | 'xd-4'>('xd-1');
  const [newMsgText, setNewMsgText] = useState('');
  const [customChats, setCustomChats] = useState<Record<string, { sender: 'user' | 'system'; text: string; time: string }[]>>(xChatConversations);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: newMsgText, time: timeNow };

    let botReplyText = "Thanks for the message! Our automated tracking agent has logged this activity and delivered your link.";
    if (newMsgText.toLowerCase().includes('css') || newMsgText.toLowerCase().includes('scode')) {
      botReplyText = "⚡ CSS Blueprint auto-delivered! Use link track1on1.com/get-css-code to download raw lines instantly.";
    } else if (newMsgText.toLowerCase().includes('chris') || newMsgText.toLowerCase().includes('scale')) {
      botReplyText = "📈 Case study delivered: track1on1.com/case-study-chris. Direct lead is trace-mapped.";
    } else if (newMsgText.toLowerCase().includes('bypass') || newMsgText.toLowerCase().includes('bio')) {
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

  const totalDMsSent = 81110;
  const totalClicks = 32660;
  const totalForms = 2930;
  const totalCashCollected = "$670,000";

  return (
    <div className="space-y-4">
      
      {/* SUB MENU TABS ROW */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white border border-zinc-200 rounded-xl p-2.5 shadow-sm select-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-[#0f172a] mr-2 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
            Twitt(X) Console
          </span>
          {(['Overview', 'Posts', 'DMs'] as const).map((tab) => {
            const isTabActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`x-subtab-${tab}`}
                onClick={() => {
                  setActiveTab(tab);
                  triggerToast(`Switched to Twitt(X): ${tab}`);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isTabActive
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-650 hover:bg-zinc-100 hover:text-zinc-950'
                }`}
              >
                {tab === 'Overview' && <BarChart3 size={13} />}
                {tab === 'Posts' && <Layers size={13} />}
                {tab === 'DMs' && <MessageSquare size={13} />}
                <span>
                  {tab === 'Posts' ? 'Tracked Tweets & Threads' : tab === 'DMs' ? 'Live Auto DMs & Replies' : tab}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-[10px] font-mono text-zinc-400 font-bold flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-zinc-950 animate-pulse" />
          Track1on1 Proprietary X Attribution Active
        </div>
      </div>

      {/* RENDER CHANNELS */}
      <AnimatePresence mode="wait">
        {activeTab === 'Overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            className="space-y-4"
          >
            {/* 4 STUNNING FUNNEL STATS CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              
              <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-zinc-500/30 transition-all duration-300">
                <span className="text-[8px] font-mono font-bold tracking-widest text-zinc-400 uppercase block">
                  1. Auto DMs Dispatched
                </span>
                <div className="mt-1">
                  <span className="text-xl font-black text-zinc-900 tracking-tight">81,110</span>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-zinc-500/30 transition-all duration-300">
                <span className="text-[8px] font-mono font-bold tracking-widest text-[#b45309] uppercase block">
                  2. Clicks (Link Taps)
                </span>
                <div className="mt-1">
                  <span className="text-xl font-black text-zinc-900 tracking-tight">32,660</span>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs hover:border-zinc-500/30 transition-all duration-300">
                <span className="text-[8px] font-mono font-bold tracking-widest text-indigo-700 uppercase block">
                  3. Lead Forms Filled
                </span>
                <div className="mt-1">
                  <span className="text-xl font-black text-zinc-900 tracking-tight">2,930</span>
                </div>
              </div>

              <div className="bg-emerald-50/10 border border-emerald-200 rounded-xl p-3 text-left relative overflow-hidden shadow-xs transition-all duration-300">
                <span className="text-[8px] font-mono font-bold tracking-widest text-emerald-700 uppercase block">
                  4. Attributed Sales
                </span>
                <div className="mt-1">
                  <span className="text-xl font-black text-emerald-800 tracking-tight">{totalCashCollected}</span>
                </div>
              </div>
            </div>

            {/* TWITT(X) CONVERSION TRACING PROCESS DIAGRAM */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-xs text-left">
              <div className="flex justify-between items-start flex-wrap gap-2.5 border-b border-zinc-100 pb-2 mb-4">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">X Thread Plug &amp; Auto-DM Trace System</h3>
                </div>
                <div className="bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200 text-[9px] font-mono font-bold text-zinc-805 text-zinc-800 flex items-center gap-1">
                  <Activity size={10} className="text-emerald-600" /> Active Tracking
                </div>
              </div>

              {/* TWITT(X) FUNNEL STAGES */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-xl">
                  <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase block mb-1">State 01</span>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-tight">Replies Logged</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Reply keyword comments caught by raw live scrape APIs.</p>
                  <div className="text-base font-black text-zinc-900 mt-4 font-mono">{totalDMsSent.toLocaleString()} replies</div>
                </div>

                <div className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-xl">
                  <span className="text-[9px] font-mono text-amber-705 font-bold uppercase block mb-1">State 02</span>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-tight">DM Links Clicked</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Direct message resource links and automated thread plug click throughs.</p>
                  <div className="text-base font-black text-[#b45309] mt-4 font-mono">{totalClicks.toLocaleString()} taps</div>
                </div>

                <div className="p-4 bg-zinc-50/70 border border-zinc-200 rounded-xl">
                  <span className="text-[9px] font-mono text-indigo-700/70 font-bold uppercase block mb-1">State 03</span>
                  <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-tight">Waitlists Filed</h4>
                  <p className="text-[10px] text-zinc-500 mt-1">Forms filled & inbound scheduling matching user X handle identifiers.</p>
                  <div className="text-base font-black text-indigo-700 mt-4 font-mono">{totalForms.toLocaleString()} logs</div>
                </div>

                <div className="p-4 bg-zinc-950 text-white border border-zinc-805 rounded-xl">
                  <span className="text-[9px] font-mono text-amber-500 font-bold uppercase block mb-1">State 04</span>
                  <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-tight">Cash Attributed</h4>
                  <p className="text-[10px] text-zinc-400 mt-1">Final buyer checkout dollars verified against lead click history.</p>
                  <div className="text-base font-black text-amber-500 mt-4 font-mono">{totalCashCollected}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* POSTS TAB (COMPLETED SCATTER GRID - FEATURING PICTURE VISIBLE IN FULL SIZE) */}
        {activeTab === 'Posts' && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="space-y-4 text-left"
          >
            <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-xs">
              <h3 className="text-xs font-bold text-zinc-900 font-mono uppercase tracking-wider">Twitter (X) Outlier Posts &amp; Conversion Tracing</h3>
              <p className="text-[10.5px] text-zinc-500 font-medium mt-0.5">High-impact micro-hooks designed for auto-DM activation and thread plugs without organic bloat.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {xPostsData.map((post) => (
                <div 
                  key={post.id}
                  className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm hover:border-zinc-500/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Banner - Twitter Style Clean Layout */}
                    <div className="bg-zinc-50 border-b border-zinc-150 p-3 text-left">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="px-2 py-0.5 bg-zinc-200 text-zinc-700 font-mono text-[8.5px] font-bold rounded border border-zinc-300 whitespace-nowrap">
                          {post.type}
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-950 text-white font-mono text-[8.5px] font-black rounded uppercase">
                          Trigger: "{post.triggerWord}"
                        </span>
                      </div>
                      
                      <p className="text-zinc-800 text-xs font-bold font-sans leading-snug line-clamp-2 height-[32px]">
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

                    {/* Funnel Metrics Grid */}
                    <div className="p-4 space-y-4">
                      
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-zinc-50 border border-zinc-150 p-2 rounded-xl text-left">
                          <span className="block text-[8px] font-mono font-bold text-zinc-400 uppercase leading-none">1. DMs Sent</span>
                          <span className="text-xs font-mono font-black text-zinc-800 tracking-tight mt-1 inline-block leading-none">{post.dmsSent}</span>
                        </div>
                        <div className="bg-zinc-50 border border-zinc-150 p-2 rounded-xl text-left">
                          <span className="block text-[8px] font-mono font-bold text-zinc-500 uppercase leading-none">2. Clicks</span>
                          <span className="text-xs font-mono font-black text-zinc-800 tracking-tight mt-1 inline-block leading-none">{post.clicks}</span>
                        </div>
                        <div className="bg-zinc-50 border border-zinc-150 p-2 rounded-xl text-left">
                          <span className="block text-[8px] font-mono font-bold text-zinc-500 uppercase leading-none">3. Forms Captured</span>
                          <span className="text-xs font-mono font-black text-zinc-800 tracking-tight mt-1 inline-block leading-none">{post.formsSubmitted}</span>
                        </div>
                        <div className="bg-emerald-50/20 border border-emerald-150 p-2 rounded-xl text-left">
                          <span className="block text-[8px] font-mono font-bold text-emerald-700 uppercase leading-none">4. Cash Collected</span>
                          <span className="text-xs font-mono font-black text-emerald-800 tracking-tight mt-1 inline-block leading-none">{post.cashCollected}</span>
                        </div>
                      </div>

                      {/* Redirect Link Info */}
                      <div className="p-2 text-[9.5px] font-mono bg-zinc-50 rounded-lg text-zinc-400 flex justify-between items-center font-bold">
                        <span>Lead funnel target:</span>
                        <span className="text-zinc-700 underline truncate max-w-[140px]">{post.linkGoal}</span>
                      </div>

                    </div>
                  </div>

                  {/* Operational Footer action */}
                  <div className="px-4 pb-4 pt-1.5 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] font-mono text-zinc-400 uppercase font-bold">Conversion Rate</span>
                      <span className="text-xs font-mono font-black text-[#5b21b6]">{post.conversionRate} CTR</span>
                    </div>

                    <button 
                      onClick={() => onVideoClick({
                        title: post.title,
                        clicks: post.clicks + " link taps",
                        calls: post.formsSubmitted,
                        sales: post.cashCollected,
                        img: post.image,
                        platform: 'X'
                      }, 'X')}
                      className="px-2.5 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-[9px] font-bold rounded-lg uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer shadow-xs"
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

        {/* INTERACTIVE DM CHAT SIMULATION */}
        {activeTab === 'DMs' && (
          <motion.div
            key="dms"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            className="space-y-6"
          >
            {/* CAMPAIGN LIST */}
            <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="p-4 border-b border-zinc-150 bg-zinc-50 flex justify-between items-center text-left flex-wrap gap-2">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900 font-mono uppercase tracking-wider">Direct Message Funnel Campaigns (X)</h3>
                  <p className="text-[10.5px] text-zinc-500 font-medium">Bypassing standard profile links with automated, high-intent direct trigger responses.</p>
                </div>
                <span className="px-2.5 py-1 bg-[#1e293b] text-[9.5px] text-zinc-100 font-mono font-extrabold uppercase rounded border border-zinc-700 self-start">
                  Active Dispatch Stream Sync
                </span>
              </div>

              <div className="overflow-x-auto text-left">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-zinc-50/50 border-b border-zinc-150 text-[10px] font-mono text-zinc-400 uppercase font-extrabold">
                      <th className="p-3.5 pl-5">Keyword Trigger</th>
                      <th className="p-3.5">Campaign Automation Description</th>
                      <th className="p-3.5">Traced Replies</th>
                      <th className="p-3.5">DMs Dispatched</th>
                      <th className="p-3.5">Forms Filled</th>
                      <th className="p-3.5">Attributed Value</th>
                      <th className="p-3.5 pr-5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {xDMCampaigns.map((camp) => (
                      <tr key={camp.keyword} className="border-b border-zinc-150 hover:bg-zinc-50/40 font-semibold text-zinc-700">
                        <td className="p-3.5 pl-5">
                          <span className="px-2 py-1 bg-zinc-100 text-[10px] font-mono font-extrabold text-[#0f172a] rounded border border-zinc-300">
                            "{camp.keyword}"
                          </span>
                        </td>
                        <td className="p-3.5 text-zinc-800 font-bold">{camp.description}</td>
                        <td className="p-3.5 font-mono font-black text-zinc-800">{camp.triggered}</td>
                        <td className="p-3.5 font-mono text-amber-700">{camp.clicked}</td>
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
                  <h3 className="text-xs font-black text-zinc-900 font-mono uppercase tracking-wider">Live Link Attribution Feed (X)</h3>
                  <p className="text-[10.5px] text-zinc-500 font-medium">Select any outbound lead stream to preview conversational direct-message logs.</p>
                </div>

                <div className="space-y-2.5 overflow-y-auto max-h-[350px] pr-1">
                  {xDMLogs.map((lead) => {
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
                            ? 'bg-zinc-55 bg-indigo-50/20 border-zinc-950 ring-1 ring-zinc-950'
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
                            <div className="h-full bg-zinc-950 rounded-full" style={{ width: `${lead.progress}%` }} />
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
                        src={xDMLogs.find(l => l.id === activeChat)?.avatar} 
                        referrerPolicy="no-referrer"
                        alt="Handset User" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-black text-zinc-900 leading-none">
                        {xDMLogs.find(l => l.id === activeChat)?.user}
                      </span>
                      <span className="text-[9.5px] font-mono text-zinc-900 font-black flex items-center gap-1 mt-0.5 leading-none">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        X Direct Flow Trace Active
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-500 bg-zinc-50 border px-2 py-0.5 rounded-md font-bold">
                    Keyword: "{xDMLogs.find(l => l.id === activeChat)?.keyword}"
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
                    placeholder="Type comments to simulate (e.g. 'XSCODE', 'CHRIS', 'BYPASS')..."
                    value={newMsgText}
                    onChange={(e) => setNewMsgText(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-zinc-50 border border-zinc-250 hover:border-zinc-350 focus:border-zinc-950 rounded-xl text-xs font-bold font-mono outline-none focus:ring-1 focus:ring-zinc-950 transition-all text-zinc-800"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all flex items-center justify-center cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <Send size={12} className="mr-1" /> Simulate Reply
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
