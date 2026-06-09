import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "What is the best way to pick a dentist in Rajkot?",
    a: "Look for a clinic that combines experienced specialists, advanced technology, transparent pricing, and excellent patient reviews. At Dentcity, we pride ourselves on offering all of these to ensure you receive world-class dental care.",
  },
  {
    q: "What kinds of dental work do you do at Dentcity?",
    a: "We offer comprehensive dental services ranging from routine check-ups, cleanings, and painless root canals, to advanced treatments like Corticobasal dental implants, smile designing, orthodontics, and full-mouth rehabilitation.",
  },
  {
    q: "Do you do root canals without pain?",
    a: "Yes, absolutely. We use modern local anesthesia and advanced rotary endodontic equipment to ensure your root canal treatment is comfortable, efficient, and virtually painless.",
  },
  {
    q: "What is the cost of dental care in Rajkot?",
    a: "The cost varies depending on the specific treatment required. At Dentcity, we believe in complete transparency. Following your initial consultation and diagnosis, we provide a clear, upfront cost estimate before any work begins.",
  },
  {
    q: "Do you take patients that stroll in?",
    a: "Yes, walk-in patients are welcome! However, to minimize your wait time and ensure our specialists are available to give you their undivided attention, we highly recommend booking an appointment in advance.",
  },
  {
    q: "Are dental implants safe and will they endure a long time?",
    a: "Yes, dental implants are extremely safe and are considered the gold standard for tooth replacement. With proper oral hygiene and regular dental check-ups, high-quality implants like the ones we use at Dentcity can last a lifetime.",
  },
  {
    q: "How often do I need to go to the dentist?",
    a: "We recommend visiting the dentist for a routine check-up and professional cleaning every 6 months. This helps in early detection of any issues and keeps your teeth and gums healthy.",
  },
];

export const FAQSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  const accentColor = "#D4A373";

  return (
    <section ref={ref} className="relative overflow-hidden py-12 md:py-16"
      style={{ background: "linear-gradient(160deg,#0a0f1e 0%,#0d1a2e 50%,#080d18 100%)" }}>

      {/* ── Ambient blobs ── */}
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-20"
        style={{ background: "radial-gradient(circle,#54391E,transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-15"
        style={{ background: "radial-gradient(circle,#60B8F0,transparent 70%)" }} />

      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4,0,0.2,1] }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A373]/25 bg-[#D4A373]/10 mb-4"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4A373]">
              Got Questions?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            Frequently Asked{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#D4A373] to-[#F5E2C9]">
                Questions
              </span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-3 text-white/50 max-w-xl mx-auto text-base"
          >
            Everything you need to know before your first visit — answered by our experts.
          </motion.p>
        </motion.div>

        {/* ── FAQ list ── */}
        <div className="max-w-3xl mx-auto space-y-3">
          <AnimatePresence mode="popLayout">
            {faqs.map((faq, i) => {
              const isOpen = open === i;

              return (
                <motion.div
                  key={faq.q}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ delay: i * 0.06, duration: 0.42, ease: [0.4,0,0.2,1] }}
                >
                  <div
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="relative rounded-2xl border cursor-pointer overflow-hidden transition-all duration-300"
                    style={{
                      borderColor: isOpen ? `${accentColor}50` : "rgba(255,255,255,0.08)",
                      background: isOpen
                        ? `linear-gradient(135deg,${accentColor}10,rgba(255,255,255,0.03))`
                        : "rgba(255,255,255,0.04)",
                      boxShadow: isOpen ? `0 0 32px 0 ${accentColor}18` : "none",
                    }}
                  >
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300"
                      style={{ background: isOpen ? accentColor : "transparent" }}
                    />

                    {/* Question row */}
                    <div className="flex items-center gap-4 px-6 py-4 pl-8">
                      {/* Number */}
                      <span
                        className="font-display text-3xl font-black opacity-20 select-none flex-shrink-0 w-8 text-right tabular-nums"
                        style={{ color: accentColor }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <p className={`flex-1 font-display text-sm md:text-base font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-white" : "text-white/75"}`}>
                        {faq.q}
                      </p>

                      {/* Toggle icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300"
                        style={{
                          borderColor: isOpen ? accentColor : "rgba(255,255,255,0.15)",
                          background: isOpen ? accentColor : "transparent",
                        }}
                      >
                        {isOpen
                          ? <Minus className="w-3.5 h-3.5 text-white" />
                          : <Plus className="w-3.5 h-3.5 text-white/60" />}
                      </div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.4,0,0.2,1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-5 pl-20 pr-6">
                            <p className="text-white/55 text-sm leading-relaxed border-t border-white/[0.07] pt-3">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-14"
        >
          <p className="text-white/40 text-sm mb-4">Still have a question? We're happy to help.</p>
          <a
            href="#contact"
            onClick={e => {
              const el = document.getElementById("contact");
              if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: "linear-gradient(135deg,#54391E,#825B34)" }}
          >
            Ask Us Anything
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};
