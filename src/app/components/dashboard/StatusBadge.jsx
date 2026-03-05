const variantStyles = {
    published: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    draft: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    synced: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    pending: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
    active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  
  export function StatusBadge({ variant, children }) {
    const styles = variantStyles[variant] ?? variantStyles.pending;
  
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${styles}`}
      >
        {children}
      </span>
    );
  }