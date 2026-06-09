import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import AppointmentForm from "@/components/AppointmentForm";

const Contact = ({ isStandalone = false }: { isStandalone?: boolean }) => {
  return (
    <div className="bg-[#FAFAFA]">
      <section className={`relative pb-16 overflow-hidden ${isStandalone ? "pt-20 md:pt-24" : "pt-16 md:pt-20"}`}>
        {/* Background Soft Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#54391E]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#54391E]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#54391E]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#54391E]">
                Contact Us
              </span>
              <span className="w-8 h-[2px] bg-[#54391E]" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#1A1A1A] leading-tight mb-4">
              Get In <span className="text-[#54391E]">Touch</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mt-4 leading-relaxed">
              We'd love to hear from you. Reach out to schedule an appointment or ask any questions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 pt-8">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info + Map */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <motion.a
                  href="tel:+919825078955"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#54391E]/30 transition-all flex items-start gap-4"
                >
                  <Phone className="w-5 h-5 text-[#54391E] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-[#1A1A1A] text-sm">Call Us</h4>
                    <p className="text-sm text-gray-500 mt-1">+91 98250 78955</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://wa.me/919825078955"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#54391E]/30 transition-all flex items-start gap-4"
                >
                  <WhatsAppIcon className="w-5 h-5 text-[#54391E] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-[#1A1A1A] text-sm">WhatsApp</h4>
                    <p className="text-sm text-gray-500 mt-1">+91 98250 78955</p>
                  </div>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#54391E]/30 transition-all flex items-start gap-4"
                >
                  <MapPin className="w-5 h-5 text-[#54391E] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-[#1A1A1A] text-sm">Address</h4>
                    <p className="text-sm text-gray-500 mt-1">Kishorsinhji Main Road, near Keshariya Vadi, Karanpara, Rajkot 360001</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#54391E]/30 transition-all flex items-start gap-4"
                >
                  <Clock className="w-5 h-5 text-[#54391E] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-[#1A1A1A] text-sm">Hours</h4>
                    <p className="text-sm text-gray-500 mt-1">Mon–Sat: 10 AM – 8 PM<br />Sun: By Appointment</p>
                  </div>
                </motion.div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.7371948514115!2d70.8020581752834!3d22.29063957969395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cbcaffbf36cd%3A0xc9abe557cf2e1a96!2sDENTCITY%20Superspeciality%20Dental%20%26%20Implant%20Centre%20-%20Dr.%20Rathin%20Bhindi!5e0!3m2!1sen!2sin!4v1715760000000!5m2!1sen!2sin"
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
              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-lg">
                <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-8">Send Us a Message</h2>
                <AppointmentForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
