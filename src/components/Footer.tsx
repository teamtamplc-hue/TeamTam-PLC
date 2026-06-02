import React, { useEffect, useRef } from 'react';

interface FooterProps {
  onJoinWaitlist?: () => void;
}

export default function Footer({ onJoinWaitlist }: FooterProps = {}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);

  const fitWatermark = () => {
    const svg = svgRef.current;
    const text = textRef.current;
    if (!svg || !text) return;
    try {
      const bbox = text.getBBox();
      svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    // Run fitting on mount and font ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitWatermark);
    } else {
      fitWatermark();
    }

    window.addEventListener('resize', fitWatermark);
    // Extra warm-up timeout to ensure fonts and layout have settled
    const timer = setTimeout(fitWatermark, 500);

    return () => {
      window.removeEventListener('resize', fitWatermark);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="footer-section bg-[#fbfbef] py-12 px-6 font-sans">
      {/* Scope-isolated clean custom CSS styles */}
      <style>{`
        .custom-footer-style *, .custom-footer-style *::before, .custom-footer-style *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .custom-footer-style {
          font-family: 'DM Sans', sans-serif;
          color: #451a03;
        }
        .footer-wrapper {
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 16px;
          align-items: stretch;
        }
        .footer-left {
          position: relative;
          min-height: 340px;
          border-radius: 28px;
          padding: 32px;
          overflow: hidden;
          background: linear-gradient(135deg, #78350f 0%, #451a03 100%);
          box-shadow: 0 12px 40px rgba(120, 53, 15, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .sliding-container {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 12px;
          opacity: 0.14;
          pointer-events: none;
          z-index: 0;
          padding: 20px 0;
          mix-blend-mode: luminosity;
        }
        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes scroll-right {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .sliding-track-left {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: scroll-left 35s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }
        .sliding-track-right {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: scroll-right 35s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }
        .sliding-img {
          height: 64px;
          width: auto;
          border-radius: 8px;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .footer-logo-mark {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.15);
          border: 1.5px solid rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .footer-logo-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .footer-tagline-container {
          margin-top: auto;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .footer-tagline {
          font-size: 19px;
          font-weight: 400;
          color: #ffffff;
          line-height: 1.45;
        }
        .footer-tagline span {
          color: rgba(255, 255, 255, 0.65);
        }
        .footer-social-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .footer-social-label {
          font-family: 'Caveat', cursive;
          font-size: 17px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.3px;
        }
        .footer-social-icons {
          display: flex;
          gap: 7px;
        }
        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: #5c3521;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          cursor: pointer;
        }
        .social-icon svg {
          width: 15px;
          height: 15px;
          fill: #ffffff;
        }
        .social-icon:hover {
          background: #451a03;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(69, 26, 3, 0.35), 0 4px 10px rgba(69, 26, 3, 0.2);
        }
        .footer-right {
          background: #fffdf5;
          border: 1px solid #ebd9be;
          border-radius: 28px;
          padding: 40px;
          overflow: visible;
          box-shadow: 0 4px 20px rgba(120, 53, 15, 0.03);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .footer-lucky-graphic {
          position: absolute;
          top: -36px;
          right: 40px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }
        .lucky-cube {
          width: 96px;
          height: 96px;
          box-sizing: border-box;
          border-radius: 22px;
          transform: rotate(-10deg);
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 55%, #b45309 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            inset 3px 3px 8px rgba(255, 255, 255, 0.35),
            inset -3px -3px 12px rgba(0, 0, 0, 0.18),
            8px 14px 28px rgba(180, 83, 9, 0.25);
        }
        .lucky-cube-mark {
          font-family: 'DM Sans', sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.04em;
          transform: rotate(10deg);
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
          line-height: 1;
        }
        .lucky-text-row {
          display: flex;
          gap: 6px;
          align-items: center;
          transform: rotate(-4deg);
          margin-top: 4px;
        }
        .lucky-arrow {
          width: 22px;
          height: 22px;
          color: #92400e;
        }
        .lucky-arrow svg {
          display: block;
          width: 100%;
          height: 100%;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .lucky-text {
          font-family: 'Caveat', cursive;
          font-size: 20px;
          font-weight: 600;
          color: #78350f;
          white-space: nowrap;
        }
        .footer-right-top {
          display: flex;
          flex-direction: column;
        }
        .footer-nav-cols {
          display: flex;
          gap: 72px;
          padding-top: 8px;
        }
        .footer-col-title {
          font-family: 'Caveat', cursive;
          font-size: 24px;
          font-weight: 600;
          font-style: italic;
          color: #92400e;
          margin-bottom: 18px;
        }
        .footer-col a {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #451a03;
          margin-bottom: 14px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-col a:hover {
          color: #b45309;
        }
        .footer-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 48px;
        }
        .footer-copyright {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: #78350f;
          opacity: 0.8;
        }
        .footer-cta-mini {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-cta-mini h4 {
          font-size: 15px;
          font-weight: 400;
          color: #78350f;
          line-height: 1.45;
        }
        .footer-cta-mini h4 strong {
          display: block;
          font-size: 19px;
          font-weight: 700;
          color: #451a03;
        }
        .footer-subscribe-row {
          display: flex;
          width: 310px;
          background: #ffffff;
          border: 1px solid #ebd9be;
          border-radius: 12px;
          padding: 5px;
          box-shadow: 0 2px 10px rgba(120, 53, 15, 0.04);
        }
        .footer-subscribe-row input {
          flex: 1;
          padding: 11px 14px;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #451a03;
        }
        .footer-subscribe-row input::placeholder {
          color: rgba(120, 53, 15, 0.45);
        }
        .footer-subscribe-row button {
          padding: 11px 22px;
          background: #78350f;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          box-shadow: 0 6px 20px rgba(120, 53, 15, 0.22);
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .footer-subscribe-row button:hover {
          background: #451a03;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(69, 26, 3, 0.3);
        }
        .footer-join-waitlist-btn {
          width: 310px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #78350f;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: none;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(120, 53, 15, 0.22);
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .footer-join-waitlist-btn:hover {
          background: #451a03;
          transform: translateY(-1.5px);
          box-shadow: 0 8px 24px rgba(69, 26, 3, 0.3);
        }
        .footer-join-waitlist-btn:active {
          transform: translateY(0.5px);
        }
        .footer-watermark {
          max-width: 1150px;
          margin: -60px auto 0;
          pointer-events: none;
          user-select: none;
          position: relative;
          z-index: 0;
          line-height: 0;
        }
        .footer-watermark svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .footer-watermark text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
          fill: rgba(120, 53, 15, 0.04);
        }

        /* Responsive Breakpoints */
        @media (max-width: 860px) {
          .footer-wrapper {
            grid-template-columns: 1fr;
          }
          .footer-left {
            min-height: auto;
            gap: 40px;
          }
        }
        @media (max-width: 560px) {
          .footer-right {
            padding: 24px;
          }
          .footer-nav-cols {
            gap: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .footer-subscribe-row {
            width: 100%;
          }
          .footer-lucky-graphic {
            right: 12px;
            top: -28px;
          }
          .lucky-cube {
            width: 72px;
            height: 72px;
          }
          .lucky-cube-mark {
            font-size: 32px;
          }
        }
      `}</style>
      
      <div className="custom-footer-style">
        <div className="footer-wrapper">
          
          {/* LEFT CARD - sliding pictures backdrop */}
          <div className="footer-left">
            <div className="sliding-container">
              {/* Row 0: Slide Right */}
              <div className="sliding-track-right">
                {[...Array(3)].flatMap(() => [
                  "https://i.postimg.cc/fbZkvGR2/forms.png",
                  "https://i.postimg.cc/rmhw9zD0/cashstripe.png",
                  "https://i.postimg.cc/25m3xsSX/bookedcall.png",
                  "https://i.postimg.cc/RFPZTqW3/link-clicks.png"
                ]).map((src, i) => (
                  <img 
                    key={`row0-${i}`}
                    src={src} 
                    alt="" 
                    className="sliding-img" 
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>

              {/* Row 1: Slide Left */}
              <div className="sliding-track-left">
                {[...Array(3)].flatMap(() => [
                  "https://i.postimg.cc/RFPZTqW3/link-clicks.png",
                  "https://i.postimg.cc/25m3xsSX/bookedcall.png",
                  "https://i.postimg.cc/rmhw9zD0/cashstripe.png",
                  "https://i.postimg.cc/fbZkvGR2/forms.png"
                ]).map((src, i) => (
                  <img 
                    key={`row1-${i}`}
                    src={src} 
                    alt="" 
                    className="sliding-img" 
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              
              {/* Row 2: Slide Right */}
              <div className="sliding-track-right">
                {[...Array(3)].flatMap(() => [
                  "https://i.postimg.cc/rmhw9zD0/cashstripe.png",
                  "https://i.postimg.cc/fbZkvGR2/forms.png",
                  "https://i.postimg.cc/RFPZTqW3/link-clicks.png",
                  "https://i.postimg.cc/25m3xsSX/bookedcall.png"
                ]).map((src, i) => (
                  <img 
                    key={`row2-${i}`}
                    src={src} 
                    alt="" 
                    className="sliding-img" 
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>

              {/* Row 3: Slide Left */}
              <div className="sliding-track-left">
                {[...Array(3)].flatMap(() => [
                  "https://i.postimg.cc/25m3xsSX/bookedcall.png",
                  "https://i.postimg.cc/RFPZTqW3/link-clicks.png",
                  "https://i.postimg.cc/fbZkvGR2/forms.png",
                  "https://i.postimg.cc/rmhw9zD0/cashstripe.png"
                ]).map((src, i) => (
                  <img 
                    key={`row3-${i}`}
                    src={src} 
                    alt="" 
                    className="sliding-img" 
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>
            
            <div className="footer-logo">
              <div className="footer-logo-mark p-1 bg-white/10">
                <img 
                  src="https://i.postimg.cc/fkQJM3ns/track1on1-logo-pngfdfdf.png" 
                  alt="" 
                  className="w-full h-full object-contain pointer-events-none select-none brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="footer-logo-name">Track1on1</span>
            </div>
            
            <div className="footer-tagline-container">
              <p className="footer-tagline">
                Stop posting blind.<br />
                <span>Every sale connected back to the content that caused it.</span>
              </p>
            </div>
            
            <div className="footer-social-row">
              <span className="footer-social-label">Stay in touch!</span>
              <div className="footer-social-icons">
                <a href="#discord" className="social-icon" aria-label="Discord">
                  <svg viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
                  </svg>
                </a>
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <svg viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#github" className="social-icon" aria-label="GitHub">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* RIGHT CARD */}
          <div className="footer-right">
            
            {/* Floating "Give it a try" badge */}
            <div className="footer-lucky-graphic">
              <div className="lucky-cube p-3.5 bg-gradient-to-br from-amber-400 to-amber-700">
                <img 
                  src="https://i.postimg.cc/fkQJM3ns/track1on1-logo-pngfdfdf.png" 
                  alt="Track1on1" 
                  className="w-full h-full object-contain pointer-events-none select-none transform rotate-[10deg] brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lucky-text-row">
                <div className="lucky-arrow">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 20 C 6 14, 10 9, 18 5" />
                    <path d="M18 5 L 12 5" />
                    <path d="M18 5 L 18 11" />
                  </svg>
                </div>
                <span className="lucky-text">give it a try</span>
              </div>
            </div>
            
            {/* Top - Navigation columns */}
            <div className="footer-right-top">
              <div className="footer-nav-cols">
                <div className="footer-col">
                  <h5 className="footer-col-title">Product</h5>
                  <a href="#features">How it works</a>
                  <a href="#features">Features</a>
                  <a href="#pricing-section">Pricing</a>
                  <a href="#testimonials-section">Testimonials</a>
                  <a href="#frequently-asked-cases">FAQ</a>
                </div>
                
                <div className="footer-col">
                  <h5 className="footer-col-title">Company</h5>
                  <a href="#blog">Blog</a>
                  <a href="#about">About</a>
                  <a href="#terms">Terms and Condition</a>
                  <a href="#privacy">Privacy Policy</a>
                </div>
              </div>
            </div>
            
            {/* Bottom row */}
            <div className="footer-bottom">
              <p className="footer-copyright">
                © 2026 Track1on1. All rights reserved.
              </p>
              
              <div className="footer-cta-mini">
                <h4>
                  AI moves fast.<br />
                  <strong>Stay ahead with Track1on1.</strong>
                </h4>
                
                <button 
                  type="button" 
                  onClick={onJoinWaitlist}
                  className="footer-join-waitlist-btn"
                >
                  Join Waitlist
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
          
        </div>
      </div>

      {/* Watermark fluid text */}
      <div className="footer-watermark" aria-hidden="true">
        <svg id="watermarkSvg" ref={svgRef} viewBox="62 95 876 175" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <text id="watermarkText" ref={textRef} x="500" y="240" textAnchor="middle" fontSize="230">Track1on1</text>
        </svg>
      </div>
    </section>
  );
}
