import { motion } from "framer-motion";
import heroImg from "@/assets/hero-villa.jpg";
import { useApp } from "@/contexts/AppContext";

export default function HeroSection() {
  const { t } = useApp();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroImg}
          alt="Luxury villa investment in Bali"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-20 pb-12 sm:pt-26"
      >
        <motion.p 
          variants={itemVariants}
          className="text-gradient-gold text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-6"
        >
          {t("hero.tagline")}
        </motion.p>
        
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-5xl lg:text-7xl font-bold text-background leading-tight mb-6 sm:mb-8"
        >
          {t("hero.title")}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="mx-auto max-w-2xl text-background/80 text-base sm:text-lg mb-8" 
          dangerouslySetInnerHTML={{ __html: t("hero.desc").replace("100%+ profit potential", '<span class="font-semibold text-gold">100%+ profit potential</span>') }} 
        />
        
        <motion.blockquote 
          variants={itemVariants}
          className="hidden md:block mx-auto max-w-xl italic text-background/60 text-sm mb-8 border-l-2 border-gold/40 pl-4 text-left"
        >
          &ldquo;{t("hero.quote")}&rdquo;
          <span className="block mt-2 not-italic font-semibold text-gold-light text-xs">— Rifqi Raza Bunahri, Founder & CEO</span>
        </motion.blockquote>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/6285362254459?text=I'd like to start a consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-gold px-8 py-3 text-sm font-bold text-foreground transition hover:bg-gold-dark shadow-xl shadow-gold/10"
          >
            {t("hero.consult")}
          </a>
          <a
            href="#projects"
            className="flex-1 rounded-md border border-gold/30 px-8 py-3 text-sm font-semibold text-background transition-colors hover:bg-gold/10 sm:flex-none"
          >
            {t("hero.cta2")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
