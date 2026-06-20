import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Microscope,
  HeartHandshake,
  CalendarDays,
  Smile,
  HeartPulse,
} from "lucide-react";

import imgBuilding from "@/assets/gallery/building.webp";
import imgReception from "@/assets/gallery/reception.webp";
import imgTreatment from "@/assets/gallery/treatment-room.webp";
import imgChildren from "@/assets/gallery/children-room.webp";
import imgDoctorCabin from "@/assets/gallery/doctor-cabin.webp";

const reasons = [
  {
    icon: Award,
    title: "10+ years of clinical experience",
    desc: "We have 10+ years of experience in dentistry which leads to better judgment, especially in tough instances when hurrying can cause issues later.",
  },
  {
    icon: HeartPulse,
    title: "Specialized in Critical Dental Care",
    desc: "Our doctors are specialized to treat complex, high-impact cases like full mouth implant reconstruction, full mouth rehabilitation, and restoring the masticatory system to give a fully functional smile to our patients.",
  },
  {
    icon: Microscope,
    title: "Advanced Digital Technology In House",
    desc: "Our clinic combines digital impressions, OPN, and advanced imaging options to make diagnostic and treatment planning more accurate and less painful.",
  },
  {
    icon: HeartHandshake,
    title: "Clear prices and honest advice",
    desc: "We talk honestly about costs and choices. Patients know how much they will have to pay before treatment starts, which helps them trust our clinic.",
  },
  {
    icon: CalendarDays,
    title: "Simple to set up appointments",
    desc: "Flexible appointment times allow working people, families, and older patients organize visits without messing up their everyday lives.",
  },
  {
    icon: Smile,
    title: "More than 1,000 successful smiles",
    desc: "Over the years, we have crafted over 1,000 successful smiles, resulting from different dental treatments. This has helped our doctors and patients create strong relationships.",
  },
];

export const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-[#FAFAFA] pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      
      {/* Background Soft Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#54391E]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#54391E]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 lg:mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#54391E]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#54391E]">
              The Dentcity Difference
            </span>
            <span className="w-8 h-[2px] bg-[#54391E]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight">
            Why Patients Choose <span className="text-[#54391E]">Dentcity</span>
          </h2>
        </motion.div>

        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-stretch">
          
          {/* ── Left Side: Static Cards (Original Theme) ── */}
          <div className="w-full lg:w-5/12 flex flex-col gap-5">
            {reasons.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i} 
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#54391E]/30 transition-all duration-300 group cursor-default relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#54391E] to-[#825B34] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex gap-5 items-start">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-[#FAFAFA] flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#54391E]/10 group-hover:text-[#54391E] transition-colors border border-gray-100">
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#1A1A1A] mb-1.5 group-hover:text-[#54391E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Right Side: 5 Photos Overlapping Collage ── */}
          <div ref={ref} className="w-full lg:w-7/12 relative min-h-[480px] lg:min-h-[580px]">
            
            {/* Photo 1: Building (Top Right - Z-index 10) */}
            <motion.div 
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-0 right-0 w-[44%] h-[42%] rounded-3xl overflow-hidden shadow-xl z-10 border-[6px] border-white"
            >
              <img src={imgBuilding} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Dentcity Exterior" loading="lazy" />
            </motion.div>

            {/* Photo 2: Reception Area (Top Left - Z-index 20) */}
            <motion.div 
              initial={{ opacity: 0, x: -40, y: -10 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="absolute top-[8%] left-0 w-[40%] h-[38%] rounded-3xl overflow-hidden shadow-xl z-20 border-[6px] border-white"
            >
              <img src={imgReception} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Reception Area" loading="lazy" />
            </motion.div>

            {/* Photo 3: Doctor Cabin (Center - Z-index 50) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="absolute top-[30%] left-[28%] w-[42%] h-[40%] rounded-3xl overflow-hidden shadow-2xl z-50 border-[6px] border-white"
            >
              <img src={imgDoctorCabin} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Doctor Cabin" loading="lazy" />
            </motion.div>

            {/* Photo 4: Main Treatment Room (Bottom Right - Z-index 30) */}
            <motion.div 
              initial={{ opacity: 0, x: 40, y: 20 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="absolute bottom-[4%] right-[2%] w-[42%] h-[40%] rounded-3xl overflow-hidden shadow-xl z-30 border-[6px] border-white"
            >
              <img src={imgTreatment} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Treatment Room" loading="lazy" />
            </motion.div>

            {/* Photo 5: Children Treatment Room (Bottom Left - Z-index 40) */}
            <motion.div 
              initial={{ opacity: 0, x: -40, y: 30 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="absolute bottom-0 left-[4%] w-[38%] h-[36%] rounded-3xl overflow-hidden shadow-xl z-40 border-[6px] border-white"
            >
              <img src={imgChildren} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Children Room" loading="lazy" />
            </motion.div>


            
            {/* Decorative dots pattern */}
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[radial-gradient(#825B34_2px,transparent_2px)] [background-size:12px_12px] opacity-30 -z-10" />
          </div>
          
        </div>
      </div>
    </section>
  );
};
