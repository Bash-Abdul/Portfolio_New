// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { X, Calendar, Code, CheckCircle, Lightbulb, Github, Star, GitFork, TrendingUp, ArrowRight, AlertCircle } from "lucide-react";
// import { Link } from "react-router";
// import { useWeeklyLogsLatest } from "../../hooks/useWeeklyLogs";

// // interface ProjectLog {
// //   id: string;
// //   projectName: string;
// //   achievements: string[];
// //   challenges: string[];
// //   features: string[];
// //   learnings: string[];
// // }

// // interface WeeklyLog {
// //   id: string;
// //   weekStart: string;
// //   weekEnd: string;
// //   projects: ProjectLog[];
// //   createdAt: string;
// // }

// // interface GitHubRepo {
// //   name: string;
// //   description: string;
// //   stars: number;
// //   forks: number;
// //   language: string;
// //   lastUpdate: string;
// // }

// // interface ActivityFeedProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// // }

// const mockRepos = [
//   {
//     name: "portfolio-v2",
//     description: "Modern portfolio website built with React, TypeScript, and Tailwind CSS",
//     stars: 42,
//     forks: 8,
//     language: "TypeScript",
//     lastUpdate: "2 days ago"
//   },
//   {
//     name: "dashboard-system",
//     description: "Comprehensive dashboard with project management and analytics",
//     stars: 28,
//     forks: 5,
//     language: "React",
//     lastUpdate: "5 days ago"
//   }
// ];

// export function ActivityFeed({ isOpen, onClose }) {
//   const { data } = useWeeklyLogsLatest();
//   const latestLogs = data?.data ?? null
//   const [weeklyLogs, setWeeklyLogs] = useState([]);
//   const [githubRepos] = useState(mockRepos);

//   useEffect(() => {
//     if (isOpen) {
//       const savedLogs = localStorage.getItem("weeklyLogs");
//       if (savedLogs) {
//         setWeeklyLogs(JSON.parse(savedLogs));
//       }
//     }
//   }, [isOpen]);

//   const latestLog = weeklyLogs[0];

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric"
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ type: "spring", duration: 0.5 }}
//             className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl max-h-[85vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 z-50 overflow-hidden flex flex-col"
//           >
//             {/* Header */}
//             <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
//               <div>
//                 <h2 className="text-2xl font-bold dark:text-white">What I've Been Up To</h2>
//                 <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
//                   Latest updates and progress
//                 </p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
//               >
//                 <X className="w-6 h-6 dark:text-white" />
//               </button>
//             </div>

//             {/* Content */}
//             <div className="overflow-y-auto flex-1">
//               <div className="p-6 space-y-8">
//                 {/* Latest Weekly Log */}
//                 {latestLog && (
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center gap-2">
//                         <Calendar className="w-5 h-5 text-blue-500" />
//                         <h3 className="text-lg font-bold dark:text-white">This Week's Progress</h3>
//                       </div>

//                       {
//                         import.meta.env.DEV && (
//                           <Link
//                           to="/dashboard/logs"
//                           className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
//                         >
//                           View All
//                           <ArrowRight className="w-4 h-4" />
//                         </Link>
//                         )
//                       }
                     
//                     </div>

//                     <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 space-y-4">
//                       <div className="text-sm text-neutral-600 dark:text-neutral-400">
//                         {formatDate(latestLog.weekStart)} - {formatDate(latestLog.weekEnd)}
//                       </div>

//                       {/* Projects */}
//                       {latestLog.projects.length > 0 && (
//                         <div>
//                           <div className="flex items-center gap-2 mb-2">
//                             <Code className="w-4 h-4 text-blue-500" />
//                             <h4 className="font-medium text-sm dark:text-white">Projects</h4>
//                           </div>
//                           <div className="space-y-1">
//                             {latestLog.projects.slice(0, 3).map((project, index) => (
//                               <div
//                                 key={index}
//                                 className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
//                               >
//                                 <span className="text-blue-500">•</span>
//                                 <span>{project.projectName}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Achievements */}
//                       {latestLog.projects.some(project => project.achievements.length > 0) && (
//                         <div>
//                           <div className="flex items-center gap-2 mb-2">
//                             <CheckCircle className="w-4 h-4 text-green-500" />
//                             <h4 className="font-medium text-sm dark:text-white">Recent Wins</h4>
//                           </div>
//                           <div className="space-y-1">
//                             {latestLog.projects.flatMap(project => project.achievements.slice(0, 3)).map((achievement, index) => (
//                               <div
//                                 key={index}
//                                 className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
//                               >
//                                 <span className="text-green-500">•</span>
//                                 <span>{achievement}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Learnings */}
//                       {latestLog.projects.some(project => project.learnings.length > 0) && (
//                         <div>
//                           <div className="flex items-center gap-2 mb-2">
//                             <Lightbulb className="w-4 h-4 text-yellow-500" />
//                             <h4 className="font-medium text-sm dark:text-white">Key Learnings</h4>
//                           </div>
//                           <div className="space-y-1">
//                             {latestLog.projects.flatMap(project => project.learnings.slice(0, 2)).map((learning, index) => (
//                               <div
//                                 key={index}
//                                 className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
//                               >
//                                 <span className="text-yellow-500">•</span>
//                                 <span>{learning}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* GitHub Activity */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <Github className="w-5 h-5 text-neutral-900 dark:text-white" />
//                     <h3 className="text-lg font-bold dark:text-white">GitHub Activity</h3>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     {githubRepos.map((repo, index) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 hover:border-black dark:hover:border-white transition-colors"
//                       >
//                         <h4 className="font-bold dark:text-white mb-2">{repo.name}</h4>
//                         <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
//                           {repo.description}
//                         </p>
//                         <div className="flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
//                           <div className="flex items-center gap-1">
//                             <Star className="w-3 h-3" />
//                             <span>{repo.stars}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <GitFork className="w-3 h-3" />
//                             <span>{repo.forks}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <div className="w-2 h-2 bg-blue-500 rounded-full" />
//                             <span>{repo.language}</span>
//                           </div>
//                         </div>
//                         <div className="text-xs text-neutral-500 mt-2">
//                           Updated {repo.lastUpdate}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quick Stats */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <TrendingUp className="w-5 h-5 text-purple-500" />
//                     <h3 className="text-lg font-bold dark:text-white">Current Focus</h3>
//                   </div>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
//                       <div className="text-2xl font-bold dark:text-white">12</div>
//                       <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
//                         Active Projects
//                       </div>
//                     </div>
//                     <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
//                       <div className="text-2xl font-bold dark:text-white">24</div>
//                       <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
//                         Blog Posts
//                       </div>
//                     </div>
//                     <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
//                       <div className="text-2xl font-bold dark:text-white">70+</div>
//                       <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
//                         GitHub Stars
//                       </div>
//                     </div>
//                     <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
//                       <div className="text-2xl font-bold dark:text-white">{weeklyLogs.length}</div>
//                       <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
//                         Weeks Logged
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 shrink-0">
//               <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
//                 Want to see more?{" "}
//                 <Link
//                   to="/projects"
//                   onClick={onClose}
//                   className="text-black dark:text-white font-medium hover:underline"
//                 >
//                   View all projects
//                 </Link>
//                 {" or "}
//                 <Link
//                   to="/blog"
//                   onClick={onClose}
//                   className="text-black dark:text-white font-medium hover:underline"
//                 >
//                   read my blog
//                 </Link>
//               </p>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Code, CheckCircle, Lightbulb, Github, Star, GitFork, TrendingUp, ArrowRight, AlertCircle, Wrench, Plus } from "lucide-react";
import { Link } from "react-router";
import { useWeeklyLogsLatest, useWeeklyLogs } from "../../hooks/useWeeklyLogs";

const mockRepos = [
  {
    name: "portfolio-v2",
    description: "Modern portfolio website built with React, TypeScript, and Tailwind CSS",
    stars: 42,
    forks: 8,
    language: "TypeScript",
    lastUpdate: "2 days ago"
  },
  {
    name: "dashboard-system",
    description: "Comprehensive dashboard with project management and analytics",
    stars: 28,
    forks: 5,
    language: "React",
    lastUpdate: "5 days ago"
  }
];

export function ActivityFeed({ isOpen, onClose }) {
  const { data, isLoading } = useWeeklyLogsLatest()
  const { data: logsData } = useWeeklyLogs()
  const latestLog = data?.data ?? null
  const [githubRepos] = useState(mockRepos)
  const weeksLogged = logsData?.data?.length ?? 0

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl max-h-[85vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-2xl font-bold dark:text-white">What I've Been Up To</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Latest updates and progress
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-6 h-6 dark:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1">
              <div className="p-6 space-y-8">

                {/* Latest Weekly Log */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-bold dark:text-white">This Week's Progress</h3>
                    </div>
                    {import.meta.env.DEV && (
                      <Link
                        to="/dashboard/logs"
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                      >
                        View All
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-5 h-5 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : !latestLog ? (
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 py-4 text-center">
                      No weekly logs yet.
                    </div>
                  ) : (
                    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 space-y-4">
                      {/* date range */}
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatDate(latestLog.week_start)} — {formatDate(latestLog.week_end)}
                      </div>

                      {/* all project names */}
                      {latestLog.projects.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Code className="w-4 h-4 text-blue-500" />
                            <h4 className="font-medium text-sm dark:text-white">Projects</h4>
                          </div>
                          <div className="space-y-1">
                            {latestLog.projects.slice(0, 3).map((project, index) => (
                              <div key={index} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                                <span className="text-blue-500">•</span>
                                <span>{project.projectName}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* detailed sections from first project only */}
                      {latestLog.projects[0] && [
                        { items: latestLog.projects[0].achievements, label: "Achievements",         icon: <CheckCircle className="w-4 h-4 text-green-500" />,  color: "text-green-500" },
                        { items: latestLog.projects[0].challenges,   label: "Challenges",           icon: <AlertCircle className="w-4 h-4 text-orange-500" />, color: "text-orange-500" },
                        { items: latestLog.projects[0].solutions,    label: "Solutions",            icon: <Wrench className="w-4 h-4 text-blue-400" />,       color: "text-blue-400" },
                        { items: latestLog.projects[0].features,     label: "Features Implemented", icon: <Plus className="w-4 h-4 text-purple-500" />,       color: "text-purple-500" },
                        { items: latestLog.projects[0].learnings,    label: "What I Learned",       icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,  color: "text-yellow-500" },
                      ].map(({ items, label, icon, color }) =>
                        items?.length > 0 && (
                          <div key={label}>
                            <div className="flex items-center gap-2 mb-2">
                              {icon}
                              <h4 className="font-medium text-sm dark:text-white">{label}</h4>
                            </div>
                            <div className="space-y-1">
                              {items.slice(0, 3).map((item, i) => (
                                <div key={i} className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                                  <span className={color}>•</span>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* GitHub Activity */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Github className="w-5 h-5 text-neutral-900 dark:text-white" />
                    <h3 className="text-lg font-bold dark:text-white">GitHub Activity</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {githubRepos.map((repo, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 hover:border-black dark:hover:border-white transition-colors"
                      >
                        <h4 className="font-bold dark:text-white mb-2">{repo.name}</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{repo.description}</p>
                        <div className="flex items-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            <span>{repo.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            <span>{repo.forks}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span>{repo.language}</span>
                          </div>
                        </div>
                        <div className="text-xs text-neutral-500 mt-2">Updated {repo.lastUpdate}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-bold dark:text-white">Current Focus</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
                      <div className="text-2xl font-bold dark:text-white">12</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Active Projects</div>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
                      <div className="text-2xl font-bold dark:text-white">24</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Blog Posts</div>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
                      <div className="text-2xl font-bold dark:text-white">70+</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">GitHub Stars</div>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 text-center">
                      <div className="text-2xl font-bold dark:text-white">{weeksLogged}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">Week{weeksLogged <= 1 ? '':'s'} Logged</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 shrink-0">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                Want to see more?{" "}
                <Link to="/projects" onClick={onClose} className="text-black dark:text-white font-medium hover:underline">
                  View all projects
                </Link>
                {" or "}
                <Link to="/blog" onClick={onClose} className="text-black dark:text-white font-medium hover:underline">
                  read my blog
                </Link>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}