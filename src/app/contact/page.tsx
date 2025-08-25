'use client';

import { useState } from 'react';
import { ContactCard } from '@/components/contact/contact-card';
import { AvailabilityStatus } from '@/components/contact/availability-status';
import { SocialLink } from '@/components/contact/social-link';
import { contactData } from '@/lib/contact-data';
import { Mail, Phone, Calendar, Linkedin, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactData.contact.email.primary}${
      contactData.contact.email.subject ? `?subject=${encodeURIComponent(contactData.contact.email.subject)}` : ''
    }`;
  };

  const handlePhoneClick = () => {
    if (contactData.contact.phone) {
      window.location.href = `tel:${contactData.contact.phone.number}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {contactData.personal.welcomeMessage}
        </p>
      </motion.div>

      <div className="flex flex-col items-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-6"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-muted border-4 border-white shadow-lg overflow-hidden">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <AvailabilityStatus 
              status={contactData.availability.status}
              message={contactData.availability.message}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold">{contactData.personal.name}</h2>
          <p className="text-muted-foreground">{contactData.personal.title}</p>
          <p className="text-sm text-muted-foreground mt-1">{contactData.personal.location}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h3 className="text-xl font-semibold mb-6 text-center">Contact Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ContactCard
            type="email"
            value={contactData.contact.email.display}
            label="Email"
            description="Best for professional inquiries"
            icon={Mail}
            onClick={handleEmailClick}
            copyable={true}
            onCopy={() => copyToClipboard(contactData.contact.email.primary, 'email')}
            copied={copiedEmail}
            primary={contactData.preferences.primaryMethod === 'email'}
          />
          
          {contactData.contact.phone && (
            <ContactCard
              type="phone"
              value={contactData.contact.phone.display || contactData.contact.phone.number}
              label="Phone"
              description="For urgent matters"
              icon={Phone}
              onClick={handlePhoneClick}
              copyable={true}
              onCopy={() => copyToClipboard(contactData.contact.phone!.number, 'phone')}
              copied={copiedPhone}
              primary={contactData.preferences.primaryMethod === 'phone'}
            />
          )}
          
          <ContactCard
            type="calendar"
            value="Schedule a Meeting"
            label="Calendar"
            description="Book time for a chat"
            icon={Calendar}
            href={contactData.contact.calendar?.url}
            primary={contactData.preferences.primaryMethod === 'calendar'}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-xl font-semibold mb-6 text-center">Connect with me</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactData.contact.social.map((social) => (
            <SocialLink
              key={social.platform}
              platform={social.platform}
              username={social.username}
              url={social.url}
              verified={social.verified}
              color={social.color}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-card border rounded-xl p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground mb-2">Response Time</p>
            <p>{contactData.availability.responseTime}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-2">Business Hours</p>
            <p>{contactData.preferences.businessHours}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-2">Time Zone</p>
            <p>{contactData.personal.timezone}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-2">Last Updated</p>
            <p>{contactData.availability.lastUpdated}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <p className="text-muted-foreground mb-2">Response Expectation</p>
          <p>{contactData.preferences.responseExpectation}</p>
        </div>
      </motion.div>
    </div>
  );
}