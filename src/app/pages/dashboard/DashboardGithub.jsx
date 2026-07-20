import { useMemo, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { SyncButton } from "../../components/dashboard/SyncButton";
import { Tabs } from "../../components/dashboard/Tabs";
import { Github, GitPullRequest, GitCommit, Tag, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";
import { useGithub } from "../../../hooks/useGithub";

const eventTypeConfig = {
  push: { icon: GitCommit, variant: "active", label: "Push" },
  pr: { icon: GitPullRequest, variant: "pending", label: "Pull Request" },
  release: { icon: Tag, variant: "published", label: "Release" },
};

export default function DashboardGithub() {
  const [activeTab, setActiveTab] = useState("Activity");
  const [expandedRelease, setExpandedRelease] = useState(null);
  const { data, isLoading, isError, dataUpdatedAt, refetch } = useGithub();

  const handleSync = async () => {
    const result = await refetch();
    if (result.error) throw result.error;
  };

  const actions = <SyncButton onSync={handleSync} />;

  const githubData = data?.data ?? { profile: null, activity: [], releases: [] };
  const activity = useMemo(() => githubData.activity ?? [], [githubData.activity]);
  const releases = githubData.releases ?? [];

  const groupedActivity = useMemo(() => activity.reduce((acc, event) => {
    const date = event.date || "Recently updated";
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {}), [activity]);

  return (
    <DashboardLayout title="GitHub" actions={actions}>
      <div className="max-w-7xl space-y-6">
        {/* Last Synced */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Last synced:{" "}
            <span className="font-medium dark:text-white">
              {isLoading
                ? "Loading..."
                : isError
                  ? "Sync failed"
                  : dataUpdatedAt
                    ? new Date(dataUpdatedAt).toLocaleString()
                    : "Not synced"}
            </span>
          </p>
        </div>

        {/* Tabs */}
        <Tabs tabs={["Activity", "Releases"]} activeTab={activeTab} onChange={setActiveTab} />

        {/* Activity Tab */}
        {activeTab === "Activity" && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-neutral-500">
                <Loader2 className="w-6 h-6 animate-spin mr-3" />
                Loading GitHub activity...
              </div>
            ) : isError ? (
              <div className="rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 text-sm text-neutral-600 dark:text-neutral-400">
                GitHub data is temporarily unavailable. Please try again in a moment.
              </div>
            ) : activity.length === 0 ? (
              <div className="rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 text-sm text-neutral-600 dark:text-neutral-400">
                No recent GitHub activity found.
              </div>
            ) : Object.entries(groupedActivity).map(([date, events]) => (
              <div key={date} className="space-y-3">
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{date}</h3>
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-200 dark:divide-neutral-700">
                  {events.map((event) => {
                    const config = eventTypeConfig[event.type] || eventTypeConfig.push;
                    const Icon = config.icon;
                    return (
                      <div
                        key={event.id}
                        className="px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-neutral-100 dark:bg-neutral-700">
                            <Icon className="w-5 h-5 dark:text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium dark:text-white">{event.repo}</p>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {event.timestamp}
                            </p>
                          </div>
                          <StatusBadge variant={config.variant}>{config.label}</StatusBadge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </Motion.div>
        )}

        {/* Releases Tab */}
        {activeTab === "Releases" && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-neutral-500">
                <Loader2 className="w-6 h-6 animate-spin mr-3" />
                Loading releases...
              </div>
            ) : isError ? (
              <div className="rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 text-sm text-neutral-600 dark:text-neutral-400">
                Releases are temporarily unavailable.
              </div>
            ) : releases.length === 0 ? (
              <div className="rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 text-sm text-neutral-600 dark:text-neutral-400">
                No releases found.
              </div>
            ) : releases.map((release) => {
              const isExpanded = expandedRelease === release.id;
              return (
                <div
                  key={release.id}
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                >
                  <button
                    onClick={() => setExpandedRelease(isExpanded ? null : release.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <div className="p-2 bg-neutral-100 dark:bg-neutral-700">
                        <Github className="w-5 h-5 dark:text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-medium dark:text-white">{release.repo}</p>
                          <StatusBadge variant="published">{release.version}</StatusBadge>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400">{release.title}</p>
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-500">{release.date}</p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-neutral-400 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400 ml-4" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <Motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                          <p className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap">
                            {release.body}
                          </p>
                        </div>
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
