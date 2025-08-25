export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export interface JobPosition {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  type: 'project' | 'certification' | 'award' | 'milestone';
}

export interface ExperienceData {
  current: JobPosition;
  highlights: string[];
}

export interface PersonalData {
  interests: string[];
  goals: string[];
  motivation: string;
}