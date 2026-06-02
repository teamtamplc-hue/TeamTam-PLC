import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AutoScrollGallery from './AutoScrollGallery';
import CountryDropdown from './CountryDropdown';
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Instagram, 
  Youtube, 
  Twitter, 
  Globe, 
  DollarSign, 
  Smartphone,
  CheckCircle,
  Clock,
  Send,
  Lock,
  LogOut,
  UserCheck
} from 'lucide-react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { setDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

interface WaitlistFormPageProps {
  onBack: () => void;
  selectedTier?: 'pro' | 'max' | 'agency' | null;
  onSeeDemoDashboard?: () => void;
  key?: React.Key;
}


export default function WaitlistFormPage({ onBack, selectedTier = null, onSeeDemoDashboard }: WaitlistFormPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [instagramUrl, setInstagramUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);

  // Auth local state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        setEmail(user.email || '');
        if (user.displayName && !fullName) {
          setFullName(user.displayName);
        }
      } else {
        setHasExisting(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    const fetchExisting = async () => {
      try {
        const docRef = doc(db, 'waitlist', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFullName(data.fullName || '');
          setEmail(data.email || '');
          setCountryCode(data.countryCode || '+1');
          setPhoneNumber(data.phoneNumber || '');
          setSelectedPlatforms(data.platforms || []);
          setInstagramUrl(data.instagramUrl || '');
          setYoutubeUrl(data.youtubeUrl || '');
          setTwitterUrl(data.twitterUrl || '');
          setMonthlyRevenue(data.monthlyRevenue || '');
          setHasExisting(true);
        }
      } catch (err) {
        console.error("Error loading existing application details:", err);
      }
    };
    
    fetchExisting();
  }, [currentUser]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
    } catch (err) {
      console.error("Google Auth popup failed:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setFullName('');
      setEmail('');
      setCountryCode('+1');
      setPhoneNumber('');
      setSelectedPlatforms([]);
      setInstagramUrl('');
      setYoutubeUrl('');
      setTwitterUrl('');
      setMonthlyRevenue('');
      setHasExisting(false);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else if (selectedPlatforms.length < 3) {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your name.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email address.';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Please enter a phone number.';
    if (selectedPlatforms.length === 0) newErrors.platforms = 'Please select at least one platform.';
    if (!monthlyRevenue) newErrors.monthlyRevenue = 'Please select your monthly revenue.';

    // Validate show profile links
    if (selectedPlatforms.includes('Instagram') && !instagramUrl.trim()) {
      newErrors.instagramUrl = 'Please enter your Instagram profile URL or handle.';
    }
    if (selectedPlatforms.includes('YouTube') && !youtubeUrl.trim()) {
      newErrors.youtubeUrl = 'Please enter your YouTube Channel URL.';
    }
    if (selectedPlatforms.includes('Twitter / X') && !twitterUrl.trim()) {
      newErrors.twitterUrl = 'Please enter your Twitter / X profile handle or link.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Sign-in verification is required to submit the application.");
      return;
    }
    if (!validate()) return;

    localStorage.setItem('track1on1_demo_fullname', fullName);

    setIsSubmitting(true);
    
    const now = serverTimestamp();
    const waitlistData: any = {
      fullName,
      email,
      countryCode,
      phoneNumber,
      platforms: selectedPlatforms,
      instagramUrl: instagramUrl || '',
      youtubeUrl: youtubeUrl || '',
      twitterUrl: twitterUrl || '',
      monthlyRevenue,
      selectedTier: selectedTier || 'none',
      ownerId: currentUser.uid,
      updatedAt: now,
    };

    try {
      if (hasExisting) {
        // Retrieve and retain the original creation date
        const docRef = doc(db, 'waitlist', currentUser.uid);
        const docSnap = await getDoc(docRef);
        const existingData = docSnap.data();
        waitlistData.createdAt = existingData?.createdAt || now;
      } else {
        waitlistData.createdAt = now;
      }

      await setDoc(doc(db, 'waitlist', currentUser.uid), waitlistData);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `waitlist/${currentUser.uid}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#eadfcc] via-[#fbfaf7] to-[#ebd9be] text-zinc-900 selection:bg-amber-200 selection:text-amber-900 pb-24">
      
      {/* Top Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-zinc-200/50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 group text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-950 transition-colors bg-white hover:bg-zinc-100 border border-zinc-200/60 px-3 py-1.5 rounded-lg shadow-2xs cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </button>
        
        <div className="flex items-center gap-1.5">
          <span className="text-amber-800 font-serif italic text-lg leading-none">Track</span>
          <img 
            src="https://i.postimg.cc/fkQJM3ns/track1on1-logo-pngfdfdf.png" 
            alt="Track 1on1 Logo" 
            className="h-7 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Main Container */}
      <main className={`mx-auto px-4 sm:px-6 mt-6 md:mt-8 relative z-10 transition-all duration-350 ${isSubmitted ? 'max-w-3xl' : 'max-w-[1440px]'}`}>
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 w-full"
            >
              {/* Grid holding the galleries and form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start relative pb-12">
                
                {/* Left Column: Vertical Scrolling Image Gallery with dynamic neon gradient glow */}
                <div className="lg:col-span-3 relative h-[1080px] rounded-3xl p-[3px] bg-white border border-zinc-200/90 shadow-xl hidden lg:block overflow-hidden group transition-all duration-300">
                  {/* Rotating background color blur backdrop */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl blur-md opacity-20 group-hover:opacity-35 transition duration-1000" />
                  {/* The actual gallery box wrapping */}
                  <div className="relative w-full h-full rounded-[21px] overflow-hidden bg-[#fafaf8]">
                    <AutoScrollGallery side="left" />
                  </div>
                </div>

                {/* Center Column: The actual waitlist form card */}
                <div className="col-span-12 lg:col-span-6 space-y-6">
                  {/* Introduction & Badge */}
                  <div className="text-center space-y-3.5 pb-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-905">
                      <Sparkles size={13} className="text-amber-600 animate-pulse" />
                      <span className="font-mono text-[9px] font-black uppercase tracking-widest">
                        {selectedTier ? `EXCLUSIVE BETA INVITATION • ${selectedTier.toUpperCase()} PLAN` : 'EXCLUSIVE BETA ACCESS APPLICATION'}
                      </span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl tracking-tight text-zinc-955 leading-none font-sans flex flex-col items-center justify-center gap-1.5 pt-1 pb-2">
                      <span className="relative inline-block z-1">
                        <span className="relative z-10 text-amber-700 font-serif italic font-medium px-4 block transition-transform duration-300 hover:scale-[1.02]">
                          Beta Access
                        </span>
                        <span className="absolute bottom-1 left-0 right-0 h-4 bg-amber-100/95 -rotate-1 -z-1 rounded-sm"></span>
                      </span>
                      {selectedTier && (
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-800 font-bold mt-1">
                          — {selectedTier} TIER SECURED —
                        </span>
                      )}
                    </h1>
                    
                    <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
                      Only 100 slots allotted in current cohort for automatic revenue pathing. Apply below to request early deployment and secure 50% lifetime launch pricing.
                    </p>
                  </div>

                  {/* Form Card (Serrated styled vintage receipt effect) */}
                  <div className="relative bg-[#ffffff] border border-zinc-200/80 rounded-2xl shadow-lg overflow-hidden p-6 sm:p-10">
                    
                    {/* Visual strip at top */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200" />
                    
                    {/* Google Auth Block */}
                    <div className="mb-6 mt-2 relative z-20">
                      {!currentUser ? (
                        <div className="p-6 rounded-xl border border-dashed border-amber-300 bg-amber-50/20 text-center space-y-4 shadow-xs">
                          <div className="mx-auto w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shadow-3xs">
                            <Lock size={18} />
                          </div>
                          <div>
                            <h3 className="font-sans font-bold text-sm text-zinc-900">Email Verification Required</h3>
                            <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                              To ensure valid entries, we require Google-authenticated email validation before we secure your cohort spot.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={authLoading}
                            className="mx-auto inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-widest shadow-md transition-all active:scale-[0.98] cursor-pointer"
                          >
                            <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.111 4.113-3.414 0-6.193-2.78-6.193-6.193a6.194 6.194 0 016.193-6.193c1.488 0 2.851.528 3.918 1.485l3.12-3.12C19.124 2.058 15.86 1 12.24 1A10.24 10.24 0 002 11.24a10.24 10.24 0 0010.24 10.24c5.795 0 10.24-4.113 10.24-10.24 0-.521-.063-1.099-.174-1.571L12.24 10.285z"/>
                            </svg>
                            Verify with Google
                          </button>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/25 flex items-center justify-between text-xs shadow-xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 shadow-3xs">
                              <UserCheck size={16} />
                            </div>
                            <div>
                              <p className="font-sans font-bold text-zinc-900">Email Authenticated</p>
                              <p className="font-mono text-[10px] text-zinc-500">{email} (Verified)</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex items-center gap-1.5 text-zinc-400 hover:text-rose-600 transition-colors font-mono uppercase text-[9px] font-bold cursor-pointer"
                          >
                            <LogOut size={12} />
                            Disconnect
                          </button>
                        </div>
                      )}
                    </div>

                    {currentUser && currentUser.email === 'teamtamplc@gmail.com' && (
                      <div className="mb-6 p-5 rounded-2xl border bg-emerald-50/30 border-emerald-300 shadow-xs space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                          </span>
                          <div>
                            <p className="font-sans font-black text-xs text-zinc-950 uppercase tracking-tight">🔒 Admin Account Identified</p>
                            <p className="text-[11px] text-zinc-500 mt-0.5">Welcome, Admin. Access and organize all waitlist registrations in real-time.</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            window.location.hash = '#/admin';
                          }}
                          className="w-full text-center py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white font-mono text-[10px] tracking-widest font-bold uppercase rounded-xl shadow-xs transition-transform active:scale-[0.98] cursor-pointer"
                        >
                          Launch HQ Admin Control Panel →
                        </button>
                      </div>
                    )}

                    {hasExisting && currentUser && (
                      <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-amber-950 text-xs flex items-center gap-2.5 shadow-3xs">
                        <Sparkles size={16} className="text-amber-700 animate-pulse shrink-0" />
                        <div>
                          <p className="font-bold">Existing Beta Spot Confirmed!</p>
                          <p className="text-zinc-650 font-medium">You already registered! You can make modifications to your application data below.</p>
                        </div>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className={`space-y-8 transition-all ${!currentUser ? 'opacity-30 pointer-events-none select-none' : ''}`}>
                  
                  {/* Field 1: Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider font-extrabold text-zinc-650">
                      1. Full Name
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="What should we call you?"
                        disabled={!!currentUser}
                        className="w-full text-sm sm:text-base px-4 py-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-500 focus:bg-white focus:outline-hidden rounded-xl transition-all font-sans font-medium hover:shadow-2xs disabled:bg-zinc-100 disabled:text-zinc-500 disabled:cursor-not-allowed"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs font-mono text-rose-600 font-bold">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Field 2: Email Address */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider font-extrabold text-zinc-650">
                      2. Email Address
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Where should we send your access?"
                      disabled={!!currentUser}
                      className="w-full text-sm sm:text-base px-4 py-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-500 focus:bg-white focus:outline-hidden rounded-xl transition-all font-sans font-medium hover:shadow-2xs disabled:bg-zinc-100 disabled:text-zinc-500 disabled:cursor-not-allowed"
                    />
                    {errors.email && (
                      <p className="text-xs font-mono text-rose-600 font-bold">{errors.email}</p>
                    )}
                  </div>

                  {/* Field 3: Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider font-extrabold text-zinc-650 flex items-center gap-1">
                      <Smartphone size={14} className="text-zinc-400" />
                      3. Phone Number
                    </label>
                    <div className="flex gap-2">
                      {/* Country Code Selector */}
                      <CountryDropdown value={countryCode} onChange={setCountryCode} />
                      
                      {/* Telephone text input */}
                      <input 
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. 555-0199"
                        className="flex-1 text-sm sm:text-base px-4 py-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-500 focus:bg-white focus:outline-hidden rounded-xl transition-all font-sans font-medium hover:shadow-2xs"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-xs font-mono text-rose-600 font-bold">{errors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Field 4: Which platforms do you create on? */}
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-end">
                      <label className="block text-xs font-mono uppercase tracking-wider font-extrabold text-zinc-650">
                        4. Which platforms do you create on?
                      </label>
                      <span className="text-[10px] font-mono text-zinc-400">Choose up to 3</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Instagram */}
                      <button
                        type="button"
                        onClick={() => togglePlatform('Instagram')}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-sm font-semibold transition-all relative ${
                          selectedPlatforms.includes('Instagram')
                            ? 'bg-amber-50/50 border-amber-300 text-amber-950 ring-1 ring-amber-300'
                            : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100/50 text-zinc-700'
                        }`}
                      >
                        <Instagram size={18} className={selectedPlatforms.includes('Instagram') ? 'text-amber-700' : 'text-zinc-400'} />
                        <span className="font-sans">Instagram</span>
                        {selectedPlatforms.includes('Instagram') && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-600 flex items-center justify-center text-[9px] text-white">
                            ✓
                          </div>
                        )}
                      </button>

                      {/* YouTube */}
                      <button
                        type="button"
                        onClick={() => togglePlatform('YouTube')}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-sm font-semibold transition-all relative ${
                          selectedPlatforms.includes('YouTube')
                            ? 'bg-amber-50/50 border-amber-300 text-amber-950 ring-1 ring-amber-300'
                            : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100/50 text-zinc-700'
                        }`}
                      >
                        <Youtube size={18} className={selectedPlatforms.includes('YouTube') ? 'text-amber-700' : 'text-zinc-400'} />
                        <span className="font-sans">YouTube</span>
                        {selectedPlatforms.includes('YouTube') && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-600 flex items-center justify-center text-[9px] text-white">
                            ✓
                          </div>
                        )}
                      </button>

                      {/* Twitter / X */}
                      <button
                        type="button"
                        onClick={() => togglePlatform('Twitter / X')}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-sm font-semibold transition-all relative ${
                          selectedPlatforms.includes('Twitter / X')
                            ? 'bg-amber-50/50 border-amber-300 text-amber-950 ring-1 ring-amber-300'
                            : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100/50 text-zinc-700'
                        }`}
                      >
                        <Twitter size={18} className={selectedPlatforms.includes('Twitter / X') ? 'text-amber-700' : 'text-zinc-400'} />
                        <span className="font-sans">Twitter / X</span>
                        {selectedPlatforms.includes('Twitter / X') && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-600 flex items-center justify-center text-[9px] text-white">
                            ✓
                          </div>
                        )}
                      </button>
                    </div>
                    {errors.platforms && (
                      <p className="text-xs font-mono text-rose-600 font-bold">{errors.platforms}</p>
                    )}
                  </div>

                  {/* Field 5: Your Profile Links (Dynamic) */}
                  <AnimatePresence>
                    {selectedPlatforms.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <label className="block text-xs font-mono uppercase tracking-wider font-extrabold text-zinc-650 pt-2 border-t border-dashed border-zinc-250">
                          5. Your Profile Links
                        </label>

                        <div className="space-y-4">
                          {selectedPlatforms.includes('Instagram') && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="space-y-2"
                            >
                              <span className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5 font-sans">
                                <Instagram size={14} className="text-amber-750" />
                                Your Instagram URL
                              </span>
                              <div className="flex rounded-xl bg-zinc-50 border border-zinc-200 focus-within:border-zinc-500 focus-within:bg-white overflow-hidden transition-all select-none">
                                <span className="bg-zinc-100 border-r border-zinc-200/80 px-3 py-2.5 text-xs text-zinc-500 font-mono flex items-center">
                                  instagram.com/
                                </span>
                                <input 
                                  type="text"
                                  value={instagramUrl}
                                  onChange={(e) => setInstagramUrl(e.target.value)}
                                  placeholder="username"
                                  className="flex-1 px-3 py-2 text-sm bg-transparent border-0 focus:outline-hidden font-sans font-medium"
                                />
                              </div>
                              {errors.instagramUrl && (
                                <p className="text-xs font-mono text-rose-600 font-bold">{errors.instagramUrl}</p>
                              )}
                            </motion.div>
                          )}

                          {selectedPlatforms.includes('YouTube') && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="space-y-2"
                            >
                              <span className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5 font-sans">
                                <Youtube size={14} className="text-rose-600" />
                                Your YouTube Channel URL
                              </span>
                              <div className="flex rounded-xl bg-zinc-50 border border-zinc-200 focus-within:border-zinc-500 focus-within:bg-white overflow-hidden transition-all select-none">
                                <span className="bg-zinc-100 border-r border-zinc-200/80 px-3 py-2.5 text-xs text-zinc-500 font-mono flex items-center">
                                  youtube.com/
                                </span>
                                <input 
                                  type="text"
                                  value={youtubeUrl}
                                  onChange={(e) => setYoutubeUrl(e.target.value)}
                                  placeholder="@channel"
                                  className="flex-1 px-3 py-2 text-sm bg-transparent border-0 focus:outline-hidden font-sans font-medium"
                                />
                              </div>
                              {errors.youtubeUrl && (
                                <p className="text-xs font-mono text-rose-600 font-bold">{errors.youtubeUrl}</p>
                              )}
                            </motion.div>
                          )}

                          {selectedPlatforms.includes('Twitter / X') && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="space-y-2"
                            >
                              <span className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5 font-sans">
                                <Twitter size={14} className="text-zinc-800" />
                                Your Twitter / X URL
                              </span>
                              <div className="flex rounded-xl bg-zinc-50 border border-zinc-200 focus-within:border-zinc-500 focus-within:bg-white overflow-hidden transition-all select-none">
                                <span className="bg-zinc-100 border-r border-zinc-200/80 px-3 py-2.5 text-xs text-zinc-500 font-mono flex items-center">
                                  x.com/
                                </span>
                                <input 
                                  type="text"
                                  value={twitterUrl}
                                  onChange={(e) => setTwitterUrl(e.target.value)}
                                  placeholder="handle"
                                  className="flex-1 px-3 py-2 text-sm bg-transparent border-0 focus:outline-hidden font-sans font-medium"
                                />
                              </div>
                              {errors.twitterUrl && (
                                <p className="text-xs font-mono text-rose-600 font-bold">{errors.twitterUrl}</p>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Field 6: Monthly Revenue */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider font-extrabold text-zinc-650">
                      6. Monthly Revenue
                    </label>
                    <div className="relative">
                      <select 
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(e.target.value)}
                        className="w-full text-sm sm:text-base px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-500 outline-hidden rounded-xl transition-all cursor-pointer font-sans font-medium hover:bg-zinc-100/30 selection:bg-amber-150"
                      >
                        <option value="" disabled>Select approximate range...</option>
                        <option value="Just starting out">Just starting out</option>
                        <option value="$0 — $5,000">$0 — $5,000</option>
                        <option value="$5,000 — $10,000">$5,000 — $10,000</option>
                        <option value="$10,000 — $100,000">$10,000 — $100,000</option>
                        <option value="$100,000+">$100,000+</option>
                      </select>
                    </div>
                    {errors.monthlyRevenue && (
                      <p className="text-xs font-mono text-rose-600 font-bold">{errors.monthlyRevenue}</p>
                    )}
                  </div>

                  {/* Legal Protection / Disclaimer Badge */}
                  <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 flex gap-3 text-xs leading-relaxed">
                    <ShieldCheck size={18} className="text-amber-800 shrink-0 mt-0.5" />
                    <p className="font-sans font-medium text-amber-950">
                      <span className="font-bold uppercase tracking-wide">Risk-Free Clause:</span> Entering credentials or links is governed by our end-to-end sandbox privacy. Track 1on1 will never sell, store, or display your cross-platform metrics without authorized secure pairing tokens.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-750 text-white hover:text-white rounded-xl shadow-md font-mono text-sm uppercase tracking-widest font-extrabold transition-all active:scale-[0.985] group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Deploying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          <span>{selectedTier ? "Secure My Spot" : "Join the Waitlist"}</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>

              </div>
              
              {/* Logo and brand name under the form */}
              <div className="flex flex-col items-center justify-center pt-12 pb-16">
                <div className="flex items-center gap-2.5">
                  <span className="text-amber-800 font-serif italic text-4xl leading-none tracking-tight">Track</span>
                  <img 
                    src="https://i.postimg.cc/fkQJM3ns/track1on1-logo-pngfdfdf.png" 
                    alt="Track 1on1 Logo" 
                    className="h-14 w-auto object-contain animate-pulse-slow"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

                </div>

                {/* Right Column: Vertical Scrolling Image Gallery with dynamic neon gradient glow */}
                <div className="lg:col-span-3 relative h-[1080px] rounded-3xl p-[3px] bg-white border border-zinc-200/90 shadow-xl hidden lg:block overflow-hidden group transition-all duration-300">
                  {/* Rotating background color blur backdrop */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl blur-md opacity-20 group-hover:opacity-35 transition duration-1000" />
                  {/* The actual gallery box wrapping */}
                  <div className="relative w-full h-full rounded-[21px] overflow-hidden bg-[#fafaf8]">
                    <AutoScrollGallery side="right" />
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20 }}
              className="max-w-md mx-auto text-center space-y-4"
            >
              {/* Simple Elegant Confirmation Card */}
              <div className="bg-[#ffffff] border border-zinc-200 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6">
                
                {/* Visual success badge */}
                <div className="flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-full border border-emerald-200 mx-auto">
                  <CheckCircle size={32} className="text-emerald-700 stroke-[2.5px]" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-zinc-950 font-sans tracking-tight leading-tight">
                    Spot seacured successfully
                  </h2>
                </div>

                <button
                  onClick={onBack}
                  className="w-full text-center py-3.5 px-4 bg-zinc-90 w-full border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-mono font-bold text-xs uppercase tracking-widest rounded-xl shadow-xs transition-all active:scale-[0.99] cursor-pointer block"
                >
                  Return to Home
                </button>

              </div>

              {/* Small "See Demo Dashboard →" button below the success message card */}
              {onSeeDemoDashboard && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={onSeeDemoDashboard}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-white hover:text-white rounded-xl text-xs font-mono font-bold uppercase tracking-widest transition-all active:scale-[0.98] shadow-md cursor-pointer group"
                  >
                    <span>See Demo Dashboard</span>
                    <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
