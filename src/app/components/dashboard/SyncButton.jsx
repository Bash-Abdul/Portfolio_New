import { useState } from "react";
import { RefreshCw, Check } from "lucide-react";
import { motion } from "motion/react";
import { useIsAdmin } from "../../../hooks/useIsAdmin";

// interface SyncButtonProps {
//   onSync: () => Promise<void>;
//   label?: string;
// }

export function SyncButton({ onSync, label = "Sync Now" }) {
  const [state, setState] = useState("idle");
  const isAdmin = useIsAdmin();

  const handleSync = async () => {
    setState("loading");
    try {
      await onSync();
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={state === "loading" || !isAdmin}
      className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 hover:border-black dark:hover:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {state === "loading" && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-4 h-4" />
        </motion.div>
      )}
      {state === "success" && <Check className="w-4 h-4 text-green-600" />}
      {state === "idle" && <RefreshCw className="w-4 h-4" />}
      <span className="dark:text-white">
        {state === "loading" ? "Syncing..." : state === "success" ? "Synced!" : label}
      </span>
    </button>
  );
}
