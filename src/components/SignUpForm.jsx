// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SignUpForm() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     employeeId: "",
//     contactNumber: "",
//     email: "",
//     password: "",
//     rePassword: "",
//   });

//   const [emailValidated, setEmailValidated] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showRePassword, setShowRePassword] = useState(false);

//   const inputsRef = useRef([]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // EMAIL VALIDATION
//   const validateEmail = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(form.email)) {
//       setError("Invalid email format");
//       return;
//     }

//     setError("");
//     setEmailValidated(true);
//     setShowOtp(true);
//   };

//   // OTP HANDLER (only 1–9 allowed)
//   const handleOtpChange = (value, index) => {
//     if (!/^[1-9]?$/.test(value)) return; // only 1-9

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!emailValidated) {
//       setError("Please validate your email first");
//       return;
//     }

//     if (otp.join("").length !== 6) {
//       setError("Please enter 6-digit OTP");
//       return;
//     }

//     if (form.password !== form.rePassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     console.log("Form submitted:", form, "OTP:", otp.join(""));
//     setError("");
//   };

//   return (
//     <div className="animate-fade-in space-y-6">
//       <h1 className="text-3xl font-semibold text-white">Create account</h1>

//       {error && (
//         <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded">
//           {error}
//         </p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* NAME */}
//         <input
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg"
//         />

//         {/* EMPLOYEE ID */}
//         <input
//           name="employeeId"
//           placeholder="Employee ID"
//           onChange={handleChange}
//           className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg"
//         />

//         {/* CONTACT */}
//         <input
//           name="contactNumber"
//           placeholder="Contact Number"
//           onChange={handleChange}
//           className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg"
//         />

//         {/* EMAIL + VALIDATE */}
//         <div className="flex gap-2">
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             onChange={handleChange}
//             className="flex-1 px-3 py-2 bg-[#2a2a2a] text-white rounded-lg"
//           />

//           {!emailValidated && (
//             <button
//               type="button"
//               onClick={validateEmail}
//               className="px-3 py-2 bg-indigo-600 text-white rounded-lg"
//             >
//               Validate
//             </button>
//           )}
//         </div>

//         {/* OTP */}
//         {showOtp && (
//           <div className="flex gap-2 justify-between">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputsRef.current[index] = el)}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleOtpChange(e.target.value, index)}
//                 className="w-10 h-10 text-center bg-[#2a2a2a] text-white rounded-lg"
//               />
//             ))}
//           </div>
//         )}

//         {/* PASSWORD */}
//         <div className="relative">
//           <input
//             name="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             onChange={handleChange}
//             className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg pr-10"
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-2.5 text-gray-300"
//           >
//             {showPassword ? (
//               // Eye OFF
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3-10-7 1.02-2.46 2.7-4.47 4.875-5.825M9.88 9.88A3 3 0 1014.12 14.12M3 3l18 18"
//                 />
//               </svg>
//             ) : (
//               // Eye ON
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* RE PASSWORD */}
//         <div className="relative">
//           <input
//             name="rePassword"
//             type={showRePassword ? "text" : "password"}
//             placeholder="Re-enter Password"
//             onChange={handleChange}
//             className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg pr-10"
//           />

//           <button
//             type="button"
//             onClick={() => setShowRePassword(!showRePassword)}
//             className="absolute right-3 top-2.5 text-gray-300"
//           >
//             {showRePassword ? (
//               // Eye OFF
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3-10-7 1.02-2.46 2.7-4.47 4.875-5.825M9.88 9.88A3 3 0 1014.12 14.12M3 3l18 18"
//                 />
//               </svg>
//             ) : (
//               // Eye ON
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* SUBMIT */}
//         <button
//           type="submit"
//           className="w-full py-2.5 px-4 bg-indigo-600 text-white hover:bg-[#333333] border border-gray-700 hover:border-gray-600 rounded-lg font-medium transition-all duration-200 active:scale-[0.99]"
//         >
//           Create Account
//         </button>
//       </form>

//       <p className="text-center text-sm text-gray-400">
//         Already have an account?{" "}
//         <button
//           type="button"
//           onClick={() => navigate("/signin")}
//           className="text-indigo-400 hover:underline"
//         >
//           Sign in
//         </button>
//       </p>
//     </div>
//   );
// }

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    contactNumber: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const [emailValidated, setEmailValidated] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // EMAIL VALIDATION
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    setEmailValidated(true);
    setShowOtp(true);
  };

  // OTP HANDLER (only 1–9 allowed)
  const handleOtpChange = (value, index) => {
    if (!/^[1-9]?$/.test(value)) return; // only 1-9

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailValidated) {
      setError("Please validate your email first");
      return;
    }

    if (otp.join("").length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    if (form.password !== form.rePassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Form submitted:", form, "OTP:", otp.join(""));
    setError("");

    // Redirect to the dashboard path
    navigate("/dashboard");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-3xl font-semibold text-white">Create account</h1>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 p-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg"
        />

        {/* EMPLOYEE ID */}
        <input
          name="employeeId"
          placeholder="Employee ID"
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg"
        />

        {/* CONTACT */}
        <input
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg"
        />

        {/* EMAIL + VALIDATE */}
        <div className="flex gap-2">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="flex-1 px-3 py-2 bg-[#2a2a2a] text-white rounded-lg"
          />

          {!emailValidated && (
            <button
              type="button"
              onClick={validateEmail}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Validate
            </button>
          )}
        </div>

        {/* OTP */}
        {showOtp && (
          <div className="flex gap-2 justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-10 h-10 text-center bg-[#2a2a2a] text-white rounded-lg"
              />
            ))}
          </div>
        )}

        {/* PASSWORD */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-300"
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

        {/* RE PASSWORD */}
        <div className="relative">
          <input
            name="rePassword"
            type={showRePassword ? "text" : "password"}
            placeholder="Re-enter Password"
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg pr-10"
          />

          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute right-3 top-2.5 text-gray-300"
          >
            {showRePassword ? (
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

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-indigo-600 text-white hover:bg-[#333333] border border-gray-700 hover:border-gray-600 rounded-lg font-medium transition-all duration-200 active:scale-[0.99]"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="text-indigo-400 hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
