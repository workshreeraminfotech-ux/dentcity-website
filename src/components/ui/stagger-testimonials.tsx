"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

// Google Maps review link for Dentcity
const GOOGLE_REVIEW_URL = "https://g.page/r/dentcity/review";

const testimonials = [
  {
    tempId: 0,
    testimonial: "I believe Dr. Bhindi is one of the best Dentist in Rajkot. His educational qualifications combined with practical experience gives us very smooth treatments. Best thing about him is that he likes to retain original teeth and just removes minimal parts. Highly recommend!",
    by: "Jay Exports",
    rating: 5,
    imgSrc: "https://ui-avatars.com/api/?name=Jay+Exports&background=0D8ABC&color=fff&size=100"
  },
  {
    tempId: 1,
    testimonial: "I had 4 lower implants and 2 upper bridges in 2022/2023. Dr Rathin carried out all the work professionally and with courtesy at every stage. I was kept informed at every stage. I highly recommend this surgery for any dental related issues.",
    by: "Naren Surani",
    rating: 5,
    imgSrc: "https://ui-avatars.com/api/?name=Naren+Surani&background=1A7A4A&color=fff&size=100"
  },
  {
    tempId: 2,
    testimonial: "Dentcity is one of the best Dental clinics I have ever visited for treatment. The setup is World class. Dr. Rathin Bhindi is highly qualified and well experienced. Painless and best treatment is his craft. His entire team is also very compatible.",
    by: "Dr. Bhooshan Jikar",
    rating: 5,
    imgSrc: "https://ui-avatars.com/api/?name=Bhooshan+Jikar&background=7B3FA0&color=fff&size=100"
  },
  {
    tempId: 3,
    testimonial: "I have always had a great, smooth experience at Dentcity. Dr. Rathin Bhindi and his staff is respectful, friendly, caring, and courteous of your time. It runs very smoothly and efficiently. Would definitely recommend their services to anyone.",
    by: "Dhruv Sejpal",
    rating: 5,
    imgSrc: "https://ui-avatars.com/api/?name=Dhruv+Sejpal&background=C0392B&color=fff&size=100"
  },
  {
    tempId: 4,
    testimonial: "Excellent experience with Dr. Rathin Bhindi. Very professional, gentle, and caring. The clinic is clean and well-equipped. Highly recommended for all dental needs!",
    by: "Nishil Joshi",
    rating: 5,
    imgSrc: "https://ui-avatars.com/api/?name=Nishil+Joshi&background=E67E22&color=fff&size=100"
  },
  {
    tempId: 5,
    testimonial: "Dr Rathin Bhindi's Dentcity clinic is one of the best for dental treatment. Doctor is so generous and expert, staff is polite and cooperative, ambiance is also very nice.",
    by: "Pratik Katariya",
    rating: 5,
    imgSrc: "https://ui-avatars.com/api/?name=Pratik+Katariya&background=2C3E7A&color=fff&size=100"
  },
  {
    tempId: 6,
    testimonial: "Came all the way from Kerala for dental implant for my dad. Really liked the ambiance and Dr Rathin explained every single procedure in detail and made us so comfortable. Definitely recommend for any dental treatment. Thank you Dr Rathin.",
    by: "Pavan Surve",
    rating: 5,
    imgSrc: "https://ui-avatars.com/api/?name=Pavan+Surve&background=16A085&color=fff&size=100"
  },
  {
    tempId: 7,
    testimonial: "A young & energetic doctor having enthusiasm to be updated with latest technology and knowledge. Everyone must get at least his opinion regarding one's dental problem. Wishing him a glittering achievement.",
    by: "Kiritbhai Mavani",
    rating: 5,
    imgSrc: "https://ui-avatars.com/api/?name=Kiritbhai+Mavani&background=8E44AD&color=fff&size=100"
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by}`}
        className="mb-3 h-12 w-12 rounded-full bg-muted object-cover"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      {/* Star rating */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className={cn("w-3.5 h-3.5 fill-current", isCenter ? "text-yellow-300" : "text-yellow-500")}
          />
        ))}
      </div>
      <h3 className={cn(
        "text-sm sm:text-base font-medium leading-snug line-clamp-5",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm font-semibold",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [containerHeight, setContainerHeight] = useState(600);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
      setContainerHeight(matches ? 600 : 460);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Auto-scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      handleMove(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonialsList]);

  return (
    <div>
      <div
        className="relative w-full overflow-hidden bg-transparent mt-4"
        style={{ height: containerHeight }}
      >
        {testimonialsList.map((testimonial, index) => {
          const position = testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
          <button
            onClick={() => handleMove(-1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
              "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => handleMove(1)}
            className={cn(
              "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
              "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Google Review CTA */}
      <div className="flex flex-col items-center gap-3 mt-6">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground font-medium">5.0 — Google Reviews</span>
        </div>
        <a
          href="https://www.google.com/maps/place/DENTCITY+Superspeciality+Dental+%26+Implant+Centre+-+Dr.+Rathin+Bhindi/@22.2906396,70.8020582,17z/data=!4m8!3m7!1s0x3959cbcaffbf36cd:0xc9abe557cf2e1a96!8m2!3d22.2906396!4d70.8046331!9m1!1b1!16s%2Fg%2F11fr6p8200?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all text-sm font-semibold text-gray-700 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Write a Review on Google
        </a>
      </div>
    </div>
  );
};

