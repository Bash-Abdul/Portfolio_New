import { motion as Motion } from "motion/react";
import { Github, Tag, GitCommit, Star, Loader2 } from "lucide-react";
import { useGithub } from "../../hooks/useGithub";

export function GitHubActivity() {
  const { data, isLoading, isError } = useGithub();
  const githubData = data?.data ?? { profile: null, activity: [], releases: [] };
  const releases = githubData.releases ?? [];

  const stats = [
    { label: "Public Repos", value: githubData.profile?.public_repos?.toString() ?? "—", icon: Github },
    { label: "Total Stars", value: githubData.profile?.total_stars?.toString() ?? "—", icon: Star },
    { label: "Recent Activity", value: githubData.activity?.length?.toString() ?? "—", icon: GitCommit },
    { label: "Latest Release", value: releases[0]?.version ?? "—", icon: Tag },
  ];
  return (
    <section className="py-32 px-8 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Motion.div
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
        </Motion.div>

        {/* Stats Grid */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {isLoading ? (
            <div className="col-span-4 flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
            </div>
          ) : isError ? (
            <p className="col-span-4 py-12 text-center text-neutral-500 dark:text-neutral-400">
              GitHub activity is temporarily unavailable.
            </p>
          ) : (
            stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Motion.div
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
                </Motion.div>
              );
            })
          )}
        </Motion.div>

        {/* Recent Releases */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-8 dark:text-white">Recent Releases</h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
              Releases are temporarily unavailable.
            </div>
          ) : releases.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
              No releases found.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {releases.map((release, index) => (
                <Motion.div
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
                    </div>

                    {/* Content */}
                    <h4 className="font-bold text-lg mb-2 dark:text-white">{release.repo}</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 font-medium">
                      {release.title}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed mb-4">
                      {release.body}
                    </p>

                    {/* Footer */}
                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                      <span className="text-xs text-neutral-500 dark:text-neutral-500">{release.date}</span>
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          )}
          {/* View More Link */}
          <Motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <a
              href={githubData.profile?.html_url || "https://github.com/Bash-Abdul"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">View All on GitHub</span>
            </a>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}
