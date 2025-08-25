'use client';

import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { ContactType } from '@/types/contact';

interface ContactCardProps {
  type: ContactType;
  value: string;
  label: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  copyable?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  primary?: boolean;
}

export function ContactCard({
  type,
  value,
  label,
  description,
  icon: Icon,
  href,
  onClick,
  copyable = false,
  onCopy,
  copied = false,
  primary = false,
}: ContactCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
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
      className={`relative rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
        primary 
          ? 'border-primary bg-primary/5' 
          : 'border-border bg-card hover:border-primary/50'
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`Contact via ${label}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${primary ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{label}</h3>
            {copyable && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy?.();
                }}
                className="p-1 rounded hover:bg-muted transition-colors"
                aria-label={copied ? "Copied" : "Copy to clipboard"}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          <p className="text-sm mt-1 break-all">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      </div>
      
      {primary && (
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            Primary
          </span>
        </div>
      )}
    </motion.div>
  );
}