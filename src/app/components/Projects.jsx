import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRef } from "react";
import { Link } from "react-router";

const projects = [
  {
    title: "NexCommerce",
    category: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory, seamless checkout, and admin dashboard.",
    image:
      "https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc3MTk3MDI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2025",
  },
  {
    title: "DataViz Pro",
    category: "Analytics Dashboard",
    description:
      "Real-time data visualization platform with interactive charts and custom reporting.",
    image:
      "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBzY3JlZW58ZW58MXx8fHwxNzcyMDA3NjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2025",
  },
  {
    title: "FlowSpace",
    category: "Mobile Application",
    description:
      "Productivity app with intuitive UI, smart notifications, and cross-platform sync.",
    image:
      "https://images.unsplash.com/photo-1661246626039-5429b8f7488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzcyMDMzMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2026",
  },
  {
    title: "CodeHub",
    category: "Developer Platform",
    description:
      "Collaborative coding environment with live preview, version control, and team features.",
    image:
      "https://images.unsplash.com/photo-1758873268877-3cd8ed329ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3QlMjBzY3JlZW58ZW58MXx8fHwxNzcxOTg3MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2026",
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer border-t border-neutral-300 dark:border-neutral-700 py-12 relative"
    >
      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-2">
          <span className="text-sm text-neutral-500 font-mono">{project.year}</span>
        </div>

        <div className="md:col-span-5">
          <h3 className="text-4xl md:text-5xl lg:text-6xl mb-4 group-hover:translate-x-2 transition-transform duration-500 dark:text-white">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wider">
            {project.category}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>

        <div className="md:col-span-5">
          <motion.div style={{ y }} className="relative overflow-hidden aspect-4/3 bg-neutral-900">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-5 h-5 text-black" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="work" className="bg-neutral-50 dark:bg-neutral-800 py-32 md:py-48">
      <div className="max-w-350 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm text-neutral-500 font-mono mb-8 block">
            — SELECTED WORK
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[1.1] tracking-tight">
            Projects that push boundaries
          </h2>
        </motion.div>

        {/* <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div> */}
          <div>
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

         {/* View All Projects Button */}
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/projects"
            className="group flex items-center gap-3 px-8 py-4 border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
          >
            <span className="text-lg">View All Projects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}