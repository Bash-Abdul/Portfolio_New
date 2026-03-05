import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Modal } from "../../components/dashboard/Modal";
import { EmptyState } from "../../components/dashboard/EmptyState";
import { Plus, MoreVertical, FolderKanban, Edit, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";


const mockProjects = [
  {
    id: "1",
    name: "Portfolio Redesign",
    description: "Complete overhaul of portfolio website with modern design",
    color: "bg-blue-500",
    ticketCount: 12,
  },
  {
    id: "2",
    name: "E-commerce Platform",
    description: "Building a full-featured e-commerce solution",
    color: "bg-purple-500",
    ticketCount: 24,
  },
  {
    id: "3",
    name: "Mobile App Development",
    description: "React Native app for task management",
    color: "bg-green-500",
    ticketCount: 8,
  },
];

export default function DashboardBoard() {
  const [projects] = useState(mockProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const actions = (
    <button
      onClick={() => setIsModalOpen(true)}
      className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
    >
      <Plus className="w-4 h-4" />
      New Project
    </button>
  );

  return (
    <DashboardLayout title="Project Board" actions={actions}>
      <div className="max-w-7xl space-y-6">
        {projects.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            message="No projects yet. Create your first project to start managing tickets."
            action={{
              label: "Create Project",
              onClick: () => setIsModalOpen(true),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/dashboard/board/${project.id}`)}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all cursor-pointer group"
              >
                <div className="p-6">
                  {/* Color bar */}
                  <div className={`h-1 w-16 ${project.color} mb-4`} />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold dark:text-white group-hover:opacity-80 transition-opacity">
                      {project.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-5 h-5 dark:text-white" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {project.ticketCount} tickets
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <Edit className="w-4 h-4 dark:text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Create Project Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Project"
          footer={
            <>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
              >
                Cancel
              </button>
              <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                Create Project
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Project Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="My Awesome Project"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                placeholder="Brief description of the project..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Color</label>
              <div className="flex gap-3">
                {["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-pink-500"].map(
                  (color) => (
                    <button key={color} className={`w-10 h-10 ${color} hover:opacity-80 transition-opacity`} />
                  )
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
