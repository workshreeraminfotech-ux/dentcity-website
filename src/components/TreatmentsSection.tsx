import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Gem, Smile, Layers, Baby, AlignCenter,
  Scissors, Star, Droplets, Shield
} from "lucide-react";

const treatments = [
  {
    slug: "implant-dentistry",
    icon: Gem,
    label: "Specialized",
    title: "Implant Dentistry",
    desc: "Permanent, natural-looking tooth replacement with titanium precision.",
    color: "#D4AF37",
    bg: "from-amber-500/15 to-yellow-400/5",
    border: "border-amber-400/25",
  },
  {
    slug: "full-mouth-rehabilitation",
    icon: Layers,
    label: "Specialized",
    title: "Full Mouth Rehabilitation",
    desc: "Complete oral restoration combining implants, crowns, veneers & more.",
    color: "#60B8F0",
    bg: "from-blue-500/15 to-cyan-400/5",
    border: "border-blue-400/25",
  },
  {
    slug: "smile-makeover",
    icon: Smile,
    label: "Specialized",
    title: "Smile Designing",
    desc: "Digital Smile Design technology — preview your perfect smile before treatment.",
    color: "#F472B6",
    bg: "from-pink-500/15 to-rose-400/5",
    border: "border-pink-400/25",
  },
  {
    slug: "root-canal-treatment",
    icon: Shield,
    label: "General",
    title: "Root Canal Treatment",
    desc: "Pain-free, microscope-guided treatment that saves your natural tooth.",
    color: "#34D399",
    bg: "from-emerald-500/15 to-green-400/5",
    border: "border-emerald-400/25",
  },
  {
    slug: "child-dentistry",
    icon: Baby,
    label: "Paediatric",
    title: "Child Dentistry",
    desc: "Gentle, fun, and fear-free dental care designed just for little smiles.",
    color: "#38BDF8",
    bg: "from-sky-500/15 to-blue-400/5",
    border: "border-sky-400/25",
  },
  {
    slug: "composite-resin-filling",
    icon: Droplets,
    label: "General",
    title: "Composite Resin Filling",
    desc: "Aesthetic composite resin fillings that blend seamlessly with your natural tooth colour.",
    color: "#A78BFA",
    bg: "from-violet-500/15 to-purple-400/5",
    border: "border-violet-400/25",
  },
  {
    slug: "crowns-and-bridges",
    icon: Star,
    label: "Restorative",
    title: "Crown and Bridges",
    desc: "Custom-crafted dental crowns and bridges to restore damaged or missing teeth.",
    color: "#FB923C",
    bg: "from-orange-500/15 to-amber-400/5",
    border: "border-orange-400/25",
  },
  {
    slug: "oral-surgery",
    icon: Scissors,
    label: "Surgery",
    title: "Oral Surgery",
    desc: "Safe, precision extractions and impacted wisdom tooth removal.",
    color: "#6EE7B7",
    bg: "from-teal-500/15 to-emerald-400/5",
    border: "border-teal-400/25",
  },
  {
    slug: "orthodontics",
    icon: AlignCenter,
    label: "Orthodontics",
    title: "Orthodontics",
    desc: "Metal, ceramic or clear aligners — straight teeth for every lifestyle.",
    color: "#818CF8",
    bg: "from-indigo-500/15 to-violet-400/5",
    border: "border-indigo-400/25",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export const TreatmentsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const navigate = useNavigate();

  return (
    <section className="relative section-padding overflow-hidden bg-muted/20" ref={ref}>
      {/* Blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[130px] opacity-20"
        style={{ background: "radial-gradient(circle,#D4AF37,transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[120px] opacity-15"
        style={{ background: "radial-gradient(circle,#60B8F0,transparent 70%)" }} />

      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-primary mb-3"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
          >
            Our Specialised{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Dental Treatments</span>
              <span aria-hidden className="absolute left-0 bottom-1 w-full h-2 rounded-full opacity-30 -z-0"
                style={{ background: "linear-gradient(90deg,#D4AF37,#60B8F0)" }} />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 max-w-2xl mx-auto text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            From routine care to complex full-mouth transformations — every treatment at Dentcity is backed by advanced technology and expert hands.
            <span className="block mt-1 text-sm text-primary font-medium">Click any treatment to learn more →</span>
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          {treatments.map((t, i) => (
            <motion.div
              key={t.slug}
              variants={cardVariants}
              whileHover={{ y: -7, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ ease: "easeOut", duration: 0.22 }}
              onClick={() => navigate(`/services/${t.slug}`)}
              className={`relative group rounded-2xl border ${t.border} bg-gradient-to-br ${t.bg} backdrop-blur-sm p-6 cursor-pointer overflow-hidden`}
              style={{ boxShadow: `0 4px 28px 0 ${t.color}18` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ boxShadow: `inset 0 0 36px 0 ${t.color}20` }} />

              {/* Number watermark */}
              <span className="absolute top-4 right-4 font-display text-5xl font-black text-foreground/[0.04] select-none leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
                style={{ backgroundColor: `${t.color}18`, borderColor: `${t.color}40` }}>
                <t.icon className="w-6 h-6" style={{ color: t.color }} />
              </div>

              {/* Label badge */}
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full mb-3 inline-block"
                style={{ backgroundColor: `${t.color}20`, color: t.color }}>
                {t.label}
              </span>

              <h3 className="font-display font-bold text-foreground text-base leading-snug mb-1.5">{t.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>

              {/* Arrow hint */}
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                style={{ color: t.color }}>
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
