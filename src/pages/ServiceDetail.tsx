import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight, Phone } from "lucide-react";
import serviceImplants from "@/assets/service-implants.jpg";
import serviceOrthodontics from "@/assets/service-orthodontics.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

/* ─── All service detail data ─── */
const serviceData: Record<
  string,
  {
    title: string;
    subtitle: string;
    img: string;
    overview: string;
    highlights: string[];
    process: { step: string; desc: string }[];
    benefits: string[];
    faq: { q: string; a: string }[];
  }
> = {
  "dental-implants": {
    title: "Dental Implants",
    subtitle: "Specialized Care · Permanent Tooth Replacement",
    img: serviceImplants,
    overview:
      "Dental implants are the gold-standard solution for replacing missing teeth. A titanium post is surgically placed into the jawbone and acts as an artificial tooth root, providing a strong foundation for a crown that looks, feels, and functions like a natural tooth. At DENTCITY, we use the latest implant systems and guided-surgery protocols to ensure precise placement and outstanding long-term results.",
    highlights: [
      "Looks and functions exactly like a natural tooth",
      "Prevents bone loss in the jaw",
      "Lifetime solution with proper care",
      "No damage to neighbouring teeth",
      "High success rate (over 95%)",
      "Improves speech and chewing comfort",
    ],
    process: [
      { step: "Consultation & 3D Scan", desc: "We perform a detailed 3D CBCT scan and digital smile assessment to plan the precise implant position." },
      { step: "Implant Placement", desc: "Under local anaesthesia, the titanium implant is placed in the jawbone using computer-guided surgery." },
      { step: "Osseointegration", desc: "Over 6–12 weeks the implant fuses with the bone, creating a rock-solid anchor." },
      { step: "Crown Placement", desc: "A custom-fabricated ceramic crown is attached, matching the shape and colour of your natural teeth perfectly." },
      { step: "Follow-Up Care", desc: "Regular check-ups ensure the implant integrates well and your bite remains healthy." },
    ],
    benefits: [
      "Preserve your facial structure",
      "Eat any food with confidence",
      "Zero slipping — fixed for life",
      "Easy to clean like natural teeth",
      "Boost in self-confidence and smile",
    ],
    faq: [
      { q: "Is the procedure painful?", a: "The surgery is performed under local anaesthesia so you feel no pain during the procedure. Mild soreness afterwards is easily managed with standard pain relief." },
      { q: "How long do implants last?", a: "With proper oral hygiene and routine check-ups, dental implants can last a lifetime." },
      { q: "Am I a candidate for implants?", a: "Most adults with good general health and adequate bone density are candidates. We assess this during your initial consultation with a 3D scan." },
    ],
  },

  "full-mouth-rehabilitation": {
    title: "Full Mouth Rehabilitation",
    subtitle: "Specialized Care · Complete Oral Restoration",
    img: gallery1,
    overview:
      "Full mouth rehabilitation is a comprehensive treatment plan that combines multiple dental procedures to restore the health, function, and aesthetics of the entire mouth. It is ideal for patients who have experienced extensive tooth loss, severe decay, bite problems, or trauma affecting multiple teeth.",
    highlights: [
      "Customised multi-treatment plan for each patient",
      "Combines implants, crowns, veneers, and more",
      "Restores proper bite alignment (occlusion)",
      "Eliminates pain from jaw disorders (TMJ)",
      "Digital smile preview before treatment begins",
      "Phased treatment for comfort and convenience",
    ],
    process: [
      { step: "Comprehensive Evaluation", desc: "Full X-rays, CBCT scan, bite analysis, and photographs to build a complete picture of your oral health." },
      { step: "Digital Treatment Plan", desc: "We create a phased, digital treatment roadmap and show you a preview of your final smile." },
      { step: "Preparatory Treatments", desc: "Gum therapy, extractions, or bone grafting as needed before restorative work begins." },
      { step: "Restorative Phase", desc: "Implants, crowns, bridges, veneers, or dentures are placed according to the plan." },
      { step: "Bite Calibration & Finishing", desc: "Fine-tuning of the bite and final polishing to ensure perfect function and aesthetics." },
    ],
    benefits: [
      "Completely renewed smile in one place",
      "Improved chewing and digestion",
      "Relief from chronic jaw or tooth pain",
      "Long-term sustainable oral health",
      "Dramatic improvement in confidence",
    ],
    faq: [
      { q: "How long does full mouth rehabilitation take?", a: "Treatment duration varies from a few months to over a year depending on the complexity. Your plan will include a clear timeline." },
      { q: "Is it covered by insurance?", a: "Some functional elements may be covered. Our team will help you navigate insurance options and financing." },
    ],
  },

  "invisible-aligners": {
    title: "Invisible Aligners",
    subtitle: "Comprehensive Care · Clear Orthodontic Solution",
    img: serviceOrthodontics,
    overview:
      "Invisible aligners are a modern, discreet alternative to traditional braces. Custom-made transparent trays gently shift your teeth into the desired position over time. They are removable, nearly undetectable, and comfortable to wear — making them the preferred choice for working professionals and adults.",
    highlights: [
      "Crystal-clear, virtually invisible trays",
      "Removable for eating and brushing",
      "No metal brackets or wires",
      "Comfortable smooth plastic",
      "Fewer clinic visits than braces",
      "Digital simulation shows final result before you start",
    ],
    process: [
      { step: "Digital Scan & Simulation", desc: "We take a 3D digital scan of your teeth and show you a virtual simulation of your tooth movement." },
      { step: "Custom Aligner Fabrication", desc: "A series of precision aligners is custom-made for your unique smile." },
      { step: "Progressive Wearing", desc: "You wear each set of aligners for 1–2 weeks, switching to the next set as your teeth move." },
      { step: "Progress Check-ups", desc: "We monitor progress every 6–8 weeks and make any refinements needed." },
      { step: "Retainer Phase", desc: "After treatment, a retainer is provided to maintain your new smile." },
    ],
    benefits: [
      "Straighten teeth without anyone noticing",
      "No food restrictions — remove to eat",
      "Easier to brush and floss",
      "More comfortable than metal braces",
      "Predictable, trackable results",
    ],
    faq: [
      { q: "How long is the treatment?", a: "Treatment typically takes 6–18 months depending on complexity. Mild cases can be as short as 3 months." },
      { q: "How many hours a day do I wear them?", a: "Aligners should be worn 20–22 hours a day for best results, removed only for eating and oral hygiene." },
    ],
  },

  "smile-makeover": {
    title: "Smile Makeover",
    subtitle: "Comprehensive Care · Cosmetic Transformation",
    img: hero2,
    overview:
      "A smile makeover is a personalised combination of cosmetic dental procedures designed to dramatically transform your smile. Using digital smile design technology, we preview the final result before any treatment starts, ensuring you are completely happy with your new look.",
    highlights: [
      "Digital Smile Design preview before treatment",
      "Combines veneers, whitening, contouring & more",
      "Tailored to your facial features and skin tone",
      "Minimally invasive techniques where possible",
      "Natural-looking, long-lasting results",
      "Boosted confidence and first impressions",
    ],
    process: [
      { step: "Smile Analysis", desc: "We photograph your smile and analyse proportions, tooth shape, colour, and gum line." },
      { step: "Digital Design", desc: "Your new smile is digitally designed and shown to you as a preview — tweak until perfect." },
      { step: "Trial Smile (Mock-up)", desc: "A temporary mock-up is placed so you can experience your new smile in real life before committing." },
      { step: "Treatment Execution", desc: "Veneers, whitening, bonding, or other procedures are carried out in the planned sequence." },
      { step: "Final Review", desc: "We ensure every detail — colour, shape, and bite — meets your expectations." },
    ],
    benefits: [
      "A smile you're proud to show off",
      "Personalised down to every detail",
      "Natural aesthetics, not a 'fake' look",
      "Durable results with routine maintenance",
      "Improved overall facial harmony",
    ],
    faq: [
      { q: "How many appointments does a smile makeover take?", a: "Typically 3–6 appointments spread over 2–8 weeks, depending on the treatments involved." },
      { q: "How long do veneers last?", a: "Porcelain veneers can last 10–15 years with good care." },
    ],
  },

  "crowns-and-bridges": {
    title: "Crowns And Bridges",
    subtitle: "Comprehensive Care · Tooth Restoration",
    img: gallery2,
    overview:
      "Dental crowns cap a damaged tooth to restore its shape, strength, and appearance, while bridges fill the gap left by one or more missing teeth by anchoring to the adjacent teeth. At DENTCITY, we use high-strength ceramic and zirconia materials for results that are virtually indistinguishable from natural teeth.",
    highlights: [
      "Zirconia and ceramic for metal-free aesthetics",
      "CAD/CAM precision manufacturing",
      "Matched to natural tooth shade",
      "Restores full biting strength",
      "Protects weakened or cracked teeth",
      "Fixed solution — no removal required",
    ],
    process: [
      { step: "Assessment & Shade Matching", desc: "The tooth is examined and the ideal crown shade is selected using a digital colour guide." },
      { step: "Tooth Preparation", desc: "A small amount of enamel is reshaped to allow the crown to fit naturally over the tooth." },
      { step: "Digital Impressions", desc: "A precise 3D digital scan replaces traditional putty impressions for greater accuracy." },
      { step: "Temporary Crown", desc: "A temporary crown protects the tooth while the permanent one is fabricated." },
      { step: "Final Bonding", desc: "The permanent crown is checked for fit, bite, and aesthetics, then permanently bonded." },
    ],
    benefits: [
      "Restore a cracked or severely decayed tooth",
      "Bridge a gap without implants",
      "Natural appearance and feel",
      "Durable — lasts 10–15+ years",
      "Protect root-canal-treated teeth",
    ],
    faq: [
      { q: "Is the procedure painful?", a: "The procedure is done under local anaesthesia. You may feel slight sensitivity for a few days after preparation." },
      { q: "How long does a crown last?", a: "With good oral hygiene, porcelain crowns typically last 10–15 years or more." },
    ],
  },

  "teeth-whitening": {
    title: "Teeth Whitening",
    subtitle: "Comprehensive Care · Cosmetic Enhancement",
    img: hero1,
    overview:
      "Professional teeth whitening at DENTCITY delivers dramatically brighter results compared to over-the-counter products, in a safe, controlled environment. We offer in-clinic power whitening and custom take-home trays — or a combination of both for maximum effect.",
    highlights: [
      "Up to 8 shades brighter in a single session",
      "Safe for tooth enamel when done professionally",
      "Custom-fitted trays for home maintenance",
      "Long-lasting results with proper care",
      "Suitable for sensitive teeth (adapted protocol)",
      "Quick — in-clinic session in under 90 minutes",
    ],
    process: [
      { step: "Shade Assessment", desc: "We record your current tooth shade and set a realistic target shade." },
      { step: "Gum Protection", desc: "Gums and soft tissues are protected using a barrier gel." },
      { step: "Whitening Gel Application", desc: "Professional-grade hydrogen peroxide gel is applied to the teeth." },
      { step: "Light Activation", desc: "A specialised light activates the gel for accelerated whitening." },
      { step: "Home Maintenance Kit", desc: "Custom trays and a maintenance gel kit are provided to extend results." },
    ],
    benefits: [
      "Instant, visible improvement",
      "Boosts confidence instantly",
      "Non-invasive cosmetic upgrade",
      "Affordable and fast",
      "Reversible and customisable intensity",
    ],
    faq: [
      { q: "How long do results last?", a: "Results typically last 1–3 years depending on diet and habits. Touch-ups with home trays extend results." },
      { q: "Does whitening work on crowns or veneers?", a: "Whitening only works on natural tooth enamel. We match new restorations to your brightened shade." },
    ],
  },

  "braces-treatment": {
    title: "Braces Treatment",
    subtitle: "Comprehensive Care · Orthodontics",
    img: gallery4,
    overview:
      "Traditional and ceramic braces remain one of the most effective solutions for correcting complex misalignments, crowding, and bite issues. At DENTCITY, we offer metal, ceramic, and self-ligating braces — paired with careful monitoring to ensure efficient tooth movement and a straight, healthy smile.",
    highlights: [
      "Treats complex crowding and bite issues",
      "Ceramic braces for a discreet look",
      "Self-ligating brackets reduce friction",
      "Precise, controlled tooth movement",
      "Suitable for all ages",
      "Long-term stable results with retainers",
    ],
    process: [
      { step: "Orthodontic Consultation", desc: "X-rays and models are taken to plan your treatment and select the right brace type." },
      { step: "Brace Fitting", desc: "Brackets are bonded to teeth and the archwire is threaded — a comfortable, quick process." },
      { step: "Regular Adjustments", desc: "Every 4–6 weeks the wire is tightened to guide your teeth efficiently." },
      { step: "Debonding", desc: "Once teeth are in position, the braces are removed and teeth are polished." },
      { step: "Retainer", desc: "A custom retainer prevents teeth from shifting back and maintains your new smile." },
    ],
    benefits: [
      "Correct complex bite and alignment issues",
      "Durable and precise",
      "Improves long-term oral health",
      "Cost-effective orthodontic solution",
      "Proven decades-long track record",
    ],
    faq: [
      { q: "How long is braces treatment?", a: "Typically 12–24 months, depending on the complexity of the case." },
      { q: "Are ceramic braces as effective as metal?", a: "Yes — ceramic braces work exactly the same as metal braces but are far less noticeable." },
    ],
  },

  "pediatric-dentistry": {
    title: "Pediatric Dentistry",
    subtitle: "Comprehensive Care · Children's Dental Health",
    img: gallery3,
    overview:
      "At DENTCITY, we believe every child deserves a positive, fear-free dental experience. Our paediatric dental team is specially trained to make young patients feel comfortable, turning dental visits into something children look forward to rather than dread. We focus on prevention, education, and early intervention.",
    highlights: [
      "Child-friendly, colourful clinic environment",
      "Gentle, trained paediatric dentists",
      "Preventive treatments: fluoride, sealants",
      "Early orthodontic assessment",
      "Cavity detection and tooth-friendly education",
      "Parents guided on diet and brushing habits",
    ],
    process: [
      { step: "Welcome & Orientation", desc: "We introduce children to the clinic environment playfully — no rush, no fear." },
      { step: "Gentle Examination", desc: "A thorough check of teeth, gums, bite, and jaw development." },
      { step: "Cleaning & Fluoride", desc: "Professional cleaning and fluoride application to keep small teeth strong." },
      { step: "Preventive Advice", desc: "We guide both child and parent on diet, brushing technique, and oral habits." },
      { step: "Treatment if Needed", desc: "Fillings, fissure sealants, or space maintainers are done gently with appropriate sedation options." },
    ],
    benefits: [
      "Builds positive dental habits from early age",
      "Prevents cavities before they start",
      "Detects orthodontic needs early",
      "Reduces dental anxiety for life",
      "Ensures healthy adult teeth develop correctly",
    ],
    faq: [
      { q: "When should my child's first dental visit be?", a: "We recommend the first visit by age 1 or within 6 months of the first tooth appearing." },
      { q: "What if my child is scared of the dentist?", a: "Our team is specially trained in behaviour management. We go at your child's pace with no pressure." },
    ],
  },

  "tooth-colored-filling": {
    title: "Tooth-Colored Filling",
    subtitle: "Comprehensive Care · Aesthetic Restoration",
    img: gallery1,
    overview:
      "Tooth-coloured composite resin fillings allow us to restore cavities and minor chips invisibly. Unlike old silver amalgam fillings, composite bonds directly to the tooth structure, requires less removal of healthy tooth, and is completely mercury-free.",
    highlights: [
      "Matches your exact tooth colour perfectly",
      "Mercury-free and biocompatible",
      "Bonds to tooth — less healthy tissue removed",
      "Completed in a single appointment",
      "Restores full tooth strength",
      "Can also repair chips and minor cracks",
    ],
    process: [
      { step: "Decay Removal", desc: "The decayed portion of the tooth is removed under local anaesthesia." },
      { step: "Shade Selection", desc: "The composite shade is matched precisely to your natural tooth colour." },
      { step: "Bonding & Layering", desc: "Composite is applied in layers and each one is hardened with a curing light." },
      { step: "Shaping & Polishing", desc: "The filling is sculpted to match your natural tooth contours and polished to a smooth finish." },
      { step: "Bite Check", desc: "We check your bite is comfortable and make micro-adjustments as needed." },
    ],
    benefits: [
      "Invisible — no one can tell you have a filling",
      "Mercury-free and safe for the whole family",
      "Strengthens the tooth, not just fills it",
      "Quick single-visit procedure",
      "Can replace old dark amalgam fillings",
    ],
    faq: [
      { q: "How long do composite fillings last?", a: "With good oral hygiene, composite fillings last 7–10 years or more." },
      { q: "Can I eat normally after the filling?", a: "Yes — composite is set immediately. Avoid very hard foods for 24 hours while the tooth settles." },
    ],
  },

  "wisdom-tooth-extraction": {
    title: "Wisdom Tooth Extraction",
    subtitle: "Comprehensive Care · Oral Surgery",
    img: hero1,
    overview:
      "Wisdom teeth (third molars) often lack space to erupt properly, leading to pain, infection, or damage to neighbouring teeth. DENTCITY's oral surgeons perform safe, minimally invasive wisdom tooth removals — including complex impacted cases — using advanced surgical techniques and 3D imaging for precision.",
    highlights: [
      "3D CBCT scan for safe surgical planning",
      "Experienced oral surgery team",
      "Minimally invasive technique",
      "IV sedation available for anxious patients",
      "Clear post-op care instructions",
      "Fast recovery with proper aftercare",
    ],
    process: [
      { step: "3D Assessment", desc: "A CBCT scan maps the exact position of the wisdom tooth and nearby nerves." },
      { step: "Anaesthesia", desc: "Local anaesthesia (or sedation if preferred) ensures a completely pain-free procedure." },
      { step: "Extraction", desc: "The tooth is gently loosened and removed, with stitches placed if required." },
      { step: "Recovery Guidance", desc: "Detailed aftercare instructions and medication are provided to ensure smooth healing." },
      { step: "Follow-Up", desc: "A check-up 1 week later confirms healing is proceeding well." },
    ],
    benefits: [
      "Eliminate chronic jaw pain and infection",
      "Prevent damage to neighbouring teeth",
      "Reduce risk of cysts and tumours",
      "Improve oral hygiene in the back of the mouth",
      "Minimally invasive — faster healing",
    ],
    faq: [
      { q: "Does wisdom tooth removal hurt?", a: "The procedure is done under anaesthesia — you won't feel pain. Soreness for 2–3 days after is normal and managed with medication." },
      { q: "When can I eat normally again?", a: "Soft foods for the first 3–5 days. Most patients return to normal eating within a week." },
    ],
  },

  "root-canal-treatment": {
    title: "Root Canal Treatment",
    subtitle: "Comprehensive Care · Endodontics",
    img: gallery2,
    overview:
      "Root canal treatment saves an infected or severely decayed tooth by removing the damaged pulp, cleaning the root canals, and sealing them. Modern techniques and anaesthesia make the procedure no more uncomfortable than a routine filling — and it eliminates pain rather than causing it.",
    highlights: [
      "Saves your natural tooth — no extraction needed",
      "Rotary endodontics for faster, safer treatment",
      "Microscope-guided precision",
      "Completely pain-free under local anaesthesia",
      "Usually completed in 1–2 appointments",
      "Followed by crown placement for full protection",
    ],
    process: [
      { step: "Diagnosis & X-ray", desc: "Digital X-ray confirms the infection and maps the root canal anatomy." },
      { step: "Anaesthesia", desc: "The area is numbed — you will feel no pain throughout the procedure." },
      { step: "Pulp Removal", desc: "Infected pulp tissue is removed using precision rotary files under magnification." },
      { step: "Canal Cleaning & Shaping", desc: "Root canals are thoroughly cleaned, shaped, and disinfected." },
      { step: "Sealing & Crown", desc: "Canals are filled with biocompatible gutta-percha and the tooth is protected with a crown." },
    ],
    benefits: [
      "Save your natural tooth for life",
      "Eliminate pain from infection",
      "Prevent infection spreading to other teeth or jaw",
      "Restore normal chewing and sensation",
      "Natural appearance maintained with a crown",
    ],
    faq: [
      { q: "Is root canal treatment painful?", a: "No — modern anaesthetics mean you feel no pain during the procedure. Most patients say it feels similar to getting a filling." },
      { q: "How many appointments does it take?", a: "Most cases are completed in 1–2 appointments. Severely infected teeth may need an extra session." },
    ],
  },
};

/* ─── Component ─── */
const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-0 h-[55vh] min-h-[340px] overflow-hidden">
        <img
          src={service.img}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16">
          <div className="container mx-auto px-5 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Services
              </Link>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/60 mb-2">
                {service.subtitle}
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-xl">
                {service.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding pb-10">
        <div className="container mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            {service.overview}
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {service.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: "#1a73e8" }}
                />
                <span className="text-sm text-foreground">{h}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section
        className="section-padding py-16"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #fff5f0 100%)",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className="text-xs font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full"
              style={{ background: "rgba(26,115,232,0.1)", color: "#1a73e8" }}
            >
              How It Works
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-4">
              Step-by-Step Process
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-0.5 hidden sm:block"
              style={{ background: "rgba(26,115,232,0.15)" }}
            />
            <div className="space-y-6">
              {service.process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-5 sm:gap-8 items-start"
                >
                  {/* Step number bubble */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-md z-10"
                    style={{ background: "linear-gradient(135deg,#1a73e8,#0d47a1)" }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="flex-1 rounded-2xl p-5"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      boxShadow: "0 4px 20px rgba(26,115,232,0.07)",
                      border: "1px solid rgba(26,115,232,0.1)",
                    }}
                  >
                    <h3 className="font-display font-bold text-foreground text-base">
                      {p.step}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits + FAQ side by side */}
      <section className="section-padding py-16">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Key Benefits
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: "#1a73e8" }}
                    />
                    <span className="text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {service.faq.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5"
                    style={{
                      border: "1px solid rgba(26,115,232,0.12)",
                      background: "rgba(26,115,232,0.03)",
                    }}
                  >
                    <p className="font-semibold text-foreground text-sm">{f.q}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section
        className="py-16 px-4"
        style={{ background: "linear-gradient(90deg,#1a73e8,#0d47a1)" }}
      >
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-white/75 mb-8 text-sm md:text-base">
              Book a consultation with our experts and take the first step toward your best smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-white transition-all hover:scale-105 active:scale-95"
                style={{ color: "#1a73e8" }}
              >
                Book Appointment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
