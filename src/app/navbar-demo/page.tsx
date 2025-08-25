import { Navbar } from "@/components/navbar";

export default function NavbarDemo() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-20">
        <h1 className="text-3xl font-bold">Navbar Demo</h1>
        <p className="mt-4">
          Bu sayfada navbar bileşenini test edebilirsiniz. Responsive davranışı 
          ve navigasyon linklerini kontrol edin.
        </p>
      </div>
    </div>
  );
}