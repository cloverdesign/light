"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling when preloader is active
    document.body.style.overflow = "hidden";

    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "unset";
      }, 3000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          <DotLottieReact
            autoplay
            loop
            src="/data.json"
            style={{ width: 200, height: 200 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
