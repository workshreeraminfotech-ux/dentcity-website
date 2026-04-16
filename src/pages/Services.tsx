import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceOrthodontics from "@/assets/service-orthodontics.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import doctor from "@/assets/doctor.png";

const dentalImplants = [
  { title: "Dental Implants", desc: "Permanent tooth replacement with precision-placed titanium implants for a natural look and feel.", img: serviceImplants },
  { title: "Full Mouth Rehabilitation", desc: "Complete oral restoration combining multiple treatments for optimal function and aesthetics.", img: gallery1 },
];

const generalDentistry = [
  { title: "Root Canal Treatment", desc: "Pain-free root canal therapy using advanced rotary instruments and microscope-guided precision.", img: gallery2 },
  { title: "Smile Design", desc: "Custom smile makeovers with veneers, bonding, and digital smile design technology.", img: hero2 },
  { title: "Teeth Whitening", desc: "Professional whitening treatments for a brighter, more confident smile in just one visit.", img: hero1 },
  { title: "Orthodontics", desc: "Traditional braces and modern aligner systems for perfectly aligned teeth.", img: serviceOrthodontics },
  { title: "Braces & Aligners", desc: "Invisible aligners and ceramic braces for discreet teeth straightening.", img: gallery4 },
  { title: "Pediatric Dentistry", desc: "Gentle, child-friendly dental care in a fun and comforting environment.", img: gallery3 },
  { title: "Gum Treatment", desc: "Advanced periodontal treatments to restore and maintain healthy gums.", img: doctor },
  { title: "Emergency Dental Care", desc: "Immediate treatment for dental emergencies including trauma, infections, and severe pain.", img: hero1 },
];

const Services = () => {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">Our Services</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
              Comprehensive Dental Solutions
            </h1>
            <p className="mt-4 text-muted-foreground">
              From routine care to advanced procedures, we offer a full spectrum of dental treatments under one roof.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="dental-implant" className="section-padding pt-16">
        <div className="container mx-auto">
          <SectionHeading subtitle="Specialized Care" title="Dental Implant" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentalImplants.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group rounded-2xl overflow-hidden bg-card border border-border hover-lift"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="general-dentistry" className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <SectionHeading subtitle="Comprehensive Care" title="General Dentistry" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalDentistry.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="group rounded-2xl overflow-hidden bg-card border border-border hover-lift"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
