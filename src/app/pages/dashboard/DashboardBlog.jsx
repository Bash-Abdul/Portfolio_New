// import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
// import { StatusBadge } from "../../components/dashboard/StatusBadge";
// import { SyncButton } from "../../components/dashboard/SyncButton";
// import { EmptyState } from "../../components/dashboard/EmptyState";
// import { FileText, ExternalLink } from "lucide-react";
// import { motion } from "motion/react";
// import { useState } from "react";

// // type BlogPost = {
// //   id: string;
// //   title: string;
// //   coverImage: string;
// //   publishedDate: string;
// //   status: "synced" | "pending";
// //   url: string;
// // };

// const mockPosts = [
//   {
//     id: "1",
//     title: "Building Modern Web Applications with React and TypeScript",
//     coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
//     publishedDate: "2024-03-01",
//     status: "synced",
//     url: "https://hashnode.com/post/1",
//   },
//   {
//     id: "2",
//     title: "The Future of Web Development: AI-Powered Tools",
//     coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
//     publishedDate: "2024-02-25",
//     status: "synced",
//     url: "https://hashnode.com/post/2",
//   },
//   {
//     id: "3",
//     title: "Mastering Tailwind CSS: Tips and Tricks",
//     coverImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400",
//     publishedDate: "2024-02-20",
//     status: "pending",
//     url: "https://hashnode.com/post/3",
//   },
// ];

// export default function DashboardBlog() {
//   const [posts] = useState(mockPosts);
//   const [lastSynced] = useState("2 hours ago");

//   const handleSync = async () => {
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//   };

//   const actions = <SyncButton onSync={handleSync} />;

//   return (
//     <DashboardLayout title="Blog Posts" actions={actions}>
//       <div className="max-w-7xl space-y-6">
//         {/* Info Banner */}
//         <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
//           <p className="text-sm text-blue-900 dark:text-blue-200">
//             Posts are read-only here. Edit them on Hashnode — changes sync automatically.
//           </p>
//         </div>

//         {/* Last Synced */}
//         <div className="flex items-center justify-between">
//           <p className="text-sm text-neutral-600 dark:text-neutral-400">
//             Last synced: <span className="font-medium dark:text-white">{lastSynced}</span>
//           </p>
//         </div>

//         {/* Posts Table */}
//         {posts.length === 0 ? (
//           <EmptyState
//             icon={FileText}
//             message="No posts synced yet. Hit Sync to pull from Hashnode."
//             action={{
//               label: "Sync Now",
//               onClick: handleSync,
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
//               <div className="col-span-1">Cover</div>
//               <div className="col-span-5">Title</div>
//               <div className="col-span-2">Published Date</div>
//               <div className="col-span-2">Status</div>
//               <div className="col-span-2">Actions</div>
//             </div>

//             {/* Table Body */}
//             <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
//               {posts.map((post, index) => (
//                 <motion.div
//                   key={post.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                   className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors items-center"
//                 >
//                   <div className="col-span-1">
//                     <img
//                       src={post.coverImage}
//                       alt={post.title}
//                       className="w-16 h-16 object-cover"
//                     />
//                   </div>
//                   <div className="col-span-5 font-medium dark:text-white">{post.title}</div>
//                   <div className="col-span-2 text-sm text-neutral-600 dark:text-neutral-400">
//                     {post.publishedDate}
//                   </div>
//                   <div className="col-span-2">
//                     <StatusBadge variant={post.status}>{post.status}</StatusBadge>
//                   </div>
//                   <div className="col-span-2">
//                     <a
//                       href={post.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 text-sm hover:underline dark:text-white"
//                     >
//                       View on Hashnode
//                       <ExternalLink className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }


import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { StatusBadge } from '../../components/dashboard/StatusBadge'
import { SyncButton } from '../../components/dashboard/SyncButton'
import { EmptyState } from '../../components/dashboard/EmptyState'
import { FileText, ExternalLink, Loader2 } from 'lucide-react'
import { motion } from 'motion/react'
import { useBlogPosts, useSyncBlog } from '../../../hooks/useBlogs'
import { useIsAdmin } from '../../../hooks/useIsAdmin'

export default function DashboardBlog() {
  const { data, isLoading, isError } = useBlogPosts({ limit: 50 })
  const syncBlog = useSyncBlog()
  const isAdmin = useIsAdmin()

  const posts = data?.data ?? []

  const lastSynced = data?.last_synced_at
    ? new Date(data.last_synced_at).toLocaleString()
    : 'Never'

  async function handleSync() {
    await syncBlog.mutateAsync()
  }

  const actions = <SyncButton onSync={handleSync} />

  if (isLoading) {
    return (
      <DashboardLayout title="Blog Posts" actions={actions}>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
        </div>
      </DashboardLayout>
    )
  }

  if (isError) {
    return (
      <DashboardLayout title="Blog Posts" actions={actions}>
        <div className="py-20 text-center text-red-500">
          Failed to load blog posts.
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Blog Posts" actions={actions}>
      <div className="max-w-7xl space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            Posts are read-only here. Edit them on Hashnode — changes sync automatically every 6 hours.
          </p>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Last synced:{' '}
            <span className="font-medium dark:text-white">{lastSynced}</span>
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <span className="font-medium dark:text-white">{posts.length}</span> posts
          </p>
        </div>

        {/* Sync error */}
        {syncBlog.isError && (
          <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            Sync failed — {syncBlog.error?.message ?? 'something went wrong'}
          </div>
        )}

        {/* Posts Table */}
        {posts.length === 0 ? (
          <EmptyState
            icon={FileText}
            message="No posts synced yet. Hit Sync to pull from Hashnode."
            action={{ label: 'Sync Now', onClick: handleSync }}
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
              <div className="col-span-1">Cover</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-2 min-w-0">Category</div>
              <div className="col-span-2 min-w-0">Published</div>
              <div className="col-span-2 min-w-0">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-[4rem_minmax(0,1fr)] xl:grid-cols-12 gap-4 p-4 sm:p-6 xl:py-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors items-center"
                >
                  {/* Cover */}
                  <div className="col-span-1">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-10 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-10 bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-neutral-400" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="col-span-1 xl:col-span-5 min-w-0 break-words font-medium dark:text-white leading-snug">
                    {post.title}
                  </div>

                  {/* Category */}
                  <div className="col-span-2 min-w-0">
                    {post.category ? (
                      <StatusBadge variant="synced">{post.category}</StatusBadge>
                    ) : (
                      <span className="text-sm text-neutral-400">—</span>
                    )}
                  </div>

                  {/* Published date */}
                  <div className="col-span-2 min-w-0 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="xl:hidden">Published: </span>{post.date
                      ? new Date(post.date).toLocaleDateString()
                      : '—'}
                  </div>

                  {/* Actions */}
                  {/* <div className="col-span-2 min-w-0">
                    
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm hover:underline dark:text-white"
                    >
                      View on Hashnode
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div> */}
                  {/* Actions */}
                  <div className="col-span-2 min-w-0">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => !isAdmin && e.preventDefault()}
                    className={!isAdmin ? 'opacity-50 cursor-not-allowed pointer-events-none' : "inline-flex min-h-11 items-center gap-2 text-sm hover:underline dark:text-white"}>
                    
                      View on Hashnode
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  )
}
