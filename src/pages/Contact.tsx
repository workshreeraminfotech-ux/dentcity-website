import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import SectionHeading from "@/components/SectionHeading";
import AppointmentForm from "@/components/AppointmentForm";

const Contact = () => {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">Contact Us</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
              Get In Touch
            </h1>
            <p className="mt-4 text-muted-foreground">
              We'd love to hear from you. Reach out to schedule an appointment or ask any questions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info + Map */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <motion.a
                  href="tel:+917990416940"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-5 hover-lift flex items-start gap-4"
                >
                  <Phone className="w-5 h-5 text-foreground mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-foreground text-sm">Call Us</h4>
                    <p className="text-sm text-muted-foreground mt-1">+91 79904 16940</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://wa.me/917990416940"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass rounded-2xl p-5 hover-lift flex items-start gap-4"
                >
                  <WhatsAppIcon className="w-5 h-5 text-foreground mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-foreground text-sm">WhatsApp</h4>
                    <p className="text-sm text-muted-foreground mt-1">+91 79904 16940</p>
                  </div>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-2xl p-5 flex items-start gap-4"
                >
                  <MapPin className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-foreground text-sm">Address</h4>
                    <p className="text-sm text-muted-foreground mt-1">Kishorsinhji Main Road, near Keshariya Vadi, Karanpara, Rajkot 360001</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl p-5 flex items-start gap-4"
                >
                  <Clock className="w-5 h-5 text-foreground mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-foreground text-sm">Hours</h4>
                    <p className="text-sm text-muted-foreground mt-1">Mon–Sat: 9 AM – 8 PM<br />Sun: By Appointment</p>
                  </div>
                </motion.div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5!2d70.79!3d22.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzAwLjAiTiA3MMKwNDcnMjQuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DENTCITY Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <div className="glass rounded-2xl p-8">
                <AppointmentForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
