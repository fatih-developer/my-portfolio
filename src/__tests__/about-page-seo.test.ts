import { metadata } from '@/app/about/metadata';

describe('AboutPage SEO', () => {
  it('has proper metadata', () => {
    expect(metadata.title).toBe('About | Fatih Ünal');
    expect(metadata.description).toBeDefined();
    expect(metadata.keywords).toBeDefined();
    expect(metadata.authors).toBeDefined();
  });

  it('has proper OpenGraph tags', () => {
    if (metadata.openGraph) {
      expect(metadata.openGraph.title).toBe('About | Fatih Ünal');
      expect(metadata.openGraph.description).toBeDefined();
      expect(metadata.openGraph.type).toBe('website');
      expect(metadata.openGraph.locale).toBe('en_US');
    }
  });

  it('has keywords for SEO', () => {
    if (metadata.keywords) {
      expect(Array.isArray(metadata.keywords)).toBe(true);
      expect(metadata.keywords.length).toBeGreaterThan(0);
    }
  });
});