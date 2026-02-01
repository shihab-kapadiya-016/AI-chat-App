'use client'
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import api from '@/lib/api';
import { AlertBasic } from '../utils/alert-basic';
import { motion } from 'framer-motion';
import { AlertDestructive } from '../utils/alert-destructive';

export const LoginForm = () => {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{ title: string; description: string } | null>(null)
  const [success, setSuccess] = useState<{ title: string; description: string } | null>(null)
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)


    if (!email || !password || email === " " || password === " "){
      setError({ title: "Missing fields", description: "Username and password are required" })
      return
    }

    try {
      const res = api.post('/account/login', {email , password})
      setSuccess({title : "Login Successful" , description: "redirecting you to you account..."})
      console.log("logged in successfully")
    } catch (error: any) {
      setError({title: "error loggin in", description: "Unexpected error"})
      console.error(error)
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
      <form className="w-full max-w-[320px] space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Sign In</h1>
        <p className="text-sm text-slate-400">Welcome back to NexusAI.</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-slate-500 ml-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
            className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl pl-10 text-sm outline-none focus:border-indigo-500 transition-all" 
            placeholder="name@company.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
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
    
      <button className="w-full h-12 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group" type='submit'>
        Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
    </div>
);
}