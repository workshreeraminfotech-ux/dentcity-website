import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  Award, CheckCircle2, BadgeCheck, Phone
} from "lucide-react";
import doctorImg from "@/assets/doctor.png";

/* ──────────────────────────────────────────────────────────────────
   Counter Component (Zero Lag - No React Re-renders)
────────────────────────────────────────────────────────────────── */
function Counter({ target, inView, duration }: { target: number; inView: boolean; duration: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (node) {
      const controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [target, inView, duration]);

  return <span ref={nodeRef}>0</span>;
}

/* ──────────────────────────────────────────────────────────────────
   Typewriter Hook
────────────────────────────────────────────────────────────────── */
function useTypewriter(text: string, inView: boolean, speed = 25) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!inView) return;
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      setShown(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed]);
  return shown;
}

/* ──────────────────────────────────────────────────────────────────
   Data
────────────────────────────────────────────────────────────────── */
const achievements = [
  "Specialized in Dental Implantology",
  "Full-Mouth Reconstructions Expert",
  "Root Canal & Orthodontic Care",
  "Comprehensive Family Dentistry",
];

const statsData = [
  { raw: 10,  suffix: "+", label: "Years Exp.",     dur: 2.5 },
  { raw: 30,  suffix: "+", label: "Global Programs",dur: 3.5 },
  { raw: 3,   suffix: "+", label: "Accreditations", dur: 2.0 },
  { raw: 100, suffix: "%", label: "Comprehensive",  dur: 4.0 },
];

/* ──────────────────────────────────────────────────────────────────
   Component
────────────────────────────────────────────────────────────────── */
export const DoctorProfile = () => {
  const ref = useRef<HTMLDivElement>(null);
  // once: true ensures animations only play on the first scroll
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const quote = "I believe that if I don't upgrade today, my patients will be benefited only till yesterday's advancements.";
  const typedQuote = useTypewriter(quote, inView, 30);

  return (
    <section className="relative w-full bg-[#030712] text-white py-12 lg:py-16 overflow-hidden" ref={ref}>
      {/* Background massive text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none flex items-center justify-center opacity-[0.03] select-none z-0">
        <h2 className="text-[120px] md:text-[200px] lg:text-[280px] font-black tracking-tighter text-white whitespace-nowrap">
          EXPERTISE
        </h2>
      </div>

      {/* Ambient glowing orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Unified Section Header (Full Width to prevent overlap and overflow) */}
        <div className="mb-10 lg:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-12 bg-[#D4A373]"></span>
              <span className="text-[#D4A373] font-bold tracking-[0.25em] uppercase text-xs md:text-sm">Lead Specialist</span>
              <span className="h-[2px] w-12 bg-[#D4A373]"></span>
            </div>
            
            <h2 
              className="font-bold font-display leading-[1.05] mb-6 text-white whitespace-nowrap"
              style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
            >
              Dr. Rathin Bhindi
            </h2>

            <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed italic relative">
              <span className="text-6xl text-[#D4A373]/20 absolute -top-4 -left-6 font-serif">"</span>
              <span className="relative z-10">{typedQuote}</span>
              <span className="inline-block w-[2px] h-[1em] bg-[#D4A373] ml-1 align-middle animate-pulse" />
            </p>
          </motion.div>
        </div>

        {/* flex-col-reverse makes the right side (image) appear on top on mobile screens */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-12">
          
          {/* Left Content (Text) */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center mt-8 lg:mt-0"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            {/* Doctor Bio Paragraphs */}
            <div className="flex flex-col gap-5 mb-10 max-w-xl">
               <p className="text-gray-300 text-[0.95rem] md:text-base leading-relaxed">
                 Dr. Rathin Bhindi has been practicing dentistry in Rajkot for over 10 years. His educational background and additional training have fostered a meticulous approach in his clinical work. He has attended over 30+ specialized dental treatment programmes across the world and holds accreditation from over 3+ international prestigious dental bodies.
               </p>
               <p className="text-gray-300 text-[0.95rem] md:text-base leading-relaxed">
                 Specialized in Dental Implantology science, he serves full-mouth dental implant reconstructions using various implant systems and methods. He is a master of full-mouth reconstructions for patients facing chewing inefficiency, muscular disharmony, and generalized dental sensitivity. He also provides treatments like root canals, orthodontics (aligners), children's dentistry, and gum treatments—addressing everything related to the oral cavity for any person of any age or medical condition, all under one roof.
               </p>
            </div>

            {/* Stats Row */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 border-y border-white/10 py-8">
              {statsData.map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                   <span className="text-3xl md:text-4xl font-bold text-white tabular-nums tracking-tight">
                      <Counter target={s.raw} inView={statsInView} duration={s.dur} />
                      <span className="text-[#D4A373]">{s.suffix}</span>
                   </span>
                   <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-semibold">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" 
                onClick={(e) => {
                  const el = document.getElementById("contact");
                  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
                }}
                className="px-8 py-4 bg-gradient-to-r from-[#D4A373] to-[#825B34] hover:from-[#c59263] hover:to-[#714f2a] text-black font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,163,115,0.25)]">
                Book Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="tel:+917990416940" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> Call Clinic
              </a>
            </div>
          </motion.div>

          {/* Right Content (Image & Floating Badges) */}
          <motion.div 
            className="w-full lg:w-[45%] relative mt-6 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* The Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
               <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent z-10" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/50 via-transparent to-transparent z-10" />
               <img src={doctorImg} alt="Dr. Rathin Bhindi" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Floating Credential Box 1 */}
            <motion.div 
              className="hidden md:flex absolute top-10 -right-4 lg:-right-12 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl z-20 items-center gap-3"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
               <div className="p-2 bg-[#D4A373]/20 rounded-full">
                  <BadgeCheck className="w-5 h-5 text-[#D4A373]" />
               </div>
               <div>
                  <p className="text-white font-bold text-sm leading-tight">Verified</p>
                  <p className="text-gray-400 text-xs">Specialist</p>
               </div>
            </motion.div>

            {/* Floating Credential Box 2 */}
            <motion.div 
              className="hidden md:block absolute -bottom-8 -left-4 lg:-left-16 bg-[#0a0f1c]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-20 w-[280px] lg:w-[320px]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-gradient-to-br from-[#D4A373] to-[#825B34] rounded-xl shadow-inner">
                    <Award className="w-6 h-6 text-white" />
                 </div>
                 <div>
                    <p className="text-white font-bold text-base">Clinical Excellence</p>
                    <p className="text-[#D4A373] text-xs font-semibold uppercase tracking-wider">Implantology</p>
                 </div>
              </div>
              <ul className="space-y-3">
                 {achievements.slice(0, 3).map((item, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                      {item}
                   </li>
                 ))}
              </ul>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
