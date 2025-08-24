"use client";

import { motion } from "framer-motion";
import { heroData } from "@/lib/hero-data";

export function HeroContent() {
  return (
    <div className="flex flex-col gap-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
      >
        {heroData.title}
      </motion.h1>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl font-semibold tracking-tight sm:text-3xl text-primary"
      >
        {heroData.subtitle}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-muted-foreground max-w-2xl"
      >
        {heroData.description}
      </motion.p>
    </div>
  );
}