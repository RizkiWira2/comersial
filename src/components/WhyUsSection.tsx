import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { CheckCircle2 } from "lucide-react";

export default function WhyUsSection() {
  const { t } = useApp();

  const comparisons = [
    { label: t("why.comp.h1"), agent: false, commercial: true, desc: t("why.comp.d1") },
    { label: t("why.comp.h2"), agent: false, commercial: true, desc: t("why.comp.d2") },
    { label: t("why.comp.h3"), agent: false, commercial: true, desc: t("why.comp.d3") },
    { label: t("why.comp.h4"), agent: false, commercial: true, desc: t("why.comp.d4") },
    { label: t("why.comp.h5"), agent: true, commercial: true, desc: t("why.comp.d5") },
  ];

  return (
    <section id="why-us" className="py-24 bg-foreground overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">{t("why.tagline")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background">{t("why.title")}</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr,200px,200px] border-b border-white/10 pb-6 pt-10 px-6 sm:px-12 bg-white/5">
            <div className="text-sm font-bold text-background/40 uppercase tracking-widest hidden md:block">Feature Comparison</div>
            <div className="text-lg font-bold text-background/60 text-center uppercase tracking-widest">Property Agent</div>
            <div className="text-lg font-bold text-gold text-center uppercase tracking-widest">Commercial</div>
          </div>

          <div className="divide-y divide-white/5">
            {comparisons.map((item, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr,200px,200px] p-6 sm:p-12 items-center hover:bg-white/5 transition-colors group">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-background mb-2 group-hover:text-gold transition-colors">{item.label}</h3>
                  <p className="text-background/50 text-sm max-w-xl">{item.desc}</p>
                </div>
                <div className="flex justify-center border-t border-white/5 pt-4 md:border-0 md:pt-0">
                  {item.agent ? (
                    <CheckCircle2 className="text-background/20" size={28} />
                  ) : (
                    <div className="text-background/10 font-black text-2xl">✕</div>
                  )}
                </div>
                <div className="flex justify-center border-t border-white/5 pt-4 md:border-0 md:pt-0 bg-gold/5 md:bg-transparent">
                  <CheckCircle2 className="text-gold" size={32} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
