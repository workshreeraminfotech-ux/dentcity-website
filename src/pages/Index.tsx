import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Phone, ChevronLeft, Calendar } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { AwardsCarousel } from "@/components/AwardsCarousel";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { DoctorProfile } from "@/components/DoctorProfile";
import { FAQSection } from "@/components/FAQSection";
import GalleryPage from "./Gallery";
import ContactPage from "./Contact";

import video1 from "@/assets/dentcity video/1.mp4";
import video2 from "@/assets/dentcity video/2.mp4";
import video3 from "@/assets/dentcity video/3.mp4";
import video4 from "@/assets/dentcity video/4.mp4";
import video5 from "@/assets/dentcity video/5.mp4";
import video6 from "@/assets/dentcity video/6.mp4";
import video7 from "@/assets/dentcity video/7.mp4";
import video8 from "@/assets/dentcity video/8.mp4";
import video9 from "@/assets/dentcity video/9.mp4";

import imgImplant from "@/assets/premium_services/implant_dentistry.png";
import imgFmr from "@/assets/premium_services/full_mouth.png";
import imgSmile from "@/assets/premium_services/smile_design.png";
import imgRct from "@/assets/premium_services/root_canal.png";
import imgChild from "@/assets/our service/7.child dentistry/20260516_142012.jpg";
import imgFilling from "@/assets/premium_services/composite_filling.png";
import imgCrown from "@/assets/premium_services/crown_bridges.png";
import imgSurgery from "@/assets/premium_services/oral_surgery.png";
import imgOrtho from "@/assets/premium_services/orthodontics.png";
import fmrImage from "@/assets/our service/2.full mouth reheb/case 1/04.jpg";
import smileImage from "@/assets/our service/3.smiling designing/case 1/1.jpg";

// ─── Slide data ───────────────────────────────────────────────────────────────
const heroSlides = [
  { src: video1, badge: "Welcome to Dentcity",        heading: "Where Healing",    accent: "Begins with a Smile.",  sub: "Step into our warm, world-class reception — designed to make you feel at ease the moment you walk through our doors.",                cta: "Book a Visit",        ctaLink: "#contact",  ctaIcon: Calendar,   color: "#D4AF37" },
  { src: video2, badge: "Doctor's Consultation",      heading: "Expert Hands.",    accent: "Personalised Care.",    sub: "Every diagnosis starts with a conversation. Our doctor's cabin is built for precision consultations and thorough one-on-one checkups.",  cta: "Meet Our Doctor",     ctaLink: "#doctor",   ctaIcon: ArrowRight, color: "#60B8F0" },
  { src: video3, badge: "Advanced OPD Suite",         heading: "Precision Tools.", accent: "Superior Outcomes.",    sub: "Our fully-equipped OPD rooms carry the most advanced dental instruments — every procedure safe, comfortable and painless.",             cta: "Explore Treatments",  ctaLink: "#services", ctaIcon: ArrowRight, color: "#A8D5BA" },
  { src: video4, badge: "Cutting-Edge Technology",    heading: "The Technology",   accent: "Your Smile Deserves.", sub: "Dentcity houses specialised dental equipment that most clinics only dream of — delivering faster, safer and more accurate outcomes.",      cta: "Know More",           ctaLink: "#services", ctaIcon: ArrowRight, color: "#F0C060" },
  { src: video5, badge: "Our Clinic — First Floor",   heading: "A Clinic Built",   accent: "for Excellence.",      sub: "From the very first step inside, Dentcity's first floor sets a new benchmark in modern dental infrastructure across Rajkot.",             cta: "Explore the Clinic",  ctaLink: "#contact",  ctaIcon: ArrowRight, color: "#D4AF37" },
  { src: video6, badge: "Children's OPD",             heading: "Little Patients.", accent: "Bigger Smiles.",        sub: "Our dedicated children's OPD turns every dental visit into a fun, fear-free experience — because healthy habits start early.",           cta: "Book for Kids",       ctaLink: "#contact",  ctaIcon: Calendar,   color: "#C9E8D1" },
  { src: video7, badge: "OPD 1 & OPD 2",              heading: "Two Rooms.",       accent: "One Standard of Care.", sub: "Our dual OPD setup ensures zero waiting and maximum focus — every patient gets undivided attention and unhurried quality treatment.",      cta: "Book Appointment",    ctaLink: "#contact",  ctaIcon: Calendar,   color: "#FFD700" },
  { src: video8, badge: "Learning & Innovation Hub",  heading: "We Never",         accent: "Stop Learning.",        sub: "Dentcity's in-house conference room reflects our commitment to continuous growth — our team stays ahead so your care stays exceptional.", cta: "Our Philosophy",      ctaLink: "#contact",  ctaIcon: ArrowRight, color: "#FFB3C1" },
  { src: video9, badge: "Premium OPD Suite",          heading: "Your Comfort.",    accent: "Our Commitment.",       sub: "Our final OPD room blends premium design with clinical excellence — every detail thoughtfully crafted for a calm, reassuring experience.", cta: "Book a Consultation", ctaLink: "#contact",  ctaIcon: Calendar,   color: "#D4AF37" },
];

// ─── Services ─────────────────────────────────────────────────────────────────
const allServices = [
  { slug: "implant-dentistry",        title: "Implant Dentistry",          desc: "Permanent, natural-looking tooth replacement with titanium precision.",               img: imgImplant,     isSpeciality: true  },
  { slug: "full-mouth-rehabilitation", title: "Full Mouth Rehabilitation",  desc: "Complete oral restoration combining implants, crowns, veneers & more.",             img: imgFmr,            isSpeciality: true  },
  { slug: "smile-makeover",            title: "Smile Designing",            desc: "Digital Smile Design — preview your perfect smile before treatment.",               img: imgSmile,          isSpeciality: true  },
  { slug: "root-canal-treatment",      title: "Root Canal Treatment",       desc: "Pain-free, microscope-guided treatment that saves your natural tooth.",             img: imgRct,            isSpeciality: false },
  { slug: "child-dentistry",           title: "Child Dentistry",            desc: "Gentle, fun, and fear-free dental care designed just for little smiles.",          img: imgChild,            isSpeciality: false },
  { slug: "composite-resin-filling",   title: "Composite Resin Filling",    desc: "Aesthetic composite resin fillings that blend seamlessly with your natural tooth colour.", img: imgFilling,      isSpeciality: false },
  { slug: "crown-and-bridges",        title: "Crown and Bridges",          desc: "Custom-crafted dental crowns and bridges to restore damaged or missing teeth.",     img: imgCrown,            isSpeciality: false },
  { slug: "oral-surgery",              title: "Oral Surgery",               desc: "Safe, precision extractions and impacted wisdom tooth removal.",                   img: imgSurgery,     isSpeciality: false },
  { slug: "orthodontics",              title: "Orthodontics",               desc: "Metal, ceramic or clear aligners — straight teeth for every lifestyle.",           img: imgOrtho, isSpeciality: false },
];

const specialityServices = allServices.filter(s => s.isSpeciality);
const extraServices = allServices.filter(s => !s.isSpeciality);

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const total = heroSlides.length;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
    setTextKey(k => k + 1);
  }, []);

  const goNext = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  // Load & play video when slide changes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.src = heroSlides[current].src;
    vid.load();
    vid.play().catch(() => {});
    setProgress(0);
  }, [current]);

  // Live progress bar via rAF
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const tick = () => {
      if (vid.duration > 0) setProgress((vid.currentTime / vid.duration) * 100);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current]);

  const slide = heroSlides[current];
  const CtaIcon = slide.ctaIcon;

  return (
    <section id="home" className="relative w-full overflow-hidden" style={{ height: "100svh" }}>
      {/* Video */}
      <video ref={videoRef} autoPlay muted playsInline onEnded={goNext}
        className="absolute inset-0 w-full h-full object-cover" />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

      {/* Accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 z-20 transition-colors duration-700"
        style={{ backgroundColor: slide.color }} />

      {/* Text */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full px-8 sm:px-10 md:px-16 lg:px-24 pt-20 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div key={textKey}
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

              {/* Badge */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-5 md:mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: slide.color }} />
                <span className="text-xs font-bold tracking-[0.25em] uppercase"
                  style={{ color: slide.color }}>{slide.badge}</span>
              </motion.div>

              {/* Heading */}
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="font-display drop-shadow-2xl"
                style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 800, lineHeight: 1.25 }}>
                <span className="text-white block mb-2 md:mb-3">{slide.heading}</span>
                <span className="block" style={{ color: slide.color }}>{slide.accent}</span>
              </motion.h1>

              {/* Divider */}
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.45, duration: 0.55 }}
                className="origin-left mt-6 mb-6 md:mt-8 md:mb-8 h-[3px] w-20 md:w-28 rounded-full"
                style={{ backgroundColor: slide.color }} />

              {/* Sub */}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="text-white/90 max-w-[320px] sm:max-w-sm md:max-w-lg"
                style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.8 }}>
                {slide.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4">
                <a href={slide.ctaLink}
                  onClick={(e) => {
                    if (slide.ctaLink.startsWith('#')) {
                      const el = document.getElementById(slide.ctaLink.slice(1));
                      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                    }
                  }}
                  className="inline-flex justify-center items-center gap-2 rounded-full font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 text-black w-full sm:w-auto"
                  style={{ background: `linear-gradient(135deg,${slide.color},${slide.color}bb)`, padding: "12px 28px", fontSize: "clamp(0.85rem,1.5vw,0.95rem)" }}>
                  {slide.cta} <CtaIcon className="w-4 h-4 flex-shrink-0" />
                </a>
                <a href="#contact"
                  onClick={(e) => { const el = document.getElementById('contact'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); } }}
                  className="inline-flex justify-center items-center gap-2 rounded-full font-bold border-2 text-white backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                  style={{ borderColor: `${slide.color}80`, padding: "12px 28px", fontSize: "clamp(0.85rem,1.5vw,0.95rem)" }}>
                  <Phone className="w-4 h-4 flex-shrink-0" /> Call Us Now
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-1.5">
        <span className="text-white font-bold text-lg tabular-nums">{String(current + 1).padStart(2, "0")}</span>
        <span className="text-white/40 text-sm">/ {String(total).padStart(2, "0")}</span>
      </div>

      {/* Arrows — desktop only so they don't overlap mobile text */}
      <button onClick={goPrev} aria-label="Previous"
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm items-center justify-center text-white transition-all hover:scale-110 active:scale-95">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={goNext} aria-label="Next"
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm items-center justify-center text-white transition-all hover:scale-110 active:scale-95">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress + Dots */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-10 pb-5 md:pb-7">
        <div className="w-full h-[2px] bg-white/20 rounded-full mb-4 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: slide.color, transition: "none" }} />
        </div>
        <div className="flex items-center justify-center gap-1.5">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: current === i ? "2rem" : "0.45rem", height: "0.45rem", backgroundColor: current === i ? slide.color : "rgba(255,255,255,0.35)" }} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Index = () => {
  const [showAllServices, setShowAllServices] = useState(false);

  // Handle "General Dentistry" navbar click → expand all services
  useEffect(() => {
    const handler = () => {
      setShowAllServices(true);
    };
    window.addEventListener("show-all-services", handler);
    return () => window.removeEventListener("show-all-services", handler);
  }, []);

  // Handle cross-page navigation: if arriving with #general-dentistry hash
  useEffect(() => {
    if (window.location.hash === "#general-dentistry") {
      setShowAllServices(true);
      setTimeout(() => {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else if (!window.location.hash) {
      // Force scroll to top on mount if no hash is present
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 100);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 300);
    }
  }, []);

  return (
    <>
      <HeroSection />



      <AwardsCarousel />
      <div id="implant">
        <WhyChooseUs />
      </div>
      <div id="dr-rathin">
        <DoctorProfile />
      </div>

      {/* Services */}
      <section id="services" className="section-padding bg-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#D4AF37]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
                What We Offer
              </span>
              <span className="w-8 h-[2px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight mb-4">
              Our Specialized <span className="text-[#D4AF37]">Dental Treatments</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed">
              From routine care to advanced full-mouth restorations — every treatment at Dentcity is backed by world-class technology and expert hands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {specialityServices.map((service, i) => (
              <motion.div key={service.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.55 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group rounded-2xl overflow-hidden relative bg-card cursor-pointer border-2 border-primary shadow-[0_0_24px_rgba(0,0,0,0.08)]"
                onClick={() => window.location.href = `/services/${service.slug}`}>
                <div className="h-44 overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-widest uppercase">View Details →</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10">Our Speciality</div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base font-bold text-primary">{service.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{service.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:gap-2 transition-all" onClick={e => e.stopPropagation()}>
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showAllServices && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }} className="overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                  {extraServices.map((service, i) => (
                    <motion.div key={service.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }} whileHover={{ y: -5, scale: 1.02 }}
                      className="group rounded-2xl overflow-hidden relative bg-card cursor-pointer border border-border"
                      onClick={() => window.location.href = `/services/${service.slug}`}>
                      <div className="h-44 overflow-hidden relative">
                        <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-xs font-bold tracking-widest uppercase">View Details →</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-base font-bold text-foreground">{service.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{service.desc}</p>
                        <a href="#contact" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:gap-2 transition-all" onClick={e => e.stopPropagation()}>
                          Learn more <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-10">
            <button onClick={() => setShowAllServices(prev => !prev)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-black shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg,#D4AF37,#f0cc6a)" }}>
              {showAllServices ? "Show Less" : "See All Services"}
              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showAllServices ? "rotate-90" : ""}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <motion.div id="gallery" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
        <GalleryPage />
      </motion.div>

      {/* Testimonials */}
      <motion.section className="relative bg-[#FAFAFA] py-24 overflow-hidden"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
        
        {/* Background Soft Accents */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 translate-x-1/3" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#D4AF37]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
                Patient Stories
              </span>
              <span className="w-8 h-[2px] bg-[#D4AF37]" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight mb-4">
              What Our Patients <span className="text-[#D4AF37]">Say</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Real experiences from our valued patients.
            </p>
          </motion.div>
          <StaggerTestimonials />
        </div>
      </motion.section>

      <FAQSection />

      <div id="contact">
        <ContactPage />
      </div>
    </>
  );
};

export default Index;