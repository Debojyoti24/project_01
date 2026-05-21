// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SignInForm() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="animate-fade-in space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">
//           Sign in
//         </h1>
//         <p className="text-sm text-gray-400">
//           Sign in securely with your Office ID and password
//         </p>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Employee ID */}
//         <div>
//           <label
//             className="block text-sm font-medium text-gray-300 mb-1.5"
//             htmlFor="employeeId"
//           >
//             Enter Your Office ID
//           </label>

//           <input
//             id="employeeId"
//             type="text"
//             placeholder="e.g. EMP1234"
//             className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//             required
//             pattern="^[A-Za-z]{2,5}[0-9]{3,6}$"
//             title="Employee ID must start with 2–5 letters followed by 3–6 numbers (e.g. EMP1234)"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label
//             className="block text-sm font-medium text-gray-300 mb-1.5"
//             htmlFor="password"
//           >
//             Password
//           </label>

//           <div className="relative">
//             <input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-10 tracking-widest text-xs"
//               required
//             />

//             {/* Eye toggle button */}
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
//             >
//               {showPassword ? (
//                 // Eye OFF
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3-10-7 1.02-2.46 2.7-4.47 4.875-5.825M9.88 9.88A3 3 0 1014.12 14.12M3 3l18 18"
//                   />
//                 </svg>
//               ) : (
//                 // Eye ON
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-2.5 px-4 bg-indigo-600  hover:bg-[#333333] border border-gray-700 hover:border-gray-600 rounded-lg text-white font-medium transition-all duration-200 active:scale-[0.99] "
//         >
//           Sign in
//         </button>
//       </form>

//       {/* Signup Link */}
//       <div className="text-center text-sm text-gray-400 pt-2">
//         No account?{" "}
//         <button
//           type="button"
//           onClick={() => navigate("/signup")}
//           className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline focus:outline-none"
//         >
//           Create one
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If you need to add authentication logic later, you can place it here.

    // Redirect to the dashboard path
    navigate("/dashboard");
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">
          Sign in
        </h1>
        <p className="text-sm text-gray-400">
          Sign in securely with your Office ID and password
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee ID */}
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-1.5"
            htmlFor="employeeId"
          >
            Enter Your Office ID
          </label>

          <input
            id="employeeId"
            type="text"
            placeholder="e.g. EMP1234"
            className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
            pattern="^[A-Za-z]{2,5}[0-9]{3,6}$"
            title="Employee ID must start with 2–5 letters followed by 3–6 numbers (e.g. EMP1234)"
          />
        </div>

        {/* Password */}
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-1.5"
            htmlFor="password"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-10 tracking-widest text-xs"
              required
            />

            {/* Eye toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                // Eye OFF
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3-10-7 1.02-2.46 2.7-4.47 4.875-5.825M9.88 9.88A3 3 0 1014.12 14.12M3 3l18 18"
                  />
                </svg>
              ) : (
                // Eye ON
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-[#333333] border border-gray-700 hover:border-gray-600 rounded-lg text-white font-medium transition-all duration-200 active:scale-[0.99]"
        >
          Sign in
        </button>
      </form>

      {/* Signup Link */}
      <div className="text-center text-sm text-gray-400 pt-2">
        No account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline focus:outline-none"
        >
          Create one
        </button>
      </div>
    </div>
  );
}
