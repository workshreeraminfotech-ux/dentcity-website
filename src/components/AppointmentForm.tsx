import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    service: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formatting the message for WhatsApp
    const text = `Hello Dr.,\n\nI would like to request an appointment.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Preferred Date:* ${formData.date}\n*Service:* ${formData.service}\n*Message:* ${formData.message}`;

    // Encode for URL
    const encodedText = encodeURIComponent(text);

    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/919825078955?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" required type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Preferred Date</Label>
          <Input id="date" name="date" required type="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label>Service Needed</Label>
          <Select onValueChange={handleSelectChange} value={formData.service} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Consultation">General Consultation</SelectItem>
              <SelectItem value="Dental Implants">Dental Implants</SelectItem>
              <SelectItem value="Orthodontics">Orthodontics (Braces/Aligners)</SelectItem>
              <SelectItem value="Cosmetic Dentistry">Cosmetic Dentistry</SelectItem>
              <SelectItem value="Restorative Dentistry">Restorative Dentistry</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Message</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Please describe any specific issues or questions..." className="min-h-[100px]" />
      </div>

      <Button type="submit" className="w-full h-12 text-base font-medium">
        Request via WhatsApp
      </Button>
    </form>
  );
};

export default AppointmentForm;
