import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">
              DENT<span className="opacity-60">CITY</span>
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Superspeciality Dental & Implant Centre delivering advanced dental care
              with precision, comfort, and a commitment to your perfect smile.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Gallery", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={item === "Home" ? "/#home" : `/#${item.toLowerCase()}`}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        const hash = item === "Home" ? "home" : item.toLowerCase();
                        const el = document.getElementById(hash);
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState(null, "", `/#${hash}`);
                        }
                      }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                { label: "Dental Implants", slug: "dental-implants" },
                { label: "Smile Makeover", slug: "smile-makeover" },
                { label: "Invisible Aligners", slug: "invisible-aligners" },
                { label: "Crowns And Bridges", slug: "crowns-and-bridges" },
                { label: "Pediatric Dentistry", slug: "pediatric-dentistry" },
                { label: "Root Canal Treatment", slug: "root-canal-treatment" },
              ].map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                Kishorsinhji main road, near Keshariya Vadi, Karanpara, Rajkot, Gujarat 360001
              </li>
              <li>
                <a
                  href="tel:+919825078955"
                  className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +91 98250 78955
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919825078955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs opacity-50">
            © {new Date().getFullYear()} DENTCITY Superspeciality Dental & Implant Centre. All rights reserved.
          </p>
          <p className="text-xs opacity-50">
            Developed by <span className="opacity-100 font-semibold">SR Infotech</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
