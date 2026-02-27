// import { motion } from "motion/react";
// import { useEffect, useState } from "react";

// export function Hero() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 20,
//         y: (e.clientY / window.innerHeight - 0.5) * 20,
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <section className="h-screen relative overflow-hidden bg-[#0a0a0a] dark:bg-black flex items-center justify-center">
//       {/* Animated background elements */}
//       <motion.div
//         className="absolute inset-0 opacity-30"
//         style={{
//           x: mousePosition.x,
//           y: mousePosition.y,
//         }}
//       >
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
//       </motion.div>

//       <div className="relative z-10 px-6 w-full max-w-[1400px]">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="mb-6"
//         >
//           <span className="text-neutral-500 text-sm md:text-base font-mono">
//             &lt;developer /&gt;
//           </span>
//         </motion.div>

//         <div className="overflow-hidden">
//           <motion.h1
//             initial={{ y: 200 }}
//             animate={{ y: 0 }}
//             transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
//             className="text-[12vw] md:text-[17vw] leading-[0.85] tracking-tighter text-white mb-4"
//           >
//             BASHIR
//           </motion.h1>
//         </div>

//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="max-w-md"
//           >
//             <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
//               Frontend / Fullstack Developer specializing in creating
//               exceptional digital experiences with attention to detail
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//             className="flex gap-4"
//           >
//             <a
//               href="#work"
//               className="group relative px-8 py-4 bg-white text-black overflow-hidden"
//             >
//               <span className="relative z-10">View Work</span>
//               <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
//               <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 View Work
//               </span>
//             </a>

//             <a
//               href="#work"
//               className="group relative px-8 py-4 bg-white text-black overflow-hidden"
//             >
//               <span className="relative z-10">Download Resume</span>
//               <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
//               <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 Download Resume
//               </span>
//             </a>
//           </motion.div>
//         </div>

//         {/* Scroll indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           className="absolute bottom-12 left-1/2 -translate-x-1/2"
//         >
//           <div className="flex flex-col items-center gap-2">
//             <span className="text-neutral-600 text-xs uppercase tracking-wider rotate-180 [writing-mode:vertical-lr]">
//               Scroll
//             </span>
//             <motion.div
//               animate={{ y: [0, 8, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//               className="w-px h-16 bg-gradient-to-b from-transparent via-neutral-600 to-transparent"
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Split BASHIR into individual letters for animation
  const letters = "BASHIR".split("");

  return (
    <section className="h-screen relative overflow-hidden bg-[#0a0a0a] dark:bg-black flex items-center justify-center">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 px-6 w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <motion.span
            className="text-neutral-500 text-sm md:text-base font-mono inline-block"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            &lt;developer /&gt;
          </motion.span>
        </motion.div>

        <div className="overflow-hidden">
          <h1 className="text-[15vw] md:text-[18vw] leading-[0.85] tracking-tighter text-white mb-4">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 * index,
                  ease: [0.6, 0.05, 0.01, 0.9]
                }}
                className="inline-block"
                whileHover={{
                  scale: 1.1,
                  color: "#FFF", //"#a855f7",
                  transition: { duration: 0.2 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-md"
          >
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
              Frontend / Fullstack Developer specializing in creating
              exceptional digital experiences with attention to detail
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4"
          >
            <a
              href="#work"
              className="group relative px-8 py-4 bg-white text-black overflow-hidden"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Work
              </span>
            </a>

            <a
              href="#work"
              className="group relative px-8 py-4 bg-white text-black overflow-hidden"
            >
              <span className="relative z-10">View Resume</span>
              <div className="absolute inset-0 bg-neutral-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Resume
              </span>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute lg:bottom-[-1] left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-neutral-600 text-xs uppercase tracking-wider rotate-180 [writing-mode:vertical-lr]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-16 bg-gradient-to-b from-transparent via-neutral-600 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}