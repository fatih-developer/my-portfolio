"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigation } from "@/lib/navigation";
import { NavItem } from "@/components/navbar/nav-item";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          aria-label="Menüyü aç"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="font-bold">Fatih Ünal</span>
          </Link>
          <Button
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => setIsOpen(false)}
            aria-label="Menüyü kapat"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col gap-4 mt-8">
          {navigation.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.name}
            </NavItem>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}