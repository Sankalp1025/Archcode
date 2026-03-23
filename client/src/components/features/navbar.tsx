"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl"
    >
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">

        {/* Logo */}
        <div className="text-white font-bold text-lg">
          ArchCode
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-white/80">
          <span className="hover:text-white cursor-pointer">Problems</span>
          <span className="hover:text-white cursor-pointer">AI Features</span>
          <span className="hover:text-white cursor-pointer">Leaderboard</span>
        </div>

        {/* Button */}
        <Button className="bg-white text-black hover:bg-gray-200 rounded-xl px-4">
          Login
        </Button>

      </div>
    </motion.nav>
  );
}