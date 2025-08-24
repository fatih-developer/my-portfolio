# Requirements Document: Hero Section Bileşeni Oluşturma

## Overview
Bu görev kapsamında Shadcn ve Framer Motion kütüphanelerini kullanarak etkileyici bir hero section bileşeni oluşturulacaktır. Hero section, portfolyo sitesinin ana sayfasında kullanıcıyı karşılayacak ve geliştiricinin kimliğini özetleyecek şekilde tasarlanacaktır.

## User Stories
- **Ziyaretçi olarak**, siteyi ziyaret ettiğimde geliştiricinin kimliği ve yetenekleri hakkında hızlı bir fikir edinmek istiyorum.
- **Potansiyel işveren olarak**, geliştiricinin teknik becerileri ve kişilik hakkında bilgi almak istiyorum.
- **Tasarımcı olarak**, hero section'ın görsel olarak etkileyici ve marka kimliğiyle uyumlu olmasını istiyorum.
- **Geliştirici olarak**, hero section'ın animasyonlarla zenginleştirilmiş ve kullanıcı deneyimini artıran şekilde olmasını istiyorum.

## Acceptance Criteria
- WHEN Kullanıcı ana sayfayı ziyaret ettiğinde THEN hero section prominently görüntülenmeli
- WHEN Hero section render edildiğinde THEN geliştiricinin adı, kısa tanıtımı ve çağrılı eylem butonları gösterilmeli
- WHEN Sayfa yüklendiğinde THEN hero section'da entrance animasyonları çalışmalı
- WHEN Kullanıcı çağrılı eylem butonlarına tıkladığında THEN doğru hedefe yönlendirilmeli (portfolyo, iletişim)
- WHEN Hero section responsive olarak görüntülendiğinde THEN tüm cihaz boyutlarında uygun şekilde görüntülenmeli
- WHEN Hero section render edildiğinde THEN SEO dostu HTML elementleri kullanmalı (heading, paragraph)
- WHEN Hero section kullanıldığında THEN dark/light mode desteği olmalı

## Technical Requirements
- Shadcn `Button`, `Card` gibi bileşenlerin kullanımı
- Framer Motion ile entrance ve hover animasyonları
- Responsive design için Tailwind CSS class'larının kullanılması
- Next.js `Link` bileşeni ile client-side navigation
- TypeScript ile tip güvenliği
- Accessibility için uygun ARIA etiketlerinin kullanılması
- Dark mode desteği için Tailwind CSS theme kullanımı
- Lucide React ikonlarının çağrılı eylem butonlarında kullanımı (opsiyonel)