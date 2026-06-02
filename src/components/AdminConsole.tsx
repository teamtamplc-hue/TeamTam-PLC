import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Calendar, 
  Instagram, 
  Youtube, 
  Twitter, 
  Globe, 
  DollarSign, 
  Filter, 
  Download, 
  Briefcase, 
  ShieldAlert, 
  TrendingUp, 
  Mail, 
  Phone,
  Layers,
  ChevronDown,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';

interface CreatorLead {
  id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  platforms: string[];
  instagramUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  monthlyRevenue: string;
  selectedTier: string;
  createdAt?: any;
  updatedAt?: any;
}

interface AdminConsoleProps {
  onBack: () => void;
  key?: React.Key;
}

export default function AdminConsole({ onBack }: AdminConsoleProps) {
  const [leads, setLeads] = useState<CreatorLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [revenueFilter, setRevenueFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    // Realtime listener for waitlist signups
    setLoading(true);
    setError(null);
    const q = query(collection(db, 'waitlist'), orderBy('updatedAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: CreatorLead[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          fullName: data.fullName || '',
          email: data.email || '',
          countryCode: data.countryCode || '',
          phoneNumber: data.phoneNumber || '',
          platforms: data.platforms || [],
          instagramUrl: data.instagramUrl,
          youtubeUrl: data.youtubeUrl,
          twitterUrl: data.twitterUrl,
          monthlyRevenue: data.monthlyRevenue || '',
          selectedTier: data.selectedTier || '',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      });
      setLeads(items);
      setLoading(false);
    }, (err) => {
      console.error("Firestore loading rejected for admin:", err);
      setError("Permission denied or connection failure. Only teamtamplc@gmail.com holds authorized administrative clearance.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onBack();
    } catch (err) {
      console.error("Sign out fail:", err);
    }
  };

  // Stats calculators
  const totalLeads = leads.length;
  
  const platformsBreakdown = leads.reduce((acc, lead) => {
    lead.platforms.forEach(p => {
      acc[p] = (acc[p] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const tierBreakdown = leads.reduce((acc, lead) => {
    const tier = lead.selectedTier || 'none';
    acc[tier] = (acc[tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const revenueBreakdown = leads.reduce((acc, lead) => {
    const rev = lead.monthlyRevenue || 'Unselected';
    acc[rev] = (acc[rev] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Handle Export / Download Action
  const triggerExport = () => {
    setExporting(true);
    try {
      const jsonStr = JSON.stringify(leads, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `track1on1_waitlist_leads_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setExporting(false), 800);
    }
  };

  // Filters logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phoneNumber.includes(searchTerm);
      
    const matchesPlatform = platformFilter === 'all' || lead.platforms.includes(platformFilter);
    const matchesRevenue = revenueFilter === 'all' || lead.monthlyRevenue === revenueFilter;
    
    return matchesSearch && matchesPlatform && matchesRevenue;
  }).sort((a, b) => {
    const dateA = a.updatedAt?.seconds || 0;
    const dateB = b.updatedAt?.seconds || 0;
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div id="admin-dashboard-container" className="min-h-screen bg-[#fafaf8] text-zinc-900 font-sans selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden antialiased">
      {/* Top Header Panel */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-b border-zinc-200/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 text-zinc-500 hover:text-zinc-950 transition-colors bg-white hover:bg-zinc-100 border border-zinc-200/60 rounded-lg shadow-2xs cursor-pointer shrink-0"
            title="Back to Landing"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-sans font-black text-lg tracking-tight uppercase text-zinc-950">Track 1on1 HQ</h1>
            </div>
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Admin Lead Console</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-sans font-bold text-zinc-900">teamtamplc@gmail.com</span>
            <span className="font-mono text-[9px] bg-emerald-100 text-emerald-800 font-bold uppercase py-0.5 px-1.5 rounded">Owner</span>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-rose-600 transition-colors bg-white hover:bg-zinc-100 border border-zinc-200/60 px-3 py-1.5 rounded-lg text-xs font-mono uppercase font-bold shadow-2xs cursor-pointer"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {error ? (
          <div className="p-8 max-w-xl mx-auto text-center border border-rose-200/90 bg-rose-50/20 rounded-2xl shadow-xs space-y-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-800 rounded-full flex items-center justify-center mx-auto shadow-3xs">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h2 className="font-sans font-bold text-sm text-zinc-950">Administrative Clearance Required</h2>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
                {error}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-white font-mono text-[11px] uppercase tracking-widest font-bold rounded-lg cursor-pointer transition-transform active:scale-95"
            >
              Sign in with administrative account
            </button>
          </div>
        ) : (
          <>
            {/* Visual Stats Widgets Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Stat 1: Total Leads */}
              <motion.div 
                className="bg-white border border-zinc-200/70 rounded-2xl p-6 shadow-3xs relative overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 text-zinc-950">
                  <Users size={70} />
                </div>
                <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Total Creator Submissions</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-extrabold text-zinc-950 tracking-tight">{totalLeads}</span>
                  <span className="text-xs font-mono text-emerald-600 font-extrabold uppercase bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <TrendingUp size={11} /> +100%
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-2 font-medium">Waitlisted and verified via Google Auth</p>
              </motion.div>

              {/* Stat 2: Platforms Mix */}
              <motion.div 
                className="bg-white border border-zinc-200/70 rounded-2xl p-6 shadow-3xs relative"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Platforms Segment</p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-650">
                      <Instagram size={13} className="text-pink-650" />
                      <span>Instagram</span>
                    </div>
                    <span className="font-mono font-bold text-zinc-850">{platformsBreakdown['Instagram'] || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-650">
                      <Youtube size={13} className="text-red-650" />
                      <span>YouTube</span>
                    </div>
                    <span className="font-mono font-bold text-zinc-850">{platformsBreakdown['YouTube'] || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-650">
                      <Twitter size={13} className="text-sky-650" />
                      <span>Twitter / X</span>
                    </div>
                    <span className="font-mono font-bold text-zinc-850">{platformsBreakdown['Twitter / X'] || 0}</span>
                  </div>
                </div>
              </motion.div>

              {/* Stat 3: Top Tier */}
              <motion.div 
                className="bg-white border border-zinc-200/70 rounded-2xl p-6 shadow-3xs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Plan Interest Mix</p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-650 font-medium">✨ Pro Plan ($49/mo)</span>
                    <span className="font-mono font-bold text-zinc-950">{tierBreakdown['pro'] || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-650 font-medium">⚡ Max Plan ($149/mo)</span>
                    <span className="font-mono font-bold text-zinc-950">{tierBreakdown['max'] || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-650 font-medium">🏢 Agency ($449/mo)</span>
                    <span className="font-mono font-bold text-zinc-950">{tierBreakdown['agency'] || 0}</span>
                  </div>
                </div>
              </motion.div>

              {/* Stat 4: Revenue Tier */}
              <motion.div 
                className="bg-white border border-zinc-200/70 rounded-2xl p-6 shadow-3xs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Creators Revenue Profile</p>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-650 font-medium">🚀 Under $5,000/mo</span>
                    <span className="font-mono font-bold text-zinc-950">{revenueBreakdown['less-5k'] || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-650 font-medium">💥 $5,000 - $25,000/mo</span>
                    <span className="font-mono font-bold text-zinc-950">{revenueBreakdown['5k-25k'] || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-650 font-medium">👑 Over $25,000/mo</span>
                    <span className="font-mono font-bold text-zinc-950">{revenueBreakdown['over-25k'] || 0}</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Leads Listing area with Filters */}
            <div className="bg-white border border-zinc-200/70 rounded-2xl shadow-xs overflow-hidden">
              
              {/* Filters / Action Toolbar */}
              <div className="p-5 border-b border-zinc-150/60 bg-zinc-50/30 flex flex-col lg:flex-row gap-4 items-center justify-between">
                
                {/* Search Bar */}
                <div className="relative w-full lg:max-w-xs shrink-0">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-zinc-200 hover:border-zinc-300 focus:border-zinc-500 focus:outline-hidden rounded-xl transition-all font-medium font-sans"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto lg:justify-end">
                  
                  {/* Filter by Platform */}
                  <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-xl text-xs font-medium">
                    <Filter size={12} className="text-zinc-400" />
                    <select
                      value={platformFilter}
                      onChange={(e) => setPlatformFilter(e.target.value)}
                      className="bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value="all">All Platforms</option>
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Twitter / X">Twitter / X</option>
                    </select>
                  </div>

                  {/* Filter by Revenue */}
                  <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-xl text-xs font-medium">
                    <Briefcase size={12} className="text-zinc-400" />
                    <select
                      value={revenueFilter}
                      onChange={(e) => setRevenueFilter(e.target.value)}
                      className="bg-transparent focus:outline-hidden cursor-pointer"
                    >
                      <option value="all">All Revenues</option>
                      <option value="less-5k">Under $5k/mo</option>
                      <option value="5k-25k">$5k - $25k/mo</option>
                      <option value="over-25k">Over $25k/mo</option>
                    </select>
                  </div>

                  {/* Sorting order */}
                  <button
                    onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                    className="bg-white border border-zinc-200 px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1 cursor-pointer hover:border-zinc-350"
                  >
                    Date {sortOrder === 'desc' ? '▼ NEW' : '▲ OLD'}
                  </button>

                  <div className="h-6 w-px bg-zinc-250 mx-1 hidden sm:block" />

                  {/* Export Lead Signups */}
                  <button
                    onClick={triggerExport}
                    disabled={exporting || filteredLeads.length === 0}
                    className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-900/5 px-4 py-2 text-white font-mono uppercase text-[10px] tracking-widest font-bold rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer transition-transform active:scale-95 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
                  >
                    <Download size={12} />
                    {exporting ? 'Exporting...' : 'Export JSON'}
                  </button>
                  
                </div>

              </div>

              {/* Real Table */}
              {loading ? (
                <div className="py-24 text-center space-y-3">
                  <RefreshCw size={24} className="animate-spin text-amber-700 mx-auto" />
                  <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-extrabold">Synchronizing Firestore Database...</p>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="font-sans font-bold text-zinc-450 text-sm">No matching creators found.</p>
                  <p className="text-xs text-zinc-400 mt-1">Try modifying your search queries or filter selections.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-150 text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-extrabold">
                        <th className="py-3.5 px-6 font-bold">Creator Name</th>
                        <th className="py-3.5 px-6 font-bold">Contact Details</th>
                        <th className="py-3.5 px-6 font-bold">Primary Platforms</th>
                        <th className="py-3.5 px-6 font-bold">Monthly Revenue</th>
                        <th className="py-3.5 px-6 font-bold">Selected Tier</th>
                        <th className="py-3.5 px-6 font-bold">Registered On</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-xs">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-zinc-50/50 transition-colors">
                          {/* Name Block */}
                          <td className="py-4.5 px-6 font-sans font-bold text-zinc-900">
                            <div className="space-y-0.5">
                              <span>{lead.fullName}</span>
                              <span className="font-mono text-[9px] text-zinc-400 font-normal block">ID: {lead.id.substring(0, 8)}...</span>
                            </div>
                          </td>

                          {/* Contact Details */}
                          <td className="py-4.5 px-6 font-sans">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-zinc-650">
                                <Mail size={12} className="text-zinc-400" />
                                <a href={`mailto:${lead.email}`} className="hover:underline hover:text-zinc-950">{lead.email}</a>
                              </div>
                              <div className="flex items-center gap-1.5 text-zinc-650">
                                <Phone size={12} className="text-zinc-400" />
                                <span>{lead.countryCode} {lead.phoneNumber}</span>
                              </div>
                            </div>
                          </td>

                          {/* Platforms & Links */}
                          <td className="py-4.5 px-6">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex flex-wrap gap-1">
                                {lead.platforms.map((p, i) => (
                                  <span key={i} className="font-mono text-[9px] bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 text-zinc-650 font-bold uppercase rounded">
                                    {p}
                                  </span>
                                ))}
                              </div>
                              {/* Direct Links */}
                              <div className="flex items-center gap-2.5 text-zinc-400">
                                {lead.instagramUrl && (
                                  <a href={lead.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-pink-650 transition-colors" title="Instagram Profile">
                                    <Instagram size={13} />
                                  </a>
                                )}
                                {lead.youtubeUrl && (
                                  <a href={lead.youtubeUrl} target="_blank" rel="noreferrer" className="hover:text-red-650 transition-colors" title="YouTube Channel">
                                    <Youtube size={13} />
                                  </a>
                                )}
                                {lead.twitterUrl && (
                                  <a href={lead.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-sky-650 transition-colors" title="Twitter / X Link">
                                    <Twitter size={13} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Revenue */}
                          <td className="py-4.5 px-6">
                            <span className="font-mono font-bold text-zinc-800">
                              {lead.monthlyRevenue === 'less-5k' && 'Under $5k/mo'}
                              {lead.monthlyRevenue === '5k-25k' && '$5k - $25k/mo'}
                              {lead.monthlyRevenue === 'over-25k' && 'Over $25k/mo'}
                              {!['less-5k', '5k-25k', 'over-25k'].includes(lead.monthlyRevenue) && lead.monthlyRevenue}
                            </span>
                          </td>

                          {/* Selected Tier */}
                          <td className="py-4.5 px-6">
                            <span className={`font-sans font-bold uppercase text-[10px] tracking-wider px-2 py-1 rounded-sm border ${
                              lead.selectedTier === 'agency' ? 'bg-indigo-50 text-indigo-750 border-indigo-200' :
                              lead.selectedTier === 'max' ? 'bg-amber-50 text-amber-750 border-amber-200 animate-pulse' :
                              lead.selectedTier === 'pro' ? 'bg-emerald-50 text-emerald-750 border-emerald-200' :
                              'bg-zinc-50 text-zinc-650 border-zinc-200'
                            }`}>
                              {lead.selectedTier || 'none'}
                            </span>
                          </td>

                          {/* Saved date */}
                          <td className="py-4.5 px-6 font-mono text-[10px] text-zinc-400">
                            <div className="flex items-center gap-1">
                              <Calendar size={11} />
                              <span>
                                {lead.updatedAt ? new Date(lead.updatedAt.seconds * 1000).toLocaleString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) : 'Pending'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Table Footer Summary bar */}
              <div className="bg-zinc-55 py-3 px-6 text-[10px] font-mono text-zinc-400 border-t border-zinc-100 flex items-center justify-between">
                <span>Showing {filteredLeads.length} of {leads.length} Creators</span>
                <span>Security Protected by Google Firebase Firestore</span>
              </div>

            </div>
          </>
        )}
      </main>
    </div>
  );
}
