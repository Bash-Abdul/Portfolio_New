// import { useState } from "react";
// import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
// import { StatusBadge } from "../../components/dashboard/StatusBadge";
// import { Tabs } from "../../components/dashboard/Tabs";
// import { Modal } from "../../components/dashboard/Modal";
// import { EmptyState } from "../../components/dashboard/EmptyState";
// import { Plus, Edit, Trash2, Star, FolderKanban } from "lucide-react";
// import { motion } from "motion/react";

// // type Project = {
// //   id: string;
// //   title: string;
// //   tags: string[];
// //   status: "published" | "draft";
// //   featured: boolean;
// //   lastUpdated: string;
// // };

// const mockProjects= [
//   {
//     id: "1",
//     title: "E-commerce Dashboard",
//     tags: ["React", "TypeScript", "Tailwind"],
//     status: "published",
//     featured: true,
//     lastUpdated: "2024-03-01",
//   },
//   {
//     id: "2",
//     title: "AI Chat Interface",
//     tags: ["Next.js", "OpenAI", "Supabase"],
//     status: "published",
//     featured: true,
//     lastUpdated: "2024-02-28",
//   },
//   {
//     id: "3",
//     title: "Task Management App",
//     tags: ["React", "Firebase"],
//     status: "draft",
//     featured: false,
//     lastUpdated: "2024-02-25",
//   },
// ];

// export default function DashboardProjects() {
//   const [activeTab, setActiveTab] = useState("All");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [projects] = useState(mockProjects);

//   const filteredProjects = projects.filter((project) => {
//     if (activeTab === "All") return true;
//     if (activeTab === "Published") return project.status === "published";
//     if (activeTab === "Draft") return project.status === "draft";
//     return true;
//   });

//   const actions = (
//     <button
//       onClick={() => setIsModalOpen(true)}
//       className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
//     >
//       <Plus className="w-4 h-4" />
//       New Project
//     </button>
//   );

//   return (
//     <DashboardLayout title="Projects" actions={actions}>
//       <div className="max-w-7xl space-y-6">
//         {/* Tabs */}
//         <Tabs tabs={["All", "Published", "Draft"]} activeTab={activeTab} onChange={setActiveTab} />

//         {/* Projects Table */}
//         {filteredProjects.length === 0 ? (
//           <EmptyState
//             icon={FolderKanban}
//             message="No projects yet. Add your first one."
//             action={{
//               label: "New Project",
//               onClick: () => setIsModalOpen(true),
//             }}
//           />
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
//           >
//             {/* Table Header */}
//             <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-400">
//               <div className="col-span-3">Title</div>
//               <div className="col-span-3">Tags</div>
//               <div className="col-span-2">Status</div>
//               <div className="col-span-1">Featured</div>
//               <div className="col-span-2">Last Updated</div>
//               <div className="col-span-1">Actions</div>
//             </div>

//             {/* Table Body */}
//             <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
//               {filteredProjects.map((project, index) => (
//                 <motion.div
//                   key={project.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                   className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
//                 >
//                   <div className="col-span-3 font-medium dark:text-white">{project.title}</div>
//                   <div className="col-span-3 flex gap-2 flex-wrap">
//                     {project.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-xs dark:text-neutral-300"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="col-span-2">
//                     <StatusBadge variant={project.status}>{project.status}</StatusBadge>
//                   </div>
//                   <div className="col-span-1">
//                     {project.featured && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
//                   </div>
//                   <div className="col-span-2 text-sm text-neutral-600 dark:text-neutral-400">
//                     {project.lastUpdated}
//                   </div>
//                   <div className="col-span-1 flex gap-2">
//                     <button className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
//                       <Edit className="w-4 h-4 dark:text-white" />
//                     </button>
//                     <button className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors">
//                       <Trash2 className="w-4 h-4 text-red-600" />
//                     </button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* New Project Modal */}
//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           title="New Project"
//           footer={
//             <>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
//               >
//                 Cancel
//               </button>
//               <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
//                 Create Project
//               </button>
//             </>
//           }
//         >
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Title</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 placeholder="My Awesome Project"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Slug</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 placeholder="my-awesome-project"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Short Description</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 placeholder="A brief description of your project"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Tags</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 placeholder="React, TypeScript, Tailwind (comma-separated)"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Full Description</label>
//               <textarea
//                 rows={4}
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
//                 placeholder="Markdown supported..."
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Live URL</label>
//                 <input
//                   type="url"
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                   placeholder="https://example.com"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Repo URL</label>
//                 <input
//                   type="url"
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                   placeholder="https://github.com/..."
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-6">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input type="checkbox" className="w-4 h-4" />
//                 <span className="text-sm dark:text-white">Featured</span>
//               </label>
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input type="checkbox" className="w-4 h-4" />
//                 <span className="text-sm dark:text-white">Published</span>
//               </label>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </DashboardLayout>
//   );
// }


import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { StatusBadge } from '../../components/dashboard/StatusBadge'
import { Tabs } from '../../components/dashboard/Tabs'
import { Modal } from '../../components/dashboard/Modal'
import { EmptyState } from '../../components/dashboard/EmptyState'
import { Plus, Edit, Trash2, Star, FolderKanban, Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useAllProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../../../hooks/useProjects'
import { useIsAdmin } from '../../../hooks/useIsAdmin'

const EMPTY_FORM = {
  title: '',
  slug: '',
  category: '',
  description: '',
  challenge: '',
  solution: '',
  image: '',
  technologies: '',
  github: '',
  live: '',
  status: 'draft',
  featured: false
}

export default function DashboardProjects() {
  const [activeTab, setActiveTab] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState(null)

  const { data, isLoading, isError } = useAllProjects()
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()
  const deleteProject = useDeleteProject()
  const isAdmin = useIsAdmin();

  const projects = data?.data ?? []

  const filteredProjects = projects.filter((project) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Published') return project.status === 'published'
    if (activeTab === 'Draft') return project.status === 'draft'
    return true
  })

  function openCreateModal() {
    setEditingProject(null)
    setForm(EMPTY_FORM)
    setFormError(null)
    setIsModalOpen(true)
  }

  function openEditModal(project) {
    setEditingProject(project)
    setForm({
      title: project.title ?? '',
      slug: project.slug ?? '',
      category: project.category ?? '',
      description: project.description ?? '',
      challenge: project.challenge ?? '',
      solution: project.solution ?? '',
      image: project.image ?? '',
      technologies: project.technologies?.join(', ') ?? '',
      github: project.github ?? '',
      live: project.live ?? '',
      status: project.status ?? 'draft',
      featured: project.featured ?? false
    })
    setFormError(null)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingProject(null)
    setForm(EMPTY_FORM)
    setFormError(null)
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function handleSubmit() {
    setFormError(null)

    const payload = {
      ...form,
      slug: form.slug || undefined,
      technologies: form.technologies
        ? form.technologies.split(',').map(t => t.trim()).filter(Boolean)
        : [],
        github: form.github || null,
        live: form.live || null,
        image: form.image || null,
    }

    try {
      if (editingProject) {
        await updateProject.mutateAsync({ id: editingProject.id, data: payload })
      } else {
        await createProject.mutateAsync(payload)
      }
      closeModal()
    } catch (err) {
      setFormError(err.message ?? 'Something went wrong')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project?')) return
    try {
      await deleteProject.mutateAsync(id)
    } catch (err) {
      console.error('Delete failed:', err.message)
    }
  }

  async function handleToggleFeatured(project) {
    try {
      await updateProject.mutateAsync({
        id: project.id,
        data: { featured: !project.featured }
      })
    } catch (err) {
      console.error('Toggle featured failed:', err.message)
    }
  }

  const isSaving = createProject.isPending || updateProject.isPending

  const actions = (
      <button
      onClick={openCreateModal}
      disabled={!isAdmin}
      className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Plus className="w-4 h-4" />
      New Project
    </button>
  )

  if (isLoading) {
    return (
      <DashboardLayout title="Projects" actions={actions}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
        </div>
      </DashboardLayout>
    )
  }

  if (isError) {
    return (
      <DashboardLayout title="Projects" actions={actions}>
        <div className="py-20 text-center text-red-500">Failed to load projects.</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Projects" actions={actions}>
      <div className="max-w-7xl space-y-6">
        <Tabs
          tabs={['All', 'Published', 'Draft']}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {filteredProjects.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            message="No projects yet. Add your first one."
            action={{ label: 'New Project', onClick: openCreateModal }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          >
            {/* Table Header */}
            <div className="hidden xl:grid grid-cols-12 gap-4 px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-600 dark:text-neutral-400">
              <div className="col-span-3">Title</div>
              <div className="col-span-3">Technologies</div>
              <div className="col-span-1 xl:col-span-2 min-w-0">Status</div>
              <div className="col-span-1">Featured</div>
              <div className="col-span-1 xl:col-span-2 min-w-0">Last Updated</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-2 xl:grid-cols-12 gap-4 p-4 sm:p-6 xl:py-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                >
                  <div className="col-span-2 xl:col-span-3 min-w-0 break-words text-lg xl:text-base font-medium dark:text-white">{project.title}</div>

                  <div className="col-span-2 xl:col-span-3 min-w-0 self-start">
                    <span className="block xl:hidden mb-2 text-xs text-neutral-500 dark:text-neutral-400">Technologies</span>
                    {project.technologies?.length ? (
                      <ul aria-label={`${project.title} technologies`} className="m-0 flex list-none flex-wrap items-start gap-1.5 p-0">
                        {project.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="max-w-full rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium leading-5 text-neutral-700 [overflow-wrap:anywhere] dark:border-neutral-600 dark:bg-neutral-900/40 dark:text-neutral-300"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">No technologies added</span>
                    )}
                  </div>

                  <div className="col-span-1 xl:col-span-2 min-w-0">
                    <span className="block xl:hidden mb-1 text-xs text-neutral-500 dark:text-neutral-400">Status</span>
                    <StatusBadge variant={project.status}>{project.status}</StatusBadge>
                  </div>

                  <div className="col-span-1">
                    <button
                      onClick={() => handleToggleFeatured(project)}
                      aria-label={project.featured ? 'Unfeature project' : 'Feature project'}
                      aria-pressed={Boolean(project.featured)}
                      disabled={updateProject.isPending || !isAdmin}
                      className="min-h-11 min-w-11 inline-flex items-center justify-center transition-colors"
                      title={project.featured ? 'Unfeature' : 'Feature'}
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          project.featured
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-neutral-300 dark:text-neutral-600'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                      <span className="xl:hidden ml-2 text-sm dark:text-white">Featured</span>
                    </button>
                  </div>

                  <div className="col-span-2 xl:col-span-2 min-w-0 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="xl:hidden">Updated: </span>{new Date(project.updated_at).toLocaleDateString()}
                  </div>

                  <div className="col-span-2 xl:col-span-1 flex flex-wrap gap-2">
                    <button
                    disabled={!isAdmin}
                      aria-label={`Edit ${project.title}`} onClick={() => openEditModal(project)}
                      className="min-h-11 min-w-11 inline-flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Edit className="w-4 h-4 dark:text-white" />
                    </button>
                    <button
                      aria-label={`Delete ${project.title}`} onClick={() => handleDelete(project.id)}
                      disabled={deleteProject.isPending || !isAdmin}
                      className="min-h-11 min-w-11 inline-flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Create / Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingProject ? 'Edit Project' : 'New Project'}
          footer={
            <>
              <button
                onClick={closeModal}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingProject ? 'Save Changes' : 'Create Project'}
              </button>
            </>
          }
        >
          <div className="space-y-4">
            {formError && (
              <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="NexCommerce"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">
                  Slug <span className="text-neutral-400 font-normal">(auto-generated if empty)</span>
                </label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="nexcommerce"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="E-Commerce Platform"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                placeholder="Short description shown on project cards..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Challenge</label>
              <textarea
                name="challenge"
                value={form.challenge}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                placeholder="The problem you were solving..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Solution</label>
              <textarea
                name="solution"
                value={form.solution}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                placeholder="How you solved it..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                type="url"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">
                Technologies <span className="text-neutral-400 font-normal">(comma-separated)</span>
              </label>
              <input
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Live URL</label>
                <input
                  name="live"
                  value={form.live}
                  onChange={handleChange}
                  type="url"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">GitHub URL</label>
                <input
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  type="url"
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  name="featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm dark:text-white">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  name="status"
                  type="checkbox"
                  checked={form.status === 'published'}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    status: e.target.checked ? 'published' : 'draft'
                  }))}
                  className="w-4 h-4"
                />
                <span className="text-sm dark:text-white">Published</span>
              </label>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
