import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Calendar, CheckCircle, Lightbulb, Code, AlertCircle, Trash2, ChevronLeft, ChevronRight, X, Wrench, Pencil } from "lucide-react";
import { useIsAdmin } from "../../../hooks/useIsAdmin";
import { useWeeklyLogs, useCreateWeeklyLogs, useUpdateWeeklyLogs, useDeleteWeeklyLogs } from "../../../hooks/useWeeklyLogs";
import { toast } from "sonner";
import Swal from 'sweetalert2'

const emptyProject = {
  projectName: "",
  achievements: "",
  challenges: "",
  solutions: "",
  features: "",
  learnings: ""
}

export default function DashboardWeeklyLogs() {
  const { data, isLoading } = useWeeklyLogs()
  const logs = data?.data ?? []

  const createLog = useCreateWeeklyLogs()
  const updateLog = useUpdateWeeklyLogs()
  const deleteLog = useDeleteWeeklyLogs()
  const isAdmin = useIsAdmin()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [weekStart, setWeekStart] = useState("")
  const [weekEnd, setWeekEnd] = useState("")
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState(emptyProject)

  // null = create mode, log object = edit mode
  // this single piece of state tells us both which mode we're in
  // AND which log we're editing
  const [editingLog, setEditingLog] = useState(null)
  const isEditing = editingLog !== null

  function resetForm() {
    setWeekStart("")
    setWeekEnd("")
    setProjects([])
    setCurrentProject(emptyProject)
    setEditingLog(null)
  }

  function handleOpenCreate() {
    resetForm()
    setIsFormOpen(true)
  }

  function handleOpenEdit(log) {
    // pre-fill the form with the existing log's data
    setEditingLog(log)
    setWeekStart(log.week_start.slice(0, 10))
    setWeekEnd(log.week_end.slice(0, 10))
    // projects are already arrays from the API — load them directly
    // into the projects list, not the sub-form
    setProjects(log.projects)
    setCurrentProject(emptyProject)
    setIsFormOpen(true)

    console.log('editing log:', log)
    console.log('week_start:', log.week_start)
  }

  function handleCloseForm() {
    resetForm()
    setIsFormOpen(false)
  }

  function addProjectToWeek() {
    if (!currentProject.projectName?.trim()) {
      toast.error('Please enter a project name')
      return
    }

    const newProject = {
      id: Date.now().toString(),
      projectName: currentProject.projectName,
      achievements: currentProject.achievements.split("\n").filter(a => a.trim()),
      challenges: currentProject.challenges.split("\n").filter(c => c.trim()),
      solutions: currentProject.solutions.split("\n").filter(s => s.trim()),
      features: currentProject.features.split("\n").filter(f => f.trim()),
      learnings: currentProject.learnings.split("\n").filter(l => l.trim())
    }

    setProjects([...projects, newProject])
    setCurrentProject(emptyProject)
  }

  function removeProject(projectId) {
    setProjects(projects.filter(p => p.id !== projectId))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (projects.length === 0) {
      toast.error('Add at least one project')
      return
    }

    const payload = { week_start: weekStart, week_end: weekEnd, projects }

    if (isEditing) {
      // PUT /api/weekly-logs/:id with the full updated log
      updateLog.mutate(
        { id: editingLog.id, data: payload },
        {
          onSuccess: () => {
            toast.success('Log updated')
            resetForm()
            setIsFormOpen(false)
          },
          onError: () => toast.error('Failed to update log')
        }
      )
    } else {
      // POST /api/weekly-logs
      createLog.mutate(payload, {
        onSuccess: () => {
          toast.success('Log created')
          resetForm()
          setIsFormOpen(false)
        },
        onError: (err) => toast.error(err?.response?.data?.message ?? 'Failed to create log')
      })
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: 'Delete this log?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#000',
      cancelButtonText: 'Cancel',
    })
    if (!result.isConfirmed) return

    deleteLog.mutate(id, {
      onSuccess: () => {
        toast.success('Log deleted')
        if (currentIndex >= logs.length - 1 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1)
        }
      },
      onError: () => toast.error('Failed to delete log')
    })
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const currentLog = logs[currentIndex]
  const isPending = createLog.isPending || updateLog.isPending

  if (isLoading) {
    return (
      <DashboardLayout title="Weekly Logs">
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Weekly Logs"
      actions={
        isAdmin && (
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Log</span>
          </button>
        )
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
                onClick={handleCloseForm}
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
                    {/* title changes based on mode */}
                    <h2 className="text-2xl font-bold dark:text-white">
                      {isEditing ? 'Edit Weekly Log' : 'New Weekly Log'}
                    </h2>
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">Week Start</label>
                      <input
                        type="date"
                        required
                        value={weekStart}
                        onChange={(e) => setWeekStart(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">Week End</label>
                      <input
                        type="date"
                        required
                        value={weekEnd}
                        onChange={(e) => setWeekEnd(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>
                  </div>

                  {projects.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium dark:text-white">Projects ({projects.length})</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {projects.map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                          >
                            <span className="font-medium dark:text-white">{project.projectName}</span>
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  // load project back into sub-form for editing
                                  setCurrentProject({
                                    projectName: project.projectName,
                                    achievements: project.achievements.join("\n"),
                                    challenges: project.challenges.join("\n"),
                                    solutions: project.solutions.join("\n"),
                                    features: project.features.join("\n"),
                                    learnings: project.learnings.join("\n")
                                  })
                                  // remove it from the list so when they click
                                  // "Add Project" it replaces it rather than duplicating
                                  removeProject(project.id)
                                }}
                                className="text-neutral-500 hover:text-black dark:hover:text-white"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeProject(project.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
                    <h3 className="font-medium dark:text-white">Add Project</h3>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">Project Name *</label>
                      <input
                        type="text"
                        value={currentProject.projectName}
                        onChange={(e) => setCurrentProject({ ...currentProject, projectName: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        placeholder="e.g., Portfolio Website"
                      />
                    </div>

                    {[
                      { key: "achievements", label: "Achievements", placeholder: "Completed auth system\nDeployed to production" },
                      { key: "challenges", label: "Challenges Faced", placeholder: "Complex state management\nPerformance optimization" },
                      { key: "solutions", label: "Solutions", placeholder: "Used Promise.all\nLazy loaded routes" },
                      { key: "features", label: "Features Implemented", placeholder: "User authentication\nDark mode toggle" },
                      { key: "learnings", label: "What I Learned", placeholder: "React Router best practices\nTypeScript patterns" },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium mb-2 dark:text-white">{label} (one per line)</label>
                        <textarea
                          rows={3}
                          value={currentProject[key]}
                          onChange={(e) => setCurrentProject({ ...currentProject, [key]: e.target.value })}
                          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white focus:outline-none focus:border-black dark:focus:border-white resize-none"
                          placeholder={placeholder}
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addProjectToWeek}
                      className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium"
                    >
                      + Add Project to Week
                    </button>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors font-medium disabled:opacity-50"
                    >
                      {isPending ? 'Saving...' : isEditing ? 'Update Log' : 'Save Log'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseForm}
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
            {isAdmin && (
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create First Log
              </button>
            )}
          </motion.div>
        ) : (
          <>
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

            <AnimatePresence mode="wait">
              {currentLog && (
                <motion.div
                  key={currentLog.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
                >
                  <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                          <h3 className="text-xl font-bold dark:text-white">
                            {formatDate(currentLog.week_start)} — {formatDate(currentLog.week_end)}
                          </h3>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {currentLog.projects.length} project{currentLog.projects.length !== 1 ? 's' : ''} • Created {formatDate(currentLog.created_at)}
                        </p>
                      </div>
                      {isAdmin && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(currentLog)}
                            className="p-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(currentLog.id)}
                            disabled={deleteLog.isPending}
                            className="p-2 text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-8">
                    {currentLog.projects.map((project, projectIndex) => (
                      <div key={project.id} className="border-l-4 border-blue-500 pl-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <Code className="w-5 h-5 text-blue-500" />
                          <h4 className="text-lg font-bold dark:text-white">{project.projectName}</h4>
                        </div>

                        {[
                          { items: project.achievements, label: "Achievements", icon: <CheckCircle className="w-4 h-4 text-green-500" />, color: "text-green-500" },
                          { items: project.challenges, label: "Challenges", icon: <AlertCircle className="w-4 h-4 text-orange-500" />, color: "text-orange-500" },
                          { items: project.solutions, label: "Solutions", icon: <Wrench className="w-4 h-4 text-blue-400" />, color: "text-blue-400" },
                          { items: project.features, label: "Features Implemented", icon: <Plus className="w-4 h-4 text-purple-500" />, color: "text-purple-500" },
                          { items: project.learnings, label: "What I Learned", icon: <Lightbulb className="w-4 h-4 text-yellow-500" />, color: "text-yellow-500" },
                        ].map(({ items, label, icon, color }) =>
                          items?.length > 0 && (
                            <div key={label}>
                              <div className="flex items-center gap-2 mb-2">
                                {icon}
                                <h5 className="font-medium text-sm dark:text-white">{label}</h5>
                              </div>
                              <div className="pl-6 space-y-1">
                                {items.map((item, i) => (
                                  <div key={i} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                                    <span className={`${color} mt-1`}>•</span>
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}

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
  )
}