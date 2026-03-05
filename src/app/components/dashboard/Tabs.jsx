import { motion } from "motion/react";

// interface TabsProps {
//   tabs: string[];
//   activeTab: string;
//   onChange: (tab: string) => void;
// }

export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className="relative pb-3 text-sm font-medium transition-colors"
          >
            <span
              className={
                activeTab === tab
                  ? "text-black dark:text-white"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
              }
            >
              {tab}
            </span>
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
