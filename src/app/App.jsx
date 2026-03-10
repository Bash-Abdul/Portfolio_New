import { RouterProvider } from "react-router";
import { router } from "./routes.jsx";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from 'sonner'
// import { Analytics } from "@vercel/analytics/next"

function PageLoader() {
  return (
    <div className="size-full h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} fallbackElement={<PageLoader />} />
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  );
}