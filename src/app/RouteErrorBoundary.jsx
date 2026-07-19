import { motion } from "motion/react"
import { Link, isRouteErrorResponse, useRouteError } from "react-router"
import { Home, ArrowLeft, RefreshCw } from "lucide-react"
import { Navigation } from "./components/Navigation"
import SEO from "./components/SEO"

export default function RouteErrorBoundary() {
  const error = useRouteError()
  const isNotFound = isRouteErrorResponse(error) && error.status === 404

  const title = isNotFound ? "Page Not Found" : "Something Went Wrong"
  const message = isNotFound
    ? "The page you requested could not be found or may have moved."
    : "A problem occurred while loading this page. Please try again."

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEO title={title} url="*" />
      <Navigation />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-[18vw] md:text-[12vw] lg:text-[10vw] font-bold leading-none tracking-tighter">
              {isNotFound ? "404" : "500"}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight">{title}</h2>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">{message}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              <span className="text-lg">Go Home</span>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="group flex items-center gap-3 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="text-lg">Retry</span>
            </button>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 px-8 py-4 border border-white/50 text-white/90 hover:bg-white/10 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg">Go Back</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
