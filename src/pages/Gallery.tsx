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
import pic1 from "@/assets/gallery/achievements/Picture1.jpg";
import pic2 from "@/assets/gallery/achievements/Picture2.jpg";
import pic4 from "@/assets/gallery/achievements/Picture4.jpg";
import pic6 from "@/assets/gallery/achievements/Picture6.jpg";
import pic12 from "@/assets/gallery/achievements/Picture12.jpg";
import pic13 from "@/assets/gallery/achievements/Picture13.jpg";
import pic16 from "@/assets/gallery/achievements/Picture16.jpg";
import pic22 from "@/assets/gallery/achievements/Picture22.jpg";
import pic24 from "@/assets/gallery/achievements/Picture24.jpg";
import pic26 from "@/assets/gallery/achievements/Picture26.jpg";
import pic27 from "@/assets/gallery/achievements/Picture27.jpg";
import pic30 from "@/assets/gallery/achievements/Picture30.jpg";
import pic32 from "@/assets/gallery/achievements/Picture32.jpg";
import pic34 from "@/assets/gallery/achievements/Picture34.jpg";
import pic35 from "@/assets/gallery/achievements/Picture35.jpg";
import pic36 from "@/assets/gallery/achievements/Picture36.jpg";
import pic38 from "@/assets/gallery/achievements/Picture38.jpg";
import pic39 from "@/assets/gallery/achievements/Picture39.jpg";
import pic41 from "@/assets/gallery/achievements/Picture41.jpg";
import pic42 from "@/assets/gallery/achievements/Picture42.jpg";
import pic43 from "@/assets/gallery/achievements/Picture43.jpg";
import pic44 from "@/assets/gallery/achievements/Picture44.jpg";
import pic45 from "@/assets/gallery/achievements/Picture45.jpg";
import pic46 from "@/assets/gallery/achievements/Picture46.jpg";
import pic47 from "@/assets/gallery/achievements/Picture47.jpg";
import pic48 from "@/assets/gallery/achievements/Picture48.jpg";
import pic49 from "@/assets/gallery/achievements/Picture49.jpg";

interface GalleryImage {
  src: string;
  alt: string;
  category: "clinic" | "achievements";
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
  { src: pic1,  alt: "Dr. Rathin Bhindi — Achievement",       category: "achievements" },
  { src: pic2,  alt: "Certificate of Excellence",             category: "achievements" },
  { src: pic4,  alt: "Award Ceremony",                        category: "achievements" },
  { src: pic6,  alt: "Recognition Award",                     category: "achievements" },
  { src: pic12, alt: "International Certification",           category: "achievements" },
  { src: pic13, alt: "Diploma Award",                         category: "achievements" },
  { src: pic16, alt: "Conference Achievement",                category: "achievements" },
  { src: pic22, alt: "Certificate Presentation",              category: "achievements" },
  { src: pic24, alt: "Achievement Felicitation",              category: "achievements" },
  { src: pic26, alt: "Award Presentation",                    category: "achievements" },
  { src: pic27, alt: "Excellence Award",                      category: "achievements" },
  { src: pic30, alt: "Distinguished Achievement",             category: "achievements" },
  { src: pic32, alt: "Certification Ceremony",                category: "achievements" },
  { src: pic34, alt: "Dental Excellence Award",               category: "achievements" },
  { src: pic35, alt: "International Implant Foundation",      category: "achievements" },
  { src: pic36, alt: "Felicitation Ceremony",                 category: "achievements" },
  { src: pic38, alt: "Award — Dr. Rathin Bhindi",             category: "achievements" },
  { src: pic39, alt: "Recognition Ceremony",                  category: "achievements" },
  { src: pic41, alt: "Achievement Recognition",               category: "achievements" },
  { src: pic42, alt: "Certificate of Achievement",            category: "achievements" },
  { src: pic43, alt: "Conference Recognition",                category: "achievements" },
  { src: pic44, alt: "Award Felicitation",                    category: "achievements" },
  { src: pic45, alt: "Dental Implant Foundation",             category: "achievements" },
  { src: pic46, alt: "Recognition Award Ceremony",            category: "achievements" },
  { src: pic47, alt: "Distinguished Dentist Award",           category: "achievements" },
  { src: pic48, alt: "Achievement Diploma",                   category: "achievements" },
  { src: pic49, alt: "Excellence in Dentistry",               category: "achievements" },
];

const rawServiceImages = import.meta.glob('/src/assets/our services/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' });

interface ServiceCase {
  serviceName: string;
  caseName: string;
  images: { url: string; filename: string }[];
}

const serviceCasesObj: Record<string, ServiceCase> = {};

Object.entries(rawServiceImages).forEach(([path, url]) => {
  const parts = path.split('/our services/')[1].split('/');
  let serviceName = parts[0];
  let caseName = "Case / Outcome";
  let filename = parts[parts.length - 1];

  if (parts.length > 2) {
    caseName = parts[1];
  }

  const key = `${serviceName}-${caseName}`;
  if (!serviceCasesObj[key]) {
    serviceCasesObj[key] = { serviceName, caseName, images: [] };
  }
  serviceCasesObj[key].images.push({ url: url as string, filename });
});

// Sort to group identical services together
const serviceCases = Object.values(serviceCasesObj)
  .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
  .map(c => ({
    ...c,
    images: c.images.sort((a, b) => a.filename.localeCompare(b.filename))
  }));

const FILTERS = [
  { key: "all",          label: "All Photos",          icon: ImageIcon },
  { key: "clinic",       label: "Clinic & Facilities", icon: Building2 },
  { key: "treatments",   label: "Treatment Processes", icon: Stethoscope },
  { key: "achievements", label: "Doctor Achievements", icon: Award },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  
  // Custom Lightbox State decoupled from active tab
  const [lightboxData, setLightboxData] = useState<{
    images: { src: string; alt: string; category: string }[];
    index: number;
  } | null>(null);

  const filtered = activeFilter === "all"
    ? allImages
    : allImages.filter((img) => img.category === activeFilter);

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
      <section className="gallery-hero">
        <div className="gallery-hero-bg" />
        <div className="gallery-hero-overlay" />
        <div className="gallery-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="gallery-hero-eyebrow">Our Gallery</span>
            <h1 className="gallery-hero-title">Clinic, Facilities &amp; Achievements</h1>
            <p className="gallery-hero-subtitle">
              Step inside DENTCITY — explore our world-class infrastructure and the milestones that define our legacy.
            </p>
          </motion.div>

          {/* Stat pills */}
          <motion.div
            className="gallery-hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            {[
              { value: "13+", label: "Clinic Spaces" },
              { value: "27+", label: "Awards & Certs" },
              { value: "15+", label: "Years of Excellence" },
            ].map((s) => (
              <div key={s.label} className="gallery-stat-pill">
                <span className="gallery-stat-value">{s.value}</span>
                <span className="gallery-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative floating circles */}
        <div className="gallery-hero-deco deco-1" />
        <div className="gallery-hero-deco deco-2" />
      </section>

      {/* ── FILTER TABS ──────────────────────────────────── */}
      <section className="gallery-filter-section">
        <div className="gallery-container">
          <div className="gallery-filter-bar">
            {FILTERS.map(({ key, label, icon: Icon }) => {
              const count = key === "all"
                ? allImages.length
                : allImages.filter((i) => i.category === key).length;
              return (
                <button
                  key={key}
                  id={`gallery-filter-${key}`}
                  onClick={() => { setActiveFilter(key); setLightboxData(null); }}
                  className={`gallery-filter-btn${activeFilter === key ? " active" : ""}`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  <span className="gallery-filter-count">{count}</span>
                  {activeFilter === key && (
                    <motion.div className="gallery-filter-underline" layoutId="filterUnderline" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="gallery-grid-section">
        <div className="gallery-container">
          
          {/* Treatments View */}
          {activeFilter === "treatments" ? (
            <motion.div
              key="treatments-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="gallery-treatments-wrapper"
            >
              {serviceCases.length > 0 ? (
                serviceCases.map((c, i) => {
                  // Format service name
                  const displayName = c.serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  const formattedImages = c.images.map((img, j) => ({
                    src: img.url,
                    alt: `${displayName} - Step ${j + 1}`,
                    category: "treatment-step",
                  }));

                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="treatment-case-card"
                      key={`${c.serviceName}-${c.caseName}`}
                    >
                      <div className="treatment-case-header">
                        <h3>{displayName}</h3>
                        <span className="case-badge">{c.caseName}</span>
                      </div>
                      
                      <div className="treatment-process-flow">
                        {c.images.map((img, j) => (
                          <div key={img.url} className="process-step-container">
                            <div 
                              className="process-step" 
                              onClick={() => openLightbox(formattedImages, j)}
                            >
                              <img src={img.url} alt={`Step ${j+1}`} loading="lazy" className="process-step-img" />
                              <div className="step-overlay">
                                <ZoomIn size={24} className="step-zoom" />
                              </div>
                              <div className="step-number">{j + 1}</div>
                            </div>
                            {j < c.images.length - 1 && (
                              <ArrowRight className="process-arrow hidden md:block" />
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="gallery-empty">
                  <Stethoscope size={48} />
                  <p>No treatment cases found.</p>
                </div>
              )}
            </motion.div>
          ) : (
            /* Masonry View */
            <motion.div
              key={activeFilter}
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

                    {/* Category badge */}
                    <span className={`gallery-card-badge badge-${img.category}`}>
                      {img.category === "clinic" ? "Clinic" : "Achievement"}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {activeFilter !== "treatments" && filtered.length === 0 && (
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
                <span className={`gallery-lb-badge badge-${selectedImage.category.replace('treatment-step', 'treatments')}`}>
                  {selectedImage.category === "clinic" ? "Clinic" : selectedImage.category === "achievements" ? "Achievement" : "Process Step"}
                </span>
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
        /* ── HERO ── */
        .gallery-hero {
          position: relative;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 120px 1rem 80px;
        }
        .gallery-hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0c1a30 100%);
        }
        .gallery-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 40%, rgba(14,165,233,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.14) 0%, transparent 55%);
        }
        .gallery-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 760px;
          margin: 0 auto;
        }
        .gallery-hero-eyebrow {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #38bdf8;
          background: rgba(56,189,248,0.12);
          border: 1px solid rgba(56,189,248,0.28);
          border-radius: 999px;
          padding: 0.3rem 1rem;
          margin-bottom: 1.2rem;
        }
        .gallery-hero-title {
          font-size: clamp(2rem, 5vw, 3.4rem);
          font-weight: 800;
          color: #f8fafc;
          line-height: 1.15;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
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
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 1rem;
          padding: 0.8rem 1.6rem;
          min-width: 110px;
        }
        .gallery-stat-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #38bdf8;
          line-height: 1;
        }
        .gallery-stat-label {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 0.3rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .gallery-hero-deco {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(60px);
          opacity: 0.18;
        }
        .deco-1 {
          width: 420px; height: 420px;
          background: #0ea5e9;
          top: -120px; right: -100px;
        }
        .deco-2 {
          width: 300px; height: 300px;
          background: #6366f1;
          bottom: -80px; left: -60px;
        }

        /* ── FILTER BAR ── */
        .gallery-filter-section {
          background: #f8fafc;
          padding: 1.5rem 1rem;
          border-bottom: 1px solid #e2e8f0;
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
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #475569;
          cursor: pointer;
          transition: all 0.22s ease;
          overflow: hidden;
        }
        .gallery-filter-btn:hover {
          border-color: #0ea5e9;
          color: #0ea5e9;
          background: #f0f9ff;
        }
        .gallery-filter-btn.active {
          background: #0c1a30;
          border-color: #0c1a30;
          color: #f8fafc;
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
          background: rgba(14,165,233,0.12);
          color: #0ea5e9;
        }
        .gallery-filter-btn.active .gallery-filter-count {
          background: rgba(255,255,255,0.18);
          color: #f0f9ff;
        }
        .gallery-filter-underline {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: #38bdf8;
          border-radius: 999px;
        }

        /* ── GRID ── */
        .gallery-grid-section {
          background: #f1f5f9;
          padding: 3rem 1rem 5rem;
        }
        .gallery-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-flow: dense;
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .gallery-masonry { grid-template-columns: repeat(2, 1fr); }
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
          background: #e2e8f0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          outline: none;
        }
        .gallery-card:hover,
        .gallery-card:focus-visible {
          transform: translateY(-4px) scale(1.012);
          box-shadow: 0 16px 40px rgba(0,0,0,0.16);
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
          background: linear-gradient(to top, rgba(12,26,48,0.82) 0%, rgba(12,26,48,0.3) 55%, transparent 100%);
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
          color: #38bdf8;
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
          background: rgba(14,165,233,0.85);
          color: #fff;
        }
        .badge-achievements {
          background: rgba(168,85,247,0.85);
          color: #fff;
        }
        .badge-treatments {
          background: rgba(16, 185, 129, 0.85);
          color: #fff;
        }

        /* ── TREATMENT PROCESS UI ── */
        .gallery-treatments-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .treatment-case-card {
          background: #fff;
          border-radius: 1.25rem;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .treatment-case-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 1rem;
        }
        .treatment-case-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .case-badge {
          background: #f1f5f9;
          color: #475569;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid #cbd5e1;
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
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .process-step:hover {
          border-color: #38bdf8;
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(14,165,233,0.15);
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
          background: #0f172a;
          color: #fff;
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
          background: rgba(15,23,42,0.4);
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
          color: #fff;
        }
        .process-arrow {
          color: #94a3b8;
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
          color: #94a3b8;
          font-size: 1rem;
        }

        /* ── LIGHTBOX ── */
        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(2, 8, 20, 0.96);
          backdrop-filter: blur(12px);
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
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        .gallery-lb-caption {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .gallery-lb-alt {
          color: #e2e8f0;
          font-size: 0.92rem;
          font-weight: 500;
        }
        .gallery-lb-counter {
          color: #64748b;
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
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 201;
        }
        .gallery-lb-close {
          top: 1.2rem; right: 1.2rem;
          background: rgba(255,255,255,0.1);
          color: #f8fafc;
        }
        .gallery-lb-close:hover { background: rgba(255,255,255,0.22); transform: rotate(90deg); }
        .gallery-lb-prev {
          left: 1rem;
          top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          color: #f8fafc;
        }
        .gallery-lb-prev:hover { background: rgba(255,255,255,0.22); transform: translateY(-50%) scale(1.1); }
        .gallery-lb-next {
          right: 1rem;
          top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          color: #f8fafc;
        }
        .gallery-lb-next:hover { background: rgba(255,255,255,0.22); transform: translateY(-50%) scale(1.1); }

        @media (max-width: 640px) {
          .gallery-lb-prev { left: 0.4rem; width: 40px; height: 40px; }
          .gallery-lb-next { right: 0.4rem; width: 40px; height: 40px; }
        }
      `}</style>
    </>
  );
};

export default Gallery;
