import { motion } from "motion/react";

// interface StatCardProps {
//   icon: LucideIcon;
//   label: string;
//   value: number | string;
//   index?: number;
// }

export function StatCard({ icon: Icon, label, value, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{label}</p>
          <p className="text-4xl font-bold dark:text-white">{value}</p>
        </div>
        <div className="p-3 bg-neutral-100 dark:bg-neutral-700">
          <Icon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
        </div>
      </div>
    </motion.div>
  );
}
