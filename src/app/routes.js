// import { createBrowserRouter } from "react-router";
// import Home from "./pages/Home";
// import AboutPage from "./pages/AboutPage";
// import ProjectsPage from "./pages/ProjectsPage";
// import BlogPage from "./pages/BlogPage";
// import BlogPost from "./pages/BlogPost";
// import Error from "./Error";

// export const router = createBrowserRouter([
//   { path: "/", Component: Home },
//   { path: "/about", Component: AboutPage },
//   { path: "/projects", Component: ProjectsPage },
//   { path: "/blog", Component: BlogPage },
//   { path: "/blog/:slug", Component: BlogPost },
//   { path: "*", Component: Error}
// ]);

import { createBrowserRouter } from "react-router";
import Error from "./Error";

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
    path: "/blog",
    lazy: async () => ({ Component: (await import("./pages/BlogPage")).default }),
  },
  {
    path: "/blog/:slug",
    lazy: async () => ({ Component: (await import("./pages/BlogPost")).default }),
  },
  { path: "*", Component: Error },
]);