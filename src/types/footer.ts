export interface NavigationLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface SocialPlatform {
  name: string;
  color: string;
  hoverColor: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  verified?: boolean;
}

export interface TechStackItem {
  name: string;
  url?: string;
}