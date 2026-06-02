import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Video, 
  Eye, 
  Radio, 
  Users, 
  Settings, 
  Bell, 
  Smartphone, 
  TrendingUp, 
  Play, 
  Instagram, 
  Youtube, 
  Twitter, 
  ArrowUpRight, 
  CheckCircle2, 
  MessageSquare, 
  Flame, 
  MousePointerClick, 
  DollarSign,
  Calendar,
  Lock,
  ChevronRight,
  Sparkles,
  Globe,
  MapPin,
  User,
  Send,
  Heart,
  Share2,
  Bookmark,
  BarChart3,
  Target,
  Activity,
  Check,
  Layers
} from 'lucide-react';

import InstagramConsole from './InstagramConsole';
import XConsole from './XConsole';

interface DemoDashboardProps {
  onBackToLanding: () => void;
  key?: React.Key;
}

// Highly structured conversion metric datasets
const platformStats = {
  Overview: {
    '7d': { clicks: '320,150', forms: '95,400', calls: '14,200', sales: '$1,020,400' },
    '28d': { clicks: '1,482,093', forms: '395,204', calls: '65,495', sales: '$4,850,230' },
    '90d': { clicks: '4,102,900', forms: '1,120,440', calls: '190,450', sales: '$14,230,400' },
    '6m': { clicks: '8,320,100', forms: '2,150,000', calls: '380,120', sales: '$28,450,900' },
    '1y': { clicks: '16,420,500', forms: '4,923,100', calls: '742,000', sales: '$54,120,800' },
    'lifetime': { clicks: '35,210,400', forms: '10,410,200', calls: '1,684,500', sales: '$112,480,900' }
  },
  YouTube: {
    '7d': { clicks: '140,500', forms: '40,250', calls: '6,105', sales: '$1,120,400' },
    '28d': { clicks: '642,300', forms: '185,120', calls: '29,450', sales: '$2,150,000' },
    '90d': { clicks: '1,920,400', forms: '512,180', calls: '82,100', sales: '$6,800,000' },
    '6m': { clicks: '3,840,100', forms: '1,020,400', calls: '154,200', sales: '$12,940,000' },
    '1y': { clicks: '7,680,200', forms: '2,120,000', calls: '310,400', sales: '$25,600,000' },
    'lifetime': { clicks: '18,400,000', forms: '5,100,000', calls: '780,200', sales: '$64,200,000' }
  },
  Instagram: {
    '7d': { clicks: '110,200', forms: '32,150', calls: '5,000', sales: '$1,050,150' },
    '28d': { clicks: '520,410', forms: '142,500', calls: '24,100', sales: '$1,840,150' },
    '90d': { clicks: '1,560,900', forms: '412,000', calls: '72,400', sales: '$5,950,000' },
    '6m': { clicks: '3,120,500', forms: '820,150', calls: '144,300', sales: '$11,840,000' },
    '1y': { clicks: '6,240,000', forms: '1,640,000', calls: '288,050', sales: '$23,680,050' },
    'lifetime': { clicks: '14,800,000', forms: '4,000,000', calls: '690,000', sales: '$58,400,000' }
  },
  X: {
    '7d': { clicks: '50,450', forms: '15,200', calls: '2,100', sales: '$1,012,300' },
    '28d': { clicks: '219,300', forms: '42,150', calls: '9,450', sales: '$1,255,420' },
    '90d': { clicks: '657,000', forms: '125,000', calls: '28,100', sales: '$3,415,000' },
    '6m': { clicks: '1,314,000', forms: '250,105', calls: '56,050', sales: '$6,800,000' },
    '1y': { clicks: '2,628,000', forms: '500,000', calls: '112,000', sales: '$13,600,000' },
    'lifetime': { clicks: '6,500,000', forms: '1,200,000', calls: '280,000', sales: '$34,000,000' }
  },
  Reddit: {
    '7d': { clicks: '20,000', forms: '7,400', calls: '1,000', sales: '$1,002,400' },
    '28d': { clicks: '100,083', forms: '25,434', calls: '5,495', sales: '$1,084,260' },
    '90d': { clicks: '300,000', forms: '76,200', calls: '16,400', sales: '$2,250,000' },
    '6m': { clicks: '600,000', forms: '152,000', calls: '32,800', sales: '$4,500,000' },
    '1y': { clicks: '1,200,000', forms: '304,000', calls: '65,600', sales: '$9,000,000' },
    'lifetime': { clicks: '3,000,000', forms: '760,000', calls: '164,050', sales: '$22,500,000' }
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

// Rich structure Instagram specific metrics and campaign databases
const instagramReelsData = [
  {
    id: 'ir-1',
    title: 'This 1 line of CSS doubled our mobile checkout traffic 📈',
    plays: '1,284,500',
    reach: '984,200',
    likes: '84,105',
    comments: '1,420',
    shares: '34,180',
    saves: '54,095',
    dmsSent: '42,100',
    conversionRate: '5.2%',
    revenue: '$312,000',
    image: 'https://i.postimg.cc/pdDTw5dz/Screenshot-2026-05-30-092601.png',
    triggerWord: 'REELCSS',
    avgWatchTime: '18.4s'
  },
  {
    id: 'ir-2',
    title: 'How we scaled Chris raw tech-stack from $10k/mo to $140k/mo in 45 days',
    plays: '852,400',
    reach: '718,900',
    likes: '45,093',
    comments: '1,080',
    shares: '12,940',
    saves: '21,100',
    dmsSent: '18,400',
    conversionRate: '4.8%',
    revenue: '$142,500',
    image: 'https://i.postimg.cc/CMZ102dd/Screenshot-2026-05-29-222330.png',
    triggerWord: 'SCALE',
    avgWatchTime: '22.1s'
  },
  {
    id: 'ir-3',
    title: 'Stop using standard Link-in-Bios. This DM funnel system tracks 10X better.',
    plays: '619,500',
    reach: '542,100',
    likes: '38,100',
    comments: '1,120',
    shares: '18,900',
    saves: '19,840',
    dmsSent: '16,200',
    conversionRate: '6.1%',
    revenue: '$184,000',
    image: 'https://i.postimg.cc/ZY9RmQ0Y/Screenshot-2026-05-29-222253.png',
    triggerWord: 'BIOFUNNEL',
    avgWatchTime: '15.8s'
  },
  {
    id: 'ir-4',
    title: 'Inside our automated $3k/mo systems layout (Behind the scenes outline)',
    plays: '450,200',
    reach: '410,150',
    likes: '29,450',
    comments: '640',
    shares: '8,320',
    saves: '15,204',
    dmsSent: '12,150',
    conversionRate: '4.2%',
    revenue: '$82,000',
    image: 'https://i.postimg.cc/7PC64Rb4/Screenshot-2026-05-29-203644.png',
    triggerWord: 'STACK',
    avgWatchTime: '14.2s'
  }
];

const instagramCarouselsData = [
  {
    id: 'ic-1',
    title: 'The 2026 multi-channel attribution handbook (12 slide PDF breakdown)',
    impressions: '180,500',
    likes: '14,500',
    shares: '4,520',
    saves: '9,810',
    comments: '430',
    leadRate: '8.4%',
    leadsGenerated: '3,210',
    image: 'https://i.postimg.cc/pdDTw5dz/Screenshot-2026-05-30-092601.png',
    swipeThrough: '74%'
  },
  {
    id: 'ic-2',
    title: 'Step by step: Our warm content pipeline structural engine setup',
    impressions: '120,400',
    likes: '9,820',
    shares: '2,890',
    saves: '5,395',
    comments: '310',
    leadRate: '6.8%',
    leadsGenerated: '1,840',
    image: 'https://i.postimg.cc/CMZ102dd/Screenshot-2026-05-29-222330.png',
    swipeThrough: '68%'
  },
  {
    id: 'ic-3',
    title: 'Crucial: Why CRM systems misattribute 40% of standard buyer pathways',
    impressions: '95,150',
    likes: '7,180',
    shares: '1,845',
    saves: '3,892',
    comments: '185',
    leadRate: '9.1%',
    leadsGenerated: '1,560',
    image: 'https://i.postimg.cc/ZY9RmQ0Y/Screenshot-2026-05-29-222253.png',
    swipeThrough: '81%'
  }
];

const instagramDMCampaigns = [
  {
    keyword: 'REELCSS',
    description: 'Dynamic checkout CSS code request auto-delivery',
    triggered: '42,100',
    delivered: '42,085 (99.9%)',
    opened: '39,940 (94.9%)',
    clicked: '18,520 (46.3%)',
    booked: '1,240 (6.6%)',
    salesValue: '$312,000',
    status: 'LIVE'
  },
  {
    keyword: 'SCALE',
    description: 'Chris $140K/mo Case Study link dispatch',
    triggered: '18,400',
    delivered: '18,396 (99.9%)',
    opened: '17,210 (93.5%)',
    clicked: '6,450 (37.4%)',
    booked: '840 (13.0%)',
    salesValue: '$142,500',
    status: 'LIVE'
  },
  {
    keyword: 'BIOFUNNEL',
    description: 'Direct Message Link-in-Bio VSL campaign',
    triggered: '16,200',
    delivered: '16,198 (99.9%)',
    opened: '15,080 (93.0%)',
    clicked: '7,250 (48.0%)',
    booked: '915 (12.6%)',
    salesValue: '$184,000',
    status: 'LIVE'
  },
  {
    keyword: 'STACK',
    description: 'Technical raw software stack automation PDF',
    triggered: '12,150',
    delivered: '12,145 (99.9%)',
    opened: '10,980 (90.3%)',
    clicked: '4,560 (41.5%)',
    booked: '240 (5.2%)',
    salesValue: '$82,000',
    status: 'PAUSED'
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
    text: 'Sent comment "BIOFUNNEL" in Reel #3. Auto-DM triggered.',
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

const chatConversations = {
  'idl-1': [
    { sender: 'user', text: 'REELCSS', time: '11:24 AM' },
    { sender: 'system', text: "Hey Alex! Thanks for triggering our CSS hook. Here is the precise 1 line of mobile CSS that optimized our standard checkouts: track1on1.com/get-css-code", time: '11:24 AM' },
    { sender: 'user', text: 'Just loaded the CSS. This is literally 2 lines, completely beautiful. Do you guys handle the user trace links automatically?', time: '11:26 AM' },
    { sender: 'system', text: "Exactly - we tracking-resolve comment triggers, bio clicks, and active sessions in absolute real time. Let\'s get you configured:", time: '11:26 AM' },
    { sender: 'system', text: "📅 Booking Confirmed: Chris Tech Strategy Session - Wed 3:00 PM EST", time: '11:28 AM' },
    { sender: 'user', text: 'Wow, instant. Appreciate it!', time: '11:28 AM' }
  ],
  'idl-2': [
    { sender: 'user', text: 'REELCSS', time: '11:15 AM' },
    { sender: 'system', text: "Hey! Thanks for commenting on the mobile checkout optimization Reel. Here is the precise 1 line of CSS that doubled checkout CTR: track1on1.com/get/css-code-reel", time: '11:15 AM' },
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
    { sender: 'system', text: "📅 Booking Confirmed: Growth Strategy Call - Wed 10:00 AM EST", time: '10:52 AM' },
    { sender: 'user', text: 'Ready!', time: '10:52 AM' }
  ]
};

export default function DemoDashboard({ onBackToLanding }: DemoDashboardProps) {
  const [userName, setUserName] = useState('Creator');
  const [selectedPlatform, setSelectedPlatform] = useState<'Overview' | 'YouTube' | 'Instagram' | 'X' | 'Reddit'>('Overview');
  const [selectedDateRange, setSelectedDateRange] = useState<'7d' | '28d' | '90d' | '6m' | '1y' | 'lifetime'>('28d');
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notificationCount, setNotificationCount] = useState(2);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [sparklineHoverIndex, setSparklineHoverIndex] = useState<number | null>(null);
  const [hoveredBuyer, setHoveredBuyer] = useState<typeof pinnedPurchases[number] | null>(pinnedPurchases[0]);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedInstagramTab, setSelectedInstagramTab] = useState<'Overview' | 'Reels' | 'DMs' | 'Posts'>('Overview');
  const [activeChatPreview, setActiveChatPreview] = useState<'idl-1' | 'idl-2' | 'idl-3' | 'idl-4'>('idl-1');

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
  } | null>(null);

  const handleVideoClick = (item: any, platformVal?: string) => {
    const title = item.title || item.caption || "Content Piece";
    const img = item.img || item.image || "https://i.postimg.cc/pdDTw5dz/Screenshot-2026-05-30-092601.png";
    const platform = (item.platform || platformVal || "YouTube") as 'YouTube' | 'Instagram' | 'X' | 'Reddit';
    
    let viewsStr = item.views ? String(item.views) : "125.4K views";
    let clicksStr = item.clicks ? String(item.clicks) : "+950 clicks";
    
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const impValue = Math.floor((hash % 400) + 120) + "K";
    const ctrValue = ((hash % 8) + 6.2).toFixed(1) + "%";
    const watchValue = Math.floor((hash % 4) + 2) + "m " + Math.floor((hash % 45) + 10) + "s";
    const rotVal = Math.floor((hash % 20) + 55) + "%";
    
    const callsValue = item.calls || Math.floor((hash % 80) + 45);
    const revenueValue = item.sales || ("$" + (Math.floor(hash % 50) + 15) * 1000).toLocaleString();
    
    const firstPct = Math.floor((hash % 30) + 40);
    const secondPct = Math.floor((hash % 20) + 20);
    const thirdPct = 100 - firstPct - secondPct;

    const sources = [
      { name: platform === 'YouTube' ? 'Home Suggested' : 'Feed Explore', pct: firstPct },
      { name: platform === 'YouTube' ? 'Search Keyword' : 'Direct Checkout', pct: secondPct },
      { name: 'External Link Tap', pct: thirdPct }
    ];

    const timestampVal = platform === 'YouTube' 
      ? `Timestamp redirect at 1:${Math.floor((hash % 40) + 10)} triggered calendly spike (+380% retainer)`
      : `Sticker checkout link tap spiked conversion during hour ${Math.floor((hash % 8) + 2)}`;

    const retentionPoints = `M 0 15 C 60 20, 100 45, 140 38 C 160 30, 180 50, 240 55 C 270 58, 290 62, 300 65`;

    setActiveVideoModal({
      title,
      views: viewsStr,
      clicks: clicksStr,
      img,
      platform,
      impressions: impValue,
      ctr: ctrValue,
      averageWatchTime: watchValue,
      retentionRate: rotVal,
      callsBooked: callsValue,
      salesAttributed: revenueValue,
      audienceGender: hash % 2 === 0 ? "72% Men • 28% Women" : "61% Women • 39% Men",
      trafficSources: sources,
      hookTimestamp: timestampVal,
      retentionPoints
    });
  };

  useEffect(() => {
    const storedName = localStorage.getItem('track1on1_demo_fullname');
    if (storedName) {
      setUserName(storedName.split(' ')[0]);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sparkline values representing revenue flow
  const sparklineValues = {
    Overview: [9800, 11200, 10400, 12100, 13400, 12900, 14200],
    YouTube: [4100, 4800, 4400, 5200, 6100, 5800, 6900],
    Instagram: [3900, 4200, 4000, 4600, 5100, 4850, 5300],
    X: [1100, 1400, 1300, 1605, 1800, 1750, 1950],
    Reddit: [700, 800, 700, 950, 1100, 1050, 1150]
  };

  const sparklineLabels = ['May 25', 'May 26', 'May 27', 'May 28', 'May 29', 'May 30', 'May 31'];

  // High converting posts utilizing exact requested post screenshots
  const highConvertingPosts = [
    {
      id: 'post-1',
      platform: 'Instagram',
      caption: 'My $3,000/mo raw tech stack outline revealed...',
      clicks: 14250,
      calls: 684,
      sales: '$52,400',
      rate: '4.8%',
      image: 'https://i.postimg.cc/Mpfg5h64/Screenshot-2026-05-31-143755.png'
    },
    {
      id: 'post-2',
      platform: 'YouTube',
      caption: 'How I built an AI agents startup under 48 hours',
      clicks: 18920,
      calls: 1020,
      sales: '$112,000',
      rate: '5.3%',
      image: 'https://i.postimg.cc/CMZ102dd/Screenshot-2026-05-29-222330.png'
    },
    {
      id: 'post-3',
      platform: 'YouTube',
      caption: '10 structural conversion frameworks for creators...',
      clicks: 12440,
      calls: 642,
      sales: '$45,150',
      rate: '5.1%',
      image: 'https://i.postimg.cc/ZY9RmQ0Y/Screenshot-2026-05-29-222253.png'
    },
    {
      id: 'post-4',
      platform: 'YouTube',
      caption: 'Why SaaS tools fail without tracking content pipeline...',
      clicks: 11200,
      calls: 512,
      sales: '$38,400',
      rate: '4.5%',
      image: 'https://i.postimg.cc/7PC64Rb4/Screenshot-2026-05-29-203644.png'
    }
  ];

  // VSL Activities logs
  const vslRecentActivities = [
    { id: 'vsl-1', user: 'Someone in Austin, TX', event: 'Completed 100% video view', extra: 'Booked Call directly', time: '2m ago' },
    { id: 'vsl-2', user: 'Someone in London, UK', event: 'Clicked CTA button at 5m 12s', extra: 'Forms submitted', time: '12m ago' },
    { id: 'vsl-3', user: 'Someone in Tokyo, JP', event: 'Started watching VSL', extra: 'Referrer: YouTube Timestamp', time: '22m ago' },
    { id: 'vsl-4', user: 'Someone in Munich, DE', event: 'Completed 85% of VSL', extra: 'Checkout initiated', time: '1h ago' }
  ];

  const currentStats = platformStats[selectedPlatform][selectedDateRange];
  const { points, linePath, fillPath, shapeName, shapeDesc } = getGraphData(selectedPlatform, selectedDateRange);

  return (
    <div className="min-h-screen w-full bg-[#fafaf9] text-zinc-800 font-sans antialiased flex relative overflow-hidden selection:bg-amber-100 selection:text-amber-950">
      
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute top-0 right-0 w-[45rem] h-[35rem] bg-gradient-to-br from-amber-100/50 to-indigo-50/20 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-12 left-12 w-[35rem] h-[35rem] bg-gradient-to-br from-amber-50/30 to-rose-50/20 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* DEMO BANNER */}
      <div className="absolute top-0 left-0 right-0 bg-zinc-900 py-2 px-4 text-center text-[10px] font-mono font-bold text-zinc-200 z-50 flex items-center justify-center gap-2 shadow-sm border-b border-zinc-800">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="tracking-widest uppercase text-white">SANDBOX PREVIEW DASHBOARD • LIGHT MODE ACTIVE</span>
        <button 
          onClick={onBackToLanding}
          className="ml-4 px-2 py-0.5 rounded bg-zinc-800 text-zinc-205 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer text-[9px] uppercase font-bold tracking-widest border border-zinc-700"
        >
          Back to landing
        </button>
      </div>

      {/* FIXED SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white/80 backdrop-blur-xl border-r border-zinc-200 p-6 shrink-0 h-screen sticky top-0 z-40 select-none">
        <div className="flex items-center gap-2 pb-6 mt-8">
          <span className="text-[#b45309] font-serif italic text-xl font-bold">Track</span>
          <img 
            src="https://i.postimg.cc/fkQJM3ns/track1on1-logo-pngfdfdf.png" 
            alt="Track1on1 Logo" 
            className="h-6 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-[9px] font-mono font-bold tracking-widest text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded ml-auto uppercase border border-amber-200">
            DEMO
          </span>
        </div>

        <div className="flex-1 space-y-7 mt-4">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-extrabold block px-3">
              Dashboard Core
            </span>
            <nav className="space-y-1">
              {[
                { name: 'Attribution Overview', icon: LayoutDashboard },
                { name: 'Conversion Engines', icon: Video },
                { name: 'Buyer Profiler', icon: Users },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = item.name === 'Attribution Overview';
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (!isActive) {
                        triggerToast(`Attribution view only available in live sandbox preview.`);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all group cursor-pointer ${
                      isActive 
                        ? 'bg-amber-50 text-amber-900 border border-amber-200/60 shadow-sm' 
                        : 'text-zinc-550 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={15} className={isActive ? 'text-[#b45309]' : 'text-zinc-400 group-hover:text-zinc-750'} />
                      <span>{item.name}</span>
                    </div>
                    {!isActive && <Lock size={11} className="text-zinc-400" />}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 font-extrabold block px-3">
              Developer Settings
            </span>
            <nav className="space-y-1">
              <button
                onClick={() => triggerToast(`Integrations flow is configured and locked for this model session.`)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent transition-all cursor-pointer"
              >
                <Smartphone size={15} className="text-zinc-400" />
                <span>Track Connections</span>
                <Lock size={11} className="ml-auto text-zinc-400" />
              </button>
              <button
                onClick={() => triggerToast(`Settings view requires active API billing setup.`)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent transition-all cursor-pointer"
              >
                <Settings size={15} className="text-zinc-400" />
                <span>Instance Settings</span>
                <Lock size={11} className="ml-auto text-zinc-400" />
              </button>
            </nav>
          </div>
        </div>

        {/* Footer actions inside sidebar */}
        <div className="mt-auto border-t border-zinc-200 pt-4">
          <button 
            onClick={onBackToLanding}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-zinc-50 hover:bg-[#eaeae7] border border-zinc-200 rounded-lg text-xs font-mono font-bold text-zinc-650 hover:text-zinc-900 transition-all cursor-pointer"
          >
            ← Exit Sandbox
          </button>
          <div className="flex items-center gap-2 mt-4 px-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase leading-none">Track Node: online</p>
          </div>
        </div>
      </aside>

      {/* MOBILE SIDEBAR PANEL */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute left-0 top-0 bottom-0 w-64 bg-[#fafaf9] border-r border-zinc-200 p-6 flex flex-col z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <span className="text-[#b45309] font-serif italic text-xl font-bold">Track</span>
                  <img 
                    src="https://i.postimg.cc/fkQJM3ns/track1on1-logo-pngfdfdf.png" 
                    alt="Track1on1 Logo" 
                    className="h-6 w-auto object-contain"
                  />
                </div>
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-full border border-zinc-200 bg-zinc-150 flex items-center justify-center font-bold text-xs hover:bg-zinc-200 text-zinc-850"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6 mt-6 flex-1">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 block px-3 font-extrabold mb-1">
                    Dashboard Core
                  </span>
                  {['Attribution Overview', 'Conversion Engines', 'Buyer Profiler'].map((name, i) => {
                    const isActive = i === 0;
                    return (
                      <button
                        key={name}
                        onClick={() => {
                          if (!isActive) triggerToast(`Switching tabs is locked in sandbox.`);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-amber-50 text-amber-950 border border-amber-200/50' 
                            : 'text-zinc-550 hover:bg-zinc-100'
                        }`}
                      >
                        <span>{name}</span>
                        {!isActive && <Lock size={11} className="text-zinc-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-auto border-t border-zinc-200 pt-6">
                <button 
                  onClick={onBackToLanding}
                  className="w-full py-3 px-3 bg-zinc-100 border border-zinc-200 text-zinc-750 hover:text-zinc-900 font-mono font-bold text-xs rounded-xl transition-all"
                >
                  ← Close Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DASHBOARD WORKSPACE */}
      <main className="flex-1 min-h-screen flex flex-col z-10 overflow-x-hidden pt-10">
        
        {/* HEADER */}
        <header className="px-6 lg:px-12 py-5 border-b border-zinc-200 flex items-center justify-between bg-white/40 backdrop-blur-md relative select-none">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white border border-zinc-200 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer hover:bg-zinc-50"
            >
              <div className="w-5 h-0.5 bg-zinc-650" />
              <div className="w-5 h-0.5 bg-zinc-650" />
              <div className="w-5 h-0.5 bg-zinc-650" />
            </button>
            <div className="text-left">
              <p className="text-[9px] font-mono text-[#b45309] font-bold tracking-widest uppercase flex items-center gap-1 leading-none">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                PIPELINE SYNCHRONIZED
              </p>
              <h1 className="text-lg lg:text-xl font-bold font-serif italic text-zinc-900 mt-1">
                Good morning, {userName}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotificationDropdown(!showNotificationDropdown);
                  if (notificationCount > 0) setNotificationCount(0);
                }}
                className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-550 hover:text-zinc-900 transition-all cursor-pointer shadow-xs"
              >
                <Bell size={16} />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[8px] font-bold text-white">
                    {notificationCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotificationDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotificationDropdown(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white border border-zinc-200 rounded-xl shadow-2xl p-4 z-50 text-left"
                    >
                      <h4 className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 flex justify-between items-center">
                        <span>Dynamic Events Traced</span>
                        <span className="text-[8px] font-bold text-emerald-600">LIVE</span>
                      </h4>
                      <div className="space-y-3 pt-3">
                        <div className="text-xs space-y-1">
                          <p className="font-bold text-zinc-900 flex items-center justify-between">
                            <span>🛒 Sale Attributed</span>
                            <span className="text-emerald-600 font-mono">+$297.00</span>
                          </p>
                          <p className="text-zinc-500 text-[11px] leading-relaxed">Reel preview triggered VSL view and checkout bypass.</p>
                        </div>
                        <div className="text-xs space-y-1 border-t border-zinc-100 pt-2">
                          <p className="font-bold text-zinc-900 flex items-center justify-between">
                            <span>📞 Call Confirmed</span>
                            <span className="text-amber-700 font-mono">YouTube click</span>
                          </p>
                          <p className="text-zinc-500 text-[11px] leading-relaxed">Video timestamp clicked at 2:34 sparked Calendly action.</p>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-xs text-amber-900 font-mono shadow-xs">
                {userName[0]?.toUpperCase() || 'C'}
              </div>
            </div>
          </div>
        </header>

        {/* FEEDBACK TOASTS */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -20, x: '-50%' }}
              className="fixed top-14 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-white font-mono text-xs rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-md"
            >
              <CheckCircle2 size={13} className="text-[#f59e0b]" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DASHBOARD BODY */}
        <div className="flex-1 p-6 lg:p-12 space-y-8 select-none">
          
          {/* TABS ROW & DATE FILTERS ON TOP OF DASHBOARD */}
          <section className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs select-none">
            
            {/* PLATFORM SELECTION TABS */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {(['Overview', 'YouTube', 'Instagram', 'X', 'Reddit'] as const).map((platform) => {
                const isActive = selectedPlatform === platform;
                return (
                  <button
                    key={platform}
                    onClick={() => {
                      setSelectedPlatform(platform);
                      triggerToast(`Switched channel view directly to ${platform}`);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-zinc-900 text-white shadow-md' 
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    {platform === 'Instagram' && <Instagram size={13} className={isActive ? 'text-pink-400' : 'text-zinc-400'} />}
                    {platform === 'YouTube' && <Youtube size={13} className={isActive ? 'text-red-500' : 'text-zinc-400'} />}
                    {platform === 'X' && <span className="text-[10px] font-mono font-bold">X</span>}
                    {platform === 'Reddit' && <span className="text-[10px] font-mono font-bold">R/</span>}
                    <span>{platform}</span>
                  </button>
                );
              })}
            </div>

            {/* DATE OPTIONS SELECTOR (GLASSY SELECTOR DROPDOWN ON DEMAND) */}
            <div className="relative z-30 flex items-center justify-end">
              <button
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                className="px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-250 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Calendar size={14} className="text-[#b45309]" />
                <span>Range: {dateRangeLabels[selectedDateRange]}</span>
                <span className="text-[10px] bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 text-zinc-500 ml-1">Drop</span>
              </button>

              <AnimatePresence>
                {isDateDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setIsDateDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-11 mt-1 w-48 bg-white border border-zinc-200 rounded-xl shadow-2xl p-1.5 z-30 text-left"
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
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-amber-50 text-amber-900 font-extrabold'
                                : 'text-zinc-650 hover:bg-zinc-50 hover:text-zinc-950'
                            }`}
                          >
                            <span>{dateRangeLabels[r]}</span>
                            {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#b45309]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </section>

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
              {/* FOUR STATISTICS CARDS UNDER OVERVIEW SECTION */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Stat Card 1: Total Link Clicks */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-left relative overflow-hidden shadow-sm hover:border-amber-500/30 transition-all duration-350">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                Total Link Clicks
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-zinc-900 tracking-tight">
                  {currentStats.clicks}
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live click-through tracking
              </p>
            </div>

            {/* Stat Card 2: Forms Filled */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-left relative overflow-hidden shadow-sm hover:border-amber-500/30 transition-all duration-350">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                Forms Filled
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-zinc-900 tracking-tight">
                  {currentStats.forms}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-bold mt-1.5 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400" />
                Waitlist submit events
              </p>
            </div>

            {/* Stat Card 3: Booked Calls */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-left relative overflow-hidden shadow-sm hover:border-amber-500/30 transition-all duration-350">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                Booked Calls
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-zinc-900 tracking-tight">
                  {currentStats.calls}
                </span>
              </div>
              <p className="text-[10px] text-[#b45309] font-bold mt-1.5 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                Calendly API integration
              </p>
            </div>

            {/* Stat Card 4: Sales Made (OVER 7 FIGURES!) */}
            <div className="bg-white border border-amber-200 rounded-2xl p-6 text-left relative overflow-hidden shadow-md hover:border-amber-500/40 transition-all duration-350 bg-gradient-to-br from-white to-amber-50/20">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold tracking-widest text-amber-800 uppercase">
                  Sales Made
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-[#b45309] text-[8px] font-mono font-bold uppercase leading-none border border-amber-200">7-Fig Goal</span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-emerald-700 tracking-tight">
                  {currentStats.sales}
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 mt-1.5 flex items-center gap-1 font-semibold">
                <Sparkles size={11} className="text-amber-500 animate-pulse" />
                Verified outlier attribution
              </p>
            </div>

          </section>

          {/* MAIN GRAPH CARDS PARTITIONS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* MAIN GRAPH CARD (Column Span 8) - TAKES UP MASSIVE HEIGHT SPACE */}
            <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-2xl p-6 relative overflow-visible flex flex-col justify-between shadow-xs hover:border-amber-500/20 transition-all duration-300 min-h-[380px]">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b45309] flex flex-wrap items-center gap-1.5">
                      <span>Attributed Channel Traction Trend ({selectedPlatform})</span>
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-800 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {dateRangeLabels[selectedDateRange]}
                  </span>
                </div>

                <div className="relative pt-2">
                  {/* SVG Sparkline Graph - Height set to transform beautifully to 230px space */}
                  <div className="relative h-[250px] w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 700 220" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="mainGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#d97706" stopOpacity="0.12" />
                          <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="40" x2="700" y2="40" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                      <line x1="0" y1="110" x2="700" y2="110" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                      <line x1="0" y1="180" x2="700" y2="180" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />

                      {/* Path under line */}
                      <path 
                        d={fillPath} 
                        fill="url(#mainGlow)" 
                      />

                      {/* Curve line */}
                      <path 
                        d={linePath} 
                        fill="none" 
                        stroke="#d97706" 
                        strokeWidth="3.2" 
                        strokeLinecap="round" 
                      />

                      {/* Interaction areas */}
                      {points.map((pt, idx) => (
                        <g key={idx}>
                          <circle 
                            cx={pt.x} 
                            cy={pt.y} 
                            r="28" 
                            fill="transparent" 
                            className="cursor-pointer"
                            onMouseEnter={() => setSparklineHoverIndex(idx)}
                            onMouseLeave={() => setSparklineHoverIndex(null)}
                            onClick={() => handleVideoClick(dailyThumbnails[idx % dailyThumbnails.length], selectedPlatform === 'Overview' ? 'YouTube' : selectedPlatform)}
                          />
                        </g>
                      ))}
                    </svg>

                    {/* DYNAMIC OVERLAY HOVER FLOATING VIDEO PREVIEWS ON EACH DAY */}
                    <AnimatePresence>
                      {sparklineHoverIndex !== null && points[sparklineHoverIndex] && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute bg-white border border-zinc-200 rounded-xl p-3 shadow-2xl z-40 w-52 pointer-events-none select-none text-left"
                          style={{
                            left: `${(points[sparklineHoverIndex].x / 700) * 100}%`,
                            top: `${(points[sparklineHoverIndex].y / 220) * 100 - 15}%`,
                            transform: 'translate(-50%, -100%)',
                          }}
                        >
                          <div className="relative w-full h-24 bg-zinc-100 rounded-lg overflow-hidden mb-2 border border-zinc-200 shadow-sm">
                            <img 
                              src={dailyThumbnails[sparklineHoverIndex % dailyThumbnails.length].img} 
                              alt="Daily Creative Content Preview" 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-1.5 left-1.5 bg-red-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm uppercase">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              REEL ATTRIBUTED
                            </div>
                          </div>
                          <p className="text-[11px] font-extrabold text-zinc-905 truncate">
                            {dailyThumbnails[sparklineHoverIndex % dailyThumbnails.length].title}
                          </p>
                          <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-zinc-100 text-[9px] font-mono">
                            <span className="text-zinc-500 font-bold">{dailyThumbnails[sparklineHoverIndex % dailyThumbnails.length].views}</span>
                            <span className="text-[#b45309] font-extrabold">{dailyThumbnails[sparklineHoverIndex % dailyThumbnails.length].clicks}</span>
                          </div>
                          <div className="text-[8px] font-mono text-center text-amber-700 font-bold tracking-wider mt-1.5 uppercase animate-pulse">
                            Click node for detailed analytics ↗
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-between text-[9px] font-mono text-zinc-400 mt-2 font-bold uppercase border-t border-zinc-100 pt-2">
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

            {/* VSL ACTIVITIES PANEL CARD (Column Span 4) */}
            <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-amber-500/20 transition-all duration-300 text-left">
              <div className="space-y-4">
                <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b45309]">
                    Activities on VSL
                  </h3>
                  <span className="text-[8px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-black uppercase">
                    Live Watchers
                  </span>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
                  Track real-time watcher interactions inside your Video Sales Letter funnel.
                </p>

                {/* VSL Core Engagement Metrics */}
                <div className="grid grid-cols-2 gap-2 pb-2">
                  <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold leading-none">VSL Views</p>
                    <p className="text-lg font-black text-zinc-800 mt-1 leading-none">14,805</p>
                  </div>
                  <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold leading-none">CTA Clicks</p>
                    <p className="text-lg font-black text-amber-700 mt-1 leading-none">3,124</p>
                  </div>
                </div>

                {/* Live stream list of watcher activities */}
                <div className="space-y-2.5 pt-1 overflow-y-auto max-h-40 pr-0.5">
                  {vslRecentActivities.map((act) => (
                    <div key={act.id} className="text-xs border-l-2 border-amber-500 pl-2.5 py-1">
                      <div className="flex items-center justify-between font-bold text-zinc-800 leading-none">
                        <span className="text-[11px] truncate max-w-[150px]">{act.user}</span>
                        <span className="text-[9px] font-mono text-zinc-400 font-semibold">{act.time}</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] mt-0.5 font-semibold leading-normal">{act.event}</p>
                      <span className="text-[9.5px] font-mono text-amber-705 font-bold block mt-px">{act.extra}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>

          {/* HIGH-CONVERSION POSTS ROW */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* POSTS BRINGING HIGH CONVERSION METRICS (Column Span 8) */}
            <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs hover:border-amber-500/20 transition-all duration-300 text-left">
              <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b45309]">
                    High-Converting Posts list
                  </h3>
                  <p className="text-[11px] text-zinc-505 font-semibold mt-1 font-sans">
                    Content pieces that generated maximum waitlist submits, links tap, and calls confirmed
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[8.5px] font-mono font-black uppercase text-[#b45309] bg-amber-50 border border-amber-200 rounded-md">
                  Outlier Content
                </span>
              </div>

              {/* Minimal Clean Posts Table */}
              <div className="overflow-x-auto mt-4 select-none">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
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
                        <td className="py-3">
                          <div className="w-16 h-11 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 relative shadow-inner shrink-0 group-hover:border-amber-500/50 transition-all">
                            <img 
                              src={post.image} 
                              alt="Post screen presentation preview" 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all flex items-center justify-center">
                              <span className="w-5 h-5 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">
                                <Play size={8} className="fill-amber-700 text-amber-700 ml-0.5" />
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 max-w-[220px]">
                          <p className="font-extrabold text-zinc-900 leading-snug line-clamp-1 group-hover:text-amber-800 transition-colors">
                            {post.caption}
                          </p>
                          <span className="text-[10px] font-mono text-zinc-500 font-bold block mt-0.5 uppercase tracking-wide">
                            {post.platform} • CTA {post.rate}
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono font-bold text-zinc-600">
                          {post.clicks.toLocaleString()}
                        </td>
                        <td className="py-3 text-right font-mono font-bold text-amber-705 text-amber-700">
                          {post.calls}
                        </td>
                        <td className="py-3 text-right font-mono font-black text-emerald-700">
                          {post.sales}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BUYERS MAP LIVE PLANET TRACKER (Column Span 4) */}
            <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs hover:border-amber-500/20 transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between min-h-[420px]">
              <div className="space-y-4">
                <div className="border-b border-zinc-100 pb-2 flex items-center gap-2">
                  <Globe size={14} className="text-[#b45309]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b45309]">
                    Buyers Map
                  </h3>
                </div>

                <p className="text-xs text-zinc-505 text-zinc-500 leading-relaxed font-semibold">
                  Buyer footprints pinned dynamically across global visual coordinates. Hover countries to inspect.
                </p>

                {/* VISUAL GLOBE INNER CONTAINER */}
                <div className="relative w-full h-[180px] bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center select-none group">
                  
                  {/* Google Maps Earth Real Background Image */}
                  <img 
                    src="https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/08/07/Photos/Home%20Page/Gogle%20maps%20earth-kJdF--621x414@LiveMint.png" 
                    alt="Google Earth Global View" 
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none rounded-xl" />

                  {/* Absolute Radar Scanner Overlay Sweep */}
                  <div className="absolute inset-0 bg-transparent pointer-events-none overflow-hidden rounded-xl">
                    <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-amber-500/10 to-transparent -translate-x-full animate-pulse" style={{ transform: 'skewX(-20deg)', animationDuration: '4s' }} />
                  </div>

                  {/* Buyer pins overlaid on top of the globe container */}
                  {pinnedPurchases.map((buyer) => {
                    const isHovered = hoveredBuyer?.id === buyer.id;
                    return (
                      <div
                        key={buyer.id}
                        className="absolute cursor-pointer transition-transform duration-200 hover:scale-125 z-20"
                        style={{ left: buyer.x, top: buyer.y }}
                        onMouseEnter={() => setHoveredBuyer(buyer)}
                      >
                        {/* Pulse circle */}
                        <span className="absolute -inset-2 rounded-full animate-ping bg-[#b45309] opacity-35" />
                        
                        {/* Custom Pin Thumbnail */}
                        <div className={`relative w-8 h-8 rounded-full border shadow-md flex items-center justify-center transition-all duration-200 ${
                          isHovered 
                            ? 'scale-115 border-amber-500 bg-amber-500/20 shadow-md shadow-amber-500/20' 
                            : 'border-zinc-300 bg-white shadow-xs'
                        }`}>
                          <img 
                            src={buyer.pinIconUrl} 
                            alt={`${buyer.name} Pin Location`} 
                            className="w-full h-full object-contain pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    );
                  })}

                </div>

                {/* SHOW PERSON WHO BOUGHT DETAILS CARD */}
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl min-h-[96px] flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-zinc-150 pb-1.5">
                    <div className="flex items-center gap-2">
                      <img 
                        src={hoveredBuyer?.pinIconUrl} 
                        alt="Pin Icon" 
                        className="w-6 h-6 rounded-full object-contain border border-zinc-200 bg-white"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 flex-wrap">
                          <span>{hoveredBuyer?.name || "Global Buyer"}</span>
                          <span className="text-[10px] font-normal text-zinc-555">({hoveredBuyer?.flag} {hoveredBuyer?.country})</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-bold uppercase shrink-0">
                      verified client
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] pt-1.5 text-zinc-650 font-semibold">
                    <div>
                      <span className="block font-mono tracking-wider uppercase text-[8px] text-zinc-500 leading-none font-bold">Origin country</span>
                      <span className="font-extrabold text-zinc-805 text-zinc-800 mt-0.5 block">{hoveredBuyer?.country}</span>
                    </div>
                    <div>
                      <span className="block font-mono tracking-wider uppercase text-[8px] text-zinc-500 leading-none font-bold">Attributed Value</span>
                      <span className="font-extrabold text-emerald-700 mt-0.5 block">{hoveredBuyer?.amount} USD</span>
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-zinc-150 mt-1.5 flex items-center justify-between text-[9.5px]">
                    <span className="text-zinc-500 font-mono italic leading-none font-semibold">{hoveredBuyer?.time}</span>
                    <span className="text-zinc-700 font-extrabold leading-none truncate max-w-[150px]">{hoveredBuyer?.item}</span>
                  </div>
                </div>

              </div>

              {/* OUTBOARD LINK FIELD */}
              <div className="pt-4 border-t border-zinc-250 mt-4">
                <a 
                  href="https://earth.google.com/web/@14.79304048,25.61321376,0a,22243320.54403788d,35y,360h,0t,0r/data=CgRCAggCOgMKATBCAggASg0I____________ARAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 text-zinc-800 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider transition-all"
                >
                  <Globe size={11} className="text-[#b45309]" />
                  <span>Interactive Buyers Map</span>
                  <ArrowUpRight size={11} className="text-zinc-500" />
                </a>
              </div>
            </div>

          </section>
            </>
          )}

        </div>

      </main>

      {/* DETAILED VIDEO/REEL ANALYTICS MODAL */}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-white border border-zinc-200 rounded-3xl p-6 lg:p-8 max-w-2xl w-full z-10 max-h-[90vh] overflow-y-auto text-left flex flex-col gap-6 shadow-2xl select-none"
            >
              {/* Header section with closing click */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  {activeVideoModal.platform === 'YouTube' ? (
                    <span className="flex items-center gap-1 bg-red-50 text-red-700 text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-red-100 uppercase">
                      <Youtube size={12} className="fill-red-600 text-red-600" />
                      YouTube Ad / VSL
                    </span>
                  ) : activeVideoModal.platform === 'Instagram' ? (
                    <span className="flex items-center gap-1 bg-pink-50 text-pink-700 text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-pink-100 uppercase">
                      <Instagram size={12} className="text-pink-600" />
                      Instagram Reel
                    </span>
                  ) : activeVideoModal.platform === 'X' ? (
                    <span className="flex items-center gap-1 bg-zinc-50 text-zinc-700 text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-zinc-200 uppercase">
                      <span className="font-sans font-bold text-[10px]">X</span>
                      Micro Hook
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-mono font-bold px-2 py-1 rounded-md border border-amber-200 uppercase">
                      <span className="font-sans font-bold text-[10px]">r/</span>
                      Reddit Thread
                    </span>
                  )}
                  <span className="text-[10px] font-mono font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 uppercase animate-pulse">
                    Live Traced
                  </span>
                </div>
                
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Title, Views & Basic info */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-zinc-50 border border-zinc-200/50 p-4 rounded-2xl">
                <div className="w-24 h-32 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 relative shrink-0 flex items-center justify-center p-1">
                  <img 
                    src={activeVideoModal.img} 
                    alt={activeVideoModal.title} 
                    className="h-full w-full object-contain mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 overflow-hidden">
                  <h3 className="font-serif italic font-bold text-zinc-900 text-sm lg:text-base leading-tight truncate">
                    {activeVideoModal.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-mono font-bold text-zinc-500">
                    {activeVideoModal.platform !== 'Instagram' && (
                      <span className="flex items-center gap-1">
                        <Eye size={12} className="text-zinc-400" />
                        {activeVideoModal.views}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[#b45309]">
                      <MousePointerClick size={12} className="text-zinc-400" />
                      {activeVideoModal.clicks}
                    </span>
                  </div>
                </div>
              </div>

              {/* Core Analytics Metrics Grid: Adjusted based on platform to strictly hide organic variables for Instagram */}
              {activeVideoModal.platform === 'Instagram' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-white border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold leading-none flex items-center gap-1">
                      <Send size={10} className="text-zinc-400" /> Traced DMs Sent
                    </p>
                    <p className="text-lg font-black text-zinc-800 mt-2 leading-none">Live Connected</p>
                  </div>

                  <div className="p-3.5 bg-white border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-[#b45309] font-bold leading-none flex items-center gap-1">
                      <MousePointerClick size={10} className="text-[#b45309]" /> Clicks (Link Taps)
                    </p>
                    <p className="text-lg font-black text-[#b45309] mt-2 leading-none">{activeVideoModal.clicks}</p>
                  </div>

                  <div className="p-3.5 bg-white border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-indigo-700 font-bold leading-none flex items-center gap-1">
                      <Calendar size={10} className="text-indigo-600" /> Forms Completed
                    </p>
                    <p className="text-lg font-black text-indigo-900 mt-2 leading-none">{activeVideoModal.callsBooked}</p>
                  </div>

                  <div className="p-3.5 bg-emerald-50/20 border border-emerald-250 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-emerald-700 font-bold leading-none flex items-center gap-1">
                      <Sparkles size={10} className="text-emerald-650" /> Cash Collected
                    </p>
                    <p className="text-lg font-black text-emerald-800 mt-2 leading-none">{activeVideoModal.salesAttributed}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold leading-none flex items-center gap-1">
                      <Eye size={10} className="text-zinc-400" /> Impressions
                    </p>
                    <p className="text-lg font-black text-zinc-800 mt-1.5 leading-none">{activeVideoModal.impressions}</p>
                  </div>

                  <div className="p-3 bg-white border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-[#b45309] font-bold leading-none flex items-center gap-1">
                      <TrendingUp size={10} className="text-[#b45309]" /> Click Rate (CTR)
                    </p>
                    <p className="text-lg font-black text-[#b45309] mt-1.5 leading-none">{activeVideoModal.ctr}</p>
                  </div>

                  <div className="p-3 bg-white border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold leading-none flex items-center gap-1">
                      <MousePointerClick size={10} className="text-zinc-400" /> Link Taps
                    </p>
                    <p className="text-lg font-black text-zinc-800 mt-1.5 leading-none">{activeVideoModal.clicks}</p>
                  </div>

                  <div className="p-3 bg-white border border-zinc-200 rounded-xl">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 font-bold leading-none flex items-center gap-1">
                      <Radio size={10} className="text-zinc-400" /> Watch Retention
                    </p>
                    <p className="text-sm font-black text-zinc-800 mt-1.5 leading-none">
                      {activeVideoModal.retentionRate} <span className="text-[10px] text-zinc-500 font-medium">({activeVideoModal.averageWatchTime})</span>
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-zinc-200 rounded-xl bg-amber-50/10 hover:bg-amber-50/20 transition-all">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-amber-800 font-bold leading-none flex items-center gap-1">
                      <Calendar size={10} className="text-amber-600" /> Calls Booked
                    </p>
                    <p className="text-lg font-black text-amber-900 mt-1.5 leading-none">{activeVideoModal.callsBooked}</p>
                  </div>

                  <div className="p-3 bg-emerald-50/10 border border-emerald-200 rounded-xl hover:bg-emerald-50/20 transition-all">
                    <p className="text-[9px] font-mono uppercase tracking-wider text-emerald-700 font-bold leading-none flex items-center gap-1">
                      <Sparkles size={10} className="text-emerald-650 animate-pulse" /> Outlier Revenue
                    </p>
                    <p className="text-lg font-black text-emerald-700 mt-1.5 leading-none">{activeVideoModal.salesAttributed}</p>
                  </div>
                </div>
              )}

              {/* Graphical Video Retention Curve - By-passed completely for Instagram */}
              {activeVideoModal.platform !== 'Instagram' && (
                <div className="p-4 bg-zinc-50/60 border border-zinc-200 rounded-2xl flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#b45309] font-bold">
                      VSL retention Curve (%)
                    </span>
                    <span className="text-[8.5px] font-mono text-zinc-400 font-bold bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-250">
                      Average: {activeVideoModal.retentionRate}
                    </span>
                  </div>

                  <div className="relative h-24 w-full bg-white border border-zinc-200/60 rounded-xl overflow-hidden p-2 flex items-center">
                    {/* Grid Lines in background of curve */}
                    <div className="absolute inset-x-0 top-1/4 border-t border-zinc-100 border-dashed" />
                    <div className="absolute inset-x-0 top-1/2 border-t border-zinc-100 border-dashed" />
                    <div className="absolute inset-x-0 top-3/4 border-t border-zinc-100 border-dashed" />
                    
                    {/* Vector SVG Path of Retention */}
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <path 
                        d={activeVideoModal.retentionPoints}
                        fill="none" 
                        stroke="#d97706" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                      />
                      {/* Fill underneath */}
                      <path 
                        d={`${activeVideoModal.retentionPoints} L 300 100 L 0 100 Z`}
                        fill="rgba(217, 119, 6, 0.04)" 
                      />
                      
                      {/* Tiny spike dots */}
                      <circle cx="140" cy="38" r="4" fill="#b45309" className="animate-ping" />
                      <circle cx="140" cy="38" r="3" fill="#b45309" />
                    </svg>
                    
                    {/* Side markers */}
                    <span className="absolute left-2.5 top-1.5 text-[7px] font-mono text-zinc-400 font-bold">100%</span>
                    <span className="absolute left-2.5 bottom-1.5 text-[7px] font-mono text-zinc-400 font-bold">0%</span>
                    <span className="absolute right-2.5 bottom-1.5 text-[7px] font-mono text-zinc-400 font-bold pb-px bg-zinc-50 px-1 border border-zinc-150 rounded leading-none">End of ad</span>
                  </div>

                  {/* Event timestamp callout information */}
                  <div className="text-[10px] font-mono bg-amber-50/40 border border-amber-200/50 p-2.5 rounded-xl text-amber-950 flex items-start gap-2">
                    <Flame size={12} className="text-amber-700 shrink-0 mt-0.5 animate-pulse" />
                    <p className="leading-relaxed font-semibold">
                      <span className="font-extrabold uppercase text-amber-900 border-r border-amber-200 pr-1.5 mr-1.5">Outlier Event Traced</span>
                      {activeVideoModal.hookTimestamp}
                    </p>
                  </div>
                </div>
              )}

              {/* Traffic sources share & Audience summary - By-passed completely for Instagram */}
              {activeVideoModal.platform !== 'Instagram' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Traffic Channels Share</h4>
                    <div className="space-y-2.5 pt-1">
                      {activeVideoModal.trafficSources.map((source, sIdx) => (
                        <div key={sIdx} className="space-y-1 select-none">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-zinc-600 font-bold">{source.name}</span>
                            <span className="font-mono font-black text-zinc-800">{source.pct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                sIdx === 0 ? 'bg-amber-500' : sIdx === 1 ? 'bg-indigo-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${source.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-50/60 border border-zinc-200 rounded-2xl flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Audience Demographics</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed font-semibold mt-1">
                        Primary viewership cohort for this creative template.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-2 border-t border-zinc-200/60 text-[11px] text-zinc-750 font-bold">
                      <Users size={14} className="text-amber-800 shrink-0" />
                      <span>{activeVideoModal.audienceGender}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom dismissal */}
              <div className="pt-4 border-t border-zinc-100 flex justify-end">
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-5 py-2.5 bg-zinc-900 border border-transparent hover:bg-zinc-800 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Close Analytics popout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
