'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Globe } from 'lucide-react';

interface SocialLinkProps {
  platform: string;
  username: string;
  url: string;
  verified?: boolean;
  color: string;
}

const platformIcons = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  default: Globe,
};

export function SocialLink({ platform, username, url, verified, color }: SocialLinkProps) {
  const Icon = platformIcons[platform as keyof typeof platformIcons] || platformIcons.default;
  
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      whileTap={{ scale: 0.98 }}
      className="rounded-xl border p-4 transition-all duration-200 cursor-pointer bg-card hover:border-primary/50"
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`Connect on ${platform}`}
    >
      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}20`, color }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-medium truncate">{username}</h3>
            {verified && (
              <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground capitalize">{platform}</p>
        </div>
      </div>
    </motion.div>
  );
}