# Contact Page - Design Document

## Component Architecture

### Page Structure
```
ContactPage/
├── PageHeader/
│   ├── Title
│   ├── Subtitle
│   └── AvailabilityStatus
├── ContactHero/
│   ├── ProfileImage
│   ├── WelcomeMessage
│   └── ResponseExpectation
├── ContactMethods/
│   ├── PrimaryContact/
│   │   ├── EmailCard
│   │   └── CopyToClipboard
│   ├── SocialLinks/
│   │   ├── LinkedInLink
│   │   ├── GitHubLink
│   │   ├── TwitterLink
│   │   └── OtherPlatforms
│   └── SchedulingOptions/
│       ├── CalendlyIntegration
│       └── MeetingTypes
├── ContactInfo/
│   ├── AvailabilityDetails
│   ├── TimeZoneInfo
│   └── PreferredMethods
└── CallToAction/
    ├── NextSteps
    └── AdditionalResources
```

### Component Interfaces

#### ContactCard Component
```tsx
interface ContactCardProps {
  type: ContactType;
  value: string;
  label: string;
  description?: string;
  icon: React.ComponentType;
  href?: string;
  onClick?: () => void;
  copyable?: boolean;
  primary?: boolean;
}

type ContactType = 
  | 'email' 
  | 'phone' 
  | 'linkedin' 
  | 'github' 
  | 'twitter' 
  | 'calendar'
  | 'whatsapp';
```

#### SocialLink Component
```tsx
interface SocialLinkProps {
  platform: SocialPlatform;
  username: string;
  url: string;
  verified?: boolean;
  className?: string;
}

interface SocialPlatform {
  name: string;
  icon: React.ComponentType;
  color: string;
  baseUrl: string;
}
```

#### AvailabilityStatus Component
```tsx
interface AvailabilityStatusProps {
  status: 'available' | 'busy' | 'limited';
  message: string;
  lastUpdated: string;
  nextAvailable?: string;
}
```

## Data Models

### Contact Data Structure
```tsx
interface ContactData {
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

interface SocialAccount {
  platform: string;
  username: string;
  url: string;
  verified: boolean;
  icon: string;
  color: string;
}

interface MeetingType {
  name: string;
  duration: string;
  description: string;
  url: string;
}

interface InquiryPreference {
  type: 'job' | 'freelance' | 'collaboration' | 'general';
  method: ContactType;
  note?: string;
}
```

## UI/UX Design Specifications

### Layout & Structure
- Max width: 800px centered container
- Single column layout with card-based sections
- Generous white space for clean appearance
- Section spacing: 60px vertical on desktop, 40px on mobile

### Contact Cards Design
```css
.contact-card {
  /* Layout */
  display: flex;
  align-items: center;
  padding: 24px;
  border-radius: 16px;
  gap: 16px;
  
  /* Styling */
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.contact-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.contact-card.primary {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #dbeafe 0%, #ffffff 100%);
}
```

### Typography System
- Page title: 42px desktop, 32px mobile (Inter Bold)
- Section headings: 24px (Inter Semibold)
- Contact method labels: 16px (Inter Medium)
- Descriptions: 14px (Inter Regular)
- Status indicators: 12px (Inter Medium, uppercase)

### Color Scheme
```css
:root {
  /* Contact method colors */
  --email: #3b82f6;        /* Blue */
  --phone: #10b981;        /* Green */
  --linkedin: #0077b5;     /* LinkedIn Blue */
  --github: #333333;       /* GitHub Dark */
  --twitter: #1da1f2;      /* Twitter Blue */
  --calendar: #ea4335;     /* Google Red */
  
  /* Status colors */
  --available: #10b981;    /* Green */
  --busy: #f59e0b;         /* Orange */
  --limited: #6b7280;      /* Gray */
  
  /* Interactive states */
  --hover: #f3f4f6;
  --focus: #3b82f6;
  --active: #1d4ed8;
}
```

### Icon System
- Consistent 24px icon size for contact methods
- Lucide React icons for consistency with existing design
- Platform-specific icons for social media
- Status indicators with appropriate colors

## Responsive Design

### Mobile Layout (320px - 640px)
```css
.contact-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-card {
  padding: 20px;
  text-align: left;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
```

### Tablet Layout (640px - 1024px)
```css
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.primary-contact {
  grid-column: span 2;
}
```

### Desktop Layout (1024px+)
```css
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.primary-contact {
  grid-column: span 3;
}

.social-section {
  grid-column: span 2;
}
```

## Interactions & Animations

### Click Interactions
```tsx
const handleEmailClick = () => {
  window.location.href = `mailto:${email}?subject=Portfolio Contact`;
};

const handleCopyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  // Show success toast
  toast.success('Copied to clipboard!');
};

const handleSocialClick = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
```

### Hover Animations
```tsx
const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -2,
    transition: { duration: 0.2 }
  }
};
```

### Success States
- Copy to clipboard confirmation with toast
- Link click feedback with subtle animation
- Email client opening confirmation
- Smooth transitions for all interactions

## Accessibility Features

### Keyboard Navigation
```tsx
const ContactCard = ({ href, onClick, label }) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick ? onClick() : window.location.href = href;
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPress}
      aria-label={`Contact via ${label}`}
    >
      {/* Card content */}
    </div>
  );
};
```

### Screen Reader Support
```tsx
<div role="main" aria-labelledby="contact-heading">
  <h1 id="contact-heading">Contact Information</h1>
  
  <section aria-labelledby="primary-contact">
    <h2 id="primary-contact">Primary Contact Method</h2>
    <div aria-describedby="email-description">
      <span id="email-description">
        Best for professional inquiries and job opportunities
      </span>
    </div>
  </section>
</div>
```

### Visual Accessibility
- High contrast ratios (4.5:1 minimum)
- Clear focus indicators for all interactive elements
- Sufficient color contrast for status indicators
- Large touch targets (44px minimum)

## State Management

### Local State
```tsx
interface ContactPageState {
  copiedEmail: boolean;
  copiedPhone: boolean;
  showCalendar: boolean;
  selectedMeetingType: string;
}

const useContactPage = () => {
  const [state, setState] = useState<ContactPageState>({
    copiedEmail: false,
    copiedPhone: false,
    showCalendar: false,
    selectedMeetingType: ''
  });

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setState(prev => ({ ...prev, [`copied${type}`]: true }));
    
    setTimeout(() => {
      setState(prev => ({ ...prev, [`copied${type}`]: false }));
    }, 2000);
  };

  return { state, copyToClipboard };
};
```

## Security Considerations

### Email Protection
```tsx
// Obfuscate email from bots while keeping it accessible
const obfuscateEmail = (email: string) => {
  return email.replace('@', ' [at] ').replace('.', ' [dot] ');
};

// Use data attributes for bot protection
<span 
  data-email="dXNlckBleGFtcGxlLmNvbQ==" // base64 encoded
  onClick={decodeAndOpenEmail}
>
  Contact via Email
</span>
```

### Link Security
```tsx
const SecureLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-describedby="external-link-warning"
  >
    {children}
  </a>
);
```

## Performance Optimizations

### Image Optimization
- Optimized profile image with Next.js Image
- Lazy loading for non-critical images
- WebP format with fallbacks
- Appropriate sizing for different viewports

### Code Splitting
- Lazy load calendar integration
- Dynamic imports for heavy clipboard libraries
- Minimal JavaScript for core functionality

### Caching Strategy
- Static contact data cached at build time
- Service worker for offline access
- CDN caching for images and assets

## SEO & Social Sharing

### Meta Tags
```tsx
const contactMetaTags = {
  title: 'Contact - Fatih Ünal | Software Developer',
  description: 'Get in touch with Fatih Ünal for job opportunities, freelance projects, or professional collaboration.',
  keywords: 'contact, software developer, hire developer, freelance',
  canonical: '/contact'
};
```

### Structured Data
```json
{
  "@type": "Person",
  "name": "Fatih Ünal",
  "jobTitle": "Software Developer",
  "url": "https://portfolio.com/contact",
  "email": "contact@example.com",
  "sameAs": [
    "https://linkedin.com/in/username",
    "https://github.com/username"
  ]
}
```

## Error Handling

### Network Failures
- Graceful fallback for calendar loading
- Offline detection and appropriate messaging
- Retry mechanisms for failed clipboard operations

### Browser Compatibility
- Feature detection for clipboard API
- Fallback UI for unsupported features
- Progressive enhancement approach

### User Feedback
- Clear error messages for failed operations
- Success confirmation for completed actions
- Loading states for async operations