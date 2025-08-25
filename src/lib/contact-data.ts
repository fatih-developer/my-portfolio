import { ContactData } from '@/types/contact';

export const contactData: ContactData = {
  personal: {
    name: 'Fatih Ünal',
    title: 'Software Developer',
    location: 'Istanbul, Turkey',
    timezone: 'GMT+3',
    profileImage: '/profile.jpg', // Placeholder, replace with actual image
    welcomeMessage: "I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.",
  },
  availability: {
    status: 'available',
    message: 'Currently available for new opportunities',
    responseTime: 'Within 24 hours',
    preferredHours: '9:00 AM - 6:00 PM (GMT+3)',
    lastUpdated: '2025-08-25',
  },
  contact: {
    email: {
      primary: 'fatih.unal@example.com',
      display: 'fatih.unal@example.com',
      subject: 'Portfolio Contact',
    },
    phone: {
      number: '+90 555 123 4567',
      whatsapp: true,
      display: '+90 555 123 4567',
    },
    social: [
      {
        platform: 'linkedin',
        username: 'fatih-unal',
        url: 'https://linkedin.com/in/fatih-unal',
        verified: true,
        icon: 'linkedin',
        color: '#0077b5',
      },
      {
        platform: 'github',
        username: 'fatih-unal',
        url: 'https://github.com/fatih-unal',
        verified: true,
        icon: 'github',
        color: '#333333',
      },
      {
        platform: 'twitter',
        username: 'fatih_unal',
        url: 'https://twitter.com/fatih_unal',
        verified: false,
        icon: 'twitter',
        color: '#1da1f2',
      },
    ],
    calendar: {
      url: 'https://calendly.com/fatih-unal',
      platform: 'calendly',
      types: [
        {
          name: 'Coffee Chat',
          duration: '30 minutes',
          description: 'Quick introduction and informal chat',
          url: 'https://calendly.com/fatih-unal/coffee-chat',
        },
        {
          name: 'Project Discussion',
          duration: '60 minutes',
          description: 'Detailed project discussion or collaboration',
          url: 'https://calendly.com/fatih-unal/project-discussion',
        },
      ],
    },
  },
  preferences: {
    primaryMethod: 'email',
    businessHours: 'Monday - Friday, 9:00 AM - 6:00 PM (GMT+3)',
    responseExpectation: 'I typically respond to emails within 24 hours during business days.',
    inquiryTypes: [
      {
        type: 'job',
        method: 'email',
        note: 'For job opportunities, please include details about the role and company',
      },
      {
        type: 'freelance',
        method: 'email',
        note: 'For freelance projects, please provide project scope and timeline',
      },
      {
        type: 'collaboration',
        method: 'email',
        note: 'For collaboration opportunities, please share your idea and goals',
      },
      {
        type: 'general',
        method: 'email',
        note: 'For all other inquiries, email is the best way to reach me',
      },
    ],
  },
};