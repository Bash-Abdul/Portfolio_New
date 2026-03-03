// import { motion } from "motion/react";
// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router";
// import { ThemeToggle } from "./ThemeToggle";

// export function Navigation() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const isHomePage = location.pathname === "/";

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, delay: 0.2 }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled || !isHomePage
//           ? " dark:bg-neutral-900/80 backdrop-blur-md shadow-sm"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="flex items-center justify-between py-6">
//           <Link
//             to="/"
//             className={`text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${
//               isScrolled || !isHomePage ? "text-black dark:text-white" : "text-white"
//             }`}
//           >
//             Bash-Abdul.
//           </Link>

//           <div className="flex items-center gap-6">
//           <Link
//               to="/"
//               className={`text-sm hover:opacity-60 transition-opacity hidden md:block ${
//                 isScrolled || !isHomePage ? "text-black dark:text-white" : "text-white"
//               }`}
//             >
//              Home
//             </Link>
//             <Link
//               to="/projects"
//               className={`text-sm hover:opacity-60 transition-opacity hidden md:block ${
//                 isScrolled || !isHomePage ? "text-black dark:text-white" : "text-white"
//               }`}
//             >
//               Work
//             </Link>
//             <Link
//               to="/about"
//               className={`text-sm hover:opacity-60 transition-opacity hidden md:block ${
//                 isScrolled || !isHomePage ? "text-black dark:text-white" : "text-white"
//               }`}
//             >
//               About
//             </Link>
//             <Link
//               to="/blog"
//               className={`text-sm hover:opacity-60 transition-opacity hidden md:block ${
//                 isScrolled || !isHomePage ? "text-black dark:text-white" : "text-white"
//               }`}
//             >
//               Blog
//             </Link>
//             <ThemeToggle isScrolled={isScrolled} isHomePage={isHomePage} />
//             <Link
//               to="/#contact"
//               className={`px-6 py-3 border transition-all duration-300 ${
//                 isScrolled || !isHomePage
//                   ? "border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
//                   : "border-white text-white hover:bg-white hover:text-black"
//               }`}
//             >
//               Contact
//             </Link>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// }

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useNavigation } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import heroImage from '../assets/hero.png'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // new stuff?
  const navigation = useNavigation(); // add this
  const isPageLoading = navigation.state === "loading";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === "/";
  const darkNav = isHomePage || location.pathname === "/projects"

  // On home page, navbar is dark when at hero, light after scrolling
  // On other pages, navbar is always light
  const isDarkNav = darkNav && !isScrolled;

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      // Already on homepage, just scroll to contact
      const contactSection = document.getElementById("contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage first, then scroll
      navigate("/");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 0.9 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-100 h-0.5 bg-black dark:bg-white"
          />
        )}
      </AnimatePresence>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isDarkNav
            ? "bg-transparent"
            : "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm"
          }`}
      >
        <div className="max-w-350 mx-auto px-6">
          <div className="flex items-center justify-between py-6">
            <Link
              to="/"
              className={`text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${isDarkNav ? "text-white" : "text-black dark:text-white"
                }`}
            >
              {/* Bashir. */}
              <img src={heroImage} alt="BA" width={80} height={80} loading="lazy"
                decoding="async" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">

              <Link
                to="/about"
                className={`text-sm hover:opacity-60 transition-opacity ${isDarkNav ? "text-white" : "text-black dark:text-white"
                  }`}
              >
                About
              </Link>

              <Link
                to="/projects"
                className={`text-sm hover:opacity-60 transition-opacity ${isDarkNav ? "text-white" : "text-black dark:text-white"
                  }`}
              >
                Work
              </Link>

              <Link
                to="/blog"
                className={`text-sm hover:opacity-60 transition-opacity ${isDarkNav ? "text-white" : "text-black dark:text-white"
                  }`}
              >
                Blog
              </Link>
              <ThemeToggle isScrolled={!isDarkNav} isHomePage={isHomePage} />
              <a
                href="#contact"
                onClick={handleContactClick}
                className={`px-6 py-3 border transition-all duration-300 cursor-pointer ${isDarkNav
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
                  }`}
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle isScrolled={!isDarkNav} isHomePage={isHomePage} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors duration-300 ${isDarkNav
                    ? "text-white hover:text-neutral-300"
                    : "text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300"
                  }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-22 left-0 right-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 md:hidden"
          >
            <div className="max-w-350 mx-auto px-6 py-6">
              <nav className="flex flex-col gap-4">
                <Link
                  to="/projects"
                  className="text-lg py-3 hover:opacity-60 transition-opacity dark:text-white"
                >
                  Work
                </Link>
                <Link
                  to="/about"
                  className="text-lg py-3 hover:opacity-60 transition-opacity dark:text-white"
                >
                  About
                </Link>
                <Link
                  to="/blog"
                  className="text-lg py-3 hover:opacity-60 transition-opacity dark:text-white"
                >
                  Blog
                </Link>
                <a
                  href="#contact"
                  onClick={handleContactClick}
                  className="text-lg py-3 px-6 border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 text-center cursor-pointer"
                >
                  Contact
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}