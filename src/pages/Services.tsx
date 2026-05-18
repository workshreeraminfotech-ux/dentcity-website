import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceOrthodontics from "@/assets/service-orthodontics.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const dentalImplants = [
  { slug: "dental-implants", title: "Dental Implants", desc: "Permanent tooth replacement with precision-placed titanium implants for a natural look and feel.", img: serviceImplants },
  { slug: "full-mouth-rehabilitation", title: "Full Mouth Rehabilitation", desc: "Complete oral restoration combining multiple treatments for optimal function and aesthetics.", img: gallery1 },
];

const generalDentistry = [
  { slug: "root-canal-treatment", title: "Root Canal Treatment", desc: "Pain-free, microscope-guided treatment that saves your natural tooth.", img: gallery2 },
  { slug: "child-dentistry", title: "Child Dentistry", desc: "Gentle, fun, and fear-free dental care designed just for little smiles.", img: gallery3 },
  { slug: "composite-resin-filling", title: "Composite Resin Filling", desc: "Aesthetic composite resin fillings that blend seamlessly with your natural tooth colour.", img: gallery1 },
  { slug: "crowns-and-bridges", title: "Crown and Bridges", desc: "Custom-crafted dental crowns and bridges to restore damaged or missing teeth.", img: gallery4 },
  { slug: "oral-surgery", title: "Oral Surgery", desc: "Safe, precision extractions and impacted wisdom tooth removal.", img: serviceImplants },
  { slug: "orthodontics", title: "Orthodontics", desc: "Metal, ceramic or clear aligners — straight teeth for every lifestyle.", img: serviceOrthodontics },
];

/* ─── Reusable Service Card ─── */
const ServiceCard = ({
  service,
  index,
}: {
  service: { slug: string; title: string; desc: string; img: string };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: (index % 3) * 0.1 }}
    onClick={() => window.location.href = `/services/${service.slug}`}
    className="group rounded-2xl overflow-hidden bg-card border border-border hover-lift flex flex-col cursor-pointer"
  >
    {/* Image */}
    <div className="h-48 overflow-hidden relative">
      <img
        src={service.img}
        alt={service.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{service.desc}</p>

      <Link
        to={`/services/${service.slug}`}
        onClick={e => e.stopPropagation()}
        className="inline-flex items-center gap-1 text-sm font-semibold mt-4 transition-all hover:gap-2 text-[#D4AF37]"
      >
        View Details <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
);

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
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="general-dentistry" className="section-padding bg-muted/30">
        <div className="container mx-auto">
          <SectionHeading subtitle="Comprehensive Care" title="General Dentistry" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalDentistry.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

