import { NavigationLink, SocialLink, TechStackItem } from "@/types/footer";

export interface FooterData {
  brand: {
    name: string;
    tagline: string;
    logo?: string;
  };
  navigation: NavigationLink[];
  social: SocialLink[];
  info: {
    copyright: string;
    techStack?: TechStackItem[];
    lastUpdated?: string;
    repositoryUrl?: string;
  };
}

export const footerData: FooterData = {
  brand: {
    name: "Fatih Ünal",
    tagline: "Software Developer & Problem Solver"
  },
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" }
  ],
  social: [
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/fatih-unal",
      username: "fatih-unal"
    },
    {
      platform: "github", 
      url: "https://github.com/fatih-unal",
      username: "fatih-unal"
    },
    {
      platform: "twitter",
      url: "https://twitter.com/fatih_unal",
      username: "fatih_unal"
    }
  ],
  info: {
    copyright: `© ${new Date().getFullYear()} Fatih Ünal. All rights reserved.`,
    techStack: [
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "TypeScript", url: "https://typescriptlang.org" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com" }
    ],
    repositoryUrl: "https://github.com/fatih-unal/portfolio"
  }
};