"use client";

import { FooterData, footerData } from "@/components/footer/footer-data";
import { FooterBrand } from "@/components/footer/footer-brand";
import { FooterNavigation } from "@/components/footer/footer-navigation";
import { FooterSocial } from "@/components/footer/footer-social";
import { FooterInfo } from "@/components/footer/footer-info";

export interface FooterProps {
  className?: string;
  showTechStack?: boolean;
  showLastUpdated?: boolean;
  currentPath?: string;
  data?: FooterData;
}

export function Footer({
  className = "",
  showTechStack = true,
  showLastUpdated = false,
  currentPath,
  data = footerData
}: FooterProps) {
  return (
    <footer 
      role="contentinfo" 
      className={`footer ${className}`}
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-sections">
            <FooterBrand brand={data.brand} />
            
            {/* Navigation and Social Links - stacked on mobile, side-by-side on desktop */}
            <div className="footer-nav-social flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
              <FooterNavigation navigation={data.navigation} />
              <FooterSocial social={data.social} />
            </div>
          </div>
          
          {/* Additional Info */}
          <FooterInfo 
            copyright={data.info.copyright}
            techStack={showTechStack ? data.info.techStack : undefined}
            repositoryUrl={data.info.repositoryUrl}
          />
        </div>
      </div>
    </footer>
  );
}