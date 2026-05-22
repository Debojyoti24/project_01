import React from "react";
import { LoginIllus, SignupIllus } from "./Illustrations";

export default function AuthLayout({ children, isSignUp }) {
  return (
    // Outer page wrapper - covers full viewport
    <div className="w-screen min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      {/* Main card box - forced side-by-side display using full flex rows */}
      <div className="w-full max-w-5xl bg-[#222222] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-800 min-h-[600px]">
        {/* LEFT COMPONENT: Illustration box (takes up exactly 50% width on desktop) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-gradient-to-br from-[#2a2a2a] to-[#1e1e1e] relative border-b md:border-b-0 md:border-r border-gray-800">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

          {!isSignUp ? (
            /* Wrapped everything under "Welcome Back" into this single container */
            <div className="w-full flex flex-col items-center text-center space-y-6 animate-fade-in">
              <LoginIllus />
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Welcome Back!
                </h2>
                <p className="text-gray-400 mt-2 text-sm max-w-xs leading-relaxed mx-auto">
                  Sign in to access your customized control panel and keep track
                  of your projects.
                </p>
              </div>
            </div>
          ) : (
            /* Wrapped everything under "Join the Community" into this single container */
            <div className="w-full flex flex-col items-center text-center space-y-6 animate-fade-in">
              <SignupIllus />
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Congratulations! For Joining the Community
                </h2>
                <p className="text-gray-400 mt-2 text-sm max-w-xs leading-relaxed mx-auto">
                  Create an account to unlock full platform capabilities and
                  begin your journey.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COMPONENT: Form container box (takes up exactly 50% width on desktop) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-20 bg-[#1f1f1f]">
          <div className="w-full max-w-sm mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
