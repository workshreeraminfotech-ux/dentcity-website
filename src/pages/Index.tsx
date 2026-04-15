import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Clock, Users, ChevronRight, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

import fatherIhde from "@/assets/hero section photos/father of corticobasal implant - pro. dr. stefan ihde.jpg";
import ssp9486 from "@/assets/hero section photos/SSP_9486.JPG";
import re from "@/assets/hero section photos/re.webp";
import machine from "@/assets/hero section photos/machine.webp";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceOrthodontics from "@/assets/service-orthodontics.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

const heroSlides = [fatherIhde, ssp9486, re, machine];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, i) =>
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: currentSlide === i ? 1 : 0 }}>

            <img src={slide} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl">

              <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary-foreground/60 mb-4">
                DENTCITY Superspeciality Dental & Implant Centre
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Advanced Dental Care with Precision & Comfort
              </h1>
              <p className="mt-5 text-lg text-primary-foreground/70 leading-relaxed max-w-lg">
                Experience world-class dental treatments in a modern, comfortable environment. Your smile is our speciality.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary-foreground text-primary font-medium text-sm hover:opacity-90 transition-opacity shadow-lg">

                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) =>
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === i ? "w-8 bg-primary-foreground" : "bg-primary-foreground/40"}`
              } />

          )}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group rounded-2xl overflow-hidden hover-lift bg-card border border-border">

                <div className="h-56 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy" />

                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{service.desc}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground mt-4 hover:gap-2 transition-all">

                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
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