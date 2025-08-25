import { FooterData } from "@/components/footer/footer-data";

interface FooterBrandProps {
  brand: FooterData['brand'];
}

export function FooterBrand({ brand }: FooterBrandProps) {
  return (
    <div className="footer-brand">
      <div className="footer-name">{brand.name}</div>
      <div className="footer-tagline">{brand.tagline}</div>
    </div>
  );
}