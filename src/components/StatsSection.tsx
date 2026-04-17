import bank1 from "@/assets/banks/Artboard 1.png";
import { useApp } from "@/contexts/AppContext";
import bank2 from "@/assets/banks/Artboard 2.png";
import bank3 from "@/assets/banks/Artboard 3.png";
import bank4 from "@/assets/banks/Artboard 4.png";
import bank5 from "@/assets/banks/Artboard 5.png";
import bank6 from "@/assets/banks/Artboard 6.png";
import bank7 from "@/assets/banks/Artboard 7.png";
import bank8 from "@/assets/banks/Artboard 8.png";

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
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 sm:gap-x-20 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center min-w-[140px]">
              <p className="text-3xl sm:text-4xl font-bold text-gradient-gold">{s.value}</p>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bank partner marquee */}
        <div className="relative flex overflow-hidden py-4 border-y border-border/50">
          <div className="animate-marquee flex w-max gap-12 pr-12">
            {/* First set */}
            {bankLogos.map((logo, i) => (
              <img
                key={`set1-${i}`}
                src={logo}
                alt="Bank Partner"
                className="h-10 w-auto object-contain"
              />
            ))}
            {/* Second set for seamless looping */}
            {bankLogos.map((logo, i) => (
              <img
                key={`set2-${i}`}
                src={logo}
                alt="Bank Partner"
                className="h-10 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
