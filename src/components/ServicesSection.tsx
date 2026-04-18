import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { MessageSquare, BarChart3, ShieldCheck } from "lucide-react";

export default function ServicesSection() {
  const { t } = useApp();
  
  const services = [
    { 
      title: t("svc.h1"), 
      desc: t("svc.d1"), 
      icon: <MessageSquare className="text-gold" size={24} />, 
      step: "01" 
    },
    { 
      title: t("svc.h2"), 
      desc: t("svc.d2"), 
      icon: <BarChart3 className="text-gold" size={24} />, 
      step: "02" 
    },
    { 
      title: t("svc.h3"), 
      desc: t("svc.d3"), 
      icon: <ShieldCheck className="text-gold" size={24} />, 
      step: "03" 
    },
  ];

  return (
    <section id="services" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">{t("svc.tagline")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t("svc.title")}</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-8 rounded-3xl border border-border bg-background hover:border-gold/30 transition-all group overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 text-8xl font-black text-foreground/5 group-hover:text-gold/10 transition-colors pointer-events-none uppercase">
                {svc.step}
              </div>
              <div className="bg-gold/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                {svc.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{svc.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
