"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SocialLink } from "@/types/footer";

interface SocialIconProps {
  platform: string;
  className?: string;
}

function SocialIcon({ platform, className }: SocialIconProps) {
  switch (platform) {
    case "github":
      return <Github className={className} />;
    case "linkedin":
      return <Linkedin className={className} />;
    case "twitter":
      return <Twitter className={className} />;
    default:
      return <Github className={className} />;
  }
}

interface FooterSocialProps {
  social: SocialLink[];
}

export function FooterSocial({ social }: FooterSocialProps) {
  return (
    <div className="footer-social" aria-label="Social media links">
      <div className="flex gap-3">
        {social.map((item) => (
          <Link
            key={item.platform}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-icon ${item.platform} w-9 h-9 rounded-md flex items-center justify-center transition-all duration-200 hover:scale-105`}
            aria-label={`Visit ${item.username} on ${item.platform}`}
          >
            <SocialIcon 
              platform={item.platform} 
              className="w-4 h-4 text-gray-600 hover:text-white" 
            />
          </Link>
        ))}
      </div>
    </div>
  );
}