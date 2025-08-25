export interface SocialAccount {
  platform: string;
  username: string;
  url: string;
  verified: boolean;
  icon: string;
  color: string;
}

export interface MeetingType {
  name: string;
  duration: string;
  description: string;
  url: string;
}

export interface InquiryPreference {
  type: 'job' | 'freelance' | 'collaboration' | 'general';
  method: ContactType;
  note?: string;
}

export type ContactType = 
  | 'email' 
  | 'phone' 
  | 'linkedin' 
  | 'github' 
  | 'twitter' 
  | 'calendar'
  | 'whatsapp';

export interface ContactData {
  personal: {
    name: string;
    title: string;
    location: string;
    timezone: string;
    profileImage: string;
    welcomeMessage: string;
  };
  availability: {
    status: 'available' | 'busy' | 'limited';
    message: string;
    responseTime: string;
    preferredHours: string;
    lastUpdated: string;
  };
  contact: {
    email: {
      primary: string;
      display: string;
      subject?: string;
    };
    phone?: {
      number: string;
      whatsapp?: boolean;
      display?: string;
    };
    social: SocialAccount[];
    calendar?: {
      url: string;
      platform: 'calendly' | 'cal.com' | 'google';
      types: MeetingType[];
    };
  };
  preferences: {
    primaryMethod: ContactType;
    businessHours: string;
    responseExpectation: string;
    inquiryTypes: InquiryPreference[];
  };
}