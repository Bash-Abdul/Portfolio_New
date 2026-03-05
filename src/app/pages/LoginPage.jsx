import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "../../hooks/useAuth";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
const login = useLogin();
  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     // e.preventDefault();
//     // setError("");
//     // setIsLoading(true);

//     // // Simulate API call
//     // await new Promise((resolve) => setTimeout(resolve, 800));

//     // // Simple password check (in production, this would be server-side)
//     // // For now, using "dashboard123" as the password
//     // if (password === "dashboard123") {
//     //   // Store auth token in localStorage
//     //   localStorage.setItem("dashboardAuth", "authenticated");
//     //   navigate("/dashboard");
//     // } else {
//     //   setError("Incorrect password. Please try again.");
//     //   setIsLoading(false);
//     // }
//   };

async function handleSubmit(e) {
    e.preventDefault()
    login.mutate(password)
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">BASHIR</h1>
          <p className="text-neutral-400">Dashboard Access</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-neutral-800">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Secure Login</h2>
              <p className="text-sm text-neutral-400">Enter your password to continue</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-white transition-colors pr-12"
                  placeholder="Enter your password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {login.isError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 text-sm"
              >
                Incorrect password. Please try again.
              </motion.div>
            )}

            <button
              onClick={handleSubmit}
              disabled={login.isPending || !password}
              className="w-full px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {login.isPending ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </motion.div>
    </div>
  )
}

//   return (
//     <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md"
//       >
//         {/* Logo */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">BASHIR</h1>
//           <p className="text-neutral-400">Dashboard Access</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-neutral-900 border border-neutral-800 p-8">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="p-3 bg-neutral-800">
//               <Lock className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-white">Secure Login</h2>
//               <p className="text-sm text-neutral-400">Enter your password to continue</p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-white transition-colors pr-12"
//                   placeholder="Enter your password"
//                   required
//                   autoFocus
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 text-sm"
//               >
//                 {error}
//               </motion.div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading || !password}
//               className="w-full px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//             >
//               {isLoading ? "Authenticating..." : "Access Dashboard"}
//             </button>
//           </form>

//           {/* Hint */}
//           <div className="mt-6 pt-6 border-t border-neutral-800">
//             <p className="text-xs text-neutral-500 text-center">
//               Demo password: <span className="text-neutral-400 font-mono">dashboard123</span>
//             </p>
//           </div>
//         </div>

//         {/* Back to Portfolio */}
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate("/")}
//             className="text-sm text-neutral-400 hover:text-white transition-colors"
//           >
//             ← Back to Portfolio
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
