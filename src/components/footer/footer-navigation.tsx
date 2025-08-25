"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationLink } from "@/types/footer";

interface FooterNavigationProps {
  navigation: NavigationLink[];
}

export function FooterNavigation({ navigation }: FooterNavigationProps) {
  const pathname = usePathname();
  
  return (
    <nav className="footer-navigation" aria-label="Footer navigation">
      <ul role="list" className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`footer-nav-link text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-blue-600" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}