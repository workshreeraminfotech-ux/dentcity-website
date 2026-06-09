import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Phone, CheckCircle2, ChevronDown, Calendar, ArrowLeft, ZoomIn, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import fmrImage from "@/assets/premium_services/full_mouth.png";
import smileImage from "@/assets/premium_services/smile_design.png";

import imgImplant from "@/assets/premium_services/implant_dentistry.png";
import imgFmr from "@/assets/premium_services/full_mouth.png";
import imgSmile from "@/assets/premium_services/smile_design.png";
import imgRct from "@/assets/premium_services/root_canal.png";
import imgChild from "@/assets/drwithchild.jpg";
import imgFilling from "@/assets/premium_services/composite_filling.png";
import imgCrown from "@/assets/premium_services/crown_bridges.png";
import imgSurgery from "@/assets/premium_services/oral_surgery.png";
import imgOrtho from "@/assets/premium_services/orthodontics.png";

// --- Image Imports ---
const implantModules = import.meta.glob('@/assets/our service/1.dental implant/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allImplantImages: Record<string, string> = {};
for (const path in implantModules) {
  allImplantImages[path] = (implantModules[path] as any).default || implantModules[path] as string;
}

const fmrModules = import.meta.glob('@/assets/our service/2.full mouth reheb/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allFmrImages: Record<string, string> = {};
for (const path in fmrModules) {
  allFmrImages[path] = (fmrModules[path] as any).default || fmrModules[path] as string;
}

const smileModules = import.meta.glob('@/assets/our service/3.smiling designing/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allSmileImages: Record<string, string> = {};
for (const path in smileModules) {
  allSmileImages[path] = (smileModules[path] as any).default || smileModules[path] as string;
}

const rctModules = import.meta.glob('@/assets/our service/4.root canal treatment/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allRctImages: Record<string, string> = {};
for (const path in rctModules) {
  allRctImages[path] = (rctModules[path] as any).default || rctModules[path] as string;
}

const childModules = import.meta.glob('@/assets/our service/7.child dentistry/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allChildImages: Record<string, string> = {};
for (const path in childModules) {
  allChildImages[path] = (childModules[path] as any).default || childModules[path] as string;
}

const fillingModules = import.meta.glob('@/assets/our service/5.dental filling/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allFillingImages: Record<string, string> = {};
for (const path in fillingModules) {
  allFillingImages[path] = (fillingModules[path] as any).default || fillingModules[path] as string;
}

const crownModules = import.meta.glob('@/assets/our service/6.crown and bridges/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allCrownImages: Record<string, string> = {};
for (const path in crownModules) {
  allCrownImages[path] = (crownModules[path] as any).default || crownModules[path] as string;
}

const surgeryModules = import.meta.glob('@/assets/our service/8.oral surgery/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allSurgeryImages: Record<string, string> = {};
for (const path in surgeryModules) {
  allSurgeryImages[path] = (surgeryModules[path] as any).default || surgeryModules[path] as string;
}

const orthoModules = import.meta.glob('@/assets/our service/9.orthodentist/**/*.{png,jpg,JPG,jpeg,webp}', { eager: true });
const allOrthoImages: Record<string, string> = {};
for (const path in orthoModules) {
  allOrthoImages[path] = (orthoModules[path] as any).default || orthoModules[path] as string;
}

const getCasesFromModules = (modulesDict: Record<string, string>, filterKeyword?: string) => {
  const casesMap: Record<string, { path: string; url: string }[]> = {};
  
  for (const [path, url] of Object.entries(modulesDict)) {
    if (filterKeyword && !path.toLowerCase().includes(filterKeyword.toLowerCase())) {
      continue;
    }
    const match = path.match(/case \d+/i);
    const caseName = match ? match[0].toLowerCase() : "featured clinical cases";
    
    if (!casesMap[caseName]) casesMap[caseName] = [];
    casesMap[caseName].push({ path, url });
  }
  
  for (const key in casesMap) {
    casesMap[key].sort((a, b) => {
      const filenameA = a.path.split("/").pop() || "";
      const filenameB = b.path.split("/").pop() || "";
      const numA = parseInt(filenameA.match(/(\d+)\.[^.]+$/)?.[1] || "0");
      const numB = parseInt(filenameB.match(/(\d+)\.[^.]+$/)?.[1] || "0");
      return numA - numB;
    });
  }

  const sortedEntries = Object.entries(casesMap).sort((a, b) => {
    if (a[0] === "featured clinical cases") return -1;
    if (b[0] === "featured clinical cases") return 1;
    
    const numA = parseInt(a[0].match(/\d+/)?.[0] || "0");
    const numB = parseInt(b[0].match(/\d+/)?.[0] || "0");
    return numA - numB;
  });

  return sortedEntries.map(([caseName, items]) => {
    return [caseName, items.map((item) => item.url)] as [string, string[]];
  });
};

// --- Process Logic ---
const getProcessName = (idx: number, total: number) => {
  if (total === 1) return "Featured Outcome";
  if (total <= 3) {
    if (idx === 0) return "Pre-Operative View";
    if (idx === total - 1) return "Final Outcome";
    return "Treatment in Progress";
  }
  const percent = idx / (total - 1);
  if (percent === 0) return "Initial Pre-Operative View";
  if (percent < 0.2) return "Treatment Planning & Preparation";
  if (percent < 0.45) return "Surgical Phase & Clinical Assessment";
  if (percent < 0.6) return "Healing & Soft Tissue Management";
  if (percent < 0.85) return "Prosthetic Phase & Try-in";
  if (percent < 1) return "Final Delivery & Adjustment";
  return "Final Outcome & Smile Restoration";
};

// --- Services Data ---
type GallerySection = { title: string; desc: string; cases: [string, string[]][] };
type ServiceConfig = {
  heroBg: string;
  title1: string;
  title2: string;
  heroDesc: string;
  section1Title: string;
  section1Text1: string;
  section1Text2: string;
  section1Img: string;
  section2Title: string;
  features: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  whyTrustList: string[];
  facilitiesText: string;
  gallerySections: GallerySection[];
};

const servicesData: Record<string, ServiceConfig> = {
  "implant-dentistry": {
    heroBg: imgImplant,
    title1: "Full Mouth Dental Implants for a",
    title2: "Natural Smile",
    heroDesc: "At Dentcity, located in Rajkot, our services include modern full mouth implants, guaranteed to restore both your smile and chewing system. Led by Dr. Rathin Bhindi, our experienced team is equipped with the finest implant solutions to provide a permanent replacement for missing teeth.",
    section1Title: "Advanced Dental Implants in Rajkot",
    section1Text1: "If you are in need of replacing a missing or damaged tooth, the best, most permanent option is dental implants. At Dentcity in Rajkot, our specialization includes full mouth dental implants. Dental implants assist patients in feeling better about themselves, eating comfortably, and restoring their mouth to its normal function.",
    section1Text2: "Our implant solutions are designed to look, feel, and function exactly like your natural teeth, whether you have lost teeth due to cavities, gum disease, trauma, or age.",
    section1Img: imgImplant,
    section2Title: "Complete Implant Solutions Under One Roof",
    features: [
      { title: "Full Mouth Dental Implants", desc: "Permanent implant solutions replacing all missing teeth, restoring function, aesthetics, bite stability, and long-term oral health." },
      { title: "Single Tooth Implants", desc: "A precise implant treatment replacing a single missing tooth without affecting adjacent natural teeth." },
      { title: "Multiple Teeth Implants", desc: "Implant-supported restorations designed to replace multiple missing teeth with strength, balance, and natural appearance." },
      { title: "All-on-4 / All-on-6 Dental Implants", desc: "Advanced full-arch implant techniques delivering fixed teeth using fewer implants, often completed in a single day." },
      { title: "Implant-Supported Dentures", desc: "Secure denture solutions anchored to implants, eliminating looseness while improving comfort, chewing efficiency, and confidence." },
      { title: "Bone Grafting & Implant Preparation", desc: "Pre-implant procedures enhancing bone volume and quality to ensure implant stability, longevity, and predictable outcomes." }
    ],
    faqs: [
      { question: "Who is a good candidate for full mouth dental implants?", answer: "People who are missing several teeth but are otherwise healthy are usually good candidates. A detailed evaluation by Dr. Rathin Bhindi will confirm your suitability." },
      { question: "How long do dental implants last?", answer: "Dental implants can last 15 to 25 years or even a lifetime if you take proper care of them with regular brushing, flossing, and dental check-ups." },
      { question: "Is the dental implant procedure painful?", answer: "Under local anaesthesia, the implant procedure is highly controlled and usually not painful. Most patients report minimal discomfort during recovery." },
      { question: "What is the cost of full mouth implants at Dentcity?", answer: "The cost depends on the specific method (e.g., All-on-4 vs All-on-6) and the materials used. After a thorough consultation, we present a tailored and transparent treatment plan." },
      { question: "How long does it take to get a dental implant?", answer: "The timeline depends on individual circumstances and bone health. It can range from immediate loading (same day) to a few months for complete osseointegration." },
      { question: "Are implants better than dentures?", answer: "Yes, implants are permanent, stable, and feel much more like your natural teeth compared to removable dentures, which can slip and cause discomfort." },
      { question: "How should I take care of my dental implants?", answer: "Care for them just like natural teeth: brush twice a day, floss daily, and maintain regular visits to Dentcity for professional cleaning and check-ups." }
    ],
    whyTrustList: [
      "Led by Expert Dr. Rathin Bhindi",
      "International Standard Implant Systems",
      "In-house CBCT & Digital Planning",
      "High Success Rate & Proven Track Record",
      "Advanced All-on-4 and All-on-6 Methods"
    ],
    facilitiesText: "Dentcity is equipped with fully functional dental units for implant placement, featuring Digital X-Ray, an In-house CBCT scanner, and Primescan for non-messy digital impressions.",
    gallerySections: [
      { title: 'Conventional Dental Implants', desc: 'Standard implant procedures delivering highly aesthetic and functional, long-lasting results.', cases: getCasesFromModules(allImplantImages, 'conventional') },
      { title: 'Corticobasal Implants', desc: 'Advanced implant technology suitable for patients with low bone volume, often completed in a shorter timeframe.', cases: getCasesFromModules(allImplantImages, 'corticobasal') }
    ]
  },
  "full-mouth-rehabilitation": {
    heroBg: imgFmr,
    title1: "Complete Full Mouth Rehabilitation for a",
    title2: "Flawless Smile",
    heroDesc: "At Dentcity, located in Rajkot, we specialize in comprehensive Full Mouth Rehabilitation. Led by Dr. Rathin Bhindi, our expert team combines advanced restorative, surgical, and cosmetic treatments to rebuild your smile, restore optimal chewing function, and improve your overall oral health.",
    section1Title: "Transform Your Smile & Oral Function in Rajkot",
    section1Text1: "Full Mouth Rehabilitation (FMR) is a highly personalized treatment designed for patients with severe dental issues such as multiple missing teeth, severe wear and tear, chronic jaw pain, or advanced gum disease. At Dentcity, we rebuild your entire mouth functionally and aesthetically.",
    section1Text2: "Our approach ensures that your bite is perfectly balanced, jaw joints are relaxed, and your teeth look natural. By combining crowns, bridges, veneers, and implants, we offer a total restoration tailored to your exact needs.",
    section1Img: imgFmr,
    section2Title: "Comprehensive Restorative Solutions",
    features: [
      { title: "Bite Correction & TMJ Therapy", desc: "Correcting improper bite alignment and treating jaw joint (TMJ) disorders for pain-free chewing." },
      { title: "Dental Crowns & Bridges", desc: "Restoring damaged or missing teeth using highly durable, natural-looking Zirconia or ceramic crowns." },
      { title: "Dental Implants", desc: "Providing a strong, permanent foundation for missing teeth, seamlessly integrating with your new bite." },
      { title: "Cosmetic Veneers", desc: "Enhancing the shape, color, and alignment of your visible teeth for a flawless front smile." },
      { title: "Gum Disease Treatment", desc: "Restoring foundational gum health and bone structure before placing any final restorations." },
      { title: "Digital Smile Design", desc: "Using advanced 3D scanning and CAD/CAM technology to plan and preview your perfect smile before treatment begins." }
    ],
    faqs: [
      { question: "What is the difference between a smile makeover and full mouth rehabilitation?", answer: "While a smile makeover primarily focuses on cosmetic improvements, full mouth rehabilitation rebuilds the functional aspects of the mouth (like bite and chewing) alongside aesthetic enhancements." },
      { question: "How long does the full mouth rehabilitation process take?", answer: "Depending on the complexity of your case, it can take anywhere from a few weeks to several months. We will provide a clear timeline during your initial consultation." },
      { question: "Is full mouth rehabilitation painful?", answer: "The procedures are performed under local anesthesia, ensuring you remain comfortable. We also use minimally invasive techniques to reduce post-treatment discomfort and speed up recovery." },
      { question: "Will my new teeth look natural?", answer: "Absolutely. We use premium materials like Zirconia and E-max ceramics that mimic the light-reflecting properties of natural enamel, customized to suit your facial profile." },
      { question: "Can I get full mouth rehabilitation if I have severe bone loss?", answer: "Yes. With advanced techniques like bone grafting, sinus lifts, or Corticobasal implants, we can successfully restore your mouth even with significant bone loss." }
    ],
    whyTrustList: [
      "Comprehensive Care Under One Roof",
      "Advanced Digital Workflow & 3D Scanning",
      "Personalized, Multi-Disciplinary Approach",
      "Premium Materials for Long-Lasting Results",
      "Focus on Functional & Aesthetic Harmony"
    ],
    facilitiesText: "Dentcity utilizes state-of-the-art diagnostic tools including In-house CBCT, T-Scan for bite analysis, and Primescan digital impressions to ensure every restoration is crafted with micrometer precision.",
    gallerySections: [
      { title: 'Full Mouth Rehabilitation Cases', desc: 'Explore our documented cases showcasing successful full mouth transformations and improved oral function.', cases: getCasesFromModules(allFmrImages) }
    ]
  },
  "smile-makeover": {
    heroBg: imgSmile,
    title1: "Bespoke Smile Designing for a",
    title2: "Flawless Appearance",
    heroDesc: "At Dentcity, we craft perfect smiles that harmonize with your facial features. Using advanced Digital Smile Design (DSD) technology, our experts meticulously plan and create stunning, natural-looking veneers and crowns to give you the confidence you deserve.",
    section1Title: "Transform Your Look with Digital Precision",
    section1Text1: "Smile Designing is both an art and a science. We correct discolorations, gaps, misalignments, and chipped teeth using ultra-thin porcelain veneers, composite bonding, and premium ceramic crowns tailored to your unique facial profile.",
    section1Text2: "Our goal is not just to give you straight white teeth, but a smile that complements your personality, enhances your lip support, and looks completely natural.",
    section1Img: imgSmile,
    section2Title: "Comprehensive Smile Enhancement",
    features: [
      { title: "Digital Smile Design (DSD)", desc: "Using advanced 3D scanning and CAD/CAM software to visualize and design your final smile before treatment begins." },
      { title: "Porcelain Veneers & Laminates", desc: "Ultra-thin, custom-made ceramic shells bonded to the front of your teeth for a durable, celebrity-worthy smile." },
      { title: "Teeth Whitening", desc: "Professional bleaching treatments to safely and effectively remove stains and brighten your smile by several shades." },
      { title: "Composite Bonding", desc: "A minimally invasive procedure using tooth-colored resin to repair chips, close small gaps, and reshape teeth." },
      { title: "Gum Contouring", desc: "Correcting a 'gummy smile' or uneven gum line using precision lasers for a perfectly proportioned aesthetic." },
      { title: "All-Ceramic Crowns", desc: "Metal-free, highly translucent Zirconia or E-max crowns that blend seamlessly with your natural teeth." }
    ],
    faqs: [
      { question: "What exactly is Digital Smile Design?", answer: "Digital Smile Design (DSD) is a protocol that uses clinical photography, video, and 3D software to analyze your facial and dental proportions. This allows us to design a highly personalized smile and show you a preview before any physical work begins." },
      { question: "How long do porcelain veneers last?", answer: "With proper care, good oral hygiene, and regular dental check-ups, porcelain veneers can last anywhere from 10 to 15 years, and often much longer." },
      { question: "Will my new teeth look artificial or bulky?", answer: "Not at all. We use advanced materials like E-max ceramics that mimic the natural translucency of tooth enamel. Each veneer or crown is custom-crafted by master ceramists to look completely natural." },
      { question: "Is the smile designing procedure painful?", answer: "The procedure is typically minimally invasive. Any tooth preparation is done under local anesthesia, ensuring you remain completely comfortable and pain-free throughout the process." },
      { question: "Can I choose how white my new smile will be?", answer: "Yes! We work closely with you to select a shade that is bright, beautiful, and most importantly, natural-looking for your complexion and age." }
    ],
    whyTrustList: [
      "In-House Digital Smile Design Studio",
      "Master Ceramists & Premium Materials",
      "Minimally Invasive Preparation",
      "Predictable, Trial-Smile Capabilities",
      "Exceptional Attention to Natural Aesthetics"
    ],
    facilitiesText: "Dentcity's aesthetic suite features intraoral 3D scanners, digital photography studios, and immediate CAD/CAM milling units to ensure your smile makeover is precise and flawless.",
    gallerySections: [
      { title: 'Smile Designing Cases', desc: 'Browse through our gallery of stunning smile transformations and aesthetic makeovers.', cases: getCasesFromModules(allSmileImages) }
    ]
  },
  "root-canal-treatment": {
    heroBg: imgRct,
    title1: "Painless Root Canal Treatment for a",
    title2: "Healthy Smile",
    heroDesc: "At Dentcity, we specialize in microscopic, single-visit root canal treatments. Led by endodontic experts, we use advanced rotary files, apex locators, and lasers to save your natural tooth comfortably, permanently relieving pain and infection.",
    section1Title: "Save Your Natural Tooth with Advanced Endodontics",
    section1Text1: "A root canal is needed when the inner pulp of a tooth becomes infected or inflamed due to deep decay, repeated dental procedures, or a crack. Instead of extracting the tooth, our advanced endodontic treatment removes the infection and seals the tooth to protect it.",
    section1Text2: "We understand that root canals often cause anxiety. That's why we utilize ultra-modern microscopic techniques and advanced anesthesia to ensure the procedure is as painless and comfortable as a routine filling.",
    section1Img: imgRct,
    section2Title: "Precision Endodontic Technology",
    features: [
      { title: "Microscope-Guided Endodontics", desc: "Using high-powered dental microscopes to locate hidden canals and ensure 100% removal of infection." },
      { title: "Single-Visit Root Canal", desc: "Completing the entire cleaning and sealing process in just one visit, saving you time and multiple appointments." },
      { title: "Laser-Assisted Disinfection", desc: "Employing advanced dental lasers to thoroughly sterilize the root canals, ensuring a bacteria-free environment." },
      { title: "Rotary Endodontics", desc: "Using flexible, automated titanium files for faster, smoother, and more precise cleaning of the canal system." },
      { title: "Post & Core Build-Up", desc: "Strengthening heavily damaged teeth with a biocompatible post before placing the final protective crown." },
      { title: "Bio-ceramic Sealers", desc: "Using advanced, tissue-friendly sealants that promote faster healing and guarantee a permanent, leak-proof seal." }
    ],
    faqs: [
      { question: "Is a root canal painful?", answer: "Not at all. With modern local anesthesia and our advanced techniques, the procedure is entirely painless and feels very similar to getting a routine cavity filling." },
      { question: "How many visits does a root canal take?", answer: "In most cases, we complete the entire root canal treatment in a single, comfortable visit lasting about 45 to 60 minutes." },
      { question: "Do I need a crown after a root canal?", answer: "Yes. After a root canal, the tooth can become brittle. A high-quality ceramic or zirconia crown is highly recommended to protect it from fracturing and restore full chewing strength." },
      { question: "What happens if I don't get a root canal?", answer: "If left untreated, the infection can spread to the surrounding bone, causing severe pain, facial swelling, abscess formation, and eventually the complete loss of the tooth." },
      { question: "How long does the treated tooth last?", answer: "With a proper crown and good oral hygiene, a tooth treated with a root canal can last a lifetime." }
    ],
    whyTrustList: [
      "Specialist Endodontist on Team",
      "Painless, Single-Visit Procedures",
      "Advanced Microscopic Precision",
      "Laser-Assisted Disinfection",
      "Long-lasting Bio-ceramic Materials"
    ],
    facilitiesText: "Dentcity's endodontic suite is equipped with global-standard apex locators, rotary motors, dental microscopes, and digital RVG X-rays for safe and precise root canal therapies.",
    gallerySections: [
      { title: 'Root Canal Treatment Cases', desc: 'Explore our documented cases demonstrating successful pain relief and tooth preservation.', cases: getCasesFromModules(allRctImages) }
    ]
  },
  "child-dentistry": {
    heroBg: imgChild,
    title1: "Gentle, Fear-Free Child Dentistry for",
    title2: "Little Smiles",
    heroDesc: "At Dentcity, we believe every child deserves a positive, pain-free dental experience. Our specialized pediatric dentists create a fun, welcoming environment to ensure your child's oral health is perfectly managed from their very first tooth to their teenage years.",
    section1Title: "Building a Foundation for a Lifetime of Healthy Smiles",
    section1Text1: "Children's dentistry requires a special touch. We focus on preventive care, early detection of orthodontic issues, and pain-free treatments for cavities. Our team is highly trained in behavior management to ensure your child feels safe and relaxed.",
    section1Text2: "We don't just treat teeth; we educate kids and parents on proper brushing techniques and dietary habits to prevent future dental problems. Let us make your child's dental visit a fun adventure instead of a scary chore.",
    section1Img: imgChild,
    section2Title: "Comprehensive Pediatric Dental Care",
    features: [
      { title: "Pain-Free Cavity Fillings", desc: "Using minimally invasive techniques and child-friendly materials to restore decayed baby teeth comfortably." },
      { title: "Fluoride Treatments & Sealants", desc: "Applying protective coatings and essential minerals to strengthen enamel and prevent future cavities." },
      { title: "Pulpectomy (Kids Root Canal)", desc: "Safely removing infected tissue from severely decayed baby teeth to relieve pain and save the tooth." },
      { title: "Early Orthodontic Assessment", desc: "Monitoring jaw growth and tooth eruption to intercept alignment issues before they become severe." },
      { title: "Habit Breaking Appliances", desc: "Custom-made oral devices to gently stop harmful habits like thumb sucking and tongue thrusting." },
      { title: "Preventive Dental Education", desc: "Engaging and fun sessions teaching kids how to brush and floss correctly for lifelong oral hygiene." }
    ],
    faqs: [
      { question: "When should my child first visit the dentist?", answer: "We recommend that a child's first dental visit should be when their first tooth erupts, or no later than their first birthday." },
      { question: "How do you manage an anxious child?", answer: "We use 'tell-show-do' techniques, positive reinforcement, and a highly child-friendly environment with toys and screens to distract and relax them." },
      { question: "Why fix baby teeth if they will fall out anyway?", answer: "Baby teeth guide permanent teeth into place and aid in chewing and speech. Untreated cavities in baby teeth can cause severe pain, infection, and damage to the underlying permanent teeth." },
      { question: "Are dental X-rays safe for children?", answer: "Yes. We use advanced digital RVG X-rays that emit extremely low radiation, making them entirely safe for children when absolutely necessary." },
      { question: "What are dental sealants?", answer: "Sealants are safe, protective coatings applied to the deep grooves of the chewing surfaces of back teeth, acting as a shield against cavity-causing bacteria." }
    ],
    whyTrustList: [
      "Specialized Pediatric Dentists",
      "Child-Friendly, Engaging Environment",
      "Focus on Preventive Care & Education",
      "Painless & Gentle Treatment Approaches",
      "Early Orthodontic Monitoring"
    ],
    facilitiesText: "Dentcity features a dedicated, brightly decorated pediatric zone designed to reduce anxiety, complete with ceiling-mounted screens so kids can watch their favorite cartoons during treatment.",
    gallerySections: [
      { title: 'Pediatric Dentistry Cases', desc: 'See how we have helped little ones achieve healthy, happy smiles with our specialized care.', cases: getCasesFromModules(allChildImages) }
    ]
  },
  "composite-resin-filling": {
    heroBg: imgFilling,
    title1: "Invisible, Durable Composite Resin",
    title2: "Fillings",
    heroDesc: "At Dentcity, we use premium, mercury-free composite resins to restore decayed or chipped teeth. Our tooth-colored fillings blend seamlessly with your natural enamel, providing a strong, aesthetic, and long-lasting solution.",
    section1Title: "Restore Your Teeth Without Compromising Aesthetics",
    section1Text1: "Gone are the days of dark, metallic amalgam fillings. Composite resin fillings are made of a highly advanced mixture of glass and plastic materials that chemically bond to your tooth structure. This not only stops decay but actually reinforces the remaining tooth.",
    section1Text2: "Our dentists use a specialized layering technique and precision shade-matching so that once the filling is placed, it is virtually indistinguishable from your natural tooth.",
    section1Img: imgFilling,
    section2Title: "Why Choose Our Composite Fillings?",
    features: [
      { title: "Shade-Matched Aesthetics", desc: "Custom-blended resin colors that perfectly match the exact shade and translucency of your natural teeth." },
      { title: "Mercury-Free & Safe", desc: "100% biocompatible, metal-free materials that pose no risk of mercury toxicity or allergic reactions." },
      { title: "Minimally Invasive", desc: "Chemical bonding allows us to preserve much more of your natural, healthy tooth structure compared to silver fillings." },
      { title: "Direct Composite Bonding", desc: "A quick and highly effective way to repair minor chips, close gaps, and reshape front teeth in a single visit." },
      { title: "High Wear Resistance", desc: "Engineered with nano-fillers to withstand the daily heavy forces of chewing and grinding." },
      { title: "Instant Curing", desc: "The filling is fully hardened instantly using a specialized blue LED light, allowing you to eat immediately after." }
    ],
    faqs: [
      { question: "Are composite fillings better than silver amalgam?", answer: "Yes, they are mercury-free, look completely natural, and bond directly to the tooth, which requires less removal of healthy tooth structure and strengthens the tooth from within." },
      { question: "How long do tooth-colored fillings last?", answer: "With good oral hygiene, regular brushing, and routine dental check-ups, high-quality composite fillings can last 7 to 10 years, and often much longer." },
      { question: "Can I eat immediately after the filling?", answer: "Absolutely. The resin is instantly cured and fully hardened using a specialized dental light before you even leave the chair." },
      { question: "Do composite fillings stain over time?", answer: "Just like natural enamel, they can pick up slight stains over years from heavy coffee, tea, or smoking. However, routine professional polishing keeps them bright." },
      { question: "Is the filling procedure painful?", answer: "Not at all. We use effective local anesthesia to ensure the tooth is completely numb, so you feel absolutely no pain during the procedure." }
    ],
    whyTrustList: [
      "Premium Nano-Hybrid Resins",
      "Exact Shade Matching Technology",
      "100% Mercury-Free Practice",
      "Painless Injection Techniques",
      "Long-lasting & Durable Bonding"
    ],
    facilitiesText: "Dentcity uses top-tier restorative materials and advanced LED curing lights to ensure your fillings are strong, deeply bonded, and perfectly polished for a natural feel.",
    gallerySections: [
      { title: 'Composite Filling & Bonding Cases', desc: 'View our flawless, invisible restorations that bring teeth back to their natural beauty.', cases: getCasesFromModules(allFillingImages) }
    ]
  },
  "crown-and-bridges": {
    heroBg: imgCrown,
    title1: "Premium Dental Crowns and",
    title2: "Bridges",
    heroDesc: "At Dentcity, we restore the function and aesthetics of your smile using high-quality, metal-free Zirconia and E-max restorations. Whether you need to protect a weakened tooth or replace a missing one, our custom-crafted crowns and bridges offer unmatched durability and a perfectly natural appearance.",
    section1Title: "Seamless Restorations for a Complete Smile",
    section1Text1: "Dental crowns act as protective caps for damaged or root canal-treated teeth, while bridges provide a fixed, permanent solution to replace one or more missing teeth. By using state-of-the-art CAD/CAM technology, we ensure your restorations fit precisely and blend flawlessly with your adjacent teeth.",
    section1Text2: "We specialize in metal-free restorations, which means you never have to worry about dark lines appearing at your gum line. Each restoration is meticulously shade-matched and milled to replicate the natural translucency of real tooth enamel.",
    section1Img: imgCrown,
    section2Title: "Advanced Restorative Solutions",
    features: [
      { title: "Zirconia & E-max Materials", desc: "Highly durable, naturally translucent ceramics that provide superior strength without compromising aesthetics." },
      { title: "Precise CAD/CAM Milling", desc: "Utilizing digital intraoral scanning and computer-aided design for a flawless, micro-precise fit." },
      { title: "Metal-Free Aesthetics", desc: "100% ceramic restorations eliminating the risk of allergic reactions and dark gum line discoloration." },
      { title: "Protection After Root Canal", desc: "Strengthening brittle, root canal-treated teeth to prevent them from fracturing under chewing pressure." },
      { title: "Fixed Tooth Replacement", desc: "Dental bridges offer a highly stable, non-removable alternative to partial dentures for missing teeth." },
      { title: "Lifelike Color Matching", desc: "Custom shade mapping by expert ceramists to perfectly match the unique color and character of your enamel." }
    ],
    faqs: [
      { question: "What is the difference between a crown and a bridge?", answer: "A crown covers and protects a single damaged tooth, whereas a bridge replaces a missing tooth by anchoring to the healthy teeth on either side of the gap." },
      { question: "How long do crowns and bridges last?", answer: "With proper oral hygiene, regular brushing, and routine dental visits, high-quality ceramic crowns and bridges can last 10 to 15 years, or even a lifetime." },
      { question: "Will the crown look natural?", answer: "Yes! We exclusively use premium metal-free ceramics like Zirconia and E-max that reflect light just like natural tooth enamel, ensuring a perfectly lifelike look." },
      { question: "Is getting a crown painful?", answer: "No, the tooth preparation is done under effective local anesthesia, so you will remain completely comfortable and pain-free throughout the procedure." },
      { question: "How do I clean my dental bridge?", answer: "You should brush your bridge just like your natural teeth and use a special floss threader or water flosser to clean underneath the false tooth to keep the gums healthy." }
    ],
    whyTrustList: [
      "In-House Digital Scanning (No messy molds)",
      "Premium Metal-Free Ceramics",
      "Expert Shade Matching",
      "Painless Preparation Techniques",
      "Long-lasting & Precision Fit"
    ],
    facilitiesText: "Dentcity utilizes Primescan digital impressions and advanced CAD/CAM milling to deliver incredibly precise, highly aesthetic crowns and bridges in a fraction of the traditional time.",
    gallerySections: [
      { title: 'Crown & Bridge Restorations', desc: 'Browse our gallery showcasing seamless tooth restorations and replacements using premium ceramics.', cases: getCasesFromModules(allCrownImages) }
    ]
  },
  "oral-surgery": {
    heroBg: imgSurgery,
    title1: "Safe, Precision Oral Surgery &",
    title2: "Wisdom Tooth Removal",
    heroDesc: "At Dentcity, our highly experienced oral and maxillofacial surgeons perform complex extractions, bone grafting, and wisdom tooth removals with absolute precision. We prioritize your comfort and safety, ensuring a painless experience and a smooth recovery.",
    section1Title: "Expert Surgical Care in a State-of-the-Art Environment",
    section1Text1: "Oral surgery may sound intimidating, but at Dentcity, we make it completely stress-free. Whether you need an impacted wisdom tooth removed or advanced bone grafting to prepare for implants, our surgical team utilizes minimally invasive techniques.",
    section1Text2: "Equipped with in-house CBCT 3D scanning, we plan every surgical procedure down to the millimeter. This eliminates guesswork, prevents nerve damage, and drastically reduces your post-operative recovery time.",
    section1Img: imgSurgery,
    section2Title: "Comprehensive Surgical Procedures",
    features: [
      { title: "Painless Tooth Extractions", desc: "Safe, atraumatic removal of severely damaged, decayed, or fractured teeth that cannot be saved." },
      { title: "Impacted Wisdom Tooth Surgery", desc: "Surgical extraction of third molars to provide permanent relief from pain, swelling, and crowding." },
      { title: "Bone Grafting & Sinus Lifts", desc: "Advanced surgical procedures to rebuild jawbone volume and create a solid foundation for dental implants." },
      { title: "Cyst & Pathology Management", desc: "Expert surgical excision and biopsy of oral cysts, tumors, or other abnormal tissues." },
      { title: "Advanced Anesthesia", desc: "Using specialized local anesthesia protocols to ensure you feel absolutely zero pain during surgery." },
      { title: "Rapid Healing Protocols", desc: "Utilizing PRF (Platelet Rich Fibrin) from your own blood to accelerate healing and reduce swelling." }
    ],
    faqs: [
      { question: "Does oral surgery hurt?", answer: "No. We use highly effective local anesthesia to completely numb the surgical area. You may feel a slight pushing or pressure, but you will experience zero sharp pain." },
      { question: "How long does it take to recover from a wisdom tooth extraction?", answer: "Most patients recover within 3 to 5 days. We provide comprehensive aftercare instructions and prescribe appropriate medications to minimize any swelling or discomfort." },
      { question: "What exactly is an impacted wisdom tooth?", answer: "An impacted wisdom tooth is one that doesn't have enough room to emerge normally and gets stuck under the gum line or jawbone, often leading to severe pain, infection, or damage to adjacent teeth." },
      { question: "Why might I need bone grafting?", answer: "Bone grafting is usually required if you have experienced significant bone loss due to prolonged missing teeth or severe gum disease, and you need a strong foundation for future dental implants." },
      { question: "What should I eat after my oral surgery?", answer: "Stick to soft, cool, or lukewarm foods like yogurt, smoothies, ice cream, and mashed potatoes for the first few days. Avoid hot, spicy, hard, or crunchy foods until the surgical site heals." }
    ],
    whyTrustList: [
      "Expert Oral & Maxillofacial Surgeons",
      "In-House 3D CBCT Scanning",
      "Strict Sterilization Protocols",
      "Atraumatic, Pain-Free Techniques",
      "Comprehensive Post-Op Care"
    ],
    facilitiesText: "Dentcity's surgical suites are equipped with state-of-the-art sterilization autoclaves, 3D imaging, and advanced patient monitoring systems to ensure the highest standards of safety during your procedure.",
    gallerySections: [
      { title: 'Surgical Cases & Wisdom Tooth Extractions', desc: 'View our documented surgical cases demonstrating safe extractions and excellent post-operative healing.', cases: getCasesFromModules(allSurgeryImages) }
    ]
  },
  "orthodontics": {
    heroBg: imgOrtho,
    title1: "Advanced Orthodontics &",
    title2: "Clear Aligners",
    heroDesc: "At Dentcity, we straighten teeth and perfect bites using the latest orthodontic technology. From traditional metal and ceramic braces to invisible clear aligners, our specialist orthodontists customize treatments for children, teens, and adults.",
    section1Title: "Achieve a Perfectly Straight, Confident Smile",
    section1Text1: "Orthodontics is about much more than just a beautiful smile—it is about proper function and long-term dental health. Crooked, crowded, or misaligned teeth are harder to clean, which can lead to severe decay, gum disease, and uneven wear over time.",
    section1Text2: "Whether you prefer the proven reliability of traditional braces or the discreet comfort of invisible aligners, our orthodontists use cutting-edge 3D scanning technology to plan your treatment and deliver predictable, stunning results.",
    section1Img: imgOrtho,
    section2Title: "Customized Alignment Solutions",
    features: [
      { title: "Invisible Clear Aligners", desc: "Discreet, removable, and comfortable aligners that straighten your teeth without any metal brackets or wires." },
      { title: "Ceramic Braces", desc: "Tooth-colored brackets that blend in with your natural teeth, offering a far less noticeable look than traditional metal." },
      { title: "Traditional Metal Braces", desc: "Highly robust and effective systems for correcting even the most complex bite and alignment issues." },
      { title: "Early Growth Modification", desc: "Interceptive orthodontic treatments for young children to guide proper jaw growth and prevent future complications." },
      { title: "Digital 3D Treatment Planning", desc: "Using advanced intraoral scanners to map your teeth digitally and allow you to preview your final smile before starting." },
      { title: "Custom Retainers", desc: "High-quality fixed and removable retainers provided post-treatment to ensure your teeth stay perfectly aligned for life." }
    ],
    faqs: [
      { question: "What is the best age to get braces?", answer: "Orthodontic treatment can be successfully completed at any age! However, the American Association of Orthodontists recommends that children have their first evaluation by age 7 to catch potential issues early." },
      { question: "Are clear aligners as effective as traditional braces?", answer: "Yes, for most mild to moderate alignment issues, clear aligners are highly effective, much more comfortable, and nearly invisible. Very complex bite issues may still require traditional braces." },
      { question: "Do braces hurt?", answer: "You may feel some mild soreness or pressure for a few days after the braces are placed or adjusted, but they do not cause sharp or unmanageable pain." },
      { question: "How long does orthodontic treatment usually take?", answer: "The duration depends on the complexity of your case. Minor corrections with aligners can take just 6 months, while comprehensive braces treatment typically lasts between 12 to 24 months." },
      { question: "Do I really need to wear a retainer after treatment?", answer: "Absolutely. Teeth have a natural tendency to shift back to their original positions as you age. Wearing your retainer as prescribed is the only way to protect your investment and keep your smile straight." }
    ],
    whyTrustList: [
      "Specialist Orthodontist on Board",
      "Multiple Treatment Options (Metal, Ceramic, Clear)",
      "No Messy Molds – 100% Digital Impressions",
      "Transparent Pricing & Flexible Payment Plans",
      "Focus on Both Aesthetics and Functional Bite"
    ],
    facilitiesText: "Dentcity's orthodontic suite is fully digitized. We use precise Primescan 3D scanners instead of traditional gooey impressions, making your treatment planning incredibly fast, accurate, and comfortable.",
    gallerySections: [
      { title: 'Orthodontic & Aligner Transformations', desc: 'See the incredible smile transformations achieved through our customized orthodontic treatments.', cases: getCasesFromModules(allOrthoImages) }
    ]
  }
};

const CasesGallerySection = ({ gallerySections }: { gallerySections: GallerySection[] }) => {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
    caseName: string;
  }>({
    isOpen: false,
    images: [],
    index: 0,
    caseName: "",
  });

  const openLightbox = (images: string[], index: number, caseName: string) => {
    setLightbox({
      isOpen: true,
      images,
      index,
      caseName,
    });
  };

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox(prev => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const renderGallery = (title: string, desc: string, cases: [string, string[]][]) => {
    if (cases.length === 0) return null;
    return (
      <div key={title} className="bg-white border border-border p-6 md:p-10 rounded-3xl shadow-sm mb-12">
        <div className="mb-8">
          <h3 className="text-2xl font-display font-bold text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground">{desc}</p>
        </div>
        
        <div className="space-y-12">
          {cases.map(([caseName, images]) => (
            <div key={caseName} className="relative">
              <h4 className="text-lg font-bold capitalize mb-5 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#54391E]" />
                {caseName}
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openLightbox(images, idx, caseName)}
                    className="flex flex-col rounded-xl overflow-hidden shadow-sm border border-border/60 bg-white group hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative bg-muted/20">
                      <img 
                        src={img} 
                        alt={`${caseName} photo ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        loading="lazy" 
                      />
                      {/* Zoom Indicator */}
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white flex-1 flex flex-col justify-center border-t border-border/30">
                      <span className="text-[#D4A373] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block">
                        {caseName === "featured clinical cases" ? "Clinical Case" : `Phase ${idx + 1} of ${images.length}`}
                      </span>
                      <h5 className="text-foreground font-bold text-xs md:text-sm leading-snug">
                        {caseName === "featured clinical cases" ? "Featured Outcome" : getProcessName(idx, images.length)}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (gallerySections.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Our Success Stories</h2>
      <p className="text-muted-foreground leading-relaxed mb-10 text-lg max-w-3xl">
        Explore our documented cases showcasing successful transformations.
      </p>

      {gallerySections.map((section) => renderGallery(section.title, section.desc, section.cases))}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6"
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content Container */}
            <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              
              {/* Previous Button */}
              {lightbox.images.length > 1 && (
                <button 
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 z-40 p-3 rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/10 transition-all hover:scale-105"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Active Image */}
              <AnimatePresence mode="wait">
                <motion.img 
                  key={lightbox.index}
                  src={lightbox.images[lightbox.index]}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
              </AnimatePresence>

              {/* Next Button */}
              {lightbox.images.length > 1 && (
                <button 
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 z-40 p-3 rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/10 transition-all hover:scale-105"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Details Panel */}
            <div className="mt-6 text-center max-w-lg px-4" onClick={(e) => e.stopPropagation()}>
              <span className="text-[#D4A373] text-xs font-bold tracking-[0.2em] uppercase mb-1 block">
                {lightbox.caseName === "featured clinical cases" ? "Clinical Case" : `Phase ${lightbox.index + 1} of ${lightbox.images.length}`}
              </span>
              <h4 className="text-white font-display text-lg md:text-xl font-bold mb-2">
                {lightbox.caseName === "featured clinical cases" ? "Featured Outcome" : getProcessName(lightbox.index, lightbox.images.length)}
              </h4>
              {lightbox.images.length > 1 && (
                <p className="text-white/40 text-xs">
                  Use arrows or tap side buttons to navigate ({lightbox.index + 1} / {lightbox.images.length})
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const service = id ? servicesData[id] : null;

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-display font-bold mb-4">Service Details Coming Soon</h1>
        <p className="text-muted-foreground mb-8">Detailed information for this service is currently being updated.</p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center bg-black/90 overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 opacity-40">
          <img src={service.heroBg} alt={service.title1} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        
        <div className="container relative z-10 px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors mb-6 backdrop-blur-sm border border-white/10"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <div className="inline-flex items-center gap-3 mb-6 mt-2">
              <span className="w-8 h-[2px] bg-[#D4A373]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D4A373]">Dentcity Speciality</span>
              <span className="w-8 h-[2px] bg-[#D4A373]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-6">
              {service.title1} <span className="text-[#D4A373]">{service.title2}</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              {service.heroDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg,#54391E,#825B34)" }}>
                Book Consultation <Calendar className="w-4 h-4" />
              </a>
              <a href="tel:+919898989898" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white border border-white/20 hover:bg-white/10 transition-all hover:scale-105">
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-muted/30 flex-1">
        <div className="container px-4 md:px-8">
          <div className="w-full">
            
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 grid md:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">{service.section1Title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
                    {service.section1Text1}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {service.section1Text2}
                  </p>
                </div>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-border group">
                  <img src={service.section1Img} alt={service.section1Title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">{service.section2Title}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.features.map((item, i) => (
                    <div key={i} className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-[#54391E]/10 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-5 h-5 text-[#54391E]" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <CasesGallerySection gallerySections={service.gallerySections} />

              {/* FAQs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-xl overflow-hidden transition-colors ${openFaq === index ? 'border-[#54391E] bg-white' : 'border-border bg-card'}`}
                    >
                      <button 
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180 text-[#54391E]' : 'text-muted-foreground'}`} />
                      </button>
                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 pt-1 text-muted-foreground leading-relaxed border-t border-border/50">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom Info Boxes */}
            <div className="grid md:grid-cols-2 gap-8 mt-16 pb-12">
              <div className="bg-[#1A1A1A] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A373]/10 rounded-full blur-3xl" />
                <h3 className="font-display text-2xl font-bold mb-6 relative z-10">Why Trust Dentcity?</h3>
                <ul className="space-y-5 relative z-10">
                  {service.whyTrustList.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D4A373] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80 text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm text-center flex flex-col justify-center h-full">
                <h3 className="font-display text-2xl font-bold mb-4">Our Advanced Facilities</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-1">
                  {service.facilitiesText}
                </p>
                <a href="#contact" className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl font-bold text-base bg-black text-white hover:bg-black/80 transition-colors">
                  Contact Us Today
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
