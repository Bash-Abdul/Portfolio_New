import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Contact } from "../components/Contact";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import SEO from "../components/SEO";
import { useLocation } from 'react-router'
import { usePublishedProjects } from "../../hooks/useProjects";
import { Chatbot } from "../components/Chatbot";

export default function ProjectsPage() {
  const location = useLocation()
  const { data, isLoading, isError } = usePublishedProjects()
  const projects = data?.data ?? []

  return (
    <div className="size-full bg-white dark:bg-neutral-900">
      <SEO
        title="Projects | Bashir Abdulah"
        url="/projects"
        key={location.pathname}
      />

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
              A collection of projects I've built, each one a journey of
              problem-solving, learning, and pushing the boundaries of what's
              possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
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
            <div className="space-y-32">
              {projects.map((project, index) => {
                const year = project.created_at
                  ? new Date(project.created_at).getFullYear()
                  : ""

                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                      {/* Image Column */}
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900 group cursor-pointer">
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
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

                      {/* Content Column */}
                      <div
                        className={`${
                          index % 2 === 1 ? "lg:order-1" : ""
                        } space-y-6`}
                      >
                        <div>
                          <span className="text-sm text-neutral-500 font-mono">
                            {year}
                          </span>

                          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-2 mb-2 dark:text-white">
                            {project.title}
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

                        {Array.isArray(project.technologies) &&
                          project.technologies.length > 0 && (
                            <div>
                              <h3 className="text-sm text-neutral-500 font-mono mb-3">
                                TECHNOLOGIES
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
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
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Contact />
      <Chatbot />
    </div>
  )

  // return (
  //   <div className="size-full bg-white dark:bg-neutral-900">
  //     <SEO title="Projects | Bashir Abdulah" url="/projects" key={location.pathname}   />
  //     <Navigation />
      
  //     {/* Hero Section */}
  //     <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6 bg-black text-white">
  //       <div className="max-w-350 mx-auto">
  //         <motion.div
  //           initial={{ opacity: 0, y: 40 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.8 }}
  //         >
  //           <span className="text-sm text-neutral-400 font-mono mb-8 block">
  //             — MY WORK
  //           </span>
  //           <h1 className="text-5xl md:text-7xl lg:text-[10vw] leading-[1.1] tracking-tight mb-8">
  //             Projects that solve real problems
  //           </h1>
  //           <p className="text-xl text-neutral-400 max-w-3xl">
  //             A collection of projects I've built, each one a journey of problem-solving, learning, and pushing the boundaries of what's possible.
  //           </p>
  //         </motion.div>
  //       </div>
  //     </section>

  //     {/* Projects Grid */}
  //     <section className="py-24 px-6">
  //       <div className="max-w-350 mx-auto space-y-32">
  //         {projects.map((project, index) => (
  //           <motion.article
  //             key={project.title}
  //             initial={{ opacity: 0, y: 60 }}
  //             whileInView={{ opacity: 1, y: 0 }}
  //             viewport={{ once: true, margin: "-100px" }}
  //             transition={{ duration: 0.8 }}
  //             className={index % 2 === 0 ? "" : ""}
  //           >
  //             <div className="grid lg:grid-cols-2 gap-12 items-start">
  //               {/* Image */}
  //               <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
  //                 <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900 group cursor-pointer">
  //                   <ImageWithFallback
  //                     src={project.image}
  //                     alt={project.title}
  //                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
  //                   />
  //                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
  //                 </div>

  //                 {/* Links */}
  //                 <div className="flex gap-4 mt-6">
  //                   <a
  //                     href={project.github}
  //                     className="flex items-center gap-2 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
  //                   >
  //                     <Github className="w-4 h-4" />
  //                     <span>View Code</span>
  //                   </a>
  //                   <a
  //                     href={project.live}
  //                     className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-neutral-800 transition-colors"
  //                   >
  //                     <ExternalLink className="w-4 h-4" />
  //                     <span>Live Demo</span>
  //                   </a>
  //                 </div>
  //               </div>

  //               {/* Content */}
  //               <div className={`${index % 2 === 1 ? "lg:order-1" : ""} space-y-6`}>
  //                 <div>
  //                   <span className="text-sm text-neutral-500 font-mono">{project.year}</span>
  //                   <h2 className="text-4xl md:text-5xl lg:text-6xl mt-2 mb-2">{project.title}</h2>
  //                   <p className="text-lg text-neutral-500 uppercase tracking-wider">{project.category}</p>
  //                 </div>

  //                 <p className="text-xl text-neutral-700 leading-relaxed">
  //                   {project.description}
  //                 </p>

  //                 <div>
  //                   <h3 className="text-sm text-neutral-500 font-mono mb-3">THE CHALLENGE</h3>
  //                   <p className="text-neutral-600 leading-relaxed">{project.challenge}</p>
  //                 </div>

  //                 <div>
  //                   <h3 className="text-sm text-neutral-500 font-mono mb-3">THE SOLUTION</h3>
  //                   <p className="text-neutral-600 leading-relaxed">{project.solution}</p>
  //                 </div>

  //                 <div>
  //                   <h3 className="text-sm text-neutral-500 font-mono mb-3">TECHNOLOGIES</h3>
  //                   <div className="flex flex-wrap gap-2">
  //                     {project.technologies.map((tech) => (
  //                       <span
  //                         key={tech}
  //                         className="px-4 py-2 border border-neutral-300 text-sm"
  //                       >
  //                         {tech}
  //                       </span>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </motion.article>
  //         ))}
  //       </div>
  //     </section>

  //     <Contact />
  //   </div>
  // );
}