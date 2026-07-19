import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { Navigation } from "../components/Navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Contact } from "../components/Contact";
import { ExternalLink, Github, Loader2, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { usePublishedProjects } from "../../hooks/useProjects";
import { Chatbot } from "../components/Chatbot";

const statusLabel = {
  completed: "Completed",
  "in-progress": "In Progress",
  archived: "Archived",
};

const statusClasses = {
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "in-progress": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  archived: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
};

export default function ProjectsPage() {
  const location = useLocation();
  const { data, isLoading, isError } = usePublishedProjects();
  const projects = data?.data ?? [];

  return (
    <div className="size-full bg-white dark:bg-neutral-900">
      <SEO
        title="Projects | Bashir Abdulah"
        url="/projects"
        key={location.pathname}
      />

      <Navigation />

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
              A collection of projects built around product thinking, thoughtful
              UX, and practical engineering decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
          ) : isError ? (
            <div className="py-32 text-center text-neutral-500">
              Failed to load projects.
            </div>
          ) : projects.length === 0 ? (
            <div className="py-32 text-center text-neutral-500">
              No projects yet.
            </div>
          ) : (
            <div className="space-y-24">
              {projects.map((project, index) => {
                const year = project.created_at
                  ? new Date(project.created_at).getFullYear()
                  : project.year || "";
                const status = project.status || "completed";
                const technologies = Array.isArray(project.technologies)
                  ? project.technologies
                  : [];

                return (
                  <motion.article
                    key={project.id || project.slug}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900 group cursor-pointer rounded-[1.5rem]">
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link
                              to={`/projects/${project.slug}`}
                              className="bg-white text-black text-sm font-mono px-6 py-3 flex items-center gap-2"
                            >
                              VIEW PROJECT <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-6 flex-wrap">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              <span>View Code</span>
                            </a>
                          )}

                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div
                        className={`${index % 2 === 1 ? "lg:order-1" : ""} space-y-6`}
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm text-neutral-500 font-mono">
                              {year}
                            </span>
                            <span
                              className={`text-xs font-mono px-3 py-1 rounded-full ${statusClasses[status] || statusClasses.completed}`}
                            >
                              {statusLabel[status] || statusLabel.completed}
                            </span>
                          </div>

                          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-2 mb-2 dark:text-white">
                            <Link
                              to={`/projects/${project.slug}`}
                              className="hover:underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600"
                            >
                              {project.title}
                            </Link>
                          </h2>

                          <p className="text-lg text-neutral-500 uppercase tracking-wider">
                            {project.category}
                          </p>
                        </div>

                        <p className="text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {project.description}
                        </p>

                        {project.challenge && (
                          <div>
                            <h3 className="text-sm text-neutral-500 font-mono mb-3">
                              THE CHALLENGE
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {project.challenge}
                            </p>
                          </div>
                        )}

                        {project.solution && (
                          <div>
                            <h3 className="text-sm text-neutral-500 font-mono mb-3">
                              THE SOLUTION
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {project.solution}
                            </p>
                          </div>
                        )}

                        {technologies.length > 0 && (
                          <div>
                            <h3 className="text-sm text-neutral-500 font-mono mb-3">
                              TECHNOLOGIES
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-sm dark:text-white"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Contact />
      <Chatbot />
    </div>
  );
}