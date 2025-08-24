# Implementation Plan: Shadcn Kurulumu ve Bileşenler

## Setup
- [ ] Shadcn CLI'nin projeye eklenmesi
- [ ] `components.json` yapılandırma dosyasının oluşturulması
- [ ] Gerekli bağımlılıkların (tailwind-merge, class-variance-authority) projeye eklenmesi

## Core Implementation
- [ ] Shadcn CLI ile button bileşeninin eklenmesi
- [ ] Shadcn CLI ile card bileşeninin eklenmesi
- [ ] `lib/utils.ts` dosyasının oluşturulması ve `cn` yardımcı fonksiyonunun eklenmesi

## Testing
- [ ] Button bileşeninin doğru şekilde render edildiğini kontrol etme
- [ ] Card bileşeninin doğru şekilde render edildiğini kontrol etme
- [ ] `cn` fonksiyonunun beklendiği gibi çalıştığını doğrulama

## Verification
- [ ] Geliştirme sunucusunun hatasız çalışması
- [ ] Bileşenlerin storybook veya demo sayfasında görüntülenmesi
- [ ] TypeScript derleme hatalarının olmaması

## Dependencies
- `tailwind-merge`: Tailwind CSS class'larını birleştirmek için
- `class-variance-authority`: Bileşen varyasyonlarını tanımlamak için
- `@radix-ui/react-slot`: Bileşen slotlama işlemleri için

## Timeline
- Tahmini süre: 1-2 saat
- Karmaşıklık: Düşük