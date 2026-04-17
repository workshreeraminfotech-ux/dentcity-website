import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Award, Heart, Microscope, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import doctorImg from "@/assets/doctor.png";
import dr6 from "@/assets/dr6.jpg";

const whyUs = [
  { icon: Shield, title: "Advanced Technology", desc: "State-of-the-art digital X-rays, 3D imaging, and laser dentistry." },
  { icon: Award, title: "Expert Specialists", desc: "Board-certified specialists with decades of combined experience." },
  { icon: Heart, title: "Patient Comfort", desc: "Gentle, pain-free procedures in a relaxing environment." },
  { icon: Microscope, title: "Precision Treatment", desc: "Evidence-based approach with meticulous attention to detail." },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section id="implant" className="relative pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
              Your Trusted Partner in Dental Health
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
              At DENTCITY, we go beyond treating teeth — we create experiences that redefine dental care.
              Our philosophy is rooted in <strong>trust, precision, and a genuine commitment</strong> to enhancing every patient's quality of life through confident, healthy smiles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={dr6} alt="Award ceremony" className="rounded-2xl w-full h-auto object-cover shadow-md" loading="lazy" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h2 className="font-display text-3xl font-bold text-foreground">
                A Legacy of Excellence in Dental Care
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We understand that visiting a dental clinic can feel overwhelming, which is why we've built an environment that <strong className="text-foreground">prioritizes comfort, care, and reassurance</strong>. From the moment you step in, our goal is to make you feel relaxed, informed, and completely at ease.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Driven by innovation and excellence, our clinic integrates <strong className="text-foreground">advanced dental technologies with a human touch</strong>. Every treatment is thoughtfully planned, ensuring accuracy, safety, and long-lasting results — because your smile deserves nothing less than perfection.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of highly skilled professionals believes in <strong className="text-foreground">ethical dentistry, transparent communication, and personalized care</strong>. We don't just treat patients — we build lifelong relationships based on trust and respect.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At DENTCITY, we focus not only on immediate results but also on <strong className="text-foreground">long-term oral health</strong>. Through preventive care, patient education, and continuous support, we empower you to maintain a radiant smile for years to come.
              </p>
            </motion.div>
          </div>

          {/* Premium Closing Quote */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center max-w-3xl mx-auto"
          >
            <div className="relative glass rounded-3xl px-8 py-10 border border-border shadow-sm">
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-6xl text-primary/20 font-serif leading-none select-none">"</span>
              <p className="font-display text-xl md:text-2xl font-semibold text-foreground italic leading-relaxed">
                Because at DENTCITY, we don't just design smiles — we build confidence that lasts a lifetime.
              </p>
              <div className="mt-4 inline-block w-12 h-0.5 bg-primary rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <SectionHeading
            subtitle="Why DENTCITY"
            title="Why Choose Us"
            description="We go above and beyond to deliver exceptional dental care."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover-lift"
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-foreground" />
                <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section id="dr-rathin" className="section-padding overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #fff5f0 100%)" }}>
        <div className="container mx-auto">
          <SectionHeading
            subtitle="Meet Our Expert"
            title="Our Lead Dentist"
            description="Combining international expertise with compassionate care to deliver smiles that last a lifetime."
          />

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mt-12">

            {/* ── Left: Details ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 order-2 lg:order-1"
            >
              {/* Name & title */}
              <div className="mb-6">
                <span
                  className="inline-block text-xs font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-4"
                  style={{ background: "linear-gradient(90deg,#1a73e8,#0d47a1)", color: "#fff" }}
                >
                  Lead Dentist &amp; Founder
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Dr. Rathin Bhindi
                </h2>
                <p className="text-lg font-medium mt-1" style={{ color: "#1a73e8" }}>
                  BDS &middot; Master Corticobasal Implants, IF Germany
                </p>
              </div>

              {/* Short bio */}
              <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-[15px]">
                With over <strong className="text-foreground">10 years of clinical experience</strong> and
                advanced training as a <strong className="text-foreground">Master in Corticobasal Implants from IF Germany</strong>,
                Dr. Rathin brings internationally certified expertise to every patient. His speciality spans
                corticobasal implants, full-arch restorations, smile design, and complex cosmetic procedures
                &mdash; all delivered with a gentle, patient-first approach.
              </p>

              {/* Credential pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "🎓 BDS – Dental Surgery",
                  "🏅 Master Corticobasal Implants",
                  "🌍 IF Germany Certified",
                  "🦷 5000+ Implants Placed",
                  "🏆 Award-Winning Clinician",
                  "✨ Smile Design Expert",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-4 py-2 rounded-full border"
                    style={{
                      borderColor: "#1a73e820",
                      background: "rgba(26,115,232,0.06)",
                      color: "#1a3a6b",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "10+", label: "Years Experience" },
                  { value: "5000+", label: "Implants Placed" },
                  { value: "98%", label: "Patient Satisfaction" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                    className="text-center rounded-2xl py-5 px-2"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      boxShadow: "0 4px 24px rgba(26,115,232,0.08)",
                      border: "1px solid rgba(26,115,232,0.12)",
                    }}
                  >
                    <p className="font-display text-2xl font-bold" style={{ color: "#1a73e8" }}>{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm shadow-lg transition-all hover:scale-105 active:scale-95 text-white"
                style={{ background: "linear-gradient(90deg,#1a73e8,#0d47a1)" }}
              >
                Book a Consultation with Dr. Rathin
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* ── Right: Photo ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="flex-1 order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-sm md:max-w-md">
                {/* Decorative glow */}
                <div
                  className="absolute -inset-4 rounded-[2.5rem] opacity-30"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(26,115,232,0.35) 0%, transparent 70%)",
                  }}
                />

                {/* Floating badge – experience */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -top-5 -left-5 z-10 rounded-2xl px-4 py-3 text-center shadow-xl hidden sm:block"
                  style={{
                    background: "linear-gradient(135deg,#1a73e8,#0d47a1)",
                    color: "#fff",
                    minWidth: "110px",
                  }}
                >
                  <p className="text-xl font-bold font-display leading-none">10+</p>
                  <p className="text-[10px] font-medium tracking-wide mt-0.5">Years Exp.</p>
                </motion.div>

                {/* Floating badge – award */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-5 -right-5 z-10 rounded-2xl px-4 py-3 text-center shadow-xl hidden sm:block"
                  style={{
                    background: "linear-gradient(135deg,#D4AF37,#b8920f)",
                    color: "#fff",
                    minWidth: "110px",
                  }}
                >
                  <p className="text-xl font-bold font-display leading-none">🏆</p>
                  <p className="text-[10px] font-medium tracking-wide mt-0.5">Award Winner</p>
                </motion.div>

                {/* Photo card */}
                <div
                  className="relative rounded-[2rem] overflow-hidden"
                  style={{
                    boxShadow: "0 30px 80px rgba(26,115,232,0.18), 0 8px 32px rgba(0,0,0,0.1)",
                    border: "3px solid rgba(26,115,232,0.15)",
                  }}
                >
                  <img
                    src={doctorImg}
                    alt="Dr. Rathin Bhindi – Lead Dentist at Dentcity"
                    className="w-full object-cover object-top"
                    style={{ maxHeight: "520px", minHeight: "360px" }}
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-28"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 100%)",
                    }}
                  />
                  {/* Name plate */}
                  <div
                    className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 backdrop-blur-sm"
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      border: "1px solid rgba(26,115,232,0.1)",
                    }}
                  >
                    <p className="font-display font-bold text-foreground text-sm leading-snug">
                      Dr. Rathin Bhindi
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#1a73e8" }}>
                      BDS · Master Corticobasal Implants · IF Germany
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
