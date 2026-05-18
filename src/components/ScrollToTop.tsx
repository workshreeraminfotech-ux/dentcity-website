import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // If navigating back/forward, let the browser natively restore the scroll position
    if (navigationType === "POP") {
      return;
    }

    if (hash) {
      const id = hash.replace("#", "");
      // Create a small delay to ensure the page has completely rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }
    
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
}
