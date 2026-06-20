import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { WhatsAppIcon } from "./WhatsAppIcon";

const ConsultationPopup = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "General Consultation",
    message: "",
  });

  useEffect(() => {
    // Only run this logic on the home page and if it hasn't triggered yet
    if (pathname !== "/" || hasTriggered) {
      return;
    }

    let timer: NodeJS.Timeout;

    const checkLoader = () => {
      const loaderExists = document.getElementById("initial-loader");
      if (loaderExists) {
        // Loader is still present, check again in 200ms
        timer = setTimeout(checkLoader, 200);
      } else {
        // Loader is gone! Wait exactly 4 seconds and then show the popup
        timer = setTimeout(() => {
          setIsOpen(true);
          setHasTriggered(true);
        }, 4000);
      }
    };

    checkLoader();

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format message for WhatsApp
    const text = `Hello Dentcity,\n\nI would like to request a Consultation.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Concern/Service:* ${formData.service}${
      formData.message ? `\n*Message:* ${formData.message}` : ""
    }`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917990416940?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Close popup
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop with fade-in animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal container with bounce-spring entry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl z-[1010] border border-gray-100"
          >
            {/* Elegant Header Banner */}
            <div 
              className="relative p-6 text-white text-center" 
              style={{ background: "linear-gradient(135deg, #54391E 0%, #825B34 100%)" }}
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-200"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mx-auto w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="font-display font-extrabold text-xl sm:text-2xl leading-tight tracking-wide">
                Free Consultation
              </h3>
              
              <p className="text-white/80 text-xs sm:text-sm mt-1.5 max-w-xs mx-auto">
                Fill in your details to chat directly with our expert doctor on WhatsApp.
              </p>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="space-y-1.5">
                <Label htmlFor="popup-name" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Full Name
                </Label>
                <Input
                  id="popup-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="rounded-xl border-gray-200 focus:border-[#54391E]/30 focus:ring-[#54391E]/10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="popup-phone" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Phone Number
                </Label>
                <Input
                  id="popup-phone"
                  name="phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="rounded-xl border-gray-200 focus:border-[#54391E]/30 focus:ring-[#54391E]/10"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="popup-service" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select Concern / Service
                </Label>
                <Select onValueChange={handleSelectChange} defaultValue={formData.service}>
                  <SelectTrigger id="popup-service" className="rounded-xl border-gray-200 focus:border-[#54391E]/30 focus:ring-[#54391E]/10">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent className="z-[1020]">
                    <SelectItem value="General Consultation">General Consultation</SelectItem>
                    <SelectItem value="Dental Implants">Dental Implants</SelectItem>
                    <SelectItem value="Full Mouth Rehabilitation">Full Mouth Rehabilitation</SelectItem>
                    <SelectItem value="Smile Designing">Smile Designing</SelectItem>
                    <SelectItem value="Root Canal Treatment">Root Canal Treatment</SelectItem>
                    <SelectItem value="Orthodontics (Braces/Aligners)">Orthodontics (Braces/Aligners)</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="popup-message" className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Brief Message (Optional)
                </Label>
                <Textarea
                  id="popup-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your dental concern..."
                  className="min-h-[70px] rounded-xl border-gray-200 focus:border-[#54391E]/30 focus:ring-[#54391E]/10 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-sm font-bold text-white rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all border-0 shadow-lg hover:shadow-xl mt-2"
                style={{ background: "linear-gradient(135deg, #128C7E 0%, #075E54 100%)" }}
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                Start Chat on WhatsApp
              </Button>

              <div className="text-center text-[10px] text-gray-400 leading-normal">
                By submitting this form, you will be redirected to WhatsApp to share your details.
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationPopup;
