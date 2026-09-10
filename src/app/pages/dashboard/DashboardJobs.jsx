// import { useState } from "react";
// import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
// import { StatusBadge } from "../../components/dashboard/StatusBadge";
// import { Tabs } from "../../components/dashboard/Tabs";
// import { Modal } from "../../components/dashboard/Modal";
// import { EmptyState } from "../../components/dashboard/EmptyState";
// import { Plus, Edit, Trash2, ExternalLink, Briefcase, Calendar, Building2 } from "lucide-react";
// import { motion } from "motion/react";

// // type JobStatus = "applied" | "interview" | "offer" | "rejected";

// // type JobApplication = {
// //   id: string;
// //   company: string;
// //   position: string;
// //   location: string;
// //   jobUrl: string;
// //   dateApplied: string;
// //   status: JobStatus;
// //   salary: string;
// //   notes: string;
// //   nextFollowUp?: string;
// // };

// const mockApplications = [
//   {
//     id: "1",
//     company: "Vercel",
//     position: "Senior Frontend Engineer",
//     location: "Remote",
//     jobUrl: "https://vercel.com/careers",
//     dateApplied: "2024-03-01",
//     status: "applied",
//     salary: "$150k - $200k",
//     notes: "Applied through LinkedIn. Looking for React experts.",
//     nextFollowUp: "2024-03-08",
//   },
//   {
//     id: "2",
//     company: "Stripe",
//     position: "Full Stack Developer",
//     location: "San Francisco, CA",
//     jobUrl: "https://stripe.com/jobs",
//     dateApplied: "2024-02-28",
//     status: "applied",
//     salary: "$160k - $220k",
//     notes: "Referral from John. Focus on payment systems.",
//   },
//   {
//     id: "3",
//     company: "Shopify",
//     position: "Frontend Developer",
//     location: "Remote",
//     jobUrl: "https://shopify.com/careers",
//     dateApplied: "2024-02-25",
//     status: "applied",
//     salary: "$140k - $180k",
//     notes: "E-commerce platform experience preferred.",
//   },
// ];

// const statusConfig = {
//   applied: { variant: "pending", label: "Applied" },
//   interview: { variant: "draft", label: "Interview" },
//   offer: { variant: "published", label: "Offer" },
//   rejected: { variant: "rejected", label: "Rejected" },
// };

// export default function DashboardJobs() {
//   const [activeTab, setActiveTab] = useState("All");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [applications] = useState(mockApplications);

//   const filteredApplications = applications.filter((app) => {
//     if (activeTab === "All") return true;
//     return app.status === activeTab.toLowerCase();
//   });

//   const stats = {
//     total: applications.length,
//     applied: applications.filter((a) => a.status === "applied").length,
//     interview: applications.filter((a) => a.status === "interview").length,
//     offer: applications.filter((a) => a.status === "offer").length,
//     rejected: applications.filter((a) => a.status === "rejected").length,
//   };

//   const actions = (
//     <button
//       onClick={() => setIsModalOpen(true)}
//       className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2"
//     >
//       <Plus className="w-4 h-4" />
//       Add Application
//     </button>
//   );

//   return (
//     <DashboardLayout title="Job Applications" actions={actions}>
//       <div className="max-w-7xl space-y-6">
//         {/* Stats Overview */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//           <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
//             <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total</p>
//             <p className="text-2xl font-bold dark:text-white">{stats.total}</p>
//           </div>
//           <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
//             <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Applied</p>
//             <p className="text-2xl font-bold dark:text-white">{stats.applied}</p>
//           </div>
//           <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
//             <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Interview</p>
//             <p className="text-2xl font-bold dark:text-white">{stats.interview}</p>
//           </div>
//           <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
//             <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Offers</p>
//             <p className="text-2xl font-bold dark:text-white">{stats.offer}</p>
//           </div>
//           <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
//             <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Rejected</p>
//             <p className="text-2xl font-bold dark:text-white">{stats.rejected}</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <Tabs
//           tabs={["All", "Applied", "Interview", "Offer", "Rejected"]}
//           activeTab={activeTab}
//           onChange={setActiveTab}
//         />

//         {/* Applications List */}
//         {filteredApplications.length === 0 ? (
//           <EmptyState
//             icon={Briefcase}
//             message="No applications yet. Start tracking your job search."
//             action={{
//               label: "Add Application",
//               onClick: () => setIsModalOpen(true),
//             }}
//           />
//         ) : (
//           <div className="space-y-4">
//             {filteredApplications.map((app, index) => (
//               <motion.div
//                 key={app.id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start gap-4 mb-3">
//                       <div className="p-3 bg-neutral-100 dark:bg-neutral-700 flex-shrink-0">
//                         <Building2 className="w-6 h-6 dark:text-white" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-3 mb-1">
//                           <h3 className="text-lg font-bold dark:text-white">{app.position}</h3>
//                           <StatusBadge variant={statusConfig[app.status].variant}>
//                             {statusConfig[app.status].label}
//                           </StatusBadge>
//                         </div>
//                         <p className="text-neutral-600 dark:text-neutral-400 mb-2">
//                           {app.company} · {app.location}
//                         </p>
//                         <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             Applied: {app.dateApplied}
//                           </div>
//                           {app.nextFollowUp && (
//                             <div className="flex items-center gap-1">
//                               <Calendar className="w-4 h-4" />
//                               Follow-up: {app.nextFollowUp}
//                             </div>
//                           )}
//                           <div className="font-medium dark:text-white">{app.salary}</div>
//                         </div>
//                       </div>
//                     </div>

//                     {app.notes && (
//                       <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
//                         <p className="text-sm text-neutral-600 dark:text-neutral-400">{app.notes}</p>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 flex-shrink-0">
//                     <a
//                       href={app.jobUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
//                       title="View Job Posting"
//                     >
//                       <ExternalLink className="w-5 h-5 dark:text-white" />
//                     </a>
//                     <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
//                       <Edit className="w-5 h-5 dark:text-white" />
//                     </button>
//                     <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
//                       <Trash2 className="w-5 h-5 text-red-600" />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Add Application Modal */}
//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           title="Add Job Application"
//           footer={
//             <>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
//               >
//                 Cancel
//               </button>
//               <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
//                 Add Application
//               </button>
//             </>
//           }
//         >
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Company</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                   placeholder="Vercel"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Position</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                   placeholder="Frontend Engineer"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Location</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                   placeholder="Remote"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Salary Range</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                   placeholder="$150k - $200k"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Job URL</label>
//               <input
//                 type="url"
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 placeholder="https://company.com/careers/job-id"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Date Applied</label>
//                 <input
//                   type="date"
//                   className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
//                 <select className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white">
//                   <option value="applied">Applied</option>
//                   <option value="interview">Interview</option>
//                   <option value="offer">Offer</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Next Follow-up Date (Optional)</label>
//               <input
//                 type="date"
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-white">Notes</label>
//               <textarea
//                 rows={4}
//                 className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
//                 placeholder="Add any notes about the application, contacts, or requirements..."
//               />
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
import { Plus, Edit, Trash2, ExternalLink, Briefcase, Calendar, Building2, Loader2 } from 'lucide-react'
// import { motion } from 'motion/react'
import { useJobs, useJobCounts, useCreateJob, useUpdateJob, useDeleteJob } from '../../../hooks/useJobs'
import {useIsAdmin} from '../../../hooks/useIsAdmin'
import { motion } from "motion/react";

const statusConfig = {
  applied:   { variant: 'pending',   label: 'Applied' },
  interview: { variant: 'draft',     label: 'Interview' },
  offer:     { variant: 'published', label: 'Offer' },
  rejected:  { variant: 'rejected',  label: 'Rejected' },
}

const EMPTY_FORM = {
  company:        '',
  position:       '',
  location:       '',
  job_url:        '',
  date_applied:   new Date().toISOString().split('T')[0],
  status:         'applied',
  salary:         '',
  notes:          '',
  next_follow_up: ''
}

export default function DashboardJobs() {
  const [activeTab, setActiveTab]       = useState('All')
  const [isModalOpen, setIsModalOpen]   = useState(false)
  const [editingJob, setEditingJob]     = useState(null)
  const [form, setForm]                 = useState(EMPTY_FORM)

  const status = activeTab === 'All' ? undefined : activeTab.toLowerCase()

  const { data, isLoading, isError }  = useJobs(status)
  const { data: countsData }          = useJobCounts()
  const createJob                     = useCreateJob()
  const updateJob                     = useUpdateJob()
  const deleteJob                     = useDeleteJob()
  const isAdmin = useIsAdmin()

  const jobs   = data?.data ?? []
  const counts = countsData?.data ?? {}

  function handleEdit(job) {
    setEditingJob(job)
    setForm({
      company:        job.company,
      position:       job.position,
      location:       job.location ?? '',
      job_url:        job.job_url ?? '',
      date_applied:   job.date_applied?.split('T')[0] ?? '',
      status:         job.status,
      salary:         job.salary ?? '',
      notes:          job.notes ?? '',
      next_follow_up: job.next_follow_up?.split('T')[0] ?? ''
    })
    setIsModalOpen(true)
  }

  function handleClose() {
    setIsModalOpen(false)
    setEditingJob(null)
    setForm(EMPTY_FORM)
  }

  async function handleSubmit() {
    const payload = {
      ...form,
      job_url:        form.job_url || null,
      salary:         form.salary || null,
      notes:          form.notes || null,
      next_follow_up: form.next_follow_up || null,
    }

    if (editingJob) {
      await updateJob.mutateAsync({ id: editingJob.id, data: payload })
    } else {
      await createJob.mutateAsync(payload)
    }

    handleClose()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this application?')) return
    await deleteJob.mutateAsync(id)
  }

  const actions = (
    <button
      onClick={() => setIsModalOpen(true)}
      disabled={!isAdmin}
      className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Plus className="w-4 h-4" />
      Add Application
    </button>
  )

  if (isLoading) {
    return (
      <DashboardLayout title="Job Applications" actions={actions}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
        </div>
      </DashboardLayout>
    )
  }

  if (isError) {
    return (
      <DashboardLayout title="Job Applications" actions={actions}>
        <div className="py-20 text-center text-red-500">Failed to load applications.</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Job Applications" actions={actions}>
      <div className="max-w-7xl space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total',     value: counts.total     ?? 0 },
            { label: 'Applied',   value: counts.applied   ?? 0 },
            { label: 'Interview', value: counts.interview ?? 0 },
            { label: 'Offers',    value: counts.offer     ?? 0 },
            { label: 'Rejected',  value: counts.rejected  ?? 0 },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs
          tabs={['All', 'Applied', 'Interview', 'Offer', 'Rejected']}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* List */}
        {jobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            message="No applications yet. Start tracking your job search."
            action={{ label: 'Add Application', onClick: () => setIsModalOpen(true) }}
          />
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 w-full break-words">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-700 flex-shrink-0">
                        <Building2 className="w-6 h-6 dark:text-white" />
                      </div>
                      <div className="flex-1 min-w-0 w-full break-words">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold dark:text-white">{job.position}</h3>
                          <StatusBadge variant={statusConfig[job.status].variant}>
                            {statusConfig[job.status].label}
                          </StatusBadge>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-2">
                          {job.company}{job.location ? ` · ${job.location}` : ''}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Applied: {new Date(job.date_applied).toLocaleDateString()}
                          </div>
                          {job.next_follow_up && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Follow-up: {new Date(job.next_follow_up).toLocaleDateString()}
                            </div>
                          )}
                          {job.salary && (
                            <div className="font-medium dark:text-white">{job.salary}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {job.notes && (
                      <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{job.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {job.job_url && (
                      <a
                      
                        href={isAdmin ? job.job_url : ''}
                        target={isAdmin ? "_blank" : ''}
                        rel="noopener noreferrer"
                        className="min-h-11 min-w-11 inline-flex items-center justify-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 dark:text-white" />
                      </a>
                    )}
                    <button
                      aria-label={`Edit application for ${job.position}`} onClick={() => handleEdit(job)}
                      disabled={!isAdmin}
                      className="min-h-11 min-w-11 inline-flex items-center justify-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Edit className="w-5 h-5 dark:text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      disabled={!isAdmin}
                      className="min-h-11 min-w-11 inline-flex items-center justify-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleClose}
          title={editingJob ? 'Edit Application' : 'Add Job Application'}
          footer={
            <>
              <button
                onClick={handleClose}
                className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={createJob.isPending || updateJob.isPending}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                {createJob.isPending || updateJob.isPending
                  ? 'Saving...'
                  : editingJob ? 'Save Changes' : 'Add Application'}
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="Vercel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Position</label>
                <input
                  type="text"
                  value={form.position}
                  onChange={e => setForm(f => ({ ...f, position: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="Frontend Engineer"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Location</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="Remote"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Salary Range</label>
                <input
                  type="text"
                  value={form.salary}
                  onChange={e => setForm(f => ({ ...f, salary: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                  placeholder="$150k - $200k"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Job URL</label>
              <input
                type="url"
                value={form.job_url}
                onChange={e => setForm(f => ({ ...f, job_url: e.target.value }))}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                placeholder="https://company.com/careers/job-id"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Date Applied</label>
                <input
                  type="date"
                  value={form.date_applied}
                  onChange={e => setForm(f => ({ ...f, date_applied: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-white">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Next Follow-up Date</label>
              <input
                type="date"
                value={form.next_follow_up}
                onChange={e => setForm(f => ({ ...f, next_follow_up: e.target.value }))}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Notes</label>
              <textarea
                rows={4}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:border-black dark:focus:border-white resize-none dark:text-white"
                placeholder="Add any notes about the application..."
              />
            </div>
          </div>
        </Modal>

      </div>
    </DashboardLayout>
  )
}