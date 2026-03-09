import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";
import SEO from "../components/SEO";
import { GitHubActivity } from "../components/GithubActivity";
import { Chatbot } from "../components/Chatbot";
import { ActivityFeed } from "../components/ActivityFeed";
import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";


export default function Home() {
  const [isActivityFeedOpen, setIsActivityFeedOpen] = useState(false);
  return (
    <div className="size-full bg-white dark:bg-neutral-900">
        <SEO
        title="Bashir Abdulah | React Frontend Developer - Modern Web and App Interfaces"
        // description="About Bashir Abdulah, also known as Bash Abdul, a React frontend developer creating fast, accessible, user-friendly web experiences."
        description="Welcome to the portfolio of Bashir Abdulah, a React frontend developer crafting modern, responsive websites and mobile apps with clean UI/UX design and scalable performance."
        url="/"
      />
      <Navigation />
      <Hero />

            {/* Activity Feed Trigger Button */}
            <motion.button
        onClick={() => setIsActivityFeedOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 flex items-center gap-2 px-5 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-lg hover:shadow-xl group"
      >
        <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
        <span className="font-medium hidden sm:inline">What I'm Working On</span>
        <span className="font-medium sm:hidden">Activity</span>
      </motion.button>

      <ActivityFeed 
        isOpen={isActivityFeedOpen} 
        onClose={() => setIsActivityFeedOpen(false)} 
      />

      <About />
      <Projects />
      <Skills />
      <GitHubActivity />
      <Contact />
      <Chatbot />
    </div>
  );
}