import { JobPosition, SkillCategory, ExperienceData, PersonalData } from '@/types/about';

export interface AboutData {
  personal: {
    name: string;
    title: string;
    location: string;
    bio: string;
    profileImage: string;
    cvDownloadUrl: string;
  };
  skills: SkillCategory[];
  experience: ExperienceData;
  personalDetails: PersonalData;
}

export const aboutData: AboutData = {
  personal: {
    name: 'Fatih Ünal',
    title: 'Software Developer',
    location: 'Turkey',
    bio: 'I am a passionate software developer with expertise in modern web technologies. With years of experience in building scalable applications, I focus on creating efficient, maintainable, and user-friendly solutions. I enjoy working with cutting-edge technologies and continuously learning new skills to stay updated in this ever-evolving field.',
    profileImage: '/images/profile.jpg',
    cvDownloadUrl: '/documents/cv-fatih-unal.pdf',
  },
  skills: [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: ' monitor',
      skills: [
        { name: 'React', level: 'expert', yearsOfExperience: 5 },
        { name: 'Next.js', level: 'advanced', yearsOfExperience: 3 },
        { name: 'TypeScript', level: 'advanced', yearsOfExperience: 4 },
        { name: 'Tailwind CSS', level: 'advanced', yearsOfExperience: 2 },
      ],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: ' server',
      skills: [
        { name: 'Node.js', level: 'advanced', yearsOfExperience: 4 },
        { name: 'Express', level: 'advanced', yearsOfExperience: 4 },
        { name: 'MongoDB', level: 'intermediate', yearsOfExperience: 3 },
        { name: 'PostgreSQL', level: 'intermediate', yearsOfExperience: 2 },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Methods',
      icon: ' wrench',
      skills: [
        { name: 'Git', level: 'advanced', yearsOfExperience: 5 },
        { name: 'Docker', level: 'intermediate', yearsOfExperience: 2 },
        { name: 'AWS', level: 'intermediate', yearsOfExperience: 2 },
        { name: 'CI/CD', level: 'intermediate', yearsOfExperience: 2 },
      ],
    },
  ],
  experience: {
    current: {
      title: 'Senior Software Developer',
      company: 'Tech Solutions Inc.',
      startDate: '2022-01-01',
      description: 'Leading frontend development initiatives and mentoring junior developers. Responsible for architecting scalable web applications using modern JavaScript frameworks.',
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
    },
    highlights: [
      'Led the migration of legacy frontend to React, improving performance by 40%',
      'Mentored 5 junior developers and established coding best practices',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Developed responsive UI components used by 100k+ daily users',
    ],
  },
  personalDetails: {
    interests: [
      'Open Source Contributions',
      'Technical Blogging',
      'Photography',
      'Hiking',
    ],
    goals: [
      'Become a technical leader in web development',
      'Contribute to major open-source projects',
      'Learn and master cloud-native technologies',
    ],
    motivation:
      'I am driven by the desire to create meaningful solutions that positively impact users. I believe in continuous learning and growth, both personally and professionally.',
  },
};