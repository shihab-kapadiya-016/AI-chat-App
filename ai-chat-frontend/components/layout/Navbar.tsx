"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { Bot } from "lucide-react";

export default function Navbar() {
  return (
   <nav className="flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
            <Bot size={22} />
          </div>
          <span className="font-bold text-xl tracking-tight">Nexus<span className="text-indigo-400">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Solutions</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
          Get Started
        </button>
      </nav>
  );
}
