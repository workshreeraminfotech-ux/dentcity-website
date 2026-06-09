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

import hero01 from "@/assets/hero section/01.jpg";
import hero02 from "@/assets/hero section/NJ_04441.jpg";
import hero03 from "@/assets/hero section/NJ_04491.jpg";
import hero04 from "@/assets/hero section/NJ_0451.jpg";
import hero05 from "@/assets/hero section/NJ_0454.jpg";
import hero06 from "@/assets/hero section/NJ_04562.jpg";
import hero07 from "@/assets/hero section/NJ_04571.jpg";
import hero08 from "@/assets/hero section/NJ_04650.jpg";
import hero09 from "@/assets/hero section/NJ_04656.jpg";
import hero10 from "@/assets/hero section/w.jpg";

import imgImplant from "@/assets/premium_services/implant_dentistry.png";
import imgFmr from "@/assets/premium_services/full_mouth.png";
import imgSmile from "@/assets/premium_services/smile_design.png";
import imgRct from "@/assets/premium_services/root_canal.png";
import imgChild from "@/assets/drwithchild.jpg";
import imgFilling from "@/assets/premium_services/composite_filling.png";
import imgCrown from "@/assets/premium_services/crown_bridges.png";
import imgSurgery from "@/assets/premium_services/oral_surgery.png";
import imgOrtho from "@/assets/premium_services/orthodontics.png";
import fmrImage from "@/assets/our service/2.full mouth reheb/case 1/04.jpg";
import smileImage from "@/assets/our service/3.smiling designing/case 1/1.jpg";

// ─── Slide data ───────────────────────────────────────────────────────────────
const heroSlides = [
  { src: hero01, badge: "Welcome to Dentcity", heading: "Where Healing", accent: "Begins with a Smile.", sub: "A warm, world-class clinic designed to make you feel at ease from the moment you walk in.", cta: "Book a Visit", ctaLink: "#contact", ctaIcon: Calendar, color: "#D4A373", showCta: true },
  { src: hero02, badge: "Doctor's Consultation", heading: "Expert Hands.", accent: "Personalised Care.", sub: "Every diagnosis starts with a conversation — thorough, precise, and always patient-first.", cta: "Meet Our Doctor", ctaLink: "#doctor", ctaIcon: ArrowRight, color: "#D4A373", showCta: true },
  { src: hero03, badge: "Advanced Treatment Suite", heading: "Precision Tools.", accent: "Superior Outcomes.", sub: "Our treatment suites house advanced dental instruments to ensure every procedure is comfortable, safe, and precise.", cta: "Explore Treatments", ctaLink: "#services", ctaIcon: ArrowRight, color: "#D4A373", showCta: false },
  { src: hero04, badge: "World-Class Infrastructure", heading: "The Technology", accent: "Your Smile Deserves.", sub: "Dentcity features state-of-the-art clinical technology to deliver faster, safer, and highly predictable treatment outcomes.", cta: "Know More", ctaLink: "#services", ctaIcon: ArrowRight, color: "#D4A373", showCta: false },
  { src: hero05, badge: "Premium OPD Suite", heading: "Comfort-First Design.", accent: "Zero Stress.", sub: "Every dental unit is designed with patient comfort in mind, blending ergonomic layouts with advanced clinical capabilities.", cta: "Explore the Clinic", ctaLink: "#contact", ctaIcon: ArrowRight, color: "#D4A373", showCta: false },
  { src: hero06, badge: "Advanced Implantology Hub", heading: "Where Quality", accent: "Meets Perfection.", sub: "Our specialized implantology suites are optimized for surgical accuracy and absolute clinical sterilization.", cta: "Book for Kids", ctaLink: "#contact", ctaIcon: Calendar, color: "#D4A373", showCta: false },
  { src: hero07, badge: "Dual Treatment Rooms", heading: "Minimal Wait.", accent: "Maximum Care.", sub: "With multiple fully-equipped treatment rooms, we ensure zero wait times and undivided attention for every patient.", cta: "Book Appointment", ctaLink: "#contact", ctaIcon: Calendar, color: "#D4A373", showCta: false },
  { src: hero08, badge: "Continuing Dental Education", heading: "We Never", accent: "Stop Innovating.", sub: "Our in-house academic center reflects our commitment to stay at the cutting edge of global dental research.", cta: "Our Philosophy", ctaLink: "#contact", ctaIcon: ArrowRight, color: "#D4A373", showCta: false },
  { src: hero09, badge: "Sterilization Protocol", heading: "Your Safety,", accent: "Our Top Priority.", sub: "We adhere to class-B sterilization protocols to ensure 100% infection control and complete safety for every visit.", cta: "Book a Consultation", ctaLink: "#contact", ctaIcon: Calendar, color: "#D4A373", showCta: false },
  { src: hero10, badge: "Children's Treatment Suite", heading: "Gentle Care", accent: "For Happy Little Smiles.", sub: "Our dedicated children's zone turns dental visits into a fun, fear-free adventure for kids of all ages.", cta: "Book a Consultation", ctaLink: "#contact", ctaIcon: Calendar, color: "#D4A373", showCta: false },
];

// ─── Services ─────────────────────────────────────────────────────────────────
const allServices = [
  { slug: "implant-dentistry", title: "Implant Dentistry", desc: "Permanent, natural-looking tooth replacement with titanium precision.", img: imgImplant, isSpeciality: true },
  { slug: "full-mouth-rehabilitation", title: "Full Mouth Rehabilitation", desc: "Complete oral restoration combining implants, crowns, veneers & more.", img: imgFmr, isSpeciality: true },
  { slug: "smile-makeover", title: "Smile Designing", desc: "Digital Smile Design — preview your perfect smile before treatment.", img: imgSmile, isSpeciality: true },
  { slug: "root-canal-treatment", title: "Root Canal Treatment", desc: "Pain-free, microscope-guided treatment that saves your natural tooth.", img: imgRct, isSpeciality: false },
  { slug: "child-dentistry", title: "Child Dentistry", desc: "Gentle, fun, and fear-free dental care designed just for little smiles.", img: imgChild, isSpeciality: false },
  { slug: "composite-resin-filling", title: "Composite Resin Filling", desc: "Aesthetic composite resin fillings that blend seamlessly with your natural tooth colour.", img: imgFilling, isSpeciality: false },
  { slug: "crown-and-bridges", title: "Crown and Bridges", desc: "Custom-crafted dental crowns and bridges to restore damaged or missing teeth.", img: imgCrown, isSpeciality: false },
  { slug: "oral-surgery", title: "Oral Surgery", desc: "Safe, precision extractions and impacted wisdom tooth removal.", img: imgSurgery, isSpeciality: false },
  { slug: "orthodontics", title: "Orthodontics", desc: "Metal, ceramic or clear aligners — straight teeth for every lifestyle.", img: imgOrtho, isSpeciality: false },
];

const specialityServices = allServices.filter(s => s.isSpeciality);
const extraServices = allServices.filter(s => !s.isSpeciality);

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = heroSlides.length;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  // Auto-advance photo slide every 3 seconds with smooth progress tracking
  useEffect(() => {
    const duration = 3000;
    const start = performance.now();
    let animFrame: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed < duration) {
        animFrame = requestAnimationFrame(tick);
      } else {
        goNext();
      }
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [current, goNext]);

  const slide = heroSlides[current];
  const CtaIcon = slide.ctaIcon;

  return (
    <section id="home" className="relative w-full overflow-hidden h-[90svh] sm:h-svh">
      {/* Background Image Slideshow with smooth cross-fade */}
      <AnimatePresence>
        <motion.img
          key={current}
          src={slide.src}
          alt={slide.badge}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

      {/* Text */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 pt-10 sm:pt-0 mt-4 sm:mt-0">
          <AnimatePresence mode="popLayout">
            <motion.div key={current}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col">

              {/* Badge */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                className="inline-flex items-center gap-2 mb-6 sm:mb-4">
                <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: slide.color }} />
                <span className="text-xs font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase"
                  style={{ color: slide.color }}>{slide.badge}</span>
              </motion.div>

              {/* Heading */}
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="font-display drop-shadow-2xl mb-1 sm:mb-0"
                style={{ fontSize: "clamp(2.1rem, 5.5vw, 5rem)", fontWeight: 800, lineHeight: 1.1 }}>
                <span className="text-white block mb-1">{slide.heading}</span>
                <span className="block" style={{ color: slide.color }}>{slide.accent}</span>
              </motion.h1>

              {/* Divider */}
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="origin-left mt-5 mb-5 sm:mt-6 sm:mb-6 h-[3px] w-16 sm:w-28 rounded-full"
                style={{ backgroundColor: slide.color }} />

              {/* Sub */}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.35 }}
                className="text-white/90 max-w-[300px] sm:max-w-md lg:max-w-lg text-[15px] sm:text-sm md:text-[17px] xl:text-[18px]"
                style={{ lineHeight: 2.1 }}>
                {slide.sub}
              </motion.p>

              {/* CTAs */}
              {slide.showCta && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                  className="mt-7 sm:mt-8 flex flex-row flex-wrap gap-3 sm:gap-4">
                  <a href={slide.ctaLink}
                    onClick={(e) => {
                      if (slide.ctaLink.startsWith('#')) {
                        const el = document.getElementById(slide.ctaLink.slice(1));
                        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                      }
                    }}
                    className="inline-flex justify-center items-center gap-1.5 rounded-full font-semibold shadow-2xl transition-all hover:scale-105 active:scale-95 text-white px-5 py-2 sm:px-8 sm:py-3.5 text-xs sm:text-sm w-auto"
                    style={{ background: `linear-gradient(135deg,${slide.color},${slide.color}bb)` }}>
                    {slide.cta} <CtaIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  </a>
                  <a href="#contact"
                    onClick={(e) => { const el = document.getElementById('contact'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); } }}
                    className="inline-flex justify-center items-center gap-1.5 rounded-full font-semibold border-2 text-white backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105 active:scale-95 px-5 py-2 sm:px-8 sm:py-3.5 text-xs sm:text-sm w-auto"
                    style={{ borderColor: `${slide.color}80` }}>
                    <Phone className="w-4 h-4 flex-shrink-0" /> Call Us Now
                  </a>
                </motion.div>
              )}
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
  // Handle cross-page navigation: if arriving with #general-dentistry hash
  useEffect(() => {
    if (window.location.hash === "#general-dentistry") {
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
              <span className="w-8 h-[2px] bg-[#54391E]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#54391E]">
                What We Offer
              </span>
              <span className="w-8 h-[2px] bg-[#54391E]" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight mb-4">
              Our Specialized <span className="text-[#54391E]">Dental Treatments</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed">
              From routine care to advanced full-mouth restorations — every treatment at Dentcity is backed by world-class technology and expert hands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {allServices.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.55 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group rounded-2xl overflow-hidden relative bg-card cursor-pointer transition-all duration-300 ${service.isSpeciality
                    ? "border-2 border-primary shadow-[0_0_24px_rgba(0,0,0,0.08)]"
                    : "border border-border shadow-sm hover:shadow-md"
                  }`}
                onClick={() => window.location.href = `/services/${service.slug}`}
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-widest uppercase">View Details →</span>
                  </div>
                  {service.isSpeciality && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full shadow-lg z-10">
                      Our Speciality
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className={`font-display text-base font-bold ${service.isSpeciality ? "text-primary" : "text-foreground"}`}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {service.desc}
                  </p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:gap-2 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <motion.div id="gallery" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>
        <GalleryPage />
      </motion.div>

      {/* Testimonials */}
      <motion.section className="relative bg-[#FAFAFA] pt-6 pb-20 md:pt-10 md:pb-24 overflow-hidden"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}>

        {/* Background Soft Accents */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#54391E]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#54391E]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 translate-x-1/3" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 lg:mb-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#54391E]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#54391E]">
                Patient Stories
              </span>
              <span className="w-8 h-[2px] bg-[#54391E]" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight mb-4">
              What Our Patients <span className="text-[#54391E]">Say</span>
            </h2>

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