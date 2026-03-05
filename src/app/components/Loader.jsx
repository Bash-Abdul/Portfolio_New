import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export function Loader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Increment counter from 0 to 100
    const duration = 2000; // 2 seconds
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait a bit before completing
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white tracking-tight">
            BASHIR
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <motion.div
            className="h-px bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.span
            key={count}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl text-white font-mono"
          >
            {count}%
          </motion.span>
          <motion.div
            className="h-px bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
