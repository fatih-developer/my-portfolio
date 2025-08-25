# Technical Architecture — Personal Portfolio Website

> Bu mimari belge, PRD’de tariflenen kişisel portfolyo sitesinin ilk sürümü için hazırlanmıştır. Seçimler geldikçe bu taslağı adım adım güncelleyeceğiz.

---

## 1) Mimari Genel Bakış
- **Amaç:** Geliştiricinin becerilerini, deneyimlerini ve projelerini sergilediği hızlı, erişilebilir ve SEO-dostu bir web sitesi.
- **Yaklaşım:** İçerik odaklı, mümkün olduğunca statik üretim (SSG) + gerektiğinde artımlı yeniden üretim (ISR) ve çok az/opsiyonel arka uç.
- **Önemli Sayfalar:** Ana sayfa, Hakkımda, Portfolyo/Projeler, İletişim.

## 2) Karar Matrisi (Seçimlerinizle güncellenecek)
Aşağıdaki her başlık için seçilen teknolojiler **[✔]** işaretlendi.

### 2.1. Framework ve Render Stratejisi
- [✔] **Next.js + React + TypeScript** — SSG + ISR, gerektiğinde Route Handlers ile minör sunucu uçları
- [ ] Astro + MDX
- [ ] Nuxt (Vue)

### 2.2. İçerik Yönetimi / Blog
- [ ] MDX dosyaları (repo içinde)
- [ ] Headless CMS (Strapi / Sanity / Contentful / Ghost / Notion API)
- [✔] Blog yok (ileride eklenebilir)

### 2.3. Barındırma & CDN
- [✔] **Coolify (self-hosted PaaS, Docker tabanlı dağıtım)**
- [ ] Vercel
- [ ] Netlify
- [ ] Cloudflare Pages
- [ ] GitHub Pages (tam statik)

### 2.4. Paket Yöneticisi & Node Sürümü
- [✔] **bun + bunx (runtime & package manager)**
- [ ] pnpm + Node 20 LTS
- [ ] npm
- [ ] yarn

### 2.5. Stil ve Tasarım Sistemi
- [✔] **Tailwind CSS + shadcn/ui bileşenleri**
- [ ] CSS Modules / SCSS
- [ ] Styled Components / Emotion

### 2.6. Formlar (İletişim)
- [ ] Serverless işlev (Vercel Functions) + e-posta webhook’u
- [ ] Üçüncü parti: Formspree / Getform / Basin / Resend
- [✔] Sadece sosyal bağlantılar (form yok)

### 2.7. Analitik
- [ ] Umami (self-host/Cloud) / Vercel Analytics
- [ ] Google Analytics
- [✔] Analitik yok (şimdilik)

### 2.8. SEO & Paylaşım
- [ ] next-seo
- [ ] Manuel meta yönetimi
- [✔] SEO şimdilik yok (ileride eklenebilir)

### 2.9. Test
- [ ] Jest + Testing Library (UI)
- [ ] Playwright (E2E)
- [✔] Minimal test

### 2.10. Uluslararasılaştırma (i18n)
- [✔] **Tek dil** _(önerilen başlangıç)_
- [ ] next-intl / next-i18next

### 2.11. Yorumlar (Blog için)
- [ ] giscus (GitHub Discussions)
- [ ] Disqus
- [✔] Yorum yok (blog olmadığı için)

---

## 3) Sistem Bileşenleri

### 3.1. Frontend
- **Framework:** Next.js (React + TS).
- **Dizin Yapısı (Next.js/`app` router örneği):**
  ```text
  /app
    /(site)
      /about
      /projects
      /contact
      layout.tsx
      page.tsx
  /components
  /public (görseller)
  /styles
  ```
- **Durum Yönetimi:** Yerel UI state (React), proje kartları ve filtreler için hafif state; global store gerekmiyor.
- **Stil:** Tailwind + shadcn/ui; tema için CSS değişkenleri; koyu/açık mod opsiyonel.
- **Erişilebilirlik:** Semantik HTML, odak halkaları, kontrast denetimi, `aria-*` kullanım rehberi.

### 3.2. İçerik Katmanı
- **Başlangıçta blog olmayacak.** Sadece portfolyo içerikleri doğrudan kod içine veya JSON/TS yapılarına gömülecek.
- Blog eklenmek istenirse MDX veya headless CMS yapısına geçiş planı hazır.

### 3.3. Arka Uç / Serverless (opsiyonel)
- **İletişim Formu:** Şimdilik yok; sadece sosyal linkler sunulacak.
- **Mailing List:** Opsiyonel, ileride eklenebilir.

### 3.4. Güvenlik
- Zorunlu HTTPS, HSTS.
- İçerik Güvenlik Politikası (CSP) şablonu.
- Güvenlik başlıkları: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
- Potansiyel form uçları eklenirse hız limitleme ve doğrulama.

### 3.5. Performans
- Görsel optimizasyonu (`<Image>`/`next/image`), modern formatlar (AVIF/WebP).
- Kod bölme, ağaç sarsma, istemci bileşenlerini minimal tutma.
- ISR/SSG ile TTFB düşürme; önbellek başlıkları.

### 3.6. Gözlemlenebilirlik & Loglama
- İstemci hataları için `window.onerror` yakalama ve `console.error` proxy (opsiyonel Sentry/Logtail).
- Coolify üzerinden container logları, JSON formatında takip.

---

## 4) Geliştirme Yaşam Döngüsü

### 4.1. Sürüm Kontrolü & Dallar
- `main`: üretim
- `dev`: geliştirme
- Özellik dalları: `feat/*`, `fix/*`

### 4.2. CI/CD
- GitHub Actions → Docker image build → Coolify deploy
- **Build & Lint:** PR açıldığında
- **Test:** Minimal test
- **Deploy:** `main` → Prod, `dev` → Preview

### 4.3. Ortamlar & Gizli Bilgiler
- `.env.local` (geliştirme), `.env.production` (prod)
- Sırlar: Coolify environment secret management

---

## 5) Ayrıntılı Teknikler (Seçimlerinize göre genişleyecek)

### 5.1. Başlangıç Komutları (Next.js + bun örneği)
```bash
bun create next-app my-portfolio --ts --eslint --tailwind
cd my-portfolio
bun add class-variance-authority tailwind-merge
bun add -d @types/node @types/react prettier eslint-config-prettier
```

### 5.2. Portfolyo Veri Yapısı
Projeler JSON/TS objesi olarak saklanacak:
```ts
export const projects = [
  {
    title: "...",
    slug: "...",
    summary: "...",
    tags: ["react", "node"],
    links: { github: "...", demo: "..." },
    cover: "/images/...",
    date: "2025-08-24"
  }
]
```

### 5.3. SEO
- Şimdilik SEO entegrasyonu olmayacak.
- İleride `next-seo` veya manuel meta yönetimi eklenecek.

---

## 6) Donanım / Ölçekleme
- Coolify ile Docker tabanlı dağıtım.
- Trafik düşük/orta beklendiği için container + CDN önbellek yeterli.
- Medya varlıkları `public/` klasörü üzerinden servis edilir.

---

## 7) Riskler & Önlemler
- **Aşırı karmaşıklık:** Blog ve form yok; sade yapı korunuyor.
- **SEO eksikliği:** İlk aşamada önemli değil, ileride eklenecek.
- **Analitik yok:** Kullanıcı davranışları izlenemeyecek, ileride Umami eklenebilir.

---

## 8) Yol Haritası
1. Framework (Next.js) ve paket yöneticisi (bun) seçildi.
2. Blog, SEO, Analitik olmadan yalın bir portfolyo başlatılacak.
3. Stil/tasarım sistemi (Tailwind + shadcn/ui) kurulacak.
4. Sosyal bağlantılarla iletişim bölümü yapılacak.
5. CI/CD Coolify üzerinden ayarlanacak.
6. İleride SEO, analitik ve blog eklenmesi planlanacak.

---

## 9) Ekler
- **Kod kalite kuralları:** ESLint + Prettier, dosya/komponent adlandırma rehberi.
- **Komutlar:** `bun dev`, `bun build`, `bun start`, `bun test`, `bun lint`.
- **Dokümantasyon:** README, içerik ekleme rehberi, deploy notları.

> Not: Bu belge bir taslaktır. Her seçiminizle birlikte **[✔]** işaretlenerek netleştirilecek ve gerekli kod/dizin örnekleri eklenecektir.

