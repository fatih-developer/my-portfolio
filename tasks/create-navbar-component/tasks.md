# Implementation Plan: Navbar Bileşeni Oluşturma

## Setup
- [ ] `lib/navigation.ts` dosyasının oluşturulması ve navigasyon verilerinin tanımlanması
- [ ] Gerekli Shadcn bileşenlerinin (Sheet, Button) projeye eklenmesi

## Core Implementation
- [ ] `components/navbar/nav-item.tsx` bileşeninin oluşturulması
- [ ] `components/navbar/mobile-nav.tsx` bileşeninin oluşturulması
- [ ] `components/navbar/navbar.tsx` ana bileşeninin oluşturulması
- [ ] `components/navbar/index.ts` export dosyasının oluşturulması

## Component Details
### NavItem Component
- [ ] Next.js `Link` bileşeni ile navigasyon
- [ ] Aktif sayfa için highlight stili
- [ ] Accessible HTML elementlerinin kullanımı

### MobileNav Component
- [ ] Shadcn `Sheet` bileşeni ile drawer menü
- [ ] Hamburger menü butonu (Lucide ikon ile)
- [ ] Mobil menü açık/kapalı state yönetimi

### Navbar Component
- [ ] Responsive design implementasyonu
- [ ] Desktop ve mobile view ayrımı
- [ ] Branding/logo alanı
- [ ] NavItem bileşenlerinin render edilmesi

## Testing
- [ ] Desktop view'da navbar'ın doğru şekilde render edildiğini kontrol etme
- [ ] Mobil view'da hamburger menünün doğru şekilde çalıştığını kontrol etme
- [ ] Navigasyon öğelerinin doğru hedefe yönlendirdiğini kontrol etme
- [ ] Aktif sayfa highlight'ının doğru çalıştığını kontrol etme

## Verification
- [ ] Tüm ekran boyutlarında responsive davranışı
- [ ] Accessibility testleri (keyboard navigation, screen reader)
- [ ] Dark/light mode uyumu
- [ ] TypeScript derleme hatalarının olmaması

## Dependencies
- Shadcn `Sheet`, `Button` bileşenleri
- Lucide React `Menu` ikonu
- Next.js `Link` bileşeni
- `usePathname` hook'u

## Timeline
- Tahmini süre: 3-4 saat
- Karmaşıklık: Orta