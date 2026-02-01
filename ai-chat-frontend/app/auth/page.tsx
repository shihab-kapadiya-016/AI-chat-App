'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignUpForm';
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      {/* Main Glassmorphism Card */}
      <div className="relative w-full max-w-[900px] h-[600px] bg-slate-900/40 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden flex">
        
        {/* Animated Blue Sliding Overlay */}
        <motion.div
          animate={{ x: isLogin ? '100%' : '0%' }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="absolute top-0 left-0 w-1/2 h-full bg-indigo-600 z-30 flex flex-col items-center justify-center p-12 text-center text-white"
        >
          {/* Subtle background glow inside the slider */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="signup-prompt"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 space-y-6"
              >
                <h2 className="text-4xl font-black tracking-tight">New Here?</h2>
                <p className="text-indigo-100/80 leading-relaxed">Join NexusAI and start deploying autonomous agents in minutes.</p>
                <button 
                  onClick={() => setIsLogin(false)}
                  className="px-12 py-3 border-2 border-white/30 hover:border-white rounded-full font-bold transition-all hover:bg-white hover:text-indigo-600"
                >
                  Create Account
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="login-prompt"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 space-y-6"
              >
                <h2 className="text-4xl font-black tracking-tight">Welcome Back</h2>
                <p className="text-indigo-100/80 leading-relaxed">Login to monitor your agents and view recent neural activity.</p>
                <button 
                  onClick={() => setIsLogin(true)}
                  className="px-12 py-3 border-2 border-white/30 hover:border-white rounded-full font-bold transition-all hover:bg-white hover:text-indigo-600"
                >
                  Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Left Side (Login Form) */}
        <div className="w-1/2 flex items-center justify-center p-8 bg-slate-900/20">
          <LoginForm />
        </div>

        {/* Right Side (Signup Form) */}
        <div className="w-1/2 flex items-center justify-center p-8 bg-slate-900/20">
          <SignupForm />
        </div>

        {/* Static Logo Overlay */}
        <div className="absolute top-8 left-8 z-40 flex items-center gap-2 font-bold text-indigo-400 pointer-events-none">
          <Bot size={24} /> <span>NexusAI</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;