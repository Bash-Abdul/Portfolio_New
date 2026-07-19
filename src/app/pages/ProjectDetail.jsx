import { useParams, Link, useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { Contact } from "../components/Contact";
import { Chatbot } from "../components/Chatbot";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import SEO from "../components/SEO";
import { useProject, usePublishedProjects } from "../../hooks/useProjects";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Zap,
  Loader2,
} from "lucide-react";

const statusLabel = {
  completed: "Completed",
  "in-progress": "In Progress",
  archived: "Archived",
};

const statusColor = {
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "in-progress": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  archived: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: projectData, isLoading, isError } = useProject(slug);
  const { data: projectsData } = usePublishedProjects();

  const project = projectData?.data;
  const projects = projectsData?.data ?? [];
  const index = projects.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  const technologies = Array.isArray(project?.technologies) ? project.technologies : [];
  const galleryImages = Array.isArray(project?.images) && project.images.length > 0
    ? project.images
    : project?.image
      ? [project.image]
      : [];
  const features = Array.isArray(project?.features) && project.features.length > 0
    ? project.features
    : project?.challenge
      ? [project.challenge]
      : [];

  const year = project?.created_at
    ? new Date(project.created_at).getFullYear()
    : project?.year || "";
  const status = project?.status || "completed";
  const longDescription = project?.longDescription || project?.description || "";
  const challenge = project?.challenge || "";
  const solution = project?.solution || "";
  const impact = project?.impact || project?.solution || project?.description || "";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <Navigation />
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <SEO title="Project not found | Bashir Abdulah" url={location.pathname} />
        <Navigation />
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-2xl text-neutral-500">Project not found.</p>
          <Link to="/projects" className="underline text-neutral-700 dark:text-neutral-300">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-white dark:bg-neutral-900">
      <SEO title={`${project.title} | Bashir Abdulah`} url={location.pathname} />
      <Navigation />

      <section className="relative overflow-hidden bg-[#0a0a0a] pt-28 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <button
              onClick={() => navigate("/projects")}
              className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              ALL PROJECTS
            </button>
          </motion.div>

          <div className="grid gap-16 items-end pb-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="text-sm text-neutral-500 font-mono">{year}</span>
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full ${statusColor[status] || statusColor.completed}`}
                >
                  {statusLabel[status] || statusLabel.completed}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-white mb-6">
                {project.title}
              </h1>
              <p className="text-lg text-neutral-500 uppercase tracking-widest font-mono">
                {project.category}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-6"
            >
              <p className="text-xl text-neutral-300 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-neutral-700 text-white hover:border-white transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto max-w-[1400px] px-6"
        >
          <div className="aspect-[16/7] overflow-hidden rounded-t-[2rem]">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      <section className="bg-white py-24 px-6 dark:bg-neutral-900">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <span className="text-xs text-neutral-400 font-mono tracking-widest">
                ABOUT THE PROJECT
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-2xl md:text-3xl leading-relaxed text-neutral-700 dark:text-neutral-300">
                {longDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {technologies.length > 0 && (
        <section className="border-t border-b border-neutral-100 px-6 py-16 dark:border-neutral-800">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="mr-4 text-xs text-neutral-400 font-mono tracking-widest">
                BUILT WITH
              </span>
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 text-sm dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {(challenge || solution) && (
        <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-950">
          <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-2">
            {challenge && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                <span className="block text-xs text-neutral-400 font-mono tracking-widest">
                  THE CHALLENGE
                </span>
                <p className="text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {challenge}
                </p>
              </motion.div>
            )}

            {solution && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="space-y-4"
              >
                <span className="block text-xs text-neutral-400 font-mono tracking-widest">
                  THE SOLUTION
                </span>
                <p className="text-xl leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {solution}
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {features.length > 0 && (
        <section className="bg-white px-6 py-24 dark:bg-neutral-900">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
              <div>
                <span className="text-xs text-neutral-400 font-mono tracking-widest">
                  KEY FEATURES
                </span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5 shrink-0" />
                    <p className="text-neutral-700 dark:text-neutral-300">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {galleryImages.length > 1 && (
        <section className="bg-neutral-50 px-6 py-8 dark:bg-neutral-950">
          <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-3">
            {galleryImages.map((img, i) => (
              <motion.div
                key={`${img}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="aspect-[4/3] overflow-hidden"
              >
                <ImageWithFallback
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {impact && (
        <section className="bg-[#0a0a0a] px-6 py-24 text-white">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-start gap-6">
              <Zap className="w-8 h-8 text-neutral-500 mt-1 shrink-0" />
              <div>
                <span className="mb-4 block text-xs text-neutral-500 font-mono tracking-widest">
                  IMPACT
                </span>
                <p className="max-w-3xl text-3xl md:text-4xl leading-relaxed text-neutral-200">
                  {impact}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-neutral-100 dark:border-neutral-800">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2">
          {prev ? (
            <Link
              to={`/projects/${prev.slug}`}
              className="group flex flex-col gap-2 border-r border-neutral-100 p-8 md:p-16 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/40 transition-colors"
            >
              <span className="flex items-center gap-2 text-xs text-neutral-400 font-mono tracking-widest">
                <ArrowLeft className="w-3 h-3" /> PREVIOUS
              </span>
              <span className="text-2xl md:text-3xl group-hover:underline underline-offset-4">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to={`/projects/${next.slug}`}
              className="group flex flex-col gap-2 p-8 md:p-16 text-right hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
            >
              <span className="flex items-center justify-end gap-2 text-xs text-neutral-400 font-mono tracking-widest">
                NEXT <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-2xl md:text-3xl group-hover:underline underline-offset-4">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <Contact />
      <Chatbot />
    </div>
  );
}
