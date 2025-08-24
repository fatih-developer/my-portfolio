"use client";

import { motion } from "framer-motion";
import { HeroContent } from "@/components/hero/hero-content";
import { HeroActions } from "@/components/hero/hero-actions";

export function HeroSection() {
  return (
    <section className="container py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-12 text-center"
      >
        <HeroContent />
        <HeroActions />
      </motion.div>
    </section>
  );
}