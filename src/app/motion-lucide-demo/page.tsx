import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Heart, Star, Github, Linkedin, Mail } from "@/lib/icons";

export default function MotionLucideDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <h1 className="text-3xl font-bold">Motion ve Lucide React Demo</h1>
      
      {/* Motion Demo */}
      <MotionWrapper className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Framer Motion</h2>
        <p className="text-center max-w-md">
          Bu içerik, Framer Motion kullanılarak sayfaya animasyonlu bir şekilde girer.
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((item) => (
            <MotionWrapper
              key={item}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
              className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold"
            >
              {item}
            </MotionWrapper>
          ))}
        </div>
      </MotionWrapper>
      
      {/* Lucide Icons Demo */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Lucide Icons</h2>
        <div className="flex gap-4">
          <Heart className="text-red-500" size={32} fill="currentColor" />
          <Star className="text-yellow-500" size={32} fill="currentColor" />
          <Github size={32} />
          <Linkedin size={32} />
          <Mail size={32} />
        </div>
        <p className="text-center max-w-md">
          Yukarıdaki ikonlar Lucide React kütüphanesinden alınmıştır.
        </p>
      </div>
    </div>
  );
}