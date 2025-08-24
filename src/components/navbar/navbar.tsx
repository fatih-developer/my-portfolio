"use client";

import Link from "next/link";
import { navigation } from "@/lib/navigation";
import { NavItem } from "@/components/navbar/nav-item";
import { MobileNav } from "@/components/navbar/mobile-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">Fatih Ünal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.name}
            </NavItem>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}