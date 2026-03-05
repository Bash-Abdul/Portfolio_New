// import { LucideIcon } from "lucide-react";

// // interface EmptyStateProps {
// //   icon: LucideIcon;
// //   message: string;
// //   action?: {
// //     label: string;
// //     onClick: () => void;
// //   };
// // }

// export function EmptyState({ icon: Icon, message, action }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-16 px-4">
//       <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4">
//         <Icon className="w-12 h-12 text-neutral-400 dark:text-neutral-600" />
//       </div>
//       <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6 max-w-sm">
//         {message}
//       </p>
//       {action && (
//         <button
//           onClick={action.onClick}
//           className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
//         >
//           {action.label}
//         </button>
//       )}
//     </div>
//   );
// }


export function EmptyState({ icon: Icon, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4">
        <Icon className="w-12 h-12 text-neutral-400 dark:text-neutral-600" />
      </div>

      <p className="text-neutral-600 dark:text-neutral-400 text-center mb-6 max-w-sm">
        {message}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
