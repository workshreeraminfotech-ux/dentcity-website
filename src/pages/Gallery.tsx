import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import reception from "@/assets/gallery/reception.webp";
import reception2 from "@/assets/gallery/reception2.webp";
import treatmentRoom from "@/assets/gallery/treatment-room.webp";
import doctorCabin from "@/assets/gallery/doctor-cabin.webp";
import equipment1 from "@/assets/gallery/equipment1.webp";
import equipment2 from "@/assets/gallery/equipment2.webp";
import building from "@/assets/gallery/building.webp";
import lobby from "@/assets/gallery/lobby.webp";
import equipment3 from "@/assets/gallery/equipment3.webp";
import frontView from "@/assets/gallery/front-view.webp";
import childrenRoom from "@/assets/gallery/children-room.webp";
import checkupRoom from "@/assets/gallery/checkup-room.webp";
import reception3 from "@/assets/gallery/reception3.webp";
import dr1 from "@/assets/gallery/dr1.webp";
import dr2 from "@/assets/gallery/dr2.webp";
import dr3 from "@/assets/gallery/dr3.webp";
import dr4 from "@/assets/gallery/dr4.webp";
import dr5 from "@/assets/gallery/dr5.webp";
import dr6 from "@/assets/gallery/dr6.webp";
import dr7 from "@/assets/gallery/dr7.webp";
import dr8 from "@/assets/gallery/dr8.webp";
import dr9 from "@/assets/gallery/dr9.webp";
import dr10 from "@/assets/gallery/dr10.webp";
import dr10b from "@/assets/gallery/dr10b.webp";
import dr11 from "@/assets/gallery/dr11.webp";
import dr12 from "@/assets/gallery/dr12.webp";
import dr13 from "@/assets/gallery/dr13.webp";
import dr14 from "@/assets/gallery/dr14.webp";
import dr15 from "@/assets/gallery/dr15.webp";
import dr16 from "@/assets/gallery/dr16.webp";
import dr18 from "@/assets/gallery/dr18.webp";
import dr19 from "@/assets/gallery/dr19.webp";
import dr20 from "@/assets/gallery/dr20.webp";
import dr21 from "@/assets/gallery/dr21.webp";
import dr22 from "@/assets/gallery/dr22.webp";

const clinicImages = [
  { src: frontView, alt: "DENTCITY Front View" },
  { src: building, alt: "Clinic Building" },
  { src: lobby, alt: "Clinic Lobby" },
  { src: reception, alt: "Reception Area" },
  { src: reception2, alt: "Waiting Lounge" },
  { src: doctorCabin, alt: "Doctor's Cabin" },
  { src: treatmentRoom, alt: "Treatment Room" },
  { src: equipment1, alt: "Digital X-Ray Machine" },
  { src: equipment2, alt: "Advanced Dental Instruments" },
  { src: equipment3, alt: "Sterilization & Equipment" },
  { src: childrenRoom, alt: "Pediatric Dental Room" },
  { src: checkupRoom, alt: "Checkup Room" },
  { src: reception3, alt: "Reception & Lounge" },
];

const achievementImages = [
  { src: dr10, alt: "Famdent Excellence in Dentistry Award 2025" },
  { src: dr14, alt: "Famdent Excellence Awards Ceremony" },
  { src: dr6, alt: "10 Under 10 Dentist of the Year Award" },
  { src: dr19, alt: "Receiving Winner Certificate" },
  { src: dr5, alt: "PG Diploma — International Implant Foundation" },
  { src: dr13, alt: "IDA Convocation Ceremony" },
  { src: dr18, alt: "Simpladent Implant Foundation Certificate" },
  { src: dr4, alt: "Certificate of Excellence" },
  { src: dr15, alt: "Implant Training Certification" },
  { src: dr16, alt: "DIDIIRC Certificate of Completion" },
  { src: dr1, alt: "International Implant Foundation Conference" },
  { src: dr11, alt: "APJ Abdul Kalam Research Centre Training" },
  { src: dr12, alt: "APJ Abdul Kalam Education Centre Team" },
  { src: dr9, alt: "With Happy Patient After Surgery" },
  { src: dr10b, alt: "With Distinguished Guest" },
  { src: dr8, alt: "Clinic Inauguration Ceremony" },
  { src: dr20, alt: "Inauguration with VIP Guests" },
  { src: dr7, alt: "Inauguration with Dignitaries" },
  { src: dr3, alt: "Inauguration — Guest Welcome" },
  { src: dr2, alt: "Grand Opening Celebration" },
  { src: dr21, alt: "Felicitation at Clinic Opening" },
  { src: dr22, alt: "Inauguration with Guests" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null);

  const renderGrid = (images: { src: string; alt: string }[]) => {
    if (images.length === 0) {
      return (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">Coming soon...</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.1 }}
            className="cursor-pointer rounded-2xl overflow-hidden group"
            onClick={() => setSelected(img)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">Gallery</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
              Our Clinic & Facilities
            </h1>
            <p className="mt-4 text-muted-foreground">
              Take a virtual tour of our state-of-the-art dental clinic.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <Tabs defaultValue="clinic" className="w-full">
            <TabsList className="mx-auto mb-8 flex w-fit">
              <TabsTrigger value="clinic" className="px-6">Clinic & Facilities</TabsTrigger>
              <TabsTrigger value="achievements" className="px-6">Doctor Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="clinic">{renderGrid(clinicImages)}</TabsContent>
            <TabsContent value="achievements">{renderGrid(achievementImages)}</TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selected.src}
              alt={selected.alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
