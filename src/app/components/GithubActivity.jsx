import { motion } from "motion/react";
import { Github, Tag, GitCommit, Star } from "lucide-react";


const releases = [
  {
    id: "1",
    repo: "portfolio-v2",
    version: "v2.0.0",
    title: "Major Redesign",
    date: "Mar 2024",
    description: "Complete redesign with modern UI, dashboard system, and dark mode support.",
    stars: 47,
  },
  {
    id: "2",
    repo: "ai-chat-interface",
    version: "v1.5.0",
    title: "GPT-4 Integration",
    date: "Feb 2024",
    description: "Added GPT-4 support with streaming responses and improved context handling.",
    stars: 89,
  },
  {
    id: "3",
    repo: "task-manager-app",
    version: "v1.3.2",
    title: "Performance Update",
    date: "Feb 2024",
    description: "Optimized rendering and added offline support for better user experience.",
    stars: 34,
  },
];

const stats = [
  { label: "Public Repos", value: "24", icon: Github },
  { label: "Total Stars", value: "340+", icon: Star },
  { label: "Recent Commits", value: "150+", icon: GitCommit },
  { label: "Latest Release", value: "v2.0.0", icon: Tag },
];

export function GitHubActivity() {
  return (
    <section className="py-32 px-8 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <Github className="w-8 h-8 dark:text-white" />
            <h2 className="text-5xl md:text-6xl font-bold dark:text-white">
              GitHub Activity
            </h2>
          </div>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            A glimpse into my recent open-source work and project releases.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="p-6 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:border-black dark:hover:border-white transition-colors group"
              >
                <Icon className="w-6 h-6 mb-3 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <div className="text-3xl font-bold mb-1 dark:text-white">{stat.value}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Releases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-8 dark:text-white">Recent Releases</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {releases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-black dark:hover:border-white transition-all"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                      <span className="text-sm font-medium dark:text-white">{release.version}</span>
                    </div>
                    {release.stars && (
                      <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                        <Star className="w-4 h-4" />
                        <span>{release.stars}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-lg mb-2 dark:text-white">{release.repo}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 font-medium">
                    {release.title}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed mb-4">
                    {release.description}
                  </p>

                  {/* Footer */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <span className="text-xs text-neutral-500 dark:text-neutral-500">{release.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <a
              href="https://github.com/bashir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">View All on GitHub</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
