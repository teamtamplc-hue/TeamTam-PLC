import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  HelpCircle, 
  Youtube, 
  Instagram, 
  Twitter, 
  DollarSign, 
  PhoneCall, 
  FileText, 
  ArrowRight,
  Hand,
  Sparkles,
  Award
} from 'lucide-react';

// Web Audio API Chalkboard Sound Synthesizer
class ChalkboardAudio {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  private init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.setValueAtTime(750, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(2.5, this.ctx.currentTime);
      
      // Create white noise
      const bufferSize = this.ctx.sampleRate * 2; 
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;
      
      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
      
      this.noiseNode.start();
    } catch (e) {
      console.log('Friction audio setup failed or user context ignored');
    }
  }

  start(isDuster = false) {
    this.init();
    if (!this.ctx || !this.gainNode || !this.filterNode) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    const freq = isDuster ? 280 : 800;
    const Q = isDuster ? 1.2 : 3.5;
    this.filterNode.frequency.setValueAtTime(freq, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(Q, this.ctx.currentTime);
    
    this.gainNode.gain.setTargetAtTime(isDuster ? 0.28 : 0.16, this.ctx.currentTime, 0.04);
    this.isPlaying = true;
  }

  updateIntensity(speed: number) {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;
    const targetGain = Math.min(Math.max(speed * 0.12, 0.02), 0.35);
    this.gainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.04);
  }

  stop() {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;
    this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
    this.isPlaying = false;
  }

  close() {
    this.stop();
    if (this.noiseNode) {
      try {
        this.noiseNode.disconnect();
      } catch (e) {}
    }
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

const CHALK_COLORS = [
  { id: 'chalk-white', label: 'Dusty White', color: '#fcfcfc', shadowColor: 'rgba(255,255,255,0.4)', rgbArr: [252, 252, 252] },
  { id: 'chalk-yellow', label: 'Math Yellow', color: '#fef3c7', shadowColor: 'rgba(254,243,199,0.4)', rgbArr: [254, 243, 199] },
  { id: 'chalk-blue', label: 'Sky Blue', color: '#bae6fd', shadowColor: 'rgba(186,230,253,0.4)', rgbArr: [186, 230, 253] },
  { id: 'chalk-crimson', label: 'Pastel Crimson', color: '#fecdd3', shadowColor: 'rgba(254,205,211,0.4)', rgbArr: [254, 205, 211] },
];

const drawTemplate = (ctx: CanvasRenderingContext2D, width: number, height: number, pImg: HTMLImageElement | null) => {
  const scale = Math.min(width / 1000, height / 500);
  const offsetX = (width - 1000 * scale) / 2;
  const offsetY = (height - 500 * scale) / 2;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  // Helpers for sketchy chalkboard illustrations
  const drawSketchyLine = (x1: number, y1: number, x2: number, y2: number, color: string, w = 2) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Pass 1: Chalk wobble line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    const midX = (x1 + x2) / 2 + (Math.sin((x1 + y1) * 0.04) * 2);
    const midY = (y1 + y2) / 2 + (Math.cos((x2 + y2) * 0.04) * 2);
    ctx.quadraticCurveTo(midX, midY, x2, y2);
    ctx.stroke();

    // Pass 2: Secondary soft chalk grain
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = w * 0.75;
    ctx.beginPath();
    ctx.moveTo(x1 + 0.5, y1 - 0.5);
    ctx.quadraticCurveTo(midX - 0.5, midY + 0.5, x2 - 0.5, y2 + 0.5);
    ctx.stroke();
    ctx.restore();
  };

  // Small decorative doodle stars in the corners to capture that handmade feeling
  // Top Left star (sketchy asterisk)
  drawSketchyLine(80, 75, 95, 90, '#bae6fd', 1.5);
  drawSketchyLine(95, 75, 80, 90, '#bae6fd', 1.5);
  drawSketchyLine(87.5, 70, 87.5, 95, '#bae6fd', 1.5);

  // Top Right star
  drawSketchyLine(900, 75, 915, 90, '#bae6fd', 1.5);
  drawSketchyLine(915, 75, 900, 90, '#bae6fd', 1.5);
  drawSketchyLine(907.5, 70, 907.5, 95, '#bae6fd', 1.5);

  // --- DRAW TITLE ---
  ctx.textAlign = 'center';
  ctx.font = 'bold 52px "Architects Daughter", cursive';
  ctx.fillStyle = '#fef3c7'; // Match Yellow chalk
  ctx.fillText('How does it Works?', 500, 110);

  // Underline
  drawSketchyLine(280, 132, 720, 135, '#fecdd3', 3.5); // Crimson chalk underline

  // --- PIPELINE IMAGE INSTEAD OF TEXT ---
  if (pImg) {
    // Calculate aspect ratio dynamically to prevent compression
    let drawW = 850;
    let drawH = 275;
    if (pImg.naturalWidth && pImg.naturalHeight) {
      const imgAR = pImg.naturalWidth / pImg.naturalHeight;
      const boxAR = 850 / 275;
      if (imgAR > boxAR) {
        // Width-limited
        drawW = 850;
        drawH = 850 / imgAR;
      } else {
        // Height-limited
        drawH = 275;
        drawW = 275 * imgAR;
      }
    }
    const drawX = 75 + (850 - drawW) / 2;
    const drawY = 145 + (275 - drawH) / 2;

    // Draw the requested pipeline image beautifully centered and dimensioned with proper proportions
    ctx.drawImage(pImg, drawX, drawY, drawW, drawH);
  } else {
    ctx.font = '26px "Architects Daughter", cursive';
    ctx.fillStyle = '#fcfcfc';
    ctx.fillText('Loading connection pipeline...', 500, 280);
  }

  // Footnotes (doodle instructions for user)
  ctx.font = '20px "Caveat", cursive';
  ctx.fillStyle = '#a7f3d0'; // Mint green text
  ctx.fillText('✏️ Grab a piece of chalk below and doodle directly on top of this explanation!', 500, 440);

  ctx.restore();
};

export default function Chalkboard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioSynthRef = useRef<ChalkboardAudio | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('chalk-white'); // default tool
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [showHelper, setShowHelper] = useState<boolean>(true);
  const [isTemplateVisible, setIsTemplateVisible] = useState<boolean>(true);
  const [dustParticles, setDustParticles] = useState<{ x: number; y: number; size: number; alpha: number; color: string; vx: number; vy: number }[]>([]);
  const [statsWipeCount, setStatsWipeCount] = useState<number>(0);
  const lastPointRef = useRef<Point | null>(null);
  const [pipelineImg, setPipelineImg] = useState<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Load the pipeline image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://i.postimg.cc/h4w8GSh9/Untitled-wedsdsds.png';
    img.onload = () => {
      setPipelineImg(img);
    };
  }, []);

  // Sound Synth Lazy Instantiation
  useEffect(() => {
    audioSynthRef.current = new ChalkboardAudio();
    return () => {
      audioSynthRef.current?.close();
    };
  }, []);

  // Initialize Canvas & Size: bound ONLY once!
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = () => {
      setDimensions({
        width: parent.clientWidth,
        height: parent.clientHeight
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Watch parent resizing via ResizeObserver to handle dashboard tabs toggling or flex layouts
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(parent);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
    };
  }, []);

  const drawAll = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render underlying model template first so paint lines look chalky, physical, and erasable!
    if (isTemplateVisible) {
      drawTemplate(ctx, canvas.width, canvas.height, pipelineImg);
    }

    // Render client doodles and duster erasers
    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Chalk texture look
      if (stroke.color === '#transparent') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.width;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.shadowBlur = 1.5;
        ctx.shadowColor = stroke.color;
      }

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();

      // Draw standard double-strokes around boundaries to emphasize chalk texture
      if (stroke.color !== '#transparent') {
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = stroke.width * 0.7;
        ctx.strokeStyle = stroke.color;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x + 0.5, stroke.points[0].y - 0.3);
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x + 0.5, stroke.points[i].y - 0.3);
        }
        ctx.stroke();
        ctx.restore();
      }
    });

    // Reset compositing mode
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
  }, [strokes, isTemplateVisible, pipelineImg]);

  // Sync canvas width/height properties and paint elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    drawAll();
  }, [dimensions, drawAll]);

  // Redraw once fonts or images are loaded to ensure cursive writing is perfectly styled
  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        drawAll();
      });
    }
  }, [drawAll]);

  // Particle System Update Loop
  useEffect(() => {
    if (dustParticles.length === 0) return;

    const interval = setInterval(() => {
      setDustParticles((prev) => 
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.08, // downward gravity
            alpha: p.alpha - 0.03, // slowly fade out
          }))
          .filter((p) => p.alpha > 0 && p.y < (canvasRef.current?.height || 600))
      );
    }, 30);

    return () => clearInterval(interval);
  }, [dustParticles]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Prevent scrolling on touch screens when drawing
    if ('touches' in e) {
      e.stopPropagation();
    } else {
      e.preventDefault();
    }

    const point = getCanvasCoords(e);
    setIsDrawing(true);
    lastPointRef.current = point;
    setShowHelper(false);

    // Audio start
    const isDuster = selectedTool === 'duster';
    if (!isMuted && audioSynthRef.current) {
      audioSynthRef.current.start(isDuster);
    }

    const currentChalkColor = CHALK_COLORS.find(c => c.id === selectedTool);
    const strokeColor = isDuster ? '#transparent' : (currentChalkColor?.color || '#ffffff');
    const strokeWidth = isDuster ? 32 : 3.5;

    const newStroke: Stroke = {
      points: [point],
      color: strokeColor,
      width: strokeWidth
    };

    setStrokes((prev) => [...prev, newStroke]);
    setRedoStack([]);
  };

  const drawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    if ('touches' in e) {
      e.stopPropagation();
    } else {
      e.preventDefault();
    }

    const point = getCanvasCoords(e);
    const lastPoint = lastPointRef.current;
    if (!lastPoint) return;

    // Distance & velocity
    const dx = point.x - lastPoint.x;
    const dy = point.y - lastPoint.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Set synthesize velocity
    if (!isMuted && audioSynthRef.current) {
      audioSynthRef.current.updateIntensity(dist);
    }

    // Append point to the active stroke
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const copy = [...prev];
      const active = { ...copy[copy.length - 1] };
      active.points = [...active.points, point];
      copy[copy.length - 1] = active;
      return copy;
    });

    // Spawn chalk dust particles based on tool and motion
    if (dist > 3) {
      const isDuster = selectedTool === 'duster';
      const count = isDuster ? 5 : 2;
      const colorArr = isDuster 
        ? '#ececec' 
        : CHALK_COLORS.find(c => c.id === selectedTool)?.color || '#ffffff';

      const newParticles = Array.from({ length: count }).map(() => ({
        x: point.x,
        y: point.y,
        size: Math.random() * (isDuster ? 4 : 2) + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color: colorArr,
        vx: (Math.random() - 0.5) * (isDuster ? 4 : 2),
        vy: (Math.random() - 0.3) * (isDuster ? 1 : 1.5) + (isDuster ? -1 : 0),
      }));

      setDustParticles((prev) => [...prev, ...newParticles].slice(-80));
    }

    lastPointRef.current = point;
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPointRef.current = null;
    if (audioSynthRef.current) {
      audioSynthRef.current.stop();
    }
  };

  const handleClearBoard = () => {
    // Chalk sound duration on clear
    if (!isMuted && audioSynthRef.current) {
      audioSynthRef.current.start(true);
      setTimeout(() => audioSynthRef.current?.stop(), 500);
    }
    setStrokes([]);
    setRedoStack([]);
    setDustParticles([]);
    setIsTemplateVisible(false); // Fully hide the initial template too so the board becomes fully clear
    setStatsWipeCount(prev => prev + 1);
  };

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const item = strokes[strokes.length - 1];
    setStrokes(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, item]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const item = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    setStrokes(prev => [...prev, item]);
  };

  return (
    <div className="flex flex-col items-center w-full select-none" id="chalkboard-showcase-section">
      {/* Top dashboard controls */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-5xl px-4 mb-4 gap-4">
        {/* Indicators */}
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-xs font-mono text-zinc-500 font-medium">
            SIMULATING: ACTIVE SOCIAL POST ATTRIBUTION
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all outline-none ${
              !isMuted 
                ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm' 
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-200'
            }`}
            title={isMuted ? "Enable sound effects" : "Mute sound effects"}
          >
            {!isMuted ? <Volume2 size={14} className="animate-bounce" /> : <VolumeX size={14} />}
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider">
              {!isMuted ? 'Real Sounds-On' : 'Sounds Muted'}
            </span>
          </button>

          <div className="h-4 w-[1px] bg-zinc-200"></div>

          <button
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 shadow-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Undo stroke"
          >
            <RotateCcw size={14} className="scale-x-[-1]" />
          </button>

          <button
            onClick={handleClearBoard}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            title="Wipe whole board clean"
          >
            <Sparkles size={12} className="text-yellow-400" />
            Wipe & Reset
          </button>
        </div>
      </div>

      {/* Main realistic frame */}
      <div className="relative w-full max-w-5xl px-2 sm:px-4">

        {/* Wooden Frame Structure with deep 3D oak bevels matching the photo */}
        <div className="relative w-full rounded-2xl p-4 sm:p-5 transition-all bg-[#bf732a] wood-grain wood-beveled-frame chalkboard-shadow overflow-hidden">
          
          {/* Outer wood bezel shadow effects and light sheen highlights */}
          <div className="absolute inset-0 pointer-events-none border-y-[6px] border-x-[8px] border-[#cf7d34] opacity-90 z-25 rounded-2xl"></div>
          <div className="absolute inset-0 pointer-events-none border-t-[2px] border-l-[2px] border-amber-100/40 z-25 rounded-2xl"></div>

          {/* Deep inner bevel recessed container holding the actual slate board */}
          <div className="relative w-full rounded-lg overflow-hidden bg-chalkboard shadow-[inset_0_15px_40px_rgba(0,0,0,0.95),_0_2px_4px_rgba(255,255,255,0.06)]">
            
            {/* Authentic side lights & cast vignette shadows across the slate board */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/55 via-transparent to-white/10 mix-blend-multiply z-2"></div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/45 via-transparent to-black/60 mix-blend-multiply z-2"></div>

            {/* Soft ambient chalk dust texture overlay with absolutely no dot grids */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-white mix-blend-overlay z-1"></div>
            
            {/* Diagrams and models are drawn procedurally on the paint canvas layer below so they can be erased by the duster! */}
            <div className="absolute inset-0 select-none z-10 pointer-events-none" />

            {/* Canvas Painting Layer */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onMouseMove={drawMove}
            onTouchStart={startDrawing}
            onTouchEnd={endDrawing}
            onTouchMove={drawMove}
            className={`absolute inset-0 w-full h-full z-15 ${
              selectedTool === 'duster' 
                ? 'cursor-cell' 
                : 'cursor-crosshair'
            }`}
          />

          {/* Interactive Duster Outline Indicator when drawing/erasing or helper */}
          <AnimatePresence>
            {showHelper && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none bg-zinc-950/90 py-2.5 px-4 rounded-xl border border-zinc-700/50 flex items-center gap-2.5 shadow-xl max-w-xs text-center flex-col sm:flex-row"
              >
                <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500 self-center">
                  <Hand size={18} className="animate-bounce" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold font-mono">Real Interactive Board!</h4>
                  <p className="text-[10px] text-zinc-400 leading-normal mt-0.5">
                    Select colored chalks or the felt eraser below to sketch, explain, or edit the live model.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render Falling Chalk Dust Grains */}
          <div className="absolute inset-0 pointer-events-none z-18 overflow-hidden">
            {dustParticles.map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  opacity: p.alpha,
                  boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                }}
              />
            ))}
          </div>

          {/* Main spacer/filler forcing the aspect ratio on parent so canvas fits */}
          <div className="w-full pb-[500px] pointer-events-none" />

          </div> {/* Close deep inner bevel recessed container */}
        </div> {/* Close Wood Frame container */}

        {/* Tactile Wood-Grained Chalk Ledge / Chalk Tray Underneath the Board - full span matching the photo */}
        <div className="relative w-full h-9 -mt-2 z-30 wood-grain chalk-tray-shadow rounded-b-lg">
          
          {/* Ledge surface gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/30 rounded-b-lg flex items-center justify-between px-6">
            
            {/* Left Box: Interactive Color Chalk Selector Tray */}
            <div className="flex items-center gap-4 sm:gap-7 py-1 translate-y-[-1px]">
              {CHALK_COLORS.map((chalk) => {
                const isActive = selectedTool === chalk.id;
                return (
                  <button
                    key={chalk.id}
                    onClick={() => {
                      setSelectedTool(chalk.id);
                      setShowHelper(false);
                    }}
                    className="relative group focus:outline-hidden"
                    title={`Select ${chalk.label} chalk`}
                  >
                    {/* Floating label */}
                    <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-white font-mono text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-40 shadow-md">
                      {chalk.label} Chalk
                    </span>

                    {/* Highly stylized realistic 3D chalk stick cylinder lying on the shelf */}
                    <div 
                      className={`w-2.5 h-12 rounded-sm transition-all duration-300 ${
                        isActive 
                          ? 'translate-y-[-7px] rotate-[-6deg] ring-2 ring-emerald-400 shadow-[0_10px_15px_rgba(255,255,255,0.4)]' 
                          : 'rotate-[85deg] hover:translate-y-[-2px] hover:rotate-[78deg] shadow-[1px_2px_4px_rgba(0,0,0,0.4)]'
                      }`}
                      style={{
                        backgroundColor: chalk.color,
                        boxShadow: isActive ? `0 0 10px ${chalk.shadowColor}` : '1.5px 2px 3px rgba(0,0,0,0.55)',
                        borderLeft: '1px solid rgba(255,255,255,0.45)',
                        borderBottom: '2.5px solid rgba(0,0,0,0.25)',
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Box: Felt Eraser/Duster and Static Chalks lying beautifully on tray exactly like photo */}
            <div className="flex items-center gap-4 translate-y-[-1px] py-1 z-35">
              
              {/* Overlapping natural static chalk sticks lying on the wood ledge (representing the photo) */}
              <div className="hidden sm:flex items-center gap-2 translate-y-[2px] opacity-90 select-none">
                {/* 1st dusty white chalk pointing left */}
                <div 
                  className="w-2.5 h-10 bg-[#fcfcfc] rounded-sm rotate-[72deg] shadow-[1px_1.5px_3px_rgba(0,0,0,0.55)] opacity-85"
                  style={{ borderLeft: '1.2px solid rgba(255,255,255,0.4)', borderBottom: '2px solid rgba(0,0,0,0.2)' }}
                />
                {/* 2nd golden yellow chalk pointing right */}
                <div 
                  className="w-2 h-8 bg-[#fef3c7] rounded-sm rotate-[105deg] shadow-[1px_1.5px_3px_rgba(0,0,0,0.55)] opacity-75"
                  style={{ borderLeft: '1.2px solid rgba(255,255,255,0.4)', borderBottom: '2px solid rgba(0,0,0,0.2)' }}
                />
              </div>

              {/* Felt Eraser/Duster Block configured exactly as in the photo */}
              <button
                onClick={() => {
                  setSelectedTool('duster');
                  setShowHelper(false);
                }}
                className={`relative group px-1 focus:outline-hidden transition-all duration-300 ${
                  selectedTool === 'duster'
                    ? 'translate-y-[-8px] -rotate-3 ring-2 ring-emerald-400'
                    : 'rotate-[4deg] hover:translate-y-[-2px]'
                }`}
                title="Select Felt Duster Eraser"
              >
                {/* Duster Label */}
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-white font-mono text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-40 shadow-md">
                  Chalk Eraser (Wipe Tool)
                </span>

                {/* Styled 3D Wooden/Felt Duster Eraser Block matching the photo exactly (Brown base + Red felt layer) */}
                <div className="w-16 h-5.5 rounded bg-[#9c5a3c] shadow-[1.5px_3px_5px_rgba(0,0,0,0.5)] border-b border-black/30 overflow-hidden flex flex-col justify-between">
                  {/* Top warm wooden segment */}
                  <div className="h-2 bg-[#5c3521] border-b border-black/35 flex inset-x-0 top-0 items-center justify-center">
                    <div className="w-7 h-[1.5px] bg-[#a86542] rounded-full opacity-60"></div>
                  </div>
                  {/* Clay-Red/Felt block underneath */}
                  <div className="h-full bg-[#bd4a34] flex flex-col justify-center px-1">
                    <div className="h-[2px] bg-[#d65f49] w-full opacity-50"></div>
                  </div>
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Stats wiped meter */}
      <div className="mt-8 flex items-center gap-6 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Award size={13} className="text-amber-500" />
          <span>Interactive Canvas Ready</span>
        </div>
        <div className="w-[1px] h-3 bg-zinc-300"></div>
        <div>
          <span>Board wiped: <strong className="text-zinc-700">{statsWipeCount}</strong> times</span>
        </div>
        <div className="w-[1px] h-3 bg-zinc-300"></div>
        <button 
          onClick={() => {
            // Restore default schema template if users wiped and want it back
            setStrokes([]);
            setRedoStack([]);
            setIsTemplateVisible(true);
          }} 
          className="text-amber-600 hover:text-amber-800 transition-colors cursor-pointer hover:underline font-bold"
        >
          Reset Demo Diagram
        </button>
      </div>
    </div>
  );
}
