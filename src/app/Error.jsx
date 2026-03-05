// import React from 'react'
// // import { Link } from 'react-router-dom'
// import { Link } from 'react-router'
// // import SEO from "../../components/SEO";
// // import SEO from '../components/SEO'
// import SEO from './components/SEO'
// import { useLocation } from 'react-router'

// const Error = () => {
//   return (
//     <div className='flex items-center justify-center flex-col h-screen text-white gap-3'>
//       <SEO title="404 Page" url="*" />
//       <h1>404 Page</h1>
//       <p>oops.. Page doesn't exist 😑</p>
//       <Link className='bg-red-400 py-3 px-5 text-white text-sm' to={'/'}>Return to Main</Link>
//     </div>
//   )
// }

// export default Error

import { motion } from "motion/react";
import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import {Navigation} from './components/Navigation'
import SEO from '../app/components/SEO'

export default function Error() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEO title="404 Page" url="*" />
      <Navigation />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-4xl text-center mt-20">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-bold leading-none tracking-tighter"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.1)",
                  "0 0 40px rgba(255,255,255,0.2)",
                  "0 0 20px rgba(255,255,255,0.1)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
              Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* CTA Buttons */}
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
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg">Go Back</span>
            </button>
          </motion.div>

          {/* Decorative text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <p className="text-sm text-neutral-600 font-mono">
              ERROR_CODE: 404 | PAGE_NOT_FOUND
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
