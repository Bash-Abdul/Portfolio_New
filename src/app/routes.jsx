// // import { createBrowserRouter } from "react-router";
// // import Error from "./Error";

// // export const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     lazy: async () => ({ Component: (await import("./pages/Home")).default }),
// //   },
// //   {
// //     path: "/about",
// //     lazy: async () => ({ Component: (await import("./pages/AboutPage")).default }),
// //   },
// //   {
// //     path: "/projects",
// //     lazy: async () => ({ Component: (await import("./pages/ProjectsPage")).default }),
// //   },
// //   {
// //     path: "/blog",
// //     lazy: async () => ({ Component: (await import("./pages/BlogPage")).default }),
// //   },
// //   {
// //     path: "/blog/:slug",
// //     lazy: async () => ({ Component: (await import("./pages/BlogPost")).default }),
// //   },
// //   {
// //     path: "/dashboard",
// //     lazy: async () => ({ Component: (await import("./pages/dashboard/DashboardOverview")).default }),
// //     // Component: DashboardOverview,
// //   },
// //   {
// //     path: "/dashboard/projects",
// //     lazy: async () => ({ Component: (await import("./pages/dashboard/DashboardProjects")).default }),
// //     // Component: DashboardProjects,
// //   },
// //   {
// //     path: "/dashboard/blog",
// //     lazy: async () => ({ Component: (await import("./pages/dashboard/DashboardBlog")).default }),
// //     // Component: DashboardBlog,
// //   },
// //   {
// //     path: "/dashboard/github",
// //     lazy: async () => ({ Component: (await import("./pages/dashboard/DashboardGithub")).default }),
// //     // Component: DashboardGithub,
// //   },
// //   // {
// //   //   path: '/loader',
// //   //   lazy: async () => ({ Component: (await import("./components/Loader")).default }),
// //   // },
// //   { path: "*", Component: Error },
// // ]);

// import { createBrowserRouter } from "react-router"
// import Error from "./Error"
// import { ProtectedRoute } from "./components/ProtectedRoute"

// export const router = createBrowserRouter([
//   // Public routes
//   {
//     path: "/",
//     lazy: async () => ({ Component: (await import("./pages/Home")).default }),
//   },
//   {
//     path: "/about",
//     lazy: async () => ({ Component: (await import("./pages/AboutPage")).default }),
//   },
//   {
//     path: "/projects",
//     lazy: async () => ({ Component: (await import("./pages/ProjectsPage")).default }),
//   },
//   {
//     path: "/blog",
//     lazy: async () => ({ Component: (await import("./pages/BlogPage")).default }),
//   },
//   {
//     path: "/blog/:slug",
//     lazy: async () => ({ Component: (await import("./pages/BlogPost")).default }),
//   },
//   {
//     path: "/login",
//     lazy: async () => ({ Component: (await import("./pages/LoginPage")).default }),
//   },

//   // Protected dashboard routes — wrapped in ProtectedRoute layout
//   {
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: "/dashboard",
//         lazy: async () => ({ Component: (await import("./pages/dashboard/DashboardOverview")).default }),
//       },
//       {
//         path: "/dashboard/projects",
//         lazy: async () => ({ Component: (await import("./pages/dashboard/DashboardProjects")).default }),
//       },
//       {
//         path: "/dashboard/blog",
//         lazy: async () => ({ Component: (await import("./pages/dashboard/DashboardBlog")).default }),
//       },
//       {
//         path: "/dashboard/github",
//         lazy: async () => ({ Component: (await import("./pages/dashboard/DashboardGithub")).default }),
//       },
//     ]
//   },

//   { path: "*", Component: Error },
// ])

import { createBrowserRouter } from "react-router"
import Error from "./Error"

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => ({ Component: (await import("./pages/Home")).default }),
  },
  {
    path: "/about",
    lazy: async () => ({ Component: (await import("./pages/AboutPage")).default }),
  },
  {
    path: "/projects",
    lazy: async () => ({ Component: (await import("./pages/ProjectsPage")).default }),
  },
    {
    path: "/projects/:slug",
    lazy: async () => ({ Component: (await import("./pages/ProjectDetail")).default }),
  },
  {
    path: "/blog",
    lazy: async () => ({ Component: (await import("./pages/BlogPage")).default }),
  },
  {
    path: "/blog/:slug",
    lazy: async () => ({ Component: (await import("./pages/BlogPost")).default }),
  },
  {
    path: "/login",
    lazy: async () => ({ Component: (await import("./pages/LoginPage")).default }),
  },
  {
    path: "/dashboard",
    lazy: async () => {
      const { default: Component } = await import("./pages/dashboard/DashboardOverview")
      const { ProtectedRoute } = await import("./components/ProtectedRoute")
      const Wrapped = () => <ProtectedRoute><Component /></ProtectedRoute>
      return { Component: Wrapped }
    },
  },
  {
    path: "/dashboard/projects",
    lazy: async () => {
      const { default: Component } = await import("./pages/dashboard/DashboardProjects")
      const { ProtectedRoute } = await import("./components/ProtectedRoute")
      const Wrapped = () => <ProtectedRoute><Component /></ProtectedRoute>
      return { Component: Wrapped }
    },
  },
  {
    path: "/dashboard/blog",
    lazy: async () => {
      const { default: Component } = await import("./pages/dashboard/DashboardBlog")
      const { ProtectedRoute } = await import("./components/ProtectedRoute")
      const Wrapped = () => <ProtectedRoute><Component /></ProtectedRoute>
      return { Component: Wrapped }
    },
  },
  {
    path: "/dashboard/github",
    lazy: async () => {
      const { default: Component } = await import("./pages/dashboard/DashboardGithub")
      const { ProtectedRoute } = await import("./components/ProtectedRoute")
      const Wrapped = () => <ProtectedRoute><Component /></ProtectedRoute>
      return { Component: Wrapped }
    },
  },
  {
    path: "/dashboard/jobs",
    lazy: async () => {
      const { default: Component } = await import("./pages/dashboard/DashboardJobs")
      const { ProtectedRoute } = await import("./components/ProtectedRoute")
      const Wrapped = () => <ProtectedRoute><Component /></ProtectedRoute>
      return { Component: Wrapped }
    },
  },
  {
    path: "/dashboard/board",
    lazy: async () => {
      const { default: Component } = await import("./pages/dashboard/DashboardBoard")
      const { ProtectedRoute } = await import("./components/ProtectedRoute")
      const Wrapped = () => <ProtectedRoute><Component /></ProtectedRoute>
      return { Component: Wrapped }
    },
  },
  {
    path: "/dashboard/board/:projectId",
    lazy: async () => {
      const { default: Component } = await import("./pages/dashboard/ProjectTickets")
      const { ProtectedRoute } = await import("./components/ProtectedRoute")
      const Wrapped = () => <ProtectedRoute><Component /></ProtectedRoute>
      return { Component: Wrapped }
    },
  },
  {
    path: "/dashboard/logs",
    lazy: async () => {
      const { default: Component } = await import("./pages/dashboard/DashboardWeeklyLogs")
      const { ProtectedRoute } = await import("./components/ProtectedRoute")
      const Wrapped = () => <ProtectedRoute><Component /></ProtectedRoute>
      return { Component: Wrapped }
    },
  },
  { path: "*", Component: Error },
])