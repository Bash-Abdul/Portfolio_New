import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Github,
  Home,
  Menu,
  X,
  LogOut,
  Briefcase,
  Kanban,
  BookOpen
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import heroImage from '../../assets/hero.png'
import { useLogout } from "../../../hooks/useAuth";
import { Chatbot } from "../Chatbot";

// interface DashboardLayoutProps {
//   children: ReactNode;
//   title: string;
//   actions?: ReactNode;
// }

const navItems = [
  { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { path: "/dashboard/blog", label: "Blog", icon: FileText },
  { path: "/dashboard/github", label: "GitHub", icon: Github },
  { path: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { path: "/dashboard/board", label: "Board", icon: Kanban },
  { path: "/dashboard/logs", label: "Weekly Logs", icon: BookOpen },
];

export function DashboardLayout({ children, title, actions }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const logout = useLogout()

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop: always visible, Mobile: slide in/out */}
      <aside className="fixed top-0 left-0 h-full w-60 bg-neutral-900 dark:bg-black text-white z-50 hidden lg:block">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-800">
            <Link to="/" className="text-2xl tracking-tight font-bold flex items-center">
            <img src={heroImage} alt="BA" width={60} height={60} loading="lazy"
                decoding="async" />
                BASHIR
            </Link>
            <p className="text-xs text-neutral-500 mt-1">Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors relative ${
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                  )}
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-neutral-800 space-y-2">
            <div className="px-4 py-2">
              <ThemeToggle isScrolled={true} isHomePage={false} />
            </div>
            <button
                  onClick={() => logout.mutate()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
            <button
              onClick={handleGoHome}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-60 bg-neutral-900 dark:bg-black text-white z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <Link to="/" className="text-2xl tracking-tight font-bold">
                    BASHIR
                  </Link>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-neutral-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Dashboard</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors relative ${
                        isActive
                          ? "bg-neutral-800 text-white"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />
                      )}
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer Actions */}
              <div className="p-4 border-t border-neutral-800 space-y-2">
                <div className="px-4 py-2">
                  <ThemeToggle isScrolled={true} isHomePage={false} />
                </div>
                <button
                  onClick={() => logout.mutate()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
                <button
                  onClick={handleGoHome}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Back to Portfolio</span>
                </button>
                
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="min-w-0 lg:ml-60">
        {/* Top Bar */}
        <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open navigation"
                className="lg:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Menu className="w-5 h-5 dark:text-white" />
              </button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold break-words dark:text-white">{title}</h1>
            </div>
            {actions && <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">{actions}</div>}
          </div>
        </header>

        {/* Page Content */}
        <main className="min-w-0 p-4 sm:p-6">{children}</main>
      </div>
      <Chatbot />
    </div>
  );
}
