import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Award, Building2, ImageIcon, Stethoscope, ArrowRight } from "lucide-react";

import reception from "@/assets/gallery/reception.webp";
import reception2 from "@/assets/gallery/reception2.webp";
import treatmentRoom from "@/assets/gallery/treatment-room.webp";
import doctorCabin from "@/assets/gallery/doctor-cabin.webp";
import equipment1 from "@/assets/gallery/equipment1.webp";
import equipment2 from "@/assets/gallery/equipment2.webp";
import building from "@/assets/gallery/building.webp";
import lobby from "@/assets/gallery/lobby.webp";
import equipment3 from "@/assets/gallery/equipment3.webp";
import frontView from "@/assets/gallery/front-view.webp";
import childrenRoom from "@/assets/gallery/children-room.webp";
import checkupRoom from "@/assets/gallery/checkup-room.webp";
import reception3 from "@/assets/gallery/reception3.webp";
import img3399 from "@/assets/gallery/IMG_3399.JPG";
import nj04491 from "@/assets/gallery/NJ_04491.jpg";
import nj04571 from "@/assets/gallery/NJ_04571.jpg";
import nj04652 from "@/assets/gallery/NJ_04652.jpg";
import nj04654 from "@/assets/gallery/NJ_04654.jpg";


interface GalleryImage {
  src: string;
  alt: string;
  category: "clinic";
}

const allImages: GalleryImage[] = [
  { src: frontView,     alt: "DENTCITY Front View",           category: "clinic" },
  { src: building,      alt: "Clinic Building",               category: "clinic" },
  { src: lobby,         alt: "Clinic Lobby",                  category: "clinic" },
  { src: reception,     alt: "Reception Area",                category: "clinic" },
  { src: reception2,    alt: "Waiting Lounge",                category: "clinic" },
  { src: doctorCabin,   alt: "Doctor's Cabin",                category: "clinic" },
  { src: treatmentRoom, alt: "Treatment Room",                category: "clinic" },
  { src: equipment1,    alt: "Digital X-Ray Machine",         category: "clinic" },
  { src: equipment2,    alt: "Advanced Dental Instruments",   category: "clinic" },
  { src: equipment3,    alt: "Sterilization & Equipment",     category: "clinic" },
  { src: childrenRoom,  alt: "Pediatric Dental Room",         category: "clinic" },
  { src: checkupRoom,   alt: "Checkup Room",                  category: "clinic" },
  { src: reception3,    alt: "Reception & Lounge",            category: "clinic" },
  { src: img3399,       alt: "Premium Consulting Suite",      category: "clinic" },
  { src: nj04491,       alt: "Advanced Treatment Suite",      category: "clinic" },
  { src: nj04571,       alt: "Dual Treatment Rooms",          category: "clinic" },
  { src: nj04652,       alt: "Modern Clinical Setup",         category: "clinic" },
  { src: nj04654,       alt: "State-of-the-Art Facility",     category: "clinic" },
];

const Gallery = ({ isStandalone = false }: { isStandalone?: boolean }) => {
  
  // Custom Lightbox State decoupled from active tab
  const [lightboxData, setLightboxData] = useState<{
    images: { src: string; alt: string; category: string }[];
    index: number;
  } | null>(null);

  const filtered = allImages;

  const openLightbox = (images: { src: string; alt: string; category: string }[], index: number) => {
    setLightboxData({ images, index });
  };
  
  const closeLightbox = () => setLightboxData(null);

  const goPrev = useCallback(() => {
    if (!lightboxData) return;
    setLightboxData((prev) => ({
      ...prev!,
      index: (prev!.index - 1 + prev!.images.length) % prev!.images.length
    }));
  }, [lightboxData]);

  const goNext = useCallback(() => {
    if (!lightboxData) return;
    setLightboxData((prev) => ({
      ...prev!,
      index: (prev!.index + 1) % prev!.images.length
    }));
  }, [lightboxData]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxData) return;
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxData, goPrev, goNext]);

  const selectedImage = lightboxData ? lightboxData.images[lightboxData.index] : null;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className={`relative bg-white pb-6 overflow-hidden ${isStandalone ? "pt-20 md:pt-24" : "pt-6 md:pt-8"}`}>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
                Our Gallery
              </span>
              <span className="w-8 h-[2px] bg-[#54391E]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight mb-4">
              Clinic & <span className="text-[#54391E]">Facilities</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
              Step inside DENTCITY — explore our world-class clinical infrastructure and modern facilities.
            </p>
          </motion.div>
        </div>
      </section>



      {/* ── MAIN CONTENT ── */}
      <section className="gallery-grid-section">
        <div className="gallery-container">
          
          {/* Masonry View */}
          <motion.div
            className="gallery-masonry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="popLayout">
                {filtered.map((img, i) => (
                  <motion.div
                    key={img.src}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ delay: (i % 9) * 0.055, duration: 0.45, ease: "easeOut" }}
                    className="gallery-card"
                    onClick={() => openLightbox(filtered, i)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View ${img.alt}`}
                    onKeyDown={(e) => e.key === "Enter" && openLightbox(filtered, i)}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" className="gallery-card-img" />

                    {/* Hover overlay */}
                    <div className="gallery-card-overlay">
                      <div className="gallery-card-overlay-inner">
                        <ZoomIn size={28} className="gallery-card-zoom-icon" />
                        <p className="gallery-card-label">{img.alt}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          {filtered.length === 0 && (
            <div className="gallery-empty">
              <ImageIcon size={48} />
              <p>No photos here yet — check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────── */}
      <AnimatePresence>
        {selectedImage && lightboxData && (
          <motion.div
            id="gallery-lightbox"
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              id="gallery-lightbox-close"
              className="gallery-lb-btn gallery-lb-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              id="gallery-lightbox-prev"
              className="gallery-lb-btn gallery-lb-prev"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <motion.div
              className="gallery-lb-img-wrap"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="gallery-lb-img"
              />
              <div className="gallery-lb-caption">
                <p className="gallery-lb-alt">{selectedImage.alt}</p>
                <span className="gallery-lb-counter">
                  {lightboxData.index + 1} / {lightboxData.images.length}
                </span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              id="gallery-lightbox-next"
              className="gallery-lb-btn gallery-lb-next"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INLINE STYLES ────────────────────────────────── */}
      <style>{`
        .gallery-hero-subtitle {
          font-size: 1.05rem;
          color: #94a3b8;
          max-width: 560px;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }
        .gallery-hero-stats {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          flex-wrap: wrap;
        }
        .gallery-stat-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(84,57,30,0.15);
          border-radius: 1rem;
          padding: 0.8rem 1.6rem;
          min-width: 110px;
        }
        .gallery-stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #54391E;
          line-height: 1;
        }
        .gallery-stat-label {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 0.3rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── FILTER BAR ── */
        .gallery-filter-section {
          background: #FAFAFA;
          padding: 1.5rem 1rem;
          border-bottom: 1px solid #eaeaea;
          position: sticky;
          top: 72px;
          z-index: 40;
        }
        .gallery-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .gallery-filter-bar {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .gallery-filter-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.3rem;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 600;
          border: 1.5px solid #eaeaea;
          background: #fff;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.22s ease;
          overflow: hidden;
        }
        .gallery-filter-btn:hover {
          border-color: #54391E;
          color: #54391E;
          background: rgba(84,57,30,0.05);
        }
        .gallery-filter-btn.active {
          background: #54391E;
          border-color: #54391E;
          color: #fff;
        }
        .gallery-filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 22px;
          height: 22px;
          padding: 0 6px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(0,0,0,0.05);
          color: #6b7280;
        }
        .gallery-filter-btn.active .gallery-filter-count {
          background: rgba(255,255,255,0.25);
          color: #fff;
        }
        .gallery-filter-underline {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: #fff;
          border-radius: 999px;
        }

        /* ── GRID ── */
        .gallery-grid-section {
          background: #ffffff;
          padding: 3rem 1rem 5rem;
        }
        .gallery-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-flow: dense;
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .gallery-masonry { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }
        @media (max-width: 560px) {
          .gallery-masonry { grid-template-columns: 1fr; }
        }

        /* ── CARD ── */
        .gallery-card {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          cursor: pointer;
          background: #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          outline: none;
          border: 1px solid #f0f0f0;
        }
        .gallery-card:hover,
        .gallery-card:focus-visible {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .gallery-card-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .gallery-card:hover .gallery-card-img { transform: scale(1.08); }

        /* Hover overlay */
        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 55%, transparent 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
          display: flex;
          align-items: flex-end;
          padding: 1.2rem;
        }
        .gallery-card:hover .gallery-card-overlay,
        .gallery-card:focus-visible .gallery-card-overlay { opacity: 1; }
        .gallery-card-overlay-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          width: 100%;
        }
        .gallery-card-zoom-icon {
          color: #54391E;
          margin-bottom: 0.2rem;
        }
        .gallery-card-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #f8fafc;
          line-height: 1.3;
        }

        /* Badge */
        .gallery-card-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }
        .badge-clinic {
          background: rgba(84,57,30,0.85);
          color: #fff;
        }
        .badge-achievements {
          background: rgba(255,255,255,0.85);
          color: #000;
        }
        .badge-treatments {
          background: rgba(34,34,34,0.85);
          color: #54391E;
          border: 1px solid #54391E;
        }

        /* ── TREATMENT PROCESS UI ── */
        .gallery-treatments-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .treatment-case-card {
          background: #0a0a0a;
          border-radius: 1.25rem;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          border: 1px solid #222;
          overflow: hidden;
        }
        .treatment-case-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          border-bottom: 2px solid #222;
          padding-bottom: 1rem;
        }
        .treatment-case-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
        .case-badge {
          background: #111;
          color: #54391E;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid #333;
        }
        .treatment-process-flow {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .process-step-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .process-step {
          position: relative;
          width: 220px;
          height: 220px;
          border-radius: 1rem;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          border: 2px solid #222;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .process-step:hover {
          border-color: #54391E;
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(84,57,30,0.15);
        }
        .process-step-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .step-number {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          background: #000;
          color: #54391E;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .step-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .process-step:hover .step-overlay {
          opacity: 1;
        }
        .step-zoom {
          color: #54391E;
        }
        .process-arrow {
          color: #333;
          width: 2rem;
          height: 2rem;
        }
        @media (max-width: 768px) {
          .process-step { width: 160px; height: 160px; }
          .treatment-process-flow { gap: 1rem; }
          .process-step-container { gap: 1rem; }
          .hidden.md\\:block { display: none; }
        }
        @media (max-width: 480px) {
          .treatment-case-card { padding: 1.25rem; }
          .process-step { width: 100%; height: 260px; }
          .process-step-container { width: 100%; justify-content: center; }
        }

        /* Empty */
        .gallery-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 5rem 1rem;
          color: #666;
          font-size: 1rem;
        }

        /* ── LIGHTBOX ── */
        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0, 0, 0, 0.98);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .gallery-lb-img-wrap {
          max-width: min(90vw, 900px);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .gallery-lb-img {
          max-height: 78vh;
          max-width: 100%;
          width: auto;
          border-radius: 1rem;
          object-fit: contain;
          box-shadow: 0 32px 80px rgba(84,57,30,0.15);
        }
        .gallery-lb-caption {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .gallery-lb-alt {
          color: #54391E;
          font-size: 0.92rem;
          font-weight: 500;
        }
        .gallery-lb-counter {
          color: #666;
          font-size: 0.8rem;
          margin-left: auto;
        }
        .gallery-lb-btn {
          position: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(84,57,30,0.3);
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 201;
        }
        .gallery-lb-close {
          top: 1.2rem; right: 1.2rem;
          background: rgba(0,0,0,0.5);
          color: #54391E;
        }
        .gallery-lb-close:hover { background: rgba(84,57,30,0.2); transform: rotate(90deg); border-color: #54391E; }
        .gallery-lb-prev {
          left: 1rem;
          top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          color: #54391E;
        }
        .gallery-lb-prev:hover { background: rgba(84,57,30,0.2); transform: translateY(-50%) scale(1.1); border-color: #54391E; }
        .gallery-lb-next {
          right: 1rem;
          top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          color: #54391E;
        }
        .gallery-lb-next:hover { background: rgba(84,57,30,0.2); transform: translateY(-50%) scale(1.1); border-color: #54391E; }

        @media (max-width: 640px) {
          .gallery-lb-prev { left: 0.4rem; width: 40px; height: 40px; }
          .gallery-lb-next { right: 0.4rem; width: 40px; height: 40px; }
        }
      `}</style>
    </>
  );
};

export default Gallery;
