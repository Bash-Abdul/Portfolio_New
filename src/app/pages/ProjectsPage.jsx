import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Contact } from "../components/Contact";
import { ExternalLink, Github } from "lucide-react";
import SEO from "../components/SEO";
import { useLocation } from 'react-router'

const projects = [
  {
    title: "NexCommerce",
    category: "E-Commerce Platform",
    description:
      "A comprehensive e-commerce solution built with Next.js and Node.js. Features include real-time inventory management, seamless checkout experience, admin dashboard, and integrated payment processing with Stripe.",
    image:
      "https://images.unsplash.com/photo-1577333715735-8fcb0359d906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbW9ja3VwfGVufDF8fHx8MTc3MTk3MDI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2025",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "AWS S3"],
    challenge: "Building a scalable inventory system that handles real-time stock updates across multiple warehouses while maintaining data consistency.",
    solution: "Implemented event-driven architecture with Redis pub/sub for real-time updates and PostgreSQL for transactional consistency.",
    github: "#",
    live: "#",
  },
  {
    title: "DataViz Pro",
    category: "Analytics Dashboard",
    description:
      "Real-time analytics and data visualization platform for businesses. Features interactive charts, custom reporting, data export, and role-based access control.",
    image:
      "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBzY3JlZW58ZW58MXx8fHwxNzcyMDA3NjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2025",
    technologies: ["React", "TypeScript", "D3.js", "Express", "MongoDB", "WebSocket"],
    challenge: "Rendering large datasets with thousands of data points without compromising performance or user experience.",
    solution: "Implemented data virtualization, lazy loading, and optimized D3.js rendering techniques to handle millions of data points smoothly.",
    github: "#",
    live: "#",
  },
  {
    title: "FlowSpace",
    category: "Mobile Application",
    description:
      "A productivity app designed to help users manage tasks, set goals, and track progress. Features include smart notifications, calendar integration, and cross-platform synchronization.",
    image:
      "https://images.unsplash.com/photo-1661246626039-5429b8f7488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzcyMDMzMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2026",
    technologies: ["React Native", "Firebase", "Redux", "Node.js", "Expo"],
    challenge: "Creating a seamless offline-first experience that syncs data across devices when connectivity is restored.",
    solution: "Built a robust offline-first architecture using Redux Persist and Firebase's offline capabilities with conflict resolution.",
    github: "#",
    live: "#",
  },
  {
    title: "CodeHub",
    category: "Developer Platform",
    description:
      "Collaborative coding environment with live preview, version control integration, real-time collaboration, and team management features. Perfect for remote teams and pair programming.",
    image:
      "https://images.unsplash.com/photo-1758873268877-3cd8ed329ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2plY3QlMjBzY3JlZW58ZW58MXx8fHwxNzcxOTg3MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2026",
    technologies: ["React", "Monaco Editor", "Socket.io", "Docker", "Kubernetes", "GraphQL"],
    challenge: "Implementing real-time collaborative editing with conflict resolution and maintaining code execution security in a sandboxed environment.",
    solution: "Used operational transformation for collaborative editing and Docker containers for secure, isolated code execution.",
    github: "#",
    live: "#",
  },
];

export default function ProjectsPage() {

  const location = useLocation()
  return (
    <div className="size-full bg-white dark:bg-neutral-900">
      <SEO title="Projects | Bashir Abdulah" url="/projects" key={location.pathname}   />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-neutral-400 font-mono mb-8 block">
              — MY WORK
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[10vw] leading-[1.1] tracking-tight mb-8">
              Projects that solve real problems
            </h1>
            <p className="text-xl text-neutral-400 max-w-3xl">
              A collection of projects I've built, each one a journey of problem-solving, learning, and pushing the boundaries of what's possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto space-y-32">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={index % 2 === 0 ? "" : ""}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900 group cursor-pointer">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-6">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} space-y-6`}>
                  <div>
                    <span className="text-sm text-neutral-500 font-mono">{project.year}</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl mt-2 mb-2">{project.title}</h2>
                    <p className="text-lg text-neutral-500 uppercase tracking-wider">{project.category}</p>
                  </div>

                  <p className="text-xl text-neutral-700 leading-relaxed">
                    {project.description}
                  </p>

                  <div>
                    <h3 className="text-sm text-neutral-500 font-mono mb-3">THE CHALLENGE</h3>
                    <p className="text-neutral-600 leading-relaxed">{project.challenge}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-neutral-500 font-mono mb-3">THE SOLUTION</h3>
                    <p className="text-neutral-600 leading-relaxed">{project.solution}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-neutral-500 font-mono mb-3">TECHNOLOGIES</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 border border-neutral-300 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
}