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
import pic1 from "@/assets/gallery/achievements/Picture1.jpg";
import pic2 from "@/assets/gallery/achievements/Picture2.jpg";
import pic4 from "@/assets/gallery/achievements/Picture4.jpg";
import pic6 from "@/assets/gallery/achievements/Picture6.jpg";
import pic12 from "@/assets/gallery/achievements/Picture12.jpg";
import pic13 from "@/assets/gallery/achievements/Picture13.jpg";
import pic16 from "@/assets/gallery/achievements/Picture16.jpg";
import pic22 from "@/assets/gallery/achievements/Picture22.jpg";
import pic24 from "@/assets/gallery/achievements/Picture24.jpg";
import pic26 from "@/assets/gallery/achievements/Picture26.jpg";
import pic27 from "@/assets/gallery/achievements/Picture27.jpg";
import pic30 from "@/assets/gallery/achievements/Picture30.jpg";
import pic32 from "@/assets/gallery/achievements/Picture32.jpg";
import pic34 from "@/assets/gallery/achievements/Picture34.jpg";
import pic35 from "@/assets/gallery/achievements/Picture35.jpg";
import pic36 from "@/assets/gallery/achievements/Picture36.jpg";
import pic38 from "@/assets/gallery/achievements/Picture38.jpg";
import pic39 from "@/assets/gallery/achievements/Picture39.jpg";
import pic41 from "@/assets/gallery/achievements/Picture41.jpg";
import pic42 from "@/assets/gallery/achievements/Picture42.jpg";
import pic43 from "@/assets/gallery/achievements/Picture43.jpg";
import pic44 from "@/assets/gallery/achievements/Picture44.jpg";
import pic45 from "@/assets/gallery/achievements/Picture45.jpg";
import pic46 from "@/assets/gallery/achievements/Picture46.jpg";
import pic47 from "@/assets/gallery/achievements/Picture47.jpg";
import pic48 from "@/assets/gallery/achievements/Picture48.jpg";
import pic49 from "@/assets/gallery/achievements/Picture49.jpg";

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
  { src: pic1,  alt: "Dr. Rathin Bhindi — Achievement" },
  { src: pic2,  alt: "Certificate of Excellence" },
  { src: pic4,  alt: "Award Ceremony" },
  { src: pic6,  alt: "Recognition Award" },
  { src: pic12, alt: "International Certification" },
  { src: pic13, alt: "Diploma Award" },
  { src: pic16, alt: "Conference Achievement" },
  { src: pic22, alt: "Certificate Presentation" },
  { src: pic24, alt: "Achievement Felicitation" },
  { src: pic26, alt: "Award Presentation" },
  { src: pic27, alt: "Excellence Award" },
  { src: pic30, alt: "Distinguished Achievement" },
  { src: pic32, alt: "Certification Ceremony" },
  { src: pic34, alt: "Dental Excellence Award" },
  { src: pic35, alt: "International Implant Foundation" },
  { src: pic36, alt: "Felicitation Ceremony" },
  { src: pic38, alt: "Award — Dr. Rathin Bhindi" },
  { src: pic39, alt: "Recognition Ceremony" },
  { src: pic41, alt: "Achievement Recognition" },
  { src: pic42, alt: "Certificate of Achievement" },
  { src: pic43, alt: "Conference Recognition" },
  { src: pic44, alt: "Award Felicitation" },
  { src: pic45, alt: "Dental Implant Foundation" },
  { src: pic46, alt: "Recognition Award Ceremony" },
  { src: pic47, alt: "Distinguished Dentist Award" },
  { src: pic48, alt: "Achievement Diploma" },
  { src: pic49, alt: "Excellence in Dentistry" },
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
