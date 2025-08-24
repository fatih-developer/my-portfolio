# Design Document: Navbar Bileşeni Oluşturma

## Technical Overview
Bu görevde Shadcn kütüphanesini kullanarak responsive bir navbar bileşeni oluşturulacaktır. Navbar, portfolyo sitesinin ana navigasyonunu sağlayacak ve hem desktop hem mobil cihazlarda uygun şekilde çalışacaktır.

## Component Architecture
```
src/
├── components/
│   ├── navbar/
│   │   ├── navbar.tsx (ana bileşen)
│   │   ├── nav-item.tsx (menü öğesi)
│   │   ├── mobile-nav.tsx (mobil menü)
│   │   └── index.ts (export'lar)
│   └── ...
└── lib/
    └── navigation.ts (navigasyon verileri)
```

## State Management
- Navbar durumu:
  - `isOpen`: Mobil menü açık/kapalı durumu (useState)
- Menü öğeleri:
  - Sabit dizi olarak tanımlanacak
  - Aktif sayfa highlight için `usePathname` hook'u kullanılacak

## Data Flow
- Navigasyon öğeleri `navigation.ts` dosyasından alınacak
- Her menü öğesi için:
  - `name`: Görünen metin
  - `href`: Hedef URL
  - `current`: Aktif sayfa kontrolü için
- Mobil menü durumu state ile yönetilecek

## Error Handling
- TypeScript ile derleme zamanı hatalarının önlenmesi
- Next.js `Link` bileşeni ile client-side navigation hatalarının engellenmesi
- Responsive tasarım testleri ile layout kırılmalarının önlenmesi

## Performance Considerations
- Mobil menü için lazy loading
- `React.memo` ile gereksiz render'ların önlenmesi
- SVG ikonlar ile düşük boyutlu asset kullanımı
- CSS transition ile optimize animasyonlar

## Accessibility
- `<nav>` elementi kullanımı
- `<ul>`, `<li>` ile semantik liste yapısı
- `aria-label` ile navbar etiketlenmesi
- `aria-current="page"` ile aktif sayfa belirtilmesi
- Klavye navigasyon desteği
- Focus-visible ile erişilebilir focus stilleri
- Mobile menü için `aria-expanded` ve `aria-controls` kullanımı

## Integration Points
- Next.js `Link` bileşeni ile pages/app router
- Shadcn `Sheet` (mobil menü için)
- Shadcn `Button` (hamburger menü için)
- Tailwind CSS ile responsive design
- Lucide React ikonları (mobil menüde)

## Future Considerations
- Multi-level menü desteği
- Dropdown menü desteği
- Localization desteği
- Sticky navbar özelliği