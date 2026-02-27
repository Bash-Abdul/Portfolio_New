// import { motion } from "motion/react";

// const skills = [
//   "React",
//   "TypeScript",
//   "Next.js",
//   "Node.js",
//   "Tailwind CSS",
//   "PostgreSQL",
//   "GraphQL",
//   "AWS",
//   "Docker",
//   "MongoDB",
//   "Express",
//   "Vue.js",
// ];

// const expertise = [
//   "Frontend Development",
//   "Backend Architecture",
//   "UI/UX Design",
//   "Performance Optimization",
//   "API Development",
//   "Database Design",
//   "DevOps",
//   "System Design",
// ];

// export function Skills() {
//   return (
//     <section className="bg-[#0a0a0a] text-white py-32 md:py-48">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mb-20"
//         >
//           <span className="text-sm text-neutral-500 font-mono mb-8 block">
//             — EXPERTISE
//           </span>
//           <h2 className="text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[1.1] tracking-tight mb-12">
//             Skills & Technologies
//           </h2>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-20">
//           {/* Skills list */}
//           <div className="grid grid-cols-2 gap-6">
//             {skills.map((skill, index) => (
//               <motion.div
//                 key={skill}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.05 }}
//                 className="border border-neutral-800 p-6 hover:border-white transition-colors duration-300 cursor-default"
//               >
//                 <span className="text-lg">{skill}</span>
//               </motion.div>
//             ))}
//           </div>

//           {/* Expertise areas */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="grid grid-cols-2 gap-4"
//             >
//               {expertise.map((item, index) => (
//                 <motion.div
//                   key={item}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.05 }}
//                   className="border border-neutral-800 p-6 hover:border-white transition-colors duration-300 cursor-default"
//                 >
//                   <span className="text-sm text-neutral-500 font-mono block mb-2">
//                     0{index + 1}
//                   </span>
//                   <span className="text-lg">{item}</span>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from "motion/react";

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "GraphQL",
  "AWS",
  "Docker",
  "MongoDB",
  "Express",
  "Vue.js",
];

const expertise = [
  "Frontend Development",
  "Backend Architecture",
  "UI/UX Design",
  "Performance Optimization",
  "API Development",
  "Database Design",
  "DevOps",
  "System Design",
];

export function Skills() {
  return (
    <section className="bg-[#0a0a0a] text-white py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm text-neutral-500 font-mono mb-8 block">
            — EXPERTISE
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[1.1] tracking-tight mb-12">
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="space-y-20">
          {/* Skills list */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-neutral-500 font-mono mb-8"
            >
              TECHNOLOGIES
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-neutral-800 p-6 hover:border-white transition-colors duration-300 cursor-default"
                >
                  <span className="text-lg">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Expertise areas */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-neutral-500 font-mono mb-8"
            >
              EXPERTISE
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {expertise.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-neutral-800 p-6 hover:border-white transition-colors duration-300 cursor-default"
                >
                  <span className="text-sm text-neutral-500 font-mono block mb-2">
                    0{index + 1}
                  </span>
                  <span className="text-lg">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}