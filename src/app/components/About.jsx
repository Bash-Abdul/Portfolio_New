import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="min-h-screen bg-white dark:bg-neutral-900 relative overflow-hidden"
    >
      <div className="max-w-350 mx-auto px-6 py-32 md:py-48">
        {/* Large number decoration */}
        <motion.div
          style={{ y }}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[40vw] font-bold text-neutral-100 dark:text-neutral-300 leading-none pointer-events-none hidden md:block"
        >
          01
        </motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="text-sm text-neutral-500 font-mono mb-8 block">
              — ABOUT
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[1.1] tracking-tight dark:text-white">
              I craft digital experiences that{" "}
              <span className="italic text-neutral-400 dark:text-neutral-500">merge</span> aesthetics
              with functionality
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                With a passion for clean code and pixel-perfect design, I build
                web applications that don't just work—they captivate.
              </p>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                From concept to deployment, I focus on creating seamless user
                experiences backed by robust, scalable architecture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-6xl md:text-7xl dark:text-white">2+</span>
                  <span className="text-neutral-500 dark:text-neutral-400">Years</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">of professional experience</p>
              </div>
              <div>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-6xl md:text-7xl dark:text-white">10+</span>
                  <span className="text-neutral-500 dark:text-neutral-400">Projects</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">successfully delivered</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}