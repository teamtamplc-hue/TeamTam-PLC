import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  color: string;
  text: string;
}

export default function SparklingMoneyTitle() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hovered, setHovered] = useState(false);
  
  const containerRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const spawnRef = useRef<(x: number, y: number) => void>(() => {});

  spawnRef.current = (x: number, y: number) => {
    const id = counterRef.current++;
    const randomScale = 0.5 + Math.random() * 0.8; // custom scale distribution
    const randomRotate = (Math.random() - 0.5) * 120; // rotation offset
    
    // Rich money color scheme
    const colors = [
      'text-emerald-500', 
      'text-yellow-400', 
      'text-amber-500', 
      'text-emerald-400',
      'text-yellow-300',
      'text-amber-600'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const textArr = ['$', '$$', '$', '$$$'];
    const text = textArr[Math.floor(Math.random() * textArr.length)];
    
    const newParticle: Particle = {
      id,
      x,
      y,
      scale: randomScale,
      rotate: randomRotate,
      color,
      text
    };
    
    setParticles((prev) => [...prev, newParticle].slice(-40)); // keep array slim for performance
    
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  useEffect(() => {
    if (!hovered) return;
    
    // Emit gentle background sparkles when hovering in-place
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth || 240;
      const height = containerRef.current.offsetHeight || 60;
      
      const rx = 10 + Math.random() * (width - 20);
      const ry = 10 + Math.random() * (height - 20);
      spawnRef.current(rx, ry);
    }, 150);
    
    return () => clearInterval(interval);
  }, [hovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const now = Date.now();
    if (now - lastSpawnRef.current > 25) { // responsive spawning frequency
      spawnRef.current(x, y);
      lastSpawnRef.current = now;
    }
  };

  return (
    <span 
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative inline-block z-1 cursor-crosshair select-none"
    >
      {/* High impact display typography */}
      <span className="relative z-10 text-amber-700 font-serif italic font-medium px-2 block transition-transform duration-300 hover:scale-[1.02]">
        Making You Money
      </span>
      <span className="absolute bottom-2 left-0 right-0 h-4 bg-amber-100/95 -rotate-1 -z-1 rounded-sm"></span>
      
      {/* Sparkling absolute container layer with zero collision */}
      <span className="absolute inset-0 pointer-events-none overflow-visible z-35">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ 
                opacity: 0, 
                scale: 0.15, 
                x: p.x, 
                y: p.y, 
                rotate: p.rotate 
              }}
              animate={{ 
                opacity: [0, 1, 0.4, 1, 0.3, 1, 0], // glittering flickering effect keyframes
                scale: [0.15, p.scale, p.scale * 1.25, 0], // growth-and-bloom trajectory
                y: p.y - (45 + Math.random() * 45), // vertical anti-grav drift
                x: p.x + (Math.random() - 0.5) * 50, // horizontal air drift range
                rotate: p.rotate + (Math.random() - 0.5) * 200 // smooth rotation delta
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.8 + Math.random() * 0.4, 
                ease: "easeOut" 
              }}
              style={{ 
                position: 'absolute',
                left: 0,
                top: 0,
                transform: 'translate(-50%, -50%)',
                fontSize: '12px',
                fontWeight: 900,
                textShadow: '0 0 7px rgba(245, 158, 11, 0.3), 0 0 2px rgba(16, 185, 129, 0.2)',
              }}
              className={`font-serif leading-none select-none tracking-normal pointer-events-none z-45 ${p.color}`}
            >
              {p.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </span>
  );
}
