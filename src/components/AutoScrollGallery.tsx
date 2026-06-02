import React, { useEffect, useRef } from 'react';

type Direction = 'up' | 'down';

interface ScrollingColumnProps {
  images: string[];
  speed: number;
  direction: Direction;
}

function ScrollingColumn({ images, speed, direction }: ScrollingColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const singleHeightRef = useRef<number>(0);

  const measureHeight = () => {
    if (scrollRef.current) {
      const scrollHeight = scrollRef.current.scrollHeight;
      singleHeightRef.current = scrollHeight / 2;
    }
  };

  useEffect(() => {
    measureHeight();
    
    if (!scrollRef.current) return;
    const observer = new ResizeObserver(() => {
      measureHeight();
    });
    observer.observe(scrollRef.current);
    
    const timer1 = setTimeout(measureHeight, 150);
    const timer2 = setTimeout(measureHeight, 500);
    const timer3 = setTimeout(measureHeight, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [images]);

  useEffect(() => {
    let animationFrameId: number;
    let currentY = 0;

    const animate = () => {
      const singleSetHeight = singleHeightRef.current;

      if (singleSetHeight > 0) {
        if (direction === 'up') {
          currentY -= speed;
          if (Math.abs(currentY) >= singleSetHeight) {
            currentY = 0;
          }
        } else {
          currentY += speed;
          if (currentY >= 0) {
            currentY = -singleSetHeight;
          }
        }
        if (scrollRef.current) {
          scrollRef.current.style.transform = `translate3d(0, ${currentY}px, 0)`;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, direction]);

  // Duplicate for a seamless infinite scroll loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div 
        ref={scrollRef} 
        className="flex flex-col gap-4 will-change-transform"
      >
        {duplicatedImages.map((src, idx) => (
          <div 
            key={idx} 
            className="w-full bg-[#fafaf9] border border-amber-100 rounded-xl overflow-hidden shadow-xs shrink-0 p-1 bg-gradient-to-br from-amber-50/20 to-orange-50/20"
          >
            <img 
              src={src} 
              alt={`Tracking evidence ${idx}`} 
              className="w-full h-auto object-cover rounded-lg select-none pointer-events-none"
              referrerPolicy="no-referrer"
              loading="lazy"
              onLoad={measureHeight}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const LEFT_IMAGES = [
  "https://i.postimg.cc/wxRr4w2x/Screenshot-2026-05-29-202903.png",
  "https://i.postimg.cc/3r0qft1w/Screenshot-2026-05-29-202937.png",
  "https://i.postimg.cc/bYS5VmgN/Screenshot-2026-05-29-203022.png",
  "https://i.postimg.cc/mZ1npmjD/Screenshot-2026-05-29-203111.png",
  "https://i.postimg.cc/h4QYZ2s7/Screenshot-2026-05-29-203147.png",
  "https://i.postimg.cc/FFk6CTpc/Screenshot-2026-05-29-203246.png",
  "https://i.postimg.cc/HW8Nv6zb/Screenshot-2026-05-29-203325.png",
  "https://i.postimg.cc/FFk6CTpj/Screenshot-2026-05-29-203420.png",
  "https://i.postimg.cc/XNBP1sLg/Screenshot-2026-05-29-203522.png",
  "https://i.postimg.cc/nV9WS322/Screenshot-2026-05-29-203611.png",
  "https://i.postimg.cc/WbRHB0Yr/Screenshot-2026-05-29-203644.png",
  "https://i.postimg.cc/sDFNk5H7/Screenshot-2026-05-29-203659.png"
];

const RIGHT_IMAGES = [
  "https://i.postimg.cc/J4w2fjYd/Screenshot-2026-05-29-204908.png",
  "https://i.postimg.cc/5NcRh8Kr/Screenshot-2026-05-29-204841.png",
  "https://i.postimg.cc/nc8PyqS0/Screenshot-2026-05-29-204759.png",
  "https://i.postimg.cc/9F3n6ygb/Screenshot-2026-05-29-204339.png",
  "https://i.postimg.cc/7YvWFStn/Screenshot-2026-05-29-204026.png",
  "https://i.postimg.cc/TY84znNj/Screenshot-2026-05-29-203754.png",
  "https://i.postimg.cc/L6dbcjQG/Screenshot-2026-05-29-204954.png",
  "https://i.postimg.cc/Yqcs5QD5/Screenshot-2026-05-29-205049.png",
  "https://i.postimg.cc/wTKGCDbK/Screenshot-2026-05-29-205602.png",
  "https://i.postimg.cc/PrGRg1Fj/Screenshot-2026-05-29-205801.png",
  "https://i.postimg.cc/284Kr3gM/Screenshot-2026-05-29-205847.png"
];

interface AutoScrollGalleryProps {
  side: 'left' | 'right';
}

export default function AutoScrollGallery({ side }: AutoScrollGalleryProps) {
  const isLeft = side === 'left';
  const images = isLeft ? LEFT_IMAGES : RIGHT_IMAGES;
  const direction = isLeft ? 'up' : 'down';
  const speed = isLeft ? 0.45 : 0.4;

  return (
    <div className="absolute inset-0 w-full h-full bg-white select-none pointer-events-none p-3">
      <ScrollingColumn images={images} speed={speed} direction={direction} />

      {/* Top and Bottom gradient edge fades to blend into the pure white background */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10" />
    </div>
  );
}
