import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 4.5 seconds to make sure everything loads properly
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
              className="flex items-center justify-center gap-2 mb-8"
            >
              <span className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground select-none">
                DENT<span className="text-muted-foreground">CITY</span>
              </span>
            </motion.div>

            {/* Custom Spinner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative w-16 h-16"
            >
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
              {/* Inner animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute inset-0 border-4 border-transparent border-t-[#1a73e8] border-r-[#1a73e8] rounded-full"
              ></motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-6 text-sm font-medium tracking-widest uppercase text-muted-foreground"
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
