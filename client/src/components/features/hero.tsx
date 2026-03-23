"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      {/* Animated Glow Background */}
<div className="absolute inset-0 -z-10 overflow-hidden">

  <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px] top-[-100px] left-[-100px] animate-pulse" />

  <div className="absolute w-[400px] h-[400px] bg-cyan-500/30 rounded-full blur-[120px] bottom-[-100px] right-[-100px] animate-pulse delay-1000" />

</div>

      {/* Content */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold leading-tight"
      >
        Master{" "}
        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          System Design
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-lg text-gray-400 max-w-2xl"
      >
        Practice real-world system design questions, get AI feedback,
        and become a system design expert.
      </motion.p>

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="mt-8 flex gap-4"
>
  <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl">
    Start Practicing
  </Button>

  <Button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md">
    Try AI Evaluation
  </Button>
  </motion.div>
</section>
  );
} 