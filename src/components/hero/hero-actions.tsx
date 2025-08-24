"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heroData } from "@/lib/hero-data";
import { ExternalLink } from "lucide-react";

export function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-wrap gap-4"
    >
      {heroData.actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant as any}
          size="lg"
          asChild
        >
          <Link href={action.href}>
            {action.text}
            {action.href.startsWith("http") && (
              <ExternalLink className="ml-2 h-4 w-4" />
            )}
          </Link>
        </Button>
      ))}
    </motion.div>
  );
}