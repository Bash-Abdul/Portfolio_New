import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Calendar, CheckCircle, Lightbulb, Code, AlertCircle, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";

// interface ProjectLog {
//   id: string;
//   projectName: string;
//   achievements: string[];
//   challenges: string[];
//   features: string[];
//   learnings: string[];
// }

// interface WeeklyLog {
//   id: string;
//   weekStart: string;
//   weekEnd: string;
//   projects: ProjectLog[];
//   createdAt: string;
// }

const mockLogs= [
  {
    id: "1",
    weekStart: "2026-03-01",
    weekEnd: "2026-03-07",
    projects: [
      {
        id: "p1",
        projectName: "Portfolio Website",
        achievements: [
          "Completed GitHub Activity section with real-time stats",
          "Implemented responsive navigation with smooth transitions",
          "Deployed to production with 99.9% uptime"
        ],
        challenges: [
          "Integrating Motion animations with complex layouts",
          "Optimizing bundle size for faster load times"
        ],
        features: [
          "Activity Feed popup on homepage",
          "Dark mode with system preference detection",
          "Interactive hero section with mouse tracking"
        ],
        learnings: [
          "Better understanding of React Router's protected routes",
          "Advanced TypeScript interfaces for complex data structures",
          "Performance optimization with code splitting"
        ]
      },
      {
        id: "p2",
        projectName: "Dashboard System",
        achievements: [
          "Built comprehensive job application tracker",
          "Implemented project board with Kanban-style tickets",
          "Added password-only authentication system"
        ],
        challenges: [
          "Managing state across multiple dashboard pages",
          "Creating reusable components for different data types"
        ],
        features: [
          "Weekly progress tracking system",
          "Markdown support for workflow documentation",
          "Status filtering and detailed application cards"
        ],
        learnings: [
          "Improved localStorage management patterns",
          "Better component composition strategies",
          "Effective use of custom hooks for data management"
        ]
      }
    ],
    createdAt: "2026-03-07T10:00:00Z"
  }
];

export default function DashboardWeeklyLogs() {
  const [logs, setLogs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weekStart, setWeekStart] = useState("");
  const [weekEnd, setWeekEnd] = useState("");
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    achievements: [],
    challenges: [],
    features: [],
    learnings: []
  });
  const [projectFormInputs, setProjectFormInputs] = useState({
    achievements: "",
    challenges: "",
    features: "",
    learnings: ""
  });

  useEffect(() => {
    const savedLogs = localStorage.getItem("weeklyLogs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      setLogs(mockLogs);
      localStorage.setItem("weeklyLogs", JSON.stringify(mockLogs));
    }
  }, []);

  const saveLogs = (updatedLogs) => {
    setLogs(updatedLogs);
    localStorage.setItem("weeklyLogs", JSON.stringify(updatedLogs));
  };

  const addProjectToWeek = () => {
    if (!currentProject.projectName?.trim()) {
      alert("Please enter a project name");
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      projectName: currentProject.projectName,
      achievements: projectFormInputs.achievements.split("\n").filter(a => a.trim()),
      challenges: projectFormInputs.challenges.split("\n").filter(c => c.trim()),
      features: projectFormInputs.features.split("\n").filter(f => f.trim()),
      learnings: projectFormInputs.learnings.split("\n").filter(l => l.trim())
    };

    setProjects([...projects, newProject]);
    setCurrentProject({
      projectName: "",
      achievements: [],
      challenges: [],
      features: [],
      learnings: []
    });
    setProjectFormInputs({
      achievements: "",
      challenges: "",
      features: "",
      learnings: ""
    });
  };

  const removeProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (projects.length === 0) {
      alert("Please add at least one project");
      return;
    }

    const newLog= {
      id: Date.now().toString(),
      weekStart,
      weekEnd,
      projects,
      createdAt: new Date().toISOString()
    };

    const updatedLogs = [newLog, ...logs];
    saveLogs(updatedLogs);
    
    // Reset form
    setWeekStart("");
    setWeekEnd("");
    setProjects([]);
    setCurrentProject({
      projectName: "",
      achievements: [],
      challenges: [],
      features: [],
      learnings: []
    });
    setProjectFormInputs({
      achievements: "",
      challenges: "",
      features: "",
      learnings: ""
    });
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    const updatedLogs = logs.filter(log => log.id !== id);
    saveLogs(updatedLogs);
    if (currentIndex >= updatedLogs.length && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const currentLog = logs[currentIndex];

  return (
    <DashboardLayout
      title="Weekly Logs"
      actions={
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Log</span>
        </button>
      }
    >
      <div className="max-w-5xl space-y-8">
        {/* Form Modal */}
        <AnimatePresence>
          {isFormOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFormOpen(false)}
                className="fixed inset-0 bg-black/50 z-40"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 z-50 overflow-y-auto max-h-[90vh]"
              >
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 className="text-2xl font-bold dark:text-white">New Weekly Log</h2>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Week Date Range */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Week Start
                      </label>
                      <input
                        type="date"
                        required
                        value={weekStart}
                        onChange={(e) => setWeekStart(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Week End
                      </label>
                      <input
                        type="date"
                        required
                        value={weekEnd}
                        onChange={(e) => setWeekEnd(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>
                  </div>

                  {/* Added Projects */}
                  {projects.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium dark:text-white">Projects Added ({projects.length})</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {projects.map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                          >
                            <span className="font-medium dark:text-white">{project.projectName}</span>
                            <button
                              type="button"
                              onClick={() => removeProject(project.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Form */}
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
                    <h3 className="font-medium dark:text-white">Add Project</h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={currentProject.projectName || ""}
                        onChange={(e) => setCurrentProject({ ...currentProject, projectName: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        placeholder="e.g., Portfolio Website"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Achievements (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={projectFormInputs.achievements}
                        onChange={(e) => setProjectFormInputs({ ...projectFormInputs, achievements: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white resize-none"
                        placeholder="Completed authentication system&#10;Deployed to production"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Challenges Faced (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={projectFormInputs.challenges}
                        onChange={(e) => setProjectFormInputs({ ...projectFormInputs, challenges: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white resize-none"
                        placeholder="Complex state management&#10;Performance optimization"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        Features Implemented (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={projectFormInputs.features}
                        onChange={(e) => setProjectFormInputs({ ...projectFormInputs, features: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white resize-none"
                        placeholder="User authentication&#10;Dark mode toggle"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">
                        What I Learned (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={projectFormInputs.learnings}
                        onChange={(e) => setProjectFormInputs({ ...projectFormInputs, learnings: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white resize-none"
                        placeholder="React Router best practices&#10;TypeScript advanced patterns"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={addProjectToWeek}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium"
                    >
                      + Add Project to Week
                    </button>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium"
                    >
                      Save Weekly Log
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Logs Display */}
        {logs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-12 text-center"
          >
            <Calendar className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
            <h3 className="text-xl font-bold mb-2 dark:text-white">No Weekly Logs Yet</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Start tracking your weekly progress by creating your first log entry.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create First Log
            </button>
          </motion.div>
        ) : (
          <>
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Week</span>
              </button>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {currentIndex + 1} of {logs.length} weeks
              </div>
              <button
                onClick={() => setCurrentIndex(Math.min(logs.length - 1, currentIndex + 1))}
                disabled={currentIndex === logs.length - 1}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">Next Week</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Current Log */}
            <AnimatePresence mode="wait">
              {currentLog && (
                <motion.div
                  key={currentLog.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                          <h3 className="text-xl font-bold dark:text-white">
                            {formatDate(currentLog.weekStart)} - {formatDate(currentLog.weekEnd)}
                          </h3>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {currentLog.projects.length} project{currentLog.projects.length !== 1 ? 's' : ''} • Created {formatDate(currentLog.createdAt)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(currentLog.id)}
                        className="p-2 text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="p-6 space-y-8">
                    {currentLog.projects.map((project, projectIndex) => (
                      <div
                        key={project.id}
                        className="border-l-4 border-blue-500 pl-6 space-y-4"
                      >
                        <div className="flex items-center gap-2">
                          <Code className="w-5 h-5 text-blue-500" />
                          <h4 className="text-lg font-bold dark:text-white">{project.projectName}</h4>
                        </div>

                        {/* Achievements */}
                        {project.achievements.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <h5 className="font-medium text-sm dark:text-white">Achievements</h5>
                            </div>
                            <div className="pl-6 space-y-1">
                              {project.achievements.map((achievement, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                                >
                                  <span className="text-green-500 mt-1">•</span>
                                  <span>{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Challenges */}
                        {project.challenges.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-orange-500" />
                              <h5 className="font-medium text-sm dark:text-white">Challenges</h5>
                            </div>
                            <div className="pl-6 space-y-1">
                              {project.challenges.map((challenge, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                                >
                                  <span className="text-orange-500 mt-1">•</span>
                                  <span>{challenge}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Features */}
                        {project.features.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Plus className="w-4 h-4 text-purple-500" />
                              <h5 className="font-medium text-sm dark:text-white">Features Implemented</h5>
                            </div>
                            <div className="pl-6 space-y-1">
                              {project.features.map((feature, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                                >
                                  <span className="text-purple-500 mt-1">•</span>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Learnings */}
                        {project.learnings.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="w-4 h-4 text-yellow-500" />
                              <h5 className="font-medium text-sm dark:text-white">What I Learned</h5>
                            </div>
                            <div className="pl-6 space-y-1">
                              {project.learnings.map((learning, index) => (
                                <div
                                  key={index}
                                  className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                                >
                                  <span className="text-yellow-500 mt-1">•</span>
                                  <span>{learning}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Divider between projects */}
                        {projectIndex < currentLog.projects.length - 1 && (
                          <div className="border-b border-neutral-200 dark:border-neutral-700 pt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
