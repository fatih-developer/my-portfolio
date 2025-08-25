'use client';

import { motion } from 'framer-motion';
import { SkillCategory } from '@/types/about';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

const getProficiencyPercentage = (level: string) => {
  switch (level) {
    case 'expert': return 100;
    case 'advanced': return 75;
    case 'intermediate': return 50;
    case 'beginner': return 25;
    default: return 25;
  }
};

const getProficiencyColor = (level: string) => {
  switch (level) {
    case 'expert': return 'bg-[--proficiency-expert] proficiency-fill';
    case 'advanced': return 'bg-[--proficiency-advanced] proficiency-fill';
    case 'intermediate': return 'bg-[--proficiency-intermediate] proficiency-fill';
    case 'beginner': return 'bg-[--proficiency-beginner] proficiency-fill';
    default: return 'bg-muted-foreground proficiency-fill';
  }
};

const getProficiencyLabel = (level: string) => {
  switch (level) {
    case 'expert': return 'Expert';
    case 'advanced': return 'Advanced';
    case 'intermediate': return 'Intermediate';
    case 'beginner': return 'Beginner';
    default: return level;
  }
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-4"
      >
        Skills & Expertise
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
      >
        My technical skills and proficiency levels across different technologies and domains
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {skills.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Card className="h-full skill-card border-0 bg-gradient-to-br from-background to-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="text-xl">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="skill-name">
                          {skill.name}
                        </span>
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                            {getProficiencyLabel(skill.level)}
                          </span>
                          {skill.yearsOfExperience && (
                            <span className="text-xs text-muted-foreground mt-1">
                              {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="proficiency-bar">
                        <motion.div
                          className={getProficiencyColor(skill.level)}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${getProficiencyPercentage(skill.level)}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + 0.1 * index, duration: 0.8, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}