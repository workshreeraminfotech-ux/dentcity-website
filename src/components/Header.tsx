import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    subLinks: [
      { label: "Dentcity Implant Center", path: "/about#implant" },
      { label: "Dr. Rathin Bhindi", path: "/about#dr-rathin" }
    ]
  },
  {
    label: "Services",
    path: "/services",
    subLinks: [
      { label: "Dental Implant", path: "/services#dental-implant" },
      { label: "General Dentistry", path: "/services#general-dentistry" }
    ]
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground">
            DENT<span className="text-muted-foreground">CITY</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group">
              <Link
                to={link.path}
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-foreground py-6 ${location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                  }`}
              >
                {link.label}
                {link.subLinks && <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform" />}
              </Link>

              {link.subLinks && (
                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <div className="flex flex-col bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-lg overflow-hidden min-w-[200px] p-2 mt-[-10px]">
                    {link.subLinks.map((subLink, idx) => (
                      <Link
                        key={idx}
                        to={subLink.path}
                        className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+919825078955"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-border text-foreground hover:bg-accent transition-colors"
          >
            <Phone className="w-4 h-4" />
            +91 98250 78955
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => {
            if (mobileOpen) setExpandedMenu(null);
            setMobileOpen(!mobileOpen);
          }}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <div key={link.path} className="flex flex-col">
                  <Link
                    to={link.path}
                    onClick={(e) => {
                      if (link.subLinks) {
                        e.preventDefault();
                        setExpandedMenu(expandedMenu === link.path ? null : link.path);
                      } else {
                        setMobileOpen(false);
                        setExpandedMenu(null);
                      }
                    }}
                    className={`flex items-center justify-between text-sm font-medium py-3 px-4 rounded-lg transition-colors ${location.pathname === link.path && !link.subLinks
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                  >
                    {link.label}
                    {link.subLinks && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMenu === link.path ? "rotate-180" : ""}`} />
                    )}
                  </Link>
                  <AnimatePresence>
                    {link.subLinks && expandedMenu === link.path && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 flex flex-col gap-1 mt-1 mb-2 border-l border-border/40 ml-4">
                          {link.subLinks.map((sub, idx) => (
                            <Link
                              key={idx}
                              to={sub.path}
                              onClick={() => {
                                setMobileOpen(false);
                                setExpandedMenu(null);
                              }}
                              className="text-sm py-2 px-4 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-border/50">
                <a
                  href="tel:+919825078955"
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl border border-border text-foreground hover:bg-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 98250 78955
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
