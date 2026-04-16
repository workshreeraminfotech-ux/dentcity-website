import { motion } from "framer-motion";
import { Shield, Award, Heart, Microscope } from "lucide-react";
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
      <section id="dr-rathin" className="section-padding">
        <div className="container mx-auto">
          <SectionHeading
            subtitle="Meet Our Expert"
            title="Our Lead Dentist"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto glass rounded-2xl overflow-hidden hover-lift"
          >
            <img src={doctorImg} alt="Doctor" className="w-full h-auto object-cover object-top bg-muted" loading="lazy" />
            <div className="p-6 text-center">
              <h3 className="font-display text-xl font-bold text-foreground">Dr. Rathin Bhindi</h3>
              <p className="text-sm text-muted-foreground mt-1">BDS, MDS – Prosthodontics & Implantology</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                With over 15 years of experience in advanced dental procedures, specializing in dental implants, smile design, and full mouth rehabilitation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
