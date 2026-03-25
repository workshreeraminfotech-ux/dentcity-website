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
      <section className="relative pt-32 pb-20 bg-muted">
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
            <p className="mt-4 text-muted-foreground leading-relaxed">
              DENTCITY Superspeciality Dental & Implant Centre is committed to delivering world-class dental care with a personalized approach, ensuring every patient leaves with confidence and a beautiful smile.
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
            >
              <h2 className="font-display text-3xl font-bold text-foreground">
                A Legacy of Excellence in Dental Care
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Located in the heart of Rajkot, DENTCITY combines cutting-edge technology with compassionate care. Our superspeciality centre offers comprehensive dental solutions — from routine check-ups to complex implant surgeries.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We believe every smile tells a story, and we're here to make yours unforgettable. Our clinic is designed for comfort, equipped with the latest technology, and staffed by a team that genuinely cares about your wellbeing.
              </p>
            </motion.div>
          </div>
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
      <section className="section-padding">
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
