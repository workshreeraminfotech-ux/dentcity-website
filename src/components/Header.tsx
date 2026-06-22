import { useState, useEffect } from "react";
import dentcityLogo from "@/assets/dentcity logo.png";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/#home" },
  {
    label: "About",
    path: "/#about",
    subLinks: [
      { label: "Dentcity Implant Center", path: "/#implant" },
      { label: "Dr. Rathin Bhindi", path: "/#dr-rathin" }
    ]
  },
  {
    label: "Services",
    path: "/#services",
    subLinks: [
      { label: "Dental Implant", path: "/#services" },
      { label: "General Dentistry", path: "/#general-dentistry" }
    ]
  },
  { label: "Gallery", path: "/#gallery" },
  { label: "Contact", path: "/#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    if (path.startsWith("/#")) {
      // Special case: General Dentistry → scroll to services + expand all
      if (path === "/#general-dentistry") {
        e.preventDefault();
        const servicesEl = document.getElementById("services");
        if (servicesEl) {
          servicesEl.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", path);
          window.dispatchEvent(new CustomEvent("show-all-services"));
        } else {
          // Cross-page navigation
          window.location.href = path;
        }
        return;
      }

      const hash = path.substring(2);
      const element = document.getElementById(hash);
      if (element) {
        // We're on the home page — smooth scroll in place
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", path);
      } else {
        // We're on a different page — navigate to home with hash; browser will jump there
        e.preventDefault();
        window.location.href = path;
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const homeEl = document.getElementById("home");
    if (homeEl) {
      e.preventDefault();
      homeEl.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#home");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className={`bg-[#54391E] text-white px-4 transition-all duration-300 ease-in-out ${scrolled ? 'max-h-0 py-0 opacity-0 overflow-hidden pointer-events-none' : 'max-h-[80px] py-1.5 opacity-100'}`}>
        <div className="container mx-auto flex items-center justify-between gap-x-6 gap-y-0 flex-wrap">

          {/* Address — hidden on mobile */}
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] opacity-90 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Kishorsinhji Main Rd, near Keshariya Vadi, Karanpara, Rajkot 360001</span>
          </span>

          {/* Right group: timing + phone — responsive layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-x-4 gap-y-1 w-full sm:w-auto sm:ml-auto text-[10.5px] sm:text-[11px] text-center sm:text-right">
            <span className="flex items-center gap-1.5 opacity-90 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm.5 11H11V7h1.5v4.79l3.08 1.85-.75 1.25-2.33-1.4V13z"/>
              </svg>
              <span>Mon–Sat: 10 AM – 8 PM &nbsp;|&nbsp; Sun: By Appt</span>
            </span>
            <a href="tel:+917990416940" className="flex items-center gap-1.5 font-semibold hover:opacity-80 transition-opacity flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.61 21 3 14.39 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z"/>
              </svg>
              +91 79904 16940
            </a>
          </div>

        </div>
      </div>

      {/* Navbar */}
      <div className="bg-[#F2F4F3]/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-[70px] md:h-[76px] px-4 relative">
        {/* Logo */}
        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 py-2 z-10">
          <img src={dentcityLogo} alt="Dentcity Logo" className="h-[45px] md:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Nav — absolutely centered */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group">
              <a
                href={link.path}
                onClick={(e) => link.subLinks ? e.preventDefault() : handleNavClick(e, link.path)}
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:text-foreground py-6 ${
                  location.hash === link.path.substring(1) || (location.pathname === '/' && location.hash === '' && link.path === '/#home')
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
                {link.subLinks && <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform" />}
              </a>

              {link.subLinks && (
                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0">
                  <div className="flex flex-col bg-[#F2F4F3]/95 backdrop-blur-md border border-border rounded-xl shadow-lg overflow-hidden min-w-[200px] p-2 mt-[-10px]">
                    {link.subLinks.map((subLink, idx) => (
                      <a
                        key={idx}
                        href={subLink.path}
                        onClick={(e) => handleNavClick(e, subLink.path)}
                        className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                      >
                        {subLink.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Book Appointment CTA */}
        <a
          href="/#contact"
          onClick={(e) => handleNavClick(e, "/#contact")}
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full bg-[#54391E] text-white hover:bg-[#3d2a15] transition-all duration-300 shadow-sm hover:shadow-md z-10"
        >
          Book Appointment
        </a>

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
            className="lg:hidden bg-[#F2F4F3]/95 backdrop-blur-md border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <div key={link.path} className="flex flex-col">
                  <a
                    href={link.path}
                    onClick={(e) => {
                      if (link.subLinks) {
                        e.preventDefault();
                        setExpandedMenu(expandedMenu === link.path ? null : link.path);
                      } else {
                        handleNavClick(e, link.path);
                        setMobileOpen(false);
                        setExpandedMenu(null);
                      }
                    }}
                    className={`flex items-center justify-between text-sm font-medium py-3 px-4 rounded-lg transition-colors ${
                      (location.hash === link.path.substring(1) && !link.subLinks) || (location.pathname === '/' && location.hash === '' && link.path === '/#home')
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {link.label}
                    {link.subLinks && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMenu === link.path ? "rotate-180" : ""}`} />
                    )}
                  </a>
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
                            <a
                              key={idx}
                              href={sub.path}
                              onClick={(e) => {
                                handleNavClick(e, sub.path);
                                setMobileOpen(false);
                                setExpandedMenu(null);
                              }}
                              className="text-sm py-2 px-4 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      </div>{/* end navbar wrapper */}
    </header>
  );
};

export default Header;
