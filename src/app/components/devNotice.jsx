import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

export function DevNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // check localStorage on mount — if flag isn't set, show the notice
    // localStorage persists across page refreshes and browser sessions
    // but is specific to each browser/device — different visitors each see it once
    const seen = localStorage.getItem('dev_notice_seen')
    if (!seen) setIsVisible(true)
  }, []) // empty dependency array — only runs once on mount

  function handleClose() {
    // set the flag so it never shows again on this browser
    localStorage.setItem('dev_notice_seen', 'true')
    setIsVisible(false)
  }

  return (
    // AnimatePresence enables exit animations — without it
    // the component would just disappear instantly when isVisible becomes false
    <AnimatePresence>
      {isVisible && (
        <>
          {/* backdrop — clicking it also closes the notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* modal — centered with spring animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 z-50 p-8"
          >
            <div className="flex items-start justify-between mb-4">
              {/* pulsing dot — visual indicator that site is active/live */}
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse" />
              <button
                onClick={handleClose}
                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5 dark:text-white" />
              </button>
            </div>

            <h2 className="text-xl font-bold mb-3 dark:text-white">
              Work in Progress
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
              This portfolio and dashboard are actively being built. Some features may be incomplete or change frequently. Feel free to explore — just know things are still taking shape.
            </p>

            <button
              onClick={handleClose}
              className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors text-sm font-medium"
            >
              Got it
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}