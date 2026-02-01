'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Zap, Shield, ChevronRight, Cpu, Layers, MessageSquare, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for Shadcn-like class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IndexPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold mb-8 uppercase tracking-widest">
            <Sparkles size={14} />
            <span>Now powered by Nexus-4 Turbo</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-white">
            The AI that <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">understands</span> you.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the next evolution of human-computer interaction. A conversational agent that learns, adapts, and executes complex workflows in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group">
              Start Building 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
              Book a Demo
            </button>
          </div>
        </motion.div>

        {/* Animated Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 max-w-6xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-colors" />
          <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-sm p-4 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
             <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-3 h-3 bg-indigo-500 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} className="w-3 h-3 bg-purple-500 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} className="w-3 h-3 bg-pink-500 rounded-full" />
                </div>
                <p className="text-slate-500 font-mono text-sm tracking-widest uppercase">Initializing Neural Link...</p>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-32 px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            variants={itemVariants}
            icon={<Zap size={24} />}
            title="Real-time Execution"
            description="Our agent doesn't just suggest code; it spins up environments and tests it for you."
          />
          <FeatureCard 
            variants={itemVariants}
            icon={<Layers size={24} />}
            title="Context Memory"
            description="Infinite context window technology. It remembers your project details from months ago."
          />
          <FeatureCard 
            variants={itemVariants}
            icon={<Shield size={24} />}
            title="Secure Sandboxing"
            description="Safe, isolated execution environments for every task. Your local machine stays protected."
          />
        </div>
      </motion.section>

      <footer className="py-20 text-center border-t border-slate-900">
        <p className="text-slate-500 text-sm">© 2026 NexusAI. Powered by Quantum Compute.</p>
      </footer>
    </div>
  );
};

// Feature Card Component with Motion support
const FeatureCard = ({ icon, title, description, variants }: any) => (
  <motion.div 
    variants={variants}
    className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 transition-all hover:bg-slate-900/60 group"
  >
    <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">
      {description}
    </p>
  </motion.div>
);

export default IndexPage;