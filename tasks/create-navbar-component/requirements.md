# Requirements Document: Navbar Bileşeni Oluşturma

## Overview
Bu görev kapsamında Shadcn kütüphanesini kullanarak responsive bir navbar bileşeni oluşturulacaktır. Navbar, portfolyo sitesinin ana navigasyonunu sağlayacak ve mobil cihazlarda hamburger menü ile uyumlu olacak şekilde tasarlanacaktır.

## User Stories
- **Kullanıcı olarak**, siteyi ziyaret ettiğimde kolayca farklı sayfalara geçiş yapabilmek istiyorum.
- **Mobil kullanıcı olarak**, küçük ekranımda da kolayca menüye erişebilmek istiyorum.
- **Tasarımcı olarak**, navbar'ın sitesinin genel tasarım diliyle uyumlu olmasını istiyorum.
- **Geliştirici olarak**, navbar bileşeninin kolayca özelleştirilebilir ve sürdürülebilir olmasını istiyorum.

## Acceptance Criteria
- WHEN Kullanıcı desktop cihazda siteyi ziyaret ettiğinde THEN navbar tüm menü öğelerini yatay olarak göstermeli
- WHEN Kullanıcı mobil cihazda siteyi ziyaret ettiğinde THEN navbar hamburger menü ile çalışmalı
- WHEN Kullanıcı menü öğelerine tıkladığında THEN doğru sayfaya yönlendirilmeli
- WHEN Kullanıcı navbar logo/branding alanına tıkladığında THEN ana sayfaya yönlendirilmeli
- WHEN Navbar render edildiğinde THEN SEO dostu HTML elementleri kullanmalı (`<nav>`, `<ul>`, `<li>`, `<a>`)
- WHEN Navbar bileşeni kullanıldığında THEN dark/light mode desteği olmalı

## Technical Requirements
- Shadcn `NavigationMenu` veya özel yapı kullanılarak navbar oluşturulması
- Responsive design için Tailwind CSS class'larının kullanılması
- Mobil cihazlar için hamburger menü implementasyonu
- Next.js `Link` bileşeni ile client-side navigation
- TypeScript ile tip güvenliği
- Accessibility için uygun ARIA etiketlerinin kullanılması
- Dark mode desteği için Tailwind CSS theme kullanımı