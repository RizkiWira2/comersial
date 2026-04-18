import { motion } from "framer-motion";
import { Users, BarChart3, Briefcase } from "lucide-react";
import consultationImg from "@/assets/consultation.jpg";
import { useApp } from "@/contexts/AppContext";

export default function ServicesSection() {
  const { t } = useApp();

  const services = [
    {
      icon: Users,
      title: t("svc.h1"),
      desc: t("svc.d1"),
    },
    {
      icon: BarChart3,
      title: t("svc.h2"),
      desc: t("svc.d2"),
    },
    {
      icon: Briefcase,
      title: t("svc.h3"),
      desc: t("svc.d3"),
    },
  ];

  return (
    <section id="services" className="py-20 bg-surface overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden"
          >
            <img
              src={consultationImg}
              alt="Professional property investment consultation"
              loading="lazy"
              width={800}
              height={600}
              className="w-full h-80 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gradient-gold text-sm font-semibold tracking-[0.15em] uppercase mb-3">{t("svc.tagline")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">{t("svc.title")}</h2>

            <div className="space-y-6">
              {services.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30">
                    <s.icon size={22} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gold tracking-widest mb-1">{t("svc.step")} {i + 1}</div>
                    <h3 className="text-base font-bold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
