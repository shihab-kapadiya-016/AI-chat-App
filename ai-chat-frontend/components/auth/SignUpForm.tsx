'use client'
import React, { useState } from 'react';
import { User, Mail, Lock, Sparkles } from 'lucide-react';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { AlertBasic } from '../utils/alert-basic';
import { AlertDestructive } from '../utils/alert-destructive';

export const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{title: string, description: string} | null>(null);
  const [success, setSuccess] = useState<{title: string, description: string} | null>(null);

  
  
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)
      setSuccess(null)
      console.log("submitted")


      if ([username, email, password].some(v => !v.trim())) {
      setError({
        title: "Error",
        description: "Please fill all values properly",
      })
      return
      }

      try {
        const res = await api.post('/account/register', {username, email,password})
        console.log(res)
        setSuccess({title: "User created successfully", description: "Redirecting to Login...."})
      } catch (error:any) {
        const message = extractErrorMessage(error.response?.data)
        setError({title: "Error !!!", description: message})
        return
      }
      
    }
  
  return (
    <div className='flex flex-col gap-6 w-full max-w-md mx-auto items-center'>
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertDestructive  title={error.title} description={error.description} />
        </motion.div>
      )}
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertBasic title={success.title} description={success.description} />
        </motion.div>
      )}
      <form className="w-full max-w-[320px] space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Get Started</h1>
          <p className="text-sm text-slate-400">Join the elite AI network.</p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-3 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
              className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl pl-10 text-sm outline-none focus:border-indigo-500 transition-all" 
              placeholder="Jane Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
              className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl pl-10 text-sm outline-none focus:border-indigo-500 transition-all" 
              placeholder="jane@nexus.ai" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 

              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
              type="password" 
              className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl pl-10 text-sm outline-none focus:border-indigo-500 transition-all" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 

              />
            </div>
          </div>
        </div>

        <button className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 mt-2 flex items-center justify-center gap-2 group">
          Create Account <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
        </button>
      </form>
    </div>
);
}
function extractErrorMessage(data: any): string {
  console.log(data)
  if (!data) return "An unexpected error occurred";
  
  if (typeof data === "string") return data;
  
  if (data.message) return data.message;
  
  if (data.error) return data.error;
  
  if (data.errors && Array.isArray(data.errors)) {
    return data.errors[0]?.message || data.errors[0] || "An error occurred";
  }
    
  if (typeof data === "object") {
    for (const key in data) {
      const value = data[key];

      if (Array.isArray(value) && value.length > 0) {
        return value[0]; // first error message
      }

      if (typeof value === "string") {
        return value;
      }
    }
  }
  
  return "An unexpected error occurred";
}
