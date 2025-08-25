# About Page Content Update Guidelines

This document provides guidelines for updating the content on the About page.

## Updating Personal Information

### Profile Information
To update personal information like name, title, location, and bio:
1. Open `src/lib/data/about-data.ts`
2. Modify the `personal` object properties:
   - `name`: Your full name
   - `title`: Your current job title
   - `location`: Your current location
   - `bio`: Your personal introduction (keep it concise, 2-3 sentences)

### Profile Image
To update the profile image:
1. Replace `public/images/profile.jpg` with your new image
2. Ensure the new image is in JPG format and at least 400x400 pixels
3. Optimize the image for web use (under 100KB if possible)

### CV/Resume
To update the CV/resume:
1. Replace `public/documents/cv-fatih-unal.pdf` with your new CV
2. Ensure the file is in PDF format
3. Keep the file name consistent or update the reference in `about-data.ts`

## Updating Skills

### Adding New Skill Categories
To add a new skill category:
1. Open `src/lib/data/about-data.ts`
2. Add a new object to the `skills` array with the following structure:
   ```ts
   {
     id: 'unique-identifier', // Use kebab-case
     title: 'Category Name',
     icon: 'emoji-or-icon', // Use a relevant emoji or icon
     skills: [
       // Skill objects
     ]
   }
   ```

### Adding Skills to Categories
To add skills to existing categories:
1. Open `src/lib/data/about-data.ts`
2. Find the relevant category in the `skills` array
3. Add new skill objects to the `skills` array of that category:
   ```ts
   {
     name: 'Skill Name',
     level: 'beginner' | 'intermediate' | 'advanced' | 'expert',
     yearsOfExperience: number // Optional
   }
   ```

## Updating Experience

### Current Role
To update current role information:
1. Open `src/lib/data/about-data.ts`
2. Modify the `experience.current` object properties:
   - `title`: Job title
   - `company`: Company name
   - `startDate`: Start date in YYYY-MM-DD format
   - `description`: Role description
   - `technologies`: Array of technologies used

### Career Highlights
To update career highlights:
1. Open `src/lib/data/about-data.ts`
2. Modify the `experience.highlights` array
3. Add or remove string items as needed
4. Keep each highlight concise (1 sentence)

## Updating Personal Insights

### Interests
To update personal interests:
1. Open `src/lib/data/about-data.ts`
2. Modify the `personal.interests` array
3. Add or remove string items as needed

### Goals
To update personal goals:
1. Open `src/lib/data/about-data.ts`
2. Modify the `personal.goals` array
3. Add or remove string items as needed

### Motivation
To update personal motivation:
1. Open `src/lib/data/about-data.ts`
2. Modify the `personal.motivation` string
3. Keep it concise but meaningful

## Best Practices

1. **Consistency**: Keep the tone and style consistent across all content
2. **Brevity**: Keep descriptions concise and impactful
3. **Accuracy**: Ensure all information is up-to-date and accurate
4. **SEO**: Use relevant keywords naturally in descriptions
5. **Accessibility**: Ensure content is accessible to all users
6. **Mobile**: Consider how content will appear on mobile devices

## Testing Changes

After making content updates:
1. Run the development server: `npm run dev`
2. Visit the About page: http://localhost:3000/about
3. Check all sections for proper display
4. Test responsive behavior on different screen sizes
5. Verify CV download functionality
6. Check that all animations work correctly