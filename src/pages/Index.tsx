import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Award, Clock, Users, ChevronRight, ChevronLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

import heroVideo from "@/assets/hero section photos/dental implant video hero section.mp4";
import fatherIhde from "@/assets/hero section photos/father of corticobasal implant - pro. dr. stefan ihde.jpg";
import fatherIhdeMobile from "@/assets/hero section photos/father of corticobasal implant - pro. dr. stefan ihde 1.jpeg";
import ssp9484 from "@/assets/hero section photos/SSP_9484.JPG";
import ssp9484Mobile from "@/assets/hero section photos/SSP_9484 1.jpeg";
import re from "@/assets/hero section photos/re.webp";
import reMobile from "@/assets/hero section photos/re 1.webp";
import machine from "@/assets/hero section photos/machine.webp";
import machineMobile from "@/assets/hero section photos/machine 1.webp";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceOrthodontics from "@/assets/service-orthodontics.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

const heroSlides = [
  {
    isVideo: true,
    videoSrc: heroVideo,
    overlay: "from-black/70 via-black/45 to-black/15",
    badge: "Dentcity Implant Centre",
    heading: "Your Smile.\nOur Precision.",
    sub: "Experience life-changing dental implants at Dentcity — where science meets artistry",
    cta: "Book a Consultation",
    ctaLink: "/contact",
    accent: "#D4AF37",
  },
  {
    desktopSrc: fatherIhde,
    mobileSrc: fatherIhdeMobile,
    position: "object-top",
    overlay: "from-black/75 via-black/50 to-black/20",
    badge: "Global Expertise",
    heading: "Internationally Trained.\nGlobally Trusted.",
    sub: "Advanced implant techniques & world-class dental care",
    cta: "Explore Treatments",
    ctaLink: "/services#dental-implant",
    accent: "#D4AF37",
  },
  {
    desktopSrc: ssp9484,
    mobileSrc: ssp9484Mobile,
    position: "object-center sm:object-top",
    overlay: "from-black/70 via-black/45 to-black/15",
    badge: "Award Winning",
    heading: "Award-Winning\nDental Excellence.",
    sub: "Recognized for precision, care, and advanced dentistry",
    cta: "Book Appointment",
    ctaLink: "/contact",
    accent: "#60B8F0",
  },
  {
    desktopSrc: machine,
    mobileSrc: machineMobile,
    position: "object-center",
    overlay: "from-black/80 via-black/55 to-black/20",
    badge: "Latest Technology",
    heading: "Advanced Technology.\nGentle Treatment.",
    sub: "Equipped with the latest dental innovations for precise care",
    cta: "View Services",
    ctaLink: "/services",
    accent: "#A8D5BA",
  },
  {
    desktopSrc: re,
    mobileSrc: reMobile,
    position: "object-center",
    overlay: "from-black/65 via-black/40 to-black/10",
    badge: "Premium Experience",
    heading: "Step Into Comfort\n& Care.",
    sub: "Modern clinic designed for a stress-free dental experience",
    cta: "Visit Our Clinic",
    ctaLink: "/contact",
    accent: "#F0C060",
  },
];

const stats = [
  { icon: Users, value: "5000+", label: "Happy Patients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Shield, value: "100%", label: "Safe & Sterile" },
  { icon: Clock, value: "24/7", label: "Emergency Care" }];

const featuredServices = [
  { title: "Dental Implants", desc: "Permanent tooth replacement with precision-placed titanium implants.", img: serviceImplants },
  { title: "Orthodontics", desc: "Straighten your smile with modern braces and clear aligners.", img: serviceOrthodontics },
  { title: "Smile Design", desc: "Transform your smile with customized cosmetic treatments.", img: gallery1 }];



const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const totalSlides = heroSlides.length;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance — skip timer when video slide is active (it advances on video end)
  useEffect(() => {
    if (paused || heroSlides[currentSlide].isVideo) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, currentSlide]);

  // Restart video every time slide 0 becomes active
  useEffect(() => {
    if (currentSlide === 0 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [currentSlide]);

  const goNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <>
      {/* ─── Hero ─── */}
      <section
        className="relative h-screen overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Background slides */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === i ? 1 : 0 }}
          >
            {slide.isVideo ? (
              <video
                ref={videoRef}
                src={slide.videoSrc}
                autoPlay
                muted
                playsInline
                onEnded={goNext}
                className="w-full h-full object-contain md:object-cover"
                style={{ background: "#0a0a0a" }}
              />
            ) : (
              <picture>
                <source media="(max-width: 767px)" srcSet={slide.mobileSrc} />
                <img
                  src={slide.desktopSrc}
                  alt=""
                  className={`w-full h-full object-cover ${slide.position} ${
                    currentSlide === i ? "scale-110" : "scale-100"
                  } transition-transform duration-[8000ms] ease-out`}
                />
              </picture>
            )}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
          </div>
        ))}

        {/* Per-slide animated text */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container mx-auto px-5 md:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-2xl"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex items-center gap-2 mb-5"
                >
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: heroSlides[currentSlide].accent }}
                  />
                  <span
                    className="text-xs font-bold tracking-[0.3em] uppercase"
                    style={{ color: heroSlides[currentSlide].accent }}
                  >
                    {heroSlides[currentSlide].badge}
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.65 }}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight whitespace-pre-line drop-shadow-xl"
                >
                  {heroSlides[currentSlide].heading}
                </motion.h1>

                {/* Accent underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="origin-left mt-4 mb-4 h-0.5 w-24 rounded-full"
                  style={{ backgroundColor: heroSlides[currentSlide].accent }}
                />

                {/* Sub */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base md:text-lg text-white/75 leading-relaxed max-w-lg"
                >
                  {heroSlides[currentSlide].sub}
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="mt-8"
                >
                  <Link
                    to={heroSlides[currentSlide].ctaLink}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm shadow-2xl transition-all hover:scale-105 active:scale-95"
                    style={{ backgroundColor: heroSlides[currentSlide].accent, color: "#111" }}
                  >
                    {heroSlides[currentSlide].cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Prev/Next arrows ── */}
        <button
          onClick={goPrev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>



        {/* ── Slide dots ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === i ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center">

                <stat.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            subtitle="Our Expertise"
            title="Premium Dental Services"
            description="From preventive care to advanced restorative procedures, we provide comprehensive dental solutions." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {featuredServices.map((service, i) => {
              const isImplant = service.title === "Dental Implants";
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`group rounded-2xl overflow-hidden hover-lift relative bg-card ${
                  isImplant 
                    ? "border-2 border-primary shadow-[0_0_25px_rgba(0,0,0,0.1)] lg:-translate-y-2" 
                    : "border border-border"
                }`}>

                <div className="h-56 overflow-hidden relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy" />
                  
                  {isImplant && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                      Our Speciality
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className={`font-display text-xl font-bold ${isImplant ? "text-primary" : "text-foreground"}`}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{service.desc}</p>
                  <Link
                    to={isImplant ? "/services#dental-implant" : "/services"}
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground mt-4 hover:gap-2 transition-all">

                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )})}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">

              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="section-padding bg-muted overflow-hidden">
        <div className="container mx-auto">
          <SectionHeading
            subtitle="Patient Stories"
            title="What Our Patients Say"
            description="Real experiences from our valued patients." />

          <StaggerTestimonials />
        </div>
      </section>
    </>);

};

export default Index;