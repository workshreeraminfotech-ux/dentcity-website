import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const rawAwardImages = import.meta.glob(
  '/src/assets/home achivement/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
);
const awardImages = Object.values(rawAwardImages) as string[];

interface ImageInfo {
  src: string;
  isHorizontal: boolean;
}

export const HomeAchievements = () => {
  const [paused, setPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [sortedImages, setSortedImages] = useState<ImageInfo[]>([]);

  // Dynamically group horizontal first, then vertical
  useEffect(() => {
    let active = true;
    const loadAndSort = async () => {
      const imagePromises = awardImages.map((src) => {
        return new Promise<ImageInfo>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            resolve({
              src,
              isHorizontal: img.naturalWidth >= img.naturalHeight,
            });
          };
          img.onerror = () => {
            resolve({ src, isHorizontal: true });
          };
          img.src = src;
        });
      });

      const results = await Promise.all(imagePromises);
      if (!active) return;

      const horizontals = results.filter((r) => r.isHorizontal);
      const verticals = results.filter((r) => !r.isHorizontal);

      setSortedImages([...horizontals, ...verticals]);
    };

    loadAndSort();
    return () => {
      active = false;
    };
  }, []);

  const displayImages = sortedImages.length > 0
    ? sortedImages
    : awardImages.map((src) => ({ src, isHorizontal: true }));

  const totalItems = displayImages.length;

  // Lightbox Navigation
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null)
      setLightboxIndex((p) => (p! - 1 + displayImages.length) % displayImages.length);
  }, [lightboxIndex, displayImages]);

  const goNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null)
      setLightboxIndex((p) => (p! + 1) % displayImages.length);
  }, [lightboxIndex, displayImages]);

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
      setLightboxIndex((p) => p !== null ? (p + 1) % displayImages.length : null);
    }, 3000);
    return () => clearInterval(id);
  }, [lightboxIndex, displayImages]);

  if (awardImages.length === 0) {
    return (
      <section className="section-padding bg-background relative z-10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          No awards found. Please add photos to src/assets/home achivement.
        </div>
      </section>
    );
  }

  // Card gap and copies
  const GAP = 20;       // px gap between cards
  const COPIES = 4;     // enough copies so strip always overflows any screen

  // Sum of widths of one full loop of cards plus gaps
  const loopWidth = displayImages.reduce((sum, img) => {
    const cardWidth = img.isHorizontal ? 290 : 220;
    return sum + cardWidth + GAP;
  }, 0);

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
          align-items: center;
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
              <span className="w-8 h-[2px] bg-[#54391E]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#54391E]">
                Excellence Recognised
              </span>
              <span className="w-8 h-[2px] bg-[#54391E]" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight mb-4">
              Our Awards & <span className="text-[#54391E]">Achievements</span>
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
            {Array.from({ length: COPIES }, () => displayImages).flat().map((img, idx) => {
              const cardW = img.isHorizontal ? 290 : 220;
              const cardH = img.isHorizontal ? 220 : 290;
              return (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx % totalItems)}
                  className="flex-shrink-0 rounded-[4px] bg-[#3D3D3D] border-[6px] border-[#2A2A2A] shadow-md group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 p-2.5"
                  style={{ width: cardW, height: cardH }}
                >
                  <div className="w-full h-full relative border border-white/10 overflow-hidden bg-[#1E1E1E]">
                    <img
                      src={img.src}
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
              );
            })}
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
                src={displayImages[lightboxIndex].src}
                alt={`Award Image ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-[-30px] md:bottom-[-40px] left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest font-mono">
                {lightboxIndex + 1} / {displayImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
