// import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
// import { StatCard } from "../../components/dashboard/StatCard";
// import { FolderKanban, FileText, Briefcase, CheckCircle, Plus } from "lucide-react";
// import { motion } from "motion/react";

// const stats = [
//   { icon: FolderKanban, label: "Total Projects", value: 12 },
//   { icon: FileText, label: "Published Posts", value: 24 },
//   { icon: Briefcase, label: "Open Applications", value: 3 },
//   { icon: CheckCircle, label: "Active Tickets", value: 0 },
// ];

// const activities = [
//   { action: "Project updated", detail: "E-commerce Dashboard", time: "2 hours ago" },
//   { action: "New blog post synced", detail: "Building Modern Web Apps", time: "5 hours ago" },
//   { action: "Application status changed", detail: "Senior Frontend at Vercel", time: "1 day ago" },
//   { action: "Project published", detail: "AI Chat Interface", time: "2 days ago" },
//   { action: "GitHub release", detail: "Portfolio v2.0.0", time: "3 days ago" },
// ];

// export default function DashboardOverview() {
//   const quickActions = [
//     { label: "Add Project", onClick: () => console.log("Add project") },
//     { label: "Sync Hashnode", onClick: () => console.log("Sync hashnode") },
//     { label: "Add Application", onClick: () => console.log("Add application") },
//   ];

//   return (
//     <DashboardLayout title="Overview">
//       <div className="max-w-7xl space-y-8">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, index) => (
//             <StatCard key={stat.label} {...stat} index={index} />
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-2 gap-6">
//           {/* Recent Activity */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6"
//           >
//             <h2 className="text-xl font-bold mb-6 dark:text-white">Recent Activity</h2>
//             <div className="space-y-4">
//               {activities.map((activity, index) => (
//                 <div
//                   key={index}
//                   className="flex gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-700 last:border-0 last:pb-0"
//                 >
//                   <div className="w-2 h-2 bg-black dark:bg-white rounded-full mt-2 shrink-0" />
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium dark:text-white">{activity.action}</p>
//                     <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
//                       {activity.detail}
//                     </p>
//                     <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
//                       {activity.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Quick Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6"
//           >
//             <h2 className="text-xl font-bold mb-6 dark:text-white">Quick Actions</h2>
//             <div className="space-y-3">
//               {quickActions.map((action, index) => (
//                 <button
//                   key={index}
//                   onClick={action.onClick}
//                   className="w-full flex items-center gap-3 px-4 py-4 border border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
//                 >
//                   <Plus className="w-5 h-5 dark:text-white" />
//                   <span className="font-medium dark:text-white">{action.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* Additional Info */}
//             <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-neutral-600 dark:text-neutral-400">Last sync:</span>
//                   <span className="font-medium dark:text-white">2 hours ago</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-neutral-600 dark:text-neutral-400">Storage used:</span>
//                   <span className="font-medium dark:text-white">247 MB / 5 GB</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { StatCard } from '../../components/dashboard/StatCard'
import { FolderKanban, FileText, Briefcase, CheckCircle, Plus, Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useProjectsCount } from '../../../hooks/useProjects'
import { useBlogCount, useLastSynced, useSyncBlog, useBlogPosts } from '../../../hooks/useBlogs'
import { useRecentActivity } from '../../../hooks/useActivity'
import { useJobCounts } from '../../../hooks/useJobs'
import { useBoardCounts } from '../../../hooks/useBoard'
// import { useBlogPosts } from '../../hooks/useBlog'
import {useIsAdmin} from '../../../hooks/useIsAdmin'

export default function DashboardOverview() {
  const { data: projectCounts, isLoading: loadingProjects } = useProjectsCount()
  const { data: blogCounts, isLoading: loadingBlog } = useBlogCount()
  const { data: postsData } = useBlogPosts({ limit: 50 })
  const { data: activityData } = useRecentActivity()
  const { data: jobCountsData } = useJobCounts()
  const { data: boardCountsData } = useBoardCounts()
  const syncBlog = useSyncBlog()
  const isAdmin = useIsAdmin()

  const projects = projectCounts?.data ?? {}
  const blog = blogCounts?.data ?? {}
  const posts = postsData?.data ?? []
  const recentActivity = activityData?.data ?? []
  const jobCounts = jobCountsData?.data ?? {}
  const boardCounts = boardCountsData?.data ?? {}

  const lastSynced = posts[0]?.synced_at
    ? new Date(posts[0].synced_at).toLocaleString()
    : 'Never'

  const isLoading = loadingProjects || loadingBlog

  const stats = [
    {
      icon: FolderKanban,
      label: 'Total Projects',
      value: isLoading ? '...' : (isAdmin ? projects.total ?? 0 : '#')
    },
    {
      icon: FileText,
      label: 'Published Posts',
      value: isLoading ? '...' : (isAdmin ? blog.total ?? 0 : '#')
    },
    { icon: Briefcase, label: 'Open Applications', value: isLoading ? '...' : (isAdmin ? jobCounts.applied ?? 0 : '#') },
    {
      icon: CheckCircle,
      label: 'Active Tickets',
      value: isLoading ? '...' : (isAdmin ? boardCounts.active_tickets ?? 0 : '#')
    }
  ]

  // derive recent activity from real data
  // const recentActivity = [
  //   ...(posts.slice(0, 2).map(p => ({
  //     action: 'Blog post synced',
  //     detail: p.title,
  //     time: new Date(p.synced_at).toLocaleDateString()
  //   }))),
  // ]

  const quickActions = [
    { label: 'Add Project', onClick: () => window.location.href = '/dashboard/projects' },
    { label: 'Sync Hashnode', onClick: () => syncBlog.mutate() },
    { label: 'Add Application', onClick: () => window.location.href = '/dashboard/jobs' },
    { label: 'New Ticket',       onClick: () => window.location.href = '/dashboard/board' },
  ]

  return (
    <DashboardLayout title="Overview">
      <div className="max-w-7xl space-y-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <h2 className="text-xl font-bold mb-6 dark:text-white">Recent Activity</h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-5 h-5 animate-spin text-neutral-400" />
              </div>
            ) : recentActivity.length === 0 ? (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 py-10 text-center">
                No activity yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-700 last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium dark:text-white">{activity.message}</p>
                      {/* <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                        {activity.detail}
                      </p> */}
                      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6"
          >
            <h2 className="text-xl font-bold mb-6 dark:text-white">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  disabled={!isAdmin}
                  className="w-full flex items-center gap-3 px-4 py-4 border border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5 dark:text-white" />
                  <span className="font-medium dark:text-white">{action.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Last sync:</span>
                  <span className="font-medium dark:text-white">{lastSynced}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Published projects:</span>
                  <span className="font-medium dark:text-white">
                    {isLoading ? '...' : (isAdmin ? projects.published ?? 0 : '#')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Draft projects:</span>
                  <span className="font-medium dark:text-white">
                    {isLoading ? '...' : (isAdmin ? projects.draft ?? 0 : '#')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Board projects:</span>
                  <span className="font-medium dark:text-white">
                    {isLoading ? '...' : (isAdmin ? boardCounts.total_projects ?? 0 : '#')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </DashboardLayout>
  )
}