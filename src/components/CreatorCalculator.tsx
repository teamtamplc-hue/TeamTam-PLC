import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, AlertTriangle, ArrowRight, ThumbsUp, HelpCircle } from 'lucide-react';

export default function CreatorCalculator() {
  const [posts, setPosts] = useState<number>(12); // posts per month
  const [avgViews, setAvgViews] = useState<number>(25000); // average views
  const [productPrice, setProductPrice] = useState<number>(49); // average product ticket size
  const [conversionRate, setConversionRate] = useState<number>(0.8); // product conversion rate %

  // Calculation Logic
  const totalViews = posts * avgViews;
  const standardConversions = totalViews * (conversionRate / 100);
  const potentialRevenue = standardConversions * productPrice;
  
  // Track 1on1 advantage: attributes 30% more sales through accurate 1on1 content linking,
  // preventing user leaks (where customers view post on YouTube, but buy later on desktop/instagram).
  const leakedRevenueRate = 0.35; // 35 % of sales go untracked/unattributed
  const leakedRevenue = potentialRevenue * leakedRevenueRate;
  const recapturedRevenue = potentialRevenue + leakedRevenue * 0.8; // 80% recaptured

  // Format currency
  const formatVal = (v: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(v);
  };

  return (
    <div className="w-full max-w-5xl px-4 py-12 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="creator-roi-calculator">
      
      {/* Left side: Sleek Slider Workspace */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 rounded-full border border-amber-200">
            LOSS ESTIMATOR
          </span>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mt-3">
            Calculate your &quot;Content Blind Spot&quot;
          </h3>
          <p className="text-sm text-zinc-500 mt-2">
            Most social networks fail to pass click IDs across mobile browsers (like YouTube UI to iOS Safari). That means 1 in 3 of your sales shows up as <span className="underline font-semibold text-zinc-800">Direct / Organic</span> instead of tracing back to the post that caused it.
          </p>
        </div>

        <div className="space-y-6">
          {/* Post rate per month */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-zinc-700">Content Posts / month</span>
              <span className="font-mono text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                {posts} posts
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              step="1"
              value={posts}
              onChange={(e) => setPosts(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>2 mini posts</span>
              <span>40 items (Intense)</span>
            </div>
          </div>

          {/* Average views per post */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-zinc-700">Avg Views per post</span>
              <span className="font-mono text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                {avgViews.toLocaleString()} views
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="5000"
              value={avgViews}
              onChange={(e) => setAvgViews(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>1k views</span>
              <span>200k+ viral reach</span>
            </div>
          </div>

          {/* Product Offer Pricing */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-zinc-700">Product / Sponsor Ticket Price</span>
              <span className="font-mono text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                {formatVal(productPrice)}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={productPrice}
              onChange={(e) => setProductPrice(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>$5 low tier</span>
              <span>$500 premium / sponsorship</span>
            </div>
          </div>

          {/* Product Conversion rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-zinc-700">Sponsor Link Conversion Rate</span>
              <span className="font-mono text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                {conversionRate}%
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>0.1% modest</span>
              <span>5.0% super engaged</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Tactile Hand-Written Legal Pad Result Sticker */}
      <div className="lg:col-span-7">
        <div className="relative w-full p-6 sm:p-10 rounded-lg bg-amber-50/70 border border-amber-200/60 shadow-xl overflow-hidden font-chalk">
          
          {/* Paper lines and margins simulated with CSS */}
          <div className="absolute top-0 bottom-0 left-[45px] w-[1px] bg-red-200 pointer-events-none"></div>
          
          {/* Paper horizontal lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(191,219,254,0.15)_1px,transparent_1px)] bg-[size:100%_28px] pointer-events-none"></div>

          {/* Yellow masking tape strip at top to look held down */}
          <div className="absolute top-[-5px] left-1/3 w-36 h-8 bg-yellow-200/90 border border-yellow-300/40 rotate-[2deg] shadow-xs flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[9px] text-yellow-800 tracking-wider">CREATOR SCRAPBOOK</span>
          </div>

          {/* Legal Pad Content */}
          <div className="relative z-10 pl-6 space-y-6">
            <div className="flex justify-between items-center border-b-2 border-dashed border-amber-200 pb-3">
              <h4 className="text-xl sm:text-2xl font-bold text-amber-900 tracking-tight" style={{ fontFamily: '"Architects Daughter", cursive' }}>
                At-a-Glance Audit:
              </h4>
              <span className="text-[11px] font-mono text-zinc-500 border border-zinc-300/60 px-2 py-0.5 rounded-sm">
                Date: Today
              </span>
            </div>

            {/* Calculations items */}
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-dotted border-zinc-400/40 pb-1">
                <span className="text-zinc-600 hover:text-zinc-900 text-sm">Est. Combined Reach (Views):</span>
                <span className="font-bold text-zinc-800 font-mono text-indigo-900" style={{ fontFamily: '"Architects Daughter", cursive' }}>
                  {totalViews.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-end border-b border-dotted border-zinc-400/40 pb-1">
                <span className="text-zinc-600 hover:text-zinc-900 text-sm">Monthly Revenue Potential:</span>
                <span className="font-bold text-zinc-800 font-mono" style={{ fontFamily: '"Architects Daughter", cursive' }}>
                  {formatVal(potentialRevenue)}
                </span>
              </div>

              {/* The Leak - Warning Accent */}
              <div className="p-4 rounded-lg bg-red-100/45 border-2 border-dashed border-red-300 text-red-950 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-red-900" style={{ fontFamily: '"Architects Daughter", cursive' }}>
                  <AlertTriangle size={15} />
                  <span>Unattributed Revenue Leak (35%):</span>
                  <span className="ml-auto font-mono text-base">{formatVal(leakedRevenue)}</span>
                </div>
                <p className="text-xs text-red-800/80 font-mono normal-case tracking-normal">
                  *This money is actually being completed by your followers, but analytics programs read them as &quot;Direct URL visits&quot;, meaning you can&apos;t prove sponsorships were effective or renew high-value brand deals.
                </p>
              </div>

              {/* Result using Track 1on1 */}
              <div className="p-4 rounded-lg bg-emerald-100/45 border-2 border-dashed border-emerald-300 text-emerald-950 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900" style={{ fontFamily: '"Architects Daughter", cursive' }}>
                  <ThumbsUp size={15} className="animate-bounce" />
                  <span>True Attributed Revenue with Track 1on1:</span>
                  <span className="ml-auto font-mono text-lg text-emerald-700">{formatVal(recapturedRevenue)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] border-t border-emerald-300/40 pt-2 font-mono">
                  <span className="text-emerald-800">Extra Attribution Claimed</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    +{formatVal(recapturedRevenue - potentialRevenue)} / month
                  </span>
                </div>
              </div>
            </div>

            {/* Micro Call to Action Sticker inside notepad */}
            <div className="text-center pt-2">
              <p className="text-[11px] text-zinc-500 mb-2 font-mono">
                💡 Connect your Stripe / Shopify + link social platforms under 2 minutes.
              </p>
              <a 
                href="#chalkboard-showcase-section"
                className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 underline font-bold"
                style={{ fontFamily: '"Architects Daughter", cursive' }}
              >
                Go back to Chalkboard sandbox to draw & test your flow <ArrowRight size={12} />
              </a>
            </div>

          </div>

          {/* Pencil scratch aesthetic detail */}
          <div className="absolute bottom-2 right-4 text-zinc-300 select-none text-xs pointer-events-none">
            ✎ Track1on1_System_v1.07
          </div>
        </div>
      </div>

    </div>
  );
}
