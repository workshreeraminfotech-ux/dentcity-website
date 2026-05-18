import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const rawAwardImages = import.meta.glob(
  '/src/assets/home achivement/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
);
const awardImages = Object.values(rawAwardImages) as string[];

export const HomeAchievements = () => {
  const [paused, setPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lightbox Navigation
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null)
      setLightboxIndex((p) => (p! - 1 + awardImages.length) % awardImages.length);
  }, [lightboxIndex]);

  const goNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null)
      setLightboxIndex((p) => (p! + 1) % awardImages.length);
  }, [lightboxIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, goPrev, goNext]);

  // Lightbox auto-transition
  useEffect(() => {
    if (lightboxIndex === null) return;
    const id = setInterval(() => {
      setLightboxIndex((p) => p !== null ? (p + 1) % awardImages.length : null);
    }, 3000);
    return () => clearInterval(id);
  }, [lightboxIndex]);

  if (awardImages.length === 0) {
    return (
      <section className="section-padding bg-background relative z-10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          No awards found. Please add photos to src/assets/home achivement.
        </div>
      </section>
    );
  }

  // Card dimensions
  const CARD_W = 220;   // px per card
  const CARD_H = 270;   // px height
  const GAP = 20;       // px gap between cards
  const COPIES = 4;     // enough copies so strip always overflows any screen
  const totalItems = awardImages.length;
  // Animate exactly ONE set width so the loop is seamless
  const loopWidth = (CARD_W + GAP) * totalItems;

  return (
    <>
      {/* ── Keyframe injection ── */}
      <style>{`
        @keyframes home-awards-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${loopWidth}px); }
        }
        .home-awards-track {
          display: flex;
          gap: ${GAP}px;
          width: max-content;
          animation: home-awards-scroll 35s linear infinite;
          will-change: transform;
        }
        .home-awards-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <section className="section-padding bg-background relative z-10 overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#D4AF37]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
                Excellence Recognised
              </span>
              <span className="w-8 h-[2px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight mb-4">
              Our Awards & <span className="text-[#D4AF37]">Achievements</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed">
              A testament to our commitment to delivering world-class dental care and our dedication to continuous innovation and excellence in dentistry.
            </p>
          </motion.div>
        </div>

        {/* ── Scroll strip ── */}
        <div
          className="w-full relative mt-2 md:mt-8 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* pt/pb via wrapper div — NOT on track — so gap calc stays correct */}
          <div className={`home-awards-track py-4 ${paused || lightboxIndex !== null ? "paused" : ""}`}>
            {/* 4 copies → strip always wider than any screen */}
            {Array.from({ length: COPIES }, () => awardImages).flat().map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx % totalItems)}
                className="flex-shrink-0 rounded-2xl overflow-hidden bg-white/70 border border-border/60 shadow-sm group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-105"
                style={{ width: CARD_W, height: CARD_H }}
              >
                <div className="w-full h-full relative rounded-xl overflow-hidden">
                  <img
                    src={img}
                    alt={`Dentcity Award ${(idx % totalItems) + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edge fades */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={goPrev}
              className="absolute left-2 md:left-8 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 border border-white/25 backdrop-blur-sm rounded-full text-white transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-2 md:right-8 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-white/25 border border-white/25 backdrop-blur-sm rounded-full text-white transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-[95vw] md:max-w-4xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={awardImages[lightboxIndex]}
                alt={`Award Image ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-[-30px] md:bottom-[-40px] left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest font-mono">
                {lightboxIndex + 1} / {awardImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
