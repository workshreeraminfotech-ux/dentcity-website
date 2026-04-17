import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToothIcon = ({
  className,
  strokeWidth = "1.5",
}: {
  className?: string;
  strokeWidth?: string;
}) => (
  // A beautiful, symmetric tooth SVG path
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20.5c-1.5 0-2-.5-2-1.5v-3c0-1-.5-1.5-1.5-1.5s-1.5.5-1.5 1.5v3c0 1-.5 1.5-2 1.5S3 20 3 19c0-3 1-8 1-10 0-4 3-7 8-7s8 3 8 7c0 2 1 7 1 10 0 1-.5 1.5-2 1.5s-2-.5-2-1.5v-3c0-1-.5-1.5-1.5-1.5s-1.5.5-1.5 1.5v3c0 1-.5 1.5-2 1.5z" />
  </svg>
);

const SplashLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 4.5 seconds total runtime: 4s fill animation + 0.5s linger
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          {/* Subtle Background Glows */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a73e8]/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1a73e8]/15 rounded-full blur-3xl"
          ></motion.div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-10"
            >
              <span className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground select-none">
                DENT<span className="text-muted-foreground">CITY</span>
              </span>
            </motion.div>

            {/* Tooth Fill Animation */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-2">
              {/* Outline (Empty tooth) */}
              <ToothIcon
                strokeWidth="1.5"
                className="absolute inset-0 w-full h-full text-muted stroke-current fill-none"
              />

              {/* Filled Inside (Liquid fill effect over 4 seconds) */}
              <motion.div
                className="absolute inset-0 w-full h-full text-primary"
                initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 4, ease: "linear" }}
              >
                <ToothIcon
                  strokeWidth="0"
                  className="w-full h-full fill-current"
                  style={{ color: "#1a73e8" }}
                />
              </motion.div>

              {/* Filled Stroke (to make the border solid blue along with the fill) */}
              <motion.div
                className="absolute inset-0 w-full h-full text-primary"
                initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                transition={{ duration: 4, ease: "linear" }}
              >
                <ToothIcon
                  strokeWidth="1.5"
                  className="w-full h-full stroke-current fill-none"
                  style={{ color: "#0d47a1" }}
                />
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-8 text-sm font-semibold tracking-widest uppercase text-[#1a73e8]"
            >
              Preparing your smile...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
