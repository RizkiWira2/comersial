import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import bank1 from "@/assets/banks/Artboard 1.png";
import { useApp } from "@/contexts/AppContext";
import bank2 from "@/assets/banks/Artboard 2.png";
import bank3 from "@/assets/banks/Artboard 3.png";
import bank4 from "@/assets/banks/Artboard 4.png";
import bank5 from "@/assets/banks/Artboard 5.png";
import bank6 from "@/assets/banks/Artboard 6.png";
import bank7 from "@/assets/banks/Artboard 7.png";
import bank8 from "@/assets/banks/Artboard 8.png";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useApp();
  
  const stats = [
    { value: "100%+", label: t("stats.profit") },
    { value: "100+", label: t("stats.projects") },
    { value: "100%", label: t("stats.satisfaction") },
    { value: "10+", label: t("stats.banks") },
    { value: "10+", label: t("stats.experience") },
  ];

  const bankLogos = [bank1, bank2, bank3, bank4, bank5, bank6, bank7, bank8];

  return (
    <section className="bg-surface py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:gap-x-20 mb-12"
        >
          {stats.map((s, i) => (
            <motion.div 
              key={s.label} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center min-w-[140px]"
            >
              <p className="text-3xl sm:text-4xl font-bold text-gradient-gold">
                <Counter value={s.value} />
              </p>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bank partner marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative flex overflow-hidden py-4 border-y border-border/50"
        >
          <div className="animate-marquee flex w-max gap-12 pr-12">
            {[...bankLogos, ...bankLogos].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Bank Partner"
                className="h-10 w-auto object-contain brightness-0 invert opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
