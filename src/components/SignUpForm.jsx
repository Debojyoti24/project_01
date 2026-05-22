import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const inputsRef = useRef([]);

  // Handle Input Change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /*
  =========================
  EMAIL VALIDATION
  =========================
  */
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    setShowOtp(true);
    setEmailValidated(false);
  };

  /*
  =========================
  OTP HANDLER
  =========================
  */
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // Validate OTP length
    const otpValue = newOtp.join("");

    if (otpValue.length === 6) {
      setEmailValidated(true);
      setError("");
    } else {
      setEmailValidated(false);
    }
  };

  /*
  =========================
  SUBMIT FORM
  =========================
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!form.employeeId.trim()) {
      setError("Employee ID is required");
      return;
    }

    if (!emailValidated) {
      setError("Please enter valid 6-digit OTP");
      return;
    }

    if (form.password !== form.rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("http://localhost:5000/api/signup", {
        employeeId: form.employeeId,
        fullName: form.name,
        email: form.email,
        contactNumber: form.contactNumber,
        password: form.password,
      });

      alert(response.data.message);

      // Reset Form
      setForm({
        name: "",
        employeeId: "",
        contactNumber: "",
        email: "",
        password: "",
        rePassword: "",
      });

      setOtp(["", "", "", "", "", ""]);
      setShowOtp(false);
      setEmailValidated(false);

      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-white">Create Account</h1>

      {/* Error */}
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
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg outline-none"
        />

        {/* EMPLOYEE ID */}
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg outline-none"
        />

        {/* CONTACT NUMBER */}
        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg outline-none"
        />

        {/* EMAIL */}
        <div className="flex gap-2">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="flex-1 px-3 py-2 bg-[#2a2a2a] text-white rounded-lg outline-none"
          />

          {!showOtp && (
            <button
              type="button"
              onClick={validateEmail}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
            >
              Validate
            </button>
          )}
        </div>

        {/* OTP */}
        {showOtp && (
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="w-10 h-10 text-center bg-[#2a2a2a] text-white rounded-lg outline-none"
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
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
          >
            {showPassword ? (
              // Eye Off Icon
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
              // Eye Icon
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
        {/* RE PASSWORD
        <div className="relative">
          <input
            name="rePassword"
            type={showRePassword ? "text" : "password"}
            placeholder="Re-enter Password"
            value={form.rePassword}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg pr-10 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
          >
            👁
          </button>
        </div> */}
        {/* RE-ENTER PASSWORD */}
        <div className="relative">
          <input
            name="rePassword"
            type={showRePassword ? "text" : "password"}
            placeholder="Re-enter Password"
            value={form.rePassword}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-[#2a2a2a] text-white rounded-lg pr-10"
          />

          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
          >
            {showRePassword ? (
              // Eye Off Icon
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
              // Eye Icon
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
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg font-medium transition-all duration-200"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* SIGN IN LINK */}
        <div className="text-center pt-2">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
