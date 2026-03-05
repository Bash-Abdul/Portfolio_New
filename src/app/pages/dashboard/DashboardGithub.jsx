import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { SyncButton } from "../../components/dashboard/SyncButton";
import { Tabs } from "../../components/dashboard/Tabs";
import { Github, GitPullRequest, GitCommit, Tag, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// type ActivityEvent = {
//   id: string;
//   repo: string;
//   type: "push" | "pr" | "release";
//   timestamp: string;
//   date: string;
// };

// type Release = {
//   id: string;
//   repo: string;
//   version: string;
//   title: string;
//   date: string;
//   body: string;
// };

const mockActivity = [
  {
    id: "1",
    repo: "bashir/portfolio-v2",
    type: "push",
    timestamp: "2 hours ago",
    date: "2024-03-03",
  },
  {
    id: "2",
    repo: "bashir/dashboard-app",
    type: "pr",
    timestamp: "5 hours ago",
    date: "2024-03-03",
  },
  {
    id: "3",
    repo: "bashir/ai-chat",
    type: "release",
    timestamp: "1 day ago",
    date: "2024-03-02",
  },
  {
    id: "4",
    repo: "bashir/task-manager",
    type: "push",
    timestamp: "2 days ago",
    date: "2024-03-01",
  },
];

const mockReleases= [
  {
    id: "1",
    repo: "bashir/portfolio-v2",
    version: "v2.0.0",
    title: "Major Redesign",
    date: "2024-03-01",
    body: "Complete redesign with new dashboard, improved performance, and modern UI components. Includes dark mode support and mobile responsiveness.",
  },
  {
    id: "2",
    repo: "bashir/ai-chat",
    version: "v1.5.0",
    title: "OpenAI GPT-4 Integration",
    date: "2024-02-28",
    body: "Added GPT-4 support, streaming responses, and improved context handling.",
  },
];

const eventTypeConfig = {
  push: { icon: GitCommit, variant: "active", label: "Push" },
  pr: { icon: GitPullRequest, variant: "pending", label: "Pull Request" },
  release: { icon: Tag, variant: "published", label: "Release" },
};

export default function DashboardGithub() {
  const [activeTab, setActiveTab] = useState("Activity");
  const [expandedRelease, setExpandedRelease] = useState(null);
  const [lastSynced] = useState("1 hour ago");

  const handleSync = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const actions = <SyncButton onSync={handleSync} />;

  // Group activities by date
  const groupedActivity = mockActivity.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});

  return (
    <DashboardLayout title="GitHub" actions={actions}>
      <div className="max-w-7xl space-y-6">
        {/* Last Synced */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Last synced: <span className="font-medium dark:text-white">{lastSynced}</span>
          </p>
        </div>

        {/* Tabs */}
        <Tabs tabs={["Activity", "Releases"]} activeTab={activeTab} onChange={setActiveTab} />

        {/* Activity Tab */}
        {activeTab === "Activity" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {Object.entries(groupedActivity).map(([date, events]) => (
              <div key={date} className="space-y-3">
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{date}</h3>
                <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 divide-y divide-neutral-200 dark:divide-neutral-700">
                  {events.map((event) => {
                    const config = eventTypeConfig[event.type];
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
          </motion.div>
        )}

        {/* Releases Tab */}
        {activeTab === "Releases" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {mockReleases.map((release) => {
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
                      <motion.div
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
